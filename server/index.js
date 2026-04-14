import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Simple in-memory transaction store (replace with database)
const transactions = new Map();

// ============================================================================
// HEALTH CHECK ENDPOINT
// ============================================================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// STRIPE PAYMENT INTENT ENDPOINT (ACH Deposits)
// ============================================================================

app.post('/api/stripe/create-payment-intent', async (req, res) => {
  try {
    const { amount, walletAddress, email, name } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Stripe expects cents
      currency: 'usd',
      payment_method_types: ['us_bank_account'],
      metadata: {
        walletAddress,
        transactionId: uuidv4(),
        timestamp: new Date().toISOString(),
      },
      description: `ABRA Deposit - ${walletAddress}`,
      statement_descriptor: 'ABRAXAS DEPOSIT',
      // For US Bank Account payments
      mandate_data: {
        customer_acceptance: {
          type: 'online',
          accepted_at: Math.floor(Date.now() / 1000),
        },
      },
    });

    // Store transaction record
    transactions.set(paymentIntent.id, {
      id: paymentIntent.id,
      walletAddress,
      amount,
      type: 'deposit',
      status: 'pending',
      createdAt: new Date().toISOString(),
      email,
      name,
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount,
      currency: 'usd',
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to create payment intent',
      code: error.code,
    });
  }
});

// ============================================================================
// STRIPE PAYOUT ENDPOINT (Cash Out)
// ============================================================================

app.post('/api/stripe/create-payout', async (req, res) => {
  try {
    const { amount, bankAccountToken, walletAddress, email } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!bankAccountToken) {
      return res.status(400).json({ error: 'Bank account token required' });
    }

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    // Create destination bank account from token
    const bankAccount = await stripe.tokens.retrieve(bankAccountToken);
    if (!bankAccount || bankAccount.type !== 'bank_account') {
      return res.status(400).json({ error: 'Invalid bank account token' });
    }

    // Create payout
    const payout = await stripe.payouts.create({
      amount: Math.round(amount), // Stripe expects cents
      currency: 'usd',
      destination: bankAccountToken,
      method: 'instant', // Use 'standard' for next business day
      metadata: {
        walletAddress,
        transactionId: uuidv4(),
        timestamp: new Date().toISOString(),
      },
      description: `ABRA Payout - ${walletAddress}`,
      statement_descriptor: 'ABRAXAS PAYOUT',
    });

    // Store transaction record
    transactions.set(payout.id, {
      id: payout.id,
      walletAddress,
      amount,
      type: 'payout',
      status: payout.status,
      createdAt: new Date().toISOString(),
      email,
      bankAccountLast4: bankAccount.bank_account.last4,
    });

    res.json({
      success: true,
      payoutId: payout.id,
      amount,
      currency: 'usd',
      status: payout.status,
      arrivalDate: payout.arrival_date,
    });
  } catch (error) {
    console.error('Payout Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to create payout',
      code: error.code,
    });
  }
});

// ============================================================================
// BANK ACCOUNT TOKEN CREATION
// ============================================================================

app.post('/api/stripe/create-bank-account-token', async (req, res) => {
  try {
    const { accountNumber, routingNumber, accountHolderName, walletAddress } = req.body;

    // Validation
    if (!accountNumber || !routingNumber || !accountHolderName) {
      return res.status(400).json({ error: 'Missing required bank account fields' });
    }

    // Create bank account token
    const token = await stripe.tokens.create({
      bank_account: {
        country: 'US',
        currency: 'usd',
        account_holder_name: accountHolderName,
        account_holder_type: 'individual',
        routing_number: routingNumber,
        account_number: accountNumber,
      },
    });

    res.json({
      success: true,
      token: token.id,
      bankAccountId: token.bank_account.id,
      last4: token.bank_account.last4,
    });
  } catch (error) {
    console.error('Bank Account Token Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to create bank account token',
      code: error.code,
    });
  }
});

// ============================================================================
// GET TRANSACTION STATUS
// ============================================================================

app.get('/api/transactions/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    // First check in-memory store
    if (transactions.has(transactionId)) {
      const tx = transactions.get(transactionId);
      return res.json({ success: true, transaction: tx });
    }

    // Try to fetch from Stripe (Payment Intent or Payout)
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
      return res.json({
        success: true,
        transaction: {
          id: paymentIntent.id,
          type: 'deposit',
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          createdAt: new Date(paymentIntent.created * 1000).toISOString(),
        },
      });
    } catch (e) {
      // Not a payment intent, try payout
    }

    try {
      const payout = await stripe.payouts.retrieve(transactionId);
      return res.json({
        success: true,
        transaction: {
          id: payout.id,
          type: 'payout',
          status: payout.status,
          amount: payout.amount,
          createdAt: new Date(payout.created * 1000).toISOString(),
        },
      });
    } catch (e) {
      // Not a payout either
    }

    res.status(404).json({ error: 'Transaction not found' });
  } catch (error) {
    console.error('Get Transaction Error:', error);
    res.status(500).json({ error: error.message || 'Failed to get transaction' });
  }
});

// ============================================================================
// STRIPE WEBHOOK HANDLER
// ============================================================================

app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentIntentSucceeded(event.data.object);
      break;

    case 'payment_intent.payment_failed':
      handlePaymentIntentFailed(event.data.object);
      break;

    case 'payout.created':
      handlePayoutCreated(event.data.object);
      break;

    case 'payout.paid':
      handlePayoutPaid(event.data.object);
      break;

    case 'payout.failed':
      handlePayoutFailed(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Webhook handlers
function handlePaymentIntentSucceeded(paymentIntent) {
  console.log(`✅ Payment Intent Succeeded: ${paymentIntent.id}`);
  console.log(`   Wallet: ${paymentIntent.metadata.walletAddress}`);
  console.log(`   Amount: $${(paymentIntent.amount / 100).toFixed(2)}`);

  // Update transaction status
  if (transactions.has(paymentIntent.id)) {
    const tx = transactions.get(paymentIntent.id);
    tx.status = 'succeeded';
    tx.succeededAt = new Date().toISOString();
  }

  // TODO: Send confirmation email
  // TODO: Update database
  // TODO: Trigger on-chain ABRA token transfer
}

function handlePaymentIntentFailed(paymentIntent) {
  console.error(`❌ Payment Intent Failed: ${paymentIntent.id}`);
  console.error(`   Reason: ${paymentIntent.last_payment_error?.message}`);

  if (transactions.has(paymentIntent.id)) {
    const tx = transactions.get(paymentIntent.id);
    tx.status = 'failed';
    tx.failureReason = paymentIntent.last_payment_error?.message;
    tx.failedAt = new Date().toISOString();
  }

  // TODO: Send failure notification email
}

function handlePayoutCreated(payout) {
  console.log(`📤 Payout Created: ${payout.id}`);
  console.log(`   Status: ${payout.status}`);
  console.log(`   Amount: $${(payout.amount / 100).toFixed(2)}`);
}

function handlePayoutPaid(payout) {
  console.log(`✅ Payout Paid: ${payout.id}`);
  console.log(`   Arrived At: ${new Date(payout.arrival_date * 1000).toISOString()}`);

  if (transactions.has(payout.id)) {
    const tx = transactions.get(payout.id);
    tx.status = 'succeeded';
    tx.paidAt = new Date(payout.arrival_date * 1000).toISOString();
  }

  // TODO: Send confirmation email
  // TODO: Update database
}

function handlePayoutFailed(payout) {
  console.error(`❌ Payout Failed: ${payout.id}`);
  console.error(`   Reason: ${payout.failure_reason}`);

  if (transactions.has(payout.id)) {
    const tx = transactions.get(payout.id);
    tx.status = 'failed';
    tx.failureReason = payout.failure_reason;
    tx.failedAt = new Date().toISOString();
  }

  // TODO: Send failure notification email
}

// ============================================================================
// SPECIES AWAKENING CAMPAIGN ENDPOINTS
// ============================================================================

// In-memory stores (replace with database in production)
const speciesAwakeningUsers = new Map();
const speciesAwakeningTasks = new Map([
  ['discord-join', { id: 'discord-join', icon: '�', title: 'Join Discord as Genesis Validator', platform: 'Discord', type: 'daily', reward: 100, link: 'https://discord.gg/abraxas', description: 'Join the Discord community and download your Genesis Validator certificate' }],
  ['twitter-follow', { id: 'twitter-follow', icon: '𝕏', title: 'Follow Abraxas on X', platform: 'X', type: 'daily', reward: 50, link: 'https://x.com/abraxasio' }],
  ['twitter-retweet', { id: 'twitter-retweet', icon: '𝕏', title: 'Retweet Species Awakening Post', platform: 'X', type: 'daily', reward: 100, link: 'https://x.com/abraxasio' }],
  ['discord-post', { id: 'discord-post', icon: '💬', title: 'Post About Daughters of Abraxas', platform: 'Discord', type: 'daily', reward: 75, link: 'https://discord.gg/abraxas' }],
  ['twitter-rwa', { id: 'twitter-rwa', icon: '𝕏', title: 'Share RWA Explanation (Weekly)', platform: 'X', type: 'weekly', reward: 250, link: 'https://x.com' }],
  ['referral', { id: 'referral', icon: '✨', title: 'Invite 3 Friends (Weekly)', platform: 'Multi', type: 'weekly', reward: 300 }],
]);

const LEVEL_THRESHOLDS = [
  { level: 1, required: 0, name: 'Novice Awakening' },
  { level: 2, required: 100, name: 'Seeker of Truth' },
  { level: 3, required: 250, name: 'Wisdom Keeper' },
  { level: 4, required: 450, name: 'Rune Learner' },
  { level: 5, required: 700, name: 'Protocol Student' },
  { level: 10, required: 2000, name: 'Aether Adept' },
  { level: 15, required: 4000, name: 'Awakening Seeker' },
  { level: 20, required: 7000, name: 'Sovereign Master' },
];

const WHITELIST_THRESHOLD = 1500;

function getLevelInfo(points) {
  const currentLevel = LEVEL_THRESHOLDS
    .slice()
    .reverse()
    .find((t) => points >= t.required) || LEVEL_THRESHOLDS[0];

  const nextLevel = LEVEL_THRESHOLDS
    .find((t) => points < t.required) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];

  const progressToNext =
    points < nextLevel.required
      ? Math.round(
          ((points - currentLevel.required) / (nextLevel.required - currentLevel.required)) * 100
        )
      : 100;

  return { currentLevel, nextLevel, progressToNext };
}

// Get or create user progress
function getOrCreateUserProgress(walletAddress) {
  if (!speciesAwakeningUsers.has(walletAddress)) {
    speciesAwakeningUsers.set(walletAddress, {
      walletAddress,
      totalPoints: 0,
      completedTasks: [],
      joinedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });
  }
  return speciesAwakeningUsers.get(walletAddress);
}

// GET /api/species-awakening/profile/:walletAddress
app.get('/api/species-awakening/profile/:walletAddress', (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const progress = getOrCreateUserProgress(walletAddress);
    const levelInfo = getLevelInfo(progress.totalPoints);
    
    res.json({
      success: true,
      profile: {
        walletAddress: progress.walletAddress,
        totalPoints: progress.totalPoints,
        level: levelInfo.currentLevel.level,
        levelName: levelInfo.currentLevel.name,
        progressToNext: levelInfo.progressToNext,
        nextLevelPoints: levelInfo.nextLevel.required,
        completedTasks: progress.completedTasks,
        whitelistEligible: progress.totalPoints >= WHITELIST_THRESHOLD,
        joinedAt: progress.joinedAt,
        lastUpdatedAt: progress.lastUpdatedAt,
      },
    });
  } catch (error) {
    console.error('Get Species Awakening Profile Error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// GET /api/species-awakening/tasks/:walletAddress
app.get('/api/species-awakening/tasks/:walletAddress', (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const progress = getOrCreateUserProgress(walletAddress);
    const tasks = Array.from(speciesAwakeningTasks.values()).map(task => ({
      ...task,
      completed: progress.completedTasks.includes(task.id),
    }));

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/species-awakening/complete-task
app.post('/api/species-awakening/complete-task', (req, res) => {
  try {
    const { walletAddress, taskId } = req.body;

    if (!walletAddress || !taskId) {
      return res.status(400).json({ error: 'Wallet address and task ID required' });
    }

    const task = speciesAwakeningTasks.get(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const progress = getOrCreateUserProgress(walletAddress);

    if (progress.completedTasks.includes(taskId)) {
      return res.status(400).json({ error: 'Task already completed' });
    }

    // Mark task as completed
    progress.completedTasks.push(taskId);
    progress.totalPoints += task.reward;
    progress.lastUpdatedAt = new Date().toISOString();

    // Get updated level info
    const levelInfo = getLevelInfo(progress.totalPoints);

    res.json({
      success: true,
      message: `Task completed! +${task.reward} points`,
      profile: {
        walletAddress: progress.walletAddress,
        totalPoints: progress.totalPoints,
        level: levelInfo.currentLevel.level,
        levelName: levelInfo.currentLevel.name,
        progressToNext: levelInfo.progressToNext,
        whitelistEligible: progress.totalPoints >= WHITELIST_THRESHOLD,
      },
    });
  } catch (error) {
    console.error('Complete Task Error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// GET /api/species-awakening/leaderboard?limit=100
app.get('/api/species-awakening/leaderboard', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '100'), 1000);

    // Convert to array, calculate levels, and sort
    const leaderboard = Array.from(speciesAwakeningUsers.values())
      .map((user) => {
        const levelInfo = getLevelInfo(user.totalPoints);
        return {
          walletAddress: user.walletAddress,
          totalPoints: user.totalPoints,
          level: levelInfo.currentLevel.level,
          levelName: levelInfo.currentLevel.name,
          whitelistEligible: user.totalPoints >= WHITELIST_THRESHOLD,
          joinedAt: user.joinedAt,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit)
      .map((entry, index) => ({
        rank: index + 1,
        ...entry,
      }));

    res.json({
      success: true,
      leaderboard,
      total: speciesAwakeningUsers.size,
    });
  } catch (error) {
    console.error('Get Leaderboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/species-awakening/tasks (list all available tasks)
app.get('/api/species-awakening/tasks', (req, res) => {
  try {
    const tasks = Array.from(speciesAwakeningTasks.values());
    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error('Get All Tasks Error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Abraxas Stripe Backend running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`   Health Check: http://localhost:${PORT}/health`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`   ⚠️  Make sure to set STRIPE_WEBHOOK_SECRET for webhook handling`);
  }
});
