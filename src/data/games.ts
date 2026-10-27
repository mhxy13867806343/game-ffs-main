import type { GameItem, DocItem } from '@/types/game'

// 游戏列表数据
export const gameList: GameItem[] = [
  {
    id: 'ai-h5-games',
    title: 'AI H5 游戏合集',
    subtitle: '趣味 H5 网页游戏精选，即点即玩',
    category: 'H5游戏',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    path: 'https://mhxy13867806343.github.io/ai-h5-games/'
  }
]

// 游戏文档数据
export const docList: DocItem[] = [
  {
    id: 'doc-ai-h5',
    title: 'AI H5 游戏开发与架构文档',
    subtitle: '轻量化 H5 游戏开发规范、单机架构设计与发布流程',
    category: '开发文档',
    coverUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    path: 'https://github.com/mhxy13867806343/ai-h5-games#readme',
    updateTime: '2026-10-27'
  },
  {
    id: 'doc-game-guide',
    title: '游戏矩阵接入与打包指南',
    subtitle: '多游戏统一门户集成规范与静态部署指引',
    category: '接入文档',
    coverUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    path: 'https://github.com/mhxy13867806343/game-ffs-main#readme',
    updateTime: '2026-10-27'
  }
]
