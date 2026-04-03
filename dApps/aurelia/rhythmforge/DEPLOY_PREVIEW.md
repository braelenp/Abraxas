# Deploy Preview (GitHub + Vercel/Netlify)

## 1) Push to GitHub

1. Create a GitHub repo.
2. From project root run:

```bash
git remote add origin <YOUR_REPO_URL>
git add .
git commit -m "feat: rhythmforge multiplayer + share flow"
git push -u origin main
```

## 2) Deploy on Vercel (free)

1. Go to Vercel and import the GitHub repo.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set env vars:
   - `VITE_MULTIPLAYER_WS_URL` (if using relay)
   - `VITE_PUBLIC_APP_URL` = your deployed URL (e.g. `https://your-rhythmforge.vercel.app`)
6. Deploy.

## 3) Deploy on Netlify (free)

1. Go to Netlify and import the GitHub repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set env vars:
   - `VITE_MULTIPLAYER_WS_URL`
   - `VITE_PUBLIC_APP_URL`
5. Deploy.

## 4) Multiplayer relay (optional)

Local relay:

```bash
npm run dev:multiplayer
```

If you want production multiplayer, deploy `multiplayer/server.js` on a Node host (Render/Fly/Railway), then set:

```bash
VITE_MULTIPLAYER_WS_URL=wss://<your-relay-domain>
```

## 5) Share on X

After submitting a high score, use the in-game **Share on X** button.
It uses `VITE_PUBLIC_APP_URL` when set, otherwise falls back to current browser origin.
