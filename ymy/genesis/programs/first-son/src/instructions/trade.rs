use anchor_lang::prelude::*;
use crate::constants::*;
use crate::errors::FirstSonError;
use crate::state::*;
use crate::utils::*;

pub const DIRECTION_BUY: u8 = 0;
pub const DIRECTION_SELL: u8 = 1;

#[derive(Accounts)]
pub struct Trade<'info> {
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED, authority.key().as_ref()],
        bump = user_account.bump,
        has_one = authority @ FirstSonError::Unauthorized,
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Trade>, amount: u64, direction: u8, slippage_bps: u16) -> Result<()> {
    require!(amount > 0, FirstSonError::InvalidAmount);
    require!(
        direction == DIRECTION_BUY || direction == DIRECTION_SELL,
        FirstSonError::InvalidDirection
    );
    require!(
        slippage_bps <= MAX_SLIPPAGE_BPS,
        FirstSonError::SlippageExceeded
    );

    let user_account = &mut ctx.accounts.user_account;

    if direction == DIRECTION_BUY {
        require!(user_account.balance >= amount, FirstSonError::InsufficientBalance);
    }

    user_account.trade_count = checked_add(user_account.trade_count, 1)?;

    msg!(
        "The First Son: trade executed — direction={} amount={} slippage_bps={}",
        direction,
        amount,
        slippage_bps
    );

    Ok(())
}
