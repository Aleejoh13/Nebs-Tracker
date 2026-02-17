class OverlayLayout {
    constructor() {
        this.config = this.loadConfig();
        this.pollTimerInterval = null;
        this.currentPoll = null;
        this.init();
    }

    loadConfig() {
        try {
            const stored = localStorage.getItem('trackerConfig');
            return stored ? JSON.parse(stored) : this.getDefaults();
        } catch (e) {
            return this.getDefaults();
        }
    }

    getDefaults() {
        return {
            followerGoal: 5000,
            showPollTimer: true,
            enablePollEffects: true,
            followerPosition: 'top-right',
            pollPosition: 'top-left',
            primaryColor: '#00d4ff'
        };
    }

    init() {
        this.applyPositions();
        this.applyColors();
        this.setupTwitchListeners();
        this.initializeData();
    }

    applyPositions() {
        const followerWidget = document.getElementById('follower-widget');
        const pollWidget = document.getElementById('poll-widget');

        followerWidget.className = 'follower-card ' + (this.config.followerPosition || 'top-right');
        pollWidget.className = 'poll-card ' + (this.config.pollPosition || 'top-left');
    }

    applyColors() {
        document.documentElement.style.setProperty('--primary', this.config.primaryColor);
    }

    setupTwitchListeners() {
        twitchAPI.onFollowUpdate((newFollows) => {
            this.updateFollowerDisplay();
        });

        twitchAPI.onPollUpdate((poll) => {
            this.displayPoll(poll);
        });
    }

    initializeData() {
        this.updateFollowerDisplay();
    }

    updateFollowerDisplay() {
        const count = twitchAPI.getFollowerCount();
        const goal = this.config.followerGoal;

        document.getElementById('follower-count-main').textContent = count.toLocaleString();
        document.getElementById('follower-goal-text').textContent = `Goal: ${(goal / 1000).toFixed(0)}K`;

        const progress = Math.min((count / goal) * 100, 100);
        document.getElementById('follower-progress-bar').style.width = progress + '%';
    }

    displayPoll(poll) {
        const pollWidget = document.getElementById('poll-widget');

        if (!poll) {
            pollWidget.classList.add('hidden');
            this.clearPollTimer();
            return;
        }

        pollWidget.classList.remove('hidden');

        document.getElementById('poll-title').textContent = poll.title;
        this.renderPollOptions(poll);
        this.startPollTimer(poll.endTime);
    }

    renderPollOptions(poll) {
        const container = document.getElementById('poll-options');
        container.innerHTML = '';

        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 1;
        const isFighting = poll.isFighting && poll.options.length === 2;

        poll.options.forEach((option, index) => {
            const percentage = ((option.votes / totalVotes) * 100).toFixed(1);

            const optionEl = document.createElement('div');
            optionEl.className = 'poll-option-slim';

            const headerEl = document.createElement('div');
            headerEl.className = 'poll-option-header-slim';
            headerEl.innerHTML = `
                <span class="poll-option-text-slim">${this.escapeHtml(option.title)}</span>
                <span class="poll-option-count-slim">${percentage}%</span>
            `;

            const barEl = document.createElement('div');
            barEl.className = 'poll-bar-slim';
            barEl.style.position = 'relative';

            const fillEl = document.createElement('div');
            let fillClass = 'poll-bar-fill-slim';
            if (isFighting && this.config.enablePollEffects) {
                fillClass += ' fighting';
                if (index === 0) fillClass += ' fight-left';
                else fillClass += ' fight-right';
            }
            fillEl.className = fillClass;
            fillEl.style.width = percentage + '%';

            if (isFighting && index === 0 && this.config.enablePollEffects) {
                const vsBadge = document.createElement('div');
                vsBadge.className = 'poll-vs-badge';
                vsBadge.textContent = 'VS';
                barEl.appendChild(vsBadge);
            }

            barEl.appendChild(fillEl);

            optionEl.appendChild(headerEl);
            optionEl.appendChild(barEl);

            container.appendChild(optionEl);
        });
    }

    startPollTimer(endTime) {
        this.clearPollTimer();

        const timerElement = document.getElementById('poll-time');

        const updateTimer = () => {
            const now = new Date();
            const remaining = endTime - now;

            if (remaining <= 0) {
                timerElement.textContent = 'Ended';
                this.clearPollTimer();
                return;
            }

            const seconds = Math.floor(remaining / 1000);
            const minutes = Math.floor(seconds / 60);
            timerElement.textContent = `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
        };

        if (this.config.showPollTimer) {
            updateTimer();
            this.pollTimerInterval = setInterval(updateTimer, 1000);
        }
    }

    clearPollTimer() {
        if (this.pollTimerInterval) {
            clearInterval(this.pollTimerInterval);
            this.pollTimerInterval = null;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setFollowerGoal(goal) {
        this.config.followerGoal = goal;
        this.saveConfig();
        this.updateFollowerDisplay();
    }

    setPosition(widget, position) {
        this.config[widget + 'Position'] = position;
        this.saveConfig();
        this.applyPositions();
    }

    setColor(color) {
        this.config.primaryColor = color;
        this.saveConfig();
        this.applyColors();
    }

    saveConfig() {
        localStorage.setItem('trackerConfig', JSON.stringify(this.config));
    }
}

const overlayLayout = new OverlayLayout();
