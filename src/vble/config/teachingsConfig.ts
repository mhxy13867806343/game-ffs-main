/**
 * 秘传绝技与学院特训配置文件
 * 包含勇者圣所庇护法、米西迪亚高级魔法进修、东洋忍者五大忍术秘传。
 */

export interface TeachingItem {
  id: string
  name: string
  category: 'sanctuary' | 'mysidia' | 'ninja'
  categoryName: string
  mentor: string
  cost: string
  effect: string
  lore: string
}

export const teachingsList: TeachingItem[] = [
  {
    id: 'hero-cover',
    name: '真·圣骑士舍身庇护 (Sacred Cover)',
    category: 'sanctuary',
    categoryName: '勇者圣所',
    mentor: '泰空第一骑士',
    cost: '0 MP (被动触发)',
    effect: '当友方任意同伴生命值降至 25% 以下时，100% 替其承担全部单体物理与魔法伤害，并自带 50% 减伤。',
    lore: '骑士道终极信仰——以身化盾，至死不退。'
  },
  {
    id: 'hero-holyslash',
    name: '神圣十字斩 (Holy Cross Slash)',
    category: 'sanctuary',
    categoryName: '勇者圣所',
    mentor: '圣光贤者',
    cost: '24 MP',
    effect: '挥舞圣剑打出两道神圣裂痕，对单体造成 350% 圣属性伤害，并净化自身全部负面减益。',
    lore: '破除一切秽土深渊之力的纯白裁决。'
  },
  {
    id: 'mysidia-meteor',
    name: '古代禁咒·陨石雨 (Ancient Meteor)',
    category: 'mysidia',
    categoryName: '米西迪亚学院',
    mentor: '大魔道士',
    cost: '42 MP',
    effect: '从外太空接引 4 颗炽热陨石轰击敌方随机目标，无视一切魔法防御与属性抗性。',
    lore: '米西迪亚最高评议会封存三千年的禁忌星辰法术。'
  },
  {
    id: 'mysidia-quick',
    name: '时空禁断·连续即时行动 (Quick Time)',
    category: 'mysidia',
    categoryName: '米西迪亚学院',
    mentor: '时空先知',
    cost: '77 MP',
    effect: '冻结除施法者外的全场时间流，获得连续两次不受任何干扰的即刻自由行动回合。',
    lore: '操纵时空之轮裂痕的最高位时空奥义。'
  },
  {
    id: 'ninja-water',
    name: '忍法·水龙水遁 (Water Dragon Scroll)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '影之刃首领',
    cost: '消耗【水之卷轴】',
    effect: '召唤狂暴巨浪冲刷敌方全阵列，造成巨额水属性术式伤害，对机械系敌人造成电路短路暴击。',
    lore: '东洋忍之国度传承千年的水相咒符。'
  },
  {
    id: 'ninja-shadow',
    name: '影分身金蝉脱壳 (Shadow Clone Escape)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '影之刃首领',
    cost: '12 MP',
    effect: '在原地留下残影替身，必定免疫接下来的 2 次任意物理攻击，并提升 30% 暴击率。',
    lore: '真假难辨的东方幻惑身法。'
  }
]
