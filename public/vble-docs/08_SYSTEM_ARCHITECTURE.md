# 08. 系统工程架构、音画交互与持久化白皮书 (System Architecture & Persistence Master Spec)

## 1. 视口规格、UI/UX 规范与经典蓝金主题

### 1.1 分辨率与视口适配架构
- **基准设计视口**：$1280 \times 1080$（像素完美缩放，支持 16:9 与 4:3 边界自适应）。
- **视口缩放模式**：Godot 4.6 `stretch_mode = canvas_items`，`aspect = expand`，保证像素字体与精灵立绘不失真。
- **经典蓝金配色规范**：
  - 底板主色：深海渐变暗蓝 `#0b1a30` 到 `#142d54`。
  - 边框金线：双层发光金 `#d4af37`，内阴影深度 2px。
  - 选中高亮光标：白色闪烁三角指示箭，高亮边框渐变白金光环。

### 1.2 战斗生命值衰减阻尼与伤害数字漂浮
- **血条阻尼双层渲染（HP Damper）**：
  - 顶层瞬间掉落至真实生命值（绿色/黄色）。
  - 底层红白警示缓冲条以 $1.5\text{s}$ 线性阻尼缓动回退，给玩家直观的受创沉浸感。
- **跳字系统**：暴击伤害字体放大 150%，带金黄轮廓；弱点伤害标记“WEAK”标签；受到吸收伤害显示绿色向上浮动。

---

## 2. 动态音频系统与场景无缝过渡 (Audio Architecture)

### 2.1 音量分轨与混音总线 (Audio Buses)
```
Master
├── BGM (背景音乐总线) - 音量可调节，支持双音轨 0.8s 交叉淡入淡出 (Crossfade)
├── SFX (音效总线) - UI 点击、挥剑击中、法术爆炸、雷达脉冲
└── Voice/Fanfare (号角与特写总线) - 战斗胜利、夜宿曲、升级全屏特写
```

### 2.2 战斗音轨解耦与首领战独立 BGM
- 普通杂兵遭遇战：播放激昂经典战歌（`BATTLE_BGM_STREAM`）。
- 剧情首领与 Boss 战：**彻底解耦并独立切入终极首领专用曲**（`BOSS_BGM_STREAM`，如 `final_battle_legend_2.mp3`）。
- 战后结算：无缝切入胜利号角，关闭结算弹窗后平滑淡入回原场景环境 BGM。

---

## 3. 多槽位全量持久化与断点自动存档 (Save/Load Architecture)

### 3.1 3 槽位数据结构与校验和
```json
{
  "slot_id": 1,
  "save_time": "2026-09-07T20:30:00",
  "checksum": "a1b2c3d4e5f6...",
  "current_beat": 42,
  "play_time_seconds": 38400,
  "gold": 125000,
  "map_context": {
    "map_id": "res://scene/map/other_cave_scene.tscn",
    "player_position": [440.0, 550.0],
    "facing_direction": "down"
  },
  "party": [
    {
      "id": "sol",
      "level": 255,
      "job_id": "freelancer",
      "hp": 65535,
      "max_hp": 65535,
      "mp": 9999,
      "max_mp": 9999,
      "stats": {"str": 9999, "agi": 9999, "vit": 9999, "spr": 9999, "mag": 9999},
      "equipment": {"r_hand": "excalibur", "l_hand": "genji_shield", "head": "genji_helm", "body": "genji_armor", "acc": "ribbon"}
    }
  ],
  "inventory": {"items": {}, "key_items": []},
  "bestiary_flags": {},
  "quest_progress": {}
}
```

### 3.2 容灾备份与防卡模回弹
- 每次写盘采用“写临时文件 `.tmp` -> 校验完整性 -> 原子重命名覆盖”机制，杜绝断电坏档。
- 读档时若检测到角色坐标处于非法碰撞块内部，自动触发安全区坐标重置（Safe Landing Fallback）。

---

## 4. 全科图鉴、多语言国际化与通关二周目 (Postgame & NG+)

### 4.1 四大图鉴卷轴（The Four Encyclopedias）
1. **魔物图鉴（Bestiary）**：记录 128 种怪物的击败次数、弱点、掉落与偷盗槽位。
2. **职业特技图鉴（Job Codex）**：记录全部 48 职业特技与融合技解锁状态。
3. **装备图鉴（Arsenal）**：已获得的武器、防具与饰品属性。
4. **地理游记（World Atlas）**：全球城镇、迷宫与隐藏森林探索率。

### 4.2 多语言国际化排版规范 (i18n)
- 采用 JSON 字典键值对映射，全面覆盖简体中文（zh_CN）、繁体中文（zh_TW）、英语（en_US）与日语（ja_JP）。
- 文本渲染器内置动态折行（Dynamic Word Wrapping）与多字节字符防截断算法，确保英文长单词不发生中途截断、日文平假名自然换行。

### 4.3 通关评价与二周目继承规则 (New Game+)
- **通关评级结算**：根据主线完成时间、全宝箱收集率、图鉴解锁率与团灭次数，评定 **S / A / B / C** 终极通关徽章。
- **隐藏开发者客房（Dev Room）**：达成 S 级评价后，可在幻影之村后院开启通往开发者彩蛋客房的隐藏通道，与制作团队 NPC 对话并获取纪念神器。
- **二周目继承（NG+）**：
  - 允许继承：全部图鉴进度、成就徽章、累计金币、已领悟的青魔法与回忆士记忆碎片。
  - 可选重置：等级与装备（可勾选“继承”开启无双割草，或“重置”开启硬核限制挑战模式）。

2026-10-22 跳字表现首段接入：现有逐hit正HP结果strict critical放大150%与金轮廓，finite element_multiplier>1附WEAK，同根数字生命周期；calculated显示值不作实伤资格。原数字接口/计时/伤害/AI/ATB/random不改，正伤反击缺原数字及状态/反射/合批放电未扩。新4/4、467与邻域30/31、1026/1027零引擎诊断；旧吸魔结算hits空一项在改前三源baseline仍3/4同败，不称邻域全过。证据 `docs/verification/damage-number-badges-20261022`，未自然战斗或真人视觉验收。
