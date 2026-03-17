use anchor_lang::prelude::*;

declare_id!("GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm");

const MAX_NAME_LEN: usize = 64;
const MAX_ASSET_LEN: usize = 24;
const MAX_RULES_HASH: usize = 96;

#[program]
pub mod abraxas {
    use super::*;

    pub fn initialize_vault(
        ctx: Context<InitializeVault>,
        name: String,
        asset_type: String,
        rwa_mint: Pubkey,
    ) -> Result<()> {
        require!(name.len() <= MAX_NAME_LEN, AbraxasError::NameTooLong);
        require!(asset_type.len() <= MAX_ASSET_LEN, AbraxasError::AssetTypeTooLong);

        let vault = &mut ctx.accounts.vault;
        vault.owner = ctx.accounts.owner.key();
        vault.name = name;
        vault.asset_type = asset_type;
        vault.rwa_mint = rwa_mint;
        vault.agent_mint = Pubkey::default();
        vault.rules_hash = String::new();
        vault.deposited_lamports = 0;
        vault.price_speed_threshold_bps = 1000;
        vault.liquidity_drain_threshold_bps = 900;
        vault.activity_spike_threshold_bps = 1200;
        vault.last_circuit_action = CircuitAction::None;

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: vault.owner,
            action: "initialize_vault".to_string(),
            details: "Vault initialized for RWA strategy".to_string(),
        });

        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        require!(amount > 0, AbraxasError::InvalidAmount);

        let transfer_ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.owner.key(),
            &ctx.accounts.vault.key(),
            amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_ix,
            &[
                ctx.accounts.owner.to_account_info(),
                ctx.accounts.vault.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        let vault = &mut ctx.accounts.vault;
        vault.deposited_lamports = vault
            .deposited_lamports
            .checked_add(amount)
            .ok_or(AbraxasError::MathOverflow)?;

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            action: "deposit".to_string(),
            details: format!("Deposited {} lamports", amount),
        });

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        require!(amount > 0, AbraxasError::InvalidAmount);

        let vault = &mut ctx.accounts.vault;
        require!(vault.owner == ctx.accounts.owner.key(), AbraxasError::Unauthorized);
        require!(vault.deposited_lamports >= amount, AbraxasError::InsufficientVaultBalance);

        let vault_info = vault.to_account_info();
        let owner_info = ctx.accounts.owner.to_account_info();

        **vault_info.try_borrow_mut_lamports()? -= amount;
        **owner_info.try_borrow_mut_lamports()? += amount;

        vault.deposited_lamports = vault
            .deposited_lamports
            .checked_sub(amount)
            .ok_or(AbraxasError::MathOverflow)?;

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            action: "withdraw".to_string(),
            details: format!("Withdrew {} lamports", amount),
        });

        Ok(())
    }

    pub fn assign_agent(ctx: Context<AssignAgent>, agent_mint: Pubkey, rules_hash: String) -> Result<()> {
        require!(rules_hash.len() <= MAX_RULES_HASH, AbraxasError::RulesHashTooLong);

        let vault = &mut ctx.accounts.vault;
        require!(vault.owner == ctx.accounts.owner.key(), AbraxasError::Unauthorized);

        vault.agent_mint = agent_mint;
        vault.rules_hash = rules_hash.clone();

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            action: "assign_agent".to_string(),
            details: format!("Assigned Sophia agent with rules {}", rules_hash),
        });

        Ok(())
    }

    pub fn evaluate_circuit(
        ctx: Context<EvaluateCircuit>,
        price_speed_bps: u64,
        liquidity_drain_bps: u64,
        activity_spike_bps: u64,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;

        let action = if price_speed_bps >= vault.price_speed_threshold_bps
            || liquidity_drain_bps >= vault.liquidity_drain_threshold_bps
            || activity_spike_bps >= vault.activity_spike_threshold_bps
        {
            CircuitAction::PauseRisk
        } else if price_speed_bps >= vault.price_speed_threshold_bps / 2
            || liquidity_drain_bps >= vault.liquidity_drain_threshold_bps / 2
        {
            CircuitAction::ReleaseLiquidity
        } else {
            CircuitAction::None
        };

        vault.last_circuit_action = action.clone();

        emit!(CircuitEvaluated {
            vault: vault.key(),
            price_speed_bps,
            liquidity_drain_bps,
            activity_spike_bps,
            action: action.clone(),
        });

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.authority.key(),
            action: "evaluate_circuit".to_string(),
            details: format!(
                "Action {:?} for speed={}, drain={}, spike={}",
                action, price_speed_bps, liquidity_drain_bps, activity_spike_bps
            ),
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + VaultAccount::INIT_SPACE,
        seeds = [b"vault", owner.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, VaultAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"vault", owner.key().as_ref()], bump)]
    pub vault: Account<'info, VaultAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"vault", owner.key().as_ref()], bump)]
    pub vault: Account<'info, VaultAccount>,
}

#[derive(Accounts)]
pub struct AssignAgent<'info> {
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"vault", owner.key().as_ref()], bump)]
    pub vault: Account<'info, VaultAccount>,
}

#[derive(Accounts)]
pub struct EvaluateCircuit<'info> {
    pub authority: Signer<'info>,
    #[account(mut)]
    pub vault: Account<'info, VaultAccount>,
}

#[account]
#[derive(InitSpace)]
pub struct VaultAccount {
    pub owner: Pubkey,
    #[max_len(MAX_NAME_LEN)]
    pub name: String,
    #[max_len(MAX_ASSET_LEN)]
    pub asset_type: String,
    pub rwa_mint: Pubkey,
    pub agent_mint: Pubkey,
    #[max_len(MAX_RULES_HASH)]
    pub rules_hash: String,
    pub deposited_lamports: u64,
    pub price_speed_threshold_bps: u64,
    pub liquidity_drain_threshold_bps: u64,
    pub activity_spike_threshold_bps: u64,
    pub last_circuit_action: CircuitAction,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, InitSpace, PartialEq, Eq)]
pub enum CircuitAction {
    None,
    ReleaseLiquidity,
    MoveToStables,
    PauseRisk,
}

#[event]
pub struct CircuitEvaluated {
    pub vault: Pubkey,
    pub price_speed_bps: u64,
    pub liquidity_drain_bps: u64,
    pub activity_spike_bps: u64,
    pub action: CircuitAction,
}

#[event]
pub struct AgentActionLogged {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub action: String,
    pub details: String,
}

#[error_code]
pub enum AbraxasError {
    #[msg("Unauthorized request")]
    Unauthorized,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Insufficient vault balance")]
    InsufficientVaultBalance,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Vault name exceeds max length")]
    NameTooLong,
    #[msg("Asset type exceeds max length")]
    AssetTypeTooLong,
    #[msg("Rules hash exceeds max length")]
    RulesHashTooLong,
}
