# 英灵圣所：Cover／圣光斩清单与数据合同

状态：真人已明确批准**当前档全队共享、跨职业仅两术＋第4节完整方案并进入实现**，本轮已完成。清单核源起点2c34093d，实施起点ddcf5e1c；下方实施前事实保留为设计依据。必要隔离验证已运行，无自然剧情/遭遇/Boss或真人存档操作，主线暂停和累计16场边界不变。

## 1. 原规格与真实入口（实施前快照）

`game/world/NPC_GUIDE.md:291`写远古英雄英灵传授“舍身掩护(Cover)与圣光斩”。真实NPC为`npc_o_ghost_hero`，节点AncientSpirit，在old_kingdom_tomb、局部位置(352,592)，复用现有纹理，没有独立“英灵圣所”地图。现有大陆遗都入口(920,480)，ToTomb入陵要ch08_ruined_kingdom完成；皇家藏室是另一扇门，不能误加藏室开启前置。现service.kind=royal_spirit，dispatcher只调用`OldKingdomResidents.claim_crest()`后显示反馈。

现有实现是**旧徽章赠礼**：原节拍`ch08_knight_returns`必须COMPLETED，item_id=2045、amount=1、领取旗`npc_o_knight_crest_received`；容量不足保留补领机会。这个旗、徽章持有、胜利或旧目标完成均不是两术的学习记录。不得为验证教学重新自然战胜占领军或推进节拍。

## 2. 两术逐项源审现状（实施前）

| 规格名称 | 源身份与获得方式 | 实际消费者与缺口 |
|---|---|---|
| Cover／舍身掩护 | 最近正式技能`tech_knight_cover_ally`，显示“守护换位”，knight/JLV1，defense/basic | 当前选存活友方，写covering_index；可行动且在地面的施术者替目标承受下一次可拦截单体攻击，触发后清索引。没有低HP门槛；现目标解析也接受自身但不会实际拦截自己。不是NPC已传授。 |
| 圣光斩 | **无同名或同ID正式技能** | 近似项`tech_paladin_smite`“制裁击”，paladin/JLV4、attack/basic。描述提圣属性/不死加成，但当前实装是通用basic物理倍率1.45与武器属性，无Smite专属固定圣属性/额外不死加成，不能直接改名冒充。 |
| 易混项：圣护 | `tech_paladin_holy_cover`，paladin/JLV1 | 当前is_cover按ID含cover识别，仍走同一掩护；描述中专属魔防减伤没有独立分支，不借本轮补改圣骑士。 |

这些现值来自jobs.json、JobSkillResolver和BattleCombatSystem/BattleGuardResolver，属于源码合同，未在本阶段重新运行战斗。既有测试只作为覆盖线索，不冒称本轮通过。

## 3. 实施前缺口：为什么不能只写已学旗

菜单与`player_use_job_skill`均按**当前职业＋JLV**生成/复核技能，不是永久个人战技池。GameState.ensure_party_runtime和set_party_job当前还限制角色固定初始职业（塞拉white_mage、艾吉斯black_mage、其他freelancer），目录里有knight/paladin不等于正常流程可转入它们。本轮不能通过强改职业/JLV或给整套骑士技能来伪装完成教学。

`story_skill_levels`是现六种主角剧情技能专用白名单，恢复时未知ID丢弃，不可拿它存这两术。`player_magic/character_magic`属于教材，不可塞战技。若选择真正新增教学，须给菜单和结算同一份明确掌握判据，并独立核源学习；不会改变旧职业技原可用方式。

## 4. 真人已批准并实现的完整方案

已选定原“向队伍传授”为**当前存档/周目全队共享、免费、跨职业可用的两项战技**，不改职业/JLV、不解锁整套职业。免费0G是本轮批准的新增决定，不是旧源码售价；未来加入/重返队伍的角色也读取同一当前档资格，无账号或跨周目池。

- Cover复用稳定ID`tech_knight_cover_ally`与“守护换位”原结算，不再创建第二个掩护ID。英灵教学页可标“舍身掩护(Cover)：守护换位”；现knight/JLV来源保留。NPC教学资格只补这一个ID，不成为其他knight技能通行证。新教学入口限定一名存活的**其他同伴**；不许自选、倒地、越界目标，仍无低HP阈值、不附送减伤，0MP、消耗正常一次行动。
- 圣光斩新增正式ID`tech_hero_holy_slash`（hero_teaching_data固定目录），单敌圣属性物理斩，获准倍率1.45、0MP、消耗正常一次行动；沿既有物理命中/防御/阵型和圣属性抗性规则，不另设必中或暴击增益，不额外加“对不死翻倍”。圣属性仅覆盖此新ID的本次属性，不与武器元素重复计算，不改普攻/制裁击；武器既有非元素效果如需调整必须另列，不能在说明中默认为全部剥除。
- 真实授课资格沿原`ch08_knight_returns`完成＋当前实际古王陵英灵近距交互，不以caller字典、读档残余票据、拥有2045或旧领取旗替代。原赠礼完全保留，已批准教学与背包容量独立：背包满仍可教学，徽章继续待领；不消耗/回收徽章。

真人已一次明确选定上述归属及完整参数，已实现真实授课、菜单与结算共同资格，不改变原职业/JLV来源。

## 5. 已实现掌握与保存合同

课程身份版本hero_teaching_v1；Cover和新圣光斩各有独立严格bool学习记录（正式Story.flags命名`hero_teaching_v1_cover`/`hero_teaching_v1_holy_slash`）。已核原命名空间无同名冲突。bool=true才掌握，false/缺失/null/字符串/数组/对象均未学；旧徽章旗不迁移为已学。记录版本是课程语义，不是自动提升魔法进度version。

通过真实NPC校验并满足前置才可原子写两旗；重复交谈幂等，不扣钱、不复制书/徽章、不刷AP。读档完整替换本档旗，新游戏/新周目按Story重置，不继承A档。正式JSON、中断CFG、自动CFG沿现Story payload保存；不能在读档后根据徽章补造历史。独立菜单和战斗消费同一严格判据，缓存条目失效须拒绝，菜单出现不能绕过实际结算。

现Story.flags虽已在三档中保存，只能说明有承载通道，不能宣称新增掌握合同无需实现/验证。战斗actor.covering_index属于临时状态，不把“正保护谁”保存成永久学习；原party_runtime、装备、MP、职业进度保持既有保存合同。

## 6. 验收范围

固定ID/目录与授课源、前置未满足/伪NPC/错图/过远拒绝；真交互重复幂等，背包满徽章仍可补领。未学/坏类型/旧徽章旗不能授技能；A→B/缺字段/坏类型三档恢复撤权。菜单及实际结算均核掌握，仅这两项跨职业；原职业/JLV来源不回归。

Cover用独立受控模型验证其他存活同伴、一次拦截、不能行动/离地/无效目标；圣光斩验证固定单敌圣物理倍率/免疫抗性/武器元素不双算/MP与行动费用。仅必要私有fixture、不运行自然主线/Boss/遭遇，不把模型测试称自然游戏验收。三档API与新PID恢复独立证明，操作真人档、原生视觉验收均不在本授权内。

## 7. 完成验证与限制

两项真人答复均已落地，无待批准的本轮产品项。最终ROOT producer PID86011 41/41、GUT2070（逐例2067＋before_all3），闭档新PID86067 1/1、112；42个不同用例、GUT2182断言，均exit0零diag。真实E/菜单/模型结算、三档严格类型/A→B撤权、实际正式回调及typed恢复、原职业/守护与Story/百科保存邻域通过。

独立复核发现旧Story.apply_progress整份flags非字典会继承A档权限，实际三恢复入口RED85955后，最小改为有效字典深拷贝、坏容器空表；保旧校验接受，不改变有效rawflag。新增测试公式与JSON类型误断言红、业务红及中间绿均保留。证据[hero-teaching](../../docs/verification/hero-teaching/README.md)。本轮有意修改原22中的battle_combat_system接线，另外21原字节保持，不能说原22全未动。

仅隔离fixture：保存源synthetic标签host/API、正式坏容器回调到受控古王陵、新PID独立模型施放；不是自然主线/正式自然槽/Title Continue/视觉验收/Ready。无新遭遇/Boss。原始清单30源SHA保留为实施前快照，实施源与失败/成功分项证据另封，不重写历史。
