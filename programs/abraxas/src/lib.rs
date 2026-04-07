use anchor_lang::prelude::*;

declare_id!("GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm");

const MAX_NAME_LEN: usize = 64;
const MAX_ASSET_LEN: usize = 24;
const MAX_RULES_HASH: usize = 96;
const MAX_ASSET_CLASS_LEN: usize = 32;
const MAX_SYMBOL_LEN: usize = 12;
const MAX_SIGNAL_LEN: usize = 160;
const SECONDS_PER_DAY: u64 = 86_400;
const THIRTY_DAY_SECONDS: u64 = 30 * SECONDS_PER_DAY;
const NINETY_DAY_SECONDS: u64 = 90 * SECONDS_PER_DAY;
const ONE_EIGHTY_DAY_SECONDS: u64 = 180 * SECONDS_PER_DAY;

// Profile & Airdrop Constants
const MAX_USERNAME_LEN: usize = 32;
const MAX_BLESSING_LEN: usize = 256;
const MAX_REFERRAL_CODE_LEN: usize = 16;
const MAX_ABRAXAS_ID_LEN: usize = 16;

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
        vault.asset_class = "generic_rwa".to_string();
        vault.rwa_mint = rwa_mint;
        vault.stablecoin_mint = Pubkey::default();
        vault.athlete_equity_mint = Pubkey::default();
        vault.agent_mint = Pubkey::default();
        vault.lead_asset_symbol = String::new();
        vault.rules_hash = String::new();
        vault.deposited_lamports = 0;
        vault.total_value_usdc = 0;
        vault.stablecoin_exposure_usdc = 0;
        vault.value_growth_bps = 0;
        vault.performance_score = 0;
        vault.nil_rewards_lamports = 0;
        vault.last_king_signal = String::new();
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

    pub fn deposit_lacasa_nft(
        ctx: Context<OwnerVaultAccess>,
        stablecoin_amount: u64,
        stablecoin_mint: Pubkey,
    ) -> Result<()> {
        require!(stablecoin_amount > 0, AbraxasError::InvalidAmount);

        let vault = &mut ctx.accounts.vault;
        require!(vault.owner == ctx.accounts.owner.key(), AbraxasError::Unauthorized);

        vault.stablecoin_mint = stablecoin_mint;
        vault.stablecoin_exposure_usdc = vault
            .stablecoin_exposure_usdc
            .checked_add(stablecoin_amount)
            .ok_or(AbraxasError::MathOverflow)?;
        vault.total_value_usdc = vault
            .total_value_usdc
            .checked_add(stablecoin_amount)
            .ok_or(AbraxasError::MathOverflow)?;

        emit!(LaCasaDepositRecorded {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            stablecoin_mint,
            stablecoin_amount,
        });

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            action: "deposit_lacasa_nft".to_string(),
            details: format!("La Casa exposure deposited: {} units", stablecoin_amount),
        });

        Ok(())
    }

    pub fn deposit_athlete_equity(
        ctx: Context<OwnerVaultAccess>,
        athlete_symbol: String,
        athlete_mint: Pubkey,
        stablecoin_mint: Pubkey,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, AbraxasError::InvalidAmount);
        require!(athlete_symbol.len() <= MAX_SYMBOL_LEN, AbraxasError::AthleteSymbolTooLong);

        let vault = &mut ctx.accounts.vault;
        require!(vault.owner == ctx.accounts.owner.key(), AbraxasError::Unauthorized);

        vault.asset_class = "athlete_equity".to_string();
        vault.lead_asset_symbol = athlete_symbol.clone();
        vault.athlete_equity_mint = athlete_mint;
        vault.stablecoin_mint = stablecoin_mint;
        vault.stablecoin_exposure_usdc = vault
            .stablecoin_exposure_usdc
            .checked_add(amount)
            .ok_or(AbraxasError::MathOverflow)?;
        vault.total_value_usdc = vault
            .total_value_usdc
            .checked_add(amount)
            .ok_or(AbraxasError::MathOverflow)?;

        emit!(AthleteEquityDeposited {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            athlete_symbol: athlete_symbol.clone(),
            athlete_mint,
            stablecoin_mint,
            amount,
        });

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.owner.key(),
            action: "deposit_athlete_equity".to_string(),
            details: format!(
                "Athlete equity {} deposited for {} units of stablecoin exposure",
                athlete_symbol, amount
            ),
        });

        Ok(())
    }

    pub fn record_athlete_growth(
        ctx: Context<TrackKingSignal>,
        athlete_symbol: String,
        stats_growth_bps: u16,
        training_growth_bps: u16,
        nil_rewards_lamports: u64,
        updated_performance_score: u16,
        king_signal: String,
    ) -> Result<()> {
        require!(athlete_symbol.len() <= MAX_SYMBOL_LEN, AbraxasError::AthleteSymbolTooLong);
        require!(king_signal.len() <= MAX_SIGNAL_LEN, AbraxasError::SignalTooLong);

        let vault = &mut ctx.accounts.vault;

        let combined_growth_bps = u64::from(stats_growth_bps)
            .checked_add(u64::from(training_growth_bps))
            .ok_or(AbraxasError::MathOverflow)?;
        let value_delta = vault
            .stablecoin_exposure_usdc
            .checked_mul(combined_growth_bps)
            .ok_or(AbraxasError::MathOverflow)?
            .checked_div(10_000)
            .ok_or(AbraxasError::MathOverflow)?;

        vault.total_value_usdc = vault
            .total_value_usdc
            .checked_add(value_delta)
            .ok_or(AbraxasError::MathOverflow)?;
        vault.value_growth_bps = vault
            .value_growth_bps
            .checked_add(combined_growth_bps as i64)
            .ok_or(AbraxasError::MathOverflow)?;
        vault.performance_score = updated_performance_score;
        vault.nil_rewards_lamports = vault
            .nil_rewards_lamports
            .checked_add(nil_rewards_lamports)
            .ok_or(AbraxasError::MathOverflow)?;
        vault.last_king_signal = king_signal.clone();
        vault.lead_asset_symbol = athlete_symbol.clone();

        emit!(KingSignalTracked {
            vault: vault.key(),
            authority: ctx.accounts.authority.key(),
            athlete_symbol: athlete_symbol.clone(),
            stats_growth_bps,
            training_growth_bps,
            nil_rewards_lamports,
            updated_performance_score,
            projected_value_delta: value_delta,
            king_signal: king_signal.clone(),
        });

        emit!(AgentActionLogged {
            vault: vault.key(),
            authority: ctx.accounts.authority.key(),
            action: "record_athlete_growth".to_string(),
            details: format!(
                "King AI tracked {} with {} bps projected growth",
                athlete_symbol, combined_growth_bps
            ),
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

    pub fn stake_abra(
        ctx: Context<StakeAbra>,
        amount: u64,
        duration_days: u64,
    ) -> Result<()> {
        require!(amount > 0, AbraxasError::InvalidAmount);
        require!(
            duration_days == 30 || duration_days == 90 || duration_days == 180,
            AbraxasError::InvalidLockDuration
        );

        let stake = &mut ctx.accounts.stake;
        stake.staker = ctx.accounts.staker.key();
        stake.abra_amount = amount;
        stake.lock_duration_days = duration_days;
        stake.staked_at = Clock::get()?.unix_timestamp as u64;
        stake.unlock_at = stake.staked_at
            + match duration_days {
                30 => THIRTY_DAY_SECONDS,
                90 => NINETY_DAY_SECONDS,
                180 => ONE_EIGHTY_DAY_SECONDS,
                _ => return Err(AbraxasError::InvalidLockDuration.into()),
            };
        stake.multiplier_bps = match duration_days {
            30 => 12_000,  // 1.2x
            90 => 18_000,  // 1.8x
            180 => 25_000, // 2.5x
            _ => return Err(AbraxasError::InvalidLockDuration.into()),
        };
        stake.is_active = true;
        stake.claimed_rewards = 0;

        emit!(AbraStaked {
            staker: ctx.accounts.staker.key(),
            amount,
            duration_days,
            multiplier_bps: stake.multiplier_bps,
            unlock_at: stake.unlock_at,
        });

        Ok(())
    }

    pub fn unstake_abra(ctx: Context<UnstakeAbra>) -> Result<()> {
        let stake = &mut ctx.accounts.stake;
        let now = Clock::get()?.unix_timestamp as u64;

        require!(stake.staker == ctx.accounts.staker.key(), AbraxasError::Unauthorized);
        require!(stake.is_active, AbraxasError::StakeNotActive);
        require!(now >= stake.unlock_at, AbraxasError::StakeLocked);

        stake.is_active = false;

        emit!(AbraUnstaked {
            staker: ctx.accounts.staker.key(),
            amount: stake.abra_amount,
            total_earned: stake.abra_amount
                .checked_mul(stake.multiplier_bps)
                .unwrap_or(0)
                .checked_div(10_000)
                .unwrap_or(0),
        });

        Ok(())
    }

    pub fn claim_stakes(ctx: Context<ClaimStakes>) -> Result<()> {
        let stake = &mut ctx.accounts.stake;
        require!(stake.staker == ctx.accounts.staker.key(), AbraxasError::Unauthorized);
        require!(stake.is_active == false, AbraxasError::StakeNotUnstaked);

        let earned = stake.abra_amount
            .checked_mul(stake.multiplier_bps)
            .ok_or(AbraxasError::MathOverflow)?
            .checked_div(10_000)
            .ok_or(AbraxasError::MathOverflow)?
            .checked_sub(stake.abra_amount)
            .ok_or(AbraxasError::MathOverflow)?;

        stake.claimed_rewards = earned;

        emit!(AbrasRewardsClaimed {
            staker: ctx.accounts.staker.key(),
            original_stake: stake.abra_amount,
            rewards_earned: earned,
            total_value: stake.abra_amount.checked_add(earned).unwrap_or(0),
        });

        Ok(())
    }

    // ──── Profile & Airdrop Instructions ────

    pub fn create_user_profile(
        ctx: Context<CreateUserProfile>,
        abraxas_id: String,
        rune: String,
        blessing: String,
        username: Option<String>,
    ) -> Result<()> {
        require!(abraxas_id.len() <= MAX_ABRAXAS_ID_LEN, AbraxasError::IdTooLong);
        require!(blessing.len() <= MAX_BLESSING_LEN, AbraxasError::BlessingTooLong);
        if let Some(ref un) = username {
            require!(un.len() <= MAX_USERNAME_LEN, AbraxasError::UsernameTooLong);
        }

        let profile = &mut ctx.accounts.profile;
        profile.wallet_address = ctx.accounts.owner.key();
        profile.abraxas_id = abraxas_id.clone();
        profile.rune = rune.clone();
        profile.blessing = blessing.clone();
        profile.username = username.clone();
        profile.created_at = Clock::get()?.unix_timestamp as u64;
        profile.last_updated_at = profile.created_at;
        profile.airdrop_points = 100; // Initial points for profile creation
        profile.referrals_sent = 0;
        profile.successful_referrals = 0;
        profile.referral_code = format!("REF-{}", abraxas_id.clone());

        emit!(UserProfileCreated {
            wallet: ctx.accounts.owner.key(),
            abraxas_id: abraxas_id.clone(),
            rune: rune.clone(),
            username: username.clone(),
        });

        Ok(())
    }

    pub fn record_airdrop_action(
        ctx: Context<RecordAirdropAction>,
        action_type: String,
        points_awarded: u32,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        require!(profile.wallet_address == ctx.accounts.owner.key(), AbraxasError::Unauthorized);

        profile.airdrop_points = profile
            .airdrop_points
            .checked_add(u64::from(points_awarded))
            .ok_or(AbraxasError::MathOverflow)?;
        profile.last_updated_at = Clock::get()?.unix_timestamp as u64;

        emit!(AirdropActionRecorded {
            wallet: ctx.accounts.owner.key(),
            action: action_type.clone(),
            points_awarded,
            total_points: profile.airdrop_points,
        });

        Ok(())
    }

    pub fn record_referral(
        ctx: Context<RecordReferral>,
        referral_type: String,
        points_awarded: u32,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        require!(profile.wallet_address == ctx.accounts.owner.key(), AbraxasError::Unauthorized);

        profile.referrals_sent = profile
            .referrals_sent
            .checked_add(1)
            .ok_or(AbraxasError::MathOverflow)?;

        profile.airdrop_points = profile
            .airdrop_points
            .checked_add(u64::from(points_awarded))
            .ok_or(AbraxasError::MathOverflow)?;

        profile.last_updated_at = Clock::get()?.unix_timestamp as u64;

        let referral_record = &mut ctx.accounts.referral_record;
        referral_record.referrer = ctx.accounts.owner.key();
        referral_record.referral_type = referral_type.clone();
        referral_record.points_awarded = u64::from(points_awarded);
        referral_record.created_at = Clock::get()?.unix_timestamp as u64;
        referral_record.status = ReferralStatus::Pending;

        emit!(ReferralRecorded {
            referrer: ctx.accounts.owner.key(),
            referral_type: referral_type.clone(),
            points_awarded,
        });

        Ok(())
    }

    pub fn record_off_ramp(
        ctx: Context<RecordOffRamp>,
        abra_amount: u64,
        usdc_amount: u64,
        fiat_amount: u64,
        payment_method: String,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        require!(profile.wallet_address == ctx.accounts.owner.key(), AbraxasError::Unauthorized);

        let off_ramp_record = &mut ctx.accounts.off_ramp_record;
        off_ramp_record.wallet = ctx.accounts.owner.key();
        off_ramp_record.abra_amount = abra_amount;
        off_ramp_record.usdc_amount = usdc_amount;
        off_ramp_record.fiat_amount = fiat_amount;
        off_ramp_record.payment_method = payment_method.clone();
        off_ramp_record.created_at = Clock::get()?.unix_timestamp as u64;
        off_ramp_record.status = OffRampStatus::Completed;

        // Award points for off-ramp (10 engagement points)
        profile.airdrop_points = profile
            .airdrop_points
            .checked_add(10)
            .ok_or(AbraxasError::MathOverflow)?;
        profile.last_updated_at = Clock::get()?.unix_timestamp as u64;

        emit!(OffRampRecorded {
            wallet: ctx.accounts.owner.key(),
            abra_amount,
            usdc_amount,
            fiat_amount,
            payment_method: payment_method.clone(),
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
pub struct OwnerVaultAccess<'info> {
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

#[derive(Accounts)]
pub struct TrackKingSignal<'info> {
    pub authority: Signer<'info>,
    #[account(mut)]
    pub vault: Account<'info, VaultAccount>,
}

#[derive(Accounts)]
pub struct StakeAbra<'info> {
    #[account(mut)]
    pub staker: Signer<'info>,
    #[account(
        init,
        payer = staker,
        space = 8 + StakeAccount::INIT_SPACE,
        seeds = [b"stake", staker.key().as_ref()],
        bump
    )]
    pub stake: Account<'info, StakeAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UnstakeAbra<'info> {
    pub staker: Signer<'info>,
    #[account(mut, seeds = [b"stake", staker.key().as_ref()], bump)]
    pub stake: Account<'info, StakeAccount>,
}

#[derive(Accounts)]
pub struct ClaimStakes<'info> {
    pub staker: Signer<'info>,
    #[account(mut, seeds = [b"stake", staker.key().as_ref()], bump)]
    pub stake: Account<'info, StakeAccount>,
}

// ──── Profile & Airdrop Account Structs ────

#[derive(Accounts)]
pub struct CreateUserProfile<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + UserProfileAccount::INIT_SPACE,
        seeds = [b"profile", owner.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, UserProfileAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordAirdropAction<'info> {
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"profile", owner.key().as_ref()], bump)]
    pub profile: Account<'info, UserProfileAccount>,
}

#[derive(Accounts)]
pub struct RecordReferral<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"profile", owner.key().as_ref()], bump)]
    pub profile: Account<'info, UserProfileAccount>,
    #[account(
        init,
        payer = owner,
        space = 8 + ReferralRecordAccount::INIT_SPACE,
        seeds = [b"referral", owner.key().as_ref(), owner.key().as_ref()],
        bump
    )]
    pub referral_record: Account<'info, ReferralRecordAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordOffRamp<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"profile", owner.key().as_ref()], bump)]
    pub profile: Account<'info, UserProfileAccount>,
    #[account(
        init,
        payer = owner,
        space = 8 + OffRampRecordAccount::INIT_SPACE,
        seeds = [b"offramp", owner.key().as_ref(), &Clock::get()?.unix_timestamp.to_le_bytes()],
        bump
    )]
    pub off_ramp_record: Account<'info, OffRampRecordAccount>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct VaultAccount {
    pub owner: Pubkey,
    #[max_len(MAX_NAME_LEN)]
    pub name: String,
    #[max_len(MAX_ASSET_LEN)]
    pub asset_type: String,
    #[max_len(MAX_ASSET_CLASS_LEN)]
    pub asset_class: String,
    pub rwa_mint: Pubkey,
    pub stablecoin_mint: Pubkey,
    pub athlete_equity_mint: Pubkey,
    pub agent_mint: Pubkey,
    #[max_len(MAX_SYMBOL_LEN)]
    pub lead_asset_symbol: String,
    #[max_len(MAX_RULES_HASH)]
    pub rules_hash: String,
    pub deposited_lamports: u64,
    pub total_value_usdc: u64,
    pub stablecoin_exposure_usdc: u64,
    pub value_growth_bps: i64,
    pub performance_score: u16,
    pub nil_rewards_lamports: u64,
    #[max_len(MAX_SIGNAL_LEN)]
    pub last_king_signal: String,
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

#[account]
#[derive(InitSpace)]
pub struct StakeAccount {
    pub staker: Pubkey,
    pub abra_amount: u64,
    pub lock_duration_days: u64,
    pub staked_at: u64,
    pub unlock_at: u64,
    pub multiplier_bps: u64,
    pub is_active: bool,
    pub claimed_rewards: u64,
}

// ──── Profile & Airdrop Account Structs ────

#[account]
#[derive(InitSpace)]
pub struct UserProfileAccount {
    pub wallet_address: Pubkey,
    #[max_len(MAX_ABRAXAS_ID_LEN)]
    pub abraxas_id: String,
    pub rune: String, // Single character rune
    #[max_len(MAX_BLESSING_LEN)]
    pub blessing: String,
    #[max_len(MAX_USERNAME_LEN)]
    pub username: Option<String>,
    pub created_at: u64,
    pub last_updated_at: u64,
    pub airdrop_points: u64,
    pub referrals_sent: u32,
    pub successful_referrals: u32,
    #[max_len(MAX_REFERRAL_CODE_LEN)]
    pub referral_code: String,
}

#[account]
#[derive(InitSpace)]
pub struct ReferralRecordAccount {
    pub referrer: Pubkey,
    #[max_len(32)]
    pub referral_type: String, // "share", "signup", "staking"
    pub points_awarded: u64,
    pub created_at: u64,
    pub status: ReferralStatus,
}

#[account]
#[derive(InitSpace)]
pub struct OffRampRecordAccount {
    pub wallet: Pubkey,
    pub abra_amount: u64,
    pub usdc_amount: u64,
    pub fiat_amount: u64,
    #[max_len(32)]
    pub payment_method: String, // "apple_pay", "cash_app"
    pub created_at: u64,
    pub status: OffRampStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, InitSpace, PartialEq, Eq)]
pub enum ReferralStatus {
    Pending,
    Claimed,
    Failed,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, InitSpace, PartialEq, Eq)]
pub enum OffRampStatus {
    Pending,
    Completed,
    Failed,
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

#[event]
pub struct LaCasaDepositRecorded {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub stablecoin_mint: Pubkey,
    pub stablecoin_amount: u64,
}

#[event]
pub struct AthleteEquityDeposited {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub athlete_symbol: String,
    pub athlete_mint: Pubkey,
    pub stablecoin_mint: Pubkey,
    pub amount: u64,
}

#[event]
pub struct KingSignalTracked {
    pub vault: Pubkey,
    pub authority: Pubkey,
    pub athlete_symbol: String,
    pub stats_growth_bps: u16,
    pub training_growth_bps: u16,
    pub nil_rewards_lamports: u64,
    pub updated_performance_score: u16,
    pub projected_value_delta: u64,
    pub king_signal: String,
}

#[event]
pub struct AbraStaked {
    pub staker: Pubkey,
    pub amount: u64,
    pub duration_days: u64,
    pub multiplier_bps: u64,
    pub unlock_at: u64,
}

#[event]
pub struct AbraUnstaked {
    pub staker: Pubkey,
    pub amount: u64,
    pub total_earned: u64,
}

#[event]
pub struct AbrasRewardsClaimed {
    pub staker: Pubkey,
    pub original_stake: u64,
    pub rewards_earned: u64,
    pub total_value: u64,
}

// ──── Profile & Airdrop Events ────

#[event]
pub struct UserProfileCreated {
    pub wallet: Pubkey,
    pub abraxas_id: String,
    pub rune: String,
    pub username: Option<String>,
}

#[event]
pub struct AirdropActionRecorded {
    pub wallet: Pubkey,
    pub action: String,
    pub points_awarded: u32,
    pub total_points: u64,
}

#[event]
pub struct ReferralRecorded {
    pub referrer: Pubkey,
    pub referral_type: String,
    pub points_awarded: u32,
}

#[event]
pub struct OffRampRecorded {
    pub wallet: Pubkey,
    pub abra_amount: u64,
    pub usdc_amount: u64,
    pub fiat_amount: u64,
    pub payment_method: String,
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
    #[msg("Athlete symbol exceeds max length")]
    AthleteSymbolTooLong,
    #[msg("King signal exceeds max length")]
    SignalTooLong,
    #[msg("Invalid lock duration - must be 30, 90, or 180 days")]
    InvalidLockDuration,
    #[msg("Stake is not active")]
    StakeNotActive,
    #[msg("Stake is still locked")]
    StakeLocked,
    #[msg("Stake has not been unstaked yet")]
    StakeNotUnstaked,
    #[msg("Abraxas ID exceeds max length")]
    IdTooLong,
    #[msg("Blessing exceeds max length")]
    BlessingTooLong,
    #[msg("Username exceeds max length")]
    UsernameTooLong,
}
