# 07. 沉浸支线、小游戏与世界秘密白皮书 (Sidequests, Minigames & Lore Secrets Master Spec)

## 1. 悬赏讨伐看板与沉浸支线体系 (Bounties & Quest Chains)

### 1.1 全球 10 大史诗剧情支线
1. **海龙西尔多拉的长眠（Dragon's Requiescat）**：在第三世界前往海盗密窟深处吊唁，海龙灵魂显现化为最高阶水属性召唤兽“西尔多拉（Syldra）”。
2. **矮人锻造大师的遗愿（Dwarven Masterpiece）**：收集 4 块远古精金矿石，请矮人铁匠重铸打造无双战斧“符文之斧”。
3. **古代贤者吉多的预言（Sage Ghido's Library）**：潜水打通孤岛洞穴，协助长寿龟贤者整理遗失的四本天文学卷轴，获得时空魔法“流星群（Meteor）”。
4. **飞龙最后的孤雏（The Last Wyvern）**：登上龙之谷采集飞龙草，治愈飞龙使其进化为终极圣白飞龙坐骑。
5. **幻影之村环球马拉松（World Marathon）**：骑乘陆行鸟环游世界一周，赢取极速之靴。
6. **狼人凯鲁卡的故乡誓言（Kelger's Village）**：前往狼人隐居之村，完成 3 场单挑武斗试炼，传承暗黑剑圣心法。
7. **莫古利村庄大营救（Mog Village Rescue）**：地穴深陷营救莫古利，解锁全大陆隐秘通讯通道。
8. **沉睡的欧米茄遗骸（Omega Investigation）**：收集 3 块古代古代电路板碎片，解析欧米茄弱点数据。
9. **神龙封印的真相（Dragon God's Seal）**：探访天空圣所石碑，获得抗水水神项圈。
10. **大图书馆禁断十四卷（Forbidden Volumes）**：击败附身在书页上的远古魔物，解锁学者最终觉醒特技“深度解析”。

---

## 2. 莫古利通信网与邮差信使 (Mognet Post System)

```mermaid
sequenceDiagram
    participant Player as 玩家主角
    participant MogPost as 邮差莫古 (Postman Mog)
    participant RemoteMog as 边境莫古 (Target Mog)
    participant QuestReward as 支线奖励发放

    Player->>MogPost: 对话领取信件与信差包
    MogPost-->>Player: 交付包裹: "致穆亚森林的莫古林"
    Player->>RemoteMog: 穿越大地图跨界递送信件
    RemoteMog-->>Player: 拆信触发隐藏背景剧情对话
    RemoteMog->>QuestReward: 解锁信使成就徽章
    QuestReward-->>Player: 奖励: 盗贼极速斗篷 / 缎带护符
```

- 全流程共 16 封信件，串联起光暗两界莫古利一族的亲情羁绊。
- 送达全部信件后，莫古利长老将亲自授予“传奇邮差徽章”（逃跑率提升 25%，迷宫中步数遇敌间隔翻倍）。

---

## 3. 全球八大城镇钢琴大师考级 (Piano Mastery)

在世界各大城镇的酒馆或民宅中，摆放着 8 架不同年代的名贵钢琴。主角每弹奏一架钢琴，钢琴造诣提升一阶：
1. **Tier 1 (宁静村)**：断断续续的单音练习曲。
2. **Tier 2 (沃鲁斯王都)**：基础和弦奏鸣。
3. **Tier 3 (卡尔纳克)**：欢快的民间舞曲。
4. **Tier 4 (贾科尔城镇)**：优美的行板小夜曲。
5. **Tier 5 (雷格斯要塞)**：复杂的快板变奏曲。
6. **Tier 6 (穆亚村庄)**：深沉的哀伤挽歌。
7. **Tier 7 (幻影隐秘之村)**：高难度即兴交响华彩。
8. **Tier 8 (海盗密窟深处)**：**达到 Piano Master 最高境界！**

**大师回报**：成为钢琴大师后，前往巴利亚城镇拜访隐退的吟游诗人，他将惊叹于你的琴艺，正式传授吟游诗人的最强绝技——**“英雄之歌”（Hero's Song，战斗中全员攻防精神与等级每轮持续自动递增）**。

---

## 4. 古代斗技场与娱乐城博彩系统 (Coliseum & Casino)

### 4.1 古代斗技场自律天梯 (Ancient Coliseum)
- **下注机制（Item Betting）**：在斗技场柜台投注一件武器或防具（如投注“石中剑”或“火炎盾”）。
- **完全自律单挑（Autonomous 1v1 Battle）**：玩家派遣一名队员出战，战斗全由 AI 托管自动执行，无法手动干预指令。
- **阶梯奖池置换**：获胜后原下注道具升阶置换（如投注“伪石中剑”获胜可置换出真正的“圣剑”；投注“源氏之盔”获胜可置换出“终极缎带”）。失败则下注道具永久消失。

### 4.2 娱乐城博彩小游戏 (Casino Minigames)
- **陆行鸟赛跑竞猜（Chocobo Racing）**：实时演算 4 只不同颜色的陆行鸟绕场障碍赛跑，根据赔率下注。
- **魔法轮盘赌（Magic Roulette）**：下注不同元素法阵，赢取赌场限定代币（Casino Coins）。
- **独占奖品**：赌场代币可在兑换处换取“猫耳帽（Cat-Ear Hood - 魔法防御 500% 提升）”、“赌徒飞镖”与“万灵药（Elixir）”。
