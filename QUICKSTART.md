# Neb's Tracker - Quick Start Guide

Get your extension uploaded and available for everyone in 5 steps.

## Step 1: Create GitHub Account & Repository (5 minutes)

1. Go to https://github.com/signup
2. Create account (if you don't have one)
3. Go to https://github.com/new
4. Name: `nebs-tracker`
5. Description: "Real-time Twitch follower and poll tracker"
6. Click "Create repository"

## Step 2: Upload Files to GitHub (5 minutes)

After creating repository, you'll see instructions. Click "uploading an existing file" and:

1. Upload all files from `/Users/alexpettit/Desktop/Nebula/Neb's tracker/`:
   - overlay.html
   - config.html
   - mobile.html
   - overlay-styles.css
   - config-styles.css
   - twitch-auth.js
   - twitch-api.js
   - overlay-layout.js
   - overlay-config.js
   - manifest.json
   - README.md
   - DEPLOYMENT.md
   - .gitignore

2. Commit files (click "Commit changes")

## Step 3: Enable GitHub Pages (2 minutes)

1. Go to your repository
2. Click Settings (top right)
3. Scroll to "Pages" section
4. Under "Branch", select "main"
5. Click Save
6. Wait 1-2 minutes

Your URL is now: `https://YOUR_USERNAME.github.io/nebs-tracker/`

## Step 4: Create Twitch Extension (10 minutes)

1. Go to https://dev.twitch.tv/console/extensions
2. Click "Create Extension"
3. Fill form:
   - Name: `Neb's Tracker`
   - Description: `Real-time follower and poll tracker with customizable glass-like overlays`
   - Category: `Overlays`
4. Click "Create"
5. Copy your **Client ID**

## Step 5: Configure Extension URLs (5 minutes)

In Twitch Developer Console for your extension:

Set these URLs (replace YOUR_USERNAME):

| Setting | URL |
|---------|-----|
| Extension Folder | `https://YOUR_USERNAME.github.io/nebs-tracker/overlay.html` |
| Mobile Folder | `https://YOUR_USERNAME.github.io/nebs-tracker/mobile.html` |
| Configuration URL | `https://YOUR_USERNAME.github.io/nebs-tracker/config.html` |
| OAuth Redirect URI | `https://YOUR_USERNAME.github.io/nebs-tracker/` |

Click Save.

## Step 6: Submit to App Directory (5 minutes)

1. In Developer Console, click your extension
2. Click "Review for App Directory"
3. Fill required fields:
   - Version: `1.0.0`
   - Description: Include features
   - Screenshots: Take 3-5 screenshots of the overlay
4. Upload privacy policy (see DEPLOYMENT.md)
5. Click "Submit for Review"

Wait 1-7 days for Twitch review.

## After Approval ✓

Your extension is live! Streamers can:

1. Go to Twitch Creator Dashboard
2. Extensions → Manage
3. Search "Neb's Tracker"
4. Click Install
5. Configure and use

## Updating Your Extension

If you need to make changes:

1. Edit files locally
2. Upload updated files to GitHub
3. Update version in manifest.json
4. Submit new version in Developer Console

That's it! Free hosting, free extension, zero cost to you.

## Common Questions

**Q: Do I need a server?**
A: No! GitHub Pages is free hosting.

**Q: Do I need a database?**
A: No! Settings stored in each broadcaster's browser.

**Q: Will this cost me money?**
A: No! GitHub Pages is completely free.

**Q: How long does review take?**
A: 1-7 days typically.

**Q: Can I make changes after submission?**
A: Yes! Submit a new version anytime.

**Q: What if approval gets rejected?**
A: Twitch will explain why. You can resubmit with fixes.

## Need Help?

See:
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [SETUP.md](SETUP.md) - Technical reference

Good luck! Your extension will be live soon.
