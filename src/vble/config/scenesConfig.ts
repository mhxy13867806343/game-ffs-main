/**
 * 全域世界场景、城镇村落、NPC 居民与贩售商店配置中心
 * 按照 JRPG 标准包含：
 * 1. 场景地理概况（安全区、氛围气候、推荐等级）
 * 2. 城镇常驻 NPC 居民名录（身份、对话背景、剧情作用）
 * 3. 城镇各商铺货物清单（道具店、武器店、防具店、魔法店、旅馆休整）
 * 4. 周边与内部出没的生态怪物（等级、血量、弱点、掉落）
 */

export interface TownNPC {
  id: string
  name: string
  title: string
  role: 'leader' | 'merchant' | 'inn' | 'story' | 'craft' | 'quest' | 'guard'
  roleText: string
  dialogue: string
  locationDetail?: string
}

export interface TownShopItem {
  id: string
  name: string
  type: 'item' | 'weapon' | 'armor' | 'magic' | 'special'
  typeText: string
  price: number
  effect: string
}

export interface TownShop {
  id: string
  name: string
  shopType: 'item' | 'weapon' | 'armor' | 'magic' | 'special' | 'inn'
  shopTypeName: string
  keeperName: string
  description: string
  items: TownShopItem[]
}

export interface SceneMonsterEncounter {
  id: string
  name: string
  level: number
  hp: number
  weakness: string
  rank: 'normal' | 'elite' | 'boss'
  dropItem: string
}

export interface WorldScene {
  id: string
  name: string
  type: 'town' | 'field' | 'dungeon' | 'sanctuary' | 'capital'
  typeName: string
  region: string
  tier: 'T1' | 'T2' | 'T3' | 'T4'
  tierName: string
  climate: string
  recommendedLevel: number
  isSafeZone: boolean
  description: string
  features: string[]
  npcs: TownNPC[]
  shops: TownShop[]
  monsters: SceneMonsterEncounter[]
  image?: string
}

export const WORLD_SCENES: WorldScene[] = [
  {
    id: 'chen_hui_palace_town',
    name: '晨辉王城 & 宁静村',
    type: 'capital',
    typeName: '人类王都与安全村落',
    region: '晨辉平原腹地',
    tier: 'T1',
    tierName: '原初大陆 (Lv.1~8)',
    climate: '平原温带 · 水晶微光笼罩',
    recommendedLevel: 1,
    isSafeZone: true,
    description: '原初大陆的守护中枢与光之战士启程圣地。宁静村背靠群山与始源神殿，城门连接晨辉郊外的平原驿道（草丘羊群与凉亭行商）；广场铁匠工坊与玛莎宿屋为旅人提供整备。晨辉王宫则是王国的政治与信仰中枢，白石殿堂内设王座与祭坛，由国王达里安与禁卫队长卫珩共同拱卫。',
    features: [
      '设立三大王家补给交易所（王都杂货铺、瓦尔特淬火精钢武器铺、皮具婆婆护甲工坊）',
      '拥有免费休整旅店与档案库，全域安全结界保护无随机遇敌',
      '最新侧室更新：【宁静村·宿屋伤兵侧房 (House1Sickroom)】收留魔导空军突袭负伤士兵',
      '王宫侧殿更新：【晨辉王宫·侧厅与抄录室 (PalaceSideHall)】御膳总管老张与皇家图书编纂官常驻，备有高级行军药剂、远征小屋与千年前古泥板记录',
      '天险探索延伸：【飞龙巢·内巢 (Longqi Inner Nest)】由北侧洞口深入，内置主龙窝与守护龙蛋窝',
      '《大陆地理卷》权威起步风土：宁静村集市城门、晨辉王宫白石圣殿与平原草丘驿道三大分区拓扑',
      '居民肖像系统实装：【宁静村常驻居民 (阿梅/李伯/小皮)】与【晨辉王宫常驻人物 (大臣谢礼/神官莫远/旅行者言昭)】对话正式接入专属 64×64 中性肖像与弱引用身份绑定',
      '野外与隐室肖像接入：【晨辉郊外·牧羊人 (Shepherd)】与【龙栖岭·驯龙隐者老雷 (DragonHermit)】官方中性对白立绘正式接入',
      '城防与近卫肖像实装：【守卫雷恩 (Guard)】、【守卫老齐 (OldGuard)】与【近卫骑士长 (KnightCaptain)】官方银甲与老兵岁月细节立绘正式接入',
      '地点绑定肖像实装：【泥板抄录员 (PalaceCopyist)】与【避难旅人 (CampTraveler)】基于安装地点接入专属对白中性立绘',
      '复苏之野肖像实装：【修墙工人 (RestoredBuilder)】光复战后世界弱绑定帝国公民中性头像',
      '岩屋与复苏信使肖像实装：【照看岩屋的学徒 (HerbalApprentice)】与【报平安的信使 (RestoredCourier)】分别接入年轻学徒与紫风帽信使中性头像',
      '复苏归民肖像实装：【归乡村民 (RestoredVillager)】接入黄昏旅人常驻中性对白肖像',
      '神殿与林道剧情肖像全量绑定：【神殿祭司长 (HighPriest)】、【神殿守卫队长 (TempleCaptain)】与【林道·言昭 (YanZhao)】非活动节拍日常对白正式绑定官方中性肖像',
      '村长重访肖像实装：【村长阿鲁诺 (Elder)】主线完成回门重访对话正式接入官方中性肖像',
      '奖励重访肖像对齐：【驯龙隐者老雷 (DragonHermit)】猎龙队徽章已领取重访对白正确展现中性头像，次句领件提示自动清空',
      '王室与天险前哨肖像实装：【晨辉国王达里安 (King)】与【帝国猎龙侦察兵 (Scout)】王冠华服与侦察风帽官方中性肖像正式入库实装',
      '复苏药铺原位接线实装：【复苏世界·归乡药铺 (RestoredApothecary)】全域第 105 处独立安全室内！东侧原位药舍挂载第 16 处“道具店”商业标牌，归乡药师乔迁室内前台提供 6 款常备药品与安全休整',
      '终局皇权肖像实装：【皇帝·言昭 (Emperor)】终焉始源祭殿对白正式接入帝冠与漆黑华贵龙袍官方 64×64 中性肖像 (emperor-neutral.png)，与林道言昭分别按节点衣装立绘独立显现',
      '赠礼武僧肖像实装：【退隐武僧 (RetiredMonk)】隐修木屋赠礼对话接入神官僧侣中性肖像 (npc_p_priest-neutral.png)，次句领件提示精准清脸',
      '王宫侍女肖像实装：【王宫侍女春晖 (ChunHui)】接入棕发白头饰围裙官方专属中性立绘 (chunhui-neutral.png)，领曲奇对话全景出脸',
      '韩伯道具铺独立室内落成：【宁静村·韩伯道具铺 (NingjingApothecary)】全域第 114 处独立安全室内！宁静村东侧城墙开拓通道连通独立东院（1728×960），门楣挂载全域第 27 处原生“道具店”矢量招牌 (shop_sign: item，偏移 -72, -168)，行商韩伯迁入室内柜台桌前 (640, 400) 供应恢复药 (50G)、解毒草 (30G)、眼药 (80G) 与帐篷 (150G)，自动进门与南门平滑返回',
      '驿道凉亭商业标牌实装：【晨辉郊外·路旁商亭 (ChenHui Road Pavilion)】全域第 28 处原生“道具店”矢量招牌 (shop_sign: item，偏移 -72, -168)！流浪商人胡老板草丘茶亭顶部正式挂载统一标识，保持 1.25 倍荒野金针与凤凰尾羽补给',
      '76 处独立静态场景组件与天空之城 15 景私宿主互连/全城保存恢复互操作 26/26 归档（未注册世界入口）：【天空之城 15 景静态组件、14 双向边私宿主互连原型、B 策略返航来源契约 6/6、私加载异常恢复适配器 12/12 及全城 15 景私自动档/中断档恢复回港互操作 26/26（累计 43 次跨门回港）验证归档 (sky_city_static_environment.gd / SKY_CITY_FORMAL_ENTRY_PLAN_2026-10-23.md)】、【海下神殿三层外廊/潮柱厅/沉晶坛 + 沃水塔沉塔内廊 4 景】、【通岭洞西口与通岭中腹 2 景】、【冰棱窟三层窟口/冰柱廊/静冰湖岸 3 景】、【北窟三层风口/回廊/晶腔 3 景】、【潮窟三层潮窟口/海贼藏/潮闸厅 3 景】、【雷鸣窟三层雷鸣窟口/鸣室/雷核 3 景】、【巨窟三层巨窟风门/回声厅/深渊台 3 景】、【露莎下水道三层下水道口/潮沟/泵房 3 景】、【铁矿窟三层铁矿窟口/锤厅/炉心 3 景】、【石纹窟三层石纹窟口/骨廊/牙厅 3 景】、【沃水塔地上三层地面入口/中层晶簇厅/塔顶水晶外坛 3 景】、【双叉塔四景双叉塔庭/左叉/右叉/共享双顶 4 景】、【沙脊金字塔四景沙脊入口/东阶/中宫/墓室 4 景】、【四元素祀台内室风/水/火/地四祀台 4 景】、【再生塔三层内室一层/中层/顶层 3 景】、【孤屿神殿第一层·孤屿外殿 1 景 (isle_shrine)】、【巴勒城厅与伯特城厅 2 景 (bal_hall + burt_hall)】、【萨给特议事厅 1 景 (surgate_hall)】、【园月馆独立静态布景 1 景 (gardenia_in)】、【火矶城两层室内 2 景 (karnak_keep_1 / karnak_keep_2)】、【原城镇旅店与商铺 5 景 (harmonia_inn / harmonia_shop / rusalka_inn / walz_shop / karnak_shop)】及【古卷西翼独立静态 1 景 (archive_west / archive_west_static_environment.gd，14 实体含四座 152×72 书架与两根 52×28 宫柱、书架前景遮挡 alpha 0.42/1.0 复原及 16 条公开精确路径验证)】均完成独立碰撞与 Circle16 连续寻路验证，暂未计入 StoryMapCatalog 正式开放地图'
    ],
    image: '/images/world-map.png',
    npcs: [
      {
        id: 'npc_p_maid',
        name: '王宫侍女 · 春晖 (ChunHui)',
        title: '晨辉王宫随侍女仆',
        role: 'story',
        roleText: '王室随侍 (🎭 专属肖像实装)',
        dialogue: '“我听说过你们的旅行。路上别只顾着赶路，这是我刚烤好的曲奇。每回等东西出炉，我就忍不住往那边多瞧几眼。明知急不得，心里还是盼着。”',
        locationDetail: '晨辉王宫后廊 · 御膳房外侧 (npc_p_maid)'
      },
      {
        id: 'npc_v_item',
        name: '行商 · 韩伯 (HanBo)',
        title: '宁静村道具店行商',
        role: 'merchant',
        roleText: '道具店主 (韩伯道具铺)',
        dialogue: '“韩伯：出门先备药，帐篷留在危险路段前使用。”',
        locationDetail: '宁静村 · 韩伯道具铺室内柜台 (NingjingApothecary 640, 400)'
      },
      {
        id: 'npc_v_mage_old',
        name: '退隐魔导师 · 埃尔文 (RetiredMonk / Elwin)',
        title: '宁静村隐修士',
        role: 'story',
        roleText: '隐修赠礼 (🎭 肖像实装)',
        dialogue: '“白魔法守护生命，黑魔法引动元素。魔力耗尽时，勇气也需要一口喘息。歇着的时候，我会把心里的急事放一放。等呼吸慢下来，再想，也许就没那么慌。”',
        locationDetail: '宁静村 · 西侧隐修木屋前 (RetiredMonk)'
      },
      {
        id: 'npc_p_cook',
        name: '御膳总管老张 (RoyalCook)',
        title: '晨辉王宫后勤总管',
        role: 'merchant',
        roleText: '王室后勤供应',
        dialogue: '“后勤物资已经全部备齐！高级恢复药救急，野营帐篷和小屋留到安全地点休整再用！”',
        locationDetail: '晨辉王宫侧殿 · 厨房与御膳备餐室 (PalaceSideHall)'
      },
      {
        id: 'npc_p_archivist',
        name: '皇家图书编纂官 (RoyalArchivist)',
        title: '古代典籍与泥板整理官',
        role: 'story',
        roleText: '古籍编纂 (🎭 肖像实装)',
        dialogue: '“这一块泥板写于千年前。那时光与暗还没有被写成彼此的敌人。记载说，世界原本一体。后来有人将边界刻进天空，又把历史分成了两卷。字迹模糊的地方宁可留白，也不能把猜想誊成史实。”',
        locationDetail: '晨辉王宫侧殿 · 抄录室 (PalaceSideHall)'
      },
      {
        id: 'npc_v_injured',
        name: '远征伤兵 (InjuredSoldier)',
        title: '北线阻击战幸存者',
        role: 'story',
        roleText: '前线哨探 (🎭 肖像实装)',
        dialogue: '“我在北方见过新的魔导战舰……它们不是来巡逻的。猎龙部队已经出发，龙栖岭的幼龙还不知道危险正在逼近。一听见门响，我就想撑着起来。其实只是有人进来换水，我还是得慢慢躺回去。”',
        locationDetail: '宁静村 · 玛莎宿屋伤兵侧房 (House1Sickroom)'
      },
      {
        id: 'npc_king_darian',
        name: '晨辉国王 · 达里安 (King)',
        title: '晨辉王国君主',
        role: 'leader',
        roleText: '国家领袖 (🎭 肖像实装)',
        dialogue: '“远行的人回来了。先去见一见村长，他一直在等消息。接见远行的人，我常忍不住先看他们的脸色。听完回话，才发觉手还握着扶手；以晨辉王室之名，授予诸位调查晶石异变的特权，王冠边缘压着额头，我却更挂心你们的归途。愿望容易说，牵挂却不能就此放下。”',
        locationDetail: '王宫内廷御座中央 (chen_hui_palace)'
      },
      {
        id: 'npc_l_scout',
        name: '帝国猎龙侦察兵 (Scout)',
        title: '龙栖天险前哨斥候',
        role: 'story',
        roleText: '天险前哨 (🎭 肖像实装)',
        dialogue: '“这里的悬崖比帝国的城墙还险峻。飞龙掠过头顶的声音，让人骨头都在发颤。”',
        locationDetail: '龙栖岭悬崖 · 险道前哨 (longqi_ridge)'
      },
      {
        id: 'npc_minister',
        name: '宫廷大臣谢礼 (Minister)',
        title: '财政兼内务总管',
        role: 'story',
        roleText: '战备颁授 (🎭 肖像实装)',
        dialogue: '“帝国的舰队不该成为我们挑起争端的理由。闭城、派使者，尚有求和的余地。若只凭预言便挥剑，代价会落在城外的田地和百姓身上。一纸命令传出宫门，便会落到许多人的饭桌上。我不能只想殿里的体面。”',
        locationDetail: '王城议政大厅'
      },
      {
        id: 'npc_p_priest',
        name: '神官莫远 (RoyalPriest)',
        title: '白石祭殿神官',
        role: 'story',
        roleText: '神殿引言 (🎭 肖像实装)',
        dialogue: '“原初水晶的光芒正在褪色。双月的引力本应平衡，如今却像被撕开了一道口子。神殿祭司长仍在守护结界，但一双手撑不了整个世界。看守祭坛的人也会害怕，只是不能让害怕压过该做的事。”',
        locationDetail: '晨辉王宫 · 白石祭殿回廊'
      },
      {
        id: 'npc_p_prophet',
        name: '旅行者言昭 (PalaceProphet / DeckProphet)',
        title: '神秘先知漫游者',
        role: 'story',
        roleText: '开场指引 (🎭 肖像实装)',
        dialogue: '“我在等一道命令落地。随后，我们大概会在通往神殿的路上再见。世界被一分为二时，最难分清的往往不是土地。等人的时候，我喜欢先静一静。把心里的话理顺些，开口就不容易说得太满。（甲板阶段：先把伤员送进船舱。这里的风声，还没到最紧的时候。风扑在脸上，人反倒清醒些。我把脚下站稳，心神也就能慢慢落回眼前。）”',
        locationDetail: '晨辉王宫 · 前庭石径 / 帝国飞空艇甲板'
      },
      {
        id: 'npc_elder_aluno',
        name: '村长 · 阿鲁诺 (Elder)',
        title: '宁静村长者',
        role: 'story',
        roleText: '指引者 (🎭 重访肖像实装)',
        dialogue: '“风停了三天，田里的土越来越硬。始源神殿的晶石一定出了问题。先去西边的晨辉王宫听候王命。一想到硬土，夜里都睡不踏实。闭上眼，总觉得还有哪块田没看过。”',
        locationDetail: '宁静村村口神树下 (640, 360)'
      },
      {
        id: 'npc_smith_walter',
        name: '铁匠 · 瓦尔特',
        title: '老牌王城锻造师',
        role: 'craft',
        roleText: '装备铸造',
        dialogue: '“我的炉火从不熄灭！哪怕只是粗铁，经我淬火也能斩断哥布林的头颅！”',
        locationDetail: '宁静工坊二号民居'
      },
      {
        id: 'npc_inn_martha',
        name: '宿屋老板娘 · 玛莎',
        title: '旅舍经营者',
        role: 'inn',
        roleText: '宿屋休息',
        dialogue: '“欢迎光临！一晚只需 10 金币，保证能让队伍全员生命魔力完全恢复，精力充沛！”',
        locationDetail: '宁静村旅店一层'
      },
      {
        id: 'npc_merchant_hu',
        name: '流浪行商 · 胡老板',
        title: '往来西域商贩',
        role: 'merchant',
        roleText: '稀有货商',
        dialogue: '“走南闯北这些年，我这儿不仅有王都买不到的奇药，还有能解百毒的秘草。”',
        locationDetail: '晨辉城外干道茶摊'
      },
      {
        id: 'npc_v_mother',
        name: '村妇阿梅 (VillageMother)',
        title: '宁静村民妇',
        role: 'story',
        roleText: '村民对白 (🎭 肖像实装)',
        dialogue: '“孩子还没见过父亲。他随守军去了北边，说等收成时就回来。愿神殿的光还照得到他们。孩子听见门外的脚步就抬头，我也总忍不住跟着望一眼。”',
        locationDetail: '宁静村 · 中部民居前石路'
      },
      {
        id: 'npc_v_farmer',
        name: '老农李伯 (Farmer)',
        title: '宁静村老耕农',
        role: 'story',
        roleText: '村民对白 (🎭 肖像实装)',
        dialogue: '“今年的土硬得锄头都快断了。以前绕着花飞的蜜蜂，现在见人就追。地脉要是病了，光给庄稼浇水也没用啊。土再硬，也得先把田埂修好，不能让这一季的种子白费。”',
        locationDetail: '宁静村 · 东侧农田边缘'
      },
      {
        id: 'npc_v_boy',
        name: '小皮 (VillageBoy)',
        title: '宁静村顽皮男童',
        role: 'story',
        roleText: '村民对白 (🎭 肖像实装)',
        dialogue: '“我在东北屋后找到一只旧宝箱！沿房子东侧绕到北边就看得见。里面亮闪闪的像个戒指。我够不到锁，你替我看看吧。我走哪儿都爱东瞧西瞧，鞋底磨破了，回家还得挨一顿念叨。”',
        locationDetail: '宁静村 · 西南民居石径'
      },
      {
        id: 'npc_v_guard_gate',
        name: '守卫雷恩 (Guard)',
        title: '宁静村大门值守卫兵',
        role: 'story',
        roleText: '村门值守 (🎭 肖像实装)',
        dialogue: '“山洞里的毒蜂会聚集。靠近你的魔物会一起参战，别让两群敌人同时追上。受了毒伤先用解毒药，队伍状态不好就去西北的玛莎宿屋。出门前看看同伴的状态，别等到了山洞里才发现药袋空了。”',
        locationDetail: '宁静村 · 西南村口大门石道'
      },
      {
        id: 'npc_v_guard_wall',
        name: '守卫老齐 (OldGuard)',
        title: '宁静村城防巡查老兵',
        role: 'story',
        roleText: '城防巡查 (🎭 肖像实装)',
        dialogue: '“二十年前签下停战书的时候，连村里的钟都敲了一整夜。如今帝国的飞空艇又在云上巡弋……我希望这只是老人多心。守门的人盼的不是立功，是出去的人都能平安回来。”',
        locationDetail: '宁静村 · 东侧城垛巡逻石道'
      },
      {
        id: 'npc_p_knight_c',
        name: '近卫骑士长 (KnightCaptain)',
        title: '晨辉王宫近卫骑士统领',
        role: 'story',
        roleText: '王庭禁卫 (🎭 肖像实装)',
        dialogue: '“真正的骑士不只有锋利的剑，还要知道什么时候挡在同伴面前。敌人蓄势时先防御，再让受伤的同伴退到后排。活下来，才有下一招。操练时先记住身边人的步子，别只顾自己冲得快。”',
        locationDetail: '晨辉王宫 · 白石外廊南侧殿前'
      },
      {
        id: 'npc_p_copyist',
        name: '泥板抄录员 (PalaceCopyist)',
        title: '王宫古籍抄录员',
        role: 'story',
        roleText: '古籍抄录 (🎭 肖像实装)',
        dialogue: '“编纂官把泥板原件留在厅里，抄本放在西边书架。千年前，光与暗还属于同一个世界。一坐久了肩膀就僵，我得放下笔揉一揉，免得末尾几个字越写越歪。”',
        locationDetail: '晨辉王宫侧殿 · 抄录室 (PalaceSideHall)'
      },
      {
        id: 'npc_h_traveler',
        name: '避难旅人 (CampTraveler)',
        title: '和声营地避难者',
        role: 'story',
        roleText: '营地避难 (🎭 肖像实装)',
        dialogue: '“晶石碎裂后，我们暂时在这片帐篷间避难。这里还有人相互照应。你若要继续赶路，沿南边的路就能回到大陆。愿大家都平安。帐篷挨得近，夜里听见有人翻身，反倒觉得安心。至少醒来时，身边还有人。”',
        locationDetail: '谐律难民营 · 帐篷宿营区 (harmonia_camp)'
      },
      {
        id: 'npc_rw_builder',
        name: '修墙工人 (RestoredBuilder)',
        title: '复苏世界城建工人',
        role: 'story',
        roleText: '战后重建 (🎭 阶段肖像实装)',
        dialogue: '“明天先修屋顶，再修水道。总算能说起明天了。我收工前总把工具上的泥刮净，用的时候才顺手。活儿再杂，这一步不能省。”',
        locationDetail: '复苏世界·居住区 · 石路旁 (restored_world 384, 672)'
      },
      {
        id: 'npc_h_apprentice',
        name: '照看岩屋的学徒 (HerbalApprentice)',
        title: '隐者石屋看顾学徒',
        role: 'story',
        roleText: '石屋照应 (🎭 肖像实装)',
        dialogue: '“老雷今天去了山口。东边药箱里有解毒药，西边书架是他留给照料幼龙之人的手记。柜子里的标签是老雷写的，字不齐，却一眼能认出来。我照着摆，免得他回来找不着。”',
        locationDetail: '龙栖岭悬崖 · 隐士石屋室内 (house:HermitHut 640, 352)'
      },
      {
        id: 'npc_rw_courier',
        name: '报平安的信使 (RestoredCourier)',
        title: '始源复苏之野信差',
        role: 'story',
        roleText: '家书信差 (🎭 肖像实装)',
        dialogue: '“古王遗都和秘法都的信都送到了。这回没有征兵令。挎带一拧，走起来就磨衣领。趁停步把它捋平，信也能在包里放得稳些。”',
        locationDetail: '复苏世界·居住区 · 步道中央 (restored_world 480, 544)'
      },
      {
        id: 'npc_rw_villager',
        name: '归乡村民 (RestoredVillager)',
        title: '始源复苏之野归乡者',
        role: 'story',
        roleText: '重返家园 (🎭 肖像实装)',
        dialogue: '“海在原来的方向，山也回来了。我要先找到家门。从前出门，总要回头看看门关严没有。如今走在路上，还是改不了回头的习惯。”',
        locationDetail: '复苏世界·居住区 · 东侧石径旁 (restored_world 896, 672)'
      },
      {
        id: 'npc_r_shepherd',
        name: '忧愁的牧羊人 (Shepherd)',
        title: '平原草丘放牧人',
        role: 'story',
        roleText: '平原生态 (🎭 肖像实装)',
        dialogue: '“羊群一夜没睡，蹄子不停地刨地。震动是从地底传上来的。往泰坦山道走可要留神，前几天已经落过一阵碎石了。我越慌，羊群就越乱。先把声音放轻些，哄住它们，也好让自己定定神。”',
        locationDetail: '晨辉郊外 · 平原草丘驿道'
      },
      {
        id: 'npc_l_hermit',
        name: '驯龙隐者老雷 (DragonHermit)',
        title: '龙栖天险隐修者',
        role: 'story',
        roleText: '飞龙守护 (🎭 肖像实装)',
        dialogue: '“飞龙可比人重情义得多。你们若是真心为了解除灾厄，就去峭壁深处的龙巢看看吧。”',
        locationDetail: '龙栖岭悬崖 · 隐士石屋 (HermitHut)'
      },
      {
        id: 'npc_t_acolyte_1',
        name: '守石侍童甲 (WestAcolyte)',
        title: '神殿西侧侍童',
        role: 'story',
        roleText: '神殿守望 (🎭 肖像实装)',
        dialogue: '“四元素晶石像心脏一样，把生机沿着地脉送向大陆。我们刚从西偏殿撤过来。若晶石停下，外面的田野会先失去颜色。平时背得最熟的祷词，这会儿反倒卡在嘴边。我想慢一点，至少别先乱了心。”',
        locationDetail: '始源神殿 · 西侧供奉石台'
      },
      {
        id: 'npc_t_acolyte_2',
        name: '守石侍童乙 (EastAcolyte)',
        title: '神殿东侧侍童',
        role: 'story',
        roleText: '神殿守望 (🎭 肖像实装)',
        dialogue: '“东边晶石的裂纹变红了！我听到里面有什么东西在敲……队长让我们留在南廊，可我不敢闭上眼睛。我把衣角攥得起了皱，松开才发现手心全是汗。有人应一声，我就没那么怕了。”',
        locationDetail: '始源神殿 · 东侧供奉石台'
      },
      {
        id: 'npc_t_high_priest',
        name: '神殿祭司长 (HighPriest)',
        title: '始源神殿大祭司',
        role: 'story',
        roleText: '神殿大祭司 (🎭 肖像实装)',
        dialogue: '“结界正在衰弱。若是奉王命而来，请先把路上的情况告诉我。侍童在旁边时，我会先把自己站稳。手心再凉，也不能让他们只看见我的慌张；晶石本应调和四种元素，闭眼祈愿时我也盼着心里能安稳一些，可睁开眼仍会先看看身边的人；结界没能留住完整的天空，有些话哽在喉间慢慢才能说清，我还在学着别把叹息放在每一句前头。”',
        locationDetail: '始源神殿 · 中央石柱东侧 (origin_temple 720, 700)'
      },
      {
        id: 'npc_t_captain',
        name: '神殿守卫队长 (TempleCaptain)',
        title: '始源神殿近卫队长',
        role: 'story',
        roleText: '神殿近卫 (🎭 肖像实装)',
        dialogue: '“侍童留在南廊！我来挡住追下来的魔物。祭司长在中央石柱东侧。喊得嗓子发哑，也比把话憋在心里好，我宁可让人嫌我吵，也不愿含糊半句；守护者倒下了，快去看晶石，我还顾不上喘匀这口气，心里越乱越得把眼前的事一件一件看清。”',
        locationDetail: '始源神殿 · 南廊石阶 (origin_temple 448, 768)'
      },
      {
        id: 'npc_r_prophet',
        name: '旅行者言昭·林道 (YanZhao)',
        title: '晨曦林道漫游预言者',
        role: 'story',
        roleText: '路途漫游 (🎭 肖像实装)',
        dialogue: '“神殿的风声已经传到了这里。你们若是奉王命而来，我们或许同路。走路时想到一句话，我常先留在心里，等脚步慢下来再听听自己还想不想说；路同走，话不必全说，并肩走时不说话也自在，话音落下后的那点安静，我倒舍不得急着填满。”',
        locationDetail: '晨曦之境 · 林间大道石碑旁 (chen_hui_road)'
      },
      {
        id: 'npc_em_yan_zhao',
        name: '皇帝 · 言昭 (Emperor)',
        title: '西风机械帝国皇帝',
        role: 'story',
        roleText: '帝国君主 (🎭 终局肖像实装)',
        dialogue: '“走到这里，你们终于肯正眼看我了。”',
        locationDetail: '始源神殿 · 终焉祭殿核心 (origin_temple 640, 400)'
      }
    ],
    shops: [
      {
        id: 'shop_ningjing_apothecary',
        name: '宁静村·韩伯道具铺 (Ningjing Apothecary)',
        shopType: 'item',
        shopTypeName: '宁静村道具店 (全域第 27 处商业招牌)',
        keeperName: '行商韩伯 (HanBo)',
        description: '宁静村东侧东院独立安全室内（全域第 114 处安全室内），门楣挂载“道具店”矢量招牌 (shop_sign: item，偏移 -72, -168)。行商韩伯常驻柜台提供冒险开荒常备药剂与扎营用具。',
        items: [
          { id: 'item_1', name: '恢复药 (Potion)', type: 'item', typeText: '基础药水', price: 50, effect: '单体恢复 50 点生命值 HP' },
          { id: 'item_9', name: '解毒草 (Antidote)', type: 'item', typeText: '解毒草药', price: 30, effect: '解除战斗中遭受的【猛毒】异常状态' },
          { id: 'item_10', name: '眼药 (Eye Drops)', type: 'item', typeText: '明目药水', price: 80, effect: '解除战斗中遭受的【盲目/失明】状态' },
          { id: 'item_11', name: '野营帐篷 (Tent)', type: 'item', typeText: '野营用具', price: 150, effect: '在大地图或存档点扎营，全队 HP/MP 完全回满' }
        ]
      },
      {
        id: 'shop_chenhui_item',
        name: '王都便民百货杂货铺',
        shopType: 'item',
        shopTypeName: '消耗道具店',
        keeperName: '行商胡老板 / 杂货伙计',
        description: '提供冒险初期最为关键的恢复药物、状态清除草药与野营帐篷。',
        items: [
          { id: 'potion_normal', name: '恢复药 (Potion)', type: 'item', typeText: '消耗品', price: 50, effect: '单体恢复 100 点生命值 HP' },
          { id: 'hi_potion', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '消耗品', price: 150, effect: '单体恢复 500 点生命值 HP' },
          { id: 'antidote_herb', name: '解毒草 (Antidote)', type: 'item', typeText: '解毒药', price: 30, effect: '解除战斗中遭受的【猛毒】异常状态' },
          { id: 'eye_drops', name: '眼药水 (Eye Drops)', type: 'item', typeText: '清目剂', price: 50, effect: '解除战斗中遭受的【盲目/失明】状态' },
          { id: 'phoenix_down', name: '凤凰尾羽 (Phoenix Down)', type: 'item', typeText: '复活圣物', price: 500, effect: '复活一名处于战斗不能阵亡状态的同伴' },
          { id: 'field_tent', name: '野营帐篷 (Tent)', type: 'item', typeText: '野营品', price: 250, effect: '在大地图或存档点扎营，全队 HP/MP 完全回满' }
        ]
      },
      {
        id: 'shop_chenhui_weapon',
        name: '瓦尔特淬火精钢武器铺',
        shopType: 'weapon',
        shopTypeName: '近战与远程武器',
        keeperName: '铁匠瓦尔特',
        description: '销售开荒初期的青铜与精铁制单双手兵刃。',
        items: [
          { id: 'bronze_dagger', name: '青铜匕首', type: 'weapon', typeText: '短剑', price: 150, effect: '攻击力 +12，敏捷 +1，盗贼/游侠适用' },
          { id: 'iron_sword', name: '精铁阔剑', type: 'weapon', typeText: '直剑', price: 350, effect: '攻击力 +22，力量战士/骑士通用基础兵刃' },
          { id: 'hunter_bow', name: '猎人之短弓', type: 'weapon', typeText: '弓箭', price: 280, effect: '攻击力 +18，对飞行鸟类系怪物具备特攻效果' },
          { id: 'oak_staff', name: '橡木祈祷法杖', type: 'weapon', typeText: '法杖', price: 200, effect: '攻击力 +8，魔法攻击 +15，白/黑魔道士必备' }
        ]
      },
      {
        id: 'shop_chenhui_armor',
        name: '皮具婆婆护甲工坊',
        shopType: 'armor',
        shopTypeName: '防具与护盾',
        keeperName: '皮具婆婆',
        description: '手工缝制的轻重型防具，有效降低原野怪兽造成的爪撕伤害。',
        items: [
          { id: 'leather_armor', name: '厚质皮胸甲', type: 'armor', typeText: '轻甲', price: 120, effect: '物理防御 +8，回避率 +2%' },
          { id: 'bronze_mail', name: '青铜锁子甲', type: 'armor', typeText: '重甲', price: 280, effect: '物理防御 +16，物理伤害减免 +5%' },
          { id: 'leather_cap', name: '粗织皮帽', type: 'armor', typeText: '头盔', price: 60, effect: '物理防御 +4，魔法防御 +2' },
          { id: 'bronze_shield', name: '青铜圆盾', type: 'armor', typeText: '盾牌', price: 100, effect: '格挡率 +8%，防御力 +6，防弹反基础' }
        ]
      },
      {
        id: 'shop_palace_kitchen',
        name: '晨辉王宫·御膳后勤补给处',
        shopType: 'item',
        shopTypeName: '王室后勤补给',
        keeperName: '御膳总管老张',
        description: '王宫御膳备餐室专供出征将士与王室护卫的战备物资，备有高级药水、圣水与野营小屋。',
        items: [
          { id: 'item_2', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '强效药剂', price: 150, effect: '单体恢复 500 点生命值 HP' },
          { id: 'item_11', name: '眼药水 (Eye Drops)', type: 'item', typeText: '清目剂', price: 50, effect: '解除战斗中遭受的【盲目/失明】状态' },
          { id: 'item_20', name: '圣水 (Holy Water)', type: 'item', typeText: '圣物道具', price: 150, effect: '对不死系敌人造成 100 点圣属性伤害；其他目标无效' },
          { id: 'item_21', name: '野营小屋 (Cottage)', type: 'item', typeText: '远征庇护', price: 600, effect: '在安全地点或大地图搭建庇护所，全队状态完整回复' }
        ]
      },
      {
        id: 'shop_restored_apothecary',
        name: '复苏世界·归乡药铺',
        shopType: 'item',
        shopTypeName: '常备药品与补给',
        keeperName: '归乡药师',
        description: '战后复苏之野的原木药舍，为劫后余生的村民与远征归来的战士调配伤药。',
        items: [
          { id: 'potion', name: '恢复药 (Potion)', type: 'item', typeText: '基础药水', price: 50, effect: '单体恢复 50 HP' },
          { id: 'hi_potion', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '强化药剂', price: 150, effect: '单体恢复 250 HP' },
          { id: 'ether', name: '以太药水 (Ether)', type: 'item', typeText: '魔力试剂', price: 200, effect: '单体恢复 50 MP' },
          { id: 'antidote', name: '解毒草 (Antidote)', type: 'item', typeText: '解毒药剂', price: 30, effect: '解除战斗与地图上的中毒状态' },
          { id: 'eye_drops', name: '眼药水 (Eye Drops)', type: 'item', typeText: '明目眼药', price: 20, effect: '解除战斗中的失明/暗黑状态' },
          { id: 'echo_grass', name: '山彦草 (Echo Herbs)', type: 'item', typeText: '通声良药', price: 50, effect: '解除战斗中的沉默状态' }
        ]
      }
    ],
    monsters: [
      { id: 'forest_wolf', name: '林地野狼', level: 1, hp: 28, weakness: '火属性', rank: 'normal', dropItem: '狼皮、小恢复药' },
      { id: 'killer_bee', name: '杀人毒蜂', level: 1, hp: 18, weakness: '火属性、弓箭对空', rank: 'normal', dropItem: '蜂毒针、解毒草' },
      { id: 'goblin', name: '林间哥布林', level: 2, hp: 35, weakness: '常规物攻', rank: 'normal', dropItem: '生锈短剑、25G' },
      { id: 'ff1_pr_001', name: '狂风雏鹰', level: 3, hp: 42, weakness: '冰、风、弓箭', rank: 'normal', dropItem: '鹰羽毛、风之结晶' },
      { id: 'boss_wing_raptor', name: '翼龙守卫 (Wing Raptor)', level: 8, hp: 500, weakness: '冰元素、闭翼时防御', rank: 'boss', dropItem: '翼龙之鳞、凤凰尾羽' }
    ]
  },
  {
    id: 'cape_town_harbor',
    name: '海角镇 & 人鱼海湾',
    type: 'town',
    typeName: '潮汐港口与人鱼秘境',
    region: '苍澜洋海角沿线',
    tier: 'T1',
    tierName: '沿海商埠 (Lv.12~18)',
    climate: '海风湿润 · 潮汐翻涌',
    recommendedLevel: 13,
    isSafeZone: true,
    description: '商船云集的深水避风港，盛产生鲜海味与深海珍珠。越过暗礁向深海潜入，可抵达古老的人鱼王国，进行传说级物物交换。',
    features: [
      '可租借跨海蒸汽船与潜水艇',
      '独有人鱼族远古歌谣物物交换',
      '贩售高阶水属性抗性护具与雷属性法杖',
      '深海潮沟延伸：【人鱼湾·珊瑚海沟 (Mermaid Coral Trench)】深海珊瑚礁岩道，海底聚居地安全观览区',
      '港口建筑扩展：【普拉博卡·港口旅店 (PravokaInn)】滨海港口镇独立旅舍，旅店老板常驻提供 50G 全状态休整恢复',
      '滨海名匠指引：造船船坞大师讲解沿岸礁石航海要领，逃亡市民暂避于港区',
      '灯塔室内扩展：【海角镇·灯塔顶层 (CapeLighthouseTop)】守灯老人常驻挂载专属 64×64 对白肖像，守护深海航图与断崖暗礁航路',
      '港口与酒馆肖像全量接入：【酒吧老板查理 (Charlie)】、【醉倒的老水手 (OldSeaman)】、【码头吊机领班】与【远洋船长】专属中性头像正式入库',
      '人鱼圣域肖像实装：【人鱼族老巫母 (SeaMother)】海底深渊长者接入官方深海巫母中性头像，已领取水之宝珠回访对话与回执完美对齐',
      '海盗首领肖像实装：【海盗首领·博卡 (Boka)】普拉博卡港区接入三角帽船长服官方 64×64 中性肖像 (boka-neutral.png)，航路开辟对白沉浸显现',
      '鱼铺北院独立接线实装：【海角港·阿海鱼铺 (CapeFishShop)】全域第 106 处独立安全室内！北岸短桥连通 384×416 独立尽端北院（1728×960），生鲜鱼贩阿海乔迁室内柜台，门上挂载第 17 处“道具店”商业标牌',
      '洞穴盲眼魔女肖像实装：【玛托雅 (Matoya)】玛托雅洞窟接入红帽银带红袍暗发官方 64×64 中性肖像 (matoya-neutral.png)，水晶眼失落与苏醒之药调配对白全景出脸',
      '人鱼海湾与海底肖像全量实装：【吟游诗人·流歌 (LiuGe / npc_m_bard)】与【人鱼公主·艾莉娜 (PrincessElina / npc_m_mermaid)】正式接入海潮紫发与海绿长发金冠官方 64×64 中性肖像 (mermaid-service-neutral-v1/)，夜歌支线、人鱼鳞片赠礼与潮汐对话全景出脸',
      '人鱼信物转交三段式解耦：【吟游诗人·流歌 (LiuGe)】转交人鱼鳞片反馈正式拆分为三事件，流歌原回话全景展现肖像，交付信物与获得3枚深海珍珠系统回执精准清空肖像'
    ],
    image: '/images/cave-explore.png',
    npcs: [
      {
        id: 'npc_boka_pirate',
        name: '海盗首领 · 博卡 (Boka)',
        title: '潮汐义贼船长',
        role: 'story',
        roleText: '盟友首领 (🎭 肖像实装)',
        dialogue: '“这道水闸归我管。想带船出海？先让我见识见识你们的本事！我最受不了缩头缩脑的样子，心里越不服气，腰杆就越要挺得直，哈！好身手！海盗也有海盗的规矩，帆船归你们用，航路从此开放；一高兴就想放声大笑，笑得胸口发热才痛快，我可不爱把赞许藏在牙缝里。”',
        locationDetail: '海港码头二号泊位'
      },
      {
        id: 'npc_pravoka_inn',
        name: '旅店老板 (PravokaInnkeeper)',
        title: '普拉博卡港口旅店掌柜',
        role: 'inn',
        roleText: '宿屋休整',
        dialogue: '“住宿 50 G，可以恢复队伍的体力、魔力与异常状态。”',
        locationDetail: '普拉博卡港口镇 · 独立港口旅店 (PravokaInn)'
      },
      {
        id: 'npc_pravoka_shipwright',
        name: '造船船坞大师 (PravokaShipwright)',
        title: '滨海资深船匠',
        role: 'story',
        roleText: '航海工匠 (🎭 肖像实装)',
        dialogue: '“船匠：沿岸航行时要绕开礁石，帆船不能驶上陆地。取得船后，到大陆南侧的普拉博卡码头登船；靠岸下船时，先确认岸上有落脚处。板缝我总要多看一遍，海水可不会因为人赶工就客气。”',
        locationDetail: '普拉博卡港口街道'
      },
      {
        id: 'npc_pravoka_refugee',
        name: '逃亡市民 (PravokaRefugee)',
        title: '避难港民',
        role: 'story',
        roleText: '市民避难 (🎭 肖像实装)',
        dialogue: '“海盗占着广场，我们只好躲在这里。出门时请小心。我们连说话都压着声音，听见门外的脚步，就先停下来互相望一眼。谢谢你们赶走海盗！港口终于能恢复往日的生机了。先前怕门外有动静，现在倒盼着听见人声。平常日子的声音，原来这么让人安心。”',
        locationDetail: '普拉博卡港口镇室内'
      },
      {
        id: 'npc_charles_tavern',
        name: '酒吧老板 · 查理 (Charlie)',
        title: '老海角酒馆老板',
        role: 'inn',
        roleText: '酒馆经营 (🎭 肖像实装)',
        dialogue: '“南面有座没有名字的黑岛。旧海图在岛心画了座古神殿。听说那里祭着八岐大蛇。先把眼前航路打通，远海的故事留到船能去的时候。赶路的人坐一会儿再走吧。酒杯擦干净，凳子摆齐，店里总该有个歇脚的样子。”',
        locationDetail: '海角海盗酒吧前台 (CapeTavern)'
      },
      {
        id: 'npc_c_bard_fan',
        name: '醉倒的老水手 (OldSeaman)',
        title: '港口醉汉酒客',
        role: 'story',
        roleText: '酒客见闻 (🎭 肖像实装)',
        dialogue: '“没有星星的夜里……人鱼湾有会勾人魂魄的琴声。别喊她魔女……唱歌的是个不敢下水的男人。嗝！年轻时唱过的旧歌，如今只记得半句。哼着哼着断了，也就拿海风来接。嗝！”',
        locationDetail: '老海角酒馆 · 角落木桌 (CapeTavern)'
      },
      {
        id: 'npc_c_dockworker',
        name: '码头吊机领班 (DockForeman)',
        title: '港区装卸工头',
        role: 'story',
        roleText: '码头勤务 (🎭 肖像实装)',
        dialogue: '“缆绳拉紧！漩涡一天比一天狂，仓里的货都快堆到屋顶了。博卡守着栈桥，能让他松口，这些商船才有活路；南侧岸边是船坞检修区，先用两岸绞盘展开检修桥，再把吊着的补给箱放下来，箱里的两份恢复药就留给帮忙的人。喊号子不能只求嗓门大，前后断句要齐，我一着急，就先在心里数两拍。”',
        locationDetail: '海角镇码头 · 货运栈桥吊机旁'
      },
      {
        id: 'npc_c_captain',
        name: '远洋船长 (Captain)',
        title: '商船领航员',
        role: 'story',
        roleText: '远洋领航 (🎭 肖像实装)',
        dialogue: '“海盗封港只为收过路钱。要去人鱼湾，先把航路撕开。海上的事，话不能说满，我开口前宁可多想一息，省得一句大话压在心上；船已经备妥，东侧码头通往人鱼湾，绳结打好还要用手试一试，人喊得再有把握，也替不了这一下踏实。”',
        locationDetail: '海角镇港口 · 一号码头跳板'
      },
      {
        id: 'npc_m_bard',
        name: '吟游诗人 · 流歌 (LiuGe)',
        title: '人鱼海湾夜歌诗人',
        role: 'story',
        roleText: '夜歌传唱 (🎭 专属肖像实装)',
        dialogue: '“他们叫我夜间魔女。我只是把不该分开的潮声唱给她听。东边退潮时有条路通向珊瑚穹顶。若能见到艾莉娜，请告诉她，岸上的琴还没有停。”',
        locationDetail: '人鱼海湾 · 岸边礁石木台 (mermaid_bay / LiuGe)'
      },
      {
        id: 'npc_m_mermaid',
        name: '人鱼公主 · 艾莉娜 (PrincessElina)',
        title: '碧波之歌传唱者',
        role: 'quest',
        roleText: '人鱼密契 (🎭 专属肖像实装)',
        dialogue: '“离开海洋，我会干涸成石。把这片鳞交给流歌吧，我不能去，愿它替我去。海与岸仍各有归处。”',
        locationDetail: '人鱼湾珊瑚祭坛 (mermaid_undersea / PrincessElina)'
      },
      {
        id: 'npc_shell_trader',
        name: '深海贝壳交换商',
        title: '深渊拾荒者',
        role: 'merchant',
        roleText: '物物以货易货',
        dialogue: '“金币在这里没有用！拿 10 枚彩虹贝壳或者海渊珍珠，就能兑换人鱼竖琴与防溺鳞片！”',
        locationDetail: '海底气泡穹顶'
      },
      {
        id: 'npc_c_lighthouse',
        name: '灯塔守望老人 (LighthouseKeeper)',
        title: '海角灯塔守夜人',
        role: 'story',
        roleText: '航道指引 (🎭 肖像实装)',
        dialogue: '“灯要替迷航的人守着，不能因为今夜没有船就熄。大断崖下还有海路，普通帆船走不了。等你有了潜水艇，再来研究深海航图。”',
        locationDetail: '海角镇 · 灯塔顶层 (CapeLighthouseTop)'
      },
      {
        id: 'npc_m_elder',
        name: '人鱼族老巫母 (SeaMother)',
        title: '深海圣域古巫母',
        role: 'story',
        roleText: '人鱼巫母 (🎭 肖像实装)',
        dialogue: '“沿潮汐空隙缓缓吐息，不要跟暗流硬争。珊瑚穹顶护住了这里，深海断崖却没有这份庇佑。水将把悲鸣锁在北面的潮声石里，击败他能让潮水归位，却挽不回已经错过的岁月。年纪大了，心里的叹息反倒不爱出声。遇见年轻的面孔，还是想把目光放柔些。”',
        locationDetail: '人鱼湾海底 · 珊瑚穹顶祭台前 (mermaid_undersea 840, 440)'
      },
      {
        id: 'npc_cave_matoya',
        name: '盲眼魔女 · 玛托雅 (Matoya)',
        title: '洞穴隐居大魔女',
        role: 'story',
        roleText: '古洞魔女 (🎭 专属肖像实装)',
        dialogue: '“我的水晶眼不见了，什么都看不清。找到了就快还给我！”',
        locationDetail: '玛托雅洞窟 · 居室床榻前 (ff1_matoya_cave / Matoya)'
      }
    ],
    shops: [
      {
        id: 'shop_cape_fish',
        name: '海角港·阿海鱼铺',
        shopType: 'item',
        shopTypeName: '海产与消耗品',
        keeperName: '生鲜鱼贩阿海',
        description: '坐落于海角北院独立室内【阿海鱼铺 (CapeFishShop 640, 400)】，为出海的水手与冒险者供应海产生鱼片、珍稀油脂与强效解水毒特效药。',
        items: [
          { id: 'hi_potion', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '消耗品', price: 150, effect: '恢复 500 点生命值' },
          { id: 'mermaid_scale_cure', name: '深海醒脑鱼油', type: 'item', typeText: '精神药', price: 200, effect: '清除全队【混乱】与【诱惑】负面精神状态' },
          { id: 'gold_needle', name: '金针 (Gold Needle)', type: 'item', typeText: '解石化', price: 150, effect: '立即解除【石化】异常，避免碎裂直接死亡' },
          { id: 'echo_herb', name: '回声草 (Echo Herb)', type: 'item', typeText: '解沉默', price: 60, effect: '解除战斗中遭受的【沉默】哑火状态，恢复施法' }
        ]
      },
      {
        id: 'shop_cape_weapons',
        name: '海港浪涌锻造工坊',
        shopType: 'weapon',
        shopTypeName: '海洋系专属武器',
        keeperName: '海港武器锻造师',
        description: '以深海玄铁与海龙脊骨打造的坚实兵刃，附加水雷属性共鸣。',
        items: [
          { id: 'coral_sword', name: '珊瑚剑', type: 'weapon', typeText: '魔法剑', price: 1200, effect: '攻击力 +48，水属性附伤，对熔岩系敌人增伤 50%' },
          { id: 'trident', name: '水纹三叉戟', type: 'weapon', typeText: '长柄长枪', price: 1500, effect: '攻击力 +55，跳跃伤害倍率提升 30%，龙骑士专用' },
          { id: 'thunder_rod', name: '引雷法杖', type: 'weapon', typeText: '黑魔杖', price: 1400, effect: '魔法攻击 +38，战斗中使用可免费释放全体狂雷术' }
        ]
      },
      {
        id: 'shop_cape_armor',
        name: '深海精铸水神护甲店',
        shopType: 'armor',
        shopTypeName: '防水与抗雷重铠',
        keeperName: '护甲精铸师傅',
        description: '抵抗深海水压与潮汐侵蚀的精钢防具。',
        items: [
          { id: 'chain_mail', name: '精炼锁子甲', type: 'armor', typeText: '金属铠', price: 800, effect: '物理防御 +28，魔法防御 +8' },
          { id: 'water_mail', name: '海蓝鳞片甲', type: 'armor', typeText: '魔抗甲', price: 1600, effect: '物理防御 +36，水属性伤害减免 50%' },
          { id: 'water_shield', name: '水神圆盾', type: 'armor', typeText: '盾牌', price: 500, effect: '格挡率 +14%，免疫激流冲击击退' }
        ]
      },
      {
        id: 'shop_pravoka_inn',
        name: '普拉博卡·港口旅店',
        shopType: 'inn',
        shopTypeName: '港口宿屋休息',
        keeperName: '旅店老板',
        description: '普拉博卡滨海港口镇独立旅舍，为远航归来的水手与冒险者提供 50 G 平价体力与魔力休整。',
        items: [
          { id: 'inn_rest_pravoka', name: '全队休整一晚 (Rest)', type: 'special', typeText: '休整服务', price: 50, effect: '全队生命值 HP、魔法值 MP 完全回满，并解除一切异常状态' }
        ]
      }
    ],
    monsters: [
      { id: 'iron_crab', name: '狂暴寄居蟹', level: 13, hp: 180, weakness: '雷属性、重甲贯穿', rank: 'normal', dropItem: '碎壳 (60G)、锁子甲碎片' },
      { id: 'jellyfish', name: '深海放电水母', level: 14, hp: 120, weakness: '物理打击、惧土', rank: 'normal', dropItem: '麻痹触须、以太药水' },
      { id: 'ghost_sailor', name: '幽灵水手', level: 15, hp: 165, weakness: '圣属性、火属性、治疗反转', rank: 'normal', dropItem: '腐朽帆布、复活羽毛' },
      { id: 'boss_karlabos', name: '卡尔波波斯巨妖 (Karlabos)', level: 18, hp: 1440, weakness: '雷属性 (雷电黑魔法2倍爆击)', rank: 'boss', dropItem: '巨妖外壳、海神之泪' }
    ]
  },
  {
    id: 'factory_city_workshop',
    name: '织造机械城 (Factory City)',
    type: 'capital',
    typeName: '蒸汽与齿轮工业重镇',
    region: '西风机械帝国领地',
    tier: 'T2',
    tierName: '工业要塞 (Lv.22~30)',
    climate: '浓烟密布 · 齿轮轰鸣',
    recommendedLevel: 24,
    isSafeZone: true,
    description: '蒸汽科技与魔导机械极为发达的工业心脏。城内遍布高压管道、传送履带与重装军械试验场，是研发重装机甲与热兵器的中心。',
    features: [
      '支持全品类动力铠装配改装',
      '出售大口径火器与魔导炮',
      '地下连接核心动力炉与逃生通道',
      '最新战舰延伸舱室：【未完工战舰·龙骨舱 (Heliogabalus Keel)】搭载左舷/右舷高压双引擎与军备货舱',
      '最新暗矿延伸区域：【织造暗矿·吊笼间 (Factory Mine Lift Room)】配置绞盘机与矿石货柜，南向连通矿脉岔',
      '帝都民政建筑扩展：【永曜帝都·救济所 (CapitalReliefHouse)】独立安全庇护侧室，救济所管事提供 100G 休整住宿与伤员补给',
      '工坊前场独立接线实装：【织造城·齿轮工坊 (FactoryGearWorkshop)】全域第 104 处独立安全室内！城东短支路桥连通尽端装配前场（1728×960），齿轮改装商与动力铠装配员唯一乔迁室内提供 15 处统一定制标牌商业服务',
      '劳工药房独立接线实装：【织造城·劳工救济药房 (FactoryAidPharmacy)】全域第 107 处独立安全室内！齿轮工坊前场北侧开辟独立北院（1728×960），救济药师乔迁室内前台，门上挂载第 18 处“道具店”商业标牌提供 3 款工矿常备平价药剂',
      '街角药铺独立接线实装：【永曜帝都·街角药铺 (CapitalMedicHouse)】全域第 110 处独立安全室内！帝都东路新辟 96 宽短桥与尽端东院（1728×960），工坊风楼体挂载第 21 处“道具店”商业标牌，帝都药师乔迁室内前台提供 5 款常备药品',
      '战舰与工坊肖像全量接入：【首席研究员忆纱 (ChiefScientist)】、【随舰轮机员】与【撤离补给员】专属中性头像正式入库',
      '暗渠维护工肖像接入：【水道维护员 (DrainWorker)】基于帝都下水道地点弱绑定接入帝国公民对白中性头像',
      '工坊街区与停钟看守肖像实装：【货运工 (Porter)】、【下夜班守门人 (GateWatcher)】与【停钟看守 (Clockkeeper)】基于地点弱绑定接入官方中性对白肖像',
      '阶段支援肖像实装：【船坞技师 (CoreTechnician)】战舰核心停机阶段弱绑定随舰轮机员中性头像',
      '工时名册肖像实装：【工时记录员 (LedgerClerk)】接入经典差旅文书中性对白肖像',
      '市政民政与伤工肖像实装：【包扎中的劳工 (InjuredWorker)】、【宫门传令员 (PalaceMessenger)】、【疏散书记 (EvacuationClerk)】与【分粮人 (BreadDistributor)】基于地点弱绑定接入官方中性对白肖像',
      '寻路关卡与自动门避让：【移动寻路系统】将非目标自动门 (Area2D)、推进剧情传送圈及旧洞窟关卡全面纳入网格障碍避让算法，防止点击寻路误切场景',
      '卸甲卫兵肖像实装：【卸甲卫兵 (DisarmedGuard)】永曜帝都（832, 704）按当前地图立绘复用研究员中性肖像，原无 ID 地点声明、正文与角色设定保持不变',
      '赠礼暗哨肖像实装：【叛军暗哨 (RebelGuard)】帝都暗巷赠礼对话接入帝国重铠守军中性立绘 (graham-armor-neutral.png)',
      '良心工匠肖像实装：【良心工匠哈兰 (Harlan)】接入橙工作帽额镜浅绿工装官方专属中性立绘 (harlan-neutral.png)，以太赠礼对话全景出脸'
    ],
    image: '/images/shop-preview.png',
    npcs: [
      {
        id: 'npc_f_conscience',
        name: '良心工匠 · 哈兰 (Harlan)',
        title: '织造城独立器械工匠',
        role: 'craft',
        roleText: '工匠赠礼 (🎭 专属肖像实装)',
        dialogue: '“神经毒剂的管线已经被我切断。我修过太多机器，不能再把人也当成机器。这瓶以太留给你们，她有名字，叫忆纱。看见人疲倦，我总忍不住先停一停手里的活。再要紧的事，也得容人喘口气。”',
        locationDetail: '织造城街区 · 独门工坊门前 (npc_f_conscience)'
      },
      {
        id: 'npc_f_laborer',
        name: '疲惫劳工 (Laborer)',
        title: '织造城炉火工',
        role: 'story',
        roleText: '炉火工友',
        dialogue: '“炉火二十四小时不熄。以太抽走了，我们连做梦的力气都没有。东边实验厅里还关着一个姑娘，眼皮沉得像坠着东西，要是能闭一会儿什么都不想该多好；我替你们松开了实验厅的门闩，心里绷着一根线，只盼能有一觉不必攥着这股劲儿睡；警报终于停了，今天收工后我想看一眼天，真想让脑子空一会儿，连时辰也懒得数。”',
        locationDetail: '织造城街区 · 炉火工坊旁 (npc_f_laborer)'
      },
      {
        id: 'npc_chief_yisha',
        name: '忆纱 (首席研究员 ChiefScientist / npc_f_sophia)',
        title: '魔导动力核心总设计师',
        role: 'story',
        roleText: '核心科学家 (🎭 肖像实装)',
        dialogue: '“他们说记忆是可以换掉的零件。可我记得疼，也记得有人握过我的手。手心凉了，我就把两只手贴在一起，那点慢慢暖起来的感觉让我知道自己还在这里；我想自己决定下一步，先关掉战舰的核心，一想到要自己拿主意我的手就有些发凉，可这回我想把话说到最后；今天没有人喊我的编号了，我想先看看工厂外面的天空，看看一朵云最后会散成什么形状。”',
        locationDetail: '织造城实验厅中央核心控制台 (factory_lab)'
      },
      {
        id: 'npc_airship_deckengineer',
        name: '随舰轮机员 (DeckEngineer)',
        title: '飞空艇轮机长',
        role: 'story',
        roleText: '动力维保 (🎭 肖像实装)',
        dialogue: '“右舷引擎被震坏了，跳板还能撑住。别跨出舷栏，下面没有第二条路。干这行，耳朵比嘴忙，听见不对劲先把声音听全了；言昭最后留在后甲板，我只看见白光，说到拿不准的地方我就停一停，亲眼看见多少，嘴里只能说出多少。”',
        locationDetail: '帝国飞空艇 · 甲板动力室旁'
      },
      {
        id: 'npc_airship_shipquartermaster',
        name: '撤离补给员 (ShipQuartermaster)',
        title: '随舰战地军需官',
        role: 'story',
        roleText: '军备调度 (🎭 肖像实装)',
        dialogue: '“东边的应急箱留给伤员。拿走恢复药，把还能走的人带出去。数目念过一遍，手指还要跟着过一遍；舱里已经点过人，唯独那位紫衣旅人没有回来，写名册时一横一竖都想落稳，笔下是字，念出声来就不能只当作数目。”',
        locationDetail: '帝国飞空艇 · 医务船舱内 (empire_airship_cabin)'
      },
      {
        id: 'npc_gear_smith',
        name: '齿轮装备改装商',
        title: '军械工程师',
        role: 'craft',
        roleText: '枪械改造',
        dialogue: '“把你们的旧武器交给我！加装微型涡轮与齿轮联动后，威力至少翻一番！”',
        locationDetail: '织造城 · 独立齿轮工坊室内 (FactoryGearWorkshop)'
      },
      {
        id: 'npc_power_armorer',
        name: '动力铠装配员',
        title: '重装机甲师',
        role: 'merchant',
        roleText: '重型装甲商',
        dialogue: '“哪怕是巨龙的一脚，踩在我们的镀钛合金钢板上，也只能留下几道白印！”',
        locationDetail: '织造城 · 独立齿轮工坊室内 (FactoryGearWorkshop)'
      },
      {
        id: 'npc_keel_terminal',
        name: '战舰龙骨巡检终端',
        title: '双舷引擎自检读数仪',
        role: 'story',
        roleText: '工程数据记录',
        dialogue: '“【龙骨舱自动化读数】左右舷高压双引擎（KeelPortEngine/KeelStarboardEngine）运转平稳，货箱物资储备完备，本区域为安全巡检区。”',
        locationDetail: '未完工战舰 · 龙骨舱 (Heliogabalus Keel)'
      },
      {
        id: 'npc_relief_host',
        name: '救济所管事 (ReliefHost)',
        title: '帝都救济所常驻主管',
        role: 'inn',
        roleText: '避难宿屋服务',
        dialogue: '“空床位还够，100 G 可以补齐药材与食物。先登记活着的人，再清点财产。”',
        locationDetail: '永曜帝都西南侧 · 独立救济所室内 (CapitalReliefHouse)'
      },
      {
        id: 'npc_em_medic',
        name: '帝都药师 (ImperialMedic)',
        title: '帝都街角药铺主管',
        role: 'merchant',
        roleText: '帝都常备药品',
        dialogue: '“无论城里多乱，药铺的柜台总得有人守着。金针、以太、万灵药、万能药与凤凰尾，都是按原价供应。”',
        locationDetail: '永曜帝都东侧尽端院 · 街角药铺室内柜台前 (CapitalMedicHouse 640, 400)'
      },
      {
        id: 'npc_em_drain_worker',
        name: '水道维护员 (DrainWorker)',
        title: '帝国暗渠维护技工',
        role: 'story',
        roleText: '暗道维护 (🎭 肖像实装)',
        dialogue: '“这些石槽以前输送净水。现在只能借它们避开宫门的眼线。石缝里的泥得一点点刮，急着用力反倒会伤着槽边。这双手做熟了，就认得轻重。”',
        locationDetail: '永曜帝都 · 地下排水道 (empire_sewer)'
      },
      {
        id: 'npc_em_citizen',
        name: '迷茫的帝国公民 (LostCitizen)',
        title: '帝都留守平民',
        role: 'story',
        roleText: '市民见闻 (🎭 肖像实装)',
        dialogue: '“我们总说皇帝会保护这座城。现在宫里的命令只剩下回音。有些话到了嘴边，我还是先看看四周，再慢慢说。”',
        locationDetail: '永曜帝都广场 · 西南街角'
      },
      {
        id: 'npc_em_rebel',
        name: '叛军暗哨 · 近卫 (RebelGuard)',
        title: '帝都反抗军隐秘哨卫',
        role: 'story',
        roleText: '暗哨赠礼 (🎭 肖像实装)',
        dialogue: '“内廷的钥匙卡在我这里。神将军仍奉命守着御座，但我已经很久没见皇帝亲自走出那道门。听见命令就答应，几乎成了本能。现在我总得先问问自己，这真是我愿意的吗？”',
        locationDetail: '永曜帝都废墟 · 暗巷拐角隐秘处 (RebelGuard)'
      },
      {
        id: 'npc_em_disarmed_guard',
        name: '卸甲卫兵 (DisarmedGuard)',
        title: '帝都放下武器的守卫',
        role: 'story',
        roleText: '近卫引路 (🎭 肖像实装)',
        dialogue: '“我已放下武器。西侧侧殿还有一名近卫愿意帮助你们。手垂在身边还不自在，总想去摸腰侧。那一下伸出去，我又慢慢收回来。”',
        locationDetail: '永曜帝都广场 · 东南巡游点 (empire_capital 832, 704)'
      },
      {
        id: 'npc_f_porter',
        name: '货运工 (Porter)',
        title: '战舰军备货运工',
        role: 'story',
        roleText: '军备货运 (🎭 肖像实装)',
        dialogue: '“这些货箱全送去南面的战舰。听说核心守卫能把钢门砸穿。扛箱前先把肩上的垫布折齐，受力偏一点，半天下来就得酸得直不起腰。”',
        locationDetail: '织造机械城 · 工坊货运站前'
      },
      {
        id: 'npc_f_gatewatcher',
        name: '下夜班的守门人 (GateWatcher)',
        title: '工坊街守门巡夜人',
        role: 'story',
        roleText: '工坊守门 (🎭 肖像实装)',
        dialogue: '“白天黑夜只看汽笛。东北是实验厅，中央街南端才通向城外。换班时，我最怕漏掉一句交代。人困得眼皮打架，门上的事也不能含糊。”',
        locationDetail: '织造机械城 · 工坊东门岗亭'
      },
      {
        id: 'npc_em_clockkeeper',
        name: '停钟看守 (Clockkeeper)',
        title: '永曜帝都钟楼看守',
        role: 'story',
        roleText: '停钟看守 (🎭 肖像实装)',
        dialogue: '“大钟停在裂口出现的时刻。修好它，也不能让那一刻从未发生。擦钟面时，我还按着从前的顺序，从上到下，一处也不肯省。”',
        locationDetail: '永曜帝都 · 西侧钟塔基座'
      },
      {
        id: 'npc_h_coretechnician',
        name: '船坞技师 (CoreTechnician)',
        title: '战舰主动力舱维保技师',
        role: 'story',
        roleText: '战舰技工 (🎭 阶段肖像实装)',
        dialogue: '“主动力已被切断。剩下的航行权限交给你们，别再把船用来抓人。指节里的机油得慢慢搓。活干得再急，收工洗手时，我倒不怕费这点工夫。”',
        locationDetail: '未完工战舰 · 动力核心舱室 (heliogabalus 928, 576)'
      },
      {
        id: 'npc_f_ledger_clerk',
        name: '工时记录员 (LedgerClerk)',
        title: '工坊街工时名册记录员',
        role: 'story',
        roleText: '名册记录 (🎭 肖像实装)',
        dialogue: '“账上写的是产量，我在背面偷偷记下每个人的名字。产量少一格就要重算，可名字少一个，账面上却看不出差别。我不想也装作看不见。失踪者的名册还在，停机后总算能去找他们了；有些名字我写了又看，总得让来找人的人知道，我们记得。”',
        locationDetail: '织造机械城 · 工坊街区石路旁'
      },
      {
        id: 'npc_f_injured_worker',
        name: '包扎中的劳工 (InjuredWorker)',
        title: '工坊区伤残劳工',
        role: 'story',
        roleText: '工坊伤工 (🎭 肖像实装)',
        dialogue: '“齿轮卷走了半只袖子。医务台没有药，只给了一张继续上工的纸。这边的袖口我不敢再往下放，抬手时总要先捏一捏，生怕又勾住什么。”',
        locationDetail: '织造机械城 · 工坊区石路 (factory_city 800, 744)'
      },
      {
        id: 'npc_em_palace_messenger',
        name: '宫门传令员 (PalaceMessenger)',
        title: '永曜帝都宫门传令哨',
        role: 'story',
        roleText: '宫门传令 (🎭 肖像实装)',
        dialogue: '“神将军还守着内廷，别直接去东北裂隙。话到了嘴边，我的喉咙就发紧。越怕漏掉要紧的字，越得先把这口气喘匀。”',
        locationDetail: '永曜帝都 · 宫门大道北段 (empire_capital 928, 288)'
      },
      {
        id: 'npc_em_evacuation_clerk',
        name: '疏散书记 (EvacuationClerk)',
        title: '永曜帝都避难登记员',
        role: 'story',
        roleText: '避难书记 (🎭 肖像实装)',
        dialogue: '“先登记活着的人，再清点财产。不能再把这个顺序弄反了。问名字时放慢一点，有人紧张得连自己的姓都说不清。先让他坐稳，我再落笔。”',
        locationDetail: '永曜帝都 · 广场避难点 (empire_capital 928, 400)'
      },
      {
        id: 'npc_em_bread_distributor',
        name: '分粮人 (BreadDistributor)',
        title: '永曜帝都平民配给员',
        role: 'story',
        roleText: '配给分粮 (🎭 肖像实装)',
        dialogue: '“先给孩子，再给伤员。下一筐马上来。我把篮子往里挪些，好让等着的人避开风口。能少挨一阵冷，就少挨一阵吧。”',
        locationDetail: '永曜帝都 · 南侧物资分发点 (empire_capital 1056, 736)'
      }
    ],
    shops: [
      {
        id: 'shop_factory_guns',
        name: '帝国重装火炮与枪械库',
        shopType: 'weapon',
        shopTypeName: '高科技机械军械',
        keeperName: '齿轮改装商',
        description: '销售带有齿轮联动与魔导充能的高杀伤力远程武器。坐落于织造城·齿轮工坊独立室内 (FactoryGearWorkshop 496, 552)。',
        items: [
          { id: 'steam_rifle', name: '蒸汽动力步枪', type: 'weapon', typeText: '火铳', price: 2500, effect: '攻击力 +68，命中率 100%，忽视目标 15% 物理防御' },
          { id: 'saw_blade', name: '合金齿轮重锯刃', type: 'weapon', typeText: '双手剑', price: 3000, effect: '攻击力 +85，暴击率 +20%，攻击附带【流血】' },
          { id: 'magitek_blaster', name: '魔导雷光突击铳', type: 'weapon', typeText: '魔导枪', price: 4200, effect: '攻击力 +92，附带全域 40 点雷属性固定震荡伤害' }
        ]
      },
      {
        id: 'shop_factory_armor',
        name: '泰坦合金重装防护工坊',
        shopType: 'armor',
        shopTypeName: '重装甲与防爆具',
        keeperName: '动力铠装配员',
        description: '由帝国流水线冶炼的军用高强度复合钢甲。坐落于织造城·齿轮工坊独立室内 (FactoryGearWorkshop 784, 552)。',
        items: [
          { id: 'power_suit', name: 'Mark-IV 动力装甲', type: 'armor', typeText: '重机铠', price: 4000, effect: '物理防御 +55，最大生命值 HP +300，力量 +5' },
          { id: 'titan_helm', name: '防爆精钢重盔', type: 'armor', typeText: '头盔', price: 1800, effect: '物理防御 +22，完全免疫战斗中的【混乱】状态' },
          { id: 'alloy_shield', name: '复合合金防爆盾', type: 'armor', typeText: '大盾', price: 2200, effect: '格挡率 +22%，承受物理冲击减免 25%' }
        ]
      },
      {
        id: 'shop_factory_medic',
        name: '织造城·劳工救济药房',
        shopType: 'item',
        shopTypeName: '工矿常备药品',
        keeperName: '救济药师',
        description: '坐落于织造城工坊北院独立室内【劳工救济药房 (FactoryAidPharmacy 640, 400)】，为机械劳工调配平价恢复药水与解毒剂。',
        items: [
          { id: 'potion', name: '恢复药 (Potion)', type: 'item', typeText: '基础药水', price: 50, effect: '单体恢复 50 HP' },
          { id: 'antidote', name: '解毒草 (Antidote)', type: 'item', typeText: '解毒药剂', price: 100, effect: '解除战斗与地图上的猛毒状态' },
          { id: 'eye_drops', name: '眼药水 (Eye Drops)', type: 'item', typeText: '明目眼药', price: 80, effect: '解除重度烟尘引起的失明/暗黑状态' }
        ]
      },
      {
        id: 'shop_capital_relief_inn',
        name: '永曜帝都·救济所宿屋',
        shopType: 'inn',
        shopTypeName: '休整避难所',
        keeperName: '救济所管事',
        description: '为流离失所的帝都平民与伤兵提供床位休整与基础餐食补给。',
        items: [
          { id: 'inn_capital_relief', name: '全队救济所床位休整 (100 G)', type: 'special', typeText: '休整服务', price: 100, effect: '全队生命值 HP、魔法值 MP 完全回满，并解除一切异常状态' }
        ]
      },
      {
        id: 'shop_capital_medic_house',
        name: '永曜帝都·街角药铺 (CapitalMedicHouse)',
        shopType: 'item',
        shopTypeName: '帝都常备救济药材',
        keeperName: '帝都药师 (ImperialMedic)',
        description: '位于永曜帝都东路尽端院工坊风格楼内的安全药舍，门楣挂有第 21 处原生“道具店”矢量标牌，提供 5 款常备精制药。',
        items: [
          { id: 'gold_needle', name: '金针 (Gold Needle)', type: 'item', typeText: '恢复药品', price: 150, effect: '解除石化状态，使角色重获行动能力' },
          { id: 'ether', name: '以太 (Ether)', type: 'item', typeText: '魔法恢复', price: 400, effect: '恢复单体角色 50 点魔法值 MP' },
          { id: 'elixir', name: '万灵药 (Elixir)', type: 'item', typeText: '强效秘药', price: 500, effect: '瞬间恢复单体角色全部生命值 HP 与魔法值 MP' },
          { id: 'remedy', name: '万能药 (Remedy)', type: 'item', typeText: '综合解药', price: 300, effect: '解除除战斗不能外的所有异常状态' },
          { id: 'phoenix_down', name: '凤凰尾羽 (Phoenix Down)', type: 'item', typeText: '复活圣物', price: 80, effect: '复活一名处于战斗不能阵亡状态的同伴' }
        ]
      }
    ],
    monsters: [
      { id: 'imperial_magitek', name: '帝国重装自走炮', level: 22, hp: 350, weakness: '雷属性、学者破甲击', rank: 'normal', dropItem: '合金齿轮、以太药水' },
      { id: 'ff1_pr_002', name: '魔导发条士兵', level: 24, hp: 280, weakness: '雷电法术、贯通打击', rank: 'normal', dropItem: '发条弹簧、高级药水' },
      { id: 'boss_archeoaevis', name: '原型防卫者 (Archeoaevis)', level: 30, hp: 2800, weakness: '多阶段属性转换 (火/冰/雷/风轮转)', rank: 'boss', dropItem: '原型核心芯片、飞空艇龙骨' }
    ]
  },
  {
    id: 'sand_moon_bazaar',
    name: '砂之月都 (Sand Moon)',
    type: 'capital',
    typeName: '沙漠绿洲与暗流黑市',
    region: '塔克拉荒漠绿洲腹地',
    tier: 'T2',
    tierName: '荒漠都城 (Lv.25~35)',
    climate: '昼夜温差极大 · 黄沙漫天',
    recommendedLevel: 28,
    isSafeZone: true,
    description: '掩映在巨大棕榈树与金字塔阴影下的繁华沙漠都市。不仅拥有纸醉金迷的舞娘歌舞厅与地下赌场，更是全域西域香料与刺客神兵的流转中心。',
    features: [
      '拥有沙漠行商地下黑市交易所',
      '提供舞娘刺客专属轻甲与敏捷护符',
      '周边连通荒芜金字塔与封印石板古墓',
      '新增侧室：【沙月剧场·伴舞休息室 (SandStageLounge)】与【月影客栈 (Moon Inn)】独立宿屋 (80 G)',
      '绿洲市井肖像实装：【绿洲送水人 (WaterCarrier)】、【驼队护卫 (CaravanGuard)】与【街头鼓手 (StreetMusician)】基于地点弱绑定接入官方中性对白肖像',
      '商队账房肖像实装：【商队账房 (MarketClerk)】接入经典差旅文书中性对白肖像',
      '阶段剧情肖像实装：【贫民区·摩陀雅 (MotoyaAtSlum)】剧场领袖阶段（ch07_stage_leader至ch07_massacre）弱绑定接入舞娘领袖中性肖像',
      '情报暗流肖像实装：【砂之月都·掮客 (Broker)】集市暗角基于地点弱绑定接入官方军需官中性对白肖像',
      '舞娘首领多形态肖像实装：【舞娘首领·摩陀雅 (Motoya / MotoyaReturn)】大剧场舞台与反攻集市返城两大原节点全量支持专属中性立绘，多节点声明严格校验',
      '贫民据点肖像实装：【据点幸存者 (Survivor)】沙月贫民区接入同款拾荒者官方中性肖像',
      '驼队护具铺独立接线实装：【沙月城·驼队护具铺 (SandMoonArmorHouse)】全域第 111 处独立安全室内！绿洲东路新辟 96 宽短桥与尽端东院（1728×960），驼队商铺立面挂载第 22 处“防具店”专属商业标牌，护具商乔迁室内柜台提供 5 款轻重护具',
      '驼队香料铺独立接线实装：【沙月城·驼队香料铺 (SandMoonSpiceHouse)】全域第 112 处独立安全室内！沙月绿洲东侧独立院驼队商铺立面挂载第 23 处“道具店”专属商业矢量标牌 (shop_sign: item)，香料商人乔迁室内柜台 (640, 400) 提供异域香料、万能药与特级以太',
      '剧场伴舞线索肖像实装：【剧场伴舞 (StageDancer)】沙月大剧场后台对白正式接入官方中性肖像 (stage-dancer-neutral.png)',
      '沙漠乞丐线索肖像实装：【装瞎的老乞丐 (Beggar / npc_s_beggar)】沙月集市100G施舍与暗门线索对白正式接入官方中性肖像 (beggar-neutral.png)，收据分相展示与系统付款提示精准清脸'
    ],
    image: '/images/party-menu.png',
    npcs: [
      {
        id: 'npc_s_beggar',
        name: '装瞎的老乞丐 (Beggar)',
        title: '沙月城集市流浪汉',
        role: 'story',
        roleText: '暗门线索 (🎭 专属肖像分相绑定)',
        dialogue: '“眼睛不方便，有时才看得见真东西。西南墙根的暗门通向帝国旧军火藏室，里面的护盾指环还能用。”',
        locationDetail: '砂之月都 · 贫民窟北侧残墙根 (Beggar)'
      },
      {
        id: 'npc_s_dancer',
        name: '剧场伴舞 · 莎拉 (StageDancer)',
        title: '沙月大剧场台柱伴舞',
        role: 'story',
        roleText: '剧场线索 (🎭 肖像实装)',
        dialogue: '“摩陀雅团长在后台更衣室休息。待会儿开场的时候，记得坐在离乐台最近的位置哦。”',
        locationDetail: '沙月大剧场 · 后台更衣室长廊前 (StageDancer)'
      },
      {
        id: 'npc_s_armorer',
        name: '驼队护具商 (CaravanArmorer)',
        title: '沙月绿洲防具行掌柜',
        role: 'merchant',
        roleText: '沙漠护具',
        dialogue: '“大漠的风沙比刀刃还锋利。带上这套双层防沙皮甲，既能抵御毒蝎利爪，也能在沙暴中保住性命。”',
        locationDetail: '沙月城东侧尽端院 · 驼队护具铺室内柜台前 (SandMoonArmorHouse 640, 400)'
      },
      {
        id: 'npc_dancer_mothoya',
        name: '舞娘首领 · 摩陀雅 (Motoya / npc_s_matoya)',
        title: '沙月绿洲明珠',
        role: 'story',
        roleText: '刺客向导 (🎭 多形态肖像实装)',
        dialogue: '“我以歌舞掩护信使，以舞台遮住据点。欢迎来到沙月。开场前，我喜欢让手指在掌心轻轻点几下，那一点期待总让我忍不住扬起嘴角；阿斯摩还在这条街上，陪我把未走完的舞步走完，脚尖落下去心里那一下却总慢半拍，我知道自己还在发抖，可这一回不想低头；舞者的传承交给你们，跟着节拍呼吸眼眶还是会热，我不急着把泪忍回去，难过也有它该占的位置。”',
        locationDetail: '沙月大舞台后台更衣室 / 反攻后返城集市 (MotoyaReturn)'
      },
      {
        id: 'npc_s_dancer_a',
        name: '伴舞女郎 (Dancer)',
        title: '沙月剧场领舞使',
        role: 'story',
        roleText: '舞步传授',
        dialogue: '“听清拍子再落脚。舞步与刀锋一样，节奏乱了就容易丢掉性命。”',
        locationDetail: '沙月剧场侧室 · 伴舞休息室 (SandStageLounge)'
      },
      {
        id: 'npc_gold_tooth',
        name: '赌场大亨 · 金牙',
        title: '地下钱庄黑市掌控者',
        role: 'merchant',
        roleText: '暴富交易',
        dialogue: '“只要你有足够的金币，就算是封印神庙的钥匙，我都能给你弄来半把！”',
        locationDetail: '地下黑市贵宾包厢'
      },
      {
        id: 'npc_spice_trader',
        name: '西域香料商人 (SpiceMerchant)',
        title: '沙月绿洲香料行掌柜',
        role: 'merchant',
        roleText: '沙漠香料补给',
        dialogue: '“大漠的风会吹乱神志。异域香料、万能药和特级以太都在这里。”',
        locationDetail: '沙月城东侧独立院 · 驼队香料铺室内柜台前 (SandMoonSpiceHouse 640, 400)'
      },
      {
        id: 'npc_moon_innkeeper',
        name: '月影客栈主人 (MoonInnkeeper)',
        title: '沙月避风客栈掌柜',
        role: 'inn',
        roleText: '客栈休整 (80 G)',
        dialogue: '“风沙大，床铺还干净。住一晚 80 G，醒来再赶路。”',
        locationDetail: '沙月城 · 月影客栈 (MoonInn)'
      },
      {
        id: 'npc_s_azar',
        name: '学者阿扎尔 (ScholarAzar)',
        title: '流亡历史学者',
        role: 'story',
        roleText: '剧场见闻 (🎭 肖像实装)',
        dialogue: '“我先去据点守门。你们跟着摩陀雅，她知道每一个人的退路。我闲着反倒不自在，有个该守的位置，心里才踏实。只是站得再认真，也改不了性子急。”',
        locationDetail: '沙月大剧场 · 观众席石阶 (SandStage)'
      },
      {
        id: 'npc_s_watercarrier',
        name: '绿洲送水人 (WaterCarrier)',
        title: '月都绿洲汲水夫',
        role: 'story',
        roleText: '绿洲汲水 (🎭 肖像实装)',
        dialogue: '“一桶水要走两条街。大剧场的客人嫌它温，我们舍不得洒一滴。走到拐角，我总要先收住半步。桶里的水晃一下，手上就知道这一路走急了。”',
        locationDetail: '砂之月都 · 绿洲井台南街'
      },
      {
        id: 'npc_s_caravanguard',
        name: '驼队护卫 (CaravanGuard)',
        title: '荒漠商路行商护卫',
        role: 'story',
        roleText: '商道护送 (🎭 肖像实装)',
        dialogue: '“沙暴来时别追着灯走。商队留下的车辙，比传言可靠。风小的时候，我就把领口里的沙抖净。不然磨到天黑，脖子上又是一圈红。”',
        locationDetail: '砂之月都 · 驼队集市北口'
      },
      {
        id: 'npc_s_streetmusician',
        name: '街头鼓手 (StreetMusician)',
        title: '剧场外环流浪乐手',
        role: 'story',
        roleText: '街头演奏 (🎭 肖像实装)',
        dialogue: '“台上有人踩错拍子，台下却总有人接住。愿今晚也是这样。鼓皮绷得紧，声音才清。我收摊先把它盖好，不能任夜里的潮气糟蹋。”',
        locationDetail: '砂之月都 · 剧场外环街角'
      },
      {
        id: 'npc_s_market_clerk',
        name: '商队账房 (MarketClerk)',
        title: '沙月绿洲商队账房',
        role: 'story',
        roleText: '商队账目 (🎭 肖像实装)',
        dialogue: '“这里没有统一的税单，只有永远填不平的账。风一吹，纸角就往回卷。我拿手肘压着这边，另一只手还得追着写字。”',
        locationDetail: '砂之月都 · 集市账台旁 (800, 400)'
      },
      {
        id: 'npc_s_motoya_slum',
        name: '摩陀雅·贫民区阶段 (MotoyaAtSlum)',
        title: '沙月避难领袖形态',
        role: 'story',
        roleText: '避难抚慰 (🎭 阶段肖像实装)',
        dialogue: '“他的手还没有冷。先告诉我，还有多少人走出去了。我低着头，眼前的东西总是模糊。想抬眼看清些，却连那一下都觉得费力。”',
        locationDetail: '砂之月都 · 贫民区土房前 (sand_moon_slum 800, 400)'
      },
      {
        id: 'npc_s_broker',
        name: '情报掮客 (Broker)',
        title: '沙月绿洲地下线人',
        role: 'story',
        roleText: '情报掮客 (🎭 肖像实装)',
        dialogue: '“歌声最响的地方，最适合悄悄说话。东北的绿洲剧场，找摩陀雅。我总爱先看人的眼神，急着开价往往就把真正要紧的东西看漏了；口令传得太快了，手指还惯着点钱的动作，一低头就觉得难堪，原来有些账怎么数都不是那个数；今天的消息不收钱，不谈价钱倒觉得两只手没处放，空着也好，省得又把什么都掂出个价来。”',
        locationDetail: '砂之月都 · 集市暗角 (sand_moon 560, 400)'
      },
      {
        id: 'npc_s_survivor',
        name: '据点幸存者 (Survivor)',
        title: '沙月避难据点生还者',
        role: 'story',
        roleText: '避难坚守 (🎭 肖像实装)',
        dialogue: '“阿扎尔守住了后门，其他人才逃出去。摩陀雅一直握着他的手。我老觉得自己还在喘，明明已经停下来了，腿一松就发软，连站直都得一点一点来；最后一道命令不是进攻，是让我们活下去，活着两个字听着简单，轮到自己心里却沉甸甸的，我还得慢慢学着站稳。”',
        locationDetail: '砂之月都 · 贫民区据点角 (sand_moon_slum)'
      }
    ],
    shops: [
      {
        id: 'inn_moon_inn',
        name: '月影客栈 (Moon Inn)',
        shopType: 'inn',
        shopTypeName: '大漠避风宿屋 (80 G)',
        keeperName: '月影客栈主人',
        description: '黄沙漫天中的安歇之所，提供舒适床铺与全队体力与魔力完全休整。',
        items: [
          { id: 'inn_stay_80g', name: '大漠客房留宿', type: 'special', typeText: '旅舍休整', price: 80, effect: '全队生命值 HP 与魔力值 MP 完全恢复满额，消除全部异常状态' }
        ]
      },
      {
        id: 'shop_sand_spices',
        name: '绿洲香料与清凉甘泉铺',
        shopType: 'item',
        shopTypeName: '沙漠耐热补给品',
        keeperName: '西域香料商人',
        description: '提供抵御荒漠烈日、治疗中暑与全队神圣净化之水。',
        items: [
          { id: 'cactus_juice', name: '沙漠仙人掌甘露', type: 'item', typeText: '恢复剂', price: 100, effect: '单体恢复 250 点 HP，并解除【缓速 (Slow)】状态' },
          { id: 'holy_water', name: '纯净圣水 (Holy Water)', type: 'item', typeText: '圣物', price: 300, effect: '对不死系魔物造成 2000 点必中神圣灼伤，并解除【僵尸/诅咒】' },
          { id: 'mega_potion', name: '超级恢复药 (X-Potion)', type: 'item', typeText: '神药', price: 1500, effect: '单体生命值 HP 瞬间 100% 满额完全恢复' }
        ]
      },
      {
        id: 'shop_sand_weapons',
        name: '大马士革金刃行',
        shopType: 'weapon',
        shopTypeName: '弯刀与刺杀暗刃',
        keeperName: '金牙的亲信',
        description: '薄如蝉翼、吹毛断发的中东风格极品弧刀。',
        items: [
          { id: 'scimitar', name: '大马士革弯刀', type: 'weapon', typeText: '弯刀', price: 4800, effect: '攻击力 +76，暴击倍率 2.5 倍，忍者/游侠通用' },
          { id: 'sand_dagger', name: '沙皇刺客晶刃', type: 'weapon', typeText: '匕首', price: 5200, effect: '攻击力 +70，敏捷 +8，攻击有 20% 几率附加【盲目与即死】' },
          { id: 'fire_whip', name: '烈焰舞娘长鞭', type: 'weapon', typeText: '软兵器', price: 4500, effect: '攻击力 +65，后排全额命中，火属性伤害，魔兽使专用' }
        ]
      },
      {
        id: 'shop_sand_moon_armor_house',
        name: '沙月城·驼队护具铺 (SandMoonArmorHouse)',
        shopType: 'armor',
        shopTypeName: '沙月驼队商行防具',
        keeperName: '驼队护具商 (CaravanArmorer)',
        description: '位于沙月绿洲城东路尽端院驼队立面商铺内的安全护具舍，门楣挂有全域第 22 处原生“防具店”矢量标牌，提供 5 款防风沙护甲。',
        items: [
          { id: 'leather_armor', name: '厚质皮胸甲', type: 'armor', typeText: '轻甲', price: 120, effect: '物理防御 +8，回避率 +2%，适合游侠与武僧' },
          { id: 'bronze_mail', name: '青铜锁子甲', type: 'armor', typeText: '重甲', price: 280, effect: '物理防御 +16，物理伤害减免 +5%' },
          { id: 'leather_cap', name: '粗织皮帽', type: 'armor', typeText: '头盔', price: 60, effect: '物理防御 +4，魔法防御 +2' },
          { id: 'bronze_shield', name: '青铜圆盾', type: 'armor', typeText: '盾牌', price: 100, effect: '格挡率 +8%，防御力 +6，防弹反基础' },
          { id: 'desert_robe', name: '沙漠旅人防沙长袍', type: 'armor', typeText: '法袍', price: 180, effect: '物理防御 +6，魔法防御 +12，火与风属性伤害减免 15%' }
        ]
      },
      {
        id: 'shop_sand_moon_spice_house',
        name: '沙月城·驼队香料铺 (SandMoonSpiceHouse)',
        shopType: 'item',
        shopTypeName: '西域驼队特色香料与药剂',
        keeperName: '西域香料商人 (SpiceMerchant)',
        description: '位于沙月绿洲东侧独立院落驼队商铺新立面内的全域第 112 处独立安全室内，门上挂载全域第 23 处原生“道具店”商业矢量招牌 (shop_sign: item)，专供异域沙月香料、万能药与特级以太。',
        items: [
          { id: 'item_sand_moon_spice', name: '沙月异域香料 (30)', type: 'item', typeText: '特效消耗品', price: 180, effect: '沙月城大漠特产香料，驱散大漠风沙侵袭与迟滞迷乱' },
          { id: 'item_panacea', name: '万能药 (12)', type: 'item', typeText: '全状态恢复', price: 300, effect: '解除除战斗不能外的一切异常状态' },
          { id: 'item_hi_ether', name: '特级以太 (5)', type: 'item', typeText: '高阶魔力药水', price: 400, effect: '恢复 150 点魔法值 MP，探险与施法持久战必需品' }
        ]
      }
    ],
    monsters: [
      { id: 'sand_basilisk', name: '砂原石化蜥', level: 18, hp: 220, weakness: '冰属性、火属性', rank: 'normal', dropItem: '蜥蜴眼珠、金针' },
      { id: 'black_skeleton', name: '漆黑骷髅兵', level: 19, hp: 190, weakness: '圣属性、火属性、圣水', rank: 'normal', dropItem: '骨片、高级药水' },
      { id: 'scorpion_stalker', name: '狂暴猎杀巨蝎', level: 20, hp: 240, weakness: '冰属性、风属性', rank: 'normal', dropItem: '剧毒蝎尾、解毒草' },
      { id: 'boss_omniscient', name: '全知之神 (Omniscient)', level: 38, hp: 16999, weakness: '只受魔法攻击反击 (若受物攻则全体归零Reset)', rank: 'boss', dropItem: '全知魔导冠、圣灵药' }
    ]
  },
  {
    id: 'mysidia_magic_city',
    name: '米西迪亚古都 (Mysidia)',
    type: 'capital',
    typeName: '古代大魔法学术圣殿',
    region: '隐世星象半岛',
    tier: 'T3',
    tierName: '秘法神殿 (Lv.35~50)',
    climate: '星辉斑斓 · 魔法粒子共鸣',
    recommendedLevel: 40,
    isSafeZone: true,
    description: '历经千年未曾衰落的终极魔法学府与大图书馆。全大陆最为精湛的高阶白魔法、黑魔法、时空魔法与召唤术均诞生于此。',
    features: [
      '设立全大陆最全的 6 阶法术交易所与独立讲堂回廊',
      '拥有占星观星台与大图书档案馆',
      '学术课堂更新：【秘法都·白魔讲堂 (mysidia_white_hall)】大导师白眉专席，研习大回复、完全复活与神圣术',
      '学术课堂更新：【秘法都·黑魔回廊 (mysidia_black_corridor)】黑袍导师专席，研习大火炎、大暴雪与核爆禁咒',
      '魔法讲堂实体立面与标牌升级：【米西迪亚·白魔讲堂 (WhiteHallFacade)】与【黑魔回廊 (BlackCorridorFacade)】补齐 128×128 白蓝金象牙石魔导独立小立面（classroom-facade/single-1.png），门楣分别挂载全域第 25 处（白光十字 shop_sign: white_magic，偏移 -72, -140）与第 26 处（紫晶符文 shop_sign: black_magic，偏移 -72, -140）原生矢量用途标牌！隐藏旧地表传送碑 (PortalPad)，招牌置于前景 (z_index = 3) 避免柱冠遮挡，保留原传送门触发点 [384, 208] 与 [864, 208] 以及教师授课票据',
      '抄写楼学术立面统一收口：【秘法都·抄写室 (ArchiveBuilding)】由巨大天文望远镜外观收口切换为白蓝金象牙石 128×128 独栋学术小楼（classroom-facade/single-1.png，坐标 [200, 568]，碰撞 176×50），与白黑双讲堂实现建筑规制严谨统一，保留 ToArchive [200, 608] 入口与原坐标，书库管理员、校对学徒与昼隐手稿服务完好',
      '超古代构装遗迹延伸：【鲁菲尼亚·核心舱室 (Lufenia Core Chamber)】超古代文明工艺核心，双翼能量导管与中央构装机械',
      '首层秘法洞阶延伸：【米西迪亚·秘法洞厅 (Mysidia Cave Stair Hall)】石阶回廊与双秘法晶簇，安全探索洞厅',
      '秘法洞阶深层封藏：【秘法洞·禁书腔 (mysidia_cave_3)】由卷轴库东北通道深入，全域第 102 处独立安全参观舱，绕中央晶簇环列封藏书架',
      '访学独立院落与客栈实装：【秘法都·访学馆 (MysidiaGuestInn)】全域第 103 处独立安全室内！天穹城东侧新拓石桥与独立东院（1728×960），访学馆主乔迁室内前台提供 100 G 深度休整宿屋，支持 E 键取消、M 键离屋与院落无缝安全返回',
      '学城药铺独立室内落成：【秘法都·学城药铺 (MysidiaMedicHouse)】全域第 113 处独立安全室内！天穹城东院北侧独立石台（1728×960）挂载第 24 处“道具店”专属矢量标牌 (shop_sign: item)，学城药剂师乔迁室内柜台 (640, 400) 供应以太、特级以太、万灵药与万能药',
      '阶段支援肖像实装：【忆纱·协助形态 (YiShaSupport)】战役支援弱绑定帝国公民中性头像',
      '阶段支援肖像实装：【龙骑士苍岚 (CangLanSupport)】战后制空支援弱绑定接入龙骑士中性头像',
      '学徒书工肖像实装：【书卷搬运工 (BookPorter)】、【低年级学生 (Student)】与【校对学徒 (Copyist)】全量接入年轻学徒紫兜帽中性肖像',
      '学术与守望者肖像实装：【云桥守望者 (CloudSentry)】、【镜片保管员 (LensKeeper)】与【书库管理员 (Archivist)】基于地点弱绑定接入米西迪亚专属中性肖像',
      '逐边图精准避让升级：【移动寻路系统】集成 ClickMovePortalGraph 逐边图寻路算法，在保守整格余量失败后自动恢复安全合法窄路，确保秘法洞阶返点至世界出口通行无阻',
      '琴师导师服务肖像实装：【漂泊琴师 (WanderingPianist)】与弦月岛【老琴师诗人 (PianoMasterPoet)】全面接入官方中性肖像 (npc_p_priest-neutral.png)，八琴试炼奖励对白全景出脸',
      '琴圣领奖回执四段解耦：【漂泊琴师 / 老琴师诗人 (piano_master)】八琴试炼领奖反馈按换行拆分为四阶段事件，首段祝贺回话展现导师本人肖像，后续习得两曲、获得三件物品与 50 成就点三段系统回执精准清空肖像',
      '赠稿学徒肖像实装：【天象学徒昼隐 (ZhouYin)】接入深蓝短发蓝金法袍官方专属中性立绘 (zhouyin-neutral.png)，天象手稿赠礼对话全景出脸',
      '遗迹机械人肖像实装：【自律保洁机械人 / 维护机械人 (Automaton / npc_lu_automaton)】古魔道遗迹接入金铜机壳与蓝光眼窗官方 64×64 中性肖像 (automaton-neutral.png)，免费全队复苏与全状态充能恢复对话全景出脸',
      '驻守着传奇大魔道士与贤者长老'
    ],
    image: '/images/vfx-magitek.png',
    npcs: [
      {
        id: 'npc_my_scholar_medic',
        name: '学城药剂师 (ScholarMedic)',
        title: '秘法都草药调剂名宿',
        role: 'merchant',
        roleText: '学城药剂供应',
        dialogue: '“药剂师：学问要慢慢学，缺的药现在就补。”',
        locationDetail: '秘法都东院北侧石台 · 学城药铺室内柜台前 (MysidiaMedicHouse 640, 400)'
      },
      {
        id: 'npc_my_apprentice',
        name: '天象学徒 · 昼隐 (ZhouYin)',
        title: '米西迪亚观星台学徒',
        role: 'story',
        roleText: '赠稿学徒 (🎭 专属肖像实装)',
        dialogue: '“星盘的刻度又偏转了三分。这是导师整理的天象残稿，拿去吧，它会指引你们穿越迷雾中的星轨。”',
        locationDetail: '米西迪亚古都 · 观星台长廊前 (ZhouYin)'
      },
      {
        id: 'npc_mv_pianist',
        name: '漂泊琴师 (WanderingPianist)',
        title: '全大陆巡演琴师名宿',
        role: 'story',
        roleText: '琴音试炼 (🎭 肖像实装)',
        dialogue: '“踏遍大陆每一个角落，指尖才能弹奏出直抵灵魂的旋律。若你能寻得全部八架古琴，我将赠你失落的秘传曲谱。”',
        locationDetail: '米西迪亚天穹城 · 回廊乐台前 (WanderingPianist)'
      },
      {
        id: 'npc_elder_sophie',
        name: '索菲长老 (Sophie / npc_my_sophie)',
        title: '米西迪亚最高评议会长',
        role: 'leader',
        roleText: '法皇领袖 (🎭 肖像实装)',
        dialogue: '“两个月亮牵动的并不是潮水，而是我们脚下的晶石。先去观星台和抄写室，把两份资料带回来。我这把年纪，想事情还是爱较真，心里有个疑问，饭吃到一半也会惦记；攻城舰已经退去，贤者的传承交给你们，我也想寻个空安安稳稳喝完一杯茶，平日搁在手边往往想起来已经凉了。”',
        locationDetail: '长老院议事圣堂 (mysidia)'
      },
      {
        id: 'npc_archmage_white',
        name: '大导师 · 白眉 (Whitebrow)',
        title: '神圣白魔法宗师',
        role: 'merchant',
        roleText: '白魔法传承',
        dialogue: '“白眉：大回复、完全复活与神圣的共享教材已开放，购买后由符合白魔法资格的同伴施放；基础白魔法仍可复习。”',
        locationDetail: '秘法都·白魔讲堂 (mysidia_white_hall)'
      },
      {
        id: 'npc_archmage_black',
        name: '黑袍大魔道士 (BlackMaster)',
        title: '禁咒烈焰执掌者',
        role: 'merchant',
        roleText: '黑魔法传授',
        dialogue: '“黑袍导师：大火炎、大暴雪与核爆教材已开放，购买后由符合黑魔法资格的同伴施放；基础火冰法术仍在原柜台。”',
        locationDetail: '秘法都·黑魔回廊 (mysidia_black_corridor)'
      },
      {
        id: 'npc_astronomer',
        name: '时钟轮盘星术师',
        title: '天象观星监',
        role: 'story',
        roleText: '占星学者',
        dialogue: '“天顶双月的轨道正在发生逆旋！次元之隙即将撕裂，必须赶在时钟停摆前解封十二神兵！”',
        locationDetail: '天文台悬空星轨仪前'
      },
      {
        id: 'npc_m_yishasupport',
        name: '忆纱·战后协助 (YiShaSupport)',
        title: '战舰动力技术支援',
        role: 'story',
        roleText: '战役支援 (🎭 阶段肖像实装)',
        dialogue: '“我记得战舰的供能节奏。等炮口冷却的那一刻，再发出反击信号。一紧张，我就在心里慢慢数拍子。数到呼吸顺了，手心也就不那么凉。”',
        locationDetail: '米西迪亚天穹城 · 观星石台下'
      },
      {
        id: 'npc_m_canglan_support',
        name: '龙骑士苍岚 (CangLanSupport)',
        title: '战舰战后制空支援',
        role: 'story',
        roleText: '空域掩护 (🎭 阶段肖像实装)',
        dialogue: '“天空里的路我熟。你们准备结界，我来护住撤离的船。我总把肩背绷得太紧，站久了才觉出酸。想放松些，眼睛却还忍不住往远处看。（龙栖岭阶段：我总忍不住屏住气，过一会儿才发现胸口发闷；我总想往前凑，脚抬起来又收住，心里越挂念就越觉得这双手没处安放；有些话我说得太硬，想软下来时反倒不知怎么开口，只好先把那声谢说清楚。）”',
        locationDetail: '米西迪亚天穹城 · 云空廊桥下 (mysidia 736, 544)'
      },
      {
        id: 'npc_m_book_porter',
        name: '书卷搬运工 (BookPorter)',
        title: '学都典籍搬运工',
        role: 'story',
        roleText: '书卷搬运 (🎭 肖像实装)',
        dialogue: '“纸比石头轻，搬一城的纸也会压弯腰。我先救写着别人名字的那几箱。书箱一歪，里面的卷角就容易折。我宁可多跑一趟，也不把它们塞得太满。”',
        locationDetail: '米西迪亚天穹城 · 书库石阶前 (736, 704)'
      },
      {
        id: 'npc_m_student',
        name: '低年级学生 (Student)',
        title: '米西迪亚求学初阶生',
        role: 'story',
        roleText: '初阶研习 (🎭 肖像实装)',
        dialogue: '“老师说结界不是一道墙，是让大家都能撑到下一刻的约定。笔尖一顿就洇出墨团，我写完总要摊开手看看，怎么又沾了一指头黑。”',
        locationDetail: '米西迪亚天穹城 · 回廊中段 (480, 600)'
      },
      {
        id: 'npc_m_copyist',
        name: '校对学徒 (Copyist)',
        title: '抄写室校对助理',
        role: 'story',
        roleText: '文献校勘 (🎭 肖像实装)',
        dialogue: '“这里不是少了一个字，是两张来自不同世界的纸被订在了一起。两个看着一样的字，有时只差一笔。我宁可再对一遍，也不让错字跟着抄本传下去。”',
        locationDetail: '米西迪亚抄写室 · 抄录书案前 (864, 640)'
      },
      {
        id: 'npc_m_cloud_sentry',
        name: '云桥守望者 (CloudSentry)',
        title: '米西迪亚云桥哨位',
        role: 'story',
        roleText: '云桥哨卫 (🎭 肖像实装)',
        dialogue: '“东北航路被战舰截断了。观星台在西北，书库在西南。站久了脚底发麻，我就悄悄换一换重心，眼睛可不敢跟着偷懒。”',
        locationDetail: '米西迪亚天穹城 · 云桥东侧哨位 (mysidia 1056, 448)'
      },
      {
        id: 'npc_m_lens_keeper',
        name: '镜片保管员 (LensKeeper)',
        title: '天象观星台仪器保管员',
        role: 'story',
        roleText: '仪器维护 (🎭 肖像实装)',
        dialogue: '“镜片上的每一道划痕都得记下，否则误差会被错当成星体移动。我拿镜片只碰边沿，手再稳也得慢些，省得留下指印又多费一遍工。”',
        locationDetail: '米西迪亚观星台 · 仪器室 (mysidia_observatory 896, 608)'
      },
      {
        id: 'npc_m_archivist',
        name: '书库管理员 (Archivist)',
        title: '米西迪亚大书库图书管理员',
        role: 'story',
        roleText: '书库管理 (🎭 肖像实装)',
        dialogue: '“旧书带不走，抄本可以。书架背后留的那只补给箱，给替大家跑腿的人。书放回去前，我会捋平折起的页角。纸薄，经不起赶时间时那一下拉扯。”',
        locationDetail: '米西迪亚大书库 · 典籍内堂 (mysidia_archive 416, 640)'
      },
      {
        id: 'npc_m_guesthost',
        name: '访学馆主 (GuestHost)',
        title: '米西迪亚访学馆掌柜',
        role: 'inn',
        roleText: '访学宿屋 (100 G)',
        dialogue: '“床位给每一个赶路的人，留宿 100 G。”',
        locationDetail: '米西迪亚·访学馆室内 (house:MysidiaGuestInn 640, 400)'
      },
      {
        id: 'npc_lu_automaton',
        name: '自律保洁机械人 / 维护机械人 (Automaton)',
        title: '古魔道遗迹维护机体',
        role: 'inn',
        roleText: '遗迹充能休整 (🎭 专属肖像实装)',
        dialogue: '“正在为全队注入修复能量……充能完成。全队已经复苏，HP、MP 与异常状态均已恢复。”',
        locationDetail: '古魔道遗迹 · 核心维护终端前 (lufenia_ruins / Automaton)'
      }
    ],
    shops: [
      {
        id: 'shop_mysidia_guest_inn',
        name: '米西迪亚·访学馆 (Mysidia Guest Inn)',
        shopType: 'inn',
        shopTypeName: '学术交流避风宿屋 (100 G)',
        keeperName: '访学馆主',
        description: '位于秘法之都东侧独立院落的静谧学舍，为远道而来的学者与求道者提供 100 G 体力与魔力全满休整。',
        items: [
          { id: 'inn_rest_mysidia', name: '访学馆安眠休整 (Rest)', type: 'special', typeText: '休整服务', price: 100, effect: '全队生命值 HP、魔法值 MP 完全回满，解除所有异常状态' }
        ]
      },
      {
        id: 'shop_mysidia_medic_house',
        name: '秘法都·学城药铺 (MysidiaMedicHouse)',
        shopType: 'item',
        shopTypeName: '学城精制魔导药剂',
        keeperName: '学城药剂师 (ScholarMedic)',
        description: '位于秘法之都东院北侧独立石台白蓝金中性商楼内的全域第 113 处独立安全室内，门上挂载全域第 24 处原生“道具店”矢量招牌 (shop_sign: item)，常备调配供应 4 款高阶魔法探险药剂。',
        items: [
          { id: 'item_ether', name: '以太 (2)', type: 'item', typeText: '魔法恢复', price: 150, effect: '恢复单体角色 50 点魔法值 MP' },
          { id: 'item_hi_ether', name: '特级以太 (5)', type: 'item', typeText: '高阶魔力药水', price: 400, effect: '恢复单体角色 150 点魔法值 MP，施法者持久战必需品' },
          { id: 'item_elixir', name: '万灵药 (7)', type: 'item', typeText: '强效秘药', price: 500, effect: '瞬间恢复单体角色全部生命值 HP 与魔法值 MP' },
          { id: 'item_remedy', name: '万能药 (12)', type: 'item', typeText: '全状态恢复', price: 300, effect: '解除除战斗不能外的一切异常状态' }
        ]
      },
      {
        id: 'shop_mysidia_white_magic',
        name: '秘法都·白魔讲堂教材所',
        shopType: 'magic',
        shopTypeName: '白魔讲堂教材',
        keeperName: '大导师白眉',
        description: '白魔讲堂专设共享教材，传授恢复、解毒、大回复、全愈复活与神圣天光。',
        items: [
          { id: 'cure', name: '恢复术 (Cure)', type: 'magic', typeText: '1阶白魔法', price: 100, effect: '单体恢复 100 点生命值 HP' },
          { id: 'esuna', name: '解毒术 (Esuna)', type: 'magic', typeText: '1阶白魔法', price: 100, effect: '解除战斗中遭受的猛毒状态' },
          { id: 'curaga', name: '大回复 (Curaga)', type: 'magic', typeText: '3阶白魔法', price: 3000, effect: '消耗 18 MP，单体恢复 2500+ 生命值，对不死系等额神圣斩击' },
          { id: 'mysidia_arise', name: '完全复活 (Arise)', type: 'magic', typeText: '5阶白魔法', price: 5000, effect: '消耗 36 MP，起死回生并恢复单体同伴 100% 全部生命值' },
          { id: 'mirage_holy', name: '神圣术 (Holy)', type: 'magic', typeText: '6阶神圣魔法', price: 10000, effect: '消耗 40 MP，召唤神圣光柱对全体敌人造成破邪毁灭打击' }
        ]
      },
      {
        id: 'shop_mysidia_black_magic',
        name: '秘法都·黑魔回廊教材所',
        shopType: 'magic',
        shopTypeName: '黑魔回廊教材',
        keeperName: '黑袍大魔道士',
        description: '黑魔回廊专设共享教材，传授初级火冰与进阶大火炎、大暴雪及终极核爆禁咒。',
        items: [
          { id: 'fire', name: '初级火焰 (Fire)', type: 'magic', typeText: '1阶黑魔法', price: 100, effect: '单体火属性弱魔法攻击' },
          { id: 'hail', name: '初级冰冻 (Hail/Blizzard)', type: 'magic', typeText: '1阶黑魔法', price: 100, effect: '单体冰属性弱魔法攻击' },
          { id: 'mysidia_firaga', name: '大火炎 (Firaga)', type: 'magic', typeText: '3阶黑魔法', price: 4500, effect: '消耗 25 MP，造成全体巨额火属性核热魔法爆破' },
          { id: 'mysidia_blizzaga', name: '大暴雪 (Blizzaga)', type: 'magic', typeText: '3阶黑魔法', price: 4500, effect: '消耗 25 MP，造成全体冰结零度暴风雪打击' },
          { id: 'mirage_flare', name: '核爆禁咒 (Flare)', type: 'magic', typeText: '6阶终极黑魔法', price: 12000, effect: '消耗 45 MP，无属性毁灭穿甲打击，不被任何元素抗性抵消' }
        ]
      }
    ],
    monsters: [
      { id: 'ancient_golem', name: '远古石像魔像', level: 38, hp: 1200, weakness: '雷属性、破甲特技', rank: 'normal', dropItem: '古代石板碎片、大恢复药' },
      { id: 'void_fiend', name: '虚空裂口裂隙魔', level: 40, hp: 850, weakness: '圣属性、光魔法', rank: 'normal', dropItem: '虚空微粒、超级以太' },
      { id: 'boss_byblos', name: '毕普洛斯 (Byblos)', level: 42, hp: 3600, weakness: '火属性极度致命 (火系法术伤害翻倍)', rank: 'boss', dropItem: '魔导书卷轴、以太圣水' }
    ]
  },
  {
    id: 'phantom_village_haven',
    name: '幻影之村 & 黄昏庇护所',
    type: 'sanctuary',
    typeName: '次元裂隙隐世避难黑市',
    region: '两界次元夹缝空间',
    tier: 'T4',
    tierName: '终焉圣所 (Lv.55~99+)',
    climate: '虚无静谧 · 时间长河冻结',
    recommendedLevel: 65,
    isSafeZone: true,
    description: '隐藏于时空裂隙深处的超空间避难村落。时间在此停滞，汇聚了自古代以来失落的最强神兵、禁忌黑市防具与黑陆行鸟栖息地。',
    features: [
      '全大陆最强顶级地下黑市武器与源氏套',
      '柜台暗窗贩售核爆与神圣级终极魔法',
      '黑陆行鸟可穿越任何深山密林直达终焉核心',
      '海外影乡建筑扩展：【影乡·忍具隐屋 (shadow_hideout)】门楣挂载“忍具店”原生矢量看板与走近动态遮挡，出售火水遁卷轴与风魔手里剑',
      '黄昏营地设施补全：【黄昏界·避难宿舍 (twilight_shelter)】西侧帐篷挂载“休息睡眠”宿屋牌，提供 60 G 简易床位与热水休整',
      '两界信使与裂口守卫肖像实装：【跨界信使】、【补给搬运员】、【裂口哨兵】、【测绘信使】、【研究助手】与【断后斥候】全量接入紫风帽信使中性肖像',
      '黄昏界与新晶石居民肖像实装：【寻亲人】、【姓名登记员】、【补毯人】、【疲惫的避难者】、【裂口归来者】、【营地修补匠】、【晶石观测员】与【两界旅人】接入中性肖像',
      '影乡村民肖像实装：【竹林哨兵】、【摆渡人】、【竹编匠】、【影乡学徒】、【煮茶人】与【侍药人】接入官方影乡中性对白肖像',
      '时空裂口前沿引导肖像实装：【索菲长老 (SophieEnvoy)】裂口前哨指引点接入索菲长老兜帽中性肖像',
      '开路战士与营地情报肖像全覆盖：【瓦达 (VataLast/Vata)】狭缝开路与时空营地特殊情报服务对白全面接入银青战甲配披肩官方 64×64 中性肖像 (vata-neutral.png)，节点变体全景覆盖',
      '宿敌忍者肖像实装：【影枫 (Kageki)】影之孤岛接入遮面覆面额带官方 64×64 中性肖像 (kageki-neutral.png)',
      '竹叶药屋独立接线实装：【影乡·竹叶药屋 (ShadowHerbHouse)】全域第 108 处独立安全室内！横路东侧开辟 96 宽短桥与独立尽端东院（1728×960），采药人乔迁室内柜台，门上挂载第 19 处“道具店”商业标牌提供 4 款常备精选药剂',
      '影乡核心角色肖像实装：【病重的老族长 (Patriarch)】与【刃无 (RenWu)】接入官方中性肖像 (shadow-service-neutral-v1/)，宗族往事对白、离村线索与忍术已学反馈全景出脸',
      '光暗学者联队肖像实装：【避难光暗学者联队 (JointScientist)】黄昏界营地符文研究与情报对白全面接入官方学者中性肖像 (observer-neutral.png)，服务回调来源精准绑定',
      '四处修女净化肖像实装：【避难修女 (CampSister)】等营地与集落 4 处净化修女正式接入白金轻纱配青蓝长袖官方中性立绘 (cleric-neutral.png)，异常净化对话精准显现',
      '赠礼炊事员肖像实装：【营地炊事员 (CampCook)】与复苏世界【归乡炊事员 (RestoredCook)】双双接入织补物资妇中性立绘 (mender-neutral.png)',
      '黑陆行鸟饲养员肖像实装：【黑陆行鸟饲养员 (BlackChocoboKeeper / npc_mv_chocobo)】后山清泉与陆行鸟赛道接入官方中性肖像 (npc_p_archivist-neutral.png)，骑行大师与黑陆行鸟巡护对白全景出脸',
      '救济药棚独立室内落成：【世界裂口·救济药棚 (RiftsReliefPharmacy)】全域第 115 处独立安全室内！时空裂口营地（world_rifts 496, 680）采用紧凑三实体救济供给帐篷立面，门楣挂载全域第 29 处原生“道具店”矢量招牌 (shop_sign: item，偏移 -72, -160)，救济药剂员入驻室内前台柜台 (640, 400) 供应特级圣水 (80G)、高级恢复药 (150G)、以太 (400G) 与凤凰尾羽 (500G)，南门平滑返回营地',
      '主线对白三人肖像实装：【茜罗 (qian_luo)】、【昼隐 (zhou_yin)】与【夜织 (ye_zhi)】主线节拍开场与完成对白（dialogue_story_portrait_data.gd）正式接入官方 64×64 中性肖像（qianluo-neutral.png / zhouyin-neutral.png / ye-zhi-neutral.png），严核原宿主、地图、节拍阶段与完整正文',
      '主线九名正式 NPC 肖像复用实装：【刃无 / 半面 / 影枫 / 忆纱 / 摩陀雅 / 瓦达 / 博卡 / 苍岚 / 阿扎尔】显式白名单绑定各自原 NPC ID 正式肖像（dialogue_story_portrait_data.gd），生前瓦达使用生前稿，严核主线上下文与原目录 ID/节点/姓名/立绘四重一致',
      '主线分阶段角色与身份肖像实装：【索菲 (npc_my_sophie)】、【言昭分阶段 (旅行者 / 皇帝)】、【晨辉王 (ch00_king_order)】与【纳哈特 (nahart)】正式绑定主线节拍肖像（dialogue_story_portrait_data.gd / BEAT_RESIDENT_IDENTITIES），言昭按 beat|phase 精确区分旅行者与皇帝稿，纳哈特改名后主线正式名仍显示本人肖像'
    ],
    image: '/images/vfx-void.png',
    npcs: [
      {
        id: 'npc_rifts_water_vendor',
        name: '救济药剂员 (WaterVendor)',
        title: '世界裂口营地救济药师',
        role: 'merchant',
        roleText: '救济供给 (救济药棚)',
        dialogue: '“特级圣水 80 G，解除一名同伴的多种异常。还有伤药、以太和复活药。”',
        locationDetail: '世界裂口 · 救济药棚室内柜台 (RiftsReliefPharmacy 640, 400)'
      },
      {
        id: 'npc_mv_chocobo',
        name: '黑陆行鸟饲养员 (BlackChocoboKeeper)',
        title: '陆行鸟后山清泉骑行大师',
        role: 'story',
        roleText: '陆行鸟驯养 (🎭 专属肖像实装)',
        dialogue: '“这只黑陆行鸟能越过任何高山与密林。带上它，你能去到这片大陆从未有人踏足的秘境。”',
        locationDetail: '幻影之村 · 陆行鸟后山清泉前 (phantom_chocobo_grove / BlackChocoboKeeper)'
      },
      {
        id: 'npc_camp_cook',
        name: '营地炊事员 (CampCook / RestoredCook)',
        title: '时空裂口营地与复苏后勤主厨',
        role: 'story',
        roleText: '补给配餐 (🎭 肖像实装)',
        dialogue: '“锅里只剩些热汤。你们替大家跑一趟，带一份行路干粮。忙着忙着，我常忘了自己也饿。等坐下来闻见汤气，才发现肚子早在催了。（复苏世界居民赠礼：路上带着吃吧，不用付钱。我不大计较东西值多少，只盼人接过去时，心里也能暖一点。这就够我高兴的了。）”',
        locationDetail: '时空裂口营地 · 炊事篝火旁 (CampCook)'
      },
      {
        id: 'npc_tw_cleric',
        name: '避难修女 (CampSister)',
        title: '黄昏界净灵巡修女',
        role: 'story',
        roleText: '圣礼净化 (🎭 肖像实装)',
        dialogue: '“神圣的净光在此涤荡污秽。无论毒素还是阴霾，在此皆得净化安歇。”',
        locationDetail: '黄昏界断层营地 · 净化礼台前 (CampSister)'
      },
      {
        id: 'npc_tw_scientist',
        name: '避难光暗学者联队 (JointScientist)',
        title: '黄昏界光暗联合研究组长',
        role: 'story',
        roleText: '学者研究 (🎭 肖像实装)',
        dialogue: '“这里的空间正在塌陷。光与暗的边界已经模糊，我们必须赶在彻底失衡前记录下符文数据。”',
        locationDetail: '黄昏界营地 · 符文研究台前 (JointScientist)'
      },
      {
        id: 'npc_shadow_herbalist',
        name: '采药人 (Herbalist)',
        title: '影乡药草采集家',
        role: 'merchant',
        roleText: '特色药剂',
        dialogue: '“山里的草药性子烈，配好了能救命，配错了可比毒药还霸道。”',
        locationDetail: '影乡 · 竹叶药屋室内柜台前 (ShadowHerbHouse 640, 400)'
      },
      {
        id: 'npc_i_rival',
        name: '宿敌忍者 · 影枫 (Kageki)',
        title: '海外影乡宿敌首领',
        role: 'story',
        roleText: '宿敌忍者 (🎭 肖像实装)',
        dialogue: '“我想守住这个地方。可那些援军，究竟在听谁的命令？心里有了想守住的东西，就很难把眼睛闭安稳。我也想歇歇，可那份挂念不肯停。”',
        locationDetail: '海外影之孤岛 · 竹林暗哨石道 (shadow_isle 864, 448)'
      },
      {
        id: 'npc_i_patriarch',
        name: '老族长 / 病重的老族长 (Patriarch)',
        title: '影乡宗族病笃族长',
        role: 'story',
        roleText: '宗族往事 (🎭 专属肖像实装)',
        dialogue: '“影枫是我的养子。刃无与他曾一起守着这片竹林。帝国把继承的争执变成了仇恨，又用古王遗都的旧战挑拨他们。去村中找影枫，别只听一个人讲的叛徒，也别让旧伤替你们作决定。”',
        locationDetail: '影乡村长居所 · 内堂低桌旁 (shadow_clan_house 864, 544)'
      },
      {
        id: 'npc_i_gekkoh',
        name: '刃无 (RenWu)',
        title: '影乡村落守护忍者',
        role: 'story',
        roleText: '村落守护 (🎭 专属肖像实装)',
        dialogue: '“别在村里拔刀。有事去见族长，或者先听听渡口的人怎么说。”',
        locationDetail: '影之孤岛山谷 · 村落中央巡道 (shadow_isle 576, 512)'
      },
      {
        id: 'npc_tw_vata',
        name: '瓦达 (VataLast / Vata)',
        title: '狭缝开路战士与营地信使',
        role: 'story',
        roleText: '破径开路 (🎭 双态肖像覆盖)',
        dialogue: '“帝国毁掉过我的村子。今天这条路，我来打开。”',
        locationDetail: '时空狭缝中央通道 (rift 640, 400) 与 时空营地情报前哨'
      },
      {
        id: 'npc_phantom_innkeeper',
        name: '幻影宿屋老板',
        title: '时空缝隙守门人',
        role: 'inn',
        roleText: '旅店黑市',
        dialogue: '“这里没有昨天，也没有明天。在踏入虚无深渊之前，安心睡一觉吧，孩子。”',
        locationDetail: '幻影旧酒馆一层柜台'
      },
      {
        id: 'npc_underground_weapon',
        name: '地下武器神兵商人',
        title: '传说兵刃私藏者',
        role: 'merchant',
        roleText: '黑市神兵',
        dialogue: '“世人以为十二神兵就是极限了……瞧瞧这把【盗贼之匕】和【大地之锤】，只要金币给够，都是你的。”',
        locationDetail: '酒馆地下黑市秘密储藏室'
      },
      {
        id: 'npc_underground_armor',
        name: '地下防具黑商',
        title: '源氏遗族传人',
        role: 'merchant',
        roleText: '终极防具',
        dialogue: '“【源氏之铠】与【反射指环】……只要装备上，连暗黑巴哈姆特的百万核爆也能反弹回去！”',
        locationDetail: '地下黑市北侧防具台'
      },
      {
        id: 'npc_forbidden_mage',
        name: '禁忌魔导黑商',
        title: '柜后翻窗怪客',
        role: 'merchant',
        roleText: '禁忌秘术',
        dialogue: '“嘿嘿……既然你能从窗外暗巷翻进来，那说明你不是凡人。想要真正的【神圣术 Holy】吗？”',
        locationDetail: '魔法店柜台后间隐秘暗室'
      },
      {
        id: 'npc_black_chocobo_master',
        name: '黑陆行鸟饲养员',
        title: '后山清泉隐士',
        role: 'quest',
        roleText: '终极坐骑',
        dialogue: '“这只黑陆行鸟能越过世上最高的山峰与深谷。带上它，你便能降落在封印之森的核心祭坛。”',
        locationDetail: '后山清泉黑陆行鸟林'
      },
      {
        id: 'npc_tw_shelter_host',
        name: '避难宿舍管理员 (ShelterHost)',
        title: '黄昏界避难所管事',
        role: 'inn',
        roleText: '避难宿屋服务',
        dialogue: '“把空床让给伤得更重的人。普通床位 60 G，维持这间帐篷的药材和热水。”',
        locationDetail: '黄昏界西侧 · 避难宿舍帐篷室内 (twilight_shelter)'
      },
      {
        id: 'npc_tw_courier',
        name: '跨界信使 (Courier)',
        title: '黄昏界两界联络信差',
        role: 'story',
        roleText: '跨界传信 (🎭 肖像实装)',
        dialogue: '“信封上的两座城接到了一起，收信的人却没来。信封边角容易磨毛，我把它们顺齐了再收好，手指碰到封口就放轻些。”',
        locationDetail: '黄昏界断层陆块 · 窄石路口 (832, 400)'
      },
      {
        id: 'npc_tw_supply_porter',
        name: '补给搬运员 (SupplyPorter)',
        title: '黄昏界避难物资搬运员',
        role: 'story',
        roleText: '物资搬运 (🎭 肖像实装)',
        dialogue: '“两块地之间的窄路还稳着，别踩进裂缝。西侧帐篷可以休息。我把轻的包裹搁在上头，免得压坏。赶路的人已经够累了，东西也得替他们护好。”',
        locationDetail: '黄昏界断层陆块 · 避难帐篷前 (1056, 704)'
      },
      {
        id: 'npc_wr_rift_guard',
        name: '裂口哨兵 (RiftGuard)',
        title: '裂口集落营地守备哨兵',
        role: 'story',
        roleText: '裂口戒备 (🎭 肖像实装)',
        dialogue: '“东北通路被守军占着。先去瓦达那里听计划。站在这里，我总想把肩背挺直些，不是不害怕，只是怕旁人看出我也在发抖；守军已经退去，东北通路暂时安全，我这才发觉牙关一直咬着，松一口气也得慢慢来。”',
        locationDetail: '时空裂口营地 · 东北通路哨口 (1056, 448)'
      },
      {
        id: 'npc_wr_survey_courier',
        name: '测绘信使 (SurveyCourier)',
        title: '时空裂口暗流测绘员',
        role: 'story',
        roleText: '暗流测绘 (🎭 肖像实装)',
        dialogue: '“研究帐篷在西侧，我刚把下一次暗流衰减的读数送过去。读数抄在纸上，落笔轻重也要认清。交出去以前，我会逐行再念一遍。”',
        locationDetail: '时空裂口营地 · 帐篷中央石道 (832, 544)'
      },
      {
        id: 'npc_wr_research_assistant',
        name: '研究助手 (ResearchAssistant)',
        title: '光暗学者联队研究助理',
        role: 'story',
        roleText: '样本研读 (🎭 肖像实装)',
        dialogue: '“样本要按来自哪边的世界分清楚。混在一起，读数就会把人带到错的地方。标签写得潦草，比少带一件工具还麻烦。我宁可再核一次，也不让同伴凭猜测接手。”',
        locationDetail: '世界裂口 · 联合研究帐篷室内 (864, 624)'
      },
      {
        id: 'npc_r_rift_scout',
        name: '断后斥候 (RiftScout)',
        title: '次元狭缝断后斥候',
        role: 'story',
        roleText: '通路断后 (🎭 肖像实装)',
        dialogue: '“我们守住后面的浮台。北边的暗流，只能交给瓦达。我总不由得往前望，越是挂心，越不能忘了眼前这一步；瓦达留下的通路还在，提到他的名字我总会停一下，不是想不起来，是怕一开口就把心里的话说轻了。”',
        locationDetail: '时空狭缝 · 南侧孤立浮台 (320, 688)'
      },
      {
        id: 'npc_tw_searcher',
        name: '寻亲人 (MissingSearcher)',
        title: '黄昏界寻亲民客',
        role: 'story',
        roleText: '寻亲民客 (🎭 肖像实装)',
        dialogue: '“我只离开了一会儿。等我回来，那里连脚印也没了。话到嘴边总要停一下，怕问得太急，反倒漏听了人家说的每一个字。”',
        locationDetail: '黄昏界断层陆块 · 寻亲路口 (832, 704)'
      },
      {
        id: 'npc_tw_record_keeper',
        name: '姓名登记员 (RecordKeeper)',
        title: '黄昏界难民登记官',
        role: 'story',
        roleText: '名册留痕 (🎭 肖像实装)',
        dialogue: '“我把名字一个一个记下来。消失也不能等于没来过。字写得再慢，也得把名字写对。有人若来打听，不能让他连一个名字都找不着。”',
        locationDetail: '黄昏界断层陆块 · 登记桌前 (1056, 448)'
      },
      {
        id: 'npc_tw_blanket_mender',
        name: '补毯人 (BlanketMender)',
        title: '黄昏界物资织补妇',
        role: 'story',
        roleText: '物资修补 (🎭 肖像实装)',
        dialogue: '“颜色对不上也得缝在一起。两边来的人，今晚盖的是同一条毯子。长针脚不够牢，短针脚费些工。天冷的时候，可不能叫这些线头偷懒。”',
        locationDetail: '黄昏界断层陆块 · 避难帐篷角 (320, 752)'
      },
      {
        id: 'npc_ts_patient',
        name: '疲惫的避难者 (ShelterPatient)',
        title: '避难宿舍休养伤民',
        role: 'story',
        roleText: '宿舍休养 (🎭 肖像实装)',
        dialogue: '“闭上眼，还是能看见另一边的天空。这里的地面至少暂时不会晃。有人在帐篷外说话，我才敢把眼睛闭上。睡不着，也想先听一会儿人声。”',
        locationDetail: '黄昏界避难宿舍 · 床铺旁 (864, 624)'
      },
      {
        id: 'npc_wr_survivor',
        name: '裂口归来者 (RiftSurvivor)',
        title: '时空裂隙生还探路者',
        role: 'story',
        roleText: '生还探路 (🎭 肖像实装)',
        dialogue: '“前面的守军里有一道像瓦达的残影。站在这里的人，和那道影子不是一回事。我知道自己说得急。可每次提起那道影子，声音就不由得提起来。”',
        locationDetail: '时空裂口营地 · 东南碎石地 (928, 720)'
      },
      {
        id: 'npc_wr_tool_repairer',
        name: '营地修补匠 (ToolRepairer)',
        title: '时空裂口装备维修师',
        role: 'story',
        roleText: '行装整备 (🎭 肖像实装)',
        dialogue: '“断了的带子还能换，别把扛住一切都算在铠甲头上。皮带的裂口得从两头往里缝，不能只把中间拉紧。赶工省下的针，迟早还得补回来。”',
        locationDetail: '时空裂口营地 · 工具台前 (352, 464)'
      },
      {
        id: 'npc_nc_observer',
        name: '晶石观测员 (CrystalObserver)',
        title: '新晶石能量观测学者',
        role: 'story',
        roleText: '晶石观测 (🎭 肖像实装)',
        dialogue: '“碎片汇合时，石头里像是有人在说话。先听完，再穿过东侧的屏障。我把没想明白的事先记在心里。越是着急，越怕拿自己的猜想顶替听见的声音。”',
        locationDetail: '新晶石祭坛平台 · 观测台位 (864, 560)'
      },
      {
        id: 'npc_nc_pilgrim',
        name: '两界旅人 (MemoryPilgrim)',
        title: '新晶石朝圣旅人',
        role: 'story',
        roleText: '两界朝圣 (🎭 肖像实装)',
        dialogue: '“我从前以为另一边只是传说。现在，我只想它还在。行李收得再整齐，临走还会伸手摸一遍。有些小习惯，走多远也改不了。”',
        locationDetail: '新晶石祭坛平台 · 西南通道口 (416, 560)'
      },
      {
        id: 'npc_sh_bamboo_sentry',
        name: '竹林哨兵 (BambooSentry)',
        title: '影乡竹林守备斥候',
        role: 'story',
        roleText: '竹林哨位 (🎭 肖像实装)',
        dialogue: '“东北是族长居所，西侧屋子出售忍具。武器与消耗卷轴分开售卖。竹叶一响我就侧耳听，听惯了风声，也不能把每回响动都当成风。”',
        locationDetail: '影之孤岛山谷 · 竹林小径哨口 (352, 400)'
      },
      {
        id: 'npc_sh_ferryman',
        name: '摆渡人 (Ferryman)',
        title: '影乡迷雾渡口舟子',
        role: 'story',
        roleText: '迷雾摆渡 (🎭 肖像实装)',
        dialogue: '“南岸可以离岛。雾再大，我也会把船留在原来的地方。系船的结要牢，也得解得开。有人从雾里离开了，我没看清他要去哪，别替他写下结局；雾浓的时候，我就把桨横在膝上等着，看不清的事，急着说准了最容易误人。”',
        locationDetail: '影之孤岛山谷 · 南岸迷雾渡口 (832, 816)'
      },
      {
        id: 'npc_sh_bamboo_weaver',
        name: '竹编匠 (BambooWeaver)',
        title: '影乡编织老匠人',
        role: 'story',
        roleText: '竹编工艺 (🎭 肖像实装)',
        dialogue: '“劈竹要顺着纹路。人与人的裂缝，却不总能看见。竹篾毛边最磨手，收口时多理顺一遍，提在手里才不扎人。”',
        locationDetail: '影之孤岛山谷 · 竹舍前工作台 (448, 464)'
      },
      {
        id: 'npc_sh_watch_apprentice',
        name: '影乡学徒 (WatchApprentice)',
        title: '影乡世家入门修习生',
        role: 'story',
        roleText: '忍道修习 (🎭 肖像实装)',
        dialogue: '“师父说不能拿村民练刀。我先学怎样不把路堵住。我把刀带系了又系，走几步就摸一摸，免得还没练稳就先掉了家伙。”',
        locationDetail: '影之孤岛山谷 · 居所前石道 (1056, 464)'
      },
      {
        id: 'npc_sh_tea_keeper',
        name: '煮茶人 (TeaKeeper)',
        title: '影乡竹林茶寮主人',
        role: 'story',
        roleText: '竹林茶寮 (🎭 肖像实装)',
        dialogue: '“两兄弟小时候喝茶，总抢最后一杯。如今两个杯子都凉了。水热了，壶也摆好了，招呼人的话却总压在嗓子里。杯子先留着，一个人离开了，并不意味着他的座位该被撤走；我还按原来的地方摆杯子，别急着把人留下的习惯也收走。”',
        locationDetail: '影之孤岛山谷 · 竹林茶寮 (736, 688)'
      },
      {
        id: 'npc_sh_clan_attendant',
        name: '侍药人 (ClanAttendant)',
        title: '族长居所常驻侍药女',
        role: 'story',
        roleText: '侍药照看 (🎭 肖像实装)',
        dialogue: '“族长记得每个离村的人。有些话，他怕再也来不及说。药碗搁下前，我会先擦净碗沿。照料人的事，越是着急，越不能图省事。”',
        locationDetail: '影乡族长居所 · 内堂药几旁 (shadow_clan_house 864, 544)'
      },
      {
        id: 'npc_wr_sophie_envoy',
        name: '索菲长老 (SophieEnvoy)',
        title: '时空裂口前沿引导贤者',
        role: 'story',
        roleText: '前哨指引 (🎭 肖像实装)',
        dialogue: '“暗流在抽走生命。找出衰减的时刻，才能让更多人通过。站在这里，心里惦着的总是人。越想替他们多担一点，越觉得自己那点力气还不够。”',
        locationDetail: '时空裂口营地 · 前哨指引点 (world_rifts 416, 400)'
      }
    ],
    shops: [
      {
        id: 'shop_phantom_weapons',
        name: '幻影地下黑市顶级武器行',
        shopType: 'weapon',
        shopTypeName: '超越级顶级暗黑兵刃',
        keeperName: '地下神兵商人',
        description: '销售仅在时空夹缝中流转的高阶杀器。',
        items: [
          { id: 'chicken_knife', name: '盗贼小刀 (Thief Knife)', type: 'weapon', typeText: '匕首', price: 18000, effect: '攻击力 +66，敏捷 +12，50% 概率触发偷窃特技' },
          { id: 'dark_sword', name: '暗黑斩魄剑', type: 'weapon', typeText: '暗黑剑', price: 22000, effect: '攻击力 +118，附带暗属性暴伤，暗黑骑士专属' },
          { id: 'earth_hammer', name: '大地之震荡神锤', type: 'weapon', typeText: '战锤', price: 16000, effect: '攻击力 +105，攻击时有 25% 概率触发全屏大地烈震术' },
          { id: 'fuma_shuriken', name: '风魔手里剑 (10枚装)', type: 'weapon', typeText: '投掷武器', price: 15000, effect: '忍者投掷专用，造成破万点真实暴击伤害' }
        ]
      },
      {
        id: 'shop_phantom_armors',
        name: '源氏秘宝防具工坊',
        shopType: 'armor',
        shopTypeName: '源氏与魔免防具',
        keeperName: '地下防具黑商',
        description: '流传自异次元的古神级防具，提供极高的双防与异常免疫。',
        items: [
          { id: 'genji_armor', name: '源氏之铠 (Genji Armor)', type: 'armor', typeText: '究极重甲', price: 35000, effect: '物理防御 +75，魔法防御 +35，免疫混乱与魅惑' },
          { id: 'genji_helm', name: '源氏之盔 (Genji Helm)', type: 'armor', typeText: '头盔', price: 18000, effect: '物理防御 +30，魔法防御 +18，免疫失明与即死' },
          { id: 'reflect_ring', name: '反射指环 (Reflect Ring)', type: 'armor', typeText: '永久饰品', price: 20000, effect: '常驻开启【反射 Auto-Reflect】状态，反弹一切单体法术' }
        ]
      },
      {
        id: 'shop_phantom_forbidden_magic',
        name: '禁忌秘术隐室',
        shopType: 'magic',
        shopTypeName: '两界禁咒卷轴',
        keeperName: '禁忌魔导黑商',
        description: '被全大陆禁言的终极禁咒。',
        items: [
          { id: 'spell_holy', name: '神圣裁决术 (Holy)', type: 'magic', typeText: '终极白魔法', price: 20000, effect: '消耗 20 MP，对目标降下神圣审判，对邪恶魔物造成 4 倍极意斩' },
          { id: 'spell_stop', name: '时空停滞术 (Stop)', type: 'magic', typeText: '时空禁术', price: 15000, effect: '消耗 15 MP，彻底冻结目标 ATB 充能长达 30 秒，无法行动' },
          { id: 'megalixir', name: '全域圣灵药 (Megalixir)', type: 'item', typeText: '终极消耗品', price: 50000, effect: '战斗中使用，全队所有成员 HP 与 MP 瞬间 100% 满额完全恢复' }
        ]
      },
      {
        id: 'shop_twilight_shelter_inn',
        name: '黄昏界·避难宿舍宿屋',
        shopType: 'inn',
        shopTypeName: '休整宿屋',
        keeperName: '避难宿舍管理员',
        description: '在两界断层边缘为避难者提供基础热水与床位休整。',
        items: [
          { id: 'inn_twilight_shelter', name: '全队避难帐篷休整一晚 (60 G)', type: 'special', typeText: '休整服务', price: 60, effect: '全队生命值 HP、魔法值 MP 完全回满，并解除一切异常状态' }
        ]
      },
      {
        id: 'shop_rifts_relief_pharmacy',
        name: '世界裂口·救济药棚 (Rifts Relief Pharmacy)',
        shopType: 'item',
        shopTypeName: '裂口救济药棚 (全域第 29 处商业招牌)',
        keeperName: '救济药剂员 (WaterVendor)',
        description: '位于时空裂口营地的全域第 115 处独立安全室内，紧凑三实体救济帐篷门楣挂载全域第 29 处“道具店”矢量招牌。救济药剂员在室内柜台平价供应特级圣水、高级恢复药、以太与复活药。',
        items: [
          { id: 'item_33', name: '特级圣水 (Hi-Holy Water)', type: 'item', typeText: '强效圣水', price: 80, effect: '解除一名同伴的多种负面异常状态' },
          { id: 'item_2', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '强效药水', price: 150, effect: '单体恢复 500 点生命值 HP' },
          { id: 'item_5', name: '以太药水 (Ether)', type: 'item', typeText: '魔力药水', price: 400, effect: '单体恢复 50 点魔法值 MP' },
          { id: 'item_7', name: '凤凰尾羽 (Phoenix Down)', type: 'item', typeText: '复活圣物', price: 500, effect: '复活一名处于战斗不能阵亡状态的同伴' }
        ]
      },
      {
        id: 'shop_shadow_herb_house',
        name: '影乡·竹叶药屋 (ShadowHerbHouse)',
        shopType: 'item',
        shopTypeName: '和风草药与常备药剂',
        keeperName: '采药人 (Herbalist)',
        description: '位于海外影乡独立尽端东院的和风药舍，门楣挂有第 19 处原生“道具店”矢量标牌，调配出售 4 款高效常备药。',
        items: [
          { id: 'gold_needle', name: '金针 (Gold Needle)', type: 'item', typeText: '恢复药品', price: 150, effect: '解除石化状态，使角色重获行动能力' },
          { id: 'ether', name: '以太 (Ether)', type: 'item', typeText: '魔法恢复', price: 400, effect: '恢复单体角色 50 点魔法值 MP' },
          { id: 'elixir', name: '万灵药 (Elixir)', type: 'item', typeText: '强效秘药', price: 500, effect: '瞬间恢复单体角色全部生命值 HP 与魔法值 MP' },
          { id: 'remedy', name: '万能药 (Remedy)', type: 'item', typeText: '综合解药', price: 300, effect: '解除除战斗不能外的所有异常状态' }
        ]
      }
    ],
    monsters: [
      { id: 'ff1_pr_124', name: '灾厄机兵', level: 65, hp: 8800, weakness: '雷电贯通、反射破盾', rank: 'normal', dropItem: '次元钢片、超级以太' },
      { id: 'ff1_pr_127', name: '双子巨妖', level: 70, hp: 12000, weakness: '圣属性、多段连击', rank: 'normal', dropItem: '巨妖心脏、万灵药' },
      { id: 'boss_omega', name: '机械神欧米茄 (Omega)', level: 85, hp: 55530, weakness: '极度惧雷 (常驻反弹障壁，需以爱之歌+魔法剑二刀流破解)', rank: 'boss', dropItem: '欧米茄徽章、超神器动力核心' },
      { id: 'boss_shinryu', name: '神龙 (Shinryu)', level: 90, hp: 65000, weakness: '无弱点 (开场释放全屏大海啸，必须装配珊瑚指环免死)', rank: 'boss', dropItem: '诸神之黄昏 (Ragnarok)、龙王龙鳞' }
    ]
  },
  {
    id: 'yggdrasil_tree_kingdom',
    name: '世界树王廷 & 自然药坊 (Yggdrasil)',
    type: 'sanctuary',
    typeName: '妖精圣域与自然药坊',
    region: '妖精密林深处 · 世界树冠',
    tier: 'T1',
    tierName: '灵木圣域 (Lv.12~18)',
    climate: '古木参天 · 灵露弥漫',
    recommendedLevel: 15,
    isSafeZone: true,
    description: '隐匿于枯萎妖精密林深处的远古世界树王廷。曾被阿斯摩以幻术王冠禁锢，暗队击破寄生妖木后恢复生机。其侧室新近落成了【自然药坊 (YggdrasilHerbRoom)】，由精灵药草学家打理，出售林中纯天然秘制药剂。',
    features: [
      '最新侧室更新：【世界树·自然药坊】精灵专属室内场景',
      '新增侧室更新：【迷雾林·枯枝树屋 (WitheredTreehouse)】失明老猎人居所',
      '深层根系延伸：【世界树·树根空腔 (Yggdrasil Root Hollow)】直达远古巨木粗根核心，两侧细根环绕安全观览',
      '侧室扩展：【艾尔芙·白魔树屋 (ff1_elf_white_treehouse)】白魔法学者独立研习所，传授大回复与复活神术',
      '侧室扩展：【艾尔芙·黑魔树屋 (ff1_elf_black_treehouse)】黑魔法学者独立研习所，传授中火焰与中雷电秘术',
      '魔法店看板扩展：【艾尔芙双魔法树屋 (WhiteTreehouse/BlackTreehouse)】门楣正式挂载原生“白魔法”与“黑魔法”矢量标识看板，支持走近动态透明遮挡',
      '林间宿屋扩展：【艾尔芙·林间宿屋 (ElfheimInn)】精灵之里独立民居客栈，林间宿屋主人常驻提供 40G 休憩恢复',
      '精灵药草学家提供纯天然高级恢复药、不死鸟之尾与世界树甘露',
      '与枯枝交谈可获取女王叶纹信物，直通世界树质问伪精灵王与乱打神技传承',
      '密林与避难肖像接入：【迷雾深林·流亡难民阿肯 (Aken)】专属 64×64 中性头像正式实装入网',
      '奖励重访肖像对齐：【守树人 (ElfGuard)】土之护符已领取重访对白正确展现中性头像，次句领件提示自动清空',
      '伪王幻影肖像实装：【自称精灵王的人 (FalseElfKing)】世界树核心接入狂妄王冠与暗林披风官方 64×64 中性肖像 (false-elf-king-neutral.png)',
      '女王灵木肖像实装：【树之女王希尔菲 (Sylphie)】接入浅绿长发金饰青乳白袍官方专属中性立绘 (sylphie-neutral.png)，世界树晨露赠礼对白全景出脸',
      '王室医生肖像实装：【精灵城·王室医生 (ElfDoctor)】接入王都大臣官方 64×64 中性肖像 (npc_p_minister-neutral.png)，解咒探视与王室钥匙对白全景出脸',
      '老猎人神射手肖像实装：【神射手·枯枝 (Withered / npc_w_withered)】迷雾林枯枝树屋接入银白发眼部覆布绿披肩官方 64×64 中性肖像 (withered-neutral.png)，女王信物授予与乱打神技传承对白全景出脸',
      '精灵王子苏醒肖像实装：【精灵城·精灵王子 (ElfPrince)】接入金发金饰绿肩官方 64×64 中性肖像 (elf-prince-neutral.png)，解咒苏醒后致意对白全景出脸（沉睡状态保持旁白脱敏）'
    ],
    image: '/images/cave-explore.png',
    npcs: [
      {
        id: 'npc_w_queen',
        name: '树之女王 · 希尔菲 (Sylphie)',
        title: '世界树妖精圣域女王',
        role: 'leader',
        roleText: '灵木女王 (🎭 专属肖像实装)',
        dialogue: '“迷雾退去，生命的长风重新吹拂枝叶。光之战士，愿世界树的晨露永远守护你们的灵性。”',
        locationDetail: '世界树王廷王座前 (npc_w_queen)'
      },
      {
        id: 'npc_w_refugee',
        name: '流亡难民 · 阿肯 (Aken)',
        title: '密林避难者',
        role: 'story',
        roleText: '密林流亡 (🎭 肖像实装)',
        dialogue: '“帝国的火烧到了我们的村子。全家逃到这里时，精灵替孩子挡住了追兵。他们戒备的是斧头和军旗。请别把这片最后的树荫也变成战场。如今走几步就想牵一牵家人的手。手心还是暖的，我这颗悬着的心才能放下一点。”',
        locationDetail: '迷雾深林 · 林径避难木屋'
      },
      {
        id: 'npc_w_withered',
        name: '神射手 · 枯枝 (Withered)',
        title: '失明的传奇老猎人 / 乱打宗师',
        role: 'story',
        roleText: '猎人宗师 (🎭 专属肖像实装)',
        dialogue: '“眼睛瞎了，风里的动静反而更清楚。拿着这个女王的叶纹信物，别给精灵丢脸。今天的胜利不会替你练好每一箭。”',
        locationDetail: '迷雾林东南侧室 · 枯枝树屋 (WitheredTreehouse / Withered)'
      },
      {
        id: 'npc_w_botanist',
        name: '精灵药草学家 (ElfBotanist)',
        title: '自然药坊执掌学者',
        role: 'merchant',
        roleText: '药草商',
        dialogue: '“林中药材并不分种族。带上药，再往更深的地方走。”',
        locationDetail: '世界树侧室 · 自然药坊 (YggdrasilHerbRoom)'
      },
      {
        id: 'npc_w_queen',
        name: '精灵女王 · 希尔菲 (QueenSylphie)',
        title: '妖精之森守护者',
        role: 'leader',
        roleText: '森林女王 (🎭 专属肖像实装)',
        dialogue: '“阿斯摩借王冠禁锢了这片森林。你们救下了树，也让我们重新看见人类的善意。平日里连微笑都要收着些，此刻却只想好好笑一笑。能这样当面道谢，真好。”',
        locationDetail: '世界树王座大厅'
      },
      {
        id: 'npc_w_sentinel',
        name: '森林哨戒队长 (ForestSentinel)',
        title: '迷雾深林入口哨戒官',
        role: 'guard',
        roleText: '林径哨戒',
        dialogue: '“人类，先停下。世界树遭过斧刃，不会轻易再相信陌生人。守林时，心里可以着急，开口却不能乱。我先把话说稳，再听对方回答；深处只认女王的叶纹信物，我说话直惯了，不太会招呼远客，你们听清了便好；原来是女王交给枯枝的信物，走惯的林路我也会留意脚下，越是熟悉越容易忘了收轻自己的脚步；女王已经撤下对你们的禁令，口气放缓一点话也能说清，只是站哨多年的习惯一时还改不过来。”',
        locationDetail: '迷雾深林 · 森林入口哨卡 (736, 744)'
      },
      {
        id: 'npc_w_tree_guard',
        name: '守树人 (ElfGuard)',
        title: '古木守卫',
        role: 'guard',
        roleText: '古木禁卫 (🎭 肖像实装)',
        dialogue: '“王冠底下那个人，说话时从不听树叶。枯枝说得对，我们该怀疑了。听叶声时，我会先把呼吸放轻。自己心里太乱，再熟悉的声音也听不真切……女王回来了，树根也终于不再发抖。谢谢你们肯听一个守树人的疑问。值守时话不多，心里却会跟着叶声慢慢打拍子。这点小习惯，说来倒有些傻。”',
        locationDetail: '世界树外围巡逻道 (520, 380)'
      },
      {
        id: 'npc_w_false_king',
        name: '自称精灵王的人 (FalseElfKing)',
        title: '寄生妖木幻影',
        role: 'story',
        roleText: '伪王幻影 (🎭 肖像实装)',
        dialogue: '“外来者，没有我的命令，不许接近世界树！”',
        locationDetail: '世界树核心王座前'
      },
      {
        id: 'npc_elf_doctor',
        name: '王室医生 (ElfDoctor)',
        title: '精灵城王室主治医师',
        role: 'story',
        roleText: '王室医生 (🎭 肖像实装)',
        dialogue: '“王子中了黑魔法的深度沉睡诅咒，唯有玛托雅的水晶眼才能调配唤醒之药。”',
        locationDetail: '精灵城王室病室 (ff1_elf_castle / ElfDoctor)'
      },
      {
        id: 'npc_elf_prince',
        name: '精灵王子 (ElfPrince)',
        title: '沉睡的精灵王储',
        role: 'story',
        roleText: '王室王储 (🎭 苏醒肖像实装)',
        dialogue: '“感谢你们救醒了我。这把神秘钥匙交给你们保管，愿它能打开封印古殿的大门。”',
        locationDetail: '精灵城王室病室 · 床榻卧位 (ff1_elf_castle / ElfPrince)'
      },
      {
        id: 'npc_elf_white_scholar',
        name: '白魔法学者 (ElfWhiteScholar)',
        title: '白魔法研习所学者',
        role: 'merchant',
        roleText: '白魔法师',
        dialogue: '“大回复救治受伤的同伴，复活术唤回倒地的同伴。祛毒术沿用你已学的解毒，无须重复购买。”',
        locationDetail: '精灵之里西北 · 艾尔芙白魔树屋 (ff1_elf_white_treehouse)'
      },
      {
        id: 'npc_elf_black_scholar',
        name: '黑魔法学者 (ElfBlackScholar)',
        title: '黑魔法研习所学者',
        role: 'merchant',
        roleText: '黑魔法师',
        dialogue: '“中火焰与中雷电教材现已备齐。多选目标时威力会分摊，请留意敌人的属性耐性。”',
        locationDetail: '精灵之里东北 · 艾尔芙黑魔树屋 (ff1_elf_black_treehouse)'
      },
      {
        id: 'npc_elf_innkeeper',
        name: '林间宿屋主人 (ElfInnkeeper)',
        title: '艾尔芙林间客栈掌柜',
        role: 'inn',
        roleText: '宿屋休整',
        dialogue: '“旅途辛苦了。住一晚40金币，好好休息吧。”',
        locationDetail: '精灵之里东南部 · 独立林间宿屋 (ElfheimInn)'
      },
      {
        id: 'npc_elf_dancer',
        name: '精灵舞者 (ElfDancer)',
        title: '花间舞者',
        role: 'story',
        roleText: '舞者',
        dialogue: '“欢迎来到艾尔芙城。看一会儿花间的舞步吧，愿你暂时忘却旅途的烦忧。一转身，衣角就带起几片花瓣。别急着赶路，听一会儿风穿过树叶的声音吧。”',
        locationDetail: '精灵之里花坛广场'
      },
      {
        id: 'npc_elf_herbalist',
        name: '精灵药商 (ElfHerbalist)',
        title: '林间草药摊商',
        role: 'merchant',
        roleText: '药商',
        dialogue: '“出发前补充些药品吧，价格都列在货架上。”',
        locationDetail: '精灵之里西南侧室内 · 艾尔芙林间药屋 (ElfheimApothecary)'
      }
    ],
    shops: [
      {
        id: 'shop_yggdrasil_herb',
        name: '世界树·自然药坊 (Herb Room)',
        shopType: 'item',
        shopTypeName: '纯天然林间秘药',
        keeperName: '精灵药草学家',
        description: '由精灵药草学家在世界树侧室自然药坊采摘提炼的草本圣药。',
        items: [
          { id: 'hi_potion', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '恢复剂', price: 300, effect: '单体恢复 500 点生命值 HP' },
          { id: 'phoenix_down', name: '不死鸟之尾 (Phoenix Down)', type: 'item', typeText: '苏生羽毛', price: 400, effect: '战斗中复活一名阵亡同伴并恢复少量 HP' },
          { id: 'antidote_herb', name: '解毒草 (Antidote)', type: 'item', typeText: '解毒草', price: 120, effect: '立即清除全队植物猛毒异常状态' },
          { id: 'yggdrasil_dew', name: '世界树神圣露珠 (Dew of Yggdrasil)', type: 'item', typeText: '圣树露水', price: 600, effect: '恢复 200 点魔法值 MP，并附加全员 3 回合自然再生 (Regen)' }
        ]
      },
      {
        id: 'shop_elf_white_magic',
        name: '艾尔芙白魔法树屋教材所',
        shopType: 'magic',
        shopTypeName: '白魔法教材',
        keeperName: '白魔法学者',
        description: '艾尔芙城专设的白魔法研习独立树屋，传授恢复、解毒、大回复与复活神术。',
        items: [
          { id: 'cure', name: '恢复术 (Cure)', type: 'magic', typeText: '1阶白魔法', price: 100, effect: '单体恢复少量生命值 HP' },
          { id: 'esuna', name: '解毒术/祛毒术 (Esuna/Poisona)', type: 'magic', typeText: '1阶白魔法', price: 100, effect: '解除猛毒异常状态' },
          { id: 'curaga', name: '大回复 (Curaga)', type: 'magic', typeText: '3阶白魔法', price: 1500, effect: '单体恢复大量生命值 HP' },
          { id: 'life', name: '复活术 (Life)', type: 'magic', typeText: '3阶白魔法', price: 1500, effect: '复活一名倒地阵亡的队友' }
        ]
      },
      {
        id: 'shop_elf_black_magic',
        name: '艾尔芙黑魔法树屋教材所',
        shopType: 'magic',
        shopTypeName: '黑魔法教材',
        keeperName: '黑魔法学者',
        description: '艾尔芙城专设的黑魔法研习独立树屋，传授火、冰与进阶中火焰、中雷电破坏术。',
        items: [
          { id: 'fire', name: '初级火焰 (Fire)', type: 'magic', typeText: '1阶黑魔法', price: 100, effect: '单体火属性弱魔法攻击' },
          { id: 'hail', name: '初级冰冻 (Blizzard/Hail)', type: 'magic', typeText: '1阶黑魔法', price: 100, effect: '单体冰属性弱魔法攻击' },
          { id: 'fira', name: '中级火焰 (Fira)', type: 'magic', typeText: '3阶黑魔法', price: 1500, effect: '中阶火属性攻击，可扩散多选目标' },
          { id: 'thundara', name: '中级雷电 (Thundara)', type: 'magic', typeText: '3阶黑魔法', price: 1500, effect: '中阶雷属性攻击，对水栖机械克制' }
        ]
      },
      {
        id: 'shop_elfheim_inn',
        name: '艾尔芙·林间宿屋',
        shopType: 'inn',
        shopTypeName: '林间旅店休息',
        keeperName: '林间宿屋主人',
        description: '精灵之里独立林间客舍，提供 40 G 柔和绿意休整，恢复队伍全部体力、魔力与状态。',
        items: [
          { id: 'inn_rest_elfheim', name: '全队宿屋休息一晚 (Rest)', type: 'special', typeText: '休整服务', price: 40, effect: '全队生命值 HP、魔法值 MP 完全回满，并解除一切异常状态' }
        ]
      }
    ],
    monsters: [
      { id: 'forest_wolf', name: '林地野狼', level: 12, hp: 140, weakness: '火属性、重击', rank: 'normal', dropItem: '狼皮、恢复药' },
      { id: 'fairy_trickster', name: '幻影小仙子', level: 13, hp: 110, weakness: '暗属性、物理箭矢', rank: 'normal', dropItem: '妖精粉尘、以太药水' },
      { id: 'treant_branch', name: '枯萎寄生树妖', level: 14, hp: 260, weakness: '火属性 (2倍弱火弱斧)', rank: 'normal', dropItem: '千年灵木、高级药水' },
      { id: 'boss_parasite_tree', name: '寄生妖木·伪精灵王', level: 16, hp: 1980, weakness: '火属性、风属性打击', rank: 'boss', dropItem: '神射手弓石板、乱打核心印记、妖精之弓' }
    ]
  },
  {
    id: 'old_kingdom_ruins',
    name: '古王遗都 & 圣陵 (Old Kingdom)',
    type: 'capital',
    typeName: '远古王都废墟与皇家圣陵',
    region: '中央大陆腹地 · 遗都故地',
    tier: 'T2',
    tierName: '古王废都 (Lv.25~28)',
    climate: '残垣断壁 · 沉沦余烬',
    recommendedLevel: 26,
    isSafeZone: true,
    description: '远古王朝盛极一时的帝都废墟。虽遭战火洗劫，但破败街角依然屹立着旧酒馆，深处更连通着古王陵 (Tomb) 与皇家藏室 (Vault)。在此王女茜罗直面家族灭国之痛，唤醒买醉避世的前骑士团长戈闻重披战铠复职。',
    features: [
      '最新侧室更新：【古王遗都·旧酒馆侧间 (OldKingdomTavern)】沉沦醉汉避难处',
      '最新侧室更新：【古王遗都·军械库残殿 (OldKingdomArmory)】遗都军备磨砺重镇',
      '深层王陵延伸：【古王陵·下层地宫 (Old Kingdom Crypt 2)】复用皇家古石棺与先祖纪念立柱，地宫深度探索',
      '王陵地宫与皇家藏室密道：解开古王朝血脉之谜并传承圣骑士大统',
      '主线高潮节拍：王女茜罗宣告赦免并举行重披战铠誓师大典',
      '遗都风土肖像实装：【旧酒馆主人 (TavernHost)】、【补墙石匠 (Mason)】与【失钟的守钟人 (BellKeeper)】基于地点弱绑定接入官方中性对白肖像',
      '归民与记录员肖像实装：【归乡旅人 (RefugeeMother)】与【遗迹记录员 (ArchiveWitness)】分别接入差旅文书与年轻学徒中性肖像',
      '废墟拾荒肖像实装：【独眼 (OneEye)】焦土烬堡拾荒客接入遮眼眼罩与粗布褐衣官方中性肖像',
      '王女圣裁肖像实装：【真皇王女·茜罗 (QianLuo)】古王陵石棺前对白接入赤褐发与蓝白王室披肩官方 64×64 中性肖像 (qianluo-neutral.png)',
      '圣骑双相肖像实装：【骑士统领·戈闻 (Gowen/Graham)】旧酒馆买醉态 (graham-tavern-neutral.png) 与主线誓师重披战铠态 (graham-armor-neutral.png) 地点双变体官方中性肖像正式实装',
      '失落遗迹使者肖像实装：【半面 (HalfMask)】鲁菲尼亚遗迹星图前对白接入半面遮颜官方 64×64 中性肖像 (half-mask-neutral.png)',
      '互助药室独立接线实装：【古王遗都·互助药室 (OldKingdomAidRoom)】全域第 109 处独立安全室内！东侧道路开辟 96 宽短桥与尽端院（1728×960），白金拱门挂载第 20 处“道具店”商业标牌，遗都医者乔迁室内柜台提供 4 款常备救济药剂',
      '守墓人肖像实装：【古陵守墓人 (TombKeeper)】古王陵墓道对白正式接入官方奉祀中性肖像 (tomb-keeper-neutral.png)',
      '焦土老斥候肖像实装：【老斥候 (OldScout / npc_a_veteran)】烬堡废墟接入沧桑灰袍白发官方 64×64 中性肖像 (old-scout-neutral.png)，烈火盾地窖线索对白全景出脸',
      '西城要塞国王肖像实装：【西城国王 (WesternKing)】西城荒废城堡接入帝王官方 64×64 中性肖像 (king-neutral.png)，王冠寻回委托对白全景出脸',
      '远古英灵肖像实装：【远古英雄英灵 (AncientSpirit / npc_o_ghost_hero)】皇家圣陵石棺前正式接入官方 64×64 中性肖像 (ancient-spirit-neutral.png)，守护传授与徽章继承对白全景出脸，背包满容量无身份提示精准清脸',
      '烬卫空甲肖像实装：【格寒 / 空甲 (Hollow / npc_a_ghost)】焦土烬堡废墟接入官方 64×64 中性肖像 (hollow-neutral.png)，还债独白、遗物交付与重访对白全景出脸',
      '烬卫遗物交付回执三段解耦：【格寒 / 空甲 (Hollow)】交付烬卫双遗物正式拆分为三事件，格寒本人台词全景展现肖像，获得烬卫遗剑与烬卫旧甲系统回执精准清空肖像',
      '焦土孤女肖像实装：【小琳 (XiaoLin / npc_a_survivor)】焦土烬堡废墟枯井旁接入官方 64×64 中性肖像 (xiaolin-neutral.png)，两句枯井守望与石缝白花对白全景出脸'
    ],
    image: '/images/world-map.png',
    npcs: [
      {
        id: 'npc_o_knight_a',
        name: '军械官 · 遗都残存骑士 (KnightQuartermaster)',
        title: '军械库残殿执掌官',
        role: 'merchant',
        roleText: '神兵军械商',
        dialogue: '“圣剑复制品 3200 G，神圣长枪 4200 G。名字虽旧，刃口已经重新磨亮。为王女陛下重征四方备足利刃！”',
        locationDetail: '古王遗都侧室 · 军械库残殿 (OldKingdomArmory)'
      },
      {
        id: 'npc_o_armorer',
        name: '修甲匠 (DiamondArmorer)',
        title: '皇家钻石重甲修复师',
        role: 'craft',
        roleText: '重甲修复师',
        dialogue: '“钻石胸甲的接缝修好了。旧城的东西，总还能找到继续使用的人。披上它，连巨龙的撕咬也无法伤你分毫。”',
        locationDetail: '古王遗都侧室 · 军械库残殿 (OldKingdomArmory)'
      },
      {
        id: 'npc_o_gowen',
        name: '骑士统领 · 戈闻 (Gowen / Graham / npc_o_graham)',
        title: '昔日王都首席圣骑士',
        role: 'story',
        roleText: '圣骑导师 (🎭 双形态肖像实装)',
        dialogue: '“酒能让我忘记城门倒下的声音，却忘不了城门后的人。杯子端到眼前，手总想停一停，再喝一口也不能把自己从那些念头里摘干净；去东北的王陵看看吧，我总盯着杯底那点亮，可低着头也没觉得好受；这副甲我以为再也穿不上了，原来沉重的从来不是铁，我把肩背一点点撑直，心里那点想退的念头还在，我得认着它才好把脚站住；骑士的职责不是陪王国一起倒下，是扶起还活着的人，我还会为从前的自己脸热，那就让它提醒着别只顾着低头难堪。”',
        locationDetail: '古王遗都 · 旧酒馆侧间 (酒馆买醉态) / 王都主街 (重披战铠态)'
      },
      {
        id: 'npc_o_tavern_host',
        name: '旧酒馆主人 (TavernHost)',
        title: '遗都避风港掌柜',
        role: 'inn',
        roleText: '酒馆老板 (🎭 肖像实装)',
        dialogue: '“屋顶塌了，吧台没塌。戈闻坐在那里，总留着一个空杯子。客人坐下来，我就先把桌面擦一遍；今天他把最后那杯酒倒进了土里，总算换回了铠甲。那个空位我还是照旧擦干净，人出去闯荡了，回来也得有地方坐。”',
        locationDetail: '旧酒馆一层破损吧台'
      },
      {
        id: 'npc_o_mason',
        name: '补墙石匠 (Mason)',
        title: '残垣修缮老石匠',
        role: 'story',
        roleText: '遗迹修缮 (🎭 肖像实装)',
        dialogue: '“我每天搬十块石头回来。不知道什么时候能补完，总要先开始。挑石头得翻过来看纹理，顺手掸掉缝里的灰。摸得久了，掌心比眼睛还熟。”',
        locationDetail: '古王都废墟 · 西南残墙基座'
      },
      {
        id: 'npc_o_bellkeeper',
        name: '失钟的守钟人 (BellKeeper)',
        title: '旧城钟塔残存守望者',
        role: 'story',
        roleText: '残钟守望 (🎭 肖像实装)',
        dialogue: '“钟被熔成了军械。等它重新响起来，我想把所有离开的人都念一遍。没有钟声，也会在老时辰醒来。坐一会儿，等心里那阵回响慢慢静下去。”',
        locationDetail: '古王都废墟 · 东北废钟台旁'
      },
      {
        id: 'npc_o_refugee_mother',
        name: '归乡旅人 (RefugeeMother)',
        title: '遗都避难寻踪归民',
        role: 'story',
        roleText: '故土寻踪 (🎭 肖像实装)',
        dialogue: '“孩子问这里为什么没有城堡。我告诉他，城堡在我们脚下，还没完全丢掉。每回停脚，我都把孩子的鞋口理一理。小脚走得辛苦，有点硌着也不肯说。”',
        locationDetail: '古王都废墟 · 南侧石阶路口 (384, 816)'
      },
      {
        id: 'npc_l_archive_witness',
        name: '遗迹记录员 (ArchiveWitness)',
        title: '超古代遗迹实录学徒',
        role: 'story',
        roleText: '遗迹实录 (🎭 肖像实装)',
        dialogue: '“这里的档案没有删除过。被遗忘的，只是读它们的人。读不懂的字，我就留着，不替前人补意思。半面留下的那段记录终于有人听完了，但一段记录有人读过并不等于它该被合上，我会照旧把原文留好。”',
        locationDetail: '鲁菲尼亚失落遗迹 · 档案台旁 (832, 704)'
      },
      {
        id: 'npc_lu_half',
        name: '神秘使者 · 半面 (HalfMask)',
        title: '鲁菲尼亚星图引路人',
        role: 'story',
        roleText: '遗迹引路 (🎭 肖像实装)',
        dialogue: '“先看东侧终端的星图。只有知道世界怎样被分开，你们才能听懂一个人为什么也会裂成两半。”',
        locationDetail: '鲁菲尼亚失落遗迹 · 中央终端前 (lufenia_ruins 640, 400)'
      },
      {
        id: 'npc_o_qianluo',
        name: '真皇王女 · 茜罗 (QianLuo)',
        title: '古王遗民之主',
        role: 'leader',
        roleText: '王室真血 (🎭 肖像实装)',
        dialogue: '“我一直不敢走到这里。姐姐的名字不该只写在通缉令上。越走近，越想把眼睛挪开，到了这里却只顾着把脚站稳；这是我的家名，也是我必须承担的责任，我在心里把家名念了一遍又一遍，不是怕忘记，是想让自己真正接得住它；城里又有人开始修墙了，姐姐，我会接着走下去，原来心里难过的时候，也能有一点盼头。”',
        locationDetail: '古王陵中央石棺前 (old_kingdom_tomb)'
      },
      {
        id: 'npc_o_tomb_keeper',
        name: '古陵守墓人 (TombKeeper)',
        title: '皇陵奉祀官',
        role: 'quest',
        roleText: '陵寝守卫 (🎭 肖像实装)',
        dialogue: '“皇家藏室锁着远古护国的神圣铠甲，唯有持有真王徽记的后嗣方能唤醒沉睡的英灵。”',
        locationDetail: '古王陵地下暗道'
      },
      {
        id: 'npc_o_ghost_hero',
        name: '远古英雄英灵 (AncientSpirit)',
        title: '古王陵皇家守护英灵',
        role: 'story',
        roleText: '守护传授 (🎭 专属肖像实装)',
        dialogue: '“守护换位与圣光斩已经传给你们。愿你们记得守护的职责。”',
        locationDetail: '古王陵皇家圣陵石棺前 (AncientSpirit 352, 656)'
      },
      {
        id: 'npc_o_medic',
        name: '遗都医者 (ReliefMedic)',
        title: '古王国遗迹互助医师',
        role: 'merchant',
        roleText: '战地医者',
        dialogue: '“残垣断壁里总有人受伤。这间药室还稳当，药剂按平价供应，先稳住伤势再说。”',
        locationDetail: '古王遗都 · 互助药室室内柜台前 (OldKingdomAidRoom 640, 400)'
      },
      {
        id: 'npc_a_ghost',
        name: '格寒 · 烬卫空甲 (Hollow / GeHan)',
        title: '焦土烬堡残存空铠',
        role: 'story',
        roleText: '遗物传承 (🎭 专属肖像实装)',
        dialogue: '“这副甲是烬卫的。我只是还没把债还完。守护不是替帝国守夜，是让下一盏灯还能够亮起。”',
        locationDetail: '焦土烬堡废墟 · 枯井残墙旁 (ash_keep / Hollow)'
      },
      {
        id: 'npc_a_survivor',
        name: '小琳 (XiaoLin)',
        title: '焦土烬堡废墟孤女',
        role: 'story',
        roleText: '枯井守望 (🎭 专属肖像实装)',
        dialogue: '“大家说这口井干了。我每天还是会来看看。石缝里开了一朵白花。明年，也许会再多一朵。看着那一点白，我就忍不住把脚步放轻。心里有个小小的盼头，等着也不那么难。”',
        locationDetail: '焦土烬堡废墟 · 枯井旁 (ash_keep / XiaoLin 960, 804)'
      },
      {
        id: 'npc_a_scavenger',
        name: '拾荒者 · 独眼 (OneEye)',
        title: '焦土烬堡拾荒客',
        role: 'story',
        roleText: '废墟拾荒 (🎭 肖像实装)',
        dialogue: '“当年的城主也这样看人。别再让这座城把活人吞下去。心口那股凉意，不是把衣领拉紧就能挡住的，我只想让自己站稳些，别总想着回头；北边的火光熄了，你们带走的不是废铁，是还没断的念想，念想这东西我自己知道分量就够了。”',
        locationDetail: '焦土烬堡废墟 · 枯井残墙旁 (ash_keep)'
      },
      {
        id: 'npc_a_veteran',
        name: '老斥候 (OldScout)',
        title: '焦土烬堡废墟老兵',
        role: 'story',
        roleText: '废墟老斥候 (🎭 专属肖像实装)',
        dialogue: '“火从北面的城门烧进来时，我把最后一面烈火盾藏进了地窖。我脚下这条旧石路往南，墙根有块能掀开的门板。拿走盾吧，活人比废墟更需要它。”',
        locationDetail: '焦土烬堡废墟 · 旧石路墙根前 (ash_keep / OldScout)'
      },
      {
        id: 'npc_western_king',
        name: '西城国王 (WesternKing)',
        title: '西城要塞昔日领主',
        role: 'story',
        roleText: '要塞领主 (🎭 肖像实装)',
        dialogue: '“请帮我找回沼泽洞窟中的王冠。”',
        locationDetail: '西城荒废城堡 · 深处王座前 (ff1_western_keep / WesternKing)'
      }
    ],
    shops: [
      {
        id: 'shop_old_kingdom_relics',
        name: '遗都旧日补给与酒馆杂货',
        shopType: 'item',
        shopTypeName: '战时军需与酒类',
        keeperName: '旧酒馆主人',
        description: '提供旧酒馆私藏的烈酒与战时紧急医疗药品。',
        items: [
          { id: 'drunk_spirit', name: '遗都烈酒 (Drunk Spirit)', type: 'item', typeText: '亢奋酒', price: 150, effect: '使用后单体物理攻击力提升 20%，持续 3 回合，附带轻微醉意' },
          { id: 'hi_potion', name: '高级恢复药 (Hi-Potion)', type: 'item', typeText: '恢复剂', price: 300, effect: '单体恢复 500 点生命值 HP' },
          { id: 'holy_water', name: '纯净圣水 (Holy Water)', type: 'item', typeText: '圣物', price: 250, effect: '解除战斗中遭受的【僵尸/诅咒】死灵状态' },
          { id: 'royal_needle', name: '王家金针 (Royal Needle)', type: 'item', typeText: '解石化', price: 200, effect: '立即解除全身硬化的【石化】异常状态' }
        ]
      },
      {
        id: 'shop_old_kingdom_weapons',
        name: '军械库残殿武器行',
        shopType: 'weapon',
        shopTypeName: '圣光与破甲重兵器',
        keeperName: '遗都残存骑士',
        description: '由驻守军械库残殿的骑士保养磨砺的古王国兵刃。',
        items: [
          { id: 'replica_excalibur', name: '圣剑复制品 (Replica Excalibur)', type: 'weapon', typeText: '圣光剑', price: 3200, effect: '攻击力 +75，圣属性附伤，对不死/恶魔系敌人增伤 35%' },
          { id: 'holy_lance', name: '神圣长枪 (Holy Lance)', type: 'weapon', typeText: '神圣长枪', price: 4200, effect: '攻击力 +82，附带神圣破魔冲击，龙骑士专属' }
        ]
      },
      {
        id: 'shop_old_kingdom_armor',
        name: '皇家钻石重甲修复工坊',
        shopType: 'armor',
        shopTypeName: '高硬度钻石战甲',
        keeperName: '修甲匠',
        description: '修复完好的远古皇家重装护甲。',
        items: [
          { id: 'diamond_armor', name: '钻石胸甲 (Diamond Armor)', type: 'armor', typeText: '极硬重铠', price: 4800, effect: '物理防御 +45，魔法防御 +15，雷属性伤害减免 30%，骑士/战士专用' }
        ]
      },
      {
        id: 'shop_old_kingdom_aid_room',
        name: '古王遗都·互助药室 (OldKingdomAidRoom)',
        shopType: 'item',
        shopTypeName: '遗都草药与常备药品',
        keeperName: '遗都医者 (ReliefMedic)',
        description: '位于古王遗都东侧尽端院白金拱门内的安全药舍，门楣挂有第 20 处原生“道具店”矢量标牌，调配供应 4 款常备救济药。',
        items: [
          { id: 'gold_needle', name: '金针 (Gold Needle)', type: 'item', typeText: '恢复药品', price: 150, effect: '解除石化状态，使角色重获行动能力' },
          { id: 'ether', name: '以太 (Ether)', type: 'item', typeText: '魔法恢复', price: 400, effect: '恢复单体角色 50 点魔法值 MP' },
          { id: 'elixir', name: '万灵药 (Elixir)', type: 'item', typeText: '强效秘药', price: 500, effect: '瞬间恢复单体角色全部生命值 HP 与魔法值 MP' },
          { id: 'remedy', name: '万能药 (Remedy)', type: 'item', typeText: '综合解药', price: 300, effect: '解除除战斗不能外的所有异常状态' }
        ]
      }
    ],
    monsters: [
      { id: 'undead_soldier', name: '遗都亡灵步兵', level: 25, hp: 480, weakness: '圣属性、火属性、圣水', rank: 'normal', dropItem: '生锈铁刃、恢复药' },
      { id: 'corrupted_knight', name: '腐朽铁骑游魂', level: 27, hp: 760, weakness: '雷属性、圣光贯通', rank: 'normal', dropItem: '骑士残甲、高级药水' },
      { id: 'tomb_wraith', name: '陵寝哀嚎怨灵', level: 26, hp: 390, weakness: '治疗魔法反转 (治愈术可重创)', rank: 'normal', dropItem: '幽魂灵质、以太药水' },
      { id: 'boss_fallen_commander', name: '堕落统领·亡灵戈闻', level: 29, hp: 4500, weakness: '圣属性、重甲贯通', rank: 'boss', dropItem: '圣骑士职业石、宙斯之盾' }
    ]
  }
]

/**
 * 官方全域核心地区风土志 (收录自 StoryMapCatalog.GEOGRAPHY_NOTES)
 * 核心地区只收录原 NPC 大典和现门户可知的风土
 */
export interface GeographyNoteItem {
  id: string
  title: string
  regionName: string
  icon: string
  note: string
  relatedSceneId?: string
  historyEvents?: { title: string; summary?: string }[]
}

export const OFFICIAL_GEOGRAPHY_NOTES: GeographyNoteItem[] = [
  {
    id: 'chen_hui_gate',
    title: '宁静村城门',
    regionName: '晨辉王国平原',
    icon: '🚪',
    note: '宁静村背靠群山与始源神殿，城门连接晨辉郊外的平原。东侧开拓东院坐落全域第 114 处独立安全室内【韩伯道具铺】（挂载全域第 27 处“道具店”商业矢量招牌），与铁匠工坊、玛莎宿屋共同为旅人提供整备。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'ningjing_apothecary',
    title: '宁静村·韩伯道具铺',
    regionName: '宁静村东侧东院独立药铺',
    icon: '💊',
    note: '宁静村东侧城墙开拓通道连通的独立尽端东院（1728×960），全域第 114 处独立安全室内！门楣挂载全域第 27 处原生“道具店”矢量招牌 (shop_sign: item，偏移 -72, -168)。行商韩伯迁入室内柜台桌前（640, 400），提供恢复药 (50G)、解毒草 (30G)、眼药 (80G) 与野营帐篷 (150G) 等 4 款开荒常备药品与扎营用具。南门平滑返回东院。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'chen_hui_palace',
    title: '晨辉王宫',
    regionName: '晨辉王都',
    icon: '👑',
    note: '晨辉王宫是王国的政治与信仰中枢，白石殿堂内设王座与祭坛。晨辉国王达里安（🎭 肖像实装）端坐王座统御全局，近卫守卫殿门，编纂官整理古老泥板，御膳与抄录事务在侧厅延续。王宫的侧门与宁静村城门相通。',
    relatedSceneId: 'chen_hui_palace_town',
    historyEvents: [
      { title: '晋见达里安王与水晶调查令', summary: '在白石王座前接受国王嘱托，调查始源神殿异动并获得初始装备支持。' }
    ]
  },
  {
    id: 'chen_hui_road',
    title: '晨辉郊外驿道',
    regionName: '平原驿道',
    icon: '🛣️',
    note: '晨辉郊外是一片通向始源神殿的平原驿道。草丘茶亭顶部挂载全域第 28 处原生“道具店”商业矢量招牌 (shop_sign: item，偏移 -72, -168)，供流浪行商胡老板为旅人提供 1.25 倍荒野金针与不死鸟之尾补给，牧羊人与年轻修道士沿路传递神殿异动；报信修道士（TempleMessenger / npc_r_monk，🎭 肖像实装）按现有修道士立绘复用神官中性肖像，第一句急报出脸，第二句无说话者提示保持无脸。',
    relatedSceneId: 'chen_hui_palace_town',
    historyEvents: [
      { title: '平原行商交接与修道士传信', summary: '沿途修道士向光之战士告知风之水晶碎裂的早期征兆。' }
    ]
  },
  {
    id: 'longqi_ridge',
    title: '龙栖岭悬崖',
    regionName: '龙栖天险',
    icon: '⛰️',
    note: '龙栖岭的悬崖绝壁高耸入云，人与飞龙在这里留下远古血契的传说。岭上的岩屋、帝国猎龙侦察兵（🎭 肖像实装）与龙骑誓言石碑，保留着守护飞龙的传统。',
    relatedSceneId: 'chen_hui_palace_town',
    historyEvents: [
      { title: '结识苍岚与守护飞龙血契', summary: '龙先养大我。人类若再伸手，我不会让路。' }
    ]
  },
  {
    id: 'longqi_nest',
    title: '龙栖岭岩穴巢地',
    regionName: '龙栖天险深处',
    icon: '🐉',
    note: '龙栖岭深处的岩穴巢地，飞龙在峭壁间栖居。巢地与山岭相通，龙巢与龙卵构成这里的景观。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'maze_wood',
    title: '迷雾深林',
    regionName: '古老妖精森林',
    icon: '🌲',
    note: '古老巨木覆盖的深林，林间分布着树屋和树荫营地。精灵哨兵守在入口，向深处延伸的林径通往世界树。',
    relatedSceneId: 'yggdrasil_tree_kingdom',
    historyEvents: [
      { title: '枯枝树屋与女王信物 (🎭 肖像实装)', summary: '失明老猎人枯枝赠予女王叶纹信物，揭露伪精灵王与寄生真相，传承神射手乱打技艺。' }
    ]
  },
  {
    id: 'yggdrasil',
    title: '世界树聚落',
    regionName: '世界树领地',
    icon: '🌳',
    note: '迷雾林深处的古老巨木，是精灵聚居与守护的中心。巨木周围保留着王座与树屋，林径通回迷雾林。',
    relatedSceneId: 'yggdrasil_tree_kingdom',
    historyEvents: [
      { title: '世界树王廷光复与药坊重整', summary: '驱逐幻术寄生，精灵女王重掌王廷，自然药坊向冒险者开放。' }
    ]
  },
  {
    id: 'cape_town',
    title: '海角镇港口',
    regionName: '托尔纳海湾',
    icon: '⚓',
    note: '海风吹拂的港口镇，渔市、酒馆、工坊与船坞构成繁忙街景。北岸短石桥连接独立北院与阿海鱼铺，码头栈桥与灯塔面向海湾。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'cape_fish_shop',
    title: '海角港·阿海鱼铺',
    regionName: '海角北岸独立尽端北院',
    icon: '🐟',
    note: '海角港北岸经由短石桥连接的独立尽端北院（1728×960），全域第 106 处独立安全室内。门楣挂有“道具店”原生矢量招牌（全域第 17 处商业标牌）。生鲜鱼贩阿海迁入室内柜台，为出海的水手与冒险者供应鲜鱼片与水产干粮。南门返回北院。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'mermaid_bay',
    title: '人鱼湾月牙岸',
    regionName: '月牙海湾',
    icon: '🌊',
    note: '月光照映的月牙海湾，潮水与礁石围出湾岸。吟游诗人流歌（🎭 专属肖像实装）在此抚琴咏唱夜歌。岸边的道路通往海角镇。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'mermaid_undersea',
    title: '海底人鱼聚居地',
    regionName: '深海圣域',
    icon: '🧜‍♀️',
    note: '海底的人鱼聚居地分布着珊瑚、珍珠贝母与发光海葵。人鱼公主艾莉娜（🎭 专属肖像实装）与老巫母（🎭 肖像实装）在此祈愿潮水归位。潮路与人鱼湾岸相通。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'ash_keep',
    title: '焦土烬堡废墟',
    regionName: '旧城塞遗址',
    icon: '🏰',
    note: '焦黑断壁间仍能辨认旧城塞的轮廓，坍塌马厩与枯井留下往昔生活的痕迹。烬卫空甲格寒（🎭 专属肖像实装）、老斥候（🎭 专属肖像实装）、拾荒者独眼（🎭 肖像实装）与孤女小琳（🎭 专属肖像实装）在焦土废墟中守护旧日遗火、烈火盾地窖与石缝白花。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'factory_city',
    title: '织造机械城街区',
    regionName: '西风机械帝国',
    icon: '⚙️',
    note: '蒸汽齿轮与管道交织成工业街区，工坊和锅炉分布其间。工时记录员、下夜班守门人与包扎中的劳工（🎭 中性肖像实装）值守于石路，货运工往返于货场。城东开辟短支路连通独立接待装配前场与齿轮工坊。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'factory_gear_workshop',
    title: '织造城·齿轮工坊',
    regionName: '工坊前场独立装配馆',
    icon: '🔧',
    note: '织造城城东短支路桥接连通的独立装配前场（1728×960），全域第 104 处独立安全室内。门楣悬挂原生“武器防具”商业标牌。齿轮装备改装商与动力铠装配员唯一迁入室内，提供专属军械改造与重型动力铠装配。南门返回前场。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'factory_aid_pharmacy',
    title: '织造城·劳工救济药房',
    regionName: '工坊前场独立北院药舍',
    icon: '💊',
    note: '织造城城东齿轮工坊前场北侧支路连通的独立北院药舍（1728×960），全域第 107 处独立安全室内。门楣挂有“道具店”原生矢量招牌（全域第 18 处商业标牌）。救济药师迁入室内柜台，为高强度机械劳工与伤员平价调配基础药剂。南门返回北院。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'factory_lab',
    title: '织造工坊实验厅',
    regionName: '工坊内厅核心',
    icon: '🔬',
    note: '织造城工坊的实验厅内，培养槽、引擎与器械柜分区陈设。首席研究员忆纱（🎭 肖像实装）在此研究动力核心，厅内通道分别通向工厂街与战舰船坞。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'heliogabalus',
    title: '未完工战舰船坞',
    regionName: '战列舰核心舱',
    icon: '🚢',
    note: '尚未完工的战舰，核心舱两侧布置着动力引擎与货箱。舱道连接织造城工坊和龙骨舱。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'sand_moon',
    title: '砂之月都集市',
    regionName: '塔克拉荒漠',
    icon: '🏜️',
    note: '黄沙包围着沙月城，商队集市与绿洲剧场构成城中的热闹街景。送水人、护卫、乐手与情报掮客（🎭 肖像实装）沿街分布。',
    relatedSceneId: 'sand_moon_bazaar'
  },
  {
    id: 'sand_moon_stage',
    title: '沙月大剧场',
    regionName: '绿洲剧场群落',
    icon: '🎭',
    note: '沙月剧场的立柱与桌台围出表演空间，舞娘首领摩陀雅（🎭 肖像实装）在后台更衣室指引方向，舞团另有独立的伴舞休息包厢。剧场入口连通沙月城街道。',
    relatedSceneId: 'sand_moon_bazaar'
  },
  {
    id: 'sand_moon_armor_house',
    title: '沙月城·驼队护具铺',
    regionName: '绿洲东院商铺',
    icon: '🛡️',
    note: '沙月绿洲城东路接 96 宽短桥连通的独立尽端院（1728×960），全域第 111 处独立安全室内。驼队商铺新立面悬挂“防具店”原生专属矢量招牌（全域第 22 处商业标牌）。驼队护具商乔迁室内前台（640, 400），销售皮甲、锁子甲、皮帽、圆盾与防沙长袍。南门直通尽端院。',
    relatedSceneId: 'sand_moon_bazaar'
  },
  {
    id: 'sand_moon_spice_house',
    title: '沙月城·驼队香料铺',
    regionName: '绿洲东院商铺',
    icon: '🏺',
    note: '沙月绿洲城东侧独立院落驼队商铺新立面（1728×960），全域第 112 处独立安全室内！门楣挂载全域第 23 处原生“道具店”商业矢量招牌 (shop_sign: item, 偏移 -72, -184)，西域香料商人乔迁室内柜台桌前（640, 400），为远行客商供应沙月异域香料、万能药与特级以太。南门通往东院短桥。',
    relatedSceneId: 'sand_moon_bazaar'
  },
  {
    id: 'old_kingdom',
    title: '古王遗都残殿',
    regionName: '骑士王朝故地',
    icon: '🏛️',
    note: '古骑士王朝的遗都留存着残破石柱与旧酒馆，军械库设在残殿之中。昔日首席圣骑士戈闻（🎭 双形态肖像实装）在此买醉沉沦后重披重铠誓师，城中道路通向先王陵寝。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'old_kingdom_tomb',
    title: '古王先祖陵寝',
    regionName: '遗都地宫墓道',
    icon: '⚰️',
    note: '古王陵的石质墓道间，石棺与纪念立柱保留着旧王朝的痕迹。真皇王女茜罗（🎭 肖像实装）在此直面家族灭国之痛，唤醒重披战铠誓师大典。南侧入口通回遗都。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'old_kingdom_aid_room',
    title: '古王遗都·互助药室',
    regionName: '白金残殿救济室',
    icon: '💊',
    note: '古王遗都东路接 96 宽短桥连通的独立尽端院（1728×960），全域第 109 处独立安全室内。白金拱门悬挂“道具店”原生矢量招牌（全域第 20 处商业标牌）。遗都医者乔迁室内柜台（640, 400），为穿梭废墟的探险者与遗民供应金针、以太、万灵药与万能药。南门直通尽端院。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'shadow_isle',
    title: '影之孤岛山谷',
    regionName: '海外忍者世家',
    icon: '🥷',
    note: '海外山谷被黑雾与飞瀑笼罩，是忍者世家的驻地。宿敌忍者影枫（🎭 肖像实装）在此警惕注视外界动向，竹林间分布着和风居所与小径。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'shadow_clan_house',
    title: '影乡村长居所',
    regionName: '和风木质大厅',
    icon: '🏯',
    note: '影乡族长的和风居所，低桌安置在木质厅内。南侧门口通回影乡。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'shadow_hideout',
    title: '影乡忍具密舍',
    regionName: '竹林工具货仓',
    icon: '🗡️',
    note: '影乡的一处忍具小屋，门楣挂有“忍具店”原生矢量招牌。柜台走私商出售遁术卷轴，忍具匠提供风魔手里剑，屋门连接村中的竹林小径。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'shadow_herb_house',
    title: '影乡·竹叶药屋',
    regionName: '海外和风药舍',
    icon: '🌿',
    note: '影之孤岛横路东接 96 宽短桥连通的独立尽端东院（1728×960），全域第 108 处独立安全室内。门楣挂有“道具店”原生矢量招牌（全域第 19 处商业标牌）。采药人迁入室内柜台桌前（640, 400），提供金针、以太、万灵药与万能药等 4 款精制常备药草调配。南门返回东院尽端。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'mysidia',
    title: '秘法之都天穹城',
    regionName: '高空魔导城邦',
    icon: '🔮',
    note: '秘法都是高悬天穹的魔导城邦，也是学者与魔法师钻研知识的地方。云桥守望者与龙骑士苍岚（🎭 肖像实装）在城中与廊桥值守巡逻，东侧石桥连通独立东院与【秘法都·访学馆】，观星台与抄写室分列城中。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_guest_inn',
    title: '秘法都·访学馆',
    regionName: '学城东院独栋馆舍',
    icon: '🏨',
    note: '米西迪亚东侧独立石桥连通的院落馆舍，全域第 103 处独立安全室内。馆内铺设石板与木质卧榻，访学馆主在室内接待来客，提供 100 G 休整。南门返回东院。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_medic_house',
    title: '秘法都·学城药铺',
    regionName: '学城东院北侧石台',
    icon: '💊',
    note: '米西迪亚东院北侧通过石阶连通的独立石台（1728×960），全域第 113 处独立安全室内！白蓝金中性商楼门楣挂载全域第 24 处原生“道具店”商业矢量招牌 (shop_sign: item, 偏移 -72, -160)。学城药剂师迁入室内柜台桌室（640, 400），提供以太、特级以太、万灵药与万能药等 4 款精制魔力常备药剂。南门直通北石台回廊。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_archive',
    title: '秘法都抄写室',
    regionName: '魔导书卷密阁',
    icon: '📜',
    note: '秘法都的抄写室内，两侧书架与抄录桌陈设着魔导书卷。城中建筑已由原天文望远镜外观收口升级为与双魔法讲堂一致的白蓝金象牙石学术小楼（ArchiveBuilding，200, 568），书库管理员与校对学徒（🎭 肖像实装）在此整理典籍文献。南门返回秘法都。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_observatory',
    title: '秘法都观星台',
    regionName: '天象仪器圆厅',
    icon: '🔭',
    note: '秘法都的观星台内，观测仪器安置在立柱之间。镜片保管员（🎭 肖像实装）与时钟轮盘星术师在此记录天体运行。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'lufenia_ruins',
    title: '鲁菲尼亚失落遗迹',
    regionName: '超古代构装遗址',
    icon: '🛸',
    note: '鲁菲尼亚的失落遗迹留有金属回廊与能量导管，呈现着超古代文明的工艺。神秘使者半面（🎭 肖像实装）指引古代星图，维护机械人（🎭 肖像实装）提供免费全队复苏充能。构装机械保留着古老研究设施的样貌。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'twilight_world',
    title: '黄昏界断层陆块',
    regionName: '两界交汇断层',
    icon: '🌌',
    note: '黄昏界的两侧陆块由窄石路相接，断层之间露出深暗的空隙。西侧避难宿舍帐篷挂有“休息睡眠”宿屋招牌（60 G），篝火与补给箱聚在有限的平地上，居民沿这些落脚处安顿生活。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'world_rifts',
    title: '裂口集落营地',
    regionName: '时空裂口临时营地',
    icon: '⛺',
    note: '裂口集落立在破碎地面与裂缝之间，篝火照亮守军和来往居民的落脚处。索菲长老（🎭 肖像实装）值守于前哨指引点，南侧开辟全域第 115 处独立安全室内【世界裂口·救济药棚】（挂载全域第 29 处“道具店”商业矢量招牌），联合研究帐篷与补给箱分列石路两侧。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'rifts_relief_pharmacy',
    title: '世界裂口·救济药棚',
    regionName: '世界裂口救济帐篷',
    icon: '⛺',
    note: '位于时空裂口临时营地的独立安全室内（496, 680），全域第 115 处独立安全室内！紧凑三实体救济帐篷门楣挂载全域第 29 处原生“道具店”矢量招牌 (shop_sign: item，偏移 -72, -160)。救济药剂员迁入室内柜台桌前（640, 400），平价供应特级圣水 (80G)、高级恢复药 (150G)、以太 (400G) 与凤凰尾羽 (500G)。南门平滑返回裂口集落。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'empire_capital',
    title: '永曜帝都森严宫城',
    regionName: '帝国帝都广场',
    icon: '🏛️',
    note: '永曜帝都以森严宫城与石质广场相连，成对立柱围出中央通道。街侧工坊与通向下水道的入口仍能辨出皇都的日常设施。西南侧坐落着【永曜帝都·救济所 (CapitalReliefHouse)】；停钟看守、宫门传令员、疏散书记与分粮人（🎭 肖像实装）值守广场各处维持秩序与物资发放。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'capital_medic_house',
    title: '帝都·街角药铺',
    regionName: '帝国东院工坊药舍',
    icon: '💊',
    note: '永曜帝都东路接 96 宽短桥连通的独立尽端院（1728×960），全域第 110 处独立安全室内。工坊风格侧楼门楣悬挂“道具店”原生矢量招牌（全域第 21 处商业标牌）。帝都药师乔迁室内柜台前（640, 400），提供金针、以太、万灵药、万能药与凤凰尾等 5 款常备平价药剂。南门直通尽端院。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'empire_sewer',
    title: '帝都侧殿地下水路',
    regionName: '皇城暗渠水道',
    icon: '💧',
    note: '帝都侧殿下水道位于宫城下方，狭长石路沿墙延伸。遮蔽处与排水通道旁保留着立柱，南端通回地面广场。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'nil_palace',
    title: '黑晶王座深空宫殿',
    regionName: '暗色云隙黑晶圣座',
    icon: '👑',
    note: '黑晶宫殿的深色石台悬在暗色云隙之间，成排立柱围住通往王座的中央石路。黑晶御座与内殿门框构成这座宫殿的轮廓。终战前夕，瓦达的回声（VataSpirit）与半面的回声（HalfSpirit）以幽蓝半透明身形现身（🎭 回声中性肖像实装，vata-echo-neutral.png / half-echo-neutral.png），共鸣祝福的重复回话全景出脸。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'nil_world',
    title: '非之世界虚无悬台',
    regionName: '次元终焉深暗空隙',
    icon: '💠',
    note: '非之世界由深暗空隙中的孤立石台与窄路组成，左右晶簇映出有限的光。入口门框立在南侧通路，石台之外没有可踏足的地面。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'ff1_pravoka',
    title: '普拉博卡滨海港口镇',
    regionName: '普拉博卡海滨',
    icon: '⛵',
    note: '滨海港口镇的民居、仓屋与旅店围绕街道和广场分布。船匠熟悉沿岸礁石，向旅人讲解航行与靠岸的注意事项。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'ff1_elfheim',
    title: '精灵之里·艾尔芙城',
    regionName: '艾尔芙精灵领地',
    icon: '🧝',
    note: '林木围绕精灵之里，花坛、树屋与小屋沿石路分布。白魔树屋与黑魔树屋门楣挂有专属魔法矢量标识牌。舞者在花间起舞，北面的道路连接精灵城。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'ff1_elf_castle',
    title: '精灵城王室病室',
    regionName: '精灵沉睡王都',
    icon: '🏰',
    note: '精灵城的石墙将床榻所在的病室与外廊分隔，地毯铺在室内石面上。王室医生（🎭 肖像实装）在此看护，苏醒后的精灵王子（🎭 肖像实装）向勇者赠予神秘钥匙。南侧通道返回精灵之里。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'ff1_western_keep',
    title: '西城荒废城堡',
    regionName: '旧西方要塞',
    icon: '🏚️',
    note: '荒废城堡的石墙围出宽阔厅堂，地毯沿中央通道铺向北端。西城国王（🎭 肖像实装）在深处王座等候勇者寻回王冠。南侧城门通回大陆。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'phantom_tavern',
    title: '幻影酒馆前厅',
    regionName: '幻影之村休憩所',
    icon: '🍺',
    note: '幻影酒馆的木地板上排列着吧台与茶桌，宿屋掌柜在前厅招呼旅人。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'phantom_magic_shop',
    title: '幻影魔法店前厅',
    regionName: '次元裂隙魔法商铺',
    icon: '✨',
    note: '幻影魔法店前厅以书架和柜台分隔空间，老法师在柜前接待来客。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'phantom_magic_rear',
    title: '幻影魔法店后室',
    regionName: '次元裂隙秘术内室',
    icon: '🔮',
    note: '幻影魔法店柜后是一间木地板小室，两段柜台在室中并列，商人在北侧接待来客。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'phantom_cellar',
    title: '幻影酒馆地下密室',
    regionName: '幻影地下黑市商会',
    icon: '🍷',
    note: '幻影酒馆地下的木质厅室摆着吧台和茶桌，武器商与防具商在这里接待旅人。',
    relatedSceneId: 'phantom_village_haven'
  },
  {
    id: 'ff1_marsh_b1',
    title: '沼泽洞窟·地下一层',
    regionName: '沼泽洞窟回廊',
    icon: '🕳️',
    note: '石壁将洞层通道分成东西两侧，北端走廊把两边相连。西北与东南通路分别连接地下二层的北、南分支。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'ff1_marsh_b2_north',
    title: '沼泽洞窟·北侧地下二层',
    regionName: '沼泽北翼石室',
    icon: '🪨',
    note: '石墙分隔出数处小室，中段横向回廊连接东西两翼。东南侧通道返回地下一层。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'ff1_marsh_b2_south',
    title: '沼泽洞窟·南侧地下二层',
    regionName: '沼泽南翼深穴',
    icon: '⛓️',
    note: '中段石廊连接南侧并排的石室与东北角房间。北侧通道返回上一层，东南通路继续下行。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'ff1_marsh_b3',
    title: '沼泽洞窟·地下三层',
    regionName: '沼泽王冠密室',
    icon: '👑',
    note: '多排小室由横向回廊串联，石墙与门洞将各间房分隔。东南侧通路返回南侧地下二层。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'ff1_matoya_cave',
    title: '玛托雅洞窟',
    regionName: '盲眼魔女居所',
    icon: '🧙‍♀️',
    note: '玛托雅居住的石质洞室中，床铺、书架和地毯构成简朴的生活空间。盲眼魔女玛托雅（🎭 专属肖像实装）在洞内守候遗失的水晶之眼。东侧走廊通向居室，南口返回大陆。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'ff1_chaos_shrine',
    title: '始源混沌神殿',
    regionName: '混沌轮回圣域',
    icon: '🏛️',
    note: '古老神殿的石墙分隔中央大厅与西侧房间，立柱沿南北通道布置。南侧入口连通大陆。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'highwind_tower',
    title: '高风塔石质门厅',
    regionName: '高风塔下层入口',
    icon: '🗼',
    note: '高风塔的石质门厅由墙面围合，中央石路向东北楼梯延伸。南侧出口通回大陆，楼梯连接上层风道。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'highwind_tower_2',
    title: '高风塔中层风道',
    regionName: '高风塔中层走廊',
    icon: '🌬️',
    note: '高风塔的中层风道以横向石路连接东西两端，东侧通道折向北面。西侧楼梯返回门厅，东北楼梯通往巢台。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'highwind_tower_3',
    title: '高风塔顶层巢台',
    regionName: '高风塔飞龙栖台',
    icon: '🐉',
    note: '塔顶石台上分布着飞龙巢与龙卵，飞龙在巢边歇息。南侧楼梯通回下层风道。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'heliogabalus_keel',
    title: '未完工战舰·龙骨舱',
    regionName: '战舰重工龙骨下层',
    icon: '⚙️',
    note: '未完工战舰的龙骨舱以中央通道连接两侧区域，动力引擎、货箱与船肋栏杆陈设其间。南侧出口返回战舰核心舱。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'old_kingdom_vault',
    title: '古王陵皇家藏室',
    regionName: '王陵宝物密阁',
    icon: '💎',
    note: '王陵内的皇家藏室以石墙围出储藏空间，两侧置有货箱，立柱立在西南侧。南侧门口通回古王陵。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'old_kingdom_crypt2',
    title: '古王陵下宫石棺厅',
    regionName: '王陵下层地宫',
    icon: '⚰️',
    note: '古王陵下宫的中央石台安置着石棺，两侧立柱分列横向通道。南侧出口返回上层王陵。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'longqi_inner',
    title: '飞龙巢·内巢',
    regionName: '飞龙天险深处洞穴',
    icon: '🐉',
    note: '飞龙巢的内侧岩道由高低岩台围出通路，空巢与龙卵分列两侧。南侧洞口返回外巢。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'yggdrasil_root',
    title: '世界树·树根空腔',
    regionName: '世界树深层粗根地',
    icon: '🌳',
    note: '世界树的粗大根须伸入幽暗林地，根体两侧留有相通的步道。南侧出口返回世界树。',
    relatedSceneId: 'yggdrasil_tree_kingdom'
  },
  {
    id: 'mermaid_trench',
    title: '人鱼湾·珊瑚海沟',
    regionName: '深海珊瑚暗潮海床',
    icon: '🪸',
    note: '人鱼湾潮沟的海床两侧分布着粉色与蓝色珊瑚，中央通道位于两侧深水边缘之间。南侧出口返回人鱼湾海底。',
    relatedSceneId: 'cape_town_harbor'
  },
  {
    id: 'lufenia_core',
    title: '鲁菲尼亚·核心舱室',
    regionName: '古代魔道核中枢',
    icon: '🔮',
    note: '魔道核的中央石台与两翼平台由石路相连，导管设备和立柱分布其间。南侧出口返回古魔道废墟。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_cave',
    title: '米西迪亚·秘法洞阶',
    regionName: '秘法古都深层洞厅',
    icon: '💎',
    note: '秘法洞阶的石墙围着石质厅室，北侧石阶与两旁晶簇相对，步道沿中轴延伸。南侧出口返回秘法都。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'ash_cellar',
    title: '焦土烬堡废墟地窖',
    regionName: '旧城塞地窖残基',
    icon: '🏚️',
    note: '烬堡地窖铺有石质地面，残墙与成对立柱分隔内部空间。听取老斥候（🎭 肖像实装）线索后开放进入，藏有烈火盾宝箱。南侧出口通回烬堡废墟。',
    relatedSceneId: 'old_kingdom_ruins'
  },
  {
    id: 'mysidia_cave_2',
    title: '米西迪亚·秘法洞卷轴库',
    regionName: '秘法古都典籍藏卷库',
    icon: '📜',
    note: '秘法洞的卷轴库以石墙围出阅览空间，书架与桌台分列中央通道两侧。南侧出口返回秘法洞阶。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_cave_3',
    title: '米西迪亚·秘法洞禁书腔',
    regionName: '秘法古都虚无封藏层',
    icon: '📖',
    note: '秘法洞的禁书腔铺着虚无之石，绕中央虚空晶簇分布着封藏书架。东北通道由卷轴库深入，南侧通道返回卷轴库。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_white_hall',
    title: '米西迪亚·白魔讲堂',
    regionName: '白魔学派教习大殿',
    icon: '✨',
    note: '白魔讲堂的石质厅内分列书架与课桌，大导师白眉在中央接待求学者。城中入口升级为白蓝金象牙石魔导独立小立面（WhiteHallFacade，384, 176），门楣挂载全域第 25 处白光十字“白魔法”专属矢量标牌 (shop_sign: white_magic，偏移 -72, -140)。南侧门口返回秘法都。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'mysidia_black_corridor',
    title: '米西迪亚·黑魔回廊',
    regionName: '黑魔法学者深研长廊',
    icon: '⚡',
    note: '黑魔回廊以石墙围成狭长通道，成对立柱与北端书架分隔室内空间。黑袍大魔道士在回廊接待求学者。城中入口升级为白蓝金象牙石魔导独立小立面（BlackCorridorFacade，864, 176），门楣挂载全域第 26 处紫晶符文“黑魔法”专属矢量标牌 (shop_sign: black_magic，偏移 -72, -140)。南侧门口返回秘法都。',
    relatedSceneId: 'mysidia_magic_city'
  },
  {
    id: 'ff1_elf_white_treehouse',
    title: '艾尔芙·白魔树屋',
    regionName: '精灵之里西侧古木讲所',
    icon: '🌿',
    note: '艾尔芙的白魔树屋铺着木地板，书架与双侧桌台围出中央通路。白魔法学者在屋内接待来客，南门返回精灵之里。',
    relatedSceneId: 'elfheim_town'
  },
  {
    id: 'ff1_elf_black_treehouse',
    title: '艾尔芙·黑魔树屋',
    regionName: '精灵之里东侧古木研所',
    icon: '🔮',
    note: '艾尔芙的黑魔树屋内，木地板连接书架与两侧桌台之间的通路。黑魔法学者在屋内接待来客，南门返回精灵之里。',
    relatedSceneId: 'elfheim_town'
  },
  {
    id: 'twilight_shelter',
    title: '黄昏界·避难宿舍',
    regionName: '终焉黄昏庇护所宿所',
    icon: '⛺',
    note: '黄昏避难宿舍的木质地面上并排安置着床铺，管理员与疲惫的避难者留在室内。南侧出口通回黄昏界。',
    relatedSceneId: 'abyss_entrance'
  },
  {
    id: 'rift_research_tent',
    title: '裂口·联合研究帐篷',
    regionName: '世界裂口学者集落',
    icon: '⛺',
    note: '裂口联合研究帐篷的木质室内摆有分析桌与书架，学者联队和助手在桌旁停留。南侧出口返回裂口集落。',
    relatedSceneId: 'world_rifts'
  },
  {
    id: 'sand_moon_armory',
    title: '砂之月都·旧军火藏室',
    regionName: '沙月贫民区旧军火库',
    icon: '🗡️',
    note: '沙月的旧军火藏室以石质墙面围合，货箱分置在中央通道两侧。南侧出口返回贫民区。',
    relatedSceneId: 'sand_moon_palace'
  },
  {
    id: 'sand_moon_slum',
    title: '砂之月都·贫民区石路',
    regionName: '沙月下层平民区',
    icon: '🏚️',
    note: '沙月贫民区的石路沿墙根延伸，货箱堆在通道一角。阶段人物摩陀雅与据点幸存者（🎭 肖像实装）在剧场事件后驻守于此抚慰难民。南侧通路连接剧场，西南墙边的门通往旧军火藏室。',
    relatedSceneId: 'sand_moon_palace'
  },
  {
    id: 'empire_airship',
    title: '帝国飞空艇·甲板',
    regionName: '帝国旗舰飞空艇',
    icon: '🚢',
    note: '帝国飞空艇的木质甲板由舷栏围住，两侧动力引擎、船舵与货箱分区安置。撤离瞭望员与甲板信号兵（🎭 肖像实装）值守于甲板，舱口通向医务与补给船舱，西侧跳板连接烬堡。',
    relatedSceneId: 'empire_capital'
  },
  {
    id: 'empire_airship_cabin',
    title: '帝国飞空艇·医务船舱',
    regionName: '飞空艇内医务与补给舱',
    icon: '🩺',
    note: '飞空艇船舱的木地板间安置着床铺与医药柜，随舰医务员和补给员在室内值守。南侧舱门返回甲板。',
    relatedSceneId: 'empire_capital'
  },
  {
    id: 'origin_temple',
    title: '始源神殿·石质正殿',
    regionName: '始源水晶祭祀神殿',
    icon: '🏛️',
    note: '始源神殿的岩壁围出石质殿堂，中央石路与横向通道连接立柱之间的空间。终局皇帝言昭（🎭 肖像实装）端坐终焉核心直面光之战士，神殿祭司长、守卫队长与侍童值守殿中维护结界。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'harmonia_camp',
    title: '谐律难民营',
    regionName: '谐律平原难民营地',
    icon: '⛺',
    note: '谐律难民营的草地上分布着三顶帐篷，土路将篝火与补给货箱连在一起。南侧出口通回大陆。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'new_crystal',
    title: '新晶石·祭坛平台',
    regionName: '新晶石石质祭坛',
    icon: '💎',
    note: '新晶石前的石质平台铺着纵横相交的通道，两根立柱分列北侧。西侧通路连接裂口集落，东侧通向永曜帝都的屏障前。',
    relatedSceneId: 'world_rifts'
  },
  {
    id: 'rift',
    title: '时空狭缝',
    regionName: '次元裂隙暗色空隙',
    icon: '🌀',
    note: '狭缝由暗色空隙中的几块石台与窄路组成，西侧篝火与东侧晶簇分居两翼。北端门框立在中央通道尽头。开路战士瓦达（🎭 肖像实装）在此立誓，决战前夕为队伍斩开通往帝国的暗流狭径。原通路补给员（336, 576）身旁新增静态木桶物资与全域第 30 处原生“道具店”用途牌（桶脚 400, 576），仍供应原五货且无新增房屋或门。',
    relatedSceneId: 'world_rifts'
  },
  {
    id: 'restored_world',
    title: '复苏世界·居住区',
    regionName: '始源复苏之野',
    icon: '🏡',
    note: '绿地上的小屋与松树分列石路两侧，纵向步道与两条横路贯穿居住区。西侧为归乡宿屋，东侧原木药舍已接通独立归乡药铺。南侧出口连接大陆。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'restored_apothecary',
    title: '复苏世界·归乡药铺',
    regionName: '复苏村东侧原木药舍',
    icon: '💊',
    note: '复苏世界东侧原木药舍连通的独立安全室内（1280×960），全域第 105 处独立安全室内。门楣挂有“道具店”原生矢量招牌（全域第 16 处商业标牌）。归乡药师迁入室内柜台，为战后回归的遗民与旅人提供常备伤药与解毒剂。南门返回街道。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'phantom_chocobo_grove',
    title: '幻影之村·陆行鸟后山清泉',
    regionName: '幻影之村秘密后山',
    icon: '🐥',
    note: '幻影之村后山的草地与林木环绕着清泉，林径连接泉边与酒馆后门。黑陆行鸟饲养员（🎭 专属肖像实装）在此看顾传说中的黑陆行鸟，南侧门口返回幻影酒馆。',
    relatedSceneId: 'phantom_village'
  },
  {
    id: 'harmonia_airship',
    title: '永曜飞空艇·开场甲板',
    regionName: '永曜先遣飞空艇',
    icon: '🚢',
    note: '永曜飞空艇的木质甲板沿边缘设有舷栏，两侧动力引擎安置在木底座上。督战官在甲板值守，东侧跳板连接始源神殿。',
    relatedSceneId: 'chen_hui_palace_town'
  },
  {
    id: 'factory_mine',
    title: '织造暗矿·吊笼间',
    regionName: '暗矿矿脉深层停靠台',
    icon: '⛓️',
    note: '暗矿吊笼的石质厅内设有停靠平台，直绳悬在平台两侧，护栏沿台缘分布。南端踏步接上通道，出口返回矿脉岔。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'factory_mine_2',
    title: '织造暗矿·矿脉岔',
    regionName: '暗矿矿脉深层横廊',
    icon: '⛏️',
    note: '矿脉岔的石质横廊连接左右矿翼，中央隔墙将上部空间分开。西侧机组与东侧器械柜、晶脉分区陈设，南侧通路返回矿核。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'factory_mine_3',
    title: '织造暗矿·矿核',
    regionName: '暗矿矿核动力中枢',
    icon: '💎',
    note: '织造暗矿的矿核铺着石地，中央晶脉两侧分布着机械引擎与器械柜。东北矿门连接矿脉岔，南侧出口通回织造城工坊。',
    relatedSceneId: 'factory_city_workshop'
  },
  {
    id: 'coliseum',
    title: '深渊竞技场·守门殿堂',
    regionName: '深渊回廊玄关入口',
    icon: '🏛️',
    note: '深渊竞技场的入口是一间由石墙围住的石质厅堂，守门人在厅中值守。铺石通道穿过厅内，南侧出口连接大陆。',
    relatedSceneId: 'world_rifts'
  },
  {
    id: 'phantom_magic_alley',
    title: '幻影之村·魔法店暗巷',
    regionName: '幻影之村隐秘走廊',
    icon: '🚪',
    note: '幻影之村魔法店外墙围出一条暗巷，木质地面沿建筑后侧延伸。背窗木扉设在外墙上，南侧原路通回幻影酒馆。',
    relatedSceneId: 'phantom_village'
  }
]
