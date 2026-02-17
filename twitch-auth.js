class TwitchAuth {
    constructor() {
        this.token = null;
        this.userId = null;
        this.userName = null;
        this.channelId = null;
        this.init();
    }

    init() {
        if (typeof Twitch !== 'undefined' && Twitch.ext) {
            Twitch.ext.onAuthorized((auth) => {
                this.token = auth.token;
                this.userId = auth.userId;
                this.fetchUserInfo();
            });

            Twitch.ext.onError((error) => {
                console.error('Twitch extension error:', error);
            });
        }
    }

    fetchUserInfo() {
        if (!this.token) return;

        const clientId = this.getClientIdFromToken();
        if (!clientId) {
            console.error('Unable to extract client ID');
            return;
        }

        fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Client-ID': clientId
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.data && data.data[0]) {
                this.userName = data.data[0].login;
                this.userId = data.data[0].id;
            }
        })
        .catch(err => console.error('Failed to fetch user info:', err));
    }

    getClientIdFromToken() {
        if (typeof Twitch !== 'undefined' && Twitch.ext) {
            return Twitch.ext.clientID || null;
        }
        return null;
    }

    async getChannelInfo() {
        if (!this.token || !this.userId) return null;

        try {
            const clientId = this.getClientIdFromToken();
            const res = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${this.userId}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Client-ID': clientId
                }
            });
            const data = await res.json();
            return data.data[0] || null;
        } catch (err) {
            console.error('Failed to fetch channel info:', err);
            return null;
        }
    }

    isAuthenticated() {
        return !!this.token && !!this.userId;
    }

    getToken() {
        return this.token;
    }

    getUserId() {
        return this.userId;
    }

    getUserName() {
        return this.userName;
    }

    getClientId() {
        return this.getClientIdFromToken();
    }
}

const twitchAuth = new TwitchAuth();
