use anchor_lang::prelude::*;
use crate::constants::*;
use crate::errors::FirstSonError;
use crate::state::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + UserAccount::INIT_SPACE,
        seeds = [USER_ACCOUNT_SEED, authority.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Initialize>) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;

    require!(!user_account.initialized, FirstSonError::AlreadyInitialized);

    user_account.authority = ctx.accounts.authority.key();
    user_account.balance = 0;
    user_account.trade_count = 0;
    user_account.deposit_count = 0;
    user_account.initialized = true;
    user_account.bump = ctx.bumps.user_account;

    msg!("The First Son: account initialized for {}", ctx.accounts.authority.key());

    Ok(())
}
