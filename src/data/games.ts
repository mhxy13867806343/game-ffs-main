import type { GameItem, BannerItem } from '@/types/game'
import dayjs from 'dayjs'

// 单机推荐海报轮播
export const bannerList: BannerItem[] = [
  {
    id: 'b-roadster',
    gameId: 'roadster-sky-run',
    title: '天际跑车：极速狂飙',
    subtitle: '离线纯单机 3D WebGL 竞速，现已打包就绪，无需联网即点即玩！',
    badge: '单机就绪·即点即玩',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80',
    playPath: '/games/roadster-sky-run/index.html'
  },
  {
    id: 'b-feather',
    gameId: 'split-feather-rpg',
    title: '裂空之羽：命运交错',
    subtitle: 'Godot 单机 2D 回合制策略战棋，经典本地单人剧情模式',
    badge: '单机打包路径已预留',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
    playPath: '/games/split-feather/index.html'
  },
  {
    id: 'b-crystal',
    gameId: 'ff-crystal-dimension',
    title: '水晶编年史：维度跃迁',
    subtitle: '纯单机像素 RPG，丰富职业构筑与单人地牢探险',
    badge: '单机打包路径已预留',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80',
    playPath: '/games/ff-crystal/index.html'
  }
]

// 纯单机游戏列表（预留各款打包出来的访问路径）
export const gameList: GameItem[] = [
  {
    id: 'roadster-sky-run',
    title: '天际跑车：极速狂飙',
    subtitle: '3D 赛博轨道离线物理竞速',
    category: 'racing',
    categoryLabel: '单机竞速',
    coverUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80',
    tags: ['单机离线', '3D WebGL', '极速狂飙'],
    playPath: '/games/roadster-sky-run/index.html',
    description: '采用 Three.js 与纯前端物理引擎独立打包的 3D 单机竞速游戏。零网络依赖，支持全屏极速运行。',
    version: 'v1.0.4 (离线打包版)',
    updateDate: dayjs('2026-10-24').format('YYYY-MM-DD'),
    isReady: true,
    features: ['纯本地单机运算，无延迟', '支持键盘与触屏控制', '极速轨道与障碍躲避'],
    controls: [
      { key: '↑ / W', action: '加速前行' },
      { key: '← → / A D', action: '左右变道 / 转向' },
      { key: 'Space 空格', action: '紧急刹车' },
      { key: 'R 键', action: '重置赛车位置' }
    ]
  },
  {
    id: 'split-feather-rpg',
    title: '裂空之羽：命运交错',
    subtitle: '2D 策略回合制单人冒险战棋',
    category: 'rpg',
    categoryLabel: '单机回合',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    tags: ['单机剧情', '战棋策略', '关卡设计'],
    playPath: '/games/split-feather/index.html',
    description: '单人战术回合制 RPG，基于深度关卡设计体系。独立打包后放入该目录即可直接单机游玩。',
    version: 'v1.3.0 (单机版)',
    updateDate: dayjs('2026-10-23').format('YYYY-MM-DD'),
    isReady: false,
    features: ['单机本地存档机制', '关卡多分支攻略路线', '无网络验证'],
    controls: [
      { key: '鼠标左键', action: '选择移动格 / 确认指令' },
      { key: '鼠标右键 / ESC', action: '取消当前动作 / 打开面板' }
    ]
  },
  {
    id: 'ff-crystal-dimension',
    title: '水晶编年史：维度跃迁',
    subtitle: '复古像素单人冒险 RPG',
    category: 'rpg',
    categoryLabel: '像素冒险',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    tags: ['经典单机', '技能树', '地牢探索'],
    playPath: '/games/ff-crystal/index.html',
    description: '纯单人单机探索地牢与职业成长，拥有多分支职业维度与 BOSS 挑战。',
    version: 'v0.9.5 (预留打包版)',
    updateDate: dayjs('2026-10-15').format('YYYY-MM-DD'),
    isReady: false,
    features: ['单机像素美术风格', '装备技能自由搭配', '纯本地数据保存'],
    controls: [
      { key: '方向键', action: '人物移动' },
      { key: 'Enter / Z', action: '调查 / 确定' },
      { key: 'ESC / X', action: '菜单 / 取消' }
    ]
  },
  {
    id: 'roadster-retro-classic',
    title: '赛博极速：街机先锋',
    subtitle: '街机风格单机低多边形小游戏',
    category: 'casual',
    categoryLabel: '休闲单机',
    coverUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=1600&q=80',
    tags: ['单机街机', '轻松益智', '即时刷新'],
    playPath: '/games/retro-speed/index.html',
    description: '轻量级离线单机街机游戏，低耗高效，在任何设备浏览器中皆可秒开畅玩。',
    version: 'v1.0.0 (预留打包版)',
    updateDate: dayjs('2026-10-18').format('YYYY-MM-DD'),
    isReady: false,
    features: ['超轻体积', '秒速启动', '支持离线'],
    controls: [
      { key: '方向键 / 屏幕滑块', action: '控制躲避' },
      { key: 'P 键', action: '暂停游戏' }
    ]
  }
]
