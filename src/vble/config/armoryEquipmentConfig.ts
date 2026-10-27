/**
 * 全域神兵防具与职业装备权限配置中心
 * 覆盖：
 * 1. 26大职业装备许可权限矩阵 (自由人默认全穿)
 * 2. 完整装备库 (主手武器、副手盾牌/副手武器、头部、身体、饰品)
 * 3. 真实数值与特效加成 (ATK, DEF, M.ATK, M.DEF, STR, AGI, VIT, MAG, SPR, LUCK, 词缀特效)
 */

export type EquipSlotType = 'weapon' | 'offhand' | 'head' | 'body' | 'accessory'

export interface ArmoryItem {
  id: string
  name: string
  slot: EquipSlotType
  type: string
  typeName: string
  rarity: 1 | 2 | 3 | 4 | 5
  rarityText: string
  icon: string
  // 基础数值
  atk?: number
  matk?: number
  def?: number
  mdef?: number
  // 六维加成
  str?: number
  agi?: number
  vit?: number
  mag?: number
  spr?: number
  luck?: number
  hpBonus?: number
  mpBonus?: number
  critRate?: number
  evasion?: number
  meleeEvasion?: number
  // 允许装备的职业 ID (自由人 'freelancer' 默认恒定支持所有装备)
  allowedJobs: string[]
  effect: string
  specialPassives?: string[]
  origin: string
  lore: string
}

export interface JobEquipRule {
  id: string
  name: string
  role: string
  allowedWeaponTypes: string[]
  allowedArmorTypes: string[]
  canDualWield?: boolean
  description: string
}

// 职业装备权限配置表 (自由人拥有全装备特权)
export const JOB_EQUIP_RULES: Record<string, JobEquipRule> = {
  freelancer: {
    id: 'freelancer',
    name: '自由人 (Freelancer)',
    role: '万象始源',
    allowedWeaponTypes: ['all'],
    allowedArmorTypes: ['all'],
    canDualWield: true,
    description: '始源无暇特权职业，能够装备全大陆任何武器、盾牌、重铠与法袍，毫无任何限制！'
  },
  knight: {
    id: 'knight',
    name: '骑士 (Knight)',
    role: '重装护卫',
    allowedWeaponTypes: ['sword', 'greatsword', 'dagger'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor'],
    canDualWield: false,
    description: '精通单手长剑、双手巨剑与重型盾牌，身披最高防御的钢铁重铠。'
  },
  paladin: {
    id: 'paladin',
    name: '圣骑士 (Paladin)',
    role: '圣光庇护',
    allowedWeaponTypes: ['sword', 'greatsword', 'staff'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor'],
    canDualWield: false,
    description: '神圣与刚毅的化身，可搭载终极圣剑、巨神盾与重铠，抵御一切邪祟。'
  },
  dark_knight: {
    id: 'dark_knight',
    name: '暗黑骑士 (Dark Knight)',
    role: '暗月破誓',
    allowedWeaponTypes: ['greatsword', 'katana', 'sword'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor'],
    canDualWield: true,
    description: '以牺牲血量换取毁灭打击，专精漆黑大剑与双手太刀。'
  },
  dragoon: {
    id: 'dragoon',
    name: '龙骑士 (Dragoon)',
    role: '天翔跳跃',
    allowedWeaponTypes: ['spear', 'sword'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor'],
    canDualWield: false,
    description: '龙族之友，专精龙王长枪与穿刺打击，身着轻韧飞龙重铠。'
  },
  ninja: {
    id: 'ninja',
    name: '忍者 (Ninja)',
    role: '二刀流双持',
    allowedWeaponTypes: ['katana', 'dagger', 'throw'],
    allowedArmorTypes: ['light_helm', 'light_armor'],
    canDualWield: true,
    description: '天然具备【二刀流】双持两把武器特权，擅长太刀、苦无与影行轻装。'
  },
  samurai: {
    id: 'samurai',
    name: '武士 (Samurai)',
    role: '名刀居合',
    allowedWeaponTypes: ['katana', 'dagger'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor'],
    canDualWield: false,
    description: '名刀拔刀术宗师，身着坚韧大铠，可格挡落空敌人物理打击。'
  },
  monk: {
    id: 'monk',
    name: '武僧 (Monk)',
    role: '空手气血',
    allowedWeaponTypes: ['knuckle'],
    allowedArmorTypes: ['light_helm', 'light_armor'],
    canDualWield: true,
    description: '空手搏击拳术专家，不持武器时空手二连击，身穿透气轻道袍。'
  },
  thief: {
    id: 'thief',
    name: '盗贼 (Thief)',
    role: '极速摸金',
    allowedWeaponTypes: ['dagger', 'throw'],
    allowedArmorTypes: ['light_helm', 'light_armor'],
    canDualWield: false,
    description: '敏捷极高，专精轻型盗贼匕首与潜行皮甲，先制行动率极高。'
  },
  mystic_knight: {
    id: 'mystic_knight',
    name: '魔法剑士 (Mystic Knight)',
    role: '元素附魔',
    allowedWeaponTypes: ['sword', 'greatsword', 'dagger'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor', 'light_armor'],
    canDualWield: false,
    description: '将魔法注入利刃的魔剑专家，可穿戴重铠与轻甲。'
  },
  berserker: {
    id: 'berserker',
    name: '狂战士 (Berserker)',
    role: '狂暴巨力',
    allowedWeaponTypes: ['axe', 'hammer'],
    allowedArmorTypes: ['shield', 'heavy_helm', 'heavy_armor'],
    canDualWield: false,
    description: '全职业最高物理力量，手握巨斧战锤，重击破甲。'
  },
  white_mage: {
    id: 'white_mage',
    name: '白魔导士 (White Mage)',
    role: '神圣治愈',
    allowedWeaponTypes: ['staff'],
    allowedArmorTypes: ['robe_hat', 'robe'],
    canDualWield: false,
    description: '纯洁神职者，手持治愈法杖，身着高魔抗祭祀法袍。'
  },
  black_mage: {
    id: 'black_mage',
    name: '黑魔导士 (Black Mage)',
    role: '元素核轰',
    allowedWeaponTypes: ['rod', 'dagger'],
    allowedArmorTypes: ['robe_hat', 'robe'],
    canDualWield: false,
    description: '执掌毁灭三系大魔法，专精元素法杖与神秘斗篷。'
  },
  time_mage: {
    id: 'time_mage',
    name: '时空魔导士 (Time Mage)',
    role: '时间扭曲',
    allowedWeaponTypes: ['staff', 'rod', 'dagger'],
    allowedArmorTypes: ['robe_hat', 'robe'],
    canDualWield: false,
    description: '调控战场时间流速，操纵重力与陨石，佩戴星象长袍。'
  },
  summoner: {
    id: 'summoner',
    name: '召唤士 (Summoner)',
    role: '神明契约',
    allowedWeaponTypes: ['rod', 'staff', 'dagger'],
    allowedArmorTypes: ['robe_hat', 'robe'],
    canDualWield: false,
    description: '与远古召唤兽缔结契约，享有全职业最高的 MP 储备。'
  },
  ranger: {
    id: 'ranger',
    name: '游侠猎人 (Ranger)',
    role: '四连乱打',
    allowedWeaponTypes: ['bow', 'dagger'],
    allowedArmorTypes: ['light_helm', 'light_armor'],
    canDualWield: false,
    description: '后排物理狙击手，乱打特技可穿透护甲连发四箭。'
  },
  bard: {
    id: 'bard',
    name: '吟游诗人 (Bard)',
    role: '乐曲鼓舞',
    allowedWeaponTypes: ['harp', 'dagger'],
    allowedArmorTypes: ['robe_hat', 'robe', 'light_armor'],
    canDualWield: false,
    description: '弹奏竖琴吟唱英雄之歌与爱之歌，全队能力持续增强。'
  },
  mime: {
    id: 'mime',
    name: '模仿士 (Mime)',
    role: '绝对模仿',
    allowedWeaponTypes: ['dagger', 'staff', 'rod'],
    allowedArmorTypes: ['shield', 'robe_hat', 'robe', 'light_armor'],
    canDualWield: false,
    description: '沉没之塔的奇迹传承，可装备短剑、杖与法袍，随心继承三系指令。'
  }
}

// 全域装备数据池 (主手、副手、头、身、饰品)
export const ARMORY_ITEMS: ArmoryItem[] = [
  // ================= 1. 主手武器 (Weapons) =================
  {
    id: 'wp_ragnarok',
    name: '诸神之黄昏 (Ragnarok)',
    slot: 'weapon',
    type: 'greatsword',
    typeName: '终极漆黑圣剑',
    rarity: 5,
    rarityText: '★★★★★ 终焉超越神兵',
    icon: '🗡️',
    atk: 180,
    str: 10,
    agi: 10,
    vit: 10,
    mag: 10,
    spr: 10,
    luck: 10,
    critRate: 30,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dark_knight', 'mystic_knight'],
    effect: '圣/暗双属性自由共鸣；平砍 20% 概率触发【圣光核爆 (Flare)】；普通攻击无视敌方 50% 物理防御，对龙族与恶魔造成 300% 灭绝暴击。',
    specialPassives: ['圣光核爆触发', '忽视50%物防', '龙族恶魔3倍暴击'],
    origin: '次元之隙 隐藏深渊宝箱 (神龙守护)',
    lore: '黄昏降临，众神陨灭。自始源裂隙中铸造的至高大剑，流淌着星核寂灭的漆黑余烬。'
  },
  {
    id: 'wp_ragnarok_mod',
    name: '终焉诸神之黄昏·改',
    slot: 'weapon',
    type: 'greatsword',
    typeName: '暗黑毁灭巨剑',
    rarity: 5,
    rarityText: '★★★★★ 终焉超越神兵',
    icon: '⚔️',
    atk: 200,
    agi: 15,
    critRate: 35,
    allowedJobs: ['freelancer', 'dark_knight', 'knight'],
    effect: '攻击力 +200，吸血 +20%；暗黑战技伤害提升 50%；平砍 100% 附带伤害等量生命汲取，暴击触发【虚无湮灭波】全场冲击。',
    specialPassives: ['生命汲取20%', '暗黑战技+50%', '虚无湮灭波'],
    origin: '49层倒序深渊竞技场 终极大奖',
    lore: '纳哈特斩断宿命锁链的极意兵刃，剑刃每一次挥击都在吞噬敌人的魂魄以充盈自身。'
  },
  {
    id: 'wp_excalibur',
    name: '晨辉圣剑 (Excalibur)',
    slot: 'weapon',
    type: 'sword',
    typeName: '单手神圣之剑',
    rarity: 5,
    rarityText: '★★★★★ 十二救世神器',
    icon: '✨',
    atk: 170,
    str: 8,
    vit: 8,
    critRate: 20,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'mystic_knight'],
    effect: '圣属性至高神剑，全属性 +8，攻击不死系与恶魔伤害翻倍，平砍自带天翔闪光斩破甲特效。',
    specialPassives: ['圣属性攻击', '全属性+8', '恶魔不死特攻'],
    origin: '封印之城库扎 十二神器圣所',
    lore: '王者佩剑，誓约胜利之光破晓晨曦，任何黑暗在它面前皆化为飞灰。'
  },
  {
    id: 'wp_masamune',
    name: '正宗 (Masamune)',
    slot: 'weapon',
    type: 'katana',
    typeName: '传说居合名刀',
    rarity: 5,
    rarityText: '★★★★★ 传奇先制太刀',
    icon: '⚡',
    atk: 168,
    agi: 20,
    critRate: 25,
    allowedJobs: ['freelancer', 'samurai', 'ninja', 'dark_knight'],
    effect: '【战斗先制先攻特权】：装备者在任何战斗中必定开局最先行动（ATB 满格先手）；使用指令自动施放【急速 (Haste)】。',
    specialPassives: ['开局满ATB先攻', '敏捷+20', '使用附带急速'],
    origin: '月之地下溪谷 8F 祭坛守护战',
    lore: '无双铸剑名匠正宗的传世杰作，刀锋出鞘之瞬，时间宛若凝滞。'
  },
  {
    id: 'wp_murasame',
    name: '名刀 · 村雨 (Murasame)',
    slot: 'weapon',
    type: 'katana',
    typeName: '水之妖刀',
    rarity: 4,
    rarityText: '★★★★ 极品名刀',
    icon: '🌊',
    atk: 145,
    agi: 10,
    critRate: 20,
    allowedJobs: ['freelancer', 'samurai', 'ninja'],
    effect: '攻击力 +145，水属性共鸣，使用可为全员恢复 500 HP。',
    specialPassives: ['水属性', '道具使用群体回血'],
    origin: '八岐神殿·妖刀冢守关战',
    lore: '刀刃常泛露珠，斩人无血，唯留清冽水光。'
  },
  {
    id: 'wp_dragon_lance',
    name: '弑龙神枪 (Dragon Lance)',
    slot: 'weapon',
    type: 'spear',
    typeName: '双手长枪',
    rarity: 5,
    rarityText: '★★★★★ 十二救世神器',
    icon: '🔱',
    atk: 165,
    str: 12,
    critRate: 25,
    allowedJobs: ['freelancer', 'dragoon'],
    effect: '对飞龙与蛇龙系物种造成 3 倍真实特攻，跳跃技能伤害增幅 50%。',
    specialPassives: ['龙系3倍特攻', '跳跃伤害+50%'],
    origin: '49层深渊竞技场 30F Boss宝箱',
    lore: '以古龙逆鳞打磨而成的断云长枪，天生具备撕碎龙鳞的强劲贯穿力。'
  },
  {
    id: 'wp_rune_staff',
    name: '诸神之杖 (Rune Staff)',
    slot: 'weapon',
    type: 'staff',
    typeName: '大魔导师法杖',
    rarity: 5,
    rarityText: '★★★★★ 终焉超越神杖',
    icon: '🪄',
    atk: 90,
    matk: 175,
    mag: 15,
    spr: 15,
    allowedJobs: ['freelancer', 'white_mage', 'time_mage', 'mime'],
    effect: '全白魔法与时空禁术效能提升 1.5 倍；普攻消耗 5 MP 自动转化为圣属性穿甲真实伤害。',
    specialPassives: ['白时法术效果+50%', '圣属穿甲真伤'],
    origin: '孤岛斗技场 12,000 BP 终极大奖',
    lore: '铭刻着宇宙原初符文的大魔导手杖，沟通着时空两界之理。'
  },
  {
    id: 'wp_magus_rod',
    name: '元素贤者魔杖 (Magus Rod)',
    slot: 'weapon',
    type: 'rod',
    typeName: '黑魔导权杖',
    rarity: 5,
    rarityText: '★★★★★ 十二救世神器',
    icon: '🔮',
    atk: 80,
    matk: 168,
    mag: 18,
    allowedJobs: ['freelancer', 'black_mage', 'summoner', 'mime'],
    effect: '火、冰、雷三系黑魔法威力全面强化 50%，黑魔法 MP 消耗降低 25%。',
    specialPassives: ['三系黑魔威力+50%', 'MP消耗-25%'],
    origin: '封印之城库扎 神器封印石板',
    lore: '古贤者魔导院院长佩杖，聚集了自然界最暴虐的纯粹元素狂流。'
  },
  {
    id: 'wp_chicken_knife',
    name: '盗贼小刀 (Chicken Knife)',
    slot: 'weapon',
    type: 'dagger',
    typeName: '极速敏捷短刃',
    rarity: 4,
    rarityText: '★★★★ 逃跑奇迹之刃',
    icon: '🗡️',
    atk: 127,
    agi: 15,
    evasion: 15,
    allowedJobs: ['freelancer', 'thief', 'ninja', 'ranger', 'mime'],
    effect: '依据逃跑次数持续提升物理攻击力（最高可突破 127）；攻击时 25% 触发极速连击。',
    specialPassives: ['敏捷大幅提升', '回避率+15%'],
    origin: '幻影之村 隐藏地下黑市',
    lore: '看似不起眼的短刀，却在数以千计的绝境奔逃中被淬炼出了不可思议的锋芒。'
  },
  {
    id: 'wp_earth_hammer',
    name: '大地之震荡神锤 (Earth Hammer)',
    slot: 'weapon',
    type: 'hammer',
    typeName: '重装战锤',
    rarity: 5,
    rarityText: '★★★★★ 十二救世神器',
    icon: '🔨',
    atk: 155,
    str: 16,
    vit: 12,
    allowedJobs: ['freelancer', 'berserker'],
    effect: '攻击力 +155，普通攻击时有 25% 几率自动触发全屏【大地震 (Earthquake)】。',
    specialPassives: ['地震连击', '忽视目标20%护甲'],
    origin: '封印之城库扎 十二神器解封',
    lore: '矮人族始祖用山岳之心淬炼的神锤，挥动之间地动山摇。'
  },
  {
    id: 'wp_yoichi_bow',
    name: '与一之弓 (Yoichi Bow)',
    slot: 'weapon',
    type: 'bow',
    typeName: '长弓神器',
    rarity: 5,
    rarityText: '★★★★★ 十二救世神器',
    icon: '🏹',
    atk: 152,
    agi: 12,
    luck: 10,
    critRate: 35,
    allowedJobs: ['freelancer', 'ranger'],
    effect: '暴击率提升至 35%，对飞行系怪物造成 2.5 倍致命弱点贯穿伤害。',
    specialPassives: ['对空特攻', '高暴击率'],
    origin: '封印之城库扎 弓之祭坛',
    lore: '神箭手那须与一的百步穿杨宝弓，箭矢呼啸如狂风雷霆。'
  },
  {
    id: 'wp_kaiser_knuckle',
    name: '修罗皇帝拳套 (Kaiser Knuckle)',
    slot: 'weapon',
    type: 'knuckle',
    typeName: '格斗拳甲',
    rarity: 4,
    rarityText: '★★★★ 格斗宗师装备',
    icon: '🥊',
    atk: 135,
    str: 18,
    agi: 8,
    allowedJobs: ['freelancer', 'monk'],
    effect: '空手与拳击命中时附带雷属性震荡破防，力量提升 18 点。',
    specialPassives: ['雷鸣震荡', '空手破防'],
    origin: '角斗场 10 连胜优胜奖励',
    lore: '搏击宗师毕生精气灌注的精钢指套，拳风可崩碎山岩。'
  },

  // ================= 2. 副手装备 (Off-hand: 盾牌 或 极品副手) =================
  {
    id: 'sh_aegis',
    name: '泰空神盾 (Aegis Bastion)',
    slot: 'offhand',
    type: 'shield',
    typeName: '巨神之盾',
    rarity: 5,
    rarityText: '★★★★★ 救世神器盾',
    icon: '🛡️',
    def: 58,
    mdef: 35,
    vit: 15,
    evasion: 33,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'mystic_knight', 'samurai'],
    effect: '物理格挡率 33%，魔法闪避率 33%；完全免疫敌方的【石化】与【即死】魔法。',
    specialPassives: ['33%魔防回避', '石化即死免疫'],
    origin: '泰空古陵墓 守关战奖励',
    lore: '雕刻着美杜莎圣容的泰坦精钢盾，任何诅咒在其面前均会无功而返。'
  },
  {
    id: 'sh_genji',
    name: '源氏之盾 (Genji Shield)',
    slot: 'offhand',
    type: 'shield',
    typeName: '源氏重盾',
    rarity: 5,
    rarityText: '★★★★★ 传世名盾',
    icon: '🛡️',
    def: 62,
    mdef: 25,
    vit: 12,
    evasion: 35,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dragoon', 'samurai', 'berserker'],
    effect: '全域最高物理格挡率 35%，物理防御力 +62，体质 +12。',
    specialPassives: ['超高物理格挡', '体质加成'],
    origin: '吉尔伽美什 最终战偷窃 / 幻影黑市',
    lore: '东瀛源氏一族世代传承的战阵重盾，抵挡过千军万马的箭雨枪林。'
  },
  {
    id: 'sh_flame_shield',
    name: '火神抗魔盾 (Flame Shield)',
    slot: 'offhand',
    type: 'shield',
    typeName: '元素抗性盾',
    rarity: 4,
    rarityText: '★★★★ 元素吸收盾',
    icon: '🔥',
    def: 42,
    mdef: 28,
    evasion: 25,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dragoon', 'mime'],
    effect: '完全吸收敌方的火属性伤害（转化为恢复自身 HP）；惧怕冰属性。',
    specialPassives: ['火属性吸收', '25%格挡'],
    origin: '大海沟熔岩地宫 守卫宝箱',
    lore: '由火神晶核锻造的圆盾，燃烧着永不熄灭的红莲之火。'
  },
  {
    id: 'sh_ice_shield',
    name: '冰晶神盾 (Ice Shield)',
    slot: 'offhand',
    type: 'shield',
    typeName: '元素抗性盾',
    rarity: 4,
    rarityText: '★★★★ 元素吸收盾',
    icon: '❄️',
    def: 42,
    mdef: 28,
    evasion: 25,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dragoon', 'mime'],
    effect: '完全吸收敌方的冰属性伤害（转化为恢复自身 HP）；惧怕火属性。',
    specialPassives: ['冰属性吸收', '25%格挡'],
    origin: '浮空要塞 冰雪回廊宝箱',
    lore: '万年玄冰凝结的晶盾，散发着刺骨的绝对零度白雾。'
  },

  // ================= 3. 头部防具 (Headgear) =================
  {
    id: 'hd_ribbon',
    name: '神圣彩绢 · 缎带 (Ribbon)',
    slot: 'head',
    type: 'robe_hat',
    typeName: '全能防异常圣物',
    rarity: 5,
    rarityText: '★★★★★ 全系终极头饰',
    icon: '🎀',
    def: 25,
    mdef: 30,
    luck: 15,
    allowedJobs: ['all'], // 全职业通穿
    effect: '【全异常状态绝对绝对免疫】！装备者免疫石化、沉默、混乱、中毒、蛙化、狂暴、失明与即死！',
    specialPassives: ['全状态异常免疫', '全职业通用'],
    origin: '金字塔顶层 秘密机关室 / 欧米茄巢穴',
    lore: '寄宿着女神奇迹庇佑的彩色丝带，无论何种深渊诅咒都无法侵染纯洁之躯。'
  },
  {
    id: 'hd_genji_helm',
    name: '源氏之盔 (Genji Helm)',
    slot: 'head',
    type: 'heavy_helm',
    typeName: '重装武具盔',
    rarity: 5,
    rarityText: '★★★★★ 顶级重盔',
    icon: '🪖',
    def: 35,
    mdef: 22,
    str: 5,
    vit: 5,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dark_knight', 'dragoon', 'samurai', 'berserker'],
    effect: '物理防御 +35，免疫战斗中的【混乱】与【魅惑】状态，力量体质各 +5。',
    specialPassives: ['混乱魅惑免疫', '双防大幅增加'],
    origin: '吉尔伽美什 第五战战利品',
    lore: '带有双角鬼面饰物的源氏名盔，威严霸道，震慑宵小。'
  },
  {
    id: 'hd_sage_hat',
    name: '贤者之冠 (Sage Hat)',
    slot: 'head',
    type: 'robe_hat',
    typeName: '大魔导师软帽',
    rarity: 4,
    rarityText: '★★★★ 极品法帽',
    icon: '🧙‍♂️',
    def: 18,
    mdef: 28,
    mag: 12,
    spr: 12,
    mpBonus: 100,
    allowedJobs: ['freelancer', 'white_mage', 'black_mage', 'time_mage', 'summoner', 'mime'],
    effect: '魔力与精神各提升 12 点，MP 上限增加 100 点，法术暴击几率提升 10%。',
    specialPassives: ['魔力精神+12', 'MP上限+100'],
    origin: '米西迪亚大图书档案馆 3F 宝箱',
    lore: '贤者议会代代相传的睿智冠冕，戴上后心绪空灵，法术脉络跃然眼前。'
  },
  {
    id: 'hd_tiger_mask',
    name: '虎皮面具 (Tiger Mask)',
    slot: 'head',
    type: 'light_helm',
    typeName: '敏捷轻盔',
    rarity: 4,
    rarityText: '★★★★ 敏捷战盔',
    icon: '🐯',
    def: 24,
    mdef: 15,
    agi: 10,
    str: 6,
    allowedJobs: ['freelancer', 'monk', 'thief', 'ninja', 'ranger'],
    effect: '敏捷 +10，力量 +6，先攻与回避率各提升 5%。',
    specialPassives: ['敏捷大幅增加', '闪避提升'],
    origin: '砂之月都 猎人商会',
    lore: '以荒漠剑齿巨虎头颅鞣制的狩猎面罩，充斥着野兽般的狂野直觉。'
  },

  // ================= 4. 身体防具 (Body Armor) =================
  {
    id: 'bd_ragnarok_armor',
    name: '诸神之铠 (Ragnarok Armor)',
    slot: 'body',
    type: 'heavy_armor',
    typeName: '终极重装防具',
    rarity: 5,
    rarityText: '★★★★★ 终焉超越神铠',
    icon: '🛡️',
    def: 75,
    mdef: 60,
    str: 10,
    vit: 15,
    hpBonus: 1500,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dark_knight', 'dragoon'],
    effect: '常驻【永久白刃战减伤 30%】与【全异常状态绝对免疫】；受到火/水/雷/冰伤害吸收 20% 为 HP。',
    specialPassives: ['物理减伤30%', '四属性吸收20%', '生命+1500'],
    origin: '次元之隙 机械瀑布宝箱 (欧米茄巡逻区)',
    lore: '抵御诸神黄昏终焉狂澜的神圣铠甲，表面流转着永不破损的原初障壁。'
  },
  {
    id: 'bd_genji_armor',
    name: '源氏之铠 (Genji Armor)',
    slot: 'body',
    type: 'heavy_armor',
    typeName: '源氏极品大铠',
    rarity: 5,
    rarityText: '★★★★★ 顶级大铠',
    icon: '🥋',
    def: 65,
    mdef: 38,
    vit: 10,
    hpBonus: 800,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dark_knight', 'dragoon', 'samurai', 'berserker'],
    effect: '物理防御 +65，魔法防御 +38，体质 +10，免疫混乱与魅惑。',
    specialPassives: ['超高双防', '混乱免疫'],
    origin: '吉尔伽美什 最终战掉落 / 幻影村黑市',
    lore: '朱红漆染的传世武士大铠，经历过百场恶战而未曾留下半点裂纹。'
  },
  {
    id: 'bd_power_suit',
    name: 'Mark-IV 动力装甲 (Power Suit)',
    slot: 'body',
    type: 'heavy_armor',
    typeName: '高科技机械重铠',
    rarity: 4,
    rarityText: '★★★★ 工业科技重甲',
    icon: '⚙️',
    def: 58,
    mdef: 25,
    str: 12,
    hpBonus: 1000,
    allowedJobs: ['freelancer', 'knight', 'berserker', 'dark_knight'],
    effect: '物理防御 +58，最大生命值 HP +1000，力量 +12，附带防冲击液压反冲。',
    specialPassives: ['力量+12', '生命+1000', '抗击退'],
    origin: '织造机械城 泰坦合金流水线',
    lore: '装备微型涡轮与增压伺服电机的重装外骨骼铠甲，普通士兵穿上亦能力拔千钧。'
  },
  {
    id: 'bd_sage_robe',
    name: '贤者法袍 (Sage Robe)',
    slot: 'body',
    type: 'robe',
    typeName: '大魔导师织袍',
    rarity: 5,
    rarityText: '★★★★★ 终极法系法袍',
    icon: '👘',
    def: 45,
    mdef: 65,
    mag: 15,
    spr: 15,
    mpBonus: 300,
    allowedJobs: ['freelancer', 'white_mage', 'black_mage', 'time_mage', 'summoner', 'mime'],
    effect: '魔法防御力 +65，魔力与精神各 +15，全元素魔法伤害提升 20%，MP 消耗减少 20%。',
    specialPassives: ['全系法术增伤20%', '魔力精神+15', 'MP消耗-20%'],
    origin: '封印之城库扎 解封宝箱',
    lore: '以纯粹以太丝线织就的圣袍，能够自然偏折敌方的大部分攻击魔法。'
  },
  {
    id: 'bd_ninja_suit',
    name: '影行忍衣 (Black Garb)',
    slot: 'body',
    type: 'light_armor',
    typeName: '极速潜行轻装',
    rarity: 4,
    rarityText: '★★★★ 极速隐行衣',
    icon: '🥷',
    def: 48,
    mdef: 30,
    agi: 16,
    evasion: 20,
    allowedJobs: ['freelancer', 'ninja', 'thief', 'monk', 'ranger'],
    effect: '敏捷 +16，闪避率 +20%，在暗夜或洞穴战斗中自动获得【隐形】状态。',
    specialPassives: ['敏捷+16', '闪避率+20%', '先手行动概率提升'],
    origin: '影之岛·隐密之里 秘传忍具库',
    lore: '吸光织物缝制的暗杀忍者服，融入阴影中无声无息，如鬼魅难测。'
  },
  {
    id: 'bd_flame_cloak',
    name: '耐火斗篷 (Fire Cloak)',
    slot: 'body',
    type: 'robe',
    typeName: '元素抗性斗篷',
    rarity: 4,
    rarityText: '★★★★ 火伤减半神装',
    icon: '🧣',
    def: 8,
    mdef: 10,
    allowedJobs: ['all'],
    effect: '火属性伤害减半 (火伤×0.5)，常驻提供物理与魔法基础防御加成。',
    specialPassives: ['火属性伤害×0.5', '全职业通用'],
    origin: '晨辉王城酒馆看板 · Rank A 强化奇美拉讨伐专属领赏',
    lore: '以耐火火蜥蜴鳞皮与密织石棉精细缝制的防寒避火斗篷，可安然穿行于烈焰吐息之间。'
  },
  {
    id: 'bd_diamond_breastplate',
    name: '钻石胸甲 (Diamond Breastplate)',
    slot: 'body',
    type: 'heavy_armor',
    typeName: '金刚重装胸铠',
    rarity: 5,
    rarityText: '★★★★★ 雷伤减半重装',
    icon: '🛡️',
    def: 40,
    mdef: 10,
    allowedJobs: ['freelancer', 'knight', 'paladin', 'dark_knight', 'samurai', 'dragoon'],
    effect: '雷属性伤害减半 (雷伤×0.5)，提供高达 40 点强悍物理防御力。',
    specialPassives: ['雷属性伤害×0.5', '物防+40'],
    origin: '晨辉王城酒馆看板 · Rank S 死神之眼周目通关专属领赏',
    lore: '以纯度极高的深地金刚钻石打磨镶嵌的重甲胸铠，折射万千雷光，刀枪难入。'
  },

  // ================= 5. 特殊饰品 (Accessories) =================
  {
    id: 'ac_coral_ring',
    name: '珊瑚戒指 (Coral Ring)',
    slot: 'accessory',
    type: 'ring',
    typeName: '水神抗性戒指',
    rarity: 5,
    rarityText: '★★★★★ 核心逃课神器',
    icon: '💍',
    def: 5,
    mdef: 15,
    spr: 5,
    allowedJobs: ['all'],
    effect: '【完全吸收水属性大海啸】！神龙开场全屏死海啸时，装备该饰品者不仅不死亡，反而瞬间满血！',
    specialPassives: ['水属性绝对吸收', '神龙海啸逃课'],
    origin: '海角镇 人鱼长老馈赠 / 幻影村',
    lore: '蕴含深海海神祝福的粉红珊瑚指环，任何巨浪狂涛触及其微光皆归于平静。'
  },
  {
    id: 'ac_flame_ring',
    name: '火焰戒指 (Flame Ring)',
    slot: 'accessory',
    type: 'ring',
    typeName: '火神抗性戒指',
    rarity: 5,
    rarityText: '★★★★★ 核心逃课神器',
    icon: '🔥',
    def: 5,
    mdef: 15,
    str: 5,
    allowedJobs: ['all'],
    effect: '【完全吸收火属性核融爆发】！欧米茄原子射线或巴哈姆特百万亿熔岩击中时，转化为等额生命值治疗。',
    specialPassives: ['火属性绝对吸收', '核融爆破免疫'],
    origin: '大海沟深处 宝箱 / 幻影村',
    lore: '内嵌远古火精核心的指环，将焚尽一切的炼狱烈火化作舒缓温热的滋养。'
  },
  {
    id: 'ac_hermes_shoes',
    name: '赫尔墨斯之靴 (Hermes Boots)',
    slot: 'accessory',
    type: 'boots',
    typeName: '神速之靴',
    rarity: 5,
    rarityText: '★★★★★ 永久急速神靴',
    icon: '👢',
    agi: 15,
    evasion: 15,
    allowedJobs: ['all'],
    effect: '战斗中【常驻自动急速 Auto-Haste】！ATB 行动条充能速度翻倍，无法被驱散清除。',
    specialPassives: ['常驻Auto-Haste', 'ATB充能速度翻倍'],
    origin: '49层深渊竞技场 20F Boss宝箱',
    lore: '神使赫尔墨斯的飞天羽靴，佩戴者步履如风，出招迅捷如电。'
  },
  {
    id: 'ac_reflect_ring',
    name: '反射指环 (Reflect Ring)',
    slot: 'accessory',
    type: 'ring',
    typeName: '魔反圣戒',
    rarity: 5,
    rarityText: '★★★★★ 永久反射神饰',
    icon: '💎',
    mdef: 25,
    allowedJobs: ['all'],
    effect: '战斗中【常驻自动反射 Auto-Reflect】！将敌方施加在自身的一切单体攻击魔法反弹回敌方阵营。',
    specialPassives: ['常驻Auto-Reflect', '单体魔法反弹'],
    origin: '幻影之村 顶级黑市',
    lore: '表面镀有水晶棱镜的秘宝，能够毫无损耗地将敌方的破坏法术原路奉还。'
  },
  {
    id: 'ac_giant_gauntlet',
    name: '巨人之护腕 (Giant Gauntlet)',
    slot: 'accessory',
    type: 'gauntlet',
    typeName: '蛮力重装护腕',
    rarity: 4,
    rarityText: '★★★★ 力量增幅饰品',
    icon: '🧤',
    str: 20,
    hpBonus: 1000,
    allowedJobs: ['all'],
    effect: '物理力量 STR 强行提升 20 点，最大生命值 HP 增益 1000 点，平砍伤害增幅 15%。',
    specialPassives: ['力量+20', 'HP+1000', '平砍增幅15%'],
    origin: '龙栖岭 远古龙骨宝箱',
    lore: '泰坦巨人遗留的重型腕甲，装备后周身肌肉骨骼宛如精钢铸就。'
  },
  {
    id: 'ac_crystal_orb',
    name: '始源水晶宝珠 (Crystal Orb)',
    slot: 'accessory',
    type: 'orb',
    typeName: '秘法法力神珠',
    rarity: 4,
    rarityText: '★★★★ 魔力增幅饰品',
    icon: '🔮',
    mag: 20,
    mpBonus: 500,
    allowedJobs: ['all'],
    effect: '法术智力 MAG 提升 20 点，最大魔力值 MP 增益 500 点，魔法暴击率提升 15%。',
    specialPassives: ['魔力+20', 'MP+500', '法术暴击+15%'],
    origin: '米西迪亚 古代大图书馆秘所',
    lore: '始源水晶脱落的纯净泪珠，其中蕴藏着几乎无穷无尽的纯净魔力洪流。'
  },
  {
    id: 'ac_protect_ring',
    name: '护盾指环 (Protect Ring)',
    slot: 'accessory',
    type: 'ring',
    typeName: '守护光环指环',
    rarity: 4,
    rarityText: '★★★★ 开场常驻护盾',
    icon: '💍',
    def: 8,
    allowedJobs: ['all'],
    effect: '开场自动获得【护盾 (Protect)】减伤状态，物理防御力提升 8 点。不具备魔法反射效果。',
    specialPassives: ['开局常驻护盾 (Protect)', '物理防御+8'],
    origin: '晨辉王城酒馆看板 · Rank A 强化奇美拉讨伐专属领赏',
    lore: '刻印有古骑士王守护卢恩符文的银铸指环，受到物理猛攻时自动构筑光能护壁。'
  },
  {
    id: 'ac_thief_glove',
    name: '盗贼小手 (Thief Glove)',
    slot: 'accessory',
    type: 'glove',
    typeName: '迅捷神盗手套',
    rarity: 5,
    rarityText: '★★★★★ 速度偷取圣物',
    icon: '🧤',
    agi: 4,
    luck: 6,
    allowedJobs: ['all'],
    effect: '敏捷 AGI 提升 4 点，幸运 LUCK 提升 6 点，大幅提高盗贼偷取稀有宝物的成功概率。',
    specialPassives: ['敏捷+4', '幸运+6', '高阶盗取强化'],
    origin: '晨辉王城酒馆看板 · Rank S 死神之眼周目通关专属领赏',
    lore: '由传奇盗贼大师传承的薄如蝉翼的皮质手套，赋予佩戴者穿花拂柳般的极致指法。'
  }
]

// 检查某个职业是否可以装备某件物品
export function canJobEquipItem(jobId: string, item: ArmoryItem): boolean {
  // 1. 自由人可以装备全域所有装备 (用户核心需求)
  if (jobId === 'freelancer') return true

  // 2. 全职业通用装备 (如缎带 Ribbon、戒指等)
  if (item.allowedJobs.includes('all')) return true

  // 3. 物品明确允许该职业
  if (item.allowedJobs.includes(jobId)) return true

  // 4. 根据职业规则匹配类别
  const rule = JOB_EQUIP_RULES[jobId]
  if (!rule) return false

  if (item.slot === 'weapon') {
    if (rule.allowedWeaponTypes.includes('all')) return true
    return rule.allowedWeaponTypes.includes(item.type)
  }

  if (item.slot === 'offhand' || item.slot === 'head' || item.slot === 'body') {
    if (rule.allowedArmorTypes.includes('all')) return true
    return rule.allowedArmorTypes.includes(item.type)
  }

  if (item.slot === 'accessory') {
    return true
  }

  return false
}
