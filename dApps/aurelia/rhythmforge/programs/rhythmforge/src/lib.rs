pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("2fMfYMzpjpm7Y6wRXPAmYoZC7b9pdSnoW7KhEXwP1yWf");

#[program]
pub mod rhythmforge {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }

    pub fn submit_remix(
        ctx: Context<SubmitRemix>,
        parent_track_hash: [u8; 32],
        title: String,
        remix_uri: String,
    ) -> Result<()> {
        crate::instructions::remix::handle_submit_remix(ctx, parent_track_hash, title, remix_uri)
    }

    pub fn mint_remix(ctx: Context<MintRemix>) -> Result<()> {
        crate::instructions::remix::handle_mint_remix(ctx)
    }

    pub fn create_vote_proposal(
        ctx: Context<CreateVoteProposal>,
        title: String,
        description_uri: String,
        voting_end_ts: i64,
    ) -> Result<()> {
        crate::instructions::governance::handle_create_vote_proposal(
            ctx,
            title,
            description_uri,
            voting_end_ts,
        )
    }

    pub fn cast_vote(
        ctx: Context<CastVote>,
        vote_yes: bool,
        stake_weight: u64,
    ) -> Result<()> {
        crate::instructions::governance::handle_cast_vote(ctx, vote_yes, stake_weight)
    }

    pub fn finalize_vote(ctx: Context<FinalizeVote>) -> Result<()> {
        crate::instructions::governance::handle_finalize_vote(ctx)
    }
}
