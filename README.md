# Neb's Tracker

Twitch extension for real-time follower and poll overlays.

## Features

- Live follower counter with progress bar
- Active poll display with voting breakdown
- Customizable widget positions (4 corners)
- Fighting effect for 2-option polls
- Glass morphism design
- Settings saved per broadcaster

## Installation

1. Register extension at https://dev.twitch.tv/console/extensions
2. Host files on GitHub Pages or your own server
3. Configure extension URLs in developer console
4. Submit to Twitch App Directory

## File Structure

- `overlay.html` - Main overlay view
- `config.html` - Settings panel
- `mobile.html` - Mobile view
- `twitch-auth.js` - Twitch OAuth
- `twitch-api.js` - API integration
- `overlay-layout.js` - Display logic
- `overlay-config.js` - Config logic
- `overlay-styles.css` - Styling
- `config-styles.css` - Config styling
- `manifest.json` - Extension manifest

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+
