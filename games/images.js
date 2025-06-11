// 图片/益智类游戏配置
const imageGames = {
    'images-puzzle': {
        name: { zh: '图片拼图', en: 'Image Puzzle' },
        description: { 
            zh: '挑战你的观察力和耐心！将打乱的图片碎片重新拼接成完整的美丽画面。',
            en: 'Challenge your observation and patience! Reassemble scattered image pieces into complete beautiful pictures.'
        },
        type: { zh: '益智拼图', en: 'Puzzle Game' },
        category: 'puzzle',
        icon: 'fas fa-puzzle-piece',
        color: 'text-blue-400',
        url: 'https://www.crazygames.com/embed/jigsaw-puzzle'
    },
    'image-memory': {
        name: { zh: '图像记忆', en: 'Image Memory' },
        description: { 
            zh: '测试你的记忆力！记住图片的位置，在规定时间内找到所有匹配的图片对。',
            en: 'Test your memory! Remember image positions and find all matching pairs within the time limit.'
        },
        type: { zh: '记忆训练', en: 'Memory Training' },
        category: 'puzzle',
        icon: 'fas fa-brain',
        color: 'text-pink-400',
        url: 'https://www.crazygames.com/embed/memory-game'
    },
    'spot-difference': {
        name: { zh: '找茬大师', en: 'Spot the Difference' },
        description: { 
            zh: '火眼金睛找不同！仔细观察两张相似的图片，找出所有的差异之处。',
            en: 'Sharp eyes find differences! Carefully observe two similar images and find all the differences.'
        },
        type: { zh: '观察游戏', en: 'Observation Game' },
        category: 'puzzle',
        icon: 'fas fa-search',
        color: 'text-indigo-400',
        url: 'https://www.crazygames.com/embed/spot-the-difference'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.imageGames = imageGames;
} 