import type { GameItem } from '@/types/game'
import dayjs from 'dayjs'

// 仅保存单机游戏列表（配置打包出来的页面路径，点击直接跳转）
export const gameList: GameItem[] = [
  {
    id: 'roadster-sky-run',
    title: '天际跑车：极速狂飙',
    subtitle: '3D WebGL 轨道极速竞速单机版',
    category: '竞速',
    coverUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80',
    path: '/games/roadster-sky-run/index.html',
    tags: ['3D WebGL', '极速竞速', '单机运行'],
    date: dayjs('2026-10-24').format('YYYY-MM-DD'),
    isReady: true
  },
  {
    id: 'turn-based-tactics',
    title: '战术指令：回合先锋',
    subtitle: '2D 策略战棋单机版',
    category: '策略',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
    path: '/games/turn-based-tactics/index.html',
    tags: ['2D战棋', '策略推演', '本地存档'],
    date: dayjs('2026-10-20').format('YYYY-MM-DD'),
    isReady: false
  },
  {
    id: 'pixel-dungeon',
    title: '原初地牢：像素冒险',
    subtitle: '复古像素单机地牢探索',
    category: 'RPG',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80',
    path: '/games/pixel-dungeon/index.html',
    tags: ['像素复古', '地牢探险', '动作冒险'],
    date: dayjs('2026-10-18').format('YYYY-MM-DD'),
    isReady: false
  },
  {
    id: 'arcade-runner',
    title: '赛博跑酷：无尽霓虹',
    subtitle: '节奏跳跃单机街机小游戏',
    category: '休闲',
    coverUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=1920&q=80',
    path: '/games/arcade-runner/index.html',
    tags: ['单机街机', '反应挑战', '即开即玩'],
    date: dayjs('2026-10-15').format('YYYY-MM-DD'),
    isReady: false
  }
]
