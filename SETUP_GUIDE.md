# UberCheats Setup Guide

Complete this in order. Takes about 10 minutes.

## Step 1: Create a Supabase Project

1. Visit https://supabase.com
2. Click **"Start your project"** and sign up with email or GitHub
3. Click **"New Project"**
4. Fill in:
   - Organization: (create new or select)
   - Project name: `ubercheats` (or any name)
   - Database password: Create a strong password (save it!)
   - Region: Choose closest to you
5. Click **"Create new project"** and wait 2-3 minutes

## Step 2: Create the Database Table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste the entire contents of the `supabase-setup.sql` file
4. Click **"Run"** button
5. You should see "Success" message

## Step 3: Get Your API Keys

1. In Supabase, go to **Settings** (gear icon, bottom left)
2. Click **API** tab
3. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon Key** (long string starting with `eyJ...`)

## Step 4: Setup Environment Variables

1. In the project folder, rename `.env.example` to `.env.local`
2. Open `.env.local` and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
   ```
3. Save the file

## Step 5: Test Locally

```bash
# Install packages
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000 in your browser. You should see the website. Try:
1. Click "Report an Issue"
2. Fill out and submit a test complaint
3. Click "View Cases"
4. You should see your test complaint appear

If you don't see it, check browser console for errors (F12).

## Step 6: Deploy to Vercel

### Option A: Simple GitHub Deploy (Recommended)

1. Initialize git if you haven't:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repo and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ubercheats.git
   git branch -M main
   git push -u origin main
   ```

3. Visit https://vercel.com and sign in with GitHub

4. Click **"Add New" → "Project"**

5. Select your `ubercheats` repo

6. Vercel will auto-detect Next.js. Click **"Environment Variables"** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Anon Key

7. Click **"Deploy"**

8. Wait 1-2 minutes. You'll get a URL like `ubercheats-xxx.vercel.app`

### Option B: Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted, add your environment variables.

## Step 7: Connect Your Domain

You now have a live site! To use www.ubercheats.info:

1. In Vercel project settings, go to **Domains**
2. Enter `ubercheats.info` (without www initially)
3. Vercel shows you DNS records to add
4. Go to your domain registrar (GoDaddy, Namecheap, etc.)
5. Add the DNS records Vercel shows
6. Wait 5 minutes for DNS to update
7. Vercel should show domain is connected

## Step 8: Verify It Works

1. Visit your live site
2. Submit a complaint
3. View it appears in the cases list
4. Try filtering by category

## Done! 🎉

Your site is live. Share the URL and people can start documenting their Uber issues.

## Important Security Notes

- The API keys in `.env.local` are for local development only
- Once deployed, add environment variables in your hosting dashboard
- Supabase RLS (Row Level Security) is configured to:
  - Allow anyone to view complaints
  - Allow anyone to submit complaints
  - **Prevent editing or deleting complaints** (immutable record)

## Troubleshooting

**"Cannot find module" error?**
Run `npm install` again.

**Site won't load?**
- Check environment variables are set correctly
- Check Supabase project is still running
- Check browser console (F12) for errors

**Complaints not saving?**
- Check Supabase URL is correct (no trailing slash)
- Verify SQL setup ran without errors
- Check Supabase project status isn't paused

**Deploy failed?**
- Check that `npm run build` works locally
- Verify environment variables are in Vercel settings
- Check Vercel build logs for specific error

Need help? Check the full README.md for more details.
