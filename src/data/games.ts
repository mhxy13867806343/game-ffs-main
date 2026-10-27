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

// 游戏文档数据（已全部更新为 game-ffs-vble 在线文档链接）
export const docList: DocItem[] = [
  {
    id: 'doc-ff-vble-portal',
    title: '最终幻想：时空之轮 - 官方智能游戏门户',
    subtitle: '包含剧情、角色、图鉴、怪物、地下城、场景与坐骑全方位资料',
    category: '官方门户',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    path: 'https://mhxy13867806343.github.io/game-ffs-vble/#/',
    updateTime: '2026-10-27'
  },
  {
    id: 'doc-ff-vble-guide',
    title: '最终幻想：时空之轮 - 战术攻略与配装模拟器',
    subtitle: '深度战术流派解析、职业装备词条构筑与实时模拟工具',
    category: '战术攻略',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    path: 'https://mhxy13867806343.github.io/game-ffs-vble/#/',
    updateTime: '2026-10-27'
  }
]
