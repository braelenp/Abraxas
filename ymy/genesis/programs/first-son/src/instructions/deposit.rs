use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::constants::*;
use crate::errors::FirstSonError;
use crate::state::*;
use crate::utils::*;

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED, authority.key().as_ref()],
        bump = user_account.bump,
        has_one = authority @ FirstSonError::Unauthorized,
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + Vault::INIT_SPACE,
        seeds = [VAULT_SEED, authority.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    require!(amount >= MIN_DEPOSIT, FirstSonError::BelowMinimumDeposit);
    require!(amount > 0, FirstSonError::InvalidAmount);

    let cpi_ctx = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        system_program::Transfer {
            from: ctx.accounts.authority.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
        },
    );
    system_program::transfer(cpi_ctx, amount)?;

    let user_account = &mut ctx.accounts.user_account;
    user_account.balance = checked_add(user_account.balance, amount)?;
    user_account.deposit_count = checked_add(user_account.deposit_count, 1)?;

    let vault = &mut ctx.accounts.vault;
    vault.authority = ctx.accounts.authority.key();
    vault.total_deposits = checked_add(vault.total_deposits, amount)?;
    vault.bump = ctx.bumps.vault;

    msg!("The First Son: deposited {} lamports", amount);

    Ok(())
}
