# 🎮 如何添加新游戏到ChillWork

现在添加新游戏变得非常简单！您只需要修改对应的游戏配置文件即可。

## 📁 项目结构

```
F:\web\game1\
├── index.html              # 主页面
├── styles.css              # 样式文件  
├── script.js               # 主要功能
├── games/                  # 游戏配置文件夹
│   ├── gameManager.js      # 游戏管理器
│   ├── adventure.js        # 冒险类游戏
│   ├── racing.js           # 竞速类游戏
│   ├── survival.js         # 生存类游戏
│   ├── sports.js           # 运动类游戏
│   ├── casual.js           # 休闲类游戏
│   ├── horror.js           # 恐怖类游戏
│   └── images.js           # 图片/益智类游戏
└── README.md               # 项目说明
```

## 🚀 添加新游戏的步骤

### 方法一：向现有分类添加游戏

1. **打开对应的游戏配置文件**
   - 冒险类：`games/adventure.js`
   - 竞速类：`games/racing.js`
   - 生存类：`games/survival.js`
   - 运动类：`games/sports.js`
   - 休闲类：`games/casual.js`
   - 恐怖类：`games/horror.js`
   - 益智类：`games/images.js`

2. **在配置对象中添加新游戏**

```javascript
// 例如在 games/adventure.js 中添加新游戏
const adventureGames = {
    // ... 现有游戏 ...
    
    'new-adventure-game': {
        name: { zh: '新冒险游戏', en: 'New Adventure Game' },
        description: { 
            zh: '这是一个全新的冒险游戏，带来更刺激的体验！',
            en: 'This is a brand new adventure game with more exciting experiences!'
        },
        type: { zh: 'RPG冒险', en: 'RPG Adventure' },
        category: 'adventure',
        icon: 'fas fa-sword',
        color: 'text-gold-400',
        url: 'https://your-game-url.com/embed/game-id'
    }
};
```

### 方法二：创建新的游戏分类

1. **创建新的游戏配置文件**

```javascript
// 例如创建 games/strategy.js
const strategyGames = {
    'tower-defense': {
        name: { zh: '塔防大师', en: 'Tower Defense Master' },
        description: { 
            zh: '建造防御塔，抵御敌人的进攻！',
            en: 'Build defense towers to resist enemy attacks!'
        },
        type: { zh: '策略塔防', en: 'Strategy Tower Defense' },
        category: 'strategy',
        icon: 'fas fa-chess',
        color: 'text-amber-400',
        url: 'https://your-game-url.com/embed/tower-defense'
    }
};

// 导出配置
if (typeof window !== 'undefined') {
    window.strategyGames = strategyGames;
}
```

2. **在HTML中引入新的配置文件**

在 `index.html` 的 `<head>` 部分添加：

```html
<script src="games/strategy.js"></script>
```

3. **更新游戏管理器**

在 `games/gameManager.js` 中更新：

```javascript
// 在 waitForAllGames() 方法中添加新分类检查
waitForAllGames() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (
                window.adventureGames &&
                window.racingGames &&
                // ... 其他现有游戏 ...
                window.strategyGames  // 添加新分类
            ) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}

// 在 mergeGameConfigs() 方法中合并新配置
mergeGameConfigs() {
    this.gameData = {
        ...window.adventureGames,
        // ... 其他现有游戏 ...
        ...window.strategyGames  // 添加新分类
    };
}

// 在 categoryConfig 中添加新分类
window.categoryConfig = {
    // ... 现有分类 ...
    strategy: { zh: '策略类', en: 'Strategy', icon: 'fas fa-chess' }
};
```

## 🎯 游戏配置参数说明

每个游戏需要以下配置参数：

| 参数 | 说明 | 示例 |
|------|------|------|
| `name.zh` | 游戏中文名称 | `'冒险勇者'` |
| `name.en` | 游戏英文名称 | `'Adventure Hero'` |
| `description.zh` | 游戏中文描述 | `'踏上史诗般的冒险旅程！'` |
| `description.en` | 游戏英文描述 | `'Embark on an epic adventure!'` |
| `type.zh` | 游戏类型中文 | `'RPG冒险'` |
| `type.en` | 游戏类型英文 | `'RPG Adventure'` |
| `category` | 游戏分类 | `'adventure'` |
| `icon` | Font Awesome 图标 | `'fas fa-dragon'` |
| `color` | Tailwind 颜色类 | `'text-yellow-400'` |
| `url` | 游戏iframe地址 | `'https://...'` |

## 🎨 可用的图标和颜色

### Font Awesome 图标示例
- `fas fa-dragon` - 龙
- `fas fa-car` - 汽车
- `fas fa-skull` - 骷髅
- `fas fa-basketball-ball` - 篮球
- `fas fa-leaf` - 叶子
- `fas fa-ghost` - 幽灵
- `fas fa-puzzle-piece` - 拼图
- `fas fa-chess` - 国际象棋
- `fas fa-sword` - 剑
- `fas fa-magic` - 魔法

### Tailwind 颜色类示例
- `text-red-400` - 红色
- `text-blue-400` - 蓝色
- `text-green-400` - 绿色
- `text-yellow-400` - 黄色
- `text-purple-400` - 紫色
- `text-pink-400` - 粉色
- `text-indigo-400` - 靛蓝
- `text-orange-400` - 橙色

## 📝 添加游戏示例

### 示例1：添加音乐游戏到休闲类

在 `games/casual.js` 中添加：

```javascript
const casualGames = {
    // ... 现有游戏 ...
    
    'music-rhythm': {
        name: { zh: '节拍大师', en: 'Rhythm Master' },
        description: { 
            zh: '跟随音乐的节拍，展现你的音乐天赋！',
            en: 'Follow the rhythm of music and show your musical talent!'
        },
        type: { zh: '音乐节拍', en: 'Music Rhythm' },
        category: 'casual',
        icon: 'fas fa-music',
        color: 'text-pink-400',
        url: 'https://www.crazygames.com/embed/rhythm-game'
    }
};
```

### 示例2：添加射击游戏到新分类

1. 创建 `games/shooting.js`：

```javascript
const shootingGames = {
    'fps-shooter': {
        name: { zh: '第一人称射击', en: 'FPS Shooter' },
        description: { 
            zh: '体验紧张刺激的第一人称射击游戏！',
            en: 'Experience intense first-person shooting action!'
        },
        type: { zh: '射击游戏', en: 'Shooting Game' },
        category: 'shooting',
        icon: 'fas fa-crosshairs',
        color: 'text-red-500',
        url: 'https://www.crazygames.com/embed/fps-game'
    }
};

if (typeof window !== 'undefined') {
    window.shootingGames = shootingGames;
}
```

2. 在 `index.html` 中添加引用
3. 更新 `gameManager.js` 中的配置

## 🔄 自动重新加载

完成配置修改后，刷新浏览器页面即可看到新添加的游戏！

## 💡 小贴士

1. **游戏ID唯一性**：确保每个游戏的ID（键名）是唯一的
2. **URL有效性**：确保游戏URL是有效的iframe嵌入地址
3. **图标选择**：选择与游戏类型相符的图标
4. **描述简洁**：保持游戏描述简洁明了，突出游戏特色
5. **双语对应**：确保中英文内容对应准确

现在您可以轻松地添加任意数量的游戏了！🎉 