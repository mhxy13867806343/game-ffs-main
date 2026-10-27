<template>
  <div class="sidequests-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center mb-6">
      <n-tag type="info" size="small" round class="mb-2">Epic Lore & Exploration Secrets</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">支线任务与探索资料</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        本目录收录 {{ sidequests.length }} 条资料，包含当前正式支线、王城悬赏讨伐与原有史诗探索条目。正式支线逐条标明接入与验证边界。
      </p>
    </div>

    <!-- 史诗任务特别呈现：王冠之托与四阶实物交换链条 -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 border border-amber-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">👑</span>
          <h3 class="text-base sm:text-lg font-bold text-amber-300">史诗任务特别呈现：西方王城王冠之托与神秘钥匙物语 (ff1_crown_chain)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="warning" size="small" round>八图连通物语</n-tag>
          <n-tag type="success" size="small" round>四阶实物交换</n-tag>
          <n-tag type="info" size="small" round>对白代次锁</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机任务核心（<code>ff1_crown_quest.gd</code>）完整贯穿西方王城、沼泽洞窟、玛托雅洞窟与精灵城堡，搭载四阶实物道具闭环与严密的对白异步代次锁（<code>_open_generation + 1</code>）。
      </p>

      <!-- 四阶实物道具流程图 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-amber-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300">第一阶段 · 寻回王冠</span>
            <n-tag size="tiny" type="warning">Item 111</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>目标：</strong>沼泽洞窟地下一层夺回失落王冠。</div>
          <div class="text-[10px] text-gray-500">国王委托自然播完立项（accept=ff1_crown_accepted）。</div>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-300">第二阶段 · 水晶之眼</span>
            <n-tag size="tiny" type="info">Item 112</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>目标：</strong>识破阿斯托斯伪装战胜获取水晶眼。</div>
          <div class="text-[10px] text-gray-500">归还玛托雅女巫以激活古老药剂秘方。</div>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-300">第三阶段 · 苏醒神药</span>
            <n-tag size="tiny" type="success">Item 113</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>目标：</strong>携带苏醒药前往精灵城堡谒见。</div>
          <div class="text-[10px] text-gray-500">由医者唤醒沉睡数百年的精灵族储君。</div>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950/80 border border-purple-800/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-300">终局阶段 · 神秘钥匙</span>
            <n-tag size="tiny" type="error">Item 114</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>奖赏：</strong>获赠传承神秘钥匙（Key Item）。</div>
          <div class="text-[10px] text-gray-500">解锁世界全域受封印王室藏宝库（complete=ff1_mystic_key）。</div>
        </div>
      </div>

      <!-- 安全收尾防线说明 -->
      <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400">
        <strong class="text-amber-300">🛡️ 接取许可安全收尾：</strong>对白结束时严格核验 <code>_open_generation + 1</code> 代次、原 owner/cycle/tree/current_scene 与宿主非排队删除状态，杜绝跨周目或换档 stale 对话回调篡改任务状态。
      </div>
    </div>

    <!-- SQ-10 古魔道封印挑战与星界缎带传承物语 (基于 D06 SQ10 实机定向核查与正式合同) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-indigo-950/40 border border-purple-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🎀</span>
          <h3 class="text-base sm:text-lg font-bold text-purple-300">SQ-10 古魔道封印挑战与星界缎带传承物语 (Ribbon Lore & Ancient Golem)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="error" size="small" round>九项异常免疫 (不免即死)</n-tag>
          <n-tag type="info" size="small" round>米西迪亚观星台问答</n-tag>
          <n-tag type="warning" size="small" round>双世界合流解禁</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机研发团队（D06）2026-10-27 严密复核：旧稿 SQ-10“太古魔导巨像”规划已由传奇链正式适配为<strong>米西迪亚观星台非战斗记忆问答</strong>（<code>trial_2111</code>），确保经典神器【星界缎带】（<code>relic_ribbon_v1</code>）具备唯一严密的取得来源与周目守卫。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <!-- 缎带取得与问答试炼 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-300">🎀 星界缎带正式取得 (trial_2111)</span>
            <n-tag size="tiny" type="info">Item 2111</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>发生地：</strong>米西迪亚观星台 (mysidia_observatory, 240, 480)</div>
          <div class="text-[11px] text-gray-300 space-y-1">
            <div class="text-amber-300 font-medium">守望者问答：“守护同伴应让谁得到照顾？”</div>
            <div class="text-gray-400">↳ 正确抉择：“所有同伴” (写入试炼完成标记)</div>
          </div>
          <div class="text-[10px] text-gray-500">主线双世界合流（<code>worlds_merged_twilight</code>）后正式开放领取，单周目限领一次。</div>
        </div>

        <!-- 异常免疫边界明晰 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-indigo-300">🛡️ 缎带九大异常免疫矩阵</span>
            <n-tag size="tiny" type="error">严格底线</n-tag>
          </div>
          <div class="text-[11px] text-gray-300 leading-relaxed">
            <strong>有效免疫 9 项：</strong>中毒、致盲、沉默、石化、混乱、睡眠、减速、停止、死之宣告。
          </div>
          <div class="p-2 rounded bg-rose-950/40 border border-rose-900/40 text-[10px] text-rose-300">
            ⚠️ <strong>重要设计底线：</strong>实机缎带<strong>明确不免疫即死 (Instant Death)</strong>，杜绝破坏 Boss 战核心致死机制！
          </div>
        </div>

        <!-- 守护巨像物种档案 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300">🗿 守护巨像 (ancient_golem)</span>
            <n-tag size="tiny" type="warning">Lv.45 常规魔兽</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>战术属性：</strong>HP 1200 · 物攻110 / 防55 · 魔攻110 / 魔防55</div>
          <div class="text-[11px] text-gray-300">
            <strong>常驻物理减伤：</strong><code>physical_multiplier = 0.8</code> (天然20%物伤吸收)
          </div>
          <div class="text-[10px] text-cyan-300">克制破绽：极弱风、雷属性附魔 (2.0x 暴击伤害)。</div>
        </div>
      </div>
    </div>

    <!-- SQ-11 大陆十六环陆行鸟巡礼与幻影背心秘境跑道 (基于 Godot chocobo_circuit_route.gd / service.gd / reward.gd 实机规范) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-yellow-950/40 border border-amber-500/50 shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/30 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🐤</span>
          <h3 class="text-base sm:text-lg font-bold text-amber-300">SQ-11 大陆十六环陆行鸟巡礼与幻影背心秘境跑道 (Chocobo Circuit & Mirage Vest)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="warning" size="small" round strong>全域 16 环顺序传感器</n-tag>
          <n-tag type="info" size="small" round>后山饲养所试炼</n-tag>
          <n-tag type="success" size="small" round>终极防具：幻影背心 (Item 2095)</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机大地图巡礼核心玩法（<code>chocobo_circuit_route.gd</code> / <code>chocobo_circuit_service.gd</code>）：骑乘陆行鸟从后山西林起点出发，按<strong>严格单调升序</strong>依次穿越遍布大陆的 16 个地脉打卡圈（每个光环判定半径 <code>RADIUS = 24.0px</code>）。无物理阻挡，完成闭环后即可向后山饲养员领取附带【幻影物理免伤分身】的神兵级防具<strong>【幻影背心】</strong>（<code>2095</code>）。
      </p>

      <!-- 架构三柱石 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400">🏁 16 环单调递增打卡序列</span>
            <n-tag size="tiny" type="warning">MONOTONIC</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>判定半径：</strong><code>RADIUS = 24.0px</code> (入圈边沿触发)
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed">
            打卡点 01 与 16 均位于后山西林 <code>(920, 760)</code>，必须在完整穿越 02~15 号外环地标后返回，方可被判定为闭环。逆向或跳步无法激活。
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-yellow-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-yellow-400">🎽 幻影背心 (Item 2095)</span>
            <n-tag size="tiny" type="success">MIRAGE VEST</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>战术特性：</strong>入战自备幻影分身，免疫下一次物理攻击
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed">
            专属领奖旗标 <code>chocobo_circuit_reward_claimed</code>，受容量上限（9999）守卫与 <code>_commit_gift</code> 原子事务保护，绝不重入多发。
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">🦅 黑陆行鸟越山空行体系</span>
            <n-tag size="tiny" type="info">black_chocobo</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>特殊能力：</strong>飞跃普通黄鸟无法翻越的峻岭
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed">
            实机搭载 <code>black_chocobo_state.gd</code> 与视觉组件，限定安全着陆于森林地块，配合世界树与北方山体探索。
          </p>
        </div>
      </div>

      <!-- 交互演练台：陆行鸟 16 环全域巡礼打卡推演台 -->
      <div class="p-4 rounded-xl bg-slate-950/90 border border-amber-500/40 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">🗺️</span>
            <span class="font-bold text-amber-300">陆行鸟 16 环全域巡礼打卡推演台 (Chocobo Circuit Simulator)</span>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetChocoboCircuit">
              🔄 重新起跑
            </n-button>
            <n-button size="tiny" secondary type="success" :disabled="currentChocoboStep < 16" @click="claimMirageVest">
              {{ isVestClaimed ? '✅ 幻影背心已领取' : '🎁 模拟向饲养员领奖' }}
            </n-button>
          </div>
        </div>

        <!-- 步进滑动条 -->
        <div>
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="text-gray-300 font-bold">
              当前巡礼进度: <span class="text-amber-400 font-mono">环号 #{{ currentChocoboStep }} / 16</span>
              <span v-if="currentChocoboStep === 16" class="text-emerald-400 ml-2 font-bold">🎉 16 环全域闭环达成！</span>
            </span>
            <span class="text-gray-400 text-[11px]">滑动模拟骑乘穿圈</span>
          </div>
          <n-slider v-model:value="currentChocoboStep" :min="1" :max="16" :step="1" />
        </div>

        <!-- 当前检查点详情卡 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
          <div>
            <span class="text-gray-400 text-[10px] block">打卡点序列 & 坐标:</span>
            <div class="font-bold text-amber-300 text-sm font-mono mt-0.5">
              #{{ activeCheckpoint.index }} · {{ activeCheckpoint.coords }}
            </div>
            <div class="text-[10px] text-gray-500 mt-0.5">半径: 24.0px 光环</div>
          </div>

          <div>
            <span class="text-gray-400 text-[10px] block">现代大陆地标:</span>
            <div class="font-bold text-gray-200 mt-0.5">
              {{ activeCheckpoint.label }}
            </div>
            <div class="text-[10px] text-cyan-400 mt-0.5">别名: {{ activeCheckpoint.alias }}</div>
          </div>

          <div class="md:col-span-2">
            <span class="text-gray-400 text-[10px] block">环境描述与地貌特征:</span>
            <div class="text-gray-300 text-[11px] mt-0.5 leading-relaxed">
              {{ activeCheckpoint.desc }}
            </div>
          </div>
        </div>

        <!-- 16 环微缩雷达点阵 -->
        <div class="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
          <div
            v-for="cp in chocoboCheckpoints"
            :key="cp.index"
            class="p-1.5 rounded text-center cursor-pointer transition-all border text-[10px]"
            :class="currentChocoboStep >= cp.index ? 'bg-amber-950/60 border-amber-500/60 text-amber-300' : 'bg-slate-900/40 border-slate-800 text-gray-500'"
            @click="currentChocoboStep = cp.index"
          >
            <div class="font-mono font-bold">#{{ cp.index }}</div>
            <div class="truncate text-[9px]">{{ cp.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SQ-02 始源神殿晶石残页典籍与中回复白魔法传承 (基于 Godot temple_manuscript_quest.gd 与 field 架构) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-blue-950/40 border border-cyan-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">📜</span>
          <h3 class="text-base sm:text-lg font-bold text-cyan-300">SQ-02 始源神殿晶石残页典籍与中回复白魔法传承 (Temple Manuscript & Cura)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="info" size="small" round strong>三页残卷 (Item 155~157)</n-tag>
          <n-tag type="success" size="small" round>中级治疗术 (Cura)</n-tag>
          <n-tag type="warning" size="small" round>NG+ 周目继承守卫</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机始源神殿重要支线（<code>temple_manuscript_quest.gd</code> / <code>temple_manuscript_field.gd</code>）：主线第一章基础职业解锁（<code>ch01_basic_jobs</code>）后，向始源神殿西侧侍童甲（<code>npc_t_acolyte_1</code>）接取典籍委托，在神殿石柱两侧与石径旁调查并拾取散落的 3 页晶石典籍残卷，交付后将白魔法【中回复】（<code>cura</code>）原子写入全队公共魔法数据库。
      </p>

      <!-- 架构三柱石 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-cyan-400">🏛️ 三大残卷精确地脉散落</span>
            <n-tag size="tiny" type="info">POINTS (3)</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>西石柱旁：</strong><code>(360, 560)</code> (Item 155)<br />
            <strong>东石柱旁：</strong><code>(920, 560)</code> (Item 156)<br />
            <strong>中央石径：</strong><code>(640, 560)</code> (Item 157)
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed">
            拾取框采用 <code>Rect2(-44, -64, 88, 88)</code>，自动隐藏默认人物轮廓与实体阻挡，形成平整地脉调查光标。
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400">✨ 中回复 (Cura) 共享入库</span>
            <n-tag size="tiny" type="success">PLAYER_MAGIC</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>交付条件：</strong><code>ready_to_deliver()</code> 持有全部 3 页
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed">
            原子事务先写入 <code>player_magic (magic_id='cura', purchased=1)</code>，成功后再同帧扣除 3 页残卷，并发放完成旗标。
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-800/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-400">🔒 NG+ 继承与防注入守卫</span>
            <n-tag size="tiny" type="warning">CYCLE GUARD</n-tag>
          </div>
          <div class="text-[11px] text-gray-400">
            <strong>周目合法性：</strong><code>cycle &le; clears + 1</code>
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed">
            新建普通存档（<code>clear_for_new_game</code>）彻底洗去 Cura 残留；NG+ 继承则核验通关凭证并记录 <code>sq02_cura_inherited</code>。
          </p>
        </div>
      </div>

      <!-- 交互演练台：始源神殿三页残卷采集与中回复交付推演台 -->
      <div class="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">🧪</span>
            <span class="font-bold text-cyan-300">始源神殿三页残卷采集与中回复交付推演台 (Manuscript Studio)</span>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetManuscriptQuest">
              🔄 重置任务状态
            </n-button>
            <n-button size="tiny" secondary type="info" @click="simulateManuscriptNGPlus">
              ⏩ 模拟 NG+ 周目继承
            </n-button>
          </div>
        </div>

        <!-- 任务状态与拾取控制栏 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block">委托状态 (Story Flags):</span>
            <div class="flex items-center gap-1.5 flex-wrap">
              <n-tag size="tiny" :type="manuscriptAccepted ? 'success' : 'default'">
                {{ manuscriptAccepted ? '已接取 (accepted)' : '未接取' }}
              </n-tag>
              <n-tag size="tiny" :type="manuscriptDelivered ? 'warning' : 'default'">
                {{ manuscriptDelivered ? '已交付 (delivered)' : '未交付' }}
              </n-tag>
              <n-tag v-if="curaInherited" size="tiny" type="info">
                NG+ 继承态
              </n-tag>
            </div>
            <div class="text-[10px] text-gray-500 pt-0.5">
              NPC: 侍童甲 (npc_t_acolyte_1)
            </div>
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block">残卷持有情况 (3 页):</span>
            <div class="flex items-center gap-1">
              <n-tag size="tiny" :type="hasManuscriptPage[0] ? 'success' : 'error'">页1 (360,560)</n-tag>
              <n-tag size="tiny" :type="hasManuscriptPage[1] ? 'success' : 'error'">页2 (920,560)</n-tag>
              <n-tag size="tiny" :type="hasManuscriptPage[2] ? 'success' : 'error'">页3 (640,560)</n-tag>
            </div>
            <div class="text-[10px] text-gray-500 pt-0.5">
              持有: {{ collectedPagesCount }} / 3 页 · {{ isReadyToDeliver ? '满足交付条件！' : '尚未集齐' }}
            </div>
          </div>

          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] block">全队魔法库 (Player Magic):</span>
            <div class="flex items-center gap-2">
              <n-tag size="small" :type="hasCuraMagic ? 'success' : 'default'" strong>
                {{ hasCuraMagic ? '✨ 中回复 (Cura) 已习得' : '🔒 中回复 未解锁' }}
              </n-tag>
            </div>
            <div class="text-[10px] text-gray-500 pt-0.5">
              白魔法 Lv2 · 消耗 9 MP · 全体中量恢复
            </div>
          </div>
        </div>

        <!-- 地脉调查点与交互按钮 -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <n-button
            size="small"
            secondary
            :type="hasManuscriptPage[0] ? 'success' : 'primary'"
            :disabled="!manuscriptAccepted || manuscriptDelivered"
            @click="toggleManuscriptPage(0)"
          >
            {{ hasManuscriptPage[0] ? '✅ 西石柱残页已拾' : '🔍 调查西石柱 (360,560)' }}
          </n-button>
          <n-button
            size="small"
            secondary
            :type="hasManuscriptPage[1] ? 'success' : 'primary'"
            :disabled="!manuscriptAccepted || manuscriptDelivered"
            @click="toggleManuscriptPage(1)"
          >
            {{ hasManuscriptPage[1] ? '✅ 东石柱残页已拾' : '🔍 调查东石柱 (920,560)' }}
          </n-button>
          <n-button
            size="small"
            secondary
            :type="hasManuscriptPage[2] ? 'success' : 'primary'"
            :disabled="!manuscriptAccepted || manuscriptDelivered"
            @click="toggleManuscriptPage(2)"
          >
            {{ hasManuscriptPage[2] ? '✅ 中央石路残页已拾' : '🔍 调查中央路 (640,560)' }}
          </n-button>
          <n-button
            size="small"
            type="warning"
            :disabled="!manuscriptAccepted || manuscriptDelivered"
            @click="deliverManuscriptPages"
          >
            🎁 交付残卷学中回复
          </n-button>
        </div>

        <!-- 任务审计追踪日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">任务执行事务追踪 (TempleManuscript Trace):</div>
          <div v-for="(log, idx) in manuscriptLog" :key="idx" class="text-cyan-300/90 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- 四大远古石板解封额度与七色彩尾兑换工坊 (基于 legendary_acquisition_transaction.gd / registry.gd / progress.gd) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 border border-amber-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🏛️</span>
          <h3 class="text-base sm:text-lg font-bold text-amber-300">四大远古石板解封额度与七色彩尾兑换工坊 (Ancient Tablets & Tail Exchange)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="warning" size="small" round>四大石板 11 额度</n-tag>
          <n-tag type="success" size="small" round>七色彩尾 1:1 兑换</n-tag>
          <n-tag type="info" size="small" round>来源票事务防重放</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        对齐 Godot 引擎 <code>legendary_acquisition_transaction.gd</code> 与 <code>legendary_acquisition_registry.gd</code> 传奇第二阶段实机规约：四大远古石板严格产出 11 点解封额度 (3+3+3+2)，七色彩尾 (147~153) 消耗 1 尾巴 1:1 兑换七大终极武器 (2113~2119)，全程执行内存事务副本试算与签发票即刻到期熔断。
      </p>

      <!-- 核心规约卡 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <div class="p-3 bg-slate-900/80 rounded-xl border border-amber-800/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300">📜 四大远古石板额度 (11 点)</span>
            <n-tag size="tiny" type="warning">TABLETS</n-tag>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>金字塔 (pyramid):</strong> 解锁额度 +3。</li>
            <li><strong>孤岛神殿 (island_shrine):</strong> 解锁额度 +3。</li>
            <li><strong>大壕沟 (great_trench):</strong> 解锁额度 +3。</li>
            <li><strong>伊斯托利瀑布 (istory_falls):</strong> 解锁额度 +2。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-900/80 rounded-xl border border-emerald-800/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-300">🌈 七色彩尾 1:1 契约 (147~153)</span>
            <n-tag size="tiny" type="success">TAILS</n-tag>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>粉(147)➔2113</strong> 阿克塞尔 / <strong>灰(148)➔2114</strong> 瓦尔哈拉</li>
            <li><strong>红(149)➔2115</strong> 鲜血之枪 / <strong>金(150)➔2116</strong> 创世之刃</li>
            <li><strong>蓝(151)➔2117</strong> 人鱼竖琴 / <strong>黄(152)➔2118</strong> 火箭重锤</li>
            <li><strong>绿(153)➔2119</strong> 自动连弩 (各限换 1 次防重复)</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-900/80 rounded-xl border border-purple-800/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-300">🔒 来源票事务安全 (Transaction)</span>
            <n-tag size="tiny" type="info">TRANSACTION</n-tag>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>私票签发:</strong> <code>issue_ticket()</code> 绑宿主与现场 NPC 引用。</li>
            <li><strong>节点退场熔断:</strong> 宿主或 NPC 离开视口时票据立即失效。</li>
            <li><strong>单票即焚:</strong> 提交消费即刻 <code>_events.erase()</code>，禁止重放。</li>
          </ul>
        </div>
      </div>

      <!-- 交互推演台: 石板解封与彩尾兑换演练台 -->
      <div class="p-3 sm:p-4 rounded-xl bg-slate-950/80 border border-amber-600/30 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-amber-400">🧪 石板额度领用与彩尾交易推演台</span>
            <n-tag size="tiny" type="warning" round>
              剩余额度: {{ unsealAvailableCredits }} 点
            </n-tag>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetLegendaryStudio">
              🔄 重置模拟
            </n-button>
          </div>
        </div>

        <!-- 四大石板收集勾选 -->
        <div class="space-y-1.5">
          <div class="text-[10px] text-gray-400 font-bold">四大远古石板收集状态 (Tablets Collection):</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label class="flex items-center gap-1.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="tabletObtained.pyramid" @change="recalculateCredits" />
              <span>金字塔石板 (+3)</span>
            </label>
            <label class="flex items-center gap-1.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="tabletObtained.island_shrine" @change="recalculateCredits" />
              <span>孤岛神殿石板 (+3)</span>
            </label>
            <label class="flex items-center gap-1.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="tabletObtained.great_trench" @change="recalculateCredits" />
              <span>大壕沟石板 (+3)</span>
            </label>
            <label class="flex items-center gap-1.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" v-model="tabletObtained.istory_falls" @change="recalculateCredits" />
              <span>瀑布石板 (+2)</span>
            </label>
          </div>
        </div>

        <!-- 神兵解封消费区 -->
        <div class="space-y-1.5 pt-1 border-t border-slate-800">
          <div class="flex items-center justify-between text-[10px] text-gray-400 font-bold">
            <span>消耗石板额度解封十一件法定武器 (选一件解封 -1 额度):</span>
            <span class="text-amber-400 font-mono">已解封: {{ unsealedWeaponsList.length }} / 11 件</span>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <n-select
              v-model:value="selectedWeaponToUnseal"
              size="small"
              class="w-64"
              :options="sealedWeaponOptionsToUnseal"
            />
            <n-button
              size="small"
              type="primary"
              secondary
              :disabled="unsealAvailableCredits <= 0 || !selectedWeaponToUnseal"
              @click="claimUnsealedWeapon"
            >
              🔓 确认解封此武器 (-1 额度)
            </n-button>
          </div>
        </div>

        <!-- 七色彩尾兑换交易区 -->
        <div class="space-y-1.5 pt-2 border-t border-slate-800">
          <div class="text-[10px] text-gray-400 font-bold">七色彩尾 1:1 兑换交易 (Tail Recipes):</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div v-for="tail in tailRecipeList" :key="tail.color" class="p-2 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <div class="flex items-center justify-between text-xs font-bold text-gray-200">
                <span>{{ tail.colorLabel }}</span>
                <n-tag size="tiny" :type="tailClaims[tail.color] ? 'success' : 'warning'">
                  {{ tailClaims[tail.color] ? '已兑换' : '未兑换' }}
                </n-tag>
              </div>
              <div class="text-[9px] text-gray-400">
                持存: <strong>{{ tailInventory[tail.currencyId] || 0 }}</strong> 根 ➔ <strong>{{ tail.rewardName }}</strong>
              </div>
              <div class="flex items-center gap-1.5 pt-0.5">
                <n-button
                  size="tiny"
                  secondary
                  :type="tailClaims[tail.color] ? 'default' : 'primary'"
                  :disabled="tailClaims[tail.color] || (tailInventory[tail.currencyId] || 0) < 1"
                  class="w-full"
                  @click="tradeTail(tail.color, tail.currencyId, tail.rewardId, tail.rewardName)"
                >
                  {{ tailClaims[tail.color] ? '✅ 契约已封存' : '🤝 交付尾巴兑换' }}
                </n-button>
                <n-button size="tiny" secondary @click="addTailItem(tail.currencyId)">+1</n-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 审计追踪 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">传奇事务执行审计 (LegendaryTransaction Trace):</div>
          <div v-for="(log, idx) in legendaryLog" :key="idx" class="text-amber-300 truncate">
            &gt; {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- 宁静村居民深度会话与可选回应系统 (基于 Godot NPC_OPTIONAL_INTERACTION_DESIGN_2026-10-23.md) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-teal-950/40 border border-emerald-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">🗣️</span>
          <h3 class="text-base sm:text-lg font-bold text-emerald-300">宁静村居民深度会话与可选回应系统 (NPC Optional Interaction Design)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="success" size="small" round>三位常驻居民试点</n-tag>
          <n-tag type="info" size="small" round>自然对白延期弹窗</n-tag>
          <n-tag type="warning" size="small" round>零状态包袱</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        实机引擎 2026-10-23 批准实装的【可选回应机制】。在原闲谈播完后提供温和接话机会；回应只决定本次交谈随后的回话，不强制产生任务义务、不建立好感度数值枷锁，默认焦点为“先告辞”随时可退出。
      </p>

      <!-- 三位试点 NPC 互动卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <!-- 1. 守卫雷恩 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400">🛡️ 守卫雷恩 (Guard)</span>
            <n-tag size="tiny" type="info">npc_v_guard_gate</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>原身份：</strong>晨辉关门哨卫，关心外出者解毒药与队伍补给。</div>
          <div class="space-y-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
            <div><span class="text-cyan-400 font-bold">选项A：</span><span class="text-gray-300">我会先看看同伴的状态。</span></div>
            <div class="text-gray-400 pl-3">↳ 雷恩：“准备周全些，路上才少些慌张。别嫌我啰嗦。”</div>
            <div class="pt-1 border-t border-slate-800/60"><span class="text-amber-400 font-bold">选项B：</span><span class="text-gray-300">你守门时也多保重。</span></div>
            <div class="text-gray-400 pl-3">↳ 雷恩：“好，我记着。你们在外头也照应着彼此。”</div>
          </div>
        </div>

        <!-- 2. 守卫老齐 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-teal-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-teal-400">👴 守卫老齐 (OldGuard)</span>
            <n-tag size="tiny" type="info">npc_v_guard_wall</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>原身份：</strong>城墙老卫士，经历过停战钟声，挂念归人平安。</div>
          <div class="space-y-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
            <div><span class="text-cyan-400 font-bold">选项A：</span><span class="text-gray-300">您最盼望什么？</span></div>
            <div class="text-gray-400 pl-3">↳ 老齐：“盼出去的人平安回来。这句话简单，守门时却总会想起。”</div>
            <div class="pt-1 border-t border-slate-800/60"><span class="text-amber-400 font-bold">选项B：</span><span class="text-gray-300">我会记得平安回来。</span></div>
            <div class="text-gray-400 pl-3">↳ 老齐：“好。这话我爱听，走远了也别忘。”</div>
          </div>
        </div>

        <!-- 3. 老农李伯 -->
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400">🌾 老农李伯 (Farmer)</span>
            <n-tag size="tiny" type="warning">npc_v_farmer</n-tag>
          </div>
          <div class="text-[11px] text-gray-400"><strong>原身份：</strong>村口老农，面对地脉板结仍日复一日修筑田埂。</div>
          <div class="space-y-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
            <div><span class="text-cyan-400 font-bold">选项A：</span><span class="text-gray-300">土这么硬，您还要忙吗？</span></div>
            <div class="text-gray-400 pl-3">↳ 李伯：“总得先把田埂修好。能稳住一点是一点，急也不能把种子急出来。”</div>
            <div class="pt-1 border-t border-slate-800/60"><span class="text-amber-400 font-bold">选项B：</span><span class="text-gray-300">您也歇一会儿吧。</span></div>
            <div class="text-gray-400 pl-3">↳ 李伯：“知道啦。手上这点事慢慢做，总比光站着发愁强。”</div>
          </div>
        </div>
      </div>

      <!-- 交互底层安全守卫 -->
      <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-gray-400 space-y-1">
        <div class="text-emerald-300 font-bold text-xs">🛡️ 对白会话底层生命周期安全断路器：</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] text-gray-400">
          <div><strong class="text-gray-200">自然播放结束判定：</strong>仅在当前闲谈文本完整播毕才延期弹窗，中途主动取消绝不打扰。</div>
          <div><strong class="text-gray-200">默认告辞焦点：</strong>弹窗焦点默认落在“先告辞”，按取消键或点击背景无损退出。</div>
          <div><strong class="text-gray-200">弱引用防篡改：</strong>切图或换档瞬间清空会话 ticket，严禁向新场景遗留补弹幽灵弹窗。</div>
        </div>
      </div>
    </div>

    <!-- 筛选与搜索工具栏 -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121626]/80 border border-slate-800">
      <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          v-for="cat in typeFilters"
          :key="cat.key"
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border select-none whitespace-nowrap"
          :class="activeFilter === cat.key
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.45)]'
            : 'bg-slate-800 text-gray-200 border-slate-700 hover:(bg-slate-700 text-white)'"
          @click="activeFilter = cat.key"
        >
          <span>{{ cat.label }}</span>
          <span class="ml-1 text-[10px] opacity-80 font-mono">({{ getFilterCount(cat.key) }})</span>
        </button>
      </div>
      <div class="w-full sm:w-72">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索任务标题 / 触发地 / 奖励..."
          clearable
          size="small"
        >
          <template #prefix>🔍</template>
        </n-input>
      </div>
    </div>

    <!-- 支线卡片网格 -->
    <div v-if="filteredSidequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <n-card
        v-for="quest in filteredSidequests"
        :key="quest.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base md:text-lg font-bold text-amber-300">{{ quest.title }}</span>
            <n-tag size="small" :type="quest.type === '神兵' ? 'warning' : quest.type === '悬赏讨伐' ? 'error' : 'info'">
              {{ quest.type }}
            </n-tag>
          </div>
        </template>

        <div class="space-y-3 text-sm">
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="text-gray-400">📍 发生触发地:</span>
            <span class="text-cyan-300 font-medium">{{ quest.region }}</span>
          </div>

          <div class="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div class="text-xs text-amber-400/90 mb-1 font-semibold">【前置条件与探索线索】</div>
            <div class="text-gray-300 text-xs leading-relaxed">{{ quest.trigger }}</div>
          </div>

          <div class="p-3 bg-purple-950/20 rounded border border-purple-900/30">
            <div class="text-xs text-purple-300 mb-1 font-semibold">🎁 任务奖励:</div>
            <div class="text-yellow-200 text-xs font-bold">{{ quest.reward }}</div>
          </div>

          <p class="text-gray-400 text-xs leading-relaxed">{{ quest.desc }}</p>
          <div v-if="'status' in quest" class="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div class="text-xs text-cyan-300 mb-1 font-semibold">{{ quest.status }}</div>
            <p class="text-gray-400 text-xs leading-relaxed">{{ quest.validation }}</p>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 无结果兜底 -->
    <div v-else class="text-center py-12 bg-[#121626]/60 border border-slate-800 rounded-xl space-y-2">
      <span class="text-3xl block">🔍</span>
      <p class="text-gray-300 font-bold">暂无匹配的支线探索资料</p>
      <p class="text-xs text-gray-500">可尝试重置分类筛选或清除搜索关键词</p>
      <n-button size="small" type="primary" secondary @click="resetSearch">重置筛选</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const sidequests = computed(() => gameStore.db.sidequests || [])

const activeFilter = ref('all')
const searchKeyword = ref('')

const typeFilters = [
  { key: 'all', label: '全部资料' },
  { key: 'bounty', label: '悬赏讨伐' },
  { key: 'tavern', label: '酒馆情报' },
  { key: 'relic', label: '神兵秘境' },
  { key: 'quest', label: '正式支线' }
]

const matchCategory = (quest: any, key: string) => {
  if (key === 'all') return true
  const t = String(quest.type || '')
  if (key === 'bounty') return t.includes('悬赏')
  if (key === 'tavern') return t.includes('酒馆')
  if (key === 'relic') return t.includes('神兵')
  if (key === 'quest') return t.includes('支线') || (!t.includes('悬赏') && !t.includes('酒馆') && !t.includes('神兵'))
  return false
}

const getFilterCount = (key: string) => {
  return sidequests.value.filter(q => matchCategory(q, key)).length
}

const filteredSidequests = computed(() => {
  return sidequests.value.filter(quest => {
    if (!matchCategory(quest, activeFilter.value)) return false
    if (searchKeyword.value.trim()) {
      const kw = searchKeyword.value.trim().toLowerCase()
      const t = String(quest.title || '').toLowerCase()
      const r = String(quest.region || '').toLowerCase()
      const rew = String(quest.reward || '').toLowerCase()
      const d = String(quest.desc || '').toLowerCase()
      if (!t.includes(kw) && !r.includes(kw) && !rew.includes(kw) && !d.includes(kw)) return false
    }
    return true
  })
})

const resetSearch = () => {
  activeFilter.value = 'all'
  searchKeyword.value = ''
}

// ================= 陆行鸟 16 环全域巡礼模拟器 (chocobo_circuit_route.gd) =================
interface ChocoboCheckpoint {
  index: number
  coords: string
  label: string
  alias: string
  desc: string
}

const chocoboCheckpoints: ChocoboCheckpoint[] = [
  { index: 1, coords: '(920, 760)', label: '后山西林起点', alias: '幻影村西林', desc: '后山饲养所林地起跑线，开始环岛计时。' },
  { index: 2, coords: '(1200, 520)', label: '晨辉道路西侧', alias: '晨辉荒野峡谷', desc: '沿晨辉王城通往北方的平原大道西侧隘口。' },
  { index: 3, coords: '(1536, 192)', label: '秘法都北侧通道', alias: '沃尔斯山隘', desc: '穿越沃尔斯群山北麓狭窄的冰霜石廊。' },
  { index: 4, coords: '(2320, 192)', label: '织造城东北角', alias: '卡纳克熔岩桥', desc: '经火山熔岩桥外缘，绕过织造工坊外墙。' },
  { index: 5, coords: '(2336, 640)', label: '东岸大陆', alias: '雅辛古半岛', desc: '抵达极东海岸线悬崖，眺望无尽外海。' },
  { index: 6, coords: '(2320, 1152)', label: '帝都东岸', alias: '帝国外港边缘', desc: '南方帝国要塞外缘浅滩与平原交界处。' },
  { index: 7, coords: '(2320, 1632)', label: '鬼子岛北侧大陆', alias: '孤岛对岸', desc: '面对鬼子岛的南部陆地凸角。' },
  { index: 8, coords: '(1760, 1680)', label: '人鱼湾南方边缘', alias: '沉睡大陆边缘', desc: '人鱼湾海潮翻涌的金色沙滩南岸。' },
  { index: 9, coords: '(1280, 1712)', label: '世界树南方边缘', alias: '沉睡大陆边缘', desc: '遥望参天世界树古老根须蔓延地界。' },
  { index: 10, coords: '(896, 1720)', label: '南湖东侧', alias: '沉睡大陆边缘', desc: '平缓宽阔的南方内陆淡水湖东岸。' },
  { index: 11, coords: '(256, 1720)', label: '南湖西南角', alias: '沉睡大陆边缘', desc: '大陆极西南端拐角，需绕过巨型岩盘。' },
  { index: 12, coords: '(280, 1260)', label: '沙月城西侧', alias: '沉睡大陆边缘', desc: '穿越沙月荒漠绿洲西侧的流动沙丘。' },
  { index: 13, coords: '(280, 672)', label: '影乡西侧', alias: '沉睡大陆边缘', desc: '迷雾笼罩的影之部族隐秘森林外缘。' },
  { index: 14, coords: '(600, 640)', label: '西山南缘', alias: '沉睡大陆边缘', desc: '西侧断崖巨岩南侧的山麓通道。' },
  { index: 15, coords: '(800, 448)', label: '北部山体南缘', alias: '北之山外圈', desc: '北之山脉南坡，准备折返终点。' },
  { index: 16, coords: '(920, 760)', label: '西林归还点', alias: '终点归还', desc: '重返后山饲养所林地，完成 16 环全域闭环！' }
]

const currentChocoboStep = ref(1)
const isVestClaimed = ref(false)

const activeCheckpoint = computed(() => {
  return chocoboCheckpoints.find(c => c.index === currentChocoboStep.value) || chocoboCheckpoints[0]
})

const resetChocoboCircuit = () => {
  currentChocoboStep.value = 1
  isVestClaimed.value = false
}

const claimMirageVest = () => {
  if (currentChocoboStep.value < 16) return
  isVestClaimed.value = true
}

// ================= SQ-02 始源神殿残卷任务模拟器 (temple_manuscript_quest.gd) =================
const manuscriptAccepted = ref(true)
const manuscriptDelivered = ref(false)
const curaInherited = ref(false)
const hasManuscriptPage = ref<[boolean, boolean, boolean]>([false, false, false])
const hasCuraMagic = ref(false)

const manuscriptLog = ref<string[]>([
  '始源神殿：向侍童甲接取委托 [sq02_manuscript_accepted]，地脉 3 处调查标记已激活。'
])

const collectedPagesCount = computed(() => {
  return hasManuscriptPage.value.filter(Boolean).length
})

const isReadyToDeliver = computed(() => {
  return manuscriptAccepted.value && !manuscriptDelivered.value && hasManuscriptPage.value.every(Boolean)
})

const toggleManuscriptPage = (idx: number) => {
  const titles = ['西石柱旁的残页 (360,560)', '东石柱旁的残页 (920,560)', '中央石路旁的残页 (640,560)']
  hasManuscriptPage.value[idx] = !hasManuscriptPage.value[idx]
  if (hasManuscriptPage.value[idx]) {
    manuscriptLog.value.unshift(`📜 拾取 [${titles[idx]}] (Item ${155 + idx})，设置 flag: sq02_manuscript_page_${idx + 1}。`)
  } else {
    manuscriptLog.value.unshift(`↩️ 移除 [${titles[idx]}]。`)
  }
  if (manuscriptLog.value.length > 6) manuscriptLog.value.pop()
}

const deliverManuscriptPages = () => {
  if (!isReadyToDeliver.value) {
    manuscriptLog.value.unshift('❌ 侍童甲：“请把三页晶石典籍都带回来，我会教你中回复。”')
    if (manuscriptLog.value.length > 6) manuscriptLog.value.pop()
    return
  }
  manuscriptDelivered.value = true
  hasManuscriptPage.value = [false, false, false] // 交付扣除 3 页
  hasCuraMagic.value = true
  manuscriptLog.value.unshift('🎉 交付成功！原子写入 player_magic [cura] (purchased=1)，扣除三页残卷，习得白魔法【中回复】(Cura)！')
  if (manuscriptLog.value.length > 6) manuscriptLog.value.pop()
}

const resetManuscriptQuest = () => {
  manuscriptAccepted.value = true
  manuscriptDelivered.value = false
  curaInherited.value = false
  hasManuscriptPage.value = [false, false, false]
  hasCuraMagic.value = false
  manuscriptLog.value.unshift('🔄 重置任务状态：已重新接取委托，背包中三页残卷已清空，中回复锁定。')
  if (manuscriptLog.value.length > 6) manuscriptLog.value.pop()
}

const simulateManuscriptNGPlus = () => {
  if (!hasCuraMagic.value) {
    manuscriptLog.value.unshift('⚠️ 本周目尚未习得中回复 (Cura)，NG+ 无法继承未解锁魔法。')
    if (manuscriptLog.value.length > 6) manuscriptLog.value.pop()
    return
  }
  curaInherited.value = true
  manuscriptAccepted.value = false
  manuscriptDelivered.value = false
  manuscriptLog.value.unshift('✨ 跃迁至 NG+ 周目！核验通关凭证合规 (cycle <= clears + 1)，设置 sq02_cura_inherited = true，保留中回复 (Cura)！')
  if (manuscriptLog.value.length > 6) manuscriptLog.value.pop()
}

// ================= 四大远古石板解封额度与七色彩尾兑换工坊 (legendary_acquisition_transaction.gd) =================
const tabletObtained = ref({
  pyramid: true, // +3
  island_shrine: true, // +3
  great_trench: false, // +3
  istory_falls: false // +2
})

const unsealedWeaponsList = ref<string[]>(['2100', '2101']) // 初始已解封 2 件
const selectedWeaponToUnseal = ref<string>('2106') // 默认选烈焰魔剑

const sealedWeaponOptionsToUnseal = [
  { label: '2100: 石板圣剑 (Excalibur · 骑士王剑)', value: '2100' },
  { label: '2101: 贤者之杖 (Sage Staff · 战斗战复)', value: '2101' },
  { label: '2102: 源氏之铠 (Genji Armor · 强韧板甲)', value: '2102' },
  { label: '2103: 源氏之盾 (Genji Shield · 极高物理格挡)', value: '2103' },
  { label: '2104: 神圣飞枪 (Holy Lance · 跳跃追加圣光)', value: '2104' },
  { label: '2105: 与一之弓 (Yoichi Bow · 双手持用高伤)', value: '2105' },
  { label: '2106: 烈焰魔剑 (Flame Sword · 普攻追加米西迪亚爆炎)', value: '2106' },
  { label: '2107: 封印魔导书 (Sealed Grimoire · 神圣法术 1.5x)', value: '2107' },
  { label: '2108: 阿波罗之竖琴 (Apollo Harp · 黑魔法 1.5x)', value: '2108' },
  { label: '2109: 大地之锤 (Gaia Hammer · 普攻追加全域地震)', value: '2109' },
  { label: '2110: 刺客短刃 (Assassin Dagger · 普攻25%直接斩杀)', value: '2110' }
]

const totalCreditsFromTablets = computed(() => {
  let sum = 0
  if (tabletObtained.value.pyramid) sum += 3
  if (tabletObtained.value.island_shrine) sum += 3
  if (tabletObtained.value.great_trench) sum += 3
  if (tabletObtained.value.istory_falls) sum += 2
  return sum
})

const unsealAvailableCredits = computed(() => {
  return Math.max(0, totalCreditsFromTablets.value - unsealedWeaponsList.value.length)
})

const recalculateCredits = () => {
  legendaryLog.value.unshift(`🏛️ 重新核算远古石板：累计获得额度 ${totalCreditsFromTablets.value} 点，已用 ${unsealedWeaponsList.value.length} 点，剩余可用 ${unsealAvailableCredits.value} 点。`)
  if (legendaryLog.value.length > 6) legendaryLog.value.pop()
}

const claimUnsealedWeapon = () => {
  const wid = selectedWeaponToUnseal.value
  if (!wid) return
  if (unsealedWeaponsList.value.includes(wid)) {
    legendaryLog.value.unshift(`⚠️ 武器 [${wid}] 已经处于解封状态，请勿重复解封！`)
    if (legendaryLog.value.length > 6) legendaryLog.value.pop()
    return
  }
  if (unsealAvailableCredits.value <= 0) {
    legendaryLog.value.unshift('❌ 解封失败：可用石板额度不足！请先收集更多远古石板。')
    if (legendaryLog.value.length > 6) legendaryLog.value.pop()
    return
  }
  unsealedWeaponsList.value.push(wid)
  legendaryLog.value.unshift(`🎉 事务成功：消耗 1 点额度解封法定神兵 [${wid}]！剩余额度 ${unsealAvailableCredits.value} 点。`)
  if (legendaryLog.value.length > 6) legendaryLog.value.pop()
}

// 七色彩尾 1:1 配方
const tailRecipeList = [
  { color: 'pink', colorLabel: '粉红尾巴 (147)', currencyId: 147, rewardId: '2113', rewardName: '阿克塞尔之旋' },
  { color: 'grey', colorLabel: '灰色尾巴 (148)', currencyId: 148, rewardId: '2114', rewardName: '瓦尔哈拉圣剑' },
  { color: 'red', colorLabel: '红色彩尾 (149)', currencyId: 149, rewardId: '2115', rewardName: '鲜血之枪' },
  { color: 'gold', colorLabel: '金色尾巴 (150)', currencyId: 150, rewardId: '2116', rewardName: '创世之刃' },
  { color: 'blue', colorLabel: '蓝色尾巴 (151)', currencyId: 151, rewardId: '2117', rewardName: '人鱼竖琴' },
  { color: 'yellow', colorLabel: '黄色尾巴 (152)', currencyId: 152, rewardId: '2118', rewardName: '火箭重锤' },
  { color: 'green', colorLabel: '绿色尾巴 (153)', currencyId: 153, rewardId: '2119', rewardName: '自动连弩' }
]

const tailInventory = ref<Record<number, number>>({
  147: 1,
  148: 1,
  149: 0,
  150: 1,
  151: 0,
  152: 1,
  153: 0
})

const tailClaims = ref<Record<string, boolean>>({
  pink: false,
  grey: false,
  red: false,
  gold: false,
  blue: false,
  yellow: false,
  green: false
})

const addTailItem = (currencyId: number) => {
  tailInventory.value[currencyId] = (tailInventory.value[currencyId] || 0) + 1
  legendaryLog.value.unshift(`✨ 背包获得 1 根尾巴 (Item ${currencyId})，当前存量: ${tailInventory.value[currencyId]}`)
  if (legendaryLog.value.length > 6) legendaryLog.value.pop()
}

const tradeTail = (color: string, currencyId: number, rewardId: string, rewardName: string) => {
  if (tailClaims.value[color]) {
    legendaryLog.value.unshift(`⚠️ 【${color}】色神兵已完成过兑换，每个周目限定 1 次。`)
    if (legendaryLog.value.length > 6) legendaryLog.value.pop()
    return
  }
  const currentCount = tailInventory.value[currencyId] || 0
  if (currentCount < 1) {
    legendaryLog.value.unshift(`❌ 兑换受阻：背包中缺少对应的尾巴 (Item ${currencyId})！`)
    if (legendaryLog.value.length > 6) legendaryLog.value.pop()
    return
  }
  // 事务执行: 扣除尾巴，给予神兵，记录 claims
  tailInventory.value[currencyId] = currentCount - 1
  tailClaims.value[color] = true
  legendaryLog.value.unshift(`🌈 兑换达成！签发来源票完成原子交易：消耗 1 根尾巴 (Item ${currencyId})，获得终极神兵【${rewardName}】(${rewardId})！`)
  if (legendaryLog.value.length > 6) legendaryLog.value.pop()
}

const legendaryLog = ref<string[]>([
  '系统就绪: legendary_acquisition_transaction.gd 与 registry.gd 契约完成加载',
  '契约守卫: 四大石板产出精确 11 额度，七色彩尾 1:1 兑换防重复'
])

const resetLegendaryStudio = () => {
  tabletObtained.value = {
    pyramid: true,
    island_shrine: true,
    great_trench: false,
    istory_falls: false
  }
  unsealedWeaponsList.value = ['2100', '2101']
  selectedWeaponToUnseal.value = '2106'
  tailClaims.value = {
    pink: false,
    grey: false,
    red: false,
    gold: false,
    blue: false,
    yellow: false,
    green: false
  }
  legendaryLog.value = [
    '重置完成: 远古石板与彩尾交易推演台已恢复初始状态',
    '默认持有: 金字塔+孤岛神殿石板 (6额度)，已解封 2 件，剩余 4 额度'
  ]
}
</script>
