use anchor_lang::prelude::*;

mod constants;
mod errors;
mod instructions;
mod state;
mod utils;

use instructions::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod first_son {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::handler(ctx)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        instructions::deposit::handler(ctx, amount)
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        instructions::withdraw::handler(ctx, amount)
    }

    pub fn trade(ctx: Context<Trade>, amount: u64, direction: u8, slippage_bps: u16) -> Result<()> {
        instructions::trade::handler(ctx, amount, direction, slippage_bps)
    }
}
