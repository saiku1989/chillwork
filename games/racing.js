// 竞速类游戏配置
const racingGames = {
    'rally-racer-dirt': {
        name: { zh: '越野赛车', en: 'Rally Racing' },
        description: { 
            zh: '驾驶赛车在泥土赛道上飞驰，感受速度与激情的碰撞！',
            en: 'Drive racing cars on dirt tracks, feel the collision of speed and passion!'
        },
        type: { zh: '竞速驾驶', en: 'Speed Racing' },
        category: 'racing',
        icon: 'fas fa-car',
        color: 'text-red-400',
        url: 'https://www.crazygames.com/embed/rally-racer-dirt'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.racingGames = racingGames;
} 