pub const USER_ACCOUNT_SEED: &[u8] = b"user-account";
pub const VAULT_SEED: &[u8] = b"vault";
pub const DISCRIMINATOR_LEN: usize = 8;
pub const MIN_DEPOSIT: u64 = 1_000_000; // 0.001 SOL in lamports
// Reserved for future slippage enforcement in the trade instruction
pub const MAX_SLIPPAGE_BPS: u16 = 1000; // 10%
