# 2026-10-27 新建15聊天持续开发

真人本次明确恢复：新建13开发+2测试，原总体进度聊天只查询；覆盖历史零点停止和1%阈值。请求能执行即继续，实际平台阻断/真人停止/必要人类决定/安全阻塞除外。不购买/兑换重置/付费绕行。不push、部署或Gitee。

当前基线ef82b9e2e，初始工作区干净。旧15聊天保持归档。进度原聊天01a16de4-b59a-70b0-81ca-64a7743dfe0a只读恢复，不占新15。根协调01a17af8-9a4f-7e01-b869-be9240b3a9c1。

所有开发先读docs/FEATURE_DEVELOPMENT_ASSIGNMENTS_2026-10-26_RESTART.md最终状态，旧功能不得重做。优先既有规范/未完成实现，不凭空凑功能；在本人独占模块选择可逆最小实现并记录依据，真实产品规则/数值/资源决策缺失则给根具体选择，继续本域其它工作。跨界写入必须根先裁唯一owner。根负责统一接入口与Git串行收录。

| 编号 | 职责 | 唯一可写生产范围 | 初始方向 |
|---|---|---|---|
| D01 | 主线目标追踪与居民标记 | gdscripts/scene/world/main_story_tracking_model.gd、bounty_tracking_model.gd、resident_source_registry.gd、exploration_residents.gd及main_story_tracking_early/middle/late.gd | 先核aecbe46bd已接入的居民marker，禁止重做；沿当前公开主线目标追踪原规范找实际未完成能力并交付最小增量。首查仅静态接线后尚缺的正式来源使用，勿凭空扩大任务规则。 |
| D02 | 机关练习功能 | gdscripts/puzzle/与gdscripts/scene/ui/partyMenu/puzzle_*.gd | 核已交付单题/连续练习及历史筛选，沿既有机关规范补真实未完的玩家能力，复用题库，不写正式解题记录/奖励。 |
| D03 | 怪物百科与已知情报 | gdscripts/scene/ui/partyMenu/settings_encyclopedia.gd、monster_*.gd | 沿现百科规范找尚未消费且有真实数据的玩家情报能力，保未发现遮蔽；已完成比较/元素筛选/奖励双栏不重复。不实现假3D/无分母收集奖励。 |
| D04 | 装备方案功能 | gdscripts/systems/equipment_presets.gd、gdscripts/scene/ui/partyMenu/equipment_preset_*.gd | 核当前方案能力及规范，交付真实未完成的方案操作或阅读能力。已交付差异/元素异常对照不重复；禁止未裁HP/MP数值/卸装规则。 |
| D05 | 存读档与备份功能 | gdscripts/scene/ui/common/save_*.gd、gdscripts/scene/ui/partyMenu/save_page.gd、gdscripts/scene/ui/loadSave/ | 核原存读档规范与现实现，开发可证实未完的玩家能力，保schema、原子写、恢复语义；已交付搜索排序详情全选重名重试不重做。 |
| D06 | 任务页与悬赏展示 | gdscripts/scene/ui/partyMenu/task_page.gd、task_*filter*.gd、task_collection_progress.gd | 沿原任务规范补真实未完的玩家任务功能，保接取/完成资格与追踪协议；已交付地点统计/收集清单不重复。不改D01追踪模型。 |
| D07 | 冒险情报手册 | gdscripts/scene/ui/partyMenu/adventure_intel_*.gd | 沿手册与酒馆既有规则开发真实未完的已购情报使用能力；已有章节筛选/字号/阅读定位不重做，不泄未购或写原购买规则。 |
| D08 | 职业技能说明与可用性 | gdscripts/scene/ui/partyMenu/job_skill_description*.gd、gdscripts/scene/ui/partyMenu/job_page*.gd | 核职业技能规范与界面实际缺项，开发玩家可见技能阅读/资格说明功能，沿真实职业/技能数据，不新增数值/职业解锁。 |
| D09 | 道具与重要物品界面 | gdscripts/scene/ui/partyMenu/item_page*.gd及新item_ui前缀helper | 核道具与重要物规范和现界面，开发有真实来源的未完玩家功能；不改道具数值/库存事务，不借存档或悬赏改规则。 |
| D10 | 魔法菜单功能 | gdscripts/scene/ui/partyMenu/magic_page*.gd及新magic_ui前缀helper | 沿原法术菜单规范补未完的查看/选择/学习来源说明能力，保已购/角色/职业资格；不生成VFX、不改数值/战斗目标/魔法数据库。 |
| D11 | 地理百科与探索资料 | gdscripts/scene/ui/partyMenu/encyclopedia_region*.gd、encyclopedia_geography*.gd | 沿既有地理百科规范交付实际未完成的信息浏览/探索功能；只公开已解锁已知内容，不擅定全游戏分母或给奖励。不改D03总百科页，新增入口先交根。 |
| D12 | 悬赏奖励预览 | gdscripts/scene/ui/partyMenu/bounty_reward_*.gd | 沿原领赏规范交付真实未完的玩家奖励预览能力，复用真实数据和资格。已有容量说明与装备假设比较不重做，不授予奖励、不改交易/数值。 |
| D13 | 探索服务交互功能 | gdscripts/scene/world/exploration_services.gd、regional_shop_sign.gd、sky_city_market*.gd | 沿当前商店/客栈/探索服务规范核真实未完玩家功能并最小实施；四店和天空住宿已完成不重做，不增收费/货架/来源许可，不改D01居民安装器。 |
| T01 | 新功能原场景与交互测试 | 仅docs/verification/restart-20261027-T01/及仓库外私QA | 负责D01/D02/D03/D06/D07/D11新交付的正式入口、UI/焦点/生命周期、原场景增量；先审待验源hash，已存在居民marker可作为首个未独验范围；不泛重跑旧矩阵。 |
| T02 | 新功能状态与持久化测试 | 仅docs/verification/restart-20261027-T02/及仓库外私QA | 负责D04/D05/D08/D09/D10/D12/D13新增量、取消/换档/旧回调/持久化守恒。现居民marker先做target/UI/save语义未变静态核，不复刷方向52或原冷读11/13。 |

所有owner仅写自有docs/verification/restart-20261027-编号/HANDOFF.md，记录功能证据/修改/hash/实际验证/未验/下一步，不并写本分工或旧文档。开发者不得git add/commit/push/fetch，不创建聊天/子代理/心跳。测试不改生产，只给owner报告。任何引擎/导入共用/tmp/codex-godot-engine-serial.lock，私完整工程/SQLite/profile隔离，保持真实档及seed。中文GDScript注释；保留原红/警告；独立QA/中央接入/自然流程/真人验收分列。

开发首项先查本人边界是否已有未提交工作与具体规范，最小检查后实施。不能将一轮结束当持续开发停止理由；没有真实可执行项时明确候选/依赖/阻塞并交根重新分配，避免空等重刷。

## 实际创建回执

根已根据真实源码缺口追加独占范围：D01可改bounty_tracking_hud.gd的hint真实host调用接线，解决巡游NPC文字方位滞后；D07可改tavern_ale_order.gd、tavern_stout_order.gd，仅有效首购收据增加既有手册入口引导，不改购买事务。其它owner不得写上述源。两项按新增hash独验，不沿旧结果宣称通过。

godot-15小时协调心跳已由官方工具创建为ACTIVE；仅有实质变化才通知。用于意外中断后的续作，不代表平台保证无限运行。原始15聊天创建后全部active，其中D07首次调查收口后已由根分配明确跨界写权并续派。尚无本批功能通过或远端发布声明。

15个新聊天均经list_threads核实active。T01创建曾返回outcome-unknown，已由列表匹配真实ID恢复，没有重复创建。当前仅证明启动，不代表功能已交付。

| 编号 | 聊天ID |
|---|---|
| D01 | 01a17afb-278b-7da1-a5c1-a198d889c50b |
| D02 | 01a17afb-317f-75f1-8f23-c98d65c0975b |
| D03 | 01a17afb-4afd-7b53-a20b-4b4e4224b5d7 |
| D04 | 01a17afb-67c6-7252-ab1d-11b53e205400 |
| D05 | 01a17afb-a34d-7120-b4fa-e7ba84a6ddc9 |
| D06 | 01a17afb-bad3-7920-9c89-27e429143d66 |
| D07 | 01a17afb-c5ec-77e2-8b25-998c38c6be02 |
| D08 | 01a17afb-d6fb-7b40-a939-fcb80aef1e9d |
| D09 | 01a17afb-f47c-7c31-a6d6-13de900b2ee1 |
| D10 | 01a17afc-1410-77c2-91c5-74ec8b63b262 |
| D11 | 01a17afc-3b20-7f42-b6ba-8c408cedf9e1 |
| D12 | 01a17afc-618e-7a23-80b7-38a919741895 |
| D13 | 01a17afd-1eb3-7642-9bf6-d4ca28a3c23f |
| T01 | 01a17afd-8b6a-7f22-bcf5-e369e7d51c43 |
| T02 | 01a17afe-6255-73e2-8a46-82aaed0fa421 |

## always续作与首批收录审阅

真人再次明确always不停；根承认启动后结束协调轮次不符合要求，已恢复当前轮持续审阅/集成/续派，不以小时心跳代替当前工作。当前实读used84%、ordinaryUsageAllowed=true，继续。

D07真实首购收据120px超过113px，两项裁切红已回派owner，仅分两对白事件修复；T02已续接各最终release独验。D04新增equipment_comparison.gd结构化拒绝原因唯一writer，先保原status/ready字段与predicate语义，再由D12消费；D08扩写JobPage既有组件直达说明入口，原首项两源冻结；D05可同步原SAVE_LOAD_AND_PERSISTENCE_SPEC旧三槽示意与真实30条实现，不迁schema。D13先核harmonia_inn原服务迁入具体合同，不跨中央写。D01核预判奖励正式消费者、D02核正式解谜参与者、D06核SQ10真实欠账，先给具体合同不臆造规则。D11先保持首项冻结，根收录后修已实见画布右缘越框。

根已读D01/D02/D06/D11实际diff、作者/独验原结果并查看实时居民HUD、连续练习耗尽、父页地区拖移原图。独立只读审查未发现上述增量新增缺陷。T01规则21/21、任务焦点16/16、地区拖移15/15 exit0；D01本体全部通过，但其所在17项run整体exit1为顺带补D06截图缺帧，原件不改，稳定截图后来在地区相闭合。居民marker67项只绑定旧model/HUD，不冒新两源已在该67中受测；新方位单独分相。地区旧越框另排修，不冒全页布局通过。

本批仅准备本地收录上述七份生产源与其现有作者/独验证据，尚不宣称其余模块独验或全产品通过；无push/部署。网页目录同行修改及提交不属于根的功能交付，始终不收录。

## 下一方向：真人已选择地图与任务可玩内容

真人异步回答明确选择“地图与任务可玩内容（推荐）”。根按现有北窟三层静态资产/地名册选择最小可玩首版：入口north_cave→north_cave_2→north_cave_3及原路返大陆，三级各一处原景物调查，复用完整碰撞和美术，不新建怪物/奖励/主线推进/收费/持久字段。此具体首版与接口为根的可逆实施决定，不冒称真人逐项指定。使用generate2dmap的project-native/既有tile与prop模式，visual_asset_source=existing_assets，不生成新图。

- 开放沿北境现行ch02_restore_trust完成，世界门loc_north_cave原(1200,180)，候选返场(1200,268)，须原身体/地表/公开寻路实测，失败则回根裁局部入口适配，不改全大陆岸线。只第一层挂世界旗；错误载具/远距/旧owner不得入。
- floor1出生(640,800)，南口(640,880)返世界；down(1080,360)→floor2(272,520)。floor2西口(200,520)→floor1(1008,360)，东北口(1080,280)→floor3(640,800)。floor3南口(640,880)→floor2(1008,280)。所有点是沿原静态已测来源的实施候选，完整身体/防反弹再验，不能拿旧静态16路径直接当正式互连通过。
- 三层安全探索，不触原晶石推进、题库、故事及战斗。各一景物调查只描述可见岩地/晶簇；位置由实际可达脚点定，不穿碰撞、不造新NPC身体。
- 采用原story_map及原保存合同，只增加三ID到明确可选允许域并委托本route.valid_record/valid_snapshot与safe_foot，合法原位置保持，坏点回本层安全出生，门户圈拒作冷读出生；不迁schema，不创建新档类型。

| owner | 唯一新写域 | 固定接口/责任 |
|---|---|---|
| D13 | 新gdscripts/scene/world/north_cave_route.gd | supports_map(id),is_open(),entries(),navigation_hint(id),hud_status(id),investigations(id),make_environment(id),safe_foot(id,point),valid_snapshot(payload),valid_record(payload),can_enter(host,id,spawn),can_return(host)；原完整布局读取与有界互连配置，不改中央 |
| D02 | 新gdscripts/scene/map/north_cave_route_environment.gd、north_cave_corridor_route_environment.gd、north_cave_crystal_route_environment.gd | 各继承原对应静态组件，原ID/身体/表面保持；build(host,config)隐藏过时未接方向Label，resolve_spawn委托route.safe_foot，坏点回本层route.entries出生；不改旧静态源/JSON |
| D11 | 新gdscripts/scene/world/north_cave_sites.gd | static install(host:Node2D)，复用north_pass_sites模式与ROUTE.investigations；真实host/Player/owner/cycle/active party/当前图/近身/对白模式锁，旧回调拒，不造碰撞身体/新奖励 |
| D01 | story_map_catalog.gd、story_map_data.gd、scene/map/story_map_scene.gd、autoload/game_state_save.gd及确需的既有world唯一接点 | 唯一中央接线；先读依赖合同、只静态准备，所有依赖最终SHA释放后接线+窄smoke；原其它路线/保存/世界门保持 |
| D06 | northern_route_query_model.gd及确需原query_view独立小改 | 依赖释放后新增三ID与入口north_cave读取，沿已有资格/当前位置/已公开路线查询，不泄未开放图，不与D01中央并写 |
| T01 | 本人私QA/证据 | 最终中央释放后只验原世界步行入→三层实际完整身体/门户/调查→原路出、错误载具/旧回调/冷读不误反弹与实际Metal图，不重刷旧北境矩阵 |
| T02 | 本人私QA/证据 | 原SavePage真实保存及独立新进程原LoadSave冷读层2/层3代表、合法位置/坏点/旧owner/返程可用、DB/源seed守恒；新菜单增量按hash排队 |

route.make_environment按上述三新路径运行时load防预加载环；investigations行合同{id,title,position:Vector2,text}。D13可先实现route+纯配置/safe_foot作者窄验，不在环境未释放时冒完整工程；D02/D11可先独立静态/作者组件检查，不各自重刷保存/世界矩阵。全engine仍共用原锁/私工程SQLite/profile，根收录后立即续作。旧待办只按文档末尾当前状态核，已接预判链不重做，harmonia/rusalka旅店因母城未落地已撤下本轮候选，不迁免费服务或臆造40G店主。

北窟合同精化：D01唯一可将三ID加入json/maps/area_levels.json现glacial/ridge/north_pass同组7–10范围，旧ID和收益参数不改；未配置默认放行不算完成等级门禁。沿旧可选route严格保存合同：record/snapshot的坏格式、非有限、错scene/载具以及有限但几何不安全/门户圈均预检拒绝；wrapper坏点回退仅运行态防御，不承诺坏档可读后修复。route validator不读当前Story门禁，避免A档状态拒合法B档。can_enter同一接口同时核世界→floor1及三层exact有向门户/target_spawn/真实近身源；合法已捕获pending请求不得因_is_transitioning=true被误拒，sites调查仍拒转场。

当前本地收录：264b8dbbd为D01/D02/D06/D11首项，45496ba72为怪物物理/全状态免疫，637dc376f为D04/D05/D08/D09/D10/D12首项及实际保存规范同步，550b6f6e4为D07收据拆页与D11父框修复。均无push。T02六项独验8/9/9/7/7/8各自exit0，原D09选人expected与D10 NOT NULL夹具红保留；T01收据修复28与地区新框14各exit0。根已核源SHA、raw结果、DB/seed/cleanup及关键实图，不合并为全产品通过。新JobPage导航静态发现popup.show同步切人后重新offer的疑点，已按systematic-debugging交T02复现/D08唯一owner，不因已有作者35/36或静态审阅无发现就跳过该边界。


## 本轮继续执行与新增本地收录（当前优先）

真人已选地图与任务可玩内容，当前主线仍为北窟正式接线/独验，不因组件或一轮收录结束。最新实读used94%、ordinaryUsageAllowed=true，剩余6%仍执行；历史<=1%停机规则被本次真人明确指令覆盖，仅实际平台阻断等有效停止条件才停，不兑换reset credit或购买额度。

根新增本地提交：e5c1937d2为D08职业页技能说明导航及同步关闭修复（T02原9项8过1真实红保留；最终fix7/7、exit0零诊断）；d2f36032f为D09页内显式目标切换（T02原PartyMenu→ItemPage→切塞拉→实际药仅治该人并扣1，16/16、exit0零诊断）；0020cf7a7为D04正式比较拒绝原因及D12消费安全回退（真实B16/16属于旧consumer相，bad-projection原4项2失败保留，最终guard8/8、exit0零诊断，未知status/key或错配text不回显任意字串）。根已核当前/释放/受测SHA、私DB/seed/PID/profile与实际职业阅读/切人原图。均无push；同行web提交不属于本交付。

5bc606791只收录D13最终route、D02三wrapper、D11sites共5个独立组件及作者原证据，**不是中央已接或北窟正式可玩验收**。route最终3d961e…；sites9e2076…；原静态布局/完整身体未改。D01唯一中央六源仍WIP，正在补builder原门户对象弱引用来源票后做smoke，T01/T02只消费最终释放。T01核心世界/调查QA不依赖D06query释放；D06待中央catalog/area等级最终再做查询独验，不形成互等。

D03招式阅读独验普通16/16后，单独同步hide边界实际6项4通过2失败（exit1零诊断）：同帧换owner仍展示旧招式并抢焦点；已回D03唯一writer，原红冻结。关闭show边界及隐藏返回列表旧回调仅补最小代表，尚不称修复通过；模型白名单不扩。

北窟最终合同覆盖早文候选：WORLD_RETURN=(1232,268)，原(1200,268)撞旧门红保留。新写存档须gate开放；严格record/snapshot坏格式/非有限/错场景载具/不安全几何/门户圈先拒绝，只有运行时wrapper坏spawn回本层安全点。恢复合法在场档不借当前旧Story gate否决，已在场gate-closed三→二→一→大陆须仍能实际撤离；向深层和世界新进场仍须gate。


提交范围纠正：95f925010原计划只收本进度文件，但并发同行在共享index加入web/src/config/homePortalConfig.ts、web/src/views/DungeonsView.vue、SystemsView.vue、UpdatesView.vue四文件，根误用普通git commit一并收录81行。此为根范围检查失误，不能称从未收录同行web；这四文件不归本轮功能交付或验收，未回退内容/改写历史。后续提交使用明确pathspec的git commit --only并复核受测SHA，避免吞并同行暂存。


## 根核定北窟中央进入独验冻结

根已逐SHA复核当前12源与D01最终candidate相同，读取36/36原接线相及最终13/13临时锁delta原件：各exit0零诊断，SQL/seed守恒，owned PID退出，私profile/工程清理。两相仅north_cave_visit.gd的临时对白锁delta不同，其它11源完全相同。根据此冻结以下7中央源+5组件交T01/T02/D06独验；D01仅补作者release文档，不另动源。这里是可进入独验，仍未宣称北窟独验/正式原输入通行/真实存档冷读通过。

```json
{
  "gdscripts/scene/world/story_map_catalog.gd": "d7f617c6822365375d6f16100b9b7b327b8fece9008a7b176427aa960337fd17",
  "gdscripts/scene/world/story_map_data.gd": "1979f6f170c86cebd77efb5948317154da397abc5a4fa4f11e654ec01987d456",
  "gdscripts/scene/map/story_map_scene.gd": "10cd63bb28643420dfdeb7423b8c20035cf3aabf46d98b03d782dc6b7077a582",
  "gdscripts/autoload/game_state_save.gd": "a691d374507afda0de5e3c84f4312687f09957dd97fa3f8068fad836fece6274",
  "gdscripts/scene/world/map_world.gd": "781865dca9a799d26256997e128f318d86d7b6ee315f3f79a41d991ba14675a9",
  "json/maps/area_levels.json": "34df3024893f8ebf7d8523de5c10ff0daa019625ab7d7d2d916b7b2901d925ea",
  "gdscripts/scene/map/north_cave_route_environment.gd": "ed81143b20eee445d825864b7b41c821facc949ff6cd93b39f2bd11f3ab313f7",
  "gdscripts/scene/map/north_cave_corridor_route_environment.gd": "026dddd5fbc58f623fd600cc26df81ce2f81f3e91684c9be5ba02bc48b6069cc",
  "gdscripts/scene/map/north_cave_crystal_route_environment.gd": "75218835e97bf463f81779a181114ba4e43f9f5a7905c06e1cef91f9d569ded2",
  "gdscripts/scene/world/north_cave_route.gd": "3d961e310565d09cf50b794787145fd2ad484b5e7abc28b16096c842a8b7e820",
  "gdscripts/scene/world/north_cave_sites.gd": "9e2076fcf1b4fd1e0b284029f0ec96e51ee398fd3b6e366efd65c0c191234b38",
  "gdscripts/scene/world/north_cave_visit.gd": "db8568b4cec173cafe0631f140076bbe61fb685ae82b8bbc8a5ae8b3ae51defd"
}
```


## 本地收录与独验进行中

中央7源已本地提交df5f73165，作者原证据另a1b8a25ea；最终helper db8568b4…，根末节12hash为当前独验冻结，source-v2 36只绑定旧helper，最终临时锁13绑定新helper，不能相加冒完整同版覆盖。D01另已启动失败回滚delta在冻结后收尾7/7，exit0零诊断，仅注入原change_failed验证本人五字段、别人后写/新owner保护，不冒自然I/O失败。作者最终release/HANDOFF已收录，T01实际world/Portal/完整身体/调查及T02原SavePage producer+两个新进程LoadSave cold正在独验；尚无通过结论。

D03三源及完整原红/作者/独验证据已本地提交7f7efc76d。T01最终997d19ee/e7220289/453cfe70原opensync6/6与close/back9/9各exit0、零诊断、独立SQL全表c120/seed守恒、PID/profile/工程收尾；旧16普通只对应旧版，作者RGB8警告原样留。根已查看原招式阅读图，非真人验收。

既有王冠委托接取修复bd69679be仅改ff1_crown_quest.gd的receipt/_finish_request，准确hash22a717b4…29f29b9。D04原WesternKing正式E对白→同值新owner→自然E完结RED9项2失败已保留；最终同probe9/9和正常接取/Esc/只换Story来源邻例15/15各exit0零诊断，28表SQL/金币/库存守恒。根只读审查未见明确新缺陷，战斗/交换/奖励未改。T02独验排北窟之后，不拿作者结果当已独验或整条任务链验收。

D06北境查询三ID小增量已作者headless/Metal各29/29、零诊断回报，精确release/cleanup尚封装，尚未收录；不代替实际北窟通行/调查/存读档。仍有合法可执行工作，最新used96%普通允许继续，无push/部署/额度兑换。


## 北窟独验实际结论与下一地图风祀台

查询白名单作者release已本地收录c5148acbb（headless/Metal29各自通过，view未改，根查看真实列表）。T01北窟实际原viewport点击+完整身体走完world→1→2→3→2→1→world六原门，三原Dialogic调查与四Metal图，证据671259492；原v3 98项97过1聚合红/exit1原样保留，未存快照不能事后称该相差异直接已观测。后继gate窄4/4，直接载场快照独立定位仅三正常encyclopedia_place_north_cave*已到访旗，队伍/库存/金币/机关/其余Story逐项相等，离线精确白名单12/12；root读STATE_DIFF与raw，不冒同一全绿run或真人验收。

T02北窟真实SavePage producer18项actual exit0但ObjectDB退出warning一条未归因；coldL2 15/16、coldL3 23/24各exit1原红仅SQLite int对JSON float深比较；cold_sql_delta7/7保69处类型差异，两侧原全表数值相同，原红不抹，严格validator11/11。保存/独立冷读合法点、A闭门仍可读B、坏档拒、运行态fallback、L3恢复后私闭gate原门3→2→1→大陆均有各自证据，63169aebd收录。王冠独验14/14、actual exit0零诊断，03898da79及cleanup证实全部原私工程/profile/PID清理。T02现仅最多一轮verbose定位producer退出warning，不重刷冷读/改生产。

风祀台为根采用的下一可逆小型地图接线，依据D12/next-map-contract及原game/world/maps稿：wind_altar_in单室、loc_wind_altar世界(720,200)，gate采用序章最后beat ch00_arrive_temple completed；室内原spawn(640,780)、南口(640,880)。原默认返(720,288)、备(800,200)完整身体静态碰山；仅批准先测(800,180)候选，Circle16中心偏移16/完整地表+旧门+实际公开路径通过才释放，必要局部返点回根裁，不改全大陆山海。唯一世界入口/安全探索，无职业、战斗、主线或奖励推进，area后续仅复用现origin_temple同[3,5]组。

根核定原稿“只播晶石异响”的本轮表现：原WindStaticCrystal不改色/身体，(640,512)调查晶石台；正文“风声从石柱间穿过，在晶石台旁回荡。\n南口可返回大陆。”。复用现ridge已用res://assets/audio/ambience/loops/draft1.ogg，局部scene-owned AudioStreamPlayer、SFX bus/原用户音量、duplicate关loop、-20dB、最多2秒；对白取消/自然结束/owner/cycle/scene/host撤权立即停并清引用，重复不叠播，不动全局BGM或SceneAmbience，不下载/复制音频。节点播放/时长验证不冒真人听感。原AltarTitle与新名同点可仅新sites安装时隐藏旧Label，原静态JSON/graphic/body保留。此为根明确实施决定，不假装原稿已指定声音细节。

| owner | 风祀台唯一域与启动门 |
|---|---|
| D13 | 新wind_altar_route.gd，沿North组件API+SCENE/WORLD_SCENES，几何/保存validator/world来源作者最小检查；合法旧在场closedgate可南口出，正式坏record拒、runtime坏spawn才回出生。旧North冻结。 |
| D02 | 新wind_altar_route_environment.gd继承原element_altar_static_environment，只隐藏未接方向，resolve_spawn委托新route；原四祀台JSON/身体不改，route最终释放后才作者窄验。 |
| D11 | 新wind_altar_sites.gd原正式host/Player/owner/cycle/party/原源弱引用/近身/对白锁与声音生命周期；route最终释放后组件窄验，不冒正式世界或human听感。 |
| D01 | 先只准备docs与独立wind_altar_visit.gd；依赖全最终释放且根另发中央GO后才改旧中央源/engine。North visit保持原域，不抽共享重构。 |

后继T01原世界实际互连/调查/音频退出，T02原SavePage及新进程cold按最终hash另派，不重刷北窟。当前普通额度仍允许执行，低余额不是停止条件；无push/部署/额度兑换。


续作实时点：最新用量used99%、ordinaryUsageAllowed=true，仍执行，不能套历史1%停机ACK。北窟源码/独验与王冠独验均已收录；尚未清零的具体QA欠账是T02 producer退出ObjectDB警告归属（仅最多1次verbose诊断、不改生产）。风祀台D13 route/真实世界几何、D02 wrapper、D11局部声音sites正在独立实施；D01只静态准备中央与独立wind visit，旧中央7源在根另GO前冻结；T01已获风祀台driver准备授权但无engine GO。根继续读精确release，依赖全部最终后才中央接线→独验→本地收录；任何候选几何/源码存在都不能冒可玩或已测。原godot-15小时心跳ACTIVE仅恢复兜底，当前轮继续，最新分工末节为后继读取起点。无push、无部署、无额度兑换/购买。
