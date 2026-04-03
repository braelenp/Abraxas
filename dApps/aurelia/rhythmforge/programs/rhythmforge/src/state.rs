use anchor_lang::prelude::*;

pub const MAX_REMIX_TITLE_LEN: usize = 64;
pub const MAX_REMIX_URI_LEN: usize = 220;
pub const MAX_VOTE_TITLE_LEN: usize = 80;
pub const MAX_VOTE_URI_LEN: usize = 220;

#[account]
pub struct RemixProposal {
	pub creator: Pubkey,
	pub parent_track_hash: [u8; 32],
	pub title: String,
	pub remix_uri: String,
	pub minted: bool,
	pub created_at: i64,
}

impl RemixProposal {
	pub const SPACE: usize = 8
		+ 32
		+ 32
		+ 4
		+ MAX_REMIX_TITLE_LEN
		+ 4
		+ MAX_REMIX_URI_LEN
		+ 1
		+ 8;
}

#[account]
pub struct VoteProposal {
	pub authority: Pubkey,
	pub title: String,
	pub description_uri: String,
	pub yes_votes: u64,
	pub no_votes: u64,
	pub voting_end_ts: i64,
	pub executed: bool,
}

impl VoteProposal {
	pub const SPACE: usize = 8
		+ 32
		+ 4
		+ MAX_VOTE_TITLE_LEN
		+ 4
		+ MAX_VOTE_URI_LEN
		+ 8
		+ 8
		+ 8
		+ 1;
}

#[account]
pub struct VoteReceipt {
	pub proposal: Pubkey,
	pub voter: Pubkey,
	pub vote_yes: bool,
	pub stake_weight: u64,
	pub created_at: i64,
}

impl VoteReceipt {
	pub const SPACE: usize = 8 + 32 + 32 + 1 + 8 + 8;
}
