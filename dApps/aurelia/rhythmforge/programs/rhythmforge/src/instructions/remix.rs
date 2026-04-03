use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::state::{RemixProposal, MAX_REMIX_TITLE_LEN, MAX_REMIX_URI_LEN};

#[derive(Accounts)]
pub struct SubmitRemix<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(
        init,
        payer = creator,
        space = RemixProposal::SPACE,
        seeds = [b"remix", creator.key().as_ref(), remix_seed.key().as_ref()],
        bump
    )]
    pub remix_proposal: Account<'info, RemixProposal>,
    pub remix_seed: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintRemix<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(
        mut,
        has_one = creator,
    )]
    pub remix_proposal: Account<'info, RemixProposal>,
}

pub fn handle_submit_remix(
    ctx: Context<SubmitRemix>,
    parent_track_hash: [u8; 32],
    title: String,
    remix_uri: String,
) -> Result<()> {
    require!(title.len() <= MAX_REMIX_TITLE_LEN, ErrorCode::TitleTooLong);
    require!(remix_uri.len() <= MAX_REMIX_URI_LEN, ErrorCode::UriTooLong);

    let remix_proposal = &mut ctx.accounts.remix_proposal;
    remix_proposal.creator = ctx.accounts.creator.key();
    remix_proposal.parent_track_hash = parent_track_hash;
    remix_proposal.title = title;
    remix_proposal.remix_uri = remix_uri;
    remix_proposal.minted = false;
    remix_proposal.created_at = Clock::get()?.unix_timestamp;

    Ok(())
}

pub fn handle_mint_remix(ctx: Context<MintRemix>) -> Result<()> {
    let remix_proposal = &mut ctx.accounts.remix_proposal;
    require!(!remix_proposal.minted, ErrorCode::RemixAlreadyMinted);

    remix_proposal.minted = true;

    Ok(())
}
