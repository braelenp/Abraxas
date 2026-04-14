# Abraxas Species Awakening - Developer Setup Guide

## Quick Start

### 1. Start the Backend Server

```bash
cd server
npm install
npm start
```

The server will run on `http://localhost:3001`

**Output should show:**
```
🚀 Abraxas Stripe Backend running on port 3001
   Environment: development
   Frontend: http://localhost:5173
```

### 2. Start the Frontend

```bash
cd app
npm install
npm run dev
```

The app will run on `http://localhost:5173`

### 3. Enable Species Awakening Campaign

The Species Awakening Dashboard is now available at:
- Route: `/app/species-awakening`
- Accessible from: Profile tab → "Species Awakening" card

---

## API Endpoints

### Species Awakening Campaign APIs

All endpoints are prefixed with `/api/species-awakening`:

#### Get User Profile
```
GET /api/species-awakening/profile/:walletAddress
```
Returns user's campaign profile with points, level, and progress

#### Get User Tasks
```
GET /api/species-awakening/tasks/:walletAddress
```
Returns list of available tasks with completion status

#### Complete a Task
```
POST /api/species-awakening/complete-task
Body: { walletAddress, taskId }
```
Marks a task as completed and awards points

#### Get Leaderboard
```
GET /api/species-awakening/leaderboard?limit=100
```
Returns top participants sorted by points

#### List All Tasks
```
GET /api/species-awakening/tasks
```
Returns all available campaign tasks

---

## Environment Configuration

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## Troubleshooting

### "Loading Campaign..." stuck on screen

1. **Check if server is running:**
   ```bash
   curl http://localhost:3001/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Check browser console for errors:**
   - Open DevTools (F12)
   - Check Console tab for error messages
   - Check Network tab to see if API calls are failing

3. **Verify environment variables:**
   - Frontend should have `REACT_APP_API_URL` set correctly
   - Backend should be listening on port 3001

4. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### API returns 403 or CORS errors

- Make sure backend `FRONTEND_URL` includes the frontend's URL
- Server defaults to `http://localhost:5173` and `http://localhost:3000`

---

## Data Storage

Currently, the Species Awakening campaign uses **in-memory storage**. This means:

- ✅ Data persists during the development session
- ❌ Data is lost when the server restarts
- ⚠️ Multiple server instances won't share data

### Migration to Database

To persist data across restarts, replace the in-memory Maps in `server/index.js`:

```javascript
// Replace:
const speciesAwakeningUsers = new Map();

// With your database:
// const db = await mongodb.connect(process.env.MONGODB_URI);
// const speciesAwakeningUsers = db.collection('species_awakening_users');
```

---

## Testing the Campaign

1. **Connect wallet** in the app
2. **Navigate to Profile tab**
3. **Click "Species Awakening"** card
4. **Complete tasks** by clicking "Mark Done"
5. **View leaderboard** to see rankings
6. **Share your progress** using the Share button

---

## Support

For issues or questions:
- Check the console logs in your terminal (both frontend and backend)
- Verify all environment variables are set
- Make sure both app and server are running
- Restart both services if something seems stuck
