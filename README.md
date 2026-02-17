# Neb's Tracker

Real-time Twitch follower and poll tracker extension with slim, glass-like overlays and fighting effects.

## Features

- **Real-time Data**: Live follower counts and active polls from Twitch API
- **Glass Overlays**: Modern frosted-glass design with backdrop blur
- **Customizable Positions**: Place widgets in any corner (top-left, top-right, bottom-left, bottom-right)
- **Fighting Effects**: Red vs Cyan battle animation on 2-option polls with rotating VS badge
- **Poll Timer**: Live countdown showing time remaining
- **Progress Tracking**: Visual progress bar toward follower goal
- **Browser Storage**: Settings persist per broadcaster
- **No Backend Required**: Completely free to host on GitHub Pages

## Quick Start

### For Broadcasters (Install on Your Channel)

1. Go to your Twitch Creator Dashboard
2. Extensions → Manage
3. Search for "Neb's Tracker"
4. Click Install
5. Configure positions, colors, and follower goal

### For Developers (Deploy Your Own)

1. Fork this repository
2. Enable GitHub Pages in repository Settings
3. Register extension at https://dev.twitch.tv/console/extensions
4. Set extension URLs to your GitHub Pages domain
5. Submit to Twitch App Directory

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Widget Details

### Follower Card
- 200px width, slim profile
- Large follower count display
- Progress bar to goal
- Goal amount shown
- Glass morphism effect

### Poll Card
- 320px width, compact design
- Poll title with countdown timer
- Live option bars with percentages
- Fighting effect on 2-option polls
- Glass morphism effect

## Configuration

### Overlay Settings
- Follower position (4 corners)
- Poll position (4 corners)
- Primary color customization
- Poll timer toggle
- Fighting effects toggle
- Follower goal

### How It Works

Each broadcaster's settings are stored in their browser localStorage, so:
- Settings persist between visits
- No server required
- Completely free
- Private (settings don't sync to other devices)

## API Integration

Uses official Twitch API endpoints:
- `GET /helix/polls` - Fetch active polls
- `GET /helix/channels/followers` - Fetch follower count
- `GET /helix/users` - Fetch user info
- OAuth 2.0 authentication

## Technical Stack

- **Frontend**: Vanilla JavaScript (no dependencies)
- **Styling**: Pure CSS with glass morphism
- **Hosting**: GitHub Pages (free)
- **Auth**: Twitch OAuth 2.0
- **Browser Storage**: localStorage API

## File Structure

```
├── overlay.html              # Main overlay view
├── config.html               # Settings panel
├── mobile.html               # Mobile viewer view
├── overlay-styles.css        # Overlay styling
├── config-styles.css         # Config styling
├── overlay-layout.js         # Overlay logic
├── overlay-config.js         # Config logic
├── twitch-auth.js            # OAuth authentication
├── twitch-api.js             # Twitch API integration
├── manifest.json             # Extension manifest
├── DEPLOYMENT.md             # Deployment guide
├── SETUP.md                  # Setup reference
└── README.md                 # This file
```

## Customization

### Change Widget Sizes

Edit `overlay-styles.css`:
```css
.follower-card { width: 150px; }
.poll-card { width: 280px; }
```

### Change Colors

In config panel or edit CSS variables:
```css
--primary: #your-color;
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
```

### Adjust Transparency

Glass effect opacity in `overlay-styles.css`:
```css
--glass-bg: rgba(255, 255, 255, 0.05);  /* More transparent */
--glass-bg: rgba(255, 255, 255, 0.15);  /* Less transparent */
```

## Deployment

### GitHub Pages (Free)

1. Push to GitHub
2. Enable Pages in repository Settings
3. Set extension URLs to your domain
4. That's it!

See [DEPLOYMENT.md](DEPLOYMENT.md) for full instructions including App Directory submission.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Total size: ~20KB
- No external dependencies
- Optimized glass blur effects
- Throttled API polling (5s polls, 10s followers)
- Memory efficient

## Security

- OAuth tokens handled by Twitch.ext
- No tokens stored locally
- No personal data collected beyond public Twitch data
- Settings stored locally in browser only

## License

MIT - Free to use, modify, and distribute

## Support

For issues:
1. Check browser console (F12) for errors
2. Verify Twitch API credentials
3. Test on different browser
4. Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting

## Credits

Created for easy, free Twitch stream overlays.
