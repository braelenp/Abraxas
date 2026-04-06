# Sharathon System - Backend Integration Guide

## 🔌 API Integration Points

This document outlines how to connect the frontend Sharathon system with your backend services.

---

## 📡 Data Structures

### UserProfile
```typescript
{
  id: string;                    // UUID
  walletAddress: string;         // Connected wallet
  abraxasId: string;            // "ABRAXAS-001234"
  rune: string;                 // "ᚲ"
  blessing: string;             // Personalized text
  createdAt: string;            // ISO timestamp
  email?: string;
  username?: string;
  profileImageUrl?: string;
  
  // Points tracking
  airdropPoints: {
    profileCreation: number;
    cardShares: number;
    referralSuccess: number;
    communityEngagement: number;
    total: number;
  };
  
  // Referral tracking
  referralCode: string;          // Unique code
  referralsSent: number;
  successfulReferrals: number;
  totalAirdropClaimed: number;
  claimedAirdropAt?: string;
  
  lastUpdatedAt: string;         // ISO timestamp
}
```

### ReferralRecord
```typescript
{
  id: string;                    // UUID
  referrerId: string;            // Wallet address
  referreeId?: string;           // Referral wallet (when claimed)
  timestamp: string;             // ISO timestamp
  type: 'share' | 'signup' | 'staking';
  pointsAwarded: number;
  status: 'pending' | 'claimed' | 'failed';
  referralLink?: string;
}
```

### AirdropLeaderboardEntry
```typescript
{
  rank: number;
  walletAddress: string;
  abraxasId: string;
  rune: string;
  username?: string;
  totalPoints: number;
  successfulReferrals: number;
}
```

---

## 🔑 Key Endpoints to Implement

### 1. POST `/api/profiles`
**Create a new user profile**

**Request:**
```json
{
  "walletAddress": "5u...xeQ",
  "email": "user@example.com",
  "username": "john_doe",
  "signature": "base64_signature_of_wallet_verification"
}
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "uuid",
    "abraxasId": "ABRAXAS-001234",
    "rune": "ᚲ",
    "blessing": "In the dance of runes...",
    "airdropPoints": {
      "profileCreation": 100,
      "cardShares": 0,
      "referralSuccess": 0,
      "communityEngagement": 0,
      "total": 100
    },
    "referralCode": "ABC123XY"
  }
}
```

**Frontend Call Location**: `AbraxasProvider.tsx` - `createUserProfile()` method

---

### 2. GET `/api/profiles/:walletAddress`
**Fetch user profile by wallet**

**Request:**
```
GET /api/profiles/5u...xeQ
```

**Response:**
```json
{
  "success": true,
  "profile": { /* UserProfile object */ }
}
```

**Frontend Call Location**: `EnhanceApp.tsx` - On component mount to load existing profile

---

### 3. POST `/api/referrals`
**Record a referral action (share, signup, staking)**

**Request:**
```json
{
  "referrerId": "5u...xeQ",
  "referreeId": "optional_wallet",
  "type": "share",  // or "signup" or "staking"
  "pointsAwarded": 10,
  "referralCode": "ABC123XY",
  "signature": "base64_signature_of_referrer"
}
```

**Response:**
```json
{
  "success": true,
  "referral": {
    "id": "uuid",
    "status": "pending"
  },
  "profileUpdated": {
    "airdropPoints": { /* updated */ },
    "totalPoints": 110
  }
}
```

**Frontend Call Location**: `useProfile.ts` hooks
- `recordShare()`
- `recordSignup()`
- `recordStakingReferral()`

---

### 4. POST `/api/referrals/confirm`
**Confirm successful referral (e.g., signup or staking)**

**Request:**
```json
{
  "referralId": "uuid",
  "referreeId": "5u...xeQ",
  "type": "staking",
  "bonusPoints": 150,
  "signature": "base64_signature"
}
```

**Response:**
```json
{
  "success": true,
  "referrerUpdated": {
    "successfulReferrals": 1,
    "airdropPoints": { /* updated with bonus */ }
  },
  "referreeAwarded": {
    "profileCreation": 100
  }
}
```

**Frontend Call Location**: `AbraxasProvider.tsx` - `recordSuccessfulReferral()` method

---

### 5. GET `/api/leaderboard`
**Fetch top referrers leaderboard**

**Query Parameters:**
- `limit` (optional): Number of top referrers (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Request:**
```
GET /api/leaderboard?limit=10&offset=0
```

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "walletAddress": "5u...xeQ",
      "abraxasId": "ABRAXAS-001234",
      "rune": "ᚲ",
      "username": "john_doe",
      "totalPoints": 500,
      "successfulReferrals": 5
    },
    // ... more entries
  ],
  "total": 150
}
```

**Frontend Call Location**: `useProfile.ts` - `refreshLeaderboard()` hook

---

### 6. GET `/api/profiles/:walletAddress/leaderboard-rank`
**Get user's current leaderboard rank**

**Request:**
```
GET /api/profiles/5u...xeQ/leaderboard-rank
```

**Response:**
```json
{
  "success": true,
  "rank": 15,
  "totalParticipants": 250,
  "percentile": 94.0
}
```

**Frontend Call Location**: `ReferralLeaderboard.tsx` component (optional for optimization)

---

### 7. POST `/api/airdrop/claim`
**Claim airdrop when eligible**

**Request:**
```json
{
  "walletAddress": "5u...xeQ",
  "profileId": "uuid",
  "pointsTotal": 500,
  "signature": "base64_signature_of_wallet"
}
```

**Response:**
```json
{
  "success": true,
  "claimRecord": {
    "id": "uuid",
    "amount": 1000,
    "currency": "ABRA",
    "claimedAt": "2024-04-06T10:30:00Z",
    "transactionHash": "0x..."
  }
}
```

**Frontend Call Location**: `AirdropPointsWidget.tsx` - Claim button handler

---

### 8. POST `/api/email/send-id-card`
**Send ID card + points summary email**

**Request:**
```json
{
  "email": "user@example.com",
  "abraxasId": "ABRAXAS-001234",
  "rune": "ᚲ",
  "blessing": "In the dance of runes...",
  "points": {
    "profileCreation": 100,
    "cardShares": 30,
    "referralSuccess": 200,
    "communityEngagement": 5,
    "total": 335
  },
  "successfulReferrals": 3,
  "estimatedAirdrop": 670
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "msg_12345",
  "sentAt": "2024-04-06T10:30:00Z"
}
```

**Frontend Call Location**: `profileUtils.ts` - `sendAirdropSummaryEmail()` function

---

## 🔐 Security Requirements

### Wallet Verification
All endpoints modifying user data must require:
1. Wallet address in request
2. Valid Ed25519 signature of request data
3. Signature verification using `@solana/web3.js`

**Example verification:**
```typescript
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetsodium';

function verifyWalletSignature(
  walletAddress: string,
  signature: string,
  message: string
): boolean {
  const publicKey = new PublicKey(walletAddress);
  const signatureBytes = Buffer.from(signature, 'base64');
  const messageBytes = Buffer.from(message, 'utf-8');
  
  return nacl.sign.detached.verify(
    messageBytes,
    signatureBytes,
    publicKey.toBuffer()
  );
}
```

### Rate Limiting
- Profile creation: 1 per wallet per 24 hours
- Referral recording: 10 per wallet per hour
- Leaderboard queries: 100 per IP per hour

### Data Validation
- Email: Valid email format
- Username: 3-20 chars, alphanumeric + hyphen/underscore
- Wallet: Valid Solana public key format
- Points: Non-negative integers

---

## 💾 Database Schema (Recommended)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  abraxas_id TEXT UNIQUE NOT NULL,
  rune TEXT NOT NULL,
  blessing TEXT NOT NULL,
  email TEXT,
  username TEXT UNIQUE,
  referral_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_wallet (wallet_address),
  INDEX idx_referral_code (referral_code)
);
```

### Airdrop Points Table
```sql
CREATE TABLE airdrop_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_creation INT DEFAULT 0,
  card_shares INT DEFAULT 0,
  referral_success INT DEFAULT 0,
  community_engagement INT DEFAULT 0,
  total INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);
```

### Referral Records Table
```sql
CREATE TABLE referral_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referree_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL, -- 'share', 'signup', 'staking'
  points_awarded INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'claimed', 'failed'
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP,
  INDEX idx_referrer (referrer_id),
  INDEX idx_referree (referree_id),
  INDEX idx_status (status)
);
```

### Airdrop Claims Table
```sql
CREATE TABLE airdrop_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  points_total INT NOT NULL,
  amount_abra DECIMAL(18, 8) NOT NULL,
  transaction_hash TEXT,
  claimed_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user (user_id),
  INDEX idx_claimed_at (claimed_at)
);
```

---

## 🔄 Frontend to Backend Flow Diagram

```
Frontend                          Backend
========
User creates profile
    |
    +--POST /api/profiles ------> [Verify wallet]
                                  [Generate ID]
                                  [Create record]
                                  [Return profile]
    <--Profile + ID Card ---------+
    |
User shares/sends referral
    |
    +--POST /api/referrals ------> [Record action]
                                   [Award points]
                                   [Update user]
    <--Points Updated -------------+
    |
User checks leaderboard
    |
    +--GET /api/leaderboard -----> [Query rankings]
                                   [Sort by points]
    <--Leaderboard Data ----------+
    |
Friend signs up with referral link
    |
    +--POST /api/profiles ------> [Create referree]
    |                             [Check referral code]
    |   +--POST /api/referrals/confirm
    |   |                         [Award both users]
    |   |                         [Update leaderboard]
    <--Both notify updates -------+
    |
User becomes eligible (500+ pts)
    |
    +--POST /api/airdrop/claim --> [Verify points]
                                   [Create claim]
                                   [Send ABRA from treasury]
    <--Claim confirmed ----------+
```

---

## 📧 Email Integration

### Using Resend
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendAirdropEmail(params: {
  email: string;
  abraxasId: string;
  rune: string;
  blessing: string;
  points: any;
  successfulReferrals: number;
  estimatedAirdrop: number;
}) {
  const result = await resend.emails.send({
    from: 'hello@abraxas.app',
    to: params.email,
    subject: `Your Abraxas ID Card & Sharathon Summary`,
    html: generateEmailHTML(params),
  });

  return result;
}
```

### Using SendGrid
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendAirdropEmail(params: any) {
  const msg = {
    to: params.email,
    from: 'hello@abraxas.app',
    subject: 'Your Abraxas ID Card & Sharathon Summary',
    html: generateEmailHTML(params),
  };

  return sgMail.send(msg);
}
```

---

## 🧪 Testing Checklist

- [ ] Profile creation with all fields
- [ ] Profile retrieval by wallet
- [ ] Referral recording (all types)
- [ ] Referral confirmation with points
- [ ] Leaderboard retrieval and sorting
- [ ] User rank calculation
- [ ] Airdrop claim eligibility check
- [ ] Email sending
- [ ] Signature verification
- [ ] Rate limiting
- [ ] Data validation
- [ ] Error handling

---

## 🚨 Error Handling

### Common Error Responses

```json
{
  "success": false,
  "error": "profile_already_exists",
  "message": "User already has a profile"
}
```

```json
{
  "success": false,
  "error": "invalid_signature",
  "message": "Wallet signature verification failed"
}
```

```json
{
  "success": false,
  "error": "insufficient_points",
  "message": "User has 335 points, needs 500 to claim"
}
```

---

## 📊 Analytics Events to Track

Consider logging these events for analytics:
- `profile.created` - New profile created
- `referral.shared` - ID card shared
- `referral.received` - Someone signed up via link
- `referral.staking` - Referee staked ABRA
- `airdrop.eligible` - User reached 500 points
- `airdrop.claimed` - User claimed airdrop
- `email.sent` - ID card email sent

---

## 🔗 Environment Variables Required

```bash
# Frontend
VITE_API_URL=https://api.abraxas.app
VITE_AIRDROP_THRESHOLD=500
VITE_ESTIMATED_AIRDROP_VALUE=1000

# Backend
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
SENDGRID_API_KEY=SG._...
JWT_SECRET=your_secret_key
SOLANA_RPC_URL=https://api.devnet.solana.com
TREASURY_WALLET=5u...xeQ
ABRA_MINT_ADDRESS=5c...GS
```

---

## ✅ Implementation Priority

1. **Phase 1** (MVP): User profiles, basic points tracking, leaderboard
2. **Phase 2**: Referral recording & confirmation, email integration
3. **Phase 3**: Airdrop claims, on-chain verification
4. **Phase 4**: Analytics, admin dashboard, webhooks

---

This guide provides everything needed to connect the frontend Sharathon system with a production backend. Start with Phase 1 endpoints and expand from there.

Good luck! 🚀
