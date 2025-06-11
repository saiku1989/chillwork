// 恐怖类游戏配置
const horrorGames = {
    '911-prey': {
        name: { zh: '911惊魂', en: '911 Prey' },
        description: { 
            zh: '体验紧张刺激的恐怖游戏，挑战胆量极限，逃脱可怕追击！',
            en: 'Experience intense horror games, challenge courage limits, escape terrible pursuits!'
        },
        type: { zh: '恐怖惊悚', en: 'Horror Thriller' },
        category: 'horror',  
        icon: 'fas fa-ghost',
        color: 'text-purple-400',
        url: 'https://www.crazygames.com/embed/911-prey'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.horrorGames = horrorGames;
} 