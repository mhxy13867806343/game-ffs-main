export type GameCategory = 'all' | 'racing' | 'rpg' | 'action' | 'puzzle' | 'casual'

export interface GameItem {
  id: string
  title: string
  subtitle: string
  category: GameCategory
  categoryLabel: string
  coverUrl: string
  bannerUrl: string
  tags: string[]
  playPath: string // 打包出来的单机访问路径，如 /games/roadster-sky-run/index.html
  description: string
  version: string
  updateDate: string
  isReady: boolean // 是否已打包就绪
  controls: {
    key: string
    action: string
  }[]
  features: string[]
}

export interface BannerItem {
  id: string
  gameId: string
  title: string
  subtitle: string
  badge: string
  imageUrl: string
  playPath: string
}
