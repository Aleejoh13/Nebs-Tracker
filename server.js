const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

app.get('/oauth/authorize', (req, res) => {
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=bits:read+channel:read:subscriptions+channel:read:polls+moderation:read+user:read:follows`;
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        res.status(400).send('No authorization code');
        return;
    }

    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: REDIRECT_URI
            }
        });

        const token = response.data.access_token;
        res.redirect(`/?token=${token}`);
    } catch (error) {
        console.error('OAuth error:', error);
        res.status(500).send('OAuth failed');
    }
});

app.get('/api/polls/:channelId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/polls?broadcaster_id=${req.params.channelId}&first=1`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-ID': CLIENT_ID
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
});

app.get('/api/followers/:channelId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${req.params.channelId}&first=1`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-ID': CLIENT_ID
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to fetch followers' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Make sure to set TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET in .env`);
});
