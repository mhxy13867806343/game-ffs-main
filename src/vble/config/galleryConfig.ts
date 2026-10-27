/**
 * 实机画廊与视觉资产配置清单
 * 维护大世界、战斗场景、UI菜单与特效展示截图。
 */

export interface GalleryItem {
  id: string
  title: string
  category: 'battle' | 'map' | 'ui' | 'vfx'
  categoryName: string
  src: string
  desc: string
}

export const galleryList: GalleryItem[] = [
  {
    id: 'gal-title',
    title: '游戏主标题界面与概念徽标',
    category: 'ui',
    categoryName: '界面UI',
    src: '/images/title-banner.png',
    desc: '融合复古像素金辉与现代赛博霓虹质感的开屏主视觉。'
  },
  {
    id: 'gal-battle-1',
    title: '回合制 ATB 实机战斗全景',
    category: 'battle',
    categoryName: '战斗场景',
    src: '/images/battle-preview.png',
    desc: '四人小队迎战原野怪，底部行动条与技能指令即时响应。'
  },
  {
    id: 'gal-world-map',
    title: '广袤大世界地表与城邦航图',
    category: 'map',
    categoryName: '世界地貌',
    src: '/images/world-map.png',
    desc: '展现平原、群山、海岸与隐秘森林的宏大开放式大地图。'
  },
  {
    id: 'gal-cave',
    title: '地下城洞窟火把探索与机关解谜',
    category: 'map',
    categoryName: '世界地貌',
    src: '/images/cave-explore.png',
    desc: '动态光影与雾气笼罩下的深邃地下遗迹探索。'
  },
  {
    id: 'gal-shop',
    title: '港口城邦商业武器防具商店',
    category: 'ui',
    categoryName: '界面UI',
    src: '/images/shop-preview.png',
    desc: '经典的买卖装备交互、属性差值即时对比面板。'
  },
  {
    id: 'gal-party',
    title: '队伍编成与装备配置总览',
    category: 'ui',
    categoryName: '界面UI',
    src: '/images/party-menu.png',
    desc: '角色属性、状态抗性、职业副技能装配界面。'
  },
  {
    id: 'gal-victory',
    title: '首领讨伐凯旋与经验结算',
    category: 'battle',
    categoryName: '战斗场景',
    src: '/images/battle-victory.png',
    desc: '经典的胜利号角响起，经验值跳动与战利品拾取窗口。'
  },
  {
    id: 'gal-vfx-1',
    title: '魔导雷光技能特效序列',
    category: 'vfx',
    categoryName: '特效渲染',
    src: '/images/vfx-magitek.png',
    desc: '逐帧手绘发光的魔导粒子爆炸与电弧粒子迸发。'
  },
  {
    id: 'gal-vfx-2',
    title: '虚空次元裂隙空间扭曲特效',
    category: 'vfx',
    categoryName: '特效渲染',
    src: '/images/vfx-void.png',
    desc: '终焉虚无核心与黑洞引力坍缩着色器效果。'
  }
]
