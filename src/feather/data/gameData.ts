import type { ChapterInfo, HeroClass, BossInfo } from '../types/game'

export const HERO_CLASSES: HeroClass[] = [
  {
    id: 'windrunner',
    name: '风行者',
    role: '高机动 / 近距离突进',
    desc: '苍鹞骑士团王牌侦察机体，擅长利用高机动贴身擦弹爆发，拥有最迅捷的规避能力。',
    mainWeapon: '扇形散射风刃（Lv1~Lv5 弹道由 3 向扩至 7 向穿透风刃）',
    subWeapon: '高速切割回旋镖',
    activeSkill1: '疾风冲刺（瞬间向摇杆方向冲刺，期间获得 0.35s 完全无敌并擦弹）',
    activeSkill2: '风之涡流（在前方制造小型风压吸引弹幕并转化为护盾能量）',
    overload: '千刃风暴：全机身暴风狂啸，释放 360° 无死角螺旋风暴，清除全屏常规弹幕！',
    drone: '猎鹰僚机：跟随射击并自动拾取全屏云晶',
    speed: 95,
    armor: 65,
    firepower: 88,
    color: '#06b6d4',
    avatar: '🌪️'
  },
  {
    id: 'ironclad',
    name: '铁壁炮手',
    role: '重火力 / 坚甲生存',
    desc: '以重型黄铜铆接装甲打造的空中堡垒，搭载双联加农炮，适合稳健压制敌人。',
    mainWeapon: '双联重型加农（爆裂范围伤害，对重甲与首领弱点有破甲增益）',
    subWeapon: '对空自导飞弹巢',
    activeSkill1: '蒸汽护壁（机体前方展开高压蒸汽防盾，强行格挡吸收前方所有实弹）',
    activeSkill2: '过载散热（短时间提升 50% 射速与暴击率，随后冷却 4s）',
    overload: '攻城巨炮：蓄力贯穿全屏的高能热能光柱，持续 3.5s 融化行经的一切目标！',
    drone: '护卫僚机：在前方环绕旋转，拦截吸收敌方普通子弹',
    speed: 60,
    armor: 98,
    firepower: 92,
    color: '#f97316',
    avatar: '🛡️'
  },
  {
    id: 'arcanist',
    name: '秘术师',
    role: '追踪弹幕 / 元素掌控',
    desc: '神族遗迹以太核心驱动，操纵虹彩能量弹与追踪魔弹，轻松清理全屏杂兵。',
    mainWeapon: '自动追踪以太飞弹（射出智能弧线光弹，自动寻找弱点直击）',
    subWeapon: '虹辉棱镜射线',
    activeSkill1: '元素切换（在烈火灼烧、极冰缓速、金雷麻痹三种附魔间循环）',
    activeSkill2: '以太跃迁（向后微距传送并留下诱饵镜像，吸引敌人攻击）',
    overload: '星辉陨落：召唤来自穹顶星海的七彩星流雨，全屏无差别毁灭性轰炸！',
    drone: '灵珠僚机：发射追踪连锁闪电打击多目标',
    speed: 75,
    armor: 70,
    firepower: 95,
    color: '#a855f7',
    avatar: '🔮'
  },
  {
    id: 'artificer',
    name: '机巧师',
    role: '机械召唤 / 陷阱控场',
    desc: '工坊大师霍恩的得力门徒机体，部署自动化哨戒炮塔与蜂群自爆无人机。',
    mainWeapon: '中速连射穿甲钉枪（直线密集团队定点穿刺）',
    subWeapon: '高爆机械雷',
    activeSkill1: '部署哨戒浮游炮（在原地固定一台自动机枪塔，持续 8s）',
    activeSkill2: '电磁陷阱网（投掷减速电网，延缓进入网格的敌机与弹幕）',
    overload: '机械狂潮：一次性释放 8 架自爆蜂鸟无人机，自动锁定 Boss 要害连续殉爆！',
    drone: '维修工蜂：每 10 秒自动为本机修补 1 格护盾',
    speed: 80,
    armor: 78,
    firepower: 86,
    color: '#eab308',
    avatar: '⚙️'
  }
]

export const CHAPTERS_DATA: ChapterInfo[] = [
  {
    id: 1,
    name: '第 1 章 · 赤霞港',
    color: '#ef4444',
    colorName: '🟥 赤色',
    theme: '空贼与烈焰朝霞',
    subTheme: '苍鹞初鸣，边境起航',
    levelRange: '1-1 ~ 1-6',
    recommendLevel: 'Lv1 ~ Lv6',
    boss: '赤鳍巨鲸（空天巨舰）',
    levels: [
      { code: '1-1', name: '赤钟初鸣', type: 'normal', recommendLevel: 'Lv1', target: '全歼空贼先锋巡逻队', drops: '云晶×120、铜制齿轮×2', features: '基础横版飞行射击教程，擦弹系统演示' },
      { code: '1-2', name: '吊塔迷阵', type: 'normal', recommendLevel: 'Lv2', target: '穿越港口高耸起重机械群', drops: '云晶×180、轻型装甲片', features: '狭窄吊臂地形避障，中速实弹与机枪扫射' },
      { code: '1-3', name: '赤帆集市', type: 'elite', recommendLevel: 'Lv3', target: '剿灭空贼黑市武装商队', boss: '赤帆护卫舰', drops: '云晶×240、风行者副武器·切割回旋镖', features: '精英小Boss登场，护盾与僚机系统实战' },
      { code: '1-4', name: '赤灯塔夜袭', type: 'normal', recommendLevel: 'Lv4', target: '夜航规避探照灯强光封锁', drops: '云晶×300、工坊零件×5', features: '探照灯夜战机制，光照区内受击伤害翻倍' },
      { code: '1-5', name: '赤颚船坞', type: 'elite', recommendLevel: 'Lv5', target: '破坏停泊中的巨型装甲龙骨', boss: '双子炮艇·赤颚', drops: '云晶×380、强化合金×3', features: '多重弱点部件破坏，解锁霍恩工坊基础升级' },
      { code: '1-6', name: '赤鳍巨鲸·主Boss关', type: 'boss', recommendLevel: 'Lv6', target: '击破渊蚀空天旗舰【赤鳍巨鲸】', boss: '赤鳍巨鲸（全三阶段）', drops: '🟥 赤之虹棱（首枚）、巨鲸重装引擎、首通天赋点×1', features: '首章史诗Boss战！主炮激光、侧舷散射炮、渊蚀突变狂暴' }
    ]
  },
  {
    id: 2,
    name: '第 2 章 · 橙焰熔炉',
    color: '#f97316',
    colorName: '🟧 橙色',
    theme: '火山兵工厂',
    subTheme: '烈火精炼，重工深渊',
    levelRange: '2-1 ~ 2-6',
    recommendLevel: 'Lv6 ~ Lv12',
    boss: '熔炉巨像（锻铸古代机兵）',
    levels: [
      { code: '2-1', name: '灰烬航线', type: 'normal', recommendLevel: 'Lv7', target: '穿越火山灰暴风云层', drops: '云晶×420、耐热涂层', features: '高温环境过热机制，机体散热槽管理' },
      { code: '2-2', name: '炉渣矿坑', type: 'normal', recommendLevel: 'Lv8', target: '清理矿井浮游挖掘机群', drops: '云晶×480、硫磺晶簇', features: '下落熔岩落石与反弹弹幕' },
      { code: '2-3', name: '冲压流水线', type: 'elite', recommendLevel: 'Lv9', target: '突破连续液压重锤阻拦', boss: '铁砧监工', drops: '云晶×550、铁壁炮手副武器·飞弹巢', features: '节奏型机关关卡，巨型冲压机封路' },
      { code: '2-4', name: '炼魂高炉', type: 'normal', recommendLevel: 'Lv10', target: '切断高炉核心能量输出管道', drops: '云晶×620、烈焰燃核', features: '橙色灼烧弹幕，命中会持续灼伤扣除护盾' },
      { code: '2-5', name: '渊炉兵工厂', type: 'elite', recommendLevel: 'Lv11', target: '营救霍恩大师并摧毁自走防线', boss: '装甲战车·裂地者', drops: '云晶×700、高级工坊图纸', features: '解救霍恩剧情关，正式解锁主城装备工坊' },
      { code: '2-6', name: '熔炉巨像·主Boss关', type: 'boss', recommendLevel: 'Lv12', target: '粉碎古代锻造泰坦【熔炉巨像】', boss: '熔炉巨像（四臂机械神）', drops: '🟧 橙之虹棱、烈焰熔炉装甲、首通天赋点×1', features: '破坏左臂铁锤与右臂火炮，核心超载全屏烈焰弹幕' }
    ]
  },
  {
    id: 3,
    name: '第 3 章 · 金雷云原',
    color: '#eab308',
    colorName: '🟨 黄色',
    theme: '雷暴与琥珀沙海',
    subTheme: '风驰电掣，沙暴天隙',
    levelRange: '3-1 ~ 3-6',
    recommendLevel: 'Lv12 ~ Lv18',
    boss: '双子雷龙（金极与苍极）',
    levels: [
      { code: '3-1', name: '风暴前线', type: 'normal', recommendLevel: 'Lv13', target: '突入高压积雨云层边缘', drops: '云晶×800、雷击电容', features: '强对流侧风干扰操控，雷击预警闪避' },
      { code: '3-2', name: '逆风回廊', type: 'normal', recommendLevel: 'Lv14', target: '顶风逆飞摧毁风力防御基座', drops: '云晶×880、聚风风轮', features: '强力逆风卷轴推力，高机动擦弹突破' },
      { code: '3-3', name: '琥珀沙海', type: 'elite', recommendLevel: 'Lv15', target: '击溃沙海潜浮巡洋飞艇', boss: '沙海巨蝎艇', drops: '云晶×960、秘术师副武器·棱镜射线', features: '悬浮琥珀矿沙遮蔽视线，潜地式敌人偷袭' },
      { code: '3-4', name: '龙卷之眼', type: 'normal', recommendLevel: 'Lv16', target: '在风眼风壁间维持航向', drops: '云晶×1050、避雷金针', features: '旋转圆周弹幕与气旋涡流' },
      { code: '3-5', name: '金雷祭坛', type: 'elite', recommendLevel: 'Lv17', target: '夺取神族先民引雷避雷针', boss: '雷霆祭司长', drops: '云晶×1150、远古蓄电池', features: '雷球连线电网，封锁走位路线' },
      { code: '3-6', name: '双子雷龙·主Boss关', type: 'boss', recommendLevel: 'Lv18', target: '击坠共生双翼【双子雷龙】', boss: '双子雷龙（金极阳龙 / 苍极阴龙）', drops: '🟨 黄之虹棱、金雷风暴饰品、首通天赋点×1', features: '双Boss同台交替掩护，双极雷电交织全屏螺旋网' }
    ]
  },
  {
    id: 4,
    name: '第 4 章 · 翠雾森屿',
    color: '#10b981',
    colorName: '🟩 绿色',
    theme: '浮空森林与菌窟',
    subTheme: '生命繁衍，腐殖剧毒',
    levelRange: '4-1 ~ 4-6',
    recommendLevel: 'Lv18 ~ Lv24',
    boss: '翠森母树（神圣古木心）',
    levels: [
      { code: '4-1', name: '翠雾林缘', type: 'normal', recommendLevel: 'Lv19', target: '探索常青浮空群岛外围', drops: '云晶×1250、神圣树脂', features: '翠绿浓雾遮蔽视野，藤蔓动态生长障碍' },
      { code: '4-2', name: '垂根峡道', type: 'normal', recommendLevel: 'Lv20', target: '在万丈气生根藤间穿梭', drops: '云晶×1360、叶脉翼膜', features: '可破坏的木质掩体与反弹孢子弹' },
      { code: '4-3', name: '荆棘蜂巢', type: 'elite', recommendLevel: 'Lv21', target: '捣毁寄生剧毒飞蜂中枢', boss: '女皇兵蜂', drops: '云晶×1480、机巧师副武器·高爆机械雷', features: '高密度轻型高速蜂群集群冲撞' },
      { code: '4-4', name: '浮空树冠', type: 'normal', recommendLevel: 'Lv22', target: '盘旋攀升突破多层巨树冠', drops: '云晶×1600、绿翡翠核心', features: '环形环绕卷轴与旋风上升气流' },
      { code: '4-5', name: '枯腐菌窟', type: 'elite', recommendLevel: 'Lv23', target: '营救药剂师莉瑟并解毒', boss: '渊腐孢子囊', drops: '云晶×1750、解锁莉瑟神秘商店', features: '毒性沼气持续损伤护盾，解救莉瑟解锁云晶商城' },
      { code: '4-6', name: '翠森母树·主Boss关', type: 'boss', recommendLevel: 'Lv24', target: '净化被渊蚀感染的【翠森母树】', boss: '翠森母树（四方神木之灵）', drops: '🟩 绿之虹棱、翡翠再生饰品、首通天赋点×1', features: '三阶段净化战！由外层木铠、花粉暴风至母树核心' }
    ]
  },
  {
    id: 5,
    name: '第 5 章 · 青霜冰穹',
    color: '#06b6d4',
    colorName: '🩵 青色',
    theme: '冰晶与极光',
    subTheme: '绝对零度，镜面反射',
    levelRange: '5-1 ~ 5-6',
    recommendLevel: 'Lv24 ~ Lv30',
    boss: '寒霜巨龙（极光冰川霸主）',
    levels: [
      { code: '5-1', name: '极光浮冰', type: 'normal', recommendLevel: 'Lv25', target: '穿越极光带下浮冰群', drops: '云晶×1900、冰河晶片', features: '青色冻结弹幕，命中使战机移速降低 40%' },
      { code: '5-2', name: '裂谷冰瀑', type: 'normal', recommendLevel: 'Lv26', target: '纵向避开倒悬冰锥轰塌', drops: '云晶×2050、凝霜冰核', features: '大面积冰柱下坠破坏，考验纵向规避' },
      { code: '5-3', name: '镜面回廊', type: 'elite', recommendLevel: 'Lv27', target: '识破多重冰晶反光假象', boss: '极光幻影机', drops: '云晶×2200、解锁第三职业：秘术师', features: '反射激光镜面，子弹经冰镜折射反弹' },
      { code: '5-4', name: '绝对零度峰', type: 'normal', recommendLevel: 'Lv28', target: '迎着暴风雪登上极寒峰顶', drops: '云晶×2400、恒温导热油', features: '冰冻风暴吹拂，停滞过久战机将结冰失速' },
      { code: '5-5', name: '渊冰封印', type: 'elite', recommendLevel: 'Lv29', target: '破除被渊蚀侵染的千年冰棺', boss: '堕落冰霜守卫', drops: '云晶×2600、极地钛合金', features: '渊蚀与极寒双重弹幕，高频精准擦弹需求' },
      { code: '5-6', name: '寒霜巨龙·主Boss关', type: 'boss', recommendLevel: 'Lv30', target: '讨伐盘踞极光王座的【寒霜巨龙】', boss: '寒霜巨龙（极冰龙王）', drops: '🩵 青之虹棱、极光冰霜羽翼、首通天赋点×1', features: '绝对零度吐息贯穿屏幕，极光冰晶棱镜全向折射' }
    ]
  },
  {
    id: 6,
    name: '第 6 章 · 蔚蓝沉城',
    color: '#3b82f6',
    colorName: '🔵 蓝色',
    theme: '云下神族古城',
    subTheme: '倒悬古文明，时空潮汐',
    levelRange: '6-1 ~ 6-6',
    recommendLevel: 'Lv30 ~ Lv36',
    boss: '沉城守护者（时钟机关神祇）',
    levels: [
      { code: '6-1', name: '云渊坠降', type: 'normal', recommendLevel: 'Lv31', target: '下潜至云海底部未知世界', drops: '云晶×2850、深渊浮标', features: '纵向向下卷轴模式！失重与强力下坠气流' },
      { code: '6-2', name: '倒悬尖塔', type: 'normal', recommendLevel: 'Lv32', target: '探索反重力神族倒悬神殿', drops: '云晶×3100、反重力石', features: '重力反转区域，操作上下反向体验' },
      { code: '6-3', name: '水银阶梯', type: 'elite', recommendLevel: 'Lv33', target: '顺着液态水银瀑布推进', boss: '水银魔像', drops: '云晶×3400、时空齿轮', features: '流体阻力与穿透弹药减衰' },
      { code: '6-4', name: '始源档案室', type: 'normal', recommendLevel: 'Lv34', target: '阅读千年前神族预言石板', drops: '云晶×3700、先民记忆体', features: '揭示无色之源真相的剧情关键关卡' },
      { code: '6-5', name: '潮汐中枢', type: 'elite', recommendLevel: 'Lv35', target: '重启以太重力泵站', boss: '潮汐枢机主教', drops: '云晶×4000、神族核心模组', features: '周期性引力脉冲，吸引或推开玩家与子弹' },
      { code: '6-6', name: '沉城守护者·主Boss关', type: 'boss', recommendLevel: 'Lv36', target: '击败神族古老试炼代行者【守护者】', boss: '沉城守护者（时空钟摆泰坦）', drops: '🔵 蓝之虹棱、始源时空引擎、首通天赋点×1', features: '时间减速与时空倒流机制！弹幕瞬间暂停后爆发' }
    ]
  },
  {
    id: 7,
    name: '第 7 章 · 紫渊深层',
    color: '#a855f7',
    colorName: '🟪 紫色',
    theme: '魔族本土与渊蚀巢穴',
    subTheme: '紫裔悲歌，深渊裂隙',
    levelRange: '7-1 ~ 7-6',
    recommendLevel: 'Lv36 ~ Lv42',
    boss: '渊蚀主宰（紫裔大君）',
    levels: [
      { code: '7-1', name: '虚空断崖', type: 'normal', recommendLevel: 'Lv37', target: '深入云海最深处的无光虚空', drops: '云晶×4400、深渊精魄', features: '全图大量渊蚀弹幕登场，无法抵消与吸收' },
      { code: '7-2', name: '蚀光回廊', type: 'normal', recommendLevel: 'Lv38', target: '突围被腐蚀退色的黑色长廊', drops: '云晶×4800、褪色之泪', features: '环境颜色褪成灰白黑，视觉干扰与陷阱' },
      { code: '7-3', name: '渊魂孵化池', type: 'elite', recommendLevel: 'Lv39', target: '炸毁腐化先民侍从的卵胞', boss: '母虫·奈瑟斯', drops: '云晶×5200、解锁第四职业：机巧师', features: '无限分裂的深渊异形，必须速战速决' },
      { code: '7-4', name: '逆理裂隙', type: 'normal', recommendLevel: 'Lv40', target: '穿越维度扭曲的时空裂痕', drops: '云晶×5700、混沌碎块', features: '空间折叠与弹幕从屏幕边缘随机传送' },
      { code: '7-5', name: '终焉门扉', type: 'elite', recommendLevel: 'Lv41', target: '击溃守护魔宫大门的深渊骑士团', boss: '渊蚀四骑士', drops: '云晶×6200、魔王敕令碎片', features: '四名轮番登场的精锐Boss连携技' },
      { code: '7-6', name: '渊蚀主宰·主Boss关', type: 'boss', recommendLevel: 'Lv42', target: '击败昔日紫裔神侍【渊蚀主宰】', boss: '渊蚀主宰（堕天紫翼大君）', drops: '🟪 紫之虹棱、紫渊幽火长袍、首通天赋点×1', features: '七虹最后一块拼图！揭示无色之源破封的终极阴谋' }
    ]
  },
  {
    id: 8,
    name: '第 8 章 · 虹上之天',
    color: '#ec4899',
    colorName: '⬜ 虹上之天',
    theme: '星穹神座·最终章',
    subTheme: '七棱归一，创世决战',
    levelRange: '8-1 ~ 8-6',
    recommendLevel: 'Lv42 ~ Lv50',
    boss: '虚冕·诺克提斯（无色之源本体）',
    levels: [
      { code: '8-1', name: '天梯飞升', type: 'normal', recommendLevel: 'Lv43', target: '七色彩虹化作登天长阶', drops: '云晶×6800、虹光余辉', features: '虹光神圣领域，玩家超载充能速度提升 100%' },
      { code: '8-2', name: '棱光回廊', type: 'normal', recommendLevel: 'Lv44', target: '穿行于七重光谱折射走廊', drops: '云晶×7400、纯净棱晶', features: '全光谱综合弹幕考验，轮番应对各元素状态' },
      { code: '8-3', name: '七色共鸣之殿', type: 'elite', recommendLevel: 'Lv45', target: '激活神族先民遗留的七虹共鸣座', boss: '神座守门人', drops: '云晶×8000、七彩神核', features: '根据周围光晕切换武器颜色破解护盾' },
      { code: '8-4', name: '虚妄镜像', type: 'normal', recommendLevel: 'Lv46', target: '战胜内心恐惧投射的自身幻影', drops: '云晶×8700、心象之镜', features: '镜像战机复制玩家所有招式与主炮形态' },
      { code: '8-5', name: '星穹神座前哨', type: 'elite', recommendLevel: 'Lv47', target: '突破无色之源的吸积盘防线', boss: '虚空吞噬者', drops: '云晶×9500、终焉之羽', features: '全屏范围无色黑洞引力，吸扯所有战机与弹幕' },
      { code: '8-6', name: '虚冕·诺克提斯·终局决战', type: 'boss', recommendLevel: 'Lv50', target: '彻底消灭吞噬一切颜色的【无色之源】', boss: '虚冕·诺克提斯（全四阶段本体）', drops: '🏆 游戏一周目通关！解锁二周目困难模式与全图鉴特权', features: '终极绝景大战！七虹合一、全屏光刃、三族英灵助战！' }
    ]
  }
]

export const BOSS_LIST: BossInfo[] = [
  { name: '赤鳍巨鲸', chapter: '第 1 章 · 赤', code: '1-6', type: '空天巨舰', bulletType: '赤色爆裂高爆弹 + 舰首穿透热线', feature: '体积庞大拥有多重副炮部件，受击后触发渊蚀突变狂暴阶段', drop: '🟥 赤之虹棱、巨鲸重装引擎、首通天赋点' },
  { name: '熔炉巨像', chapter: '第 2 章 · 橙', code: '2-6', type: '泰坦机兵', bulletType: '橙焰灼烧落石 + 环形液压冲击波', feature: '左臂铁锤砸地引发纵向震波，右臂火炮进行全屏高温弹幕覆盖', drop: '🟧 橙之虹棱、烈焰熔炉装甲、首通天赋点' },
  { name: '双子雷龙', chapter: '第 3 章 · 黄', code: '3-6', type: '飞龙双偶', bulletType: '金阳雷球 + 苍阴雷矢 + 连线电网', feature: '双 Boss 互为掩护，一架下潜蓄力时另一架高空俯冲，需平衡血量', drop: '🟨 黄之虹棱、金雷风暴饰品、首通天赋点' },
  { name: '翠森母树', chapter: '第 4 章 · 绿', code: '4-6', type: '远古神木', bulletType: '寄生孢子弹 + 荆棘缠绕风暴', feature: '全屏动态藤蔓掩体，母树核心释放吸取护盾的花粉风暴', drop: '🟩 绿之虹棱、翡翠再生饰品、首通天赋点' },
  { name: '寒霜巨龙', chapter: '第 5 章 · 青', code: '5-6', type: '极冰龙王', bulletType: '绝对零度霜息 + 极光折射棱晶弹', feature: '子弹命中地面产生冰墙阻挡移动，极光棱镜使弹道成倍增殖', drop: '🩵 青之虹棱、极光冰霜羽翼、首通天赋点' },
  { name: '沉城守护者', chapter: '第 6 章 · 蓝', code: '6-6', type: '时空神祇', bulletType: '时针光标引爆 + 减速重力水银泡', feature: '拥有让屏幕弹幕静止随后瞬间加速的时空操控战术', drop: '🔵 蓝之虹棱、始源时空引擎、首通天赋点' },
  { name: '渊蚀主宰', chapter: '第 7 章 · 紫', code: '7-6', type: '堕天紫裔', bulletType: '不可消除渊蚀暗弹 + 噬魂裂隙', feature: '命中玩家会叠加褪色 DeBuff，屏幕逐渐变成灰黑色黑白死寂', drop: '🟪 紫之虹棱、紫渊幽火长袍、首通天赋点' },
  { name: '虚冕·诺克提斯', chapter: '第 8 章 · 虹', code: '8-6', type: '无色本体', bulletType: '无色湮灭黑洞 + 七色逆转湮灭极光', feature: '全四阶段史诗战役，吞噬一切颜色，最终七虹合一唤醒始源之光消灭', drop: '🏆 一周目大通关、神级称号【裂空之羽】、二周目困难模式' }
]
