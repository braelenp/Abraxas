use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Title exceeds maximum length")]
    TitleTooLong,
    #[msg("URI exceeds maximum length")]
    UriTooLong,
    #[msg("Remix has already been minted")]
    RemixAlreadyMinted,
    #[msg("Voting end must be in the future")]
    InvalidVotingWindow,
    #[msg("Stake weight must be greater than zero")]
    InvalidStakeWeight,
    #[msg("Voting has already closed")]
    VotingClosed,
    #[msg("Voting is still open")]
    VotingStillOpen,
    #[msg("Vote proposal has already been finalized")]
    VoteAlreadyFinalized,
}
