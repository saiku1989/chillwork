// 生存类游戏配置
const survivalGames = {
    'zombie-horde-build-survive': {
        name: { zh: '僵尸围城', en: 'Zombie Horde' },
        description: { 
            zh: '在末日世界建造基地，收集资源，抵御僵尸大军的进攻！',
            en: 'Build bases in the apocalyptic world, collect resources, resist zombie attacks!'
        },
        type: { zh: '生存建造', en: 'Survival Build' },
        category: 'survival',
        icon: 'fas fa-skull',
        color: 'text-green-400',
        url: 'https://www.crazygames.com/embed/zombie-horde-build-survive'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.survivalGames = survivalGames;
} 