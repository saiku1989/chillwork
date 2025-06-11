// 休闲类游戏配置
const casualGames = {
    'stone-grass-mowing-simulator': {
        name: { zh: '割草模拟', en: 'Mowing Simulator' },
        description: { 
            zh: '享受宁静的割草时光，释放压力，体验简单满足的游戏乐趣！',
            en: 'Enjoy peaceful mowing time, release stress, experience simple satisfying fun!'
        },
        type: { zh: '休闲放松', en: 'Casual Relax' },
        category: 'casual',
        icon: 'fas fa-leaf',
        color: 'text-green-500',
        url: 'https://www.crazygames.com/embed/stone-grass-mowing-simulator'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.casualGames = casualGames;
} 