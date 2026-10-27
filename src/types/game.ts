export interface GameItem {
  id: string
  title: string
  subtitle: string
  category: string
  coverUrl: string
  bannerUrl: string
  path: string // 点击跳转的页面/打包出来的访问路径
  tags: string[]
  date: string
  isReady: boolean
}
