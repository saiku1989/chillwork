// 冒险类游戏配置
const adventureGames = {
    'idle-dangers': {
        name: { zh: '冒险勇者', en: 'Adventure Hero' },
        description: { 
            zh: '踏上史诗般的冒险旅程！探索神秘世界，击败强大敌人，收集珍贵装备。',
            en: 'Embark on an epic adventure! Explore mysterious worlds, defeat powerful enemies, collect precious equipment.'
        },
        type: { zh: 'RPG冒险', en: 'RPG Adventure' },
        category: 'adventure',
        icon: 'fas fa-dragon',
        color: 'text-yellow-400',
        url: 'https://www.crazygames.com/embed/idle-dangers'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.adventureGames = adventureGames;
} 