use anchor_lang::prelude::*;

#[error_code]
pub enum FirstSonError {
    #[msg("Unauthorized access")]
    Unauthorized,

    #[msg("Insufficient balance")]
    InsufficientBalance,

    #[msg("Account already initialized")]
    AlreadyInitialized,

    #[msg("Invalid amount: must be greater than zero")]
    InvalidAmount,

    #[msg("Invalid trade direction: must be 0 (buy) or 1 (sell)")]
    InvalidDirection,

    #[msg("Slippage tolerance exceeded")]
    SlippageExceeded,

    #[msg("Amount below minimum deposit threshold")]
    BelowMinimumDeposit,

    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,

    #[msg("Arithmetic underflow")]
    ArithmeticUnderflow,
}
