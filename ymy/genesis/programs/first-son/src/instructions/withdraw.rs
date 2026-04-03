use anchor_lang::prelude::*;
use crate::constants::*;
use crate::errors::FirstSonError;
use crate::state::*;
use crate::utils::*;

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED, authority.key().as_ref()],
        bump = user_account.bump,
        has_one = authority @ FirstSonError::Unauthorized,
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        seeds = [VAULT_SEED, authority.key().as_ref()],
        bump = vault.bump,
        has_one = authority @ FirstSonError::Unauthorized,
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    require!(amount > 0, FirstSonError::InvalidAmount);

    let user_account = &mut ctx.accounts.user_account;
    require!(user_account.balance >= amount, FirstSonError::InsufficientBalance);

    let vault = &mut ctx.accounts.vault;
    let vault_lamports = vault.to_account_info().lamports();
    require!(vault_lamports >= amount, FirstSonError::InsufficientBalance);

    **vault.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.authority.to_account_info().try_borrow_mut_lamports()? += amount;

    user_account.balance = checked_sub(user_account.balance, amount)?;
    vault.total_withdrawals = checked_add(vault.total_withdrawals, amount)?;

    msg!("The First Son: withdrew {} lamports", amount);

    Ok(())
}
