/**
 * 16 卷核心架构白皮书配置清单
 * 对应 news-world/new-world/ 及 news-world/agent-work/ 的完整白皮书索引。
 */

export interface WhitepaperDoc {
  volume: number
  code: string
  title: string
  category: string
  summary: string
  keyFeatures: string[]
}

export const whitepapersList: WhitepaperDoc[] = [
  {
    volume: 1,
    code: '01_WORLD_BIBLE',
    title: '世界圣经与叙事世界观 (World Bible & Narrative Design)',
    category: '叙事架构',
    summary: '奠定泰空、巴尔、第三融合世界以及虚无次元的宇宙观与三大世代历史编年史。',
    keyFeatures: ['四大始源水晶法则', '艾克斯德斯千年起源', '光之战士命运律', '虚空裂隙坍缩原理']
  },
  {
    volume: 2,
    code: '02_DUNGEON_TOPOLOGY',
    title: '全域地貌拓扑与地下城导览 (Dungeon Topology)',
    category: '空间关卡',
    summary: '涵盖 18 大核心地下城的空间逻辑、机关机关锁链、掉落矩阵及越级防线。',
    keyFeatures: ['风之神殿', '卡尔纳克逃生 10 分钟倒计时', '朗卡浮空遗迹', '双子分歧之塔物理魔法分流']
  },
  {
    volume: 3,
    code: '03_BOSS_TACTICS',
    title: '首领攻坚全书与生态大典 (Boss Tactics & Bestiary)',
    category: '首领战斗',
    summary: '全 14 大阶段式主线与隐藏首领行动序列、血量分段、属性弱点与即死防护。',
    keyFeatures: ['吉尔伽美什六战大桥死斗', '欧米茄波动炮抗性配装', '神龙海啸潮汐吸收', '新·艾克斯德斯四核心']
  },
  {
    volume: 4,
    code: '04_JOB_SYSTEM',
    title: '职业体系与转职成长 (Job System & Growth)',
    category: '角色成长',
    summary: '26 大职业矩阵、熟练度 AP 递增模型、自由人/模仿士全能力继承协议。',
    keyFeatures: ['四水晶碎片职业解锁', '副职技能装配槽位', '二刀流与乱打双持', '魔法剑附魔']
  },
  {
    volume: 5,
    code: '05_EQUIPMENT_ECONOMY',
    title: '神兵矩阵与宏观经济 (Equipment & Macro Economy)',
    category: '装备数值',
    summary: '十二封印神兵解封、七色尾巴神器兑换、五阶城邦商业贸易与物价金币平衡。',
    keyFeatures: ['石中剑与圣剑', '龙之髭水龙鞭', '七色尾巴隐士兑换', '五大商业港口贸易']
  },
  {
    volume: 6,
    code: '06_TRAVEL_VEHICLES',
    title: '多维载具与全域探索 (Travel Vehicles Matrix)',
    category: '大世界探索',
    summary: '从陆行鸟各亚种、跨海帆船、蒸汽动力船到黑隼号飞空艇与月之巨鲸的全通航定义。',
    keyFeatures: ['黄/白/黑/胖陆行鸟族群', '法丽斯龙首帆船', '火力船机房', '月之巨鲸卡门线航渡']
  },
  {
    volume: 7,
    code: '07_SIDEQUESTS_SECRETS',
    title: '十大支线、迷你游戏与秘宝 (Sidequests & Secrets)',
    category: '隐藏探索',
    summary: '莫古利网络、八大名琴试炼、蜃气楼幻村与金碟赌场迷你赛车赛鸟玩法。',
    keyFeatures: ['八大名琴大师演奏', '蜃气楼幻村隐藏入口', '孤岛斗技场试炼', '奥丁 1 分钟限时斩铁']
  },
  {
    volume: 8,
    code: '08_SYSTEM_ARCHITECTURE',
    title: '游戏系统架构与三层持久化 (System Architecture)',
    category: '系统底层',
    summary: 'Godot 4.4 状态机、ATB 战斗循环调度、三层快照自动存盘与崩溃恢复。',
    keyFeatures: ['ATB 动态蓄力管线', '本地 JSON + 二进制双重持久化', '音频总线 DSP 滤波器', '帧率平滑锁帧']
  },
  {
    volume: 9,
    code: '09_VOID_CASTLE',
    title: '虚空天体与终焉空间 (Void Castle Spec)',
    category: '终焉深渊',
    summary: '次元之隙四大阶层空间折叠、九大行星引力修正与终焉虚无核心决战机制。',
    keyFeatures: ['四阶空间折叠', '九大行星战场修正', '无之力量湮灭奇点', '大十字异常抗性']
  },
  {
    volume: 10,
    code: '10_CRYSTALS_ELEMENTS',
    title: '三十章编年史与五大元素 (Thirty Chapters & Elements)',
    category: '编年全史',
    summary: '横跨三代世界的三十章节完整流程图景与风、水、火、土、虚五元相生相克。',
    keyFeatures: ['30 章主线逐级推进', '五元克制闭环', '水晶粉碎与时空合并', '二周目真深渊']
  },
  {
    volume: 11,
    code: '11_TURN_LIMIT_SPEC',
    title: '首领宝箱回合限制与惩罚 (Turn Limit Spec)',
    category: '战斗数值',
    summary: '越级挑战的严苛回合惩罚公式与死之宣告触发线，保护开放世界探索自由度。',
    keyFeatures: ['动态回合递减公式', '越级宝箱怪自毁倒计时', '伤害衰减与防御穿透', '狂暴即死倒计时']
  },
  {
    volume: 12,
    code: '12_BATTLE_EVENTS_RPS',
    title: '即时抉择与剪刀石头布 (Battle Events & Choice RPS)',
    category: '战斗交互',
    summary: '战斗中即时弹出的弱点抉择、剪刀石头布破招对决与史莱姆百分比物理绝对闪避。',
    keyFeatures: ['即时猜拳破招 200% 暴击', '史莱姆流体物理免疫', '时魔时间停止判定', '偷袭先手优势', '受击震屏与光标逆变换防抖']
  },
  {
    volume: 13,
    code: '13_HERO_SANCTUARY',
    title: '勇者圣所庇护法与神圣绝技 (Hero Sanctuary Contract)',
    category: '导师秘传',
    summary: '圣骑士 25% 舍身庇护机制与神圣十字斩净化法则。',
    keyFeatures: ['红血舍身绝对援护', '神圣十字斩净化', '圣水药水双倍增幅', '骑士誓约光环']
  },
  {
    volume: 14,
    code: '14_MYSIDIA_ACADEMY',
    title: '米西迪亚高级魔法进修契约 (Mysidia Courses Contract)',
    category: '魔法学院',
    summary: '古代大魔道士传承的陨石召唤术、彗星连续轰击与时空停止连续行动禁术。',
    keyFeatures: ['陨石禁咒 4 连击', '时空停止 Quick 连续行动', '反射镜像折射', '全魔力过载释放']
  },
  {
    volume: 15,
    code: '15_NINJA_TEACHING',
    title: '东洋忍者遁术秘传契约 (Ninja Teaching Contract)',
    category: '忍术流派',
    summary: '影之刃首领传承的五遁水火雷卷轴、影分身绝对闪避与金蝉脱壳退避。',
    keyFeatures: ['水遁卷轴范围破盾', '影分身 2 次物理免疫', '手里剑极速投掷', '二刀流双持附魔']
  },
  {
    volume: 16,
    code: '16_TAIL_EXCHANGE',
    title: '七色尾巴兑换与神兵认证 (Tail Exchange Contract)',
    category: '神装锻造',
    summary: '隐士洞窟七色尾巴专属对应神兵认证面板、龙之髭、圣灵之冠与烈火圣剑。',
    keyFeatures: ['七色尾巴极罕掉落', '烈火圣剑炎之裁决', '苍蓝龙枪龙属贯穿', '黑金防具全防抵消']
  }
]
