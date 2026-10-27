export interface GameItem {
  id: string
  title: string
  subtitle: string
  category: string
  coverUrl: string
  path: string // 点击跳转的页面路径
}

export interface DocItem {
  id: string
  title: string
  subtitle: string
  category: string
  coverUrl: string
  path: string // 点击跳转的文档路径或在线链接
  updateTime: string
}
