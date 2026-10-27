/**
 * 秘传绝技与学院特训配置文件
 * 包含勇者圣所庇护法、米西迪亚高级魔法进修、东洋忍者五遁秘传、魔物拟态青魔法进修。
 */

export interface TeachingItem {
  id: string
  name: string
  category: 'sanctuary' | 'mysidia' | 'ninja' | 'bluemagic'
  categoryName: string
  mentor: string
  cost: string
  castSpeed: string
  element: string
  effect: string
  formula: string
  tactics: string
  lore: string
}

export const teachingsList: TeachingItem[] = [
  // 勇者圣所庇护法
  {
    id: 'hero-cover',
    name: '真·圣骑士舍身庇护 (Sacred Cover)',
    category: 'sanctuary',
    categoryName: '勇者圣所',
    mentor: '泰空第一骑士·艾尔文',
    cost: '0 MP (战术姿态)',
    castSpeed: '瞬发 (被动常驻)',
    element: '无属性 / 圣',
    effect: '当友方任意同伴生命值降至 25% 以下（濒死状态）时，100% 替其承担全部单体物理与魔法伤害，自带 50% 纯减伤。',
    formula: '实际伤害 = (原伤害 × 0.5) - (防守者物理防御 × 1.25)',
    tactics: '配合骑士高防御与护盾格挡特权，可彻底免疫单体秒杀型 Boss 的连斩技能。',
    lore: '骑士道终极信仰——以身化盾，至死不退。'
  },
  {
    id: 'hero-holyslash',
    name: '神圣十字斩 (Holy Cross Slash)',
    category: 'sanctuary',
    categoryName: '勇者圣所',
    mentor: '圣光贤者·吉迪恩',
    cost: '24 MP',
    castSpeed: 'ATB 充能 85%',
    element: '圣属性',
    effect: '挥舞圣剑打出两道神圣裂痕，对单体造成 350% 圣属性伤害，并净化施法者全部负面减益（黑暗、毒、沉默、迟滞）。',
    formula: '基础伤害 = (攻击力 × 3.5 + 精神 × 2.0) × 圣属性克制倍率 (1.5~2.0)',
    tactics: '对抗骨王、死神判官等不死生物与冥界系首领的核心破魔招式。',
    lore: '破除一切秽土深渊之力的纯白裁决。'
  },
  {
    id: 'hero-order-covenant',
    name: '秩序契约·全军壁垒 (Order Covenant)',
    category: 'sanctuary',
    categoryName: '勇者圣所',
    mentor: '圣殿防卫官·雷蒙',
    cost: '36 MP',
    castSpeed: 'ATB 充能 100%',
    element: '光辉结界',
    effect: '立誓展开全军圣光矩阵，全队受到的全属性伤害降低 35%，持续 3 个行动轮次，期间免疫击退与硬直。',
    formula: '结界吸收量 = 施法者最大生命值 × 25%，超额部分直接分摊至全员护盾',
    tactics: '在 Boss 释放全屏 AOE 蓄力阶段（如冥界震荡、海怪狂啸）前预先开启，稳定团灭阈值。',
    lore: '黄金时代的圣殿骑士团以此契约抵御了远古天灾的侵袭。'
  },
  {
    id: 'hero-sovereign-sigh',
    name: '圣王叹息·逆境破晓 (Sovereign Sigh)',
    category: 'sanctuary',
    categoryName: '勇者圣所',
    mentor: '已故老国王·泰空王遗诏',
    cost: '50 MP / 100 TP',
    castSpeed: '全速瞬发 (优先级+3)',
    element: '神圣纯净',
    effect: '当队伍处于陷入 2 人以上倒地或全员 HP < 30% 的绝境时可用：瞬间复活全员并回复 50% HP，重置全队 ATB 条。',
    formula: '复活生命值 = 目标最大生命值 × 50% + 精神修正',
    tactics: '每场战斗限使用一次的翻盘底牌，扭转战局的至高救赎。',
    lore: '一代明君在王座崩塌前留给后世勇者的最后怜悯与守望。'
  },

  // 米西迪亚大魔道院时空禁术
  {
    id: 'mysidia-meteor',
    name: '古代禁咒·陨石雨 (Ancient Meteor)',
    category: 'mysidia',
    categoryName: '米西迪亚学院',
    mentor: '大魔道院院长·加斯特',
    cost: '42 MP',
    castSpeed: 'ATB 充能 120%',
    element: '无属性 / 天体物理',
    effect: '从外太空接引 4 颗炽热陨石随机轰击敌方目标，无视一切魔法防御与属性抗性，单发造成毁灭性暴击。',
    formula: '单颗伤害 = 基础魔攻 × (3.8 ~ 5.2) + 随机波动系数 (0.9 ~ 1.15)',
    tactics: '对付高魔抗、高物防或双防拉满的虚空首领的最佳定点爆破手段。',
    lore: '米西迪亚最高评议会封存三千年的禁忌星辰法术，曾抹平了一座古帝国要塞。'
  },
  {
    id: 'mysidia-quick',
    name: '时空禁断·连续即时行动 (Quick Time)',
    category: 'mysidia',
    categoryName: '米西迪亚学院',
    mentor: '时空先知·克洛诺斯',
    cost: '77 MP',
    castSpeed: '瞬发',
    element: '时空',
    effect: '冻结除施法者外的全场时间流，获得连续两次不受任何干扰的即刻自由行动回合（可连续使用魔法、道具或攻击）。',
    formula: '全局时间流暂停 = 2 Action Slots，期间所有外部 ATB 计量槽锁死为 0',
    tactics: '配合红魔法双重咏唱或黑魔法核爆，可在一瞬间倾泻 4 发高阶禁咒造成瞬间斩杀。',
    lore: '操纵时空之轮裂痕的最高位时空奥义，凡人触碰时须以庞大魔力为代价。'
  },
  {
    id: 'mysidia-ultima',
    name: '终焉裁决·究极神圣之耀 (Ultima Sanctum)',
    category: 'mysidia',
    categoryName: '米西迪亚学院',
    mentor: '黑白魔导执政官·艾拉',
    cost: '60 MP',
    castSpeed: 'ATB 充能 140%',
    element: '全知究极',
    effect: '融合黑魔法的毁灭与白魔法的创生，对敌方全阵列引发全屏湮灭光柱，造成 9999 极限阈值神圣白热伤害。',
    formula: '全体伤害 = (黑魔力 + 白魔力) × 4.6 × 全体均摊系数 (目标越多单体递减，极限 9999)',
    tactics: '扫平精英小怪集群或作为多阶段首领转阶段的爆发斩杀技。',
    lore: '古老魔导文明巅峰之作，相传由四颗原始元素水晶的共鸣源质衍生而来。'
  },
  {
    id: 'mysidia-singularity',
    name: '重力黑洞·坍缩奇点 (Singularity Collapse)',
    category: 'mysidia',
    categoryName: '米西迪亚学院',
    mentor: '重力学教授·巴里',
    cost: '38 MP',
    castSpeed: 'ATB 充能 90%',
    element: '重力暗相',
    effect: '在敌方阵地中心制造重力坍缩奇点，扣除全部非首领目标当前生命值的 75%，并将首领的行动速度强行降低 50%。',
    formula: '普通怪扣除 = 当前 HP × 0.75 (下限 1)；首领造成重力撕裂固定伤害 = 精神 × 8',
    tactics: '在高难度地下城面对血量极厚（数万血量）的小怪群时，起手一击即可削减 75% 战斗时间。',
    lore: '重力学派最高学者窥探深渊奇点时发现的微观微黑洞坍缩引力波。'
  },

  // 东洋忍者五遁与影武者秘传
  {
    id: 'ninja-water',
    name: '忍法·水遁·水龙潜影 (Water Dragon Scroll)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '影之刃首领·半藏',
    cost: '消耗【水之卷轴】×1 + 6 MP',
    castSpeed: '瞬发高速',
    element: '水属性',
    effect: '召唤狂暴巨浪冲刷敌方全阵列，造成巨额水属性术式伤害，对机械系敌人造成电路短路暴击与触电硬直。',
    formula: '术式伤害 = (投掷者敏捷 × 2.8 + 智力 × 1.5) × (卷轴基础倍率 1.4)',
    tactics: '克制火之地下城熔岩怪物群与古代兵工厂机械巡逻卫兵。',
    lore: '东洋忍之国度传承千年的水相咒符，引江海暗流化为水龙之形。'
  },
  {
    id: 'ninja-fire',
    name: '忍法·火遁·业火炎岚 (Fire Gale Scroll)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '影之刃首领·半藏',
    cost: '消耗【火之卷轴】×1 + 6 MP',
    castSpeed: '瞬发高速',
    element: '火属性',
    effect: '以查克拉结印点燃炎符，喷射扇形极热烈焰，造成全体火属性物理与术式混合伤害，附加 3 轮燃烧流血状态。',
    formula: '混合伤害 = 物理攻击力 × 1.2 + 忍术加成 × 2.0，每轮流血扣除 5% 最大生命',
    tactics: '用于极寒冰河洞窟清除冰系小怪群与植物系魔兽。',
    lore: '忍界流传的烈火狂岚，连钢铁亦能在高温中化为赤红铁水。'
  },
  {
    id: 'ninja-thunder',
    name: '忍法·雷遁·紫电千鸟 (Thunder Bird Scroll)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '东洋隐士·千代',
    cost: '消耗【雷之卷轴】×1 + 8 MP',
    castSpeed: '极速突刺',
    element: '雷属性',
    effect: '将雷鸣电弧汇聚于苦无之上，对单体目标贯穿突刺，100% 附加麻痹状态（1回合无法行动），必定暴击。',
    formula: '暴击伤害 = (敏捷 × 3.2 + 武器物攻 × 1.8) × 1.5 (雷属性暴击)',
    tactics: '打断 Boss 致命蓄力与高威胁法师吟唱的关键控场杀手锏。',
    lore: '疾如雷霆，其发声如千鸟齐鸣，敌人未闻其声已见白刃入腹。'
  },
  {
    id: 'ninja-substitution',
    name: '忍法·木遁·空蝉替身 (Cicada Substitution)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '影之刃首领·半藏',
    cost: '14 MP',
    castSpeed: '瞬发',
    element: '木相生息',
    effect: '在原地留下一截替身原木，完全格挡回避接下来的 3 次敌方单体或群体物理攻击，受击时不损失生命。',
    formula: '格挡层数 = 3 层 (每次命中消耗 1 层)，受到魔法伤害不消耗层数',
    tactics: '忍者二刀流生存的核心底牌，在没有盾牌防御惩罚下获得绝对安全窗口。',
    lore: '蜕皮如金蝉，行藏如青松，东洋忍术中最高明的脱身自保法门。'
  },
  {
    id: 'ninja-mirage-strike',
    name: '影武者奥义·八荒无相斩 (Eightfold Shadow Mirage)',
    category: 'ninja',
    categoryName: '东洋忍者秘传',
    mentor: '东洋隐士·千代',
    cost: '45 MP',
    castSpeed: 'ATB 充能 110%',
    element: '暗影无相',
    effect: '化身为 8 尊影分身同时穿梭战场，对随机敌人发动 8 次凌厉斩击，每次斩击继承副手武器的所有特效与异常附加。',
    formula: '总伤害 = 8 × (主手攻击 × 0.85 + 副手攻击 × 0.85) × 暴击判定',
    tactics: '若装备两把顶级名刀（如佐助之刀、村雨），可瞬间爆发出超 10,000+ 巨量物理连击总伤。',
    lore: '唯有在影武者之道浸淫四十年的极意宗师方可施展的绝杀无相刀术。'
  },

  // 魔物拟态青魔法学院
  {
    id: 'bluemagic-white-wind',
    name: '魔物秘技·白风温润沐浴 (White Wind)',
    category: 'bluemagic',
    categoryName: '青魔法学院',
    mentor: '风精灵学士·普弗',
    cost: '28 MP',
    castSpeed: '即刻释放',
    element: '风 / 治愈',
    effect: '引导温润纯风沐浴全队，为所有队员回复相当于【施法者当前实际生命值】的血量，无视禁疗与魔防。',
    formula: '全队单体回复量 = 施法者当前 HP (若施法者满血 3000，则全队各回 3000)',
    tactics: '在施法者满血时作为全体超大群抬血使用；施法者残血时需先自愈再释放。',
    lore: '从高位风系鸟妖与精灵魔兽处通过肉身硬抗观察习得的自然柔风秘术。'
  },
  {
    id: 'bluemagic-goblin-punch',
    name: '哥布林碎颅重拳 (Goblin Punch)',
    category: 'bluemagic',
    categoryName: '青魔法学院',
    mentor: '驯兽大师·基加',
    cost: '0 MP',
    castSpeed: '普攻速度',
    element: '无属性物理',
    effect: '凝聚怪力猛砸敌人面门。当施法者等级与目标怪物等级【完全相同】时，伤害瞬间暴涨 8 倍并无视护甲！',
    formula: '普通伤害 = 攻击力 × 1.0；当 等级相同 时：伤害 = 攻击力 × 8.0 (极效破防)',
    tactics: '利用等级探查透镜确认 Boss 等级，同等级下输出甚至超越圣剑核爆。',
    lore: '看似滑稽的小鬼拳法，却暗合天地万物同频共振的破坏法则。'
  },
  {
    id: 'bluemagic-1000-needles',
    name: '千针齐发穿心刺 (1000 Needles)',
    category: 'bluemagic',
    categoryName: '青魔法学院',
    mentor: '仙人掌调查员·萨瓦',
    cost: '25 MP',
    castSpeed: '瞬发',
    element: '真实固定伤害',
    effect: '射出密集仙人掌刚针，对目标造成不多不少正好 1000 点绝对真实固定伤害，无视任何防御、减伤、属性护盾或物抗！',
    formula: '固定真实伤害 = 1000 (不可被减免、不可被回避、不可被抗性抵消)',
    tactics: '对付超高防御、金刚不坏体魔兽（如金刚龟、石像鬼）的前期杀敌神器。',
    lore: '源自荒漠深处仙人掌巨兽的本能反击，绝对精准的万针穿心。'
  },
  {
    id: 'bluemagic-aqua-breath',
    name: '深渊海啸·水之吐息 (Aqua Breath)',
    category: 'bluemagic',
    categoryName: '青魔法学院',
    mentor: '深海潜行者·阿鲁',
    cost: '38 MP',
    castSpeed: 'ATB 充能 95%',
    element: '水属性',
    effect: '从口中喷吐席卷全场的沸腾海水，对全体敌人造成大范围水属性冲击，对沙漠系与火系生物造成 4 倍特攻毁灭伤害！',
    formula: '伤害 = (智力 × 3.0 + 等级 × 12) × 特攻倍率 (沙漠生物 4.0，其他 1.0)',
    tactics: '金字塔遗迹、流沙沙漠与火之山地下城的绝对推图利器。',
    lore: '从深海奇美拉与水怪身上解析的深海吐息秘术。'
  }
]
