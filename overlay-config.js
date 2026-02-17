class ConfigManager {
    constructor() {
        this.config = this.loadConfig();
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
        this.loadUI();
        this.setupEventListeners();
    }

    loadUI() {
        document.getElementById('follower-goal-input').value = this.config.followerGoal;
        document.getElementById('primary-color').value = this.config.primaryColor;
        document.getElementById('show-poll-timer').checked = this.config.showPollTimer !== false;
        document.getElementById('enable-poll-effects').checked = this.config.enablePollEffects !== false;

        this.updatePositionButtons();
    }

    setupEventListeners() {
        document.getElementById('primary-color').addEventListener('change', (e) => {
            this.config.primaryColor = e.target.value;
            this.saveConfig();
        });

        document.getElementById('show-poll-timer').addEventListener('change', (e) => {
            this.config.showPollTimer = e.target.checked;
            this.saveConfig();
        });

        document.getElementById('enable-poll-effects').addEventListener('change', (e) => {
            this.config.enablePollEffects = e.target.checked;
            this.saveConfig();
        });
    }

    updatePositionButtons() {
        document.querySelectorAll('.pos-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const followerBtns = document.querySelectorAll('[onclick*="setFollowerPosition"]');
        followerBtns.forEach(btn => {
            if (btn.textContent.replace(/\s+/g, '-').toLowerCase().replace('top', '').replace('bottom', '').replace('left', '').replace('right', '') ===
                this.config.followerPosition.replace(/[- ]/g, '').toLowerCase()) {
                btn.classList.add('active');
            }
        });

        const pollBtns = document.querySelectorAll('[onclick*="setPollPosition"]');
        pollBtns.forEach(btn => {
            if (btn.textContent.replace(/\s+/g, '-').toLowerCase().replace('top', '').replace('bottom', '').replace('left', '').replace('right', '') ===
                this.config.pollPosition.replace(/[- ]/g, '').toLowerCase()) {
                btn.classList.add('active');
            }
        });
    }

    saveConfig() {
        localStorage.setItem('trackerConfig', JSON.stringify(this.config));
    }
}

const configManager = new ConfigManager();

function saveFollowerGoal() {
    const goal = parseInt(document.getElementById('follower-goal-input').value);
    if (goal && goal > 0) {
        configManager.config.followerGoal = goal;
        configManager.saveConfig();
        alert('Follower goal saved: ' + goal.toLocaleString());
    }
}

function setFollowerPosition(position) {
    configManager.config.followerPosition = position;
    configManager.saveConfig();
    configManager.updatePositionButtons();
}

function setPollPosition(position) {
    configManager.config.pollPosition = position;
    configManager.saveConfig();
    configManager.updatePositionButtons();
}

function saveAllConfig() {
    configManager.saveConfig();
    alert('All settings saved!');
}
