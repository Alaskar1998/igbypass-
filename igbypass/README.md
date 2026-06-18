# IGBypass — Smart Instagram Link Redirector

Paste any URL → get a smart link → share on Instagram → users land in Safari/Chrome automatically.

## Deploy to Vercel (free, 10 minutes)

### Step 1 — Get the code on GitHub
1. Go to github.com → New repository → name it `igbypass` → Create
2. Upload all these files to the repo

### Step 2 — Deploy to Vercel
1. Go to vercel.com → Sign up free with GitHub
2. Click "Add New Project" → Import your `igbypass` repo
3. Click Deploy — done

### Step 3 — Use it
1. Go to your deployed URL (e.g. igbypass.vercel.app)
2. Paste any destination URL
3. Copy the generated link
4. Share it on Instagram instead of your direct link

## How it works

- User taps your link on Instagram
- Server detects Instagram in-app browser
- **Android**: auto-redirects to Chrome via intent URL
- **iOS**: tries x-web-search:// trick to open Safari, shows gate as fallback
- **Not in IG browser**: redirects directly, no friction

## Files
- `public/index.html` — the tool frontend
- `api/r.js` — serverless redirect function
- `vercel.json` — routing config
