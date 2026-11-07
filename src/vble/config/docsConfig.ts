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
  relatedRoute?: {
    label: string
    path: string
    icon: string
  }
}

export const whitepapersList: WhitepaperDoc[] = [
  {
    volume: 1,
    code: '01_WORLD_BIBLE',
    title: '世界圣经与叙事世界观 (World Bible & Narrative Design)',
    category: '叙事架构',
    summary: '奠定泰空、巴尔、第三融合世界以及虚无次元的宇宙观与三大世代历史编年史，含 44 节拍主线追踪矩阵。',
    keyFeatures: ['四大始源水晶法则', '艾克斯德斯千年起源', '44节拍主线追踪矩阵', '虚空裂隙坍缩原理'],
    relatedRoute: { label: '史诗剧情编年史', path: '/vble/story', icon: '📜' }
  },
  {
    volume: 2,
    code: '02_DUNGEON_TOPOLOGY',
    title: '全域地貌拓扑与地下城导览 (Dungeon Topology)',
    category: '空间关卡',
    summary: '涵盖 18 大核心地下城的空间逻辑、机关锁链、参数总表、特殊机制状态机及越级防线。',
    keyFeatures: ['18大地下城参数总表', '卡尔纳克逃生 10 分钟倒计时', '朗卡浮空遗迹', '双子分歧之塔物理魔法分流'],
    relatedRoute: { label: '地下城秘境拓扑', path: '/vble/dungeons', icon: '🏰' }
  },
  {
    volume: 3,
    code: '03_BOSS_TACTICS',
    title: '首领攻坚全书与生态大典 (Boss Tactics & Bestiary)',
    category: '首领战斗',
    summary: '全 16 大阶段式主线与隐藏首领行动序列、血量分段、属性弱点、转阶段与反击栈法则。',
    keyFeatures: ['16首领参数对账表', '吉尔伽美什六战死斗', '欧米茄波动炮抗性配装', '神龙海啸潮汐吸收'],
    relatedRoute: { label: '首领战术攻坚库', path: '/vble/bosses', icon: '👹' }
  },
  {
    volume: 4,
    code: '04_JOB_SYSTEM',
    title: '职业体系与转职成长 (Job System & Growth)',
    category: '角色成长',
    summary: '26 大职业矩阵、四水晶解锁批次、熟练度 AP 递增模型、自由人/模仿士全能力继承协议。',
    keyFeatures: ['四水晶碎片解锁批次', 'AP职业等级成长表', '二刀流与乱打双持', '自由人/模仿士继承法则'],
    relatedRoute: { label: '职业转职矩阵', path: '/vble/jobs', icon: '🛡️' }
  },
  {
    volume: 5,
    code: '05_EQUIPMENT_ECONOMY',
    title: '神兵矩阵与宏观经济 (Equipment & Macro Economy)',
    category: '装备数值',
    summary: '十二封印神兵解封、七色尾巴神器兑换、五阶城邦物价价格带、BaseGold 阶梯与掷钱公式。',
    keyFeatures: ['十二封印神兵解封', '五阶商店价格带矩阵', '回购折算与BaseGold', '钱投Gil Toss伤害公式'],
    relatedRoute: { label: '宏观经济与贸易', path: '/vble/economy', icon: '🪙' }
  },
  {
    volume: 6,
    code: '06_TRAVEL_VEHICLES',
    title: '多维载具与全域探索 (Travel Vehicles Matrix)',
    category: '大世界探索',
    summary: '从陆行鸟各亚种、跨海帆船、蒸汽动力船到黑隼号飞空艇与月之巨鲸的参数表与地形通行矩阵。',
    keyFeatures: ['载具参数与速度矩阵', '全域地形通行判定表', '乘降状态机转换协议', '月之巨鲸卡门线航渡'],
    relatedRoute: { label: '多维载具矩阵', path: '/vble/vehicles', icon: '🛸' }
  },
  {
    volume: 7,
    code: '07_SIDEQUESTS_SECRETS',
    title: '十大支线、迷你游戏与秘宝 (Sidequests & Secrets)',
    category: '隐藏探索',
    summary: '莫古利网络、八大名琴试炼、蜃气楼幻村、支线状态机与金碟赌场/斗技场数值法则。',
    keyFeatures: ['十大支线完整数据表', '支线推进状态机', '斗技场与金碟赌场公式', '奥丁 1 分钟限时斩铁'],
    relatedRoute: { label: '支线寻宝与秘闻', path: '/vble/sidequests', icon: '🧭' }
  },
  {
    volume: 8,
    code: '08_SYSTEM_ARCHITECTURE',
    title: '游戏系统架构与三层持久化 (System Architecture)',
    category: '系统底层',
    summary: 'Godot 4.x 状态机、ATB 战斗循环调度、存档 Schema 迁移链、通关评级公式与错误码规范。',
    keyFeatures: ['ATB 动态蓄力管线', '存档Schema迁移链', '通关评级计分公式', '持久化错误码与恢复'],
    relatedRoute: { label: '核心系统架构室', path: '/vble/systems', icon: '⚙️' }
  },
  {
    volume: 9,
    code: '09_VOID_CASTLE',
    title: '虚空天体与终焉空间 (Void Castle Spec)',
    category: '终焉深渊',
    summary: '次元之隙四阶段裂隙映射、23 大深渊首领参数总表、九大行星引力修正与终焉虚无核心决战。',
    keyFeatures: ['四阶裂隙空间折叠', '23深渊首领参数表', '无之力量湮灭奇点', '大十字异常抗性'],
    relatedRoute: { label: '虚空天体星象仪', path: '/vble/celestial', icon: '🪐' }
  },
  {
    volume: 10,
    code: '10_CRYSTALS_ELEMENTS',
    title: '三十章编年史与五大元素 (Thirty Chapters & Elements)',
    category: '编年全史',
    summary: '横跨三代世界的三十章节完整流程图景、地月五行倍率矩阵与九大行星战场环境修正。',
    keyFeatures: ['30章主线逐级推进', '地月五行克制倍率表', '九大行星战场修正对齐', '水晶粉碎与时空合并'],
    relatedRoute: { label: '虚空天体与元素', path: '/vble/celestial', icon: '🔮' }
  },
  {
    volume: 11,
    code: '11_TURN_LIMIT_SPEC',
    title: '首领宝箱回合限制与惩罚 (Turn Limit Spec)',
    category: '战斗数值',
    summary: '16 大首领基础回合上限表、神龙宝箱边界裁定、ATB/Quick/Jump 边界用例与死之宣告触发线。',
    keyFeatures: ['16首领回合上限总表', '神龙宝箱边界裁定', 'Quick/Jump时序边界', '狂暴即死倒计时公式'],
    relatedRoute: { label: '战斗法则与回合工坊', path: '/vble/battle-tactics', icon: '⏱️' }
  },
  {
    volume: 12,
    code: '12_BATTLE_EVENTS_RPS',
    title: '即时抉择与剪刀石头布 (Battle Events & Choice RPS)',
    category: '战斗交互',
    summary: '战斗中即时弹出的弱点抉择、剪刀石头布破招对决、史莱姆物理闪避与 2026-10-11 授权实现契约。',
    keyFeatures: ['即时猜拳破招 200% 暴击', '史莱姆流体物理免疫', '时魔时间停止判定', '受击震屏与光标逆变换防抖'],
    relatedRoute: { label: '战斗法则与猜拳工坊', path: '/vble/battle-tactics', icon: '✊' }
  },
  {
    volume: 13,
    code: '13_HERO_SANCTUARY',
    title: '勇者圣所庇护法与神圣绝技 (Hero Sanctuary Contract)',
    category: '导师秘传',
    summary: '圣骑士 25% 舍身庇护机制与神圣十字斩净化法则及实机传授契约速查附录。',
    keyFeatures: ['红血舍身绝对援护', '神圣十字斩净化契约', '圣水药水双倍增幅', '骑士誓约光环'],
    relatedRoute: { label: '四大导师秘传馆', path: '/vble/teachings', icon: '🏛️' }
  },
  {
    volume: 14,
    code: '14_MYSIDIA_ACADEMY',
    title: '米西迪亚高级魔法进修契约 (Mysidia Courses Contract)',
    category: '魔法学院',
    summary: '古代大魔道士传承的陨石召唤术、彗星连续轰击、时空停止禁术与课程交易流转边界。',
    keyFeatures: ['陨石禁咒 4 连击', '时空停止 Quick 连续行动', '课程交易原子流转', '全魔力过载释放'],
    relatedRoute: { label: '四大导师秘传馆', path: '/vble/teachings', icon: '🪄' }
  },
  {
    volume: 15,
    code: '15_NINJA_TEACHING',
    title: '东洋忍者遁术秘传契约 (Ninja Teaching Contract)',
    category: '忍术流派',
    summary: '影之刃首领传承的 v1 二刀流与 5 大永久忍术契约、影分身绝对闪避与金蝉脱壳退避。',
    keyFeatures: ['5大永久忍术契约表', '影分身 2 次物理免疫', '手里剑极速投掷', 'v1二刀流双持协议'],
    relatedRoute: { label: '四大导师秘传馆', path: '/vble/teachings', icon: '🥷' }
  },
  {
    volume: 16,
    code: '16_TAIL_EXCHANGE',
    title: '七色尾巴兑换与神兵认证 (Tail Exchange Contract)',
    category: '神装锻造',
    summary: '隐士洞窟 29 件传奇藏品速查表、v1 进度 Schema、七色尾巴兑换与原子校验规则。',
    keyFeatures: ['29件传奇神兵速查表', 'v1兑换进度Schema', '苍蓝龙枪龙属贯穿', '原子级防刷校验规则'],
    relatedRoute: { label: '神兵配装模拟器', path: '/vble/armory', icon: '⚔️' }
  },
  {
    volume: 17,
    code: '17_CROSS_WORLD_BOSSES',
    title: '跨界首领生态与全域魔物大典 (Cross-World Bosses & Bestiary Spec)',
    category: '首领生态',
    summary: '跨越次元的 14 章节 B0001-B0650 全量 650 魔物主索引、跨卷映射表与抗性/掉落数据库。',
    keyFeatures: ['B0001-B0650十四章索引', '跨次元首领抗性表', '跨卷生态映射矩阵', '掉落率与稀有素材掉率'],
    relatedRoute: { label: '全域魔物图鉴库', path: '/vble/monsters', icon: '🐉' }
  },
  {
    volume: 18,
    code: '18_MULTI_PHASE_BOSS_SKILLS',
    title: '多阶段首领转阶段与剧情连携技 (Multi-Phase Bosses & Story Skills)',
    category: '首领战斗',
    summary: '定义多血条转阶段机制、BattleAttributeDrain 属性汲取契约、转场大招演出与剧情觉醒必杀。',
    keyFeatures: ['三阶段血条锁血机制', 'BattleAttributeDrain契约', '剧情角色合体共鸣', '全屏极限技 QTE 判定'],
    relatedRoute: { label: '首领战术攻坚库', path: '/vble/bosses', icon: '🔥' }
  },
  {
    volume: 19,
    code: '19_SKELETON_REAPER_MYTH',
    title: '冥界骨王与死神系列首领/NPC 设计 (Skeleton King & Reaper Myth)',
    category: '深渊剧情',
    summary: '冥域深渊九层炼狱守护者、8 大子系统数学公式总表、不死系骨王唤魂与死神判官灵魂交易。',
    keyFeatures: ['8大子系统数学公式表', '死神天平灵魂判定', '即死抗性与圣属性极效', '冥界灵魂契约交换'],
    relatedRoute: { label: '首领战术攻坚库', path: '/vble/bosses', icon: '💀' }
  },
  {
    volume: 20,
    code: '20_NPC_INTERACTIONS',
    title: '全域 NPC 深度交互与抉择分支 (NPC Interactions & Branching)',
    category: '叙事架构',
    summary: '覆盖 10 批次 29 位核心居民台账、modal_lock_token 模态锁状态机、好感度进阶与分支抉择。',
    keyFeatures: ['10批次29居民交互台账', 'modal_lock_token状态机', '善恶倾斜分支剧情', '昼夜作息与行商动线'],
    relatedRoute: { label: '世界区域与风土志', path: '/vble/scenes', icon: '🏘️' }
  },
  {
    volume: 21,
    code: '21_SKY_CITY_TOWNS',
    title: '王城建筑群、圣墓秘境与天空之城 (Town Buildings & Sky City Spec)',
    category: '空间关卡',
    summary: '详细阐述 30 块城镇招牌台账、15 场景交付矩阵、「天空之城」反重力锚点与皇家圣墓机关。',
    keyFeatures: ['30城镇店招全量台账', '15核心场景交付矩阵', '皇家圣墓地底三层机关', '空艇停泊码头防空防线'],
    relatedRoute: { label: '世界区域与风土志', path: '/vble/scenes', icon: '🏙️' }
  },
  {
    volume: 22,
    code: '22_AMAZON_ECOLOGY',
    title: '热带雨林原始生态与远古巨兽 (Amazon Creatures & Legends)',
    category: '生态世界',
    summary: '亚马逊秘境 10 大雨林生物战斗参数表、VOL.17 图鉴映射、Curupira 守护神状态机与瘴气机制。',
    keyFeatures: ['10大雨林生物参数表', 'Curupira三阶段状态机', 'VOL.17图鉴编号映射', '瘴气沼泽净化机制'],
    relatedRoute: { label: '全域魔物图鉴库', path: '/vble/monsters', icon: '🌴' }
  },
  {
    volume: 23,
    code: '23_RUIN_METEOR_REEF',
    title: '陨星之礁与远古失落遗迹 (Ruin Meteor Reef Design)',
    category: '空间关卡',
    summary: '天外陨石星礁迷宫、四大礁区布局、勘探数据草案、着陆/返航状态流转与测试用例附录。',
    keyFeatures: ['四大星礁分区布局表', '着陆与返航流转协议', '水下遗迹氧气倒计时', '边界验收测试用例集'],
    relatedRoute: { label: '地下城秘境拓扑', path: '/vble/dungeons', icon: '☄️' }
  },
  {
    volume: 24,
    code: '24_SCENE_GENERATION',
    title: '全域场景生成与无缝时空流转 (Chapter & Scene Generation Spec)',
    category: '系统底层',
    summary: '30 章节至 44 节拍运行时映射表、场景实例化状态机、补充调色板矩阵与无缝流式加载。',
    keyFeatures: ['30章至44节拍映射表', '场景实例化状态机', '补充视觉调色板矩阵', '节点对象池零GC回收'],
    relatedRoute: { label: '世界区域与风土志', path: '/vble/scenes', icon: '🌌' }
  },
  {
    volume: 25,
    code: '25_MASTER_GAME_DESIGN_DOCUMENT',
    title: '游戏设计总纲与三大支柱 (Master Game Design Document)',
    category: '顶层总纲',
    summary: '汇聚 27 卷主目录总表、5 层架构有向无环图 (DAG)、裁决优先级法则与全域一致性台账。',
    keyFeatures: ['27卷主目录全景矩阵', '5层架构依赖DAG', '冲突裁决优先级法则', '全域数值一致性台账'],
    relatedRoute: { label: '核心系统架构室', path: '/vble/systems', icon: '🏛️' }
  },
  {
    volume: 26,
    code: '26_LATEST_DEV_SPEC',
    title: '全域研发总规程与任务分工矩阵 (Latest Dev Spec & Task Matrix)',
    category: '工程规程',
    summary: '权威规范 D01~D13 开发域、15 线程提交台账、north_cave / wind_altar_in 契约与原子写守恒。',
    keyFeatures: ['15线程提交审计台账', 'north_cave/wind_altar契约', '原子写持久化守恒', '独占可写生产范围'],
    relatedRoute: { label: '演进路线与投票', path: '/vble/roadmap', icon: '🚀' }
  },
  {
    volume: 27,
    code: '27_CROSS_WORLD_BOSSES_AND_MONSTERS_SPEC',
    title: '跨界首领生态与全域魔物全景大典 (Cross-World Bosses & Global Bestiary)',
    category: '首领生态',
    summary: '130KB 全景大典，含 14 章节 B0001-B0650 全量魔物主索引、跨卷映射、抗性序列与极罕掉落矩阵。',
    keyFeatures: ['B0001-B0650全量主索引', '跨界九大首领矩阵', '反击轴与行动序列', '极罕掉落率与素材表'],
    relatedRoute: { label: '全域魔物图鉴库', path: '/vble/monsters', icon: '🐉' }
  }
]
