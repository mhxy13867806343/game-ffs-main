export interface ChapterInfo {
  id: number
  name: string
  color: string
  colorName: string
  theme: string
  subTheme: string
  levelRange: string
  recommendLevel: string
  boss: string
  levels: LevelInfo[]
}

export interface LevelInfo {
  code: string
  name: string
  type: 'normal' | 'elite' | 'boss'
  recommendLevel: string
  target: string
  boss?: string
  drops: string
  features: string
}

export interface HeroClass {
  id: string
  name: string
  role: string
  desc: string
  mainWeapon: string
  subWeapon: string
  activeSkill1: string
  activeSkill2: string
  overload: string
  drone: string
  speed: number
  armor: number
  firepower: number
  color: string
  avatar: string
}

export interface BossInfo {
  name: string
  chapter: string
  code: string
  type: string
  bulletType: string
  feature: string
  drop: string
}
