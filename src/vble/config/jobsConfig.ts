/**
 * 26 大经典职业与转职成长体系配置
 * 覆盖风之水晶、水之水晶、火之水晶、土之水晶以及两大特权终极职业。
 */

export interface JobItem {
  id: string
  name: string
  crystal: 'wind' | 'water' | 'fire' | 'earth' | 'special'
  crystalName: string
  role: string
  equipTypes: string
  innateAbility: string
  signatureSkills: string[]
  masteryBonus: string
}

export const jobsList: JobItem[] = [
  // 特殊初始与终极职业
  {
    id: 'freelancer',
    name: '自由人 (Freelancer)',
    crystal: 'special',
    crystalName: '始源无暇',
    role: '万象继承者',
    equipTypes: '全武器 · 全防具',
    innateAbility: '全满级职业最高属性继承、双副职业技能槽位',
    signatureSkills: ['查探', '全力一击'],
    masteryBonus: '所有练满职业被动（忍者精通二刀流双持/白刃接箭/格挡）全自动常驻！转职后使用允许双持武器且保持盾槽为空即可生效。'
  },
  {
    id: 'mime',
    name: '模仿士 (Mime)',
    crystal: 'special',
    crystalName: '深渊沉没塔',
    role: '绝对模仿者',
    equipTypes: '轻甲 · 短剑 · 权杖',
    innateAbility: '无消耗零MP完美模仿上一位队友的行动（包括双召唤/连续禁术）',
    signatureSkills: ['模仿', '三自定义指令槽'],
    masteryBonus: '继承全部满级魔法属性，且支持忍者精通双持继承（使用允许武器并空置盾槽）。'
  },
  // 风之水晶 6 职业
  {
    id: 'knight',
    name: '骑士 (Knight)',
    crystal: 'wind',
    crystalName: '风之水晶',
    role: '重装护卫 / 绝对援护',
    equipTypes: '单手剑 · 巨剑 · 重铠 · 巨盾',
    innateAbility: '舍身守护（队友濒死自动承受伤害）、全护甲防御',
    signatureSkills: ['守护', '二刀防御', '重斩'],
    masteryBonus: '力量 +42，体质 +40；骑士精通 → 自由人／模仿师 继承持盾格挡（持合法盾牌有机会格挡敌方单体物理行动首个正伤害命中，每次敌方行动限检一次）与主动守护换位（拦截单体攻击）。'
  },
  {
    id: 'monk',
    name: '武僧 (Monk)',
    crystal: 'wind',
    crystalName: '风之水晶',
    role: '空手搏击 / 气血暴击',
    equipTypes: '空手格斗 · 拳套 · 轻道袍',
    innateAbility: '空手二连击、格挡反击',
    signatureSkills: ['气功波', '蓄力爆发', 'HP +30%'],
    masteryBonus: '力量 +50，体质 +52；武僧精通 → 自由人／模仿师 继承徒手攻击力下限与受击反击（双手空置生效，每次敌方行动最多一次）。'
  },
  {
    id: 'thief',
    name: '盗贼 (Thief)',
    crystal: 'wind',
    crystalName: '风之水晶',
    role: '极速突袭 / 战场摸金',
    equipTypes: '短剑 · 飞刀 · 潜行皮甲',
    innateAbility: '先制攻击率 +50%、奔跑加速、隐藏通道透视',
    signatureSkills: ['偷窃', '急袭抢夺', '警告警戒'],
    masteryBonus: '敏捷 +48，全职业最高行动极速'
  },
  {
    id: 'white-mage',
    name: '白魔导士 (White Mage)',
    crystal: 'wind',
    crystalName: '风之水晶',
    role: '神圣净化 / 生命祈祷',
    equipTypes: '治愈之杖 · 祭祀法袍',
    innateAbility: '白魔法 Lv 1~6 全权能释放',
    signatureSkills: ['神圣 (Holy)', '全面复活 (Arise)', '全净化'],
    masteryBonus: '精神 +45，治愈效果提升 50%'
  },
  {
    id: 'black-mage',
    name: '黑魔导士 (Black Mage)',
    crystal: 'wind',
    crystalName: '风之水晶',
    role: '元素毁灭 / 虚空核爆',
    equipTypes: '法杖 · 元素斗篷',
    innateAbility: '黑魔法 Lv 1~6 毁灭禁咒',
    signatureSkills: ['核爆 (Flare)', '三阶冰雷火风', '毒沼'],
    masteryBonus: '魔力 +47，全职业最高法术攻击'
  },
  {
    id: 'blue-mage',
    name: '青魔导士 (Blue Mage)',
    crystal: 'wind',
    crystalName: '风之水晶',
    role: '魔物仿生 / 奇迹特技',
    equipTypes: '弯刀 · 护胸甲',
    innateAbility: '学习（亲身体验魔物特技后即刻习得永久技能）',
    signatureSkills: ['白风 (全体百分比治疗)', '千针刺', '十级死宣'],
    masteryBonus: '体质 +25，魔力 +30'
  },
  // 水之水晶 5 职业
  {
    id: 'time-mage',
    name: '时空魔导士 (Time Mage)',
    crystal: 'water',
    crystalName: '水之水晶',
    role: '时间掌控 / 重力扭曲',
    equipTypes: '时空法杖 · 星象袍',
    innateAbility: '时空魔法 Lv 1~6 调控时间流速',
    signatureSkills: ['急速 (Hastega)', '陨石天降 (Meteor)', '时空停止 (Quick)'],
    masteryBonus: '敏捷 +35，魔力 +40'
  },
  {
    id: 'summoner',
    name: '召唤士 (Summoner)',
    crystal: 'water',
    crystalName: '水之水晶',
    role: '神明契约 / 广域歼灭',
    equipTypes: '召唤之笛 · 祭坛法衣',
    innateAbility: '高阶神兽召唤全矩阵契约',
    signatureSkills: ['巴哈姆特百万亿熔岩', '利维亚桑大海啸', '奥丁斩铁剑'],
    masteryBonus: '魔力 +52，全职业最高 MP 上限'
  },
  {
    id: 'mystic-knight',
    name: '魔法剑士 (Mystic Knight)',
    crystal: 'water',
    crystalName: '水之水晶',
    role: '元素附刃 / 弱点破防',
    equipTypes: '双手剑 · 重铠',
    innateAbility: '魔法剑附魔（将黑白时魔力注入剑刃，刀刀必中暴击）',
    signatureSkills: ['核爆剑 (Flare Sword)', '吸血剑', '即死附魔剑'],
    masteryBonus: '力量 +38，魔力 +34'
  },
  {
    id: 'berserker',
    name: '狂战士 (Berserker)',
    crystal: 'water',
    crystalName: '水之水晶',
    role: '绝对狂暴 / 破甲压制',
    equipTypes: '重斧 · 巨锤 · 蛮族兽皮',
    innateAbility: '常驻狂暴状态（物理攻击力 +50%，无法手动操控）',
    signatureSkills: ['重斧贯穿', '狂暴化'],
    masteryBonus: '力量 +48，体质 +46'
  },
  {
    id: 'red-mage',
    name: '红魔导士 (Red Mage)',
    crystal: 'water',
    crystalName: '水之水晶',
    role: '复合通才 / 连续魔极意',
    equipTypes: '刺剑 · 羽冠服',
    innateAbility: '双系黑白初级魔法共用',
    signatureSkills: ['连续魔 (Dualcast: 单回合连续施放两次任意魔法)'],
    masteryBonus: '全法系最终核心质变神技拥有者'
  },
  // 火之水晶 3 职业
  {
    id: 'ninja',
    name: '忍者 (Ninja)',
    crystal: 'fire',
    crystalName: '火之水晶',
    role: '二刀流双持 / 忍术投掷',
    equipTypes: '忍者刀 · 苦无 · 影行衣',
    innateAbility: '二刀流（左右手同时各装备一把独立武器）',
    signatureSkills: ['二刀流', '手里剑投掷', '五遁忍术'],
    masteryBonus: '敏捷 +50；忍者精通 → 自由人／模仿师继承双持（需使用允许双持武器并保持盾槽为空）。'
  },
  {
    id: 'beastmaster',
    name: '魔兽使 (Beastmaster)',
    crystal: 'fire',
    crystalName: '火之水晶',
    role: '魔物驯服 / 调教师',
    equipTypes: '长鞭 · 兽皮甲',
    innateAbility: '捕获残血怪物并在需要时释放毁灭级魔兽技能',
    signatureSkills: ['捕获', '操纵', '魔兽大军'],
    masteryBonus: '敏捷 +30，体质 +32'
  },
  {
    id: 'hunter',
    name: '猎人 (Hunter)',
    crystal: 'fire',
    crystalName: '火之水晶',
    role: '远程精准物理 / 鹰眼连射',
    equipTypes: '弓箭 · 弩 · 猎皮甲',
    innateAbility: '开局预备回避、对空增伤、防偷袭',
    signatureSkills: ['瞄准射击', '捕兽夹', '破翼箭', '连射'],
    masteryBonus: '敏捷 +45，力量 +38；猎人精通 → 自由人／模仿师 继承开局物理预备回避（战斗首次开局生效一次）。'
  },
  {
    id: 'geomancer',
    name: '风水士 (Geomancer)',
    crystal: 'fire',
    crystalName: '火之水晶',
    role: '大地共鸣 / 零消耗自然术',
    equipTypes: '铃铛 · 罗盘服',
    innateAbility: '落穴回避、伤害地板无效（熔岩/毒沼免疫）',
    signatureSkills: ['地形共鸣 (0 MP 随机引发地震/海啸/冰岚)', '隐形陷阱解除'],
    masteryBonus: '体质 +28，魔力 +35'
  },
  // 土之水晶 4 职业
  {
    id: 'samurai',
    name: '武士 (Samurai)',
    crystal: 'earth',
    crystalName: '土之水晶',
    role: '名刀拔刀 / 钱投大破防',
    equipTypes: '日本刀 · 大铠',
    innateAbility: '白刃接箭（高概率直接格挡落空敌人物理单体攻击）',
    signatureSkills: ['钱投 (Zeninage: 投掷金币造成全场真伤爆炸)', '居合居斩', '峰打'],
    masteryBonus: '力量 +40，敏捷 +38'
  },
  {
    id: 'dragoon',
    name: '龙骑士 (Dragoon)',
    crystal: 'earth',
    crystalName: '土之水晶',
    role: '天翔跳跃 / 龙息贯穿',
    equipTypes: '长枪 · 飞龙重铠',
    innateAbility: '跳跃（跃至云霄规避全场攻击，随后下坠造成双倍暴击）',
    signatureSkills: ['飞龙跳跃', '龙剑 (吸取HP/MP)', '龙之咆哮'],
    masteryBonus: '力量 +44，体质 +42'
  },
  {
    id: 'dancer',
    name: '舞者 (Dancer)',
    crystal: 'earth',
    crystalName: '土之水晶',
    role: '惑心战舞 / 致命剑舞',
    equipTypes: '短剑 · 舞娘艳装 · 缎带',
    innateAbility: '战舞（随机触发吸收剑舞或高额物理暴击）',
    signatureSkills: ['剑之舞 (Sword Dance: 400% 致命物理爆发)', '诱惑之舞', '谜之战舞'],
    masteryBonus: '敏捷 +42，可穿戴极稀有防具【缎带】'
  },
  {
    id: 'chemist',
    name: '药剂师 (Chemist)',
    crystal: 'earth',
    crystalName: '土之水晶',
    role: '炼金调合 / 生命奇迹',
    equipTypes: '手杖 · 药师服',
    innateAbility: '药理知识（所有恢复类药水效果直接翻倍）',
    signatureSkills: ['调合 (Mix: 两两融合超强神药)', '复活药注射', '全恢复药'],
    masteryBonus: '精神 +40，全游戏最强功能辅助'
  }
]
