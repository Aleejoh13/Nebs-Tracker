class TwitchAPI {
    constructor() {
        this.pollCheckInterval = 5000;
        this.followerCheckInterval = 10000;
        this.currentPoll = null;
        this.followerCount = 0;
        this.followListeners = [];
        this.pollListeners = [];
        this.init();
    }

    init() {
        if (twitchAuth.isAuthenticated()) {
            this.startPolling();
        } else {
            setTimeout(() => this.init(), 1000);
        }
    }

    startPolling() {
        this.pollForPolls();
        this.pollForFollowers();
        setInterval(() => this.pollForPolls(), this.pollCheckInterval);
        setInterval(() => this.pollForFollowers(), this.followerCheckInterval);
    }

    async pollForPolls() {
        if (!twitchAuth.isAuthenticated()) return;

        try {
            const res = await fetch(
                `https://api.twitch.tv/helix/polls?broadcaster_id=${twitchAuth.getUserId()}&first=1`,
                {
                    headers: {
                        'Authorization': `Bearer ${twitchAuth.getToken()}`,
                        'Client-ID': twitchAuth.getClientId()
                    }
                }
            );

            const data = await res.json();
            if (data.data && data.data[0]) {
                const poll = data.data[0];

                if (poll.status === 'ACTIVE') {
                    if (!this.currentPoll || this.currentPoll.id !== poll.id) {
                        this.currentPoll = this.formatPoll(poll);
                        this.notifyPollListeners(this.currentPoll);
                    } else {
                        this.currentPoll = this.formatPoll(poll);
                        this.notifyPollListeners(this.currentPoll);
                    }
                } else if (this.currentPoll && poll.status === 'COMPLETED') {
                    this.currentPoll = null;
                    this.notifyPollListeners(null);
                }
            }
        } catch (err) {
            console.error('Failed to fetch polls:', err);
        }
    }

    async pollForFollowers() {
        if (!twitchAuth.isAuthenticated()) return;

        try {
            const res = await fetch(
                `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${twitchAuth.getUserId()}&first=1`,
                {
                    headers: {
                        'Authorization': `Bearer ${twitchAuth.getToken()}`,
                        'Client-ID': twitchAuth.getClientId()
                    }
                }
            );

            const data = await res.json();
            const newCount = data.total || 0;

            if (newCount > this.followerCount) {
                const difference = newCount - this.followerCount;
                this.notifyFollowListeners(difference);
            }

            this.followerCount = newCount;
        } catch (err) {
            console.error('Failed to fetch followers:', err);
        }
    }

    formatPoll(twitchPoll) {
        return {
            id: twitchPoll.id,
            title: twitchPoll.title,
            options: twitchPoll.choices.map(choice => ({
                title: choice.title,
                votes: choice.votes
            })),
            endTime: new Date(twitchPoll.ended_at || twitchPoll.ends_at),
            isFighting: twitchPoll.choices.length === 2
        };
    }

    getCurrentPoll() {
        return this.currentPoll;
    }

    getFollowerCount() {
        return this.followerCount;
    }

    onPollUpdate(callback) {
        this.pollListeners.push(callback);
    }

    onFollowUpdate(callback) {
        this.followListeners.push(callback);
    }

    notifyPollListeners(poll) {
        this.pollListeners.forEach(callback => {
            try {
                callback(poll);
            } catch (err) {
                console.error('Error in poll listener:', err);
            }
        });
    }

    notifyFollowListeners(newFollows) {
        this.followListeners.forEach(callback => {
            try {
                callback(newFollows);
            } catch (err) {
                console.error('Error in follow listener:', err);
            }
        });
    }
}

const twitchAPI = new TwitchAPI();
