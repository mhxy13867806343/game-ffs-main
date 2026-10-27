/**
 * 虚空天体与终焉决战体系配置
 * 维护次元之隙四大区域、九大行星投影、五大始源元素与终焉虚无核心。
 */

export interface VoidStage {
  id: string
  name: string
  theme: string
  zoneType: string
  boss: string
  desc: string
}

export const voidStages: VoidStage[] = [
  {
    id: 'stage-1',
    name: '第 1 阶：荒芜流沙砂漠 (Desert of Desolation)',
    theme: '地表遗失文明流沙',
    zoneType: '流沙迷宫',
    boss: '流砂遗迹蠕虫',
    desc: '被虚无吞噬的古代沙漠残迹，流沙单向传送且伴随窒息沉沦状态。'
  },
  {
    id: 'stage-2',
    name: '第 2 阶：静止幻影蜃楼 (Phantom Mirage Town)',
    theme: '错位时空小镇',
    zoneType: '空间折叠',
    boss: '伪形幻影多佩尔冈格',
    desc: '凝聚了人类回忆的幻影街市，商店NPC皆为虚无生成的幻象。'
  },
  {
    id: 'stage-3',
    name: '第 3 阶：机械齿轮遗迹 (Clockwork Machine Waterfall)',
    theme: '上古科技终末工坊',
    zoneType: '齿轮浮岛',
    boss: '毁灭兵器 欧米茄 (巡逻)',
    desc: '悬浮于次元深渊的重金属机械带，失控的古代兵器在此终年游荡。'
  },
  {
    id: 'stage-4',
    name: '第 4 阶：终焉虚无核心 (Singularity Void Core)',
    theme: '全维度湮灭奇点',
    zoneType: '奇点决战',
    boss: '新·艾克斯德斯 (Neo Exdeath)',
    desc: '所有时空与概念的尽头，万物归一，虚无之力的发源地。'
  }
]

export const solarPlanets = [
  { name: '水星 (Mercury)', element: '极寒冰霜', effect: '冰属性抗性 +50%，受火伤增加 25%' },
  { name: '金星 (Venus)', element: '酸蚀剧毒', effect: '每回合扣除 5% HP，附加物理破防' },
  { name: '地球 (Earth)', element: '大地重力', effect: '免疫地震，浮空单位受到重力下坠' },
  { name: '火星 (Mars)', element: '烈焰熔岩', effect: '火属性伤害提升 30%，附带灼烧' },
  { name: '木星 (Jupiter)', element: '风暴雷霆', effect: '雷属性暴击率增加 25%' },
  { name: '土星 (Saturn)', element: '石化时滞', effect: '行动速度降低 15%，抵抗击退' },
  { name: '天王星 (Uranus)', element: '青色真空', effect: '全场青魔法效能提升 40%' },
  { name: '海王星 (Neptune)', element: '深蓝潮汐', effect: '水属性法术消耗减半' },
  { name: '冥王星 (Pluto)', element: '终末冥界', effect: '不死系生物全属性强化 50%' }
]

export const fiveElements = [
  { name: '风 (Wind)', symbol: '🌪️', color: 'text-green-400', desc: '自由之息，赋能速度与回避，克制大地' },
  { name: '水 (Water)', symbol: '💧', color: 'text-cyan-400', desc: '生命滋养与波涛净化，克制烈焰' },
  { name: '火 (Fire)', symbol: '🔥', color: 'text-red-400', desc: '文明热能与毁灭暴击，克制极冰' },
  { name: '土 (Earth)', symbol: '⛰️', color: 'text-amber-400', desc: '坚韧承载与重力磁场，克制雷电' },
  { name: '虚 (Void)', symbol: '🌌', color: 'text-purple-400', desc: '吞噬一切维度的源初奇点，超越全属性' }
]
