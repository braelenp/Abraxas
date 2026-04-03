use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::{
    VoteProposal,
    VoteReceipt,
    MAX_VOTE_TITLE_LEN,
    MAX_VOTE_URI_LEN,
};

#[derive(Accounts)]
pub struct CreateVoteProposal<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = VoteProposal::SPACE,
        seeds = [b"vote_proposal", authority.key().as_ref(), proposal_seed.key().as_ref()],
        bump
    )]
    pub vote_proposal: Account<'info, VoteProposal>,
    pub proposal_seed: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,
    #[account(mut)]
    pub vote_proposal: Account<'info, VoteProposal>,
    #[account(
        init,
        payer = voter,
        space = VoteReceipt::SPACE,
        seeds = [b"vote_receipt", vote_proposal.key().as_ref(), voter.key().as_ref()],
        bump
    )]
    pub vote_receipt: Account<'info, VoteReceipt>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FinalizeVote<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    pub vote_proposal: Account<'info, VoteProposal>,
}

pub fn handle_create_vote_proposal(
    ctx: Context<CreateVoteProposal>,
    title: String,
    description_uri: String,
    voting_end_ts: i64,
) -> Result<()> {
    require!(title.len() <= MAX_VOTE_TITLE_LEN, ErrorCode::TitleTooLong);
    require!(description_uri.len() <= MAX_VOTE_URI_LEN, ErrorCode::UriTooLong);

    let now = Clock::get()?.unix_timestamp;
    require!(voting_end_ts > now, ErrorCode::InvalidVotingWindow);

    let vote_proposal = &mut ctx.accounts.vote_proposal;
    vote_proposal.authority = ctx.accounts.authority.key();
    vote_proposal.title = title;
    vote_proposal.description_uri = description_uri;
    vote_proposal.yes_votes = 0;
    vote_proposal.no_votes = 0;
    vote_proposal.voting_end_ts = voting_end_ts;
    vote_proposal.executed = false;

    Ok(())
}

pub fn handle_cast_vote(
    ctx: Context<CastVote>,
    vote_yes: bool,
    stake_weight: u64,
) -> Result<()> {
    require!(stake_weight > 0, ErrorCode::InvalidStakeWeight);

    let now = Clock::get()?.unix_timestamp;
    let proposal = &mut ctx.accounts.vote_proposal;

    require!(now <= proposal.voting_end_ts, ErrorCode::VotingClosed);
    require!(!proposal.executed, ErrorCode::VoteAlreadyFinalized);

    if vote_yes {
        proposal.yes_votes = proposal.yes_votes.saturating_add(stake_weight);
    } else {
        proposal.no_votes = proposal.no_votes.saturating_add(stake_weight);
    }

    let vote_receipt = &mut ctx.accounts.vote_receipt;
    vote_receipt.proposal = proposal.key();
    vote_receipt.voter = ctx.accounts.voter.key();
    vote_receipt.vote_yes = vote_yes;
    vote_receipt.stake_weight = stake_weight;
    vote_receipt.created_at = now;

    Ok(())
}

pub fn handle_finalize_vote(ctx: Context<FinalizeVote>) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let proposal = &mut ctx.accounts.vote_proposal;

    require!(now > proposal.voting_end_ts, ErrorCode::VotingStillOpen);
    require!(!proposal.executed, ErrorCode::VoteAlreadyFinalized);

    proposal.executed = true;

    Ok(())
}
