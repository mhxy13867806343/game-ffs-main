import type { GameItem, DocItem } from '@/types/game'

// 游戏列表数据（仅保留即点即玩的实际游戏）
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

// 游戏文档数据（游戏策划文档、官方白皮书、全域资料与模拟器）
export const docList: DocItem[] = [
  {
    id: 'doc-feather-spec',
    title: '裂空之羽 - 策划设计与关卡数值文档 v1.3',
    subtitle: '单机 2D 横版卷轴飞行射击全本 2688 行关卡与数值策划设计书',
    category: '游戏策划',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    path: '/feather/doc',
    updateTime: '2026-10-27'
  },
  {
    id: 'doc-ff-vble-portal',
    title: '最终幻想：时空之轮 - 官方白皮书与全域资料',
    subtitle: '包含剧情编年史、英雄角色、魔物图鉴、秘境地城全方位资料',
    category: '官方大典',
    coverUrl: './images/title-banner.png',
    path: '/vble/docs',
    updateTime: '2026-10-27'
  },
  {
    id: 'doc-ff-vble-guide',
    title: '最终幻想：时空之轮 - 战术攻略与配装模拟器',
    subtitle: '深度战术流派解析、神装词条构筑与实时模拟属性试穿',
    category: '战术模拟',
    coverUrl: './images/battle-preview.png',
    path: '/vble/armory',
    updateTime: '2026-10-27'
  }
]
