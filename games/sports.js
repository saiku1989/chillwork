// 运动类游戏配置
const sportsGames = {
    'basketball-superstars': {
        name: { zh: '篮球巨星', en: 'Basketball Stars' },
        description: { 
            zh: '展示篮球技巧，成为球场超级巨星，投篮得分赢得比赛！',
            en: 'Show basketball skills, become a court superstar, score baskets and win games!'
        },
        type: { zh: '运动竞技', en: 'Sports Game' },
        category: 'sports',
        icon: 'fas fa-basketball-ball',
        color: 'text-orange-400',
        url: 'https://www.crazygames.com/embed/basketball-superstars'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.sportsGames = sportsGames;
} 