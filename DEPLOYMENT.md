# Neb's Tracker - Deployment & App Directory Submission

Complete guide to deploy and submit your Twitch Extension for public use.

## Step 1: Deploy to GitHub Pages (Free Hosting)

### 1.1 Create GitHub Repository

```bash
cd "/Users/alexpettit/Desktop/Nebula/Neb's tracker"
git init
git add .
git commit -m "Initial commit: Neb's Tracker extension"
```

### 1.2 Push to GitHub

1. Go to https://github.com/new
2. Create repository: `nebs-tracker`
3. Copy your repository URL
4. Run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/nebs-tracker.git
git branch -M main
git push -u origin main
```

### 1.3 Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages"
3. Select "main" branch
4. Click Save
5. Wait 2-5 minutes

Your extension is now hosted at: `https://YOUR_USERNAME.github.io/nebs-tracker/`

## Step 2: Create Twitch Extension

### 2.1 Set Up in Developer Console

1. Go to https://dev.twitch.tv/console/extensions
2. Click "Create Extension"
3. Fill in details:
   - **Name**: Neb's Tracker
   - **Description**: Real-time follower and poll tracker with customizable glass-like overlays
   - **Category**: Overlays
4. Copy your **Client ID**

### 2.2 Configure Extension URLs

In Developer Console, set these URLs (replace YOUR_USERNAME):

- **Overlay URL**: `https://YOUR_USERNAME.github.io/nebs-tracker/overlay.html`
- **Mobile URL**: `https://YOUR_USERNAME.github.io/nebs-tracker/mobile.html`
- **Config URL**: `https://YOUR_USERNAME.github.io/nebs-tracker/config.html`

### 2.3 Set OAuth Redirect URI

- **OAuth Redirect URI**: `https://YOUR_USERNAME.github.io/nebs-tracker/`

### 2.4 Request Permissions

In the "Permissions" section, ensure these are selected:
- bits:read
- channel:read:subscriptions
- channel:read:polls
- moderation:read
- user:read:follows

## Step 3: Prepare for App Directory Submission

### 3.1 Add Required Files

Create these files in your repository:

**privacy-policy.md** - Privacy Policy
```markdown
# Privacy Policy

Neb's Tracker collects only publicly available data from Twitch:
- Follower count (publicly visible)
- Active poll data (publicly visible)
- No personal data is stored or sold
- Settings are stored locally in user's browser
```

**terms.md** - Terms of Service
```markdown
# Terms of Service

Neb's Tracker is provided as-is.
Use at your own risk. Extension authors are not liable for misuse.
```

### 3.2 Update manifest.json

Add proper icon URL (use Twitch CDN or host your own):

```json
"icon_urls": {
    "100x100": "https://YOUR_USERNAME.github.io/nebs-tracker/icon.png"
}
```

Create a 100x100 icon image and add to repository.

### 3.3 Test Before Submission

1. Go to https://dev.twitch.tv/console/extensions
2. Click your extension
3. Click "Test Configuration" or test on your own channel first

## Step 4: Submit to Twitch App Directory

### 4.1 Prepare Submission

1. In Developer Console, click "Review for App Directory"
2. Fill in submission form:
   - **Version**: 1.0.0
   - **Description**: Clear, concise description of features
   - **Category**: Overlays
   - **Content Rating**: Include anything relevant
   - **Supported Languages**: English
   - **Screenshots**: 1024x576 screenshots of the overlay in action

### 4.2 Screenshots to Include

Take screenshots showing:
1. Follower widget with progress bar
2. Poll widget displaying options
3. Fighting effect on 2-option poll
4. Configuration panel
5. Settings interface

### 4.3 Submit for Review

1. Click "Submit for Review"
2. Fill required fields
3. Accept terms
4. Submit

### 4.4 Wait for Review

- Twitch reviews in 1-7 days
- May request changes
- You'll get email notifications

## Step 5: After Approval

### 5.1 Extension Goes Live

- Appears in Twitch App Directory
- Any streamer can search and install
- Settings auto-save per broadcaster

### 5.2 Update Your Code

To make updates after submission:

1. Update code locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Fix: description of changes"
git push
```

3. Update version in manifest.json
4. Submit new version in Developer Console

## Important Notes

### URL Requirements

- All URLs must be HTTPS
- GitHub Pages provides HTTPS automatically
- DNS must be properly configured

### CORS Headers

GitHub Pages automatically sets proper CORS headers for extensions.

### File Size

Keep total size under 10MB (you're at ~20KB, well under limit).

### Testing Before Submission

1. Test on your own channel first
2. Verify all features work
3. Check on different browsers
4. Test on mobile view
5. Verify settings persist

## Troubleshooting

### Extension Not Loading
- Check URLs are correct in Developer Console
- Verify GitHub Pages is enabled
- Clear browser cache
- Check console for errors (F12)

### API Not Working
- Verify Twitch token is valid
- Check API scopes in manifest
- Confirm broadcaster is authenticated

### Config Not Saving
- Check localStorage is enabled
- Verify browser allows storage
- Test in incognito mode

### Settings Disappear
- localStorage persists per browser
- Different browser = different settings
- Clearing cache clears settings

## Free Hosting Alternatives

If GitHub Pages has issues, try:

**Netlify** (Free)
- Go to https://netlify.com
- Connect your GitHub repo
- Auto-deploys on push
- Better dashboard

**Vercel** (Free)
- Go to https://vercel.com
- Connect your GitHub repo
- Excellent performance

## File Checklist

Before submission, verify you have:
- [ ] manifest.json (updated with URLs)
- [ ] overlay.html
- [ ] config.html
- [ ] mobile.html
- [ ] All .js files
- [ ] All .css files
- [ ] privacy-policy.md
- [ ] terms.md
- [ ] icon.png (100x100)
- [ ] README.md
- [ ] SETUP.md
- [ ] .gitignore

## Support & Updates

After launch:
- Monitor for errors in console
- Update Twitch API usage as needed
- Respond to streamer feedback
- Keep extension maintained

## Questions?

For Twitch submission help:
- Twitch Dev Docs: https://dev.twitch.tv/docs
- Community Forum: https://discuss.dev.twitch.tv
- Support: https://twitch.tv/support
