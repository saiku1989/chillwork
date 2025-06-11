// 游戏数据现在通过游戏管理器加载
let gameData = {};

// 全局变量
let currentLanguage = 'zh';
let isFullscreen = false;
let currentGame = null;

// DOM元素
const elements = {
    langToggle: document.getElementById('langToggle'),
    currentLang: document.getElementById('currentLang'),
    searchInput: document.getElementById('searchInput'),
    searchInputMobile: document.getElementById('searchInputMobile'),
    messageBtn: document.getElementById('messageBtn'),
    messageModal: document.getElementById('messageModal'),
    closeMessageModal: document.getElementById('closeMessageModal'),
    postMessage: document.getElementById('postMessage'),
    playerName: document.getElementById('playerName'),
    messageText: document.getElementById('messageText'),
    messagesList: document.getElementById('messagesList'),
    gamesGrid: document.getElementById('gamesGrid'),
    gameDisplay: document.getElementById('gameDisplay'),
    gameFrame: document.getElementById('gameFrame'),
    loadingScreen: document.getElementById('loadingScreen'),
    backBtn: document.getElementById('backBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    shareBtn: document.getElementById('shareBtn'),
    currentGameIcon: document.getElementById('currentGameIcon'),
    currentGameTitle: document.getElementById('currentGameTitle'),
    currentGameDescription: document.getElementById('currentGameDescription'),
    currentGameGenre: document.getElementById('currentGameGenre')
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateLanguage();
    loadMessagesFromLocal();
    
    // 等待游戏管理器加载完成
    if (window.gameManager) {
        window.gameManager.loadAllGames();
    }
});

// 监听游戏加载完成事件
window.addEventListener('gamesLoaded', function(event) {
    gameData = event.detail.gameData;
    console.log('游戏数据已加载:', gameData);
    
    // 动态生成游戏卡片和分类
    generateGameCategories(event.detail.categories);
    generateGameCards();
    initializeCategories();
    initializeGameCards();
});

// 动态生成游戏分类
function generateGameCategories(categories) {
    const categoryContainer = document.querySelector('.game-categories .flex');
    if (!categoryContainer) return;
    
    // 清空现有分类
    categoryContainer.innerHTML = '';
    
    // 添加"全部游戏"分类
    const allBtn = createCategoryButton('all', window.categoryConfig.all);
    allBtn.classList.add('active');
    categoryContainer.appendChild(allBtn);
    
    // 添加其他分类
    categories.forEach(category => {
        if (window.categoryConfig[category]) {
            const btn = createCategoryButton(category, window.categoryConfig[category]);
            categoryContainer.appendChild(btn);
        }
    });
}

// 创建分类按钮
function createCategoryButton(category, config) {
    const button = document.createElement('button');
    button.className = 'category-btn';
    button.setAttribute('data-category', category);
    
    button.innerHTML = `
        <i class="${config.icon} mr-2"></i>
        <span data-zh="${config.zh}" data-en="${config.en}">${config.zh}</span>
    `;
    
    return button;
}

// 动态生成游戏卡片
function generateGameCards() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;
    
    // 清空现有游戏卡片
    gamesGrid.innerHTML = '';
    
    // 生成游戏卡片
    Object.entries(gameData).forEach(([gameId, game]) => {
        const gameCard = createGameCard(gameId, game);
        gamesGrid.appendChild(gameCard);
    });
}

// 创建游戏卡片
function createGameCard(gameId, game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-game', gameId);
    card.setAttribute('data-category', game.category);
    card.setAttribute('data-name', `${game.name.zh} ${game.name.en}`);
    
    card.innerHTML = `
        <div class="game-card-inner">
            <div class="game-icon">
                <i class="${game.icon} text-4xl ${game.color}"></i>
            </div>
            <h3 class="game-title" data-zh="${game.name.zh}" data-en="${game.name.en}">${game.name.zh}</h3>
            <p class="game-type" data-zh="${game.type.zh}" data-en="${game.type.en}">${game.type.zh}</p>
            <p class="game-description" data-zh="${game.description.zh}" data-en="${game.description.en}">
                ${game.description.zh}
            </p>
            <button class="play-btn" data-zh="开始游戏" data-en="Play Now">开始游戏</button>
        </div>
    `;
    
    return card;
}

// 事件监听器初始化
function initializeEventListeners() {
    // 语言切换
    elements.langToggle?.addEventListener('click', toggleLanguage);
    
    // 搜索功能
    elements.searchInput?.addEventListener('input', handleSearch);
    elements.searchInputMobile?.addEventListener('input', handleSearch);
    
    // 留言板
    elements.messageBtn?.addEventListener('click', openMessageModal);
    elements.closeMessageModal?.addEventListener('click', closeMessageModal);
    elements.postMessage?.addEventListener('click', postMessage);
    
    // 游戏控制
    elements.backBtn?.addEventListener('click', backToGameList);
    elements.fullscreenBtn?.addEventListener('click', toggleFullscreen);
    elements.refreshBtn?.addEventListener('click', refreshGame);
    elements.shareBtn?.addEventListener('click', shareGame);
    
    // 点击模态框外部关闭
    elements.messageModal?.addEventListener('click', function(e) {
        if (e.target === elements.messageModal) {
            closeMessageModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMessageModal();
            if (isFullscreen) {
                exitFullscreen();
            }
        }
    });
}

// 语言切换
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    elements.currentLang.textContent = currentLanguage === 'zh' ? '中文' : 'English';
    updateLanguage();
    updatePlaceholders();
}

function updateLanguage() {
    const elementsWithLang = document.querySelectorAll('[data-zh]');
    elementsWithLang.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        if (zhText && enText) {
            element.textContent = currentLanguage === 'zh' ? zhText : enText;
        }
    });
    
    // 更新HTML lang属性
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

function updatePlaceholders() {
    const elementsWithPlaceholder = document.querySelectorAll('[data-placeholder-zh]');
    elementsWithPlaceholder.forEach(element => {
        const zhPlaceholder = element.getAttribute('data-placeholder-zh');
        const enPlaceholder = element.getAttribute('data-placeholder-en');
        if (zhPlaceholder && enPlaceholder) {
            element.placeholder = currentLanguage === 'zh' ? zhPlaceholder : enPlaceholder;
        }
    });
}

// 分类功能
function initializeCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterGamesByCategory(category);
        });
    });
}

function filterGamesByCategory(category) {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            // 添加淡入动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
}

// 搜索功能
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const gameName = card.getAttribute('data-name').toLowerCase();
        if (gameName.includes(searchTerm)) {
            card.style.display = 'block';
            highlightSearchTerm(card, searchTerm);
        } else {
            card.style.display = 'none';
        }
    });
    
    // 如果搜索为空，恢复分类过滤
    if (searchTerm === '') {
        const activeCategory = document.querySelector('.category-btn.active');
        if (activeCategory) {
            const category = activeCategory.getAttribute('data-category');
            filterGamesByCategory(category);
        }
    }
}

function highlightSearchTerm(card, searchTerm) {
    if (searchTerm === '') return;
    
    const title = card.querySelector('.game-title');
    const originalText = title.textContent;
    const highlightedText = originalText.replace(
        new RegExp(searchTerm, 'gi'),
        '<span class="search-highlight">$&</span>'
    );
    title.innerHTML = highlightedText;
}

// 游戏卡片初始化
function initializeGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        playBtn?.addEventListener('click', function(e) {
            e.stopPropagation();
            const gameId = card.getAttribute('data-game');
            loadGame(gameId);
        });
        
        // 点击卡片也可以启动游戏
        card.addEventListener('click', function() {
            const gameId = card.getAttribute('data-game');
            loadGame(gameId);
        });
    });
}

// 加载游戏
function loadGame(gameId) {
    if (!gameData[gameId]) return;
    
    currentGame = gameId;
    const game = gameData[gameId];
    
    // 显示游戏展示区域
    elements.gamesGrid.style.display = 'none';
    document.querySelector('.game-categories').style.display = 'none';
    document.querySelector('.side-ads').style.display = 'none';
    elements.gameDisplay.classList.remove('hidden');
    
    // 更新游戏信息
    updateGameInfo(game);
    
    // 显示加载动画
    elements.loadingScreen.style.display = 'flex';
    
    // 加载iframe
    elements.gameFrame.src = game.url;
    
    // 监听iframe加载完成
    elements.gameFrame.onload = function() {
        setTimeout(() => {
            elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    };
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateGameInfo(game) {
    // 更新图标
    const iconClasses = game.icon + ' text-6xl ' + game.color;
    elements.currentGameIcon.className = iconClasses;
    
    // 更新标题和描述
    elements.currentGameTitle.textContent = game.name[currentLanguage];
    elements.currentGameDescription.textContent = game.description[currentLanguage];
    elements.currentGameGenre.textContent = game.type[currentLanguage];
}

// 返回游戏列表
function backToGameList() {
    elements.gameDisplay.classList.add('hidden');
    elements.gamesGrid.style.display = 'grid';
    document.querySelector('.game-categories').style.display = 'block';
    document.querySelector('.side-ads').style.display = 'block';
    
    // 停止当前游戏
    elements.gameFrame.src = '';
    currentGame = null;
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 全屏功能
function toggleFullscreen() {
    if (!isFullscreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

function enterFullscreen() {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
        gameContainer.msRequestFullscreen();
    }
    
    isFullscreen = true;
    elements.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i><span data-zh="退出全屏" data-en="Exit Fullscreen">退出全屏</span>';
    updateLanguage();
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    isFullscreen = false;
    elements.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i><span data-zh="全屏" data-en="Fullscreen">全屏</span>';
    updateLanguage();
}

// 监听全屏变化
document.addEventListener('fullscreenchange', function() {
    isFullscreen = !!document.fullscreenElement;
    if (!isFullscreen) {
        elements.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i><span data-zh="全屏" data-en="Fullscreen">全屏</span>';
        updateLanguage();
    }
});

// 刷新游戏
function refreshGame() {
    if (currentGame && gameData[currentGame]) {
        elements.loadingScreen.style.display = 'flex';
        elements.loadingScreen.style.opacity = '1';
        elements.gameFrame.src = '';
        setTimeout(() => {
            elements.gameFrame.src = gameData[currentGame].url;
        }, 500);
    }
}

// 分享游戏
function shareGame() {
    if (currentGame && gameData[currentGame]) {
        const game = gameData[currentGame];
        const shareText = `来玩 ${game.name[currentLanguage]} - ${game.description[currentLanguage].substring(0, 50)}... | ChillWork 游戏中心`;
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: game.name[currentLanguage],
                text: shareText,
                url: shareUrl
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(shareUrl).then(() => {
                showNotification(currentLanguage === 'zh' ? '链接已复制到剪贴板！' : 'Link copied to clipboard!');
            });
        }
    }
}

// 留言板功能
function openMessageModal() {
    elements.messageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMessageModal() {
    elements.messageModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function postMessage() {
    const name = elements.playerName.value.trim();
    const message = elements.messageText.value.trim();
    
    if (!name || !message) {
        showNotification(currentLanguage === 'zh' ? '请填写昵称和留言内容！' : 'Please fill in nickname and message!');
        return;
    }
    
    // 创建新留言元素
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
        <div class="message-header">
            <strong>${escapeHtml(name)}</strong>
            <span class="message-time">${formatDate(new Date())}</span>
        </div>
        <div class="message-content">
            ${escapeHtml(message)}
        </div>
    `;
    
    // 添加到留言列表顶部
    elements.messagesList.insertBefore(messageItem, elements.messagesList.firstChild);
    
    // 清空表单
    elements.playerName.value = '';
    elements.messageText.value = '';
    
    // 显示成功提示
    showNotification(currentLanguage === 'zh' ? '留言发表成功！' : 'Message posted successfully!');
    
    // 保存到本地存储
    saveMessageToLocal(name, message);
}

function saveMessageToLocal(name, message) {
    const messages = JSON.parse(localStorage.getItem('chillwork-messages') || '[]');
    messages.unshift({
        name: name,
        message: message,
        timestamp: new Date().toISOString()
    });
    
    // 限制存储数量
    if (messages.length > 50) {
        messages.splice(50);
    }
    
    localStorage.setItem('chillwork-messages', JSON.stringify(messages));
}

function loadMessagesFromLocal() {
    const messages = JSON.parse(localStorage.getItem('chillwork-messages') || '[]');
    messages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <div class="message-header">
                <strong>${escapeHtml(msg.name)}</strong>
                <span class="message-time">${formatDate(new Date(msg.timestamp))}</span>
            </div>
            <div class="message-content">
                ${escapeHtml(msg.message)}
            </div>
        `;
        elements.messagesList.appendChild(messageItem);
    });
}

// 工具函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(date) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(147, 51, 234, 0.9);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// SEO优化 - 动态更新页面标题
function updatePageTitle(gameName) {
    if (gameName) {
        document.title = `${gameName} - ChillWork 游戏中心 | 免费在线游戏`;
    } else {
        document.title = 'ChillWork - 顶级在线游戏平台 | 免费网页游戏中心';
    }
} 