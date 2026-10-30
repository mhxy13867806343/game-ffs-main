import { jobsList } from './jobsConfig'

/**
 * 导航菜单与路由链路配置中心
 * 凡是主导航栏、下拉菜单、底部快捷导航用到的列表项，统一在此维护。
 * 后续如果要加新页面、新路由、新标签，直接在此添加即可！
 */

export interface NavItemConfig {
  title: string
  name: string
  path: string
  icon?: string
  badge?: string
  category?: 'core' | 'world' | 'tactics' | 'system'
}

export const navItems: NavItemConfig[] = [
  { title: '首页', name: '首页', path: '/vble', icon: '🏠', category: 'core' },
  { title: '白皮书', name: '白皮书', path: '/vble/docs', icon: '📜', badge: '27卷', category: 'core' },
  { title: '编年史', name: '编年史', path: '/vble/story', icon: '📖', badge: '44节拍', category: 'world' },
  { title: '英雄', name: '英雄', path: '/vble/characters', icon: '👥', badge: '4人', category: 'world' },
  { title: '魔物图鉴', name: '魔物图鉴', path: '/vble/monsters', icon: '👾', badge: '147怪', category: 'world' },
  { title: '属性器', name: '属性器', path: '/vble/attributes', icon: '🧮', badge: '双核', category: 'tactics' },
  { title: '属性修改器', name: '属性修改器', path: '/vble/modifier', icon: '🛠️', badge: 'GM修改', category: 'tactics' },
  { title: '配装模拟', name: '配装模拟', path: '/vble/armory', icon: '⚔️', badge: '全装试穿', category: 'tactics' },
  { title: '职业', name: '职业', path: '/vble/jobs', icon: '⚔️', badge: `${jobsList.length}职`, category: 'world' },
  { title: '秘境地城', name: '秘境地城', path: '/vble/dungeons', icon: '🏰', badge: '18图', category: 'world' },
  { title: '场景城镇', name: '场景城镇', path: '/vble/scenes', icon: '🗺️', badge: 'NPC商铺', category: 'world' },
  { title: '载具', name: '载具', path: '/vble/vehicles', icon: '✈️', badge: '10具', category: 'world' },
  { title: '支线', name: '支线', path: '/vble/sidequests', icon: '📝', badge: '资料', category: 'world' },
  { title: '战斗法则', name: '战斗法则', path: '/vble/battle-tactics', icon: '⏳', badge: 'ATB', category: 'tactics' },
  { title: '首领攻坚', name: '首领攻坚', path: '/vble/boss-tactics', icon: '👑', badge: '20王', category: 'tactics' },
  { title: '虚空天体', name: '虚空天体', path: '/vble/celestial', icon: '🌌', badge: '终焉', category: 'tactics' },
  { title: '经济调合', name: '经济调合', path: '/vble/economy', icon: '⚗️', badge: '神装', category: 'system' },
  { title: '秘传绝技', name: '秘传绝技', path: '/vble/teachings', icon: '🎓', category: 'system' },
  { title: '召唤兽', name: '召唤兽', path: '/vble/summons', icon: '🐉', badge: '12神', category: 'system' },
  { title: '神兵矩阵', name: '神兵矩阵', path: '/vble/equipment', icon: '🗡️', category: 'system' },
  { title: '道具防具', name: '道具防具', path: '/vble/items', icon: '🛡️', category: 'system' },
  { title: '深渊系统', name: '深渊系统', path: '/vble/systems', icon: '⚙️', category: 'system' },
  { title: '游戏下载', name: '游戏下载', path: '/vble/download', icon: '📥', badge: '4大网盘', category: 'core' },
  { title: '实机画廊', name: '实机画廊', path: '/vble/gallery', icon: '🖼️', category: 'core' },
  { title: '资讯中心', name: '资讯中心', path: '/vble/news', icon: '📢', badge: '单机档案', category: 'core' },
  { title: '更新日志', name: '更新日志', path: '/vble/updates', icon: '🔄', badge: '最新动态', category: 'core' },
  { title: '功能规划', name: '功能规划', path: '/vble/roadmap', icon: '🚀', badge: '未来规划', category: 'core' },
  { title: '全景搜索', name: '全景搜索', path: '/vble/search', icon: '🔍', category: 'core' }
]

export const footerQuickLinks = [
  { name: '游戏客户端下载', path: '/vble/download' },
  { name: '单机档案与资讯', path: '/vble/news' },
  { name: '更新日志', path: '/vble/updates' },
  { name: '未来功能规划', path: '/vble/roadmap' },
  { name: '架构白皮书', path: '/vble/docs' },
  { name: '全域魔物图鉴', path: '/vble/monsters' },
  { name: '配装属性模拟器', path: '/vble/armory' },
  { name: '场景城镇与商铺', path: '/vble/scenes' },
  { name: 'GM属性修改器', path: '/vble/modifier' },
  { name: '地貌拓扑', path: '/vble/dungeons' },
  { name: '首领攻坚阶段', path: '/vble/boss-tactics' },
  { name: '虚空次元矩阵', path: '/vble/celestial' },
  { name: '药剂调合工坊', path: '/vble/economy' },
  { name: '全域数据库搜索', path: '/vble/search' }
]
