import type { GameItem } from '@/types/game'

// 游戏列表数据（配置各个游戏的跳转路径）
export const gameList: GameItem[] = [
  {
    id: 'roadster-sky-run',
    title: '天际跑车：极速狂飙',
    subtitle: '3D WebGL 轨道极速竞速',
    category: '竞速',
    coverUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    path: './games/roadster-sky-run/index.html'
  },
  {
    id: 'turn-based-tactics',
    title: '战术指令：回合先锋',
    subtitle: '2D 策略战棋单人对局',
    category: '策略',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    path: './games/turn-based-tactics/index.html'
  },
  {
    id: 'pixel-dungeon',
    title: '原初地牢：像素冒险',
    subtitle: '复古像素单机地牢探索',
    category: 'RPG',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    path: './games/pixel-dungeon/index.html'
  },
  {
    id: 'arcade-runner',
    title: '赛博跑酷：无尽霓虹',
    subtitle: '节奏跳跃街机小游戏',
    category: '休闲',
    coverUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
    path: './games/arcade-runner/index.html'
  }
]
