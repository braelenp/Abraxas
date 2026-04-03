use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct UserAccount {
    pub authority: Pubkey,
    pub balance: u64,
    pub trade_count: u64,
    pub deposit_count: u64,
    pub initialized: bool,
    pub bump: u8,
}
