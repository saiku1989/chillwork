// 游戏管理器 - 统一管理所有游戏配置
class GameManager {
    constructor() {
        this.gameData = {};
        this.gameCategories = [];
        this.isLoaded = false;
    }

    // 加载所有游戏配置
    async loadAllGames() {
        try {
            // 等待所有游戏配置加载完成
            await this.waitForAllGames();
            
            // 合并所有游戏配置
            this.mergeGameConfigs();
            
            // 生成分类列表
            this.generateCategories();
            
            this.isLoaded = true;
            
            // 触发游戏加载完成事件
            this.dispatchLoadedEvent();
            
            console.log('所有游戏配置加载完成:', this.gameData);
        } catch (error) {
            console.error('游戏配置加载失败:', error);
        }
    }

    // 等待所有游戏配置文件加载
    waitForAllGames() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (
                    window.adventureGames &&
                    window.racingGames &&
                    window.survivalGames &&
                    window.sportsGames &&
                    window.casualGames &&
                    window.horrorGames &&
                    window.imageGames
                ) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }

    // 合并所有游戏配置
    mergeGameConfigs() {
        this.gameData = {
            ...window.adventureGames,
            ...window.racingGames,
            ...window.survivalGames,
            ...window.sportsGames,
            ...window.casualGames,
            ...window.horrorGames,
            ...window.imageGames
        };
    }

    // 生成游戏分类列表
    generateCategories() {
        const categories = new Set();
        Object.values(this.gameData).forEach(game => {
            categories.add(game.category);
        });
        this.gameCategories = Array.from(categories);
    }

    // 获取所有游戏
    getAllGames() {
        return this.gameData;
    }

    // 根据分类获取游戏
    getGamesByCategory(category) {
        if (category === 'all') {
            return this.gameData;
        }
        
        const filteredGames = {};
        Object.entries(this.gameData).forEach(([id, game]) => {
            if (game.category === category) {
                filteredGames[id] = game;
            }
        });
        return filteredGames;
    }

    // 获取游戏分类列表
    getCategories() {
        return this.gameCategories;
    }

    // 获取单个游戏
    getGame(gameId) {
        return this.gameData[gameId];
    }

    // 搜索游戏
    searchGames(searchTerm) {
        const results = {};
        const term = searchTerm.toLowerCase();
        
        Object.entries(this.gameData).forEach(([id, game]) => {
            const zhName = game.name.zh.toLowerCase();
            const enName = game.name.en.toLowerCase();
            const zhDesc = game.description.zh.toLowerCase();
            const enDesc = game.description.en.toLowerCase();
            
            if (zhName.includes(term) || 
                enName.includes(term) || 
                zhDesc.includes(term) || 
                enDesc.includes(term)) {
                results[id] = game;
            }
        });
        
        return results;
    }

    // 添加新游戏（动态添加）
    addGame(gameId, gameConfig) {
        this.gameData[gameId] = gameConfig;
        
        // 更新分类列表
        if (!this.gameCategories.includes(gameConfig.category)) {
            this.gameCategories.push(gameConfig.category);
        }
        
        // 触发游戏添加事件
        this.dispatchGameAddedEvent(gameId, gameConfig);
    }

    // 移除游戏
    removeGame(gameId) {
        if (this.gameData[gameId]) {
            delete this.gameData[gameId];
            
            // 触发游戏移除事件
            this.dispatchGameRemovedEvent(gameId);
        }
    }

    // 触发游戏加载完成事件
    dispatchLoadedEvent() {
        window.dispatchEvent(new CustomEvent('gamesLoaded', {
            detail: { gameData: this.gameData, categories: this.gameCategories }
        }));
    }

    // 触发游戏添加事件
    dispatchGameAddedEvent(gameId, gameConfig) {
        window.dispatchEvent(new CustomEvent('gameAdded', {
            detail: { gameId, gameConfig }
        }));
    }

    // 触发游戏移除事件
    dispatchGameRemovedEvent(gameId) {
        window.dispatchEvent(new CustomEvent('gameRemoved', {
            detail: { gameId }
        }));
    }

    // 检查是否已加载
    isReady() {
        return this.isLoaded;
    }
}

// 创建全局游戏管理器实例
window.gameManager = new GameManager();

// 分类配置 - 用于生成导航按钮
window.categoryConfig = {
    all: { zh: '全部游戏', en: 'All Games', icon: 'fas fa-th' },
    adventure: { zh: '冒险类', en: 'Adventure', icon: 'fas fa-dragon' },
    racing: { zh: '竞速类', en: 'Racing', icon: 'fas fa-car' },
    survival: { zh: '生存类', en: 'Survival', icon: 'fas fa-skull' },
    sports: { zh: '运动类', en: 'Sports', icon: 'fas fa-basketball-ball' },
    casual: { zh: '休闲类', en: 'Casual', icon: 'fas fa-leaf' },
    horror: { zh: '恐怖类', en: 'Horror', icon: 'fas fa-ghost' },
    puzzle: { zh: '益智类', en: 'Puzzle', icon: 'fas fa-puzzle-piece' }
}; 