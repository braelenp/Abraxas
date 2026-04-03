use anchor_lang::prelude::*;

declare_id!("Grf2PBNSRU1nU6WFBf2yYM2fuCGapGCB2qSFextj3pzT");

const SECONDS_PER_DAY: i64 = 86_400;

#[program]
pub mod ownyourmoment {
    use super::*;

    pub fn initialize_profile(
        ctx: Context<InitializeProfile>,
        display_name: String,
    ) -> Result<()> {
        require!(display_name.len() <= 32, OymError::DisplayNameTooLong);

        let clock = Clock::get()?;
        let profile = &mut ctx.accounts.athlete_profile;

        profile.authority = ctx.accounts.authority.key();
        profile.display_name = display_name;
        profile.total_completed_drills = 0;
        profile.current_streak = 0;
        profile.best_streak = 0;
        profile.pending_skr_rewards = 0;
        profile.total_skr_claimed = 0;
        profile.last_check_in = 0;
        profile.created_at = clock.unix_timestamp;
        profile.bump = ctx.bumps.athlete_profile;

        emit!(AthleteProfileInitialized {
            authority: profile.authority,
            created_at: profile.created_at,
        });

        Ok(())
    }

    pub fn log_drill_completion(
        ctx: Context<LogDrillCompletion>,
        entry_index: u32,
        title: String,
        category: String,
        duration_minutes: u16,
        intensity: u8,
        reward_amount: u64,
    ) -> Result<()> {
        require!(title.len() <= 64, OymError::TitleTooLong);
        require!(category.len() <= 32, OymError::CategoryTooLong);
        require!(duration_minutes > 0, OymError::InvalidDuration);
        require!(intensity <= 10, OymError::InvalidIntensity);

        let clock = Clock::get()?;
        let profile = &mut ctx.accounts.athlete_profile;
        let expected_index = profile
            .total_completed_drills
            .checked_add(1)
            .ok_or(OymError::MathOverflow)?;

        require_keys_eq!(profile.authority, ctx.accounts.authority.key(), OymError::Unauthorized);
        require_eq!(entry_index, expected_index, OymError::InvalidEntryIndex);

        let elapsed = clock.unix_timestamp.saturating_sub(profile.last_check_in);
        if profile.last_check_in == 0 {
            profile.current_streak = 1;
        } else if elapsed <= SECONDS_PER_DAY {
        } else if elapsed <= SECONDS_PER_DAY * 2 {
            profile.current_streak = profile
                .current_streak
                .checked_add(1)
                .ok_or(OymError::MathOverflow)?;
        } else {
            profile.current_streak = 1;
        }

        if profile.current_streak > profile.best_streak {
            profile.best_streak = profile.current_streak;
        }

        profile.total_completed_drills = expected_index;
        profile.pending_skr_rewards = profile
            .pending_skr_rewards
            .checked_add(reward_amount)
            .ok_or(OymError::MathOverflow)?;
        profile.last_check_in = clock.unix_timestamp;

        let drill_log = &mut ctx.accounts.drill_log;
        drill_log.athlete = profile.key();
        drill_log.entry_index = entry_index;
        drill_log.title = title.clone();
        drill_log.category = category.clone();
        drill_log.duration_minutes = duration_minutes;
        drill_log.intensity = intensity;
        drill_log.reward_amount = reward_amount;
        drill_log.completed_at = clock.unix_timestamp;
        drill_log.bump = ctx.bumps.drill_log;

        emit!(DrillCompleted {
            authority: profile.authority,
            entry_index,
            title,
            category,
            reward_amount,
            current_streak: profile.current_streak,
        });

        Ok(())
    }

    pub fn mint_nil_badge(
        ctx: Context<MintNilBadge>,
        achievement_key: [u8; 32],
        mint: Pubkey,
    ) -> Result<()> {
        let clock = Clock::get()?;
        let profile = &ctx.accounts.athlete_profile;

        require_keys_eq!(profile.authority, ctx.accounts.authority.key(), OymError::Unauthorized);

        let badge_record = &mut ctx.accounts.badge_record;
        badge_record.athlete = profile.key();
        badge_record.mint = mint;
        badge_record.achievement_key = achievement_key;
        badge_record.minted_at = clock.unix_timestamp;
        badge_record.bump = ctx.bumps.badge_record;

        emit!(NilBadgeMinted {
            authority: profile.authority,
            mint,
            minted_at: badge_record.minted_at,
        });

        Ok(())
    }

    pub fn claim_skr_rewards(ctx: Context<ClaimSkrRewards>, amount: u64) -> Result<()> {
        let profile = &mut ctx.accounts.athlete_profile;

        require_keys_eq!(profile.authority, ctx.accounts.authority.key(), OymError::Unauthorized);
        require!(amount > 0, OymError::InvalidRewardAmount);
        require!(profile.pending_skr_rewards >= amount, OymError::InsufficientRewards);

        profile.pending_skr_rewards = profile
            .pending_skr_rewards
            .checked_sub(amount)
            .ok_or(OymError::MathOverflow)?;
        profile.total_skr_claimed = profile
            .total_skr_claimed
            .checked_add(amount)
            .ok_or(OymError::MathOverflow)?;

        emit!(SkrRewardsClaimed {
            authority: profile.authority,
            amount,
            remaining_rewards: profile.pending_skr_rewards,
        });

        Ok(())
    }

    pub fn log_king_ai_action(
        ctx: Context<LogKingAiAction>,
        action_index: u32,
        action_type: String,
        summary: String,
    ) -> Result<()> {
        require!(action_type.len() <= 32, OymError::ActionTypeTooLong);
        require!(summary.len() <= 280, OymError::SummaryTooLong);

        let clock = Clock::get()?;
        let profile = &ctx.accounts.athlete_profile;

        require_keys_eq!(profile.authority, ctx.accounts.authority.key(), OymError::Unauthorized);

        let action_log = &mut ctx.accounts.king_ai_action_log;
        action_log.athlete = profile.key();
        action_log.action_index = action_index;
        action_log.action_type = action_type.clone();
        action_log.summary = summary.clone();
        action_log.created_at = clock.unix_timestamp;
        action_log.bump = ctx.bumps.king_ai_action_log;

        emit!(KingAiActionLogged {
            authority: profile.authority,
            action_index,
            action_type,
            summary,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeProfile<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + AthleteProfile::INIT_SPACE,
        seeds = [b"athlete", authority.key().as_ref()],
        bump
    )]
    pub athlete_profile: Account<'info, AthleteProfile>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(entry_index: u32)]
pub struct LogDrillCompletion<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [b"athlete", authority.key().as_ref()],
        bump = athlete_profile.bump
    )]
    pub athlete_profile: Account<'info, AthleteProfile>,
    #[account(
        init,
        payer = authority,
        space = 8 + DrillLog::INIT_SPACE,
        seeds = [b"drill", athlete_profile.key().as_ref(), entry_index.to_le_bytes().as_ref()],
        bump
    )]
    pub drill_log: Account<'info, DrillLog>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(achievement_key: [u8; 32])]
pub struct MintNilBadge<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        seeds = [b"athlete", authority.key().as_ref()],
        bump = athlete_profile.bump
    )]
    pub athlete_profile: Account<'info, AthleteProfile>,
    #[account(
        init,
        payer = authority,
        space = 8 + BadgeRecord::INIT_SPACE,
        seeds = [b"badge", athlete_profile.key().as_ref(), achievement_key.as_ref()],
        bump
    )]
    pub badge_record: Account<'info, BadgeRecord>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimSkrRewards<'info> {
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [b"athlete", authority.key().as_ref()],
        bump = athlete_profile.bump
    )]
    pub athlete_profile: Account<'info, AthleteProfile>,
}

#[derive(Accounts)]
#[instruction(action_index: u32)]
pub struct LogKingAiAction<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        seeds = [b"athlete", authority.key().as_ref()],
        bump = athlete_profile.bump
    )]
    pub athlete_profile: Account<'info, AthleteProfile>,
    #[account(
        init,
        payer = authority,
        space = 8 + KingAiActionLog::INIT_SPACE,
        seeds = [b"king-action", athlete_profile.key().as_ref(), action_index.to_le_bytes().as_ref()],
        bump
    )]
    pub king_ai_action_log: Account<'info, KingAiActionLog>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct AthleteProfile {
    pub authority: Pubkey,
    #[max_len(32)]
    pub display_name: String,
    pub total_completed_drills: u32,
    pub current_streak: u16,
    pub best_streak: u16,
    pub pending_skr_rewards: u64,
    pub total_skr_claimed: u64,
    pub last_check_in: i64,
    pub created_at: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct DrillLog {
    pub athlete: Pubkey,
    pub entry_index: u32,
    #[max_len(64)]
    pub title: String,
    #[max_len(32)]
    pub category: String,
    pub duration_minutes: u16,
    pub intensity: u8,
    pub reward_amount: u64,
    pub completed_at: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct BadgeRecord {
    pub athlete: Pubkey,
    pub mint: Pubkey,
    pub achievement_key: [u8; 32],
    pub minted_at: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct KingAiActionLog {
    pub athlete: Pubkey,
    pub action_index: u32,
    #[max_len(32)]
    pub action_type: String,
    #[max_len(280)]
    pub summary: String,
    pub created_at: i64,
    pub bump: u8,
}

#[event]
pub struct AthleteProfileInitialized {
    pub authority: Pubkey,
    pub created_at: i64,
}

#[event]
pub struct DrillCompleted {
    pub authority: Pubkey,
    pub entry_index: u32,
    pub title: String,
    pub category: String,
    pub reward_amount: u64,
    pub current_streak: u16,
}

#[event]
pub struct NilBadgeMinted {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub minted_at: i64,
}

#[event]
pub struct SkrRewardsClaimed {
    pub authority: Pubkey,
    pub amount: u64,
    pub remaining_rewards: u64,
}

#[event]
pub struct KingAiActionLogged {
    pub authority: Pubkey,
    pub action_index: u32,
    pub action_type: String,
    pub summary: String,
}

#[error_code]
pub enum OymError {
    #[msg("The athlete is not authorized to modify this profile.")]
    Unauthorized,
    #[msg("The athlete display name exceeds the allowed length.")]
    DisplayNameTooLong,
    #[msg("The drill title exceeds the allowed length.")]
    TitleTooLong,
    #[msg("The drill category exceeds the allowed length.")]
    CategoryTooLong,
    #[msg("The logged drill duration must be greater than zero.")]
    InvalidDuration,
    #[msg("Intensity must be between 0 and 10.")]
    InvalidIntensity,
    #[msg("The supplied drill entry index is invalid.")]
    InvalidEntryIndex,
    #[msg("The action type exceeds the allowed length.")]
    ActionTypeTooLong,
    #[msg("The King AI summary exceeds the allowed length.")]
    SummaryTooLong,
    #[msg("Reward amount must be greater than zero.")]
    InvalidRewardAmount,
    #[msg("Insufficient pending rewards are available.")]
    InsufficientRewards,
    #[msg("A math overflow occurred.")]
    MathOverflow,
}
