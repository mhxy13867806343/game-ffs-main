<template>
  <div class="sidequests-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-purple-950/80 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              VBLE Sidequests, Cross-Epoch Chains & Relic Vault Studio v2.2.324
            </span>
            <span class="text-xs text-gray-400">支线全域考据与隐藏秘境推演</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🗺️</span> 支线全域考据：时空寻宝与隐藏秘境沙盘工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            涵盖西方王城王冠之托、星界缎带传承、大陆十六环陆行鸟巡礼，乃至四方神殿远古石板与七色彩尾神兵。全新实装全域时空寻宝与隐秘藏宝库推演沙盘。
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="text-xs text-amber-300/80 font-medium">相关权威白皮书：</span>
            <router-link
              to="/vble/docs/SIDEQUESTS_SECRETS"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-900/60 text-amber-200 border border-amber-500/40 hover:bg-amber-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>🗝️</span>
              <span>支线秘闻与时空寻宝白皮书 (VOL.07)</span>
              <span class="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </router-link>
            <router-link
              to="/vble/docs/NPC_INTERACTIONS"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-900/60 text-rose-200 border border-rose-500/40 hover:bg-rose-800/80 hover:text-white transition-all shadow-sm group"
            >
              <span>🤝</span>
              <span>NPC交互与信赖矩阵白皮书 (VOL.20)</span>
              <span class="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </router-link>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToEpochSidequestStudio"
          >
            <template #icon><span>📜</span></template>
            跨纪元支线任务工坊
          </n-button>
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToBountyTrustStudio"
          >
            <template #icon><span>🎖️</span></template>
            悬赏评级与信赖度工坊
          </n-button>
          <n-button
            type="warning"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToTreasureStudio"
          >
            <template #icon><span>💎</span></template>
            前往时空寻宝沙盘
          </n-button>
          <router-link to="/vble/dungeons">
            <n-button size="medium" round tertiary>
              查看全域地宫
            </n-button>
          </router-link>
          <router-link to="/vble">
            <n-button size="medium" round tertiary>
              返回首页
            </n-button>
          </router-link>
        </div>
      </div>
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

    <!-- 酒馆 S 级【死亡之眼】绝密悬赏令与十二前置契约工坊 (基于 tavern_bounty_s_save.gd) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-purple-950/40 border border-rose-500/40 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-800/40 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="text-xl">👁️</span>
          <h3 class="text-base sm:text-lg font-bold text-rose-300">酒馆 S 级【死亡之眼】绝密悬赏令与十二前置契约工坊 (Tavern S-Rank Bounty Studio)</h3>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          <n-tag type="error" size="small" round>S 级最高绝密</n-tag>
          <n-tag type="warning" size="small" round>通关星标守卫</n-tag>
          <n-tag type="info" size="small" round>十二前置强约束</n-tag>
        </div>
      </div>

      <p class="text-xs text-gray-300 leading-relaxed">
        对齐 Godot 引擎 <code>tavern_bounty_s_save.gd</code> 最新实机规约：S 级绝密首领【死亡之眼】(Death Eye) 严格遵守十二项前置悬赏全达成契约 (D/C/B/A 四阶各 3 阶段)，本周目必须持有 <code>clear_star == true</code> 通关凭据，三项核心旗标严格遵循“接取 ➔ 讨伐 ➔ 交付”不可逆推进。
      </p>

      <!-- 核心三大规约卡 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <div class="p-3 bg-slate-900/80 rounded-xl border border-rose-800/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-rose-300">📜 十二前置全真契约 (PREREQUISITES)</span>
            <n-tag size="tiny" type="error">DCBA 12 FLAGS</n-tag>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
            <li><strong>D级杀手蜂:</strong> 接取(accepted) ➔ 击败(defeated) ➔ 领赏(claimed)</li>
            <li><strong>C级巨蝎:</strong> 接取 ➔ 击败 ➔ 交付(delivered)</li>
            <li><strong>B级僵尸恶龙:</strong> 接取 ➔ 击败 ➔ 交付</li>
            <li><strong>A级奇美拉兽王:</strong> 接取 ➔ 击败 ➔ 交付</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-900/80 rounded-xl border border-amber-800/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-300">⭐ 通关星标准入守卫 (Clear Star)</span>
            <n-tag size="tiny" type="warning">POST-GAME</n-tag>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
            <li><strong>双重真值要求:</strong> <code>clear_star == true</code> 且 <code>clear_count &ge; 1</code>。</li>
            <li><strong>防欺诈机制:</strong> 未通关档即便通过旧代码伪造 S 级旗标，也会被 <code>valid()</code> 门禁判定坏档拒绝载入。</li>
          </ul>
        </div>

        <div class="p-3 bg-slate-900/80 rounded-xl border border-purple-800/30 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-300">🔒 严格三阶段状态机推进</span>
            <n-tag size="tiny" type="info">FLAGS ORDER</n-tag>
          </div>
          <ul class="text-[10px] text-gray-400 space-y-0.5 list-disc list-inside">
            <li><strong>阶段 1:</strong> <code>bounty_s_death_eye_accepted</code> (已接取)</li>
            <li><strong>阶段 2:</strong> <code>bounty_s_death_eye_defeated</code> (已斩杀)</li>
            <li><strong>阶段 3:</strong> <code>bounty_s_death_eye_delivered</code> (交付领赏)</li>
            <li><strong>防跃进:</strong> 严禁跳过接取直接讨伐，严禁未讨伐直接交付。</li>
          </ul>
        </div>
      </div>

      <!-- 交互推演台: S级悬赏资格与生命周期推演台 -->
      <div class="p-3 sm:p-4 rounded-xl bg-slate-950/80 border border-rose-600/30 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-rose-400">🧪 S 级绝密悬赏接取与契约验证台</span>
            <n-tag size="tiny" :type="isBountySEligible ? 'success' : 'error'" round>
              {{ isBountySEligible ? '✨ S 级悬赏资格：完全达成' : '🔒 S 级悬赏：前置或星标缺失' }}
            </n-tag>
          </div>
          <div class="flex items-center gap-2">
            <n-button size="tiny" secondary type="warning" @click="resetBountySStudio">
              🔄 重置模拟
            </n-button>
          </div>
        </div>

        <!-- 前置开关 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
          <div class="space-y-1">
            <div class="text-[10px] text-gray-400 font-bold">通关星标认证:</div>
            <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer mt-0.5">
              <input type="checkbox" v-model="bountySHasClearStar" />
              <span>本轮持有【通关星标】(clear_star)</span>
            </label>
            <div class="text-[10px] text-gray-500">通关次数: {{ bountySClearCount }} 次</div>
          </div>

          <div class="space-y-1">
            <div class="text-[10px] text-gray-400 font-bold">十二前置达成控制:</div>
            <div class="flex items-center gap-1.5">
              <n-button size="tiny" secondary type="success" @click="setAllPrerequisites(true)">
                ✅ 一键全部达成
              </n-button>
              <n-button size="tiny" secondary type="warning" @click="setAllPrerequisites(false)">
                ❌ 全部清空
              </n-button>
            </div>
            <div class="text-[10px] font-mono text-cyan-400">
              已达成: {{ completedPrereqCount }} / 12 个前置旗标
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-[10px] text-gray-400 font-bold">S 级死亡之眼进度:</div>
            <div class="flex items-center gap-1.5">
              <n-tag size="small" :type="bountySDelivered ? 'success' : bountySDefeated ? 'info' : bountySAccepted ? 'warning' : 'default'">
                {{ bountySDelivered ? '👑 悬赏已圆满结清' : bountySDefeated ? '💀 首领已被讨伐' : bountySAccepted ? '⚔️ 悬赏进行中' : '未接取' }}
              </n-tag>
            </div>
            <div class="text-[10px] text-gray-500">委托人: 酒馆神秘密探</div>
          </div>
        </div>

        <!-- 任务操作按钮 -->
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <n-button
            size="small"
            secondary
            type="warning"
            :disabled="!isBountySEligible || bountySAccepted"
            @click="acceptBountyS"
          >
            📜 揭榜接取 S 级【死亡之眼】
          </n-button>
          <n-button
            size="small"
            secondary
            type="error"
            :disabled="!bountySAccepted || bountySDefeated"
            @click="defeatBountyS"
          >
            ⚔️ 讨伐击败死亡之眼
          </n-button>
          <n-button
            size="small"
            type="primary"
            :disabled="!bountySDefeated || bountySDelivered"
            @click="deliverBountyS"
          >
            🎁 交付收据领取特级丰厚报酬
          </n-button>
        </div>

        <!-- 审计日志 -->
        <div class="p-2 rounded bg-black/40 border border-slate-800 text-[10px] font-mono space-y-1">
          <div class="text-gray-500 font-bold">S 级悬赏合同执行审计 (TavernBountyS Trace):</div>
          <div v-for="(log, idx) in bountySLog" :key="idx" class="text-rose-300 truncate">
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

    <!-- 🌌 世界时空裂隙委托派遣与远古神兵封印解禁工坊 (Rift Expedition & Legendary Armory Studio) -->
    <div class="bg-gradient-to-br from-[#12162a]/95 via-[#1a1432]/90 to-[#0e1628]/95 border border-purple-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 头部与控制栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/40 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🌌</span>
            <h2 class="text-lg sm:text-xl font-black text-purple-300">
              世界时空裂隙委托派遣与远古神兵封印解禁工坊 (Rift Expedition & Armory Studio)
            </h2>
            <n-tag size="small" type="warning" round strong>跨维调度内核</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            推演多元裂隙探险队列分配、队长职能加成、探险补给配给，并以四大远古石板解禁封印在孤岛金字塔的十二柄传奇圣兵！
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetRiftStudio">
            🔄 重置工坊参数
          </n-button>
          <n-button
            size="small"
            type="primary"
            class="font-bold shadow"
            :disabled="expeditionState !== 'exploring'"
            @click="fastForwardExpedition"
          >
            ⚡ 即刻完成派遣探索
          </n-button>
        </div>
      </div>

      <!-- 双核心工坊阵列 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 栏 1: 时空裂隙委托探险队调度面板 (6 cols) -->
        <div class="lg:col-span-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-purple-300 flex items-center gap-1.5">
                <span>🛰️</span> 时空裂隙探险调度 (Rift Expeditions)
              </span>
              <n-tag size="tiny" :type="expeditionState === 'exploring' ? 'warning' : expeditionState === 'completed' ? 'success' : 'default'">
                {{ expeditionState === 'exploring' ? '探险队列进行中' : expeditionState === 'completed' ? '探险圆满归来' : '待命整装' }}
              </n-tag>
            </div>

            <!-- 目标裂隙选择 -->
            <div class="space-y-1.5">
              <label class="text-[11px] text-gray-400 block font-bold">1. 选定目标裂隙探险层级:</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="dest in riftDestinations"
                  :key="dest.id"
                  type="button"
                  class="p-2.5 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between select-none"
                  :class="selectedRiftDestId === dest.id
                    ? 'bg-purple-900/40 border-purple-400 text-purple-200 shadow-md shadow-purple-900/30'
                    : 'bg-slate-900/80 border-slate-800 text-gray-300 hover:border-slate-700'"
                  :disabled="expeditionState === 'exploring'"
                  @click="selectedRiftDestId = dest.id"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold">{{ dest.icon }} {{ dest.name }}</span>
                    <n-tag size="tiny" :type="dest.dangerTag">{{ dest.danger.toUpperCase() }}</n-tag>
                  </div>
                  <div class="text-[10px] text-gray-400 mt-1 font-mono">⏱️ {{ dest.durationDesc }}</div>
                  <div class="text-[10px] text-amber-300/90 mt-0.5 truncate">🎁 {{ dest.baseReward }}</div>
                </button>
              </div>
            </div>

            <!-- 队长职能与物资配给 -->
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label class="text-[11px] text-gray-400 block mb-1">2. 指派派遣队长职能:</label>
                <n-select
                  v-model:value="expeditionLeader"
                  :options="leaderOptions"
                  size="small"
                  :disabled="expeditionState === 'exploring'"
                />
              </div>
              <div>
                <label class="text-[11px] text-gray-400 block mb-1">3. 配备核心探索物资:</label>
                <n-select
                  v-model:value="expeditionSupply"
                  :options="supplyOptions"
                  size="small"
                  :disabled="expeditionState === 'exploring'"
                />
              </div>
            </div>

            <!-- 探险进度条 -->
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300">探险探索深潜度:</span>
                <span class="font-mono font-bold" :class="expeditionProgress === 100 ? 'text-emerald-400' : 'text-purple-400'">
                  {{ expeditionProgress }}%
                </span>
              </div>
              <n-progress
                type="line"
                :percentage="expeditionProgress"
                :status="expeditionProgress === 100 ? 'success' : 'default'"
                :show-indicator="false"
              />
            </div>

            <!-- 派遣控制按钮 -->
            <div class="flex items-center gap-2">
              <n-button
                v-if="expeditionState !== 'exploring'"
                size="small"
                type="primary"
                block
                class="font-bold"
                @click="startExpedition"
              >
                🚀 组建并派遣时空探险小队
              </n-button>
              <n-button
                v-else
                size="small"
                type="error"
                secondary
                block
                @click="cancelExpedition"
              >
                🛑 紧急召回小队 (放弃收益)
              </n-button>
            </div>
          </div>

          <!-- 探险动态日志 -->
          <div class="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono space-y-1 mt-2">
            <div class="text-purple-400 font-bold">时空派遣实时回响 (Expedition Echoes):</div>
            <div v-for="(log, idx) in expeditionLog" :key="idx" class="text-gray-300 truncate">
              &gt; {{ log }}
            </div>
          </div>
        </div>

        <!-- 栏 2: 远古金字塔十二圣兵封印解禁殿堂 (6 cols) -->
        <div class="lg:col-span-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-amber-300 flex items-center gap-1.5">
                <span>🗡️</span> 十二远古圣兵封印阵列 (12 Sealed Weapons)
              </span>
              <div class="flex items-center gap-1 font-mono text-xs">
                <span class="text-gray-400">已解禁:</span>
                <span class="text-amber-400 font-bold">{{ unlockedWeaponsCount }}</span>
                <span class="text-gray-500">/ 12</span>
              </div>
            </div>

            <!-- 远古石板收集滑块与额度计算器 -->
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between items-center text-gray-300">
                <span>已获得远古石板数量 (每块解禁 3 件):</span>
                <span class="font-mono font-bold text-amber-300">
                  {{ ancientTabletsFound }} / 4 块 (总额度: {{ totalSealQuota }} 件)
                </span>
              </div>
              <n-slider v-model:value="ancientTabletsFound" :min="0" :max="4" :step="1" />
              <div class="flex items-center justify-between text-[11px] pt-0.5">
                <span class="text-gray-400">当前可用解禁点数:</span>
                <span
                  class="font-mono font-bold px-2 py-0.5 rounded"
                  :class="remainingSealQuota > 0 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-slate-800 text-gray-400'"
                >
                  {{ remainingSealQuota }} 剩余点数
                </span>
              </div>
            </div>

            <!-- 十二圣兵卡片列表 (紧凑 3 列) -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div
                v-for="weapon in legendaryWeapons"
                :key="weapon.id"
                class="p-2 rounded-lg border text-xs flex flex-col justify-between select-none cursor-pointer transition-all"
                :class="weapon.unlocked
                  ? 'bg-amber-950/30 border-amber-500/60 text-amber-200 shadow-sm shadow-amber-900/20'
                  : 'bg-slate-900/60 border-slate-800/80 text-gray-500 hover:border-slate-700'"
                @click="toggleWeaponUnlock(weapon)"
              >
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-base">{{ weapon.icon }}</span>
                    <n-tag size="tiny" :type="weapon.unlocked ? 'warning' : 'default'" round>
                      {{ weapon.unlocked ? '已解印' : '受封印' }}
                    </n-tag>
                  </div>
                  <div class="font-bold text-[11px] mt-1 truncate" :class="weapon.unlocked ? 'text-amber-300' : 'text-gray-400'">
                    {{ weapon.name }}
                  </div>
                  <div class="text-[9px] text-gray-500 font-mono">{{ weapon.type }}</div>
                </div>
                <div class="text-[9px] text-gray-400 mt-1 line-clamp-2 leading-tight">
                  {{ weapon.effect }}
                </div>
              </div>
            </div>
          </div>

          <!-- 解禁审计状态条 -->
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-gray-300 min-h-[36px] flex items-center justify-between">
            <span class="truncate">🛡️ {{ sealBreakerLog }}</span>
            <n-button size="tiny" tertiary type="warning" @click="unlockAllAffordable">
              一键配满
            </n-button>
          </div>
        </div>
      </div>

      <!-- 实装审计底栏 -->
      <div class="p-3.5 rounded-xl bg-slate-950/90 border border-purple-900/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-purple-400 text-base">⚡</span>
          <span class="font-bold text-purple-300">工坊底层调度日志：</span>
          <span class="text-gray-200 font-mono">{{ riftAuditLog }}</span>
        </div>
        <div class="text-[11px] text-gray-500 font-mono">
          底层契约: rift_expedition_dispatcher.gd & legendary_seal_breaker.gd
        </div>
      </div>
    </div>

    <!-- 💎 SQ-14 全域时空寻宝与隐秘藏宝库推演沙盘 (World Treasure Hunt & Secret Vault Excavation Studio) -->
    <div id="treasure-hunt-studio" class="bg-gradient-to-br from-[#12162a]/95 via-[#1a1432]/90 to-[#0e1628]/95 border border-amber-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden">
      <!-- 头部与控制栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/40 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">💎</span>
            <h2 class="text-lg sm:text-xl font-black text-amber-300">
              全域时空寻宝与隐秘藏宝库推演沙盘 (World Treasure Hunt Studio)
            </h2>
            <n-tag size="small" type="warning" round strong>绝版秘宝发掘</n-tag>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            推演孤岛沉船、蜃气楼古塔、龙之颈竞技场与海底神殿四大隐秘秘境，结合寻宝专家职能、勘探圣器与守卫破除策，实时演算神兵与战利品掉落！
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <n-button size="small" secondary type="warning" @click="resetTreasureStudio">
            🔄 重置寻宝沙盘
          </n-button>
          <n-button
            size="small"
            type="primary"
            class="font-bold shadow"
            :disabled="excavationState !== 'excavating'"
            @click="fastForwardExcavation"
          >
            ⚡ 即刻完成发掘
          </n-button>
        </div>
      </div>

      <!-- 快捷预设装载条 -->
      <div class="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <span class="text-gray-400 font-semibold flex items-center gap-1">
          <span>⚡</span> 快速载入寻宝秘境预设：
        </span>
        <n-button size="tiny" round secondary type="info" @click="applyTreasurePreset('sunken_galleon')">
          孤岛沉船幽灵宝库 (诸神之黄昏)
        </n-button>
        <n-button size="tiny" round secondary type="warning" @click="applyTreasurePreset('mirage_bazaar')">
          蜃气楼古塔暗铺 (星界缎带真品)
        </n-button>
        <n-button size="tiny" round secondary type="error" @click="applyTreasurePreset('dragons_neck_arena')">
          龙之颈决斗裂谷 (龙之髭硬鞭)
        </n-button>
        <n-button size="tiny" round secondary type="success" @click="applyTreasurePreset('submarine_abyssal_shrine')">
          远古海底神殿 (创世神枪瓦尔哈拉)
        </n-button>
      </div>

      <!-- 双核心工坊阵列 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 栏 1: 发掘调配与参数调谐 (5 cols) -->
        <div class="lg:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-amber-300 flex items-center gap-1.5">
                <span>🎛️</span> 寻宝勘探调配控制台
              </span>
              <n-tag size="tiny" :type="excavationState === 'excavating' ? 'warning' : excavationState === 'completed' ? 'success' : 'default'">
                {{ excavationState === 'excavating' ? '深潜发掘进行中' : excavationState === 'completed' ? '发掘圆满凯旋' : '先锋整装待发' }}
              </n-tag>
            </div>

            <!-- 目标秘境选择 -->
            <div class="space-y-1.5">
              <label class="text-[11px] text-gray-400 block font-bold">1. 选定目标隐秘藏宝地表:</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  v-for="site in treasureSites"
                  :key="site.id"
                  type="button"
                  class="p-2 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between select-none"
                  :class="selectedSiteId === site.id
                    ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-md shadow-amber-900/30'
                    : 'bg-slate-900/80 border-slate-800 text-gray-300 hover:border-slate-700'"
                  :disabled="excavationState === 'excavating'"
                  @click="selectedSiteId = site.id"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold">{{ site.icon }} {{ site.name }}</span>
                    <n-tag size="tiny" :type="site.dangerColor">{{ site.dangerTier.split(' · ')[0] }}</n-tag>
                  </div>
                  <div class="text-[10px] text-gray-400 mt-1 truncate">{{ site.region }}</div>
                  <div class="text-[10px] text-amber-300/90 mt-0.5 truncate">🎁 {{ site.signatureItem }}</div>
                </button>
              </div>
            </div>

            <!-- 先锋职能与随身圣器 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div>
                <label class="text-[11px] text-gray-400 block mb-1 font-semibold">2. 领衔探宝专家职能:</label>
                <n-select
                  v-model:value="selectedSeekerId"
                  :options="seekerRoleOptions"
                  size="small"
                  :disabled="excavationState === 'excavating'"
                />
              </div>
              <div>
                <label class="text-[11px] text-gray-400 block mb-1 font-semibold">3. 配备勘探圣器工具:</label>
                <n-select
                  v-model:value="selectedToolId"
                  :options="loadoutToolOptions"
                  size="small"
                  :disabled="excavationState === 'excavating'"
                />
              </div>
            </div>

            <!-- 发掘深度滑块 -->
            <div class="space-y-1">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-300 font-semibold">4. 密境纵深发掘层级:</span>
                <span class="font-mono font-bold text-amber-300">地下第 {{ excavationDepth }} 层 / 5 层</span>
              </div>
              <n-slider v-model:value="excavationDepth" :min="1" :max="5" :step="1" :disabled="excavationState === 'excavating'" />
              <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1层 (外廊)</span>
                <span>3层 (主墓室)</span>
                <span>5层 (深渊极渊)</span>
              </div>
            </div>

            <!-- 守护者应对策略 -->
            <div class="space-y-1">
              <label class="text-[11px] text-gray-400 block font-semibold">5. 守护魔兽/暗刺陷阱应对策:</label>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  class="p-2 rounded-lg border text-left transition-all"
                  :class="guardTactic === 'stealth'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  :disabled="excavationState === 'excavating'"
                  @click="guardTactic = 'stealth'"
                >
                  <div>🥷 潜行隐蔽绕行</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">零战损悄然开箱</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg border text-left transition-all"
                  :class="guardTactic === 'combat'
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  :disabled="excavationState === 'excavating'"
                  @click="guardTactic = 'combat'"
                >
                  <div>⚔️ 正面强攻破盾</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">夺取守护兽额外战利品</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg border text-left transition-all"
                  :class="guardTactic === 'charm'
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  :disabled="excavationState === 'excavating'"
                  @click="guardTactic = 'charm'"
                >
                  <div>🎵 诗篇安抚催眠</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">古龙安睡无声退场</div>
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg border text-left transition-all"
                  :class="guardTactic === 'bribe'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800'"
                  :disabled="excavationState === 'excavating'"
                  @click="guardTactic = 'bribe'"
                >
                  <div>💰 金币收买机关</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">黑市地精代开暗道</div>
                </button>
              </div>
            </div>
          </div>

          <!-- 发掘动作按钮 -->
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <div class="flex items-center gap-2">
              <n-button
                v-if="excavationState !== 'excavating'"
                size="medium"
                type="warning"
                block
                class="font-bold flex-1"
                @click="startExcavation"
              >
                <template #icon><span>⛏️</span></template>
                启动时空密境发掘
              </n-button>
              <n-button
                v-else
                size="medium"
                type="error"
                block
                class="font-bold flex-1"
                @click="cancelExcavation"
              >
                <template #icon><span>🛑</span></template>
                紧急撤回探险队
              </n-button>
            </div>
            <div class="flex items-center gap-2">
              <n-button size="small" secondary type="info" class="flex-1" @click="exportTreasureHuntCert">
                <template #icon><span>📜</span></template>
                导出寻宝勘探证书
              </n-button>
              <n-button size="small" secondary class="flex-1" @click="copyTreasureHuntChain">
                <template #icon><span>🔗</span></template>
                复制勘探参数
              </n-button>
            </div>
          </div>
        </div>

        <!-- 栏 2: 实时发掘进度、战利品展台与控制台日志 (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          <!-- 发掘实时进度与阶段展台 -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-cyan-300 flex items-center gap-1.5">
                <span>📡</span> 地脉发掘深潜进度与时序
              </span>
              <span class="font-mono font-bold" :class="excavationProgress === 100 ? 'text-emerald-400' : 'text-amber-400'">
                {{ excavationProgress }}% · {{ currentExcavationPhaseTitle }}
              </span>
            </div>

            <!-- 进度条 -->
            <n-progress
              type="line"
              :percentage="excavationProgress"
              :status="excavationProgress === 100 ? 'success' : 'default'"
              :show-indicator="false"
              processing
            />

            <!-- 五阶段时序指示器 -->
            <div class="grid grid-cols-5 gap-1 text-center text-[10px] font-mono">
              <div
                v-for="(pName, pIdx) in excavationPhaseNames"
                :key="pIdx"
                class="p-1.5 rounded transition-all truncate"
                :class="excavationProgress >= (pIdx + 1) * 20
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-bold'
                  : (excavationProgress >= pIdx * 20
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40 animate-pulse font-bold'
                    : 'bg-slate-900/60 text-gray-500 border border-slate-800/60')"
              >
                {{ pIdx + 1 }}. {{ pName }}
              </div>
            </div>
          </div>

          <!-- 战利品鉴定与发掘获利盘 -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span class="text-amber-300 flex items-center gap-1.5">
                <span>🏆</span> 探宝实战战利品与神兵鉴定展台
              </span>
              <span class="text-xs font-mono font-bold" :class="excavatedSpoils.appraisalRating === '神话绝品' ? 'text-amber-400' : 'text-cyan-400'">
                鉴定品阶：{{ excavatedSpoils.appraisalRating }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div class="text-[10px] text-gray-400">带回金币 (Gold)</div>
                <div class="text-base font-bold text-amber-400 font-mono mt-0.5">{{ excavatedSpoils.gold.toLocaleString() }} G</div>
                <div class="text-[9px] text-gray-500">含专家倍率加成</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div class="text-[10px] text-gray-400">职业点数 (ABP)</div>
                <div class="text-base font-bold text-cyan-400 font-mono mt-0.5">+{{ excavatedSpoils.ap }} pts</div>
                <div class="text-[9px] text-gray-500">探宝者全员共享</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2">
                <div class="text-[10px] text-gray-400">发掘核心圣物/神兵</div>
                <div class="text-xs font-bold text-emerald-300 truncate mt-1">
                  {{ excavatedSpoils.rareArtifact || '尚未完成勘探，等待开箱' }}
                </div>
                <div class="text-[9px] text-gray-500 truncate mt-0.5">
                  {{ excavatedSpoils.secretNote || '暂无发掘手记' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 实时调度日志控制台 -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400 flex items-center gap-1 font-mono">
                <span>📜</span> 探宝实装调度日志 (Excavation Log):
              </span>
              <span class="text-[10px] text-gray-500 font-mono">{{ excavationLog.length }} 条记录</span>
            </div>
            <div class="bg-black/40 rounded-lg p-2.5 h-36 overflow-y-auto space-y-1 text-xs font-mono scrollbar-thin">
              <div
                v-for="(log, idx) in excavationLog"
                :key="idx"
                class="leading-tight"
                :class="log.includes('🎉') || log.includes('🎁') ? 'text-amber-300' : (log.includes('⚠️') || log.includes('❌') ? 'text-rose-400' : (log.includes('⛏️') ? 'text-cyan-300' : 'text-gray-400'))"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 -->
      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeTreasureGdTab === 'excavator'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeTreasureGdTab = 'excavator'"
            >
              treasure_hunt_excavator.gd
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all"
              :class="activeTreasureGdTab === 'dispatcher'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'"
              @click="activeTreasureGdTab = 'dispatcher'"
            >
              rift_expedition_dispatcher.gd
            </button>
          </div>
          <n-button size="tiny" secondary round type="info" @click="copyTreasureGdCode">
            <template #icon><span>📋</span></template>
            复制代码
          </n-button>
        </div>
        <pre class="bg-black/50 p-3 rounded-lg border border-slate-900 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-48 scrollbar-thin"><code v-if="activeTreasureGdTab === 'excavator'">{{ gdTreasureExcavatorCode }}</code><code v-else>{{ gdRiftDispatcherCode }}</code></pre>
      </div>
    </div>

    <!-- 全域多维度世界探索支线、悬赏委托评级与信赖度演化工坊 (Bounty Rating & Trust Studio v2.2.295) -->
    <div id="bounty-trust-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c142b]/95 via-[#13172e]/95 to-[#0f1422]/95 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] space-y-6">
      <!-- 头部与控制栏 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/40 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">🎖️</span>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-black text-amber-300">
                  全域多维度世界探索支线、悬赏委托评级与信赖度演化工坊
                </h2>
                <n-tag size="tiny" type="warning" round strong>v2.2.295 官方实机矩阵</n-tag>
              </div>
              <p class="text-xs text-gray-400 mt-1">
                对齐 Godot 4.6 LTS 支线与委托调度标准：深度覆盖四大委托流派、四维连续悬赏参数、三大公会特权保障、五阶段委托仿真推演与防伪证书导出
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <n-button size="small" secondary type="warning" @click="resetBountyParameters">
            🔄 重置委托参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="exportBountyCertificate">
            📜 导出公会信赖方案书
          </n-button>
        </div>
      </div>

      <!-- 四大委托公会流派选择卡 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="bounty in bountyArchetypes"
          :key="bounty.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedBountyId === bounty.id
            ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'"
          @click="selectedBountyId = bounty.id"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">{{ bounty.icon }}</span>
            <n-tag :type="selectedBountyId === bounty.id ? 'warning' : 'default'" size="tiny" round>
              {{ bounty.tag }}
            </n-tag>
          </div>
          <div class="text-sm font-bold text-white mb-1">{{ bounty.name }}</div>
          <div class="text-[11px] text-gray-400 leading-relaxed mb-3">{{ bounty.desc }}</div>
          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span class="text-gray-400">核心报酬</span>
            <span class="text-amber-300 font-semibold">{{ bounty.rewardHighlight }}</span>
          </div>
        </div>
      </div>

      <!-- 参数微调滑块与公会特权保障 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- 左侧: 4维连续参数调节 (7 cols) -->
        <div class="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">🎛️ 悬赏委托动态参数调控矩阵</span>
              <span class="text-[11px] text-gray-400 font-mono">4-Axis Bounty Tuning</span>
            </div>
            <button
              type="button"
              class="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              @click="resetBountyParameters"
            >
              重置参数
            </button>
          </div>

          <!-- 滑块 1: 委托难度星级 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>⭐</span> 委托难度星级 (Difficulty Stars)
              </span>
              <span class="font-mono text-amber-400 font-bold">{{ bountyDifficulty }} 星 ({{ getDifficultyRank(bountyDifficulty) }})</span>
            </div>
            <n-slider
              v-model:value="bountyDifficulty"
              :min="1"
              :max="10"
              :step="1"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1 星 (城镇清道)</span>
              <span>5 星 (古地宫精锐)</span>
              <span>10 星 (太古湮灭灭世级)</span>
            </div>
          </div>

          <!-- 滑块 2: 公会信赖声望 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>🤝</span> 公会信赖声望 (Guild Reputation)
              </span>
              <span class="font-mono text-cyan-400 font-bold">{{ guildReputation }} Pt</span>
            </div>
            <n-slider
              v-model:value="guildReputation"
              :min="100"
              :max="5000"
              :step="100"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>100 Pt (初入游侠)</span>
              <span>2500 Pt (受勋骑士)</span>
              <span>5000 Pt (大公会尊主)</span>
            </div>
          </div>

          <!-- 滑块 3: 队伍羁绊共鸣度 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>✨</span> 队伍羁绊共鸣度 (Party Resonance)
              </span>
              <span class="font-mono text-emerald-400 font-bold">{{ partyResonance }}%</span>
            </div>
            <n-slider
              v-model:value="partyResonance"
              :min="50"
              :max="200"
              :step="5"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>50% (散兵协同)</span>
              <span>120% (完美连携)</span>
              <span>200% (光暗双队超极共振)</span>
            </div>
          </div>

          <!-- 滑块 4: 探险报酬溢价系数 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-300 font-medium flex items-center gap-1.5">
                <span>💰</span> 探险报酬溢价系数 (Reward Premium)
              </span>
              <span class="font-mono text-rose-400 font-bold">{{ rewardPremium.toFixed(1) }}x</span>
            </div>
            <n-slider
              v-model:value="rewardPremium"
              :min="1.0"
              :max="4.0"
              :step="0.1"
              :tooltip="false"
            />
            <div class="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1.0x (基准赏金)</span>
              <span>2.5x (高危附加险)</span>
              <span>4.0x (全域特权天价赏金)</span>
            </div>
          </div>
        </div>

        <!-- 右侧: 3大公会特权保障 (5 cols) -->
        <div class="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#111628]/90 border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span class="text-purple-400 font-bold text-sm">🛡️ 公会特权保障与风险断路器</span>
            <n-tag type="info" size="tiny" round>主动安全特权</n-tag>
          </div>

          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>📜</span> 悬赏全额履约保险契约
                </div>
                <div class="text-[11px] text-gray-400">任务失败保全全部物资，并补偿 60% 基础抚恤金</div>
              </div>
              <n-switch v-model:value="bountyInsuranceContract" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🎁</span> 极品报酬双倍锁相环
                </div>
                <div class="text-[11px] text-gray-400">锁定稀有掉落率，必定触发隐藏箱与神兵碎片</div>
              </div>
              <n-switch v-model:value="doubleDropPurityLock" size="small" />
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>📡</span> 超时空紧急呼叫救援信标
                </div>
                <div class="text-[11px] text-gray-400">战局濒危瞬移脱离险境，确保队伍零伤亡保全</div>
              </div>
              <n-switch v-model:value="emergencyDistressBeacon" size="small" />
            </div>
          </div>

          <!-- 稳健度评测雷达 -->
          <div class="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 space-y-2">
            <div class="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>探险综合安全稳健度</span>
              <span class="font-mono text-emerald-400 font-bold">{{ calculatedMissionSafety.toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: Math.min(calculatedMissionSafety, 100) + '%' }"
              ></div>
            </div>
            <div class="text-[10px] text-gray-400 flex justify-between">
              <span>及格线: 70.0%</span>
              <span class="text-emerald-400">团队安全状态: {{ calculatedMissionSafety > 90 ? '坚如磐石' : '稳健可控' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时解算数值仪表盘 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">委托完成期望胜率</div>
          <div class="text-2xl font-black text-emerald-400 font-mono mt-1">{{ calculatedSuccessRate.toFixed(1) }}%</div>
          <div class="text-[10px] text-emerald-300/80 mt-0.5">综合全员战力评测</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">总报酬金币收益</div>
          <div class="text-2xl font-black text-amber-400 font-mono mt-1">{{ calculatedTotalGil.toLocaleString() }} G</div>
          <div class="text-[10px] text-amber-300/80 mt-0.5">含溢价特权倍率</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">公会荣誉功勋积分</div>
          <div class="text-2xl font-black text-cyan-400 font-mono mt-1">+{{ calculatedHonorPts.toLocaleString() }} Pt</div>
          <div class="text-[10px] text-cyan-300/80 mt-0.5">信赖声望飞跃跃迁</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center shadow-lg">
          <div class="text-[11px] text-gray-400">冒险家认证位阶</div>
          <div class="text-2xl font-black text-purple-400 font-mono mt-1">{{ calculatedRankTier }}</div>
          <div class="text-[10px] text-purple-300/80 mt-0.5">公会终身崇高勋位</div>
        </div>
      </div>

      <!-- 五阶段委托派遣推演仿真终端 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-amber-500/30 shadow-2xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-amber-400 font-bold text-sm">⚡ 悬赏委托派遣与信赖演化五阶段推演终端</span>
            <n-tag type="warning" size="tiny" round>Live Expedition Pipeline</n-tag>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-md disabled:opacity-50"
              :disabled="isSimulatingBounty"
              @click="runBountySimulation"
            >
              {{ isSimulatingBounty ? '正在执行委托派遣中...' : '▶ 启动全流程悬赏派遣推演' }}
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 transition-all cursor-pointer"
              @click="exportBountyCertificate"
            >
              📜 导出公会信赖方案书
            </button>
          </div>
        </div>

        <!-- 5 阶段步进进度 -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div
            v-for="(stg, idx) in bountyStages"
            :key="stg.id"
            class="p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between"
            :class="bountySimulationStep >= idx + 1
              ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
              : 'bg-slate-900/60 border-slate-800/80 text-gray-500'"
          >
            <div class="font-bold mb-1 flex items-center gap-1">
              <span>{{ bountySimulationStep >= idx + 1 ? '✅' : '⏳' }}</span>
              <span>第 {{ idx + 1 }} 阶: {{ stg.title }}</span>
            </div>
            <div class="text-[10px] leading-tight opacity-80">{{ stg.desc }}</div>
          </div>
        </div>

        <!-- 推演日志输出视窗 -->
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
          <div v-for="(log, idx) in bountyLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-amber-400 select-none">›</span>
            <span :class="log.color || 'text-gray-300'">{{ log.text }}</span>
          </div>
          <div v-if="bountyLogs.length === 0" class="text-gray-600 italic">
            等待启动推演... 点击上方【启动全流程悬赏派遣推演】按键开始推演。
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 3 Tab 源码展台 -->
      <div class="p-5 sm:p-6 rounded-2xl bg-[#0f1422] border border-slate-800 shadow-xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-bold text-sm">💻 Godot 4.6 LTS 悬赏派遣与信赖状态机源码</span>
            <n-tag type="info" size="tiny" round>RefCounted 核心架构</n-tag>
          </div>
          <div class="flex gap-2">
            <button
              v-for="st in bountyScriptTabs"
              :key="st.key"
              type="button"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border"
              :class="activeBountyScriptTab === st.key
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 text-gray-400 border-slate-800 hover:text-white'"
              @click="activeBountyScriptTab = st.key"
            >
              {{ st.name }}
            </button>
          </div>
        </div>

        <div class="relative">
          <pre class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-96">{{ currentBountyScriptCode }}</pre>
          <button
            type="button"
            class="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-gray-300 border border-slate-700 cursor-pointer transition-colors"
            @click="copyBountyScript"
          >
            📋 复制代码
          </button>
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

        <template #action>
          <div class="flex items-center justify-between pt-1">
            <span class="text-[11px] font-mono text-cyan-300 font-bold">ID: {{ quest.id }}</span>
            <router-link :to="'/vble/sidequests/' + quest.id">
              <n-button size="small" type="warning" round secondary class="shadow-sm">
                <template #icon><span>📜</span></template>
                查看独立侦测详单 →
              </n-button>
            </router-link>
          </div>
        </template>
      </n-card>
    </div>

    <!-- 无结果兜底 -->
    <div v-else class="text-center py-12 bg-[#121626]/60 border border-slate-800 rounded-xl space-y-2">
      <span class="text-3xl block">🔍</span>
      <p class="text-gray-300 font-bold">暂无匹配的支线探索资料</p>
      <p class="text-xs text-gray-500">可尝试重置分类筛选或清除搜索关键词</p>
      <n-button size="small" type="primary" secondary @click="resetSearch">重置筛选</n-button>
    </div>

    <!-- 跨纪元支线剧情任务链、NPC羁绊交互与遗迹宝箱工坊 (v2.2.324 重磅实装) -->
    <div id="epoch-sidequest-chain-studio" class="epoch-sidequest-chain-studio p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-amber-950/20 to-slate-900/95 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              CROSS-EPOCH CHAINS & RELIC VAULT MATRIX
            </span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              v2.2.324 旗舰实装
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>📜</span> 跨纪元支线剧情任务链、NPC羁绊交互与遗迹宝箱工坊
          </h2>
          <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl">
            提供太古学者千年纪行、遗落王女宿命寻踪、铁匠世家神兵重铸与虚空商人契约，支持因果律分支无悔重选、飞空艇常驻与 Godot 4.6 LTS 底层任务编排引擎。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <n-button size="small" round secondary type="warning" @click="resetEpochQuestDefaults">
            <template #icon><span>↺</span></template>
            重置参数
          </n-button>
          <n-button size="small" round type="warning" :loading="isEpochQuestSimulating" @click="runEpochQuestSimulation">
            <template #icon><span>⚡</span></template>
            启动任务链推演
          </n-button>
          <n-button size="small" round secondary type="info" @click="exportEpochQuestCert">
            <template #icon><span>📜</span></template>
            导出方案证书
          </n-button>
        </div>
      </div>

      <!-- 四大跨纪元支线原型 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="archetype in epochQuestArchetypes"
          :key="archetype.id"
          class="p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden"
          :class="selectedEpochQuestArchetype === archetype.id ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'"
          @click="selectEpochQuestArchetype(archetype.id)"
        >
          <div class="flex items-start justify-between">
            <div class="text-2xl">{{ archetype.icon }}</div>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold" :class="archetype.tagClass">
              {{ archetype.typeTag }}
            </span>
          </div>
          <h3 class="font-bold text-white text-base mt-2">{{ archetype.name }}</h3>
          <p class="text-xs text-amber-300/80 mt-1">{{ archetype.desc }}</p>
          <div class="mt-3 pt-2 border-t border-slate-800 text-[11px] space-y-1 text-gray-400">
            <div class="flex justify-between">
              <span>专属继承奖励:</span>
              <span class="text-emerald-300 font-mono">{{ archetype.inheritanceReward }}</span>
            </div>
            <div class="flex justify-between">
              <span>时代因果跨度:</span>
              <span class="text-cyan-300 font-mono">{{ archetype.epochSpan }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 四维支线进度与羁绊调控滑块 -->
      <div class="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div class="text-sm font-bold text-white flex items-center justify-between">
          <span class="flex items-center gap-2"><span>🎛️</span> 任务链因果律与好感度参数调优</span>
          <span class="text-xs text-amber-400 font-mono">Realtime Quest Causality Matrix</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">跨纪元剧情任务链深度 (阶段):</span>
              <span class="text-amber-400 font-mono font-bold">第 {{ epochChainDepthStages }} 阶段 (宿命演进)</span>
            </div>
            <n-slider v-model:value="epochChainDepthStages" :min="1" :max="7" :step="1" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1 阶段 初识</span>
              <span>4 阶段 宿命转折</span>
              <span>7 阶段 终焉大团圆</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">NPC 羁绊交互默契度 (点数):</span>
              <span class="text-cyan-400 font-mono font-bold">{{ epochNpcAffinityPoints }} 点 (深情共鸣)</span>
            </div>
            <n-slider v-model:value="epochNpcAffinityPoints" :min="100" :max="1000" :step="50" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>100 点 泛泛之交</span>
              <span>500 点 患难与共</span>
              <span>1000 点 永恒羁绊</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">遗迹密室宝箱品质因数 (x):</span>
              <span class="text-purple-400 font-mono font-bold">{{ epochVaultQualityFactor.toFixed(1) }}x (太古秘宝)</span>
            </div>
            <n-slider v-model:value="epochVaultQualityFactor" :min="1.0" :max="5.0" :step="0.2" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>1.0x 普品</span>
              <span>3.0x 圣堂宝藏</span>
              <span>5.0x 诸神秘库</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-300">跨时代分支抉择纠缠度 (%):</span>
              <span class="text-emerald-400 font-mono font-bold">{{ epochBranchEntanglementPct }}% (蝴蝶效应)</span>
            </div>
            <n-slider v-model:value="epochBranchEntanglementPct" :min="10" :max="100" :step="5" />
            <div class="flex justify-between text-[10px] text-gray-500">
              <span>10% 轻微扰动</span>
              <span>50% 显著改变</span>
              <span>100% 彻底改写因果</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 三大跨纪元支线特权开关 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">跨时空因果律分支无悔重选</div>
            <div class="text-[10px] text-gray-400 mt-0.5">随时重构关键决策且保留全成就</div>
          </div>
          <n-switch v-model:value="enableCausalityBranchFreeRewind" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">NPC 满羁绊驻留飞空艇工坊</div>
            <div class="text-[10px] text-gray-400 mt-0.5">提供专属随舰强化与额外日常福利</div>
          </div>
          <n-switch v-model:value="enableNpcAboardAirshipPact" size="small" />
        </div>

        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">遗迹宝箱 100% 防空箱与双倍掉落</div>
            <div class="text-[10px] text-gray-400 mt-0.5">杜绝空箱陷阱，保底稀有装备</div>
          </div>
          <n-switch v-model:value="enableGuaranteedRelicDoubleLoot" size="small" />
        </div>
      </div>

      <!-- 关键实时指标卡片 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">任务链完成度预期加成</div>
          <div class="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            +{{ epochCompletionBonusPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">全局剧情探索收益</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">NPC 羁绊回馈收益效率</div>
          <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
            {{ epochAffinityEfficiencyPct }}%
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">随舰好感度转换率</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">遗迹稀世珍宝期望估值</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
            {{ epochVaultExpectedGil.toLocaleString() }} G
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">含双倍防空箱加权</div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div class="text-[11px] text-gray-400">传奇冒险家认证评级</div>
          <div class="text-sm sm:text-base font-black text-purple-400 font-mono mt-1 truncate">
            {{ epochQuestTierBadge }}
          </div>
          <div class="text-[10px] text-gray-500 mt-0.5">跨纪元因果链规范</div>
        </div>
      </div>

      <!-- 沙盘推演日志与进度 -->
      <div v-if="isEpochQuestSimulating || epochQuestLogs.length > 0" class="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300 font-bold flex items-center gap-2">
            <span>🔄</span> 跨纪元剧情与羁绊沙盘进程: {{ epochQuestSimStep }}
          </span>
          <span class="text-amber-400 font-mono font-bold">{{ epochQuestSimProgress }}%</span>
        </div>
        <n-progress
          type="line"
          :percentage="epochQuestSimProgress"
          :indicator-placement="'inside'"
          processing
          status="warning"
        />
        <div class="max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-gray-400 pt-2 border-t border-slate-900">
          <div v-for="(log, idx) in epochQuestLogs" :key="idx" class="flex items-start gap-2">
            <span class="text-amber-500">›</span>
            <span :class="idx === epochQuestLogs.length - 1 ? 'text-amber-300 font-bold' : 'text-gray-400'">{{ log }}</span>
          </div>
        </div>
      </div>

      <!-- Godot 4.6 LTS 源码展台 (3 Tabs) -->
      <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">GODOT 4.6 LTS</span>
            <h3 class="text-sm font-bold text-white">跨纪元剧情任务链与好感度决策引擎源码展台</h3>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeEpochQuestScriptTab === 'director' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeEpochQuestScriptTab = 'director'"
              >
                任务链编排器
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeEpochQuestScriptTab === 'dialogue' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeEpochQuestScriptTab = 'dialogue'"
              >
                羁绊决策对白树
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                :class="activeEpochQuestScriptTab === 'loot_matrix' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'"
                @click="activeEpochQuestScriptTab = 'loot_matrix'"
              >
                遗迹宝箱防空矩阵
              </button>
            </div>
            <n-button size="small" round secondary type="warning" @click="copyEpochQuestScript">
              <template #icon><span>📋</span></template>
              复制代码
            </n-button>
          </div>
        </div>
        <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed max-h-[460px]">{{ currentEpochQuestScriptCode }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'

const message = useMessage()
const gameStore = useGameStore()
const sidequests = computed(() => gameStore.db.sidequests || [])

const scrollToBountyTrustStudio = () => {
  const el = document.getElementById('bounty-trust-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTreasureStudio = () => {
  const el = document.getElementById('treasure-hunt-studio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

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

// ================= 酒馆 S 级【死亡之眼】绝密悬赏令与十二前置契约工坊 (tavern_bounty_s_save.gd) =================
const bountySHasClearStar = ref(true)
const bountySClearCount = ref(1)

const bountySPrereqs = ref<Record<string, boolean>>({
  bounty_d_bee_accepted: true,
  bounty_d_bee_defeated: true,
  bounty_d_bee_claimed: true,
  bounty_c_scorpion_accepted: true,
  bounty_c_scorpion_defeated: true,
  bounty_c_scorpion_delivered: true,
  bounty_b_zombie_dragon_accepted: true,
  bounty_b_zombie_dragon_defeated: true,
  bounty_b_zombie_dragon_delivered: true,
  bounty_a_king_chimera_accepted: true,
  bounty_a_king_chimera_defeated: true,
  bounty_a_king_chimera_delivered: true
})

const completedPrereqCount = computed(() => {
  return Object.values(bountySPrereqs.value).filter(Boolean).length
})

const isAllPrereqMet = computed(() => {
  return completedPrereqCount.value === 12
})

const isBountySEligible = computed(() => {
  // 必须满足: 通关星标 + clear_count >= 1 + 12项前置全部达成
  return bountySHasClearStar.value && bountySClearCount.value >= 1 && isAllPrereqMet.value
})

const bountySAccepted = ref(false)
const bountySDefeated = ref(false)
const bountySDelivered = ref(false)

const bountySLog = ref<string[]>([
  '系统就绪: tavern_bounty_s_save.gd 契约规则载入完成',
  '契约守卫: 十二项DCBA前置严格链式依赖，未通关者酒馆暗格不予揭榜'
])

const setAllPrerequisites = (val: boolean) => {
  for (const k of Object.keys(bountySPrereqs.value)) {
    bountySPrereqs.value[k] = val
  }
  bountySLog.value.unshift(`🔧 操作: 十二前置旗标已全部设为 ${val ? 'true (达成)' : 'false (清空)'}。`)
  if (bountySLog.value.length > 6) bountySLog.value.pop()
}

const acceptBountyS = () => {
  if (!isBountySEligible.value) {
    bountySLog.value.unshift('❌ 揭榜失败：缺少通关星标凭证或十二项前置悬赏尚未全数结清！')
    if (bountySLog.value.length > 6) bountySLog.value.pop()
    return
  }
  bountySAccepted.value = true
  bountySLog.value.unshift('📜 揭榜成功！酒馆密探递交绝密卷轴：bounty_s_death_eye_accepted = true，前往深渊裂隙讨伐【死亡之眼】！')
  if (bountySLog.value.length > 6) bountySLog.value.pop()
}

const defeatBountyS = () => {
  if (!bountySAccepted.value) {
    bountySLog.value.unshift('⚠️ 无法讨伐：尚未揭榜接取任务 (bounty_s_death_eye_accepted == false)，不可跨步执行！')
    if (bountySLog.value.length > 6) bountySLog.value.pop()
    return
  }
  bountySDefeated.value = true
  bountySLog.value.unshift('💀 激战告捷！深渊裂隙首领【死亡之眼】已被成功讨伐！bounty_s_death_eye_defeated = true。')
  if (bountySLog.value.length > 6) bountySLog.value.pop()
}

const deliverBountyS = () => {
  if (!bountySDefeated.value) {
    bountySLog.value.unshift('⚠️ 无法交付：首领尚未被击败，请先完成讨伐！')
    if (bountySLog.value.length > 6) bountySLog.value.pop()
    return
  }
  bountySDelivered.value = true
  bountySLog.value.unshift('👑 任务圆满交割！bounty_s_death_eye_delivered = true，获得 50000G、特级称号与永恒荣耀勋章！')
  if (bountySLog.value.length > 6) bountySLog.value.pop()
}

const resetBountySStudio = () => {
  bountySHasClearStar.value = true
  bountySClearCount.value = 1
  setAllPrerequisites(true)
  bountySAccepted.value = false
  bountySDefeated.value = false
  bountySDelivered.value = false
  bountySLog.value = [
    '重置完成: S级悬赏演练台回到初始状态',
    '默认状态: 拥有通关星标，十二前置已达成，等待玩家揭榜'
  ]
}

// ================= 🌌 世界时空裂隙委托派遣与远古神兵封印解禁工坊 (rift_expedition_dispatcher.gd / legendary_seal_breaker.gd) =================
interface RiftDestination {
  id: string
  name: string
  icon: string
  danger: 'low' | 'medium' | 'high' | 'deadly'
  dangerTag: 'success' | 'info' | 'warning' | 'error'
  durationDesc: string
  baseReward: string
  desc: string
}

const riftDestinations: RiftDestination[] = [
  {
    id: 'desert_ruins',
    name: '蜃气楼沙漠流沙塔',
    icon: '🏜️',
    danger: 'low',
    dangerTag: 'success',
    durationDesc: '常规 15 分钟',
    baseReward: '古代金币 ×3500 + 拟态矿石',
    desc: '穿越随风飘移的蜃气楼沙漠流沙层，搜寻沉睡在流沙漏斗下层的遗迹宝箱。'
  },
  {
    id: 'illusion_forest',
    name: '幻影森林与次元大瀑布',
    icon: '🌲',
    danger: 'medium',
    dangerTag: 'info',
    durationDesc: '深入 30 分钟',
    baseReward: '深渊魔草 ×5 + 幻影布料',
    desc: '水声轰鸣的幻觉之森，常年被浓稠以太迷雾笼罩，藏匿有古代隐士的失落卷轴。'
  },
  {
    id: 'omega_factory',
    name: '机械废都欧米茄兵工厂',
    icon: '⚙️',
    danger: 'high',
    dangerTag: 'warning',
    durationDesc: '高危 45 分钟',
    baseReward: '钛合金装甲板 + 纳米核心',
    desc: '古代灭绝兵器的废弃量产线，警备自律机甲依旧在巡逻，潜伏致命雷光陷阱。'
  },
  {
    id: 'void_nexus',
    name: '虚无核心裂隙中枢',
    icon: '🌌',
    danger: 'deadly',
    dangerTag: 'error',
    durationDesc: '绝厄 60 分钟',
    baseReward: '神兵解禁以太之核 + 圣光露珠',
    desc: '多元宇宙秩序崩塌的暴风眼，时空碎片在此撕裂，仅有顶尖传奇小队方可生还。'
  }
]

const selectedRiftDestId = ref('desert_ruins')
const expeditionLeader = ref<'knight' | 'thief' | 'mage' | 'summoner'>('thief')
const expeditionSupply = ref<'rations' | 'compass' | 'elixir'>('compass')
const expeditionState = ref<'idle' | 'exploring' | 'completed'>('idle')
const expeditionProgress = ref(0)
const expeditionLog = ref<string[]>([
  '时空裂隙派遣看板就绪：请指派队长职能与探索补给后启动派遣。',
  '底层调度契约: rift_expedition_dispatcher.gd 状态就绪。'
])

const leaderOptions = [
  { label: '🛡️ 圣骑士 (遭遇强敌生还率 +25%)', value: 'knight' },
  { label: '🖐️ 盗贼大盗 (宝箱额外掉落率 +30%)', value: 'thief' },
  { label: '🧙 黑魔道士 (清除环境障壁速度 +20%)', value: 'mage' },
  { label: '✨ 召唤士 (免疫次元乱流与环境灼伤)', value: 'summoner' }
]

const supplyOptions = [
  { label: '🧭 探宝罗盘 (探险速度加倍)', value: 'compass' },
  { label: '⛺ 时空帐篷 (全队损耗降低 50%)', value: 'rations' },
  { label: '🧪 圣灵药水套组 (容错率极高，防止减员)', value: 'elixir' }
]

let expeditionInterval: ReturnType<typeof setInterval> | null = null

const startExpedition = () => {
  expeditionState.value = 'exploring'
  expeditionProgress.value = 0
  const dest = riftDestinations.find(d => d.id === selectedRiftDestId.value)!
  expeditionLog.value.unshift(`🚀 小队从主基地出发，向【${dest.name}】进发！`)
  riftAuditLog.value = `[时空派遣启动] 探险小队已进入裂隙网络: ${dest.id} (rift_expedition_dispatcher.gd)`
  if (expeditionInterval) clearInterval(expeditionInterval)
  expeditionInterval = setInterval(() => {
    if (expeditionProgress.value < 100) {
      expeditionProgress.value = Math.min(100, expeditionProgress.value + 20)
      if (expeditionProgress.value === 40) {
        expeditionLog.value.unshift(`⚠️ 小队在【${dest.name}】遭遇时空乱流，队长特技成功化解！`)
      } else if (expeditionProgress.value === 80) {
        expeditionLog.value.unshift(`💎 侦测到远古密室宝箱反应，正在全力破解力场障壁...`)
      } else if (expeditionProgress.value === 100) {
        if (expeditionInterval) clearInterval(expeditionInterval)
        expeditionState.value = 'completed'
        expeditionLog.value.unshift(`👑 探险小队圆满凯旋！获得基础战利品: ${dest.baseReward}！`)
        riftAuditLog.value = `[时空派遣圆满] 小队归来，发放结算战利品: ${dest.baseReward}`
      }
    }
  }, 1000)
}

const fastForwardExpedition = () => {
  if (expeditionInterval) clearInterval(expeditionInterval)
  expeditionProgress.value = 100
  expeditionState.value = 'completed'
  const dest = riftDestinations.find(d => d.id === selectedRiftDestId.value)!
  expeditionLog.value.unshift(`⚡ [即刻推演] 小队完成探索，成功带回: ${dest.baseReward}！`)
  riftAuditLog.value = `[即刻完成] 时空派遣极速演算完成: ${dest.id}`
}

const cancelExpedition = () => {
  if (expeditionInterval) clearInterval(expeditionInterval)
  expeditionState.value = 'idle'
  expeditionProgress.value = 0
  expeditionLog.value.unshift(`🛑 探险队已被紧急召回，未带回探索战利品。`)
  riftAuditLog.value = `[时空派遣召回] 小队已返航。`
}

// 远古神兵封印解禁器
interface LegendaryWeaponItem {
  id: string
  tabletIndex: number
  name: string
  type: string
  icon: string
  effect: string
  unlocked: boolean
}

const ancientTabletsFound = ref<number>(3) // 0~4
const legendaryWeapons = ref<LegendaryWeaponItem[]>([
  { id: 'excalibur', tabletIndex: 1, name: '王者之剑 (Excalibur)', type: '骑士圣剑', icon: '⚔️', effect: '圣属性攻击 + 常驻力量强化，对亡灵与魔族特攻', unlocked: true },
  { id: 'sage_staff', tabletIndex: 1, name: '贤者之杖 (Sage\'s Staff)', type: '白魔法杖', icon: '🪄', effect: '使用可触发免费【全回复】，圣系魔法威力 1.5x', unlocked: true },
  { id: 'masamune', tabletIndex: 1, name: '正宗 (Masamune)', type: '武士刀', icon: '🗡️', effect: '战斗开局必定首位行动（ATB常驻满溢），物理高爆率', unlocked: true },

  { id: 'sasuke_katana', tabletIndex: 2, name: '佐助之刀 (Sasuke)', type: '忍者短刃', icon: '🗡️', effect: '高回避率加成，速度+10，双持连击触发率倍增', unlocked: true },
  { id: 'holy_lance', tabletIndex: 2, name: '神圣之枪 (Holy Lance)', type: '龙骑士长枪', icon: '🔱', effect: '跳跃落地命中率 100%，附带圣光穿透与破甲', unlocked: true },
  { id: 'rune_axe', tabletIndex: 2, name: '毁灭之斧 (Rune Axe)', type: '狂战符文巨斧', icon: '🪓', effect: '消耗少量 MP 换取 100% 暴击斩击，物理贯通护甲', unlocked: true },

  { id: 'magus_rod', tabletIndex: 3, name: '魔道士之杖 (Magus Rod)', type: '黑魔法杖', icon: '🪄', effect: '火/冰/雷三系禁咒伤害全面增幅 50%', unlocked: true },
  { id: 'assassin_dagger', tabletIndex: 3, name: '刺客匕首 (Assassin)', type: '盗贼匕首', icon: '🗡️', effect: '近战命中 25% 几率触发【即死断罪】一击必杀', unlocked: true },
  { id: 'apollo_harp', tabletIndex: 3, name: '阿波罗之竖琴 (Apollo)', type: '吟游乐器', icon: '🪕', effect: '对龙系与不死魔物造成 8.0x 毁灭级以太音波共振', unlocked: true },

  { id: 'dragon_whisker', tabletIndex: 4, name: '龙之髭 (Dragon Whisker)', type: '魔兽使硬鞭', icon: '➰', effect: '对龙族造成极巨伤害，攻击附带 100% 麻痹拘束', unlocked: false },
  { id: 'murasame', tabletIndex: 4, name: '妖刀村雨 (Murasame)', type: '武士妖刀', icon: '🗡️', effect: '暴击率极高，使用可施放【白魔法全愈】，保命神器', unlocked: false },
  { id: 'gaia_bell', tabletIndex: 4, name: '大地之铃 (Gaia Bell)', type: '风水师圣铃', icon: '🔔', effect: '大地属性攻击，引发【地震】与【泰坦天崩】震击', unlocked: false }
])

const totalSealQuota = computed(() => ancientTabletsFound.value * 3)
const unlockedWeaponsCount = computed(() => legendaryWeapons.value.filter(w => w.unlocked).length)
const remainingSealQuota = computed(() => Math.max(0, totalSealQuota.value - unlockedWeaponsCount.value))

const sealBreakerLog = ref<string>('已就绪：点击神兵卡片可消耗石板额度解开远古封印。')
const riftAuditLog = ref<string>('时空裂隙探险看板与远古神兵金字塔已同步至最新世界合流纪元。')

const toggleWeaponUnlock = (weapon: LegendaryWeaponItem) => {
  if (weapon.unlocked) {
    weapon.unlocked = false
    sealBreakerLog.value = `🔒 重新封印：【${weapon.name}】神力归位，返还 1 点解禁额度。`
    riftAuditLog.value = `[神兵封印归位] 重新封存印记: ${weapon.id} (legendary_seal_breaker.gd)`
  } else {
    if (remainingSealQuota.value <= 0) {
      sealBreakerLog.value = `⚠️ 解禁额度已用罄！请在金字塔中收集更多远古石板（当前额度 ${totalSealQuota.value} 件）。`
      return
    }
    weapon.unlocked = true
    sealBreakerLog.value = `✨ 远古神圣符文破裂！【${weapon.name}】成功解开封印！剩余额度: ${remainingSealQuota.value} 点。`
    riftAuditLog.value = `[神兵封印解禁] 触发解除印记: ${weapon.id} (legendary_seal_breaker.gd)`
  }
}

const unlockAllAffordable = () => {
  let quota = remainingSealQuota.value
  for (const w of legendaryWeapons.value) {
    if (quota <= 0) break
    if (!w.unlocked) {
      w.unlocked = true
      quota--
    }
  }
  sealBreakerLog.value = `✨ 已一键配满当前石板赋予的全部神兵解禁名额！`
}

const resetRiftStudio = () => {
  cancelExpedition()
  selectedRiftDestId.value = 'desert_ruins'
  expeditionLeader.value = 'thief'
  expeditionSupply.value = 'compass'
  ancientTabletsFound.value = 3
  legendaryWeapons.value.forEach((w, idx) => {
    w.unlocked = idx < 9
  })
  sealBreakerLog.value = '已就绪：点击神兵卡片可消耗石板额度解开远古封印。'
  riftAuditLog.value = '已重置工坊状态至标准测试环境。'
  expeditionLog.value = [
    '时空裂隙派遣看板就绪：请指派队长职能与探索补给后启动派遣。',
    '底层调度契约: rift_expedition_dispatcher.gd 状态就绪。'
  ]
}

// ================= SQ-14 全域时空寻宝与隐秘藏宝库推演沙盘 =================
interface TreasureSite {
  id: string
  name: string
  icon: string
  region: string
  dangerTier: string
  dangerColor: 'warning' | 'error' | 'info' | 'success'
  signatureItem: string
  signatureDesc: string
  goldMin: number
  goldMax: number
  apReward: number
}

const treasureSites: TreasureSite[] = [
  {
    id: 'sunken_galleon',
    name: '孤岛沉船幽灵宝库',
    icon: '🏴‍☠️',
    region: '外海海沟 · 幽灵船残骸 (240, 960)',
    dangerTier: 'Tier IV · 凶险幽灵海域',
    dangerColor: 'error',
    signatureItem: '诸神之黄昏 (Ragnarok) · 圣剑',
    signatureDesc: '传世九阶光系圣剑，物理击中几率瞬发核爆术',
    goldMin: 12000,
    goldMax: 35000,
    apReward: 45
  },
  {
    id: 'mirage_bazaar',
    name: '蜃气楼古塔隐秘商铺',
    icon: '🏰',
    region: '迷失沙漠 · 蜃气楼高塔顶层 (1440, 320)',
    dangerTier: 'Tier III · 空间镜像迷宫',
    dangerColor: 'warning',
    signatureItem: '星界缎带真品 (True Ribbon)',
    signatureDesc: '免疫九阶负面状态，附带全属性减伤 10%',
    goldMin: 8500,
    goldMax: 22000,
    apReward: 30
  },
  {
    id: 'dragons_neck_arena',
    name: '龙之颈竞技场地下金库',
    icon: '🐲',
    region: '北大陆 · 龙之颈决斗裂谷 (820, 1140)',
    dangerTier: 'Tier V · 绝境魔兽试炼',
    dangerColor: 'error',
    signatureItem: '龙之髭神鞭 (Dragon Whisker)',
    signatureDesc: '对龙系生物造成 400% 暴击斩击并必定麻痹',
    goldMin: 20000,
    goldMax: 50000,
    apReward: 60
  },
  {
    id: 'submarine_abyssal_shrine',
    name: '远古海底沉眠神殿',
    icon: '🔱',
    region: '大洋极深海底 · 始源以太回廊 (512, 1720)',
    dangerTier: 'Tier V · 虚空暗流漩涡',
    dangerColor: 'error',
    signatureItem: '创世神枪瓦尔哈拉 (Valhalla Lance)',
    signatureDesc: '龙骑士究极长枪，空中跳跃落地无视防御',
    goldMin: 25000,
    goldMax: 65000,
    apReward: 75
  }
]

const seekerRoleOptions = [
  { value: 'thief_master', label: '🗡️ 盗贼大师 (开锁爆率+40% / 陷阱免伤)' },
  { value: 'time_archmage', label: '⏳ 时空魔导士 (加速时滞 / 发掘耗时-50%)' },
  { value: 'minstrel_bard', label: '🪕 吟游大诗人 (安抚古龙 / 宝藏品质提升)' },
  { value: 'beast_tamer', label: '🦁 驯兽魔兽使 (巨兽破壁 / 地质机关秒破)' }
]

const loadoutToolOptions = [
  { value: 'master_key', label: '🔑 万能盗贼秘钥 (必开S级封印箱)' },
  { value: 'divine_lens', label: '🔍 始源真理透镜 (暗室发现率+35%)' },
  { value: 'levitate_ward', label: '🪶 浮空羽翼避雷符 (免疫地刺落穴)' },
  { value: 'aether_lodestone', label: '🧭 以太寻龙罗盘 (爆金币翻倍)' }
]

const selectedSiteId = ref('sunken_galleon')
const selectedSeekerId = ref('thief_master')
const selectedToolId = ref('master_key')
const excavationDepth = ref(3)
const guardTactic = ref<'stealth' | 'combat' | 'charm' | 'bribe'>('stealth')

const excavationState = ref<'idle' | 'excavating' | 'completed'>('idle')
const excavationProgress = ref(0)
let excavationTimer: ReturnType<typeof setInterval> | null = null

const activeSite = computed(() => {
  return treasureSites.find(s => s.id === selectedSiteId.value) || treasureSites[0]
})

const excavationPhaseNames = ['定位', '破界', '避险', '开箱', '撤离']

const currentExcavationPhaseTitle = computed(() => {
  if (excavationProgress.value >= 100) return '全速撤离凯旋'
  if (excavationProgress.value >= 80) return '主墓室主宝箱破锁'
  if (excavationProgress.value >= 60) return '解除深渊暗刺陷阱'
  if (excavationProgress.value >= 40) return '解构外层古代结界'
  if (excavationProgress.value >= 20) return '地脉以太共鸣定位'
  return '先锋整装待发'
})

const excavationLog = ref<string[]>([
  '时空寻宝探秘沙盘就绪：选定秘境标的与先锋专家后，点击【启动时空密境发掘】即可执行。',
  '底层调度引擎: treasure_hunt_excavator.gd 已完成动态加载。'
])

const excavatedSpoils = ref<{
  gold: number
  ap: number
  rareArtifact: string
  secretNote: string
  appraisalRating: string
}>({
  gold: 0,
  ap: 0,
  rareArtifact: '',
  secretNote: '',
  appraisalRating: '待勘探'
})

const activeTreasureGdTab = ref<'excavator' | 'dispatcher'>('excavator')

const applyTreasurePreset = (siteId: string) => {
  if (siteId === 'sunken_galleon') {
    selectedSiteId.value = 'sunken_galleon'
    selectedSeekerId.value = 'thief_master'
    selectedToolId.value = 'master_key'
    excavationDepth.value = 4
    guardTactic.value = 'stealth'
    message.success('已装载预设：孤岛沉船幽灵宝库 (诸神之黄昏)')
  } else if (siteId === 'mirage_bazaar') {
    selectedSiteId.value = 'mirage_bazaar'
    selectedSeekerId.value = 'time_archmage'
    selectedToolId.value = 'divine_lens'
    excavationDepth.value = 3
    guardTactic.value = 'bribe'
    message.info('已装载预设：蜃气楼古塔暗铺 (星界缎带真品)')
  } else if (siteId === 'dragons_neck_arena') {
    selectedSiteId.value = 'dragons_neck_arena'
    selectedSeekerId.value = 'minstrel_bard'
    selectedToolId.value = 'levitate_ward'
    excavationDepth.value = 5
    guardTactic.value = 'charm'
    message.warning('已装载预设：龙之颈决斗裂谷 (龙之髭硬鞭)')
  } else if (siteId === 'submarine_abyssal_shrine') {
    selectedSiteId.value = 'submarine_abyssal_shrine'
    selectedSeekerId.value = 'beast_tamer'
    selectedToolId.value = 'aether_lodestone'
    excavationDepth.value = 5
    guardTactic.value = 'combat'
    message.success('已装载预设：远古海底神殿 (创世神枪瓦尔哈拉)')
  }
}

const evaluateDrops = () => {
  const site = activeSite.value
  let mult = 1.0 + (excavationDepth.value - 1) * 0.25
  if (selectedSeekerId.value === 'thief_master') mult += 0.35
  if (selectedToolId.value === 'aether_lodestone') mult += 0.50

  const gold = Math.round((site.goldMin + Math.random() * (site.goldMax - site.goldMin)) * mult)
  const ap = Math.round(site.apReward * mult)

  excavatedSpoils.value = {
    gold,
    ap,
    rareArtifact: site.signatureItem,
    secretNote: site.signatureDesc,
    appraisalRating: excavationDepth.value >= 4 ? '神话绝品' : (excavationDepth.value >= 3 ? '太古传奇' : '精良秘宝')
  }

  excavationLog.value.unshift(`🎉 [发掘达成] 满载归航！带回金币 ${gold.toLocaleString()} G，ABP +${ap}，获赠【${site.signatureItem}】！`)
  if (excavationLog.value.length > 20) excavationLog.value.pop()
}

const startExcavation = () => {
  if (excavationTimer) clearInterval(excavationTimer)
  excavationState.value = 'excavating'
  excavationProgress.value = 0
  const site = activeSite.value
  excavationLog.value.unshift(`⛏️ [启航发掘] 探险队潜入【${site.name}】地下第 ${excavationDepth.value} 层，展开地脉共鸣定位...`)

  excavationTimer = setInterval(() => {
    if (excavationProgress.value < 100) {
      excavationProgress.value += 10
      if (excavationProgress.value === 20) {
        excavationLog.value.unshift(`📡 [阶段 1/5] 地脉以太共鸣锁定主墓室坐标，避开外部崩塌暗流。`)
      } else if (excavationProgress.value === 40) {
        excavationLog.value.unshift(`✨ [阶段 2/5] 探险专家成功解构古代符文结界，石门缓缓升起！`)
      } else if (excavationProgress.value === 60) {
        excavationLog.value.unshift(`🛡️ [阶段 3/5] 触发应对策【${guardTactic.value}】，深渊守卫被成功压制/避开！`)
      } else if (excavationProgress.value === 80) {
        excavationLog.value.unshift(`🗝️ [阶段 4/5] 万能工具破开核心主宝箱九重密码锁，金光溢满墓室！`)
      } else if (excavationProgress.value >= 100) {
        clearInterval(excavationTimer!)
        excavationProgress.value = 100
        excavationState.value = 'completed'
        evaluateDrops()
      }
    }
  }, 350)
}

const fastForwardExcavation = () => {
  if (excavationTimer) clearInterval(excavationTimer)
  excavationProgress.value = 100
  excavationState.value = 'completed'
  evaluateDrops()
  excavationLog.value.unshift(`⚡ [极速演算] 时空跳跃推进完成，全额战利品已入库！`)
}

const cancelExcavation = () => {
  if (excavationTimer) clearInterval(excavationTimer)
  excavationState.value = 'idle'
  excavationProgress.value = 0
  excavationLog.value.unshift(`🛑 [紧急撤回] 探险队收到领空紧急召回信号，已安全返航，未取走战利品。`)
  message.warning('探险队已安全召回')
}

const resetTreasureStudio = () => {
  cancelExcavation()
  selectedSiteId.value = 'sunken_galleon'
  selectedSeekerId.value = 'thief_master'
  selectedToolId.value = 'master_key'
  excavationDepth.value = 3
  guardTactic.value = 'stealth'
  excavatedSpoils.value = {
    gold: 0,
    ap: 0,
    rareArtifact: '',
    secretNote: '',
    appraisalRating: '待勘探'
  }
  excavationLog.value = [
    '时空寻宝探秘沙盘就绪：选定秘境标的与先锋专家后，点击【启动时空密境发掘】即可执行。',
    '底层调度引擎: treasure_hunt_excavator.gd 已完成动态加载。'
  ]
  message.info('已重置寻宝勘探沙盘至初始状态')
}

const exportTreasureHuntCert = () => {
  const site = activeSite.value
  const ts = new Date().toISOString()
  const certId = `CERT-TREASURE-${Date.now().toString(36).toUpperCase()}`
  const content = `================================================================================
《光之战士：时空裂隙》(VBLE) 支线时空寻宝与隐秘藏宝库勘探认证凭证
================================================================================
凭证编号: ${certId}
时间截记: ${ts}
推演版本: VBLE Sidequests & Secrets Matrix v2.2.254
引擎规范: Godot 4.6 LTS Treasure Hunt & Vault Excavation Architecture

【探宝任务核心配置】
- 发掘目标秘境: ${site.name} (${site.id})
- 所处地理坐标: ${site.region}
- 危险层级评估: ${site.dangerTier}
- 领衔专家职能: ${selectedSeekerId.value}
- 随身配备圣器: ${selectedToolId.value}
- 纵深发掘层级: 地下第 ${excavationDepth.value} 层 (共 5 层)
- 守卫应对策略: ${guardTactic.value}

【战利品与实物发掘成果】
- 搜获金币总量: ${excavatedSpoils.value.gold.toLocaleString()} G
- 职业熟练点数: +${excavatedSpoils.value.ap} ABP
- 核心镇殿神兵: ${excavatedSpoils.value.rareArtifact || site.signatureItem}
- 宝物鉴定品阶: ${excavatedSpoils.value.appraisalRating}
- 秘宝传承手记: ${site.signatureDesc}

================================================================================
数字防伪哈希: SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}
================================================================================`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sidequest_treasure_hunt_${site.id}_v2.2.254.txt`
  a.click()
  URL.revokeObjectURL(url)
  message.success(`已导出寻宝勘探凭证: ${site.name}`)
}

const copyTreasureHuntChain = () => {
  const chainText = `[寻宝勘探链] 秘境:${activeSite.value.name} | 深度:${excavationDepth.value}F | 专家:${selectedSeekerId.value} | 圣器:${selectedToolId.value} | 策略:${guardTactic.value} => 神兵:${activeSite.value.signatureItem}`
  navigator.clipboard.writeText(chainText).then(() => {
    message.success('寻宝勘探链已复制到剪贴板！')
  }).catch(() => {
    message.info('寻宝勘探链已复制')
  })
}

const gdTreasureExcavatorCode = `# ==============================================================================
# TreasureHuntExcavator - 全域时空寻宝与隐秘藏宝库挖掘调度器
# 文件路径: res://scripts/core/treasure_hunt_excavator.gd
# 架构定位: 管理全域四大秘境探秘、职能收益修正、陷阱防卫判定与掉落物原子结算
# ==============================================================================
class_name TreasureHuntExcavator
extends RefCounted

signal excavation_progress_updated(pct: float, phase_name: String)
signal excavation_completed(spoils: Dictionary)

const PHASES: Array[String] = [
	"地脉以太共鸣定位",
	"解构外层古代封印结界",
	"规避深渊地刺与落穴陷阱",
	"破解核心主宝箱密码锁",
	"打包绝版神兵全速撤离"
]

## 执行寻宝推演演算
static func evaluate_excavation(params: Dictionary) -> Dictionary:
	var site_id: String = params.get("site_id", "sunken_galleon")
	var seeker_id: String = params.get("seeker_id", "thief_master")
	var tool_id: String = params.get("tool_id", "master_key")
	var depth: int = params.get("depth", 3)
	var tactic: String = params.get("guard_tactic", "stealth")

	var base_gold: int = 15000 * depth
	var base_ap: int = 15 * depth
	var bonus_multiplier: float = 1.0

	if seeker_id == "thief_master":
		bonus_multiplier += 0.35
	elif seeker_id == "time_archmage":
		bonus_multiplier += 0.20
	elif seeker_id == "minstrel_bard":
		bonus_multiplier += 0.25

	if tool_id == "aether_lodestone":
		base_gold = int(base_gold * 1.5)

	var final_gold: int = int(base_gold * bonus_multiplier)
	var final_ap: int = int(base_ap * bonus_multiplier)

	return {
		"site_id": site_id,
		"seeker_id": seeker_id,
		"tool_id": tool_id,
		"depth": depth,
		"tactic": tactic,
		"final_gold": final_gold,
		"final_ap": final_ap,
		"timestamp": Time.get_datetime_string_from_system()
	}
`

const gdRiftDispatcherCode = `# ==============================================================================
# RiftExpeditionDispatcher - 世界时空裂隙委托探险队队列调度器
# 文件路径: res://scripts/core/rift_expedition_dispatcher.gd
# 架构定位: 跨世界维度裂隙派遣调度、队长职能加成与远古石板神兵解禁
# ==============================================================================
class_name RiftExpeditionDispatcher
extends Node

signal expedition_started(dest_id: String, duration_sec: float)
signal expedition_completed(dest_id: String, rewards: Dictionary)
signal seal_unlocked(weapon_id: String, remaining_credits: int)

var active_expeditions: Dictionary = {}
var unlocked_weapons: Array[String] = []

func dispatch_expedition(dest_id: String, leader_role: String, supply_item: String) -> void:
	emit_signal("expedition_started", dest_id, 30.0)
	print("[RiftDispatcher] 派遣探险队前往: %s, 队长: %s" % [dest_id, leader_role])

func claim_unsealed_weapon(weapon_id: String, credits: int) -> bool:
	if credits <= 0 or unlocked_weapons.has(weapon_id):
		return false
	unlocked_weapons.append(weapon_id)
	emit_signal("seal_unlocked", weapon_id, credits - 1)
	return true
`

const copyTreasureGdCode = () => {
  const code = activeTreasureGdTab.value === 'excavator' ? gdTreasureExcavatorCode : gdRiftDispatcherCode
  const filename = activeTreasureGdTab.value === 'excavator' ? 'treasure_hunt_excavator.gd' : 'rift_expedition_dispatcher.gd'
  navigator.clipboard.writeText(code).then(() => {
    message.success(`${filename} 源码已复制到剪贴板！`)
  }).catch(() => {
    message.info('源码已复制')
  })
}

onUnmounted(() => {
  if (expeditionInterval) clearInterval(expeditionInterval)
  if (excavationTimer) clearInterval(excavationTimer)
})

// ==========================================
// 全域悬赏委托评级与公会信赖度工坊 (v2.2.295)
// ==========================================
interface BountyArchetype {
  id: string
  name: string
  icon: string
  tag: string
  desc: string
  rewardHighlight: string
  baseGil: number
  baseHonor: number
}

const bountyArchetypes: BountyArchetype[] = [
  {
    id: 'ancient_dragon_hunt',
    name: 'SS 级太古巨龙讨伐令',
    icon: '🐉',
    tag: '龙皇征伐',
    desc: '深入龙之颈熔岩深渊，讨伐始源红莲炎龙，解禁太古龙枪与神圣龙鳞',
    rewardHighlight: '太古神圣龙枪 + 300,000 G',
    baseGil: 280000,
    baseHonor: 2500
  },
  {
    id: 'ruin_convoy',
    name: '巴比伦遗迹学者护送',
    icon: '🏺',
    tag: '学者护航',
    desc: '穿越风暴流沙遗迹，护送考古学者破译古泥板，解锁以太结晶图纸',
    rewardHighlight: '以太结晶合成图纸 + 180,000 G',
    baseGil: 160000,
    baseHonor: 1800
  },
  {
    id: 'void_smuggling_intercept',
    name: '时空裂隙黑市禁运截获',
    icon: '⚔️',
    tag: '黑市伏击',
    desc: '截获穿梭于时空裂隙的走私虚空艇，缴获封印的暗黑法典与绝版宝具',
    rewardHighlight: '暗黑禁断法典 + 220,000 G',
    baseGil: 210000,
    baseHonor: 2200
  },
  {
    id: 'citizen_heart_bond',
    name: '全域居民心愿信赖羁绊',
    icon: '💖',
    tag: '信赖之证',
    desc: '巡回倾听两界居民心愿委托，积累信赖之证，激活城镇商会终身折扣',
    rewardHighlight: '商会终身尊享金卡 + 120,000 G',
    baseGil: 110000,
    baseHonor: 3200
  }
]

const selectedBountyId = ref<string>('ancient_dragon_hunt')

// 4 维连续滑块参数
const bountyDifficulty = ref<number>(8)
const guildReputation = ref<number>(3800)
const partyResonance = ref<number>(165)
const rewardPremium = ref<number>(2.8)

// 3 大公会特权保障
const bountyInsuranceContract = ref<boolean>(true)
const doubleDropPurityLock = ref<boolean>(true)
const emergencyDistressBeacon = ref<boolean>(true)

const currentBounty = computed(() => {
  return bountyArchetypes.find(b => b.id === selectedBountyId.value) || bountyArchetypes[0]
})

const getDifficultyRank = (stars: number): string => {
  if (stars >= 9) return '灭世神话 (EX)'
  if (stars >= 7) return '深渊灾难 (SS)'
  if (stars >= 4) return '极度危险 (S)'
  return '常规挑战 (A)'
}

const calculatedSuccessRate = computed(() => {
  let rate = 70.0
  rate += (partyResonance.value / 200) * 22.0
  rate += (guildReputation.value / 5000) * 12.0
  rate -= (bountyDifficulty.value / 10) * 14.0
  if (bountyInsuranceContract.value) rate += 4.5
  if (emergencyDistressBeacon.value) rate += 5.5
  return Math.min(99.8, Math.max(50.0, rate))
})

const calculatedTotalGil = computed(() => {
  const base = currentBounty.value.baseGil
  const diffBonus = bountyDifficulty.value * 22000
  const lockBonus = doubleDropPurityLock.value ? 1.35 : 1.0
  return Math.round((base + diffBonus) * rewardPremium.value * lockBonus)
})

const calculatedHonorPts = computed(() => {
  const base = currentBounty.value.baseHonor
  const repFactor = Math.round((guildReputation.value / 1000) * 450)
  const partyFactor = Math.round((partyResonance.value / 100) * 600)
  return base + repFactor + partyFactor
})

const calculatedMissionSafety = computed(() => {
  let safety = 65.0
  if (bountyInsuranceContract.value) safety += 12.0
  if (emergencyDistressBeacon.value) safety += 15.0
  safety += (guildReputation.value / 5000) * 8.0
  return Math.min(99.9, safety)
})

const calculatedRankTier = computed(() => {
  if (guildReputation.value >= 4000 && partyResonance.value >= 160) return 'SSS 级太古神话领主'
  if (guildReputation.value >= 3000) return 'SS 级传奇怪兽猎人'
  if (guildReputation.value >= 1500) return 'S 级精锐先锋探险家'
  return 'A 级白银游侠'
})

const resetBountyParameters = () => {
  bountyDifficulty.value = 8
  guildReputation.value = 3800
  partyResonance.value = 165
  rewardPremium.value = 2.8
  bountyInsuranceContract.value = true
  doubleDropPurityLock.value = true
  emergencyDistressBeacon.value = true
  message?.info('悬赏委托参数已重置为黄金标准配置')
}

// 五阶段仿真推演
const isSimulatingBounty = ref<boolean>(false)
const bountySimulationStep = ref<number>(0)
interface BountyLogItem {
  text: string
  color?: string
}
const bountyLogs = ref<BountyLogItem[]>([])

const bountyStages = [
  { id: 1, title: '委托板与信赖扫描', desc: '检索委托星级与公会勋位' },
  { id: 2, title: '契约拟定与保险锁相', desc: '启动全额保全与紧急信标' },
  { id: 3, title: '深入险境激战守卫', desc: '全员羁绊共鸣全力讨伐' },
  { id: 4, title: '宝库开启双倍掉落', desc: '锁相环诱发极品额外宝箱' },
  { id: 5, title: '委托交付与勋位晋阶', desc: '发放全额赏金与荣誉方案' }
]

const runBountySimulation = async () => {
  if (isSimulatingBounty.value) return
  isSimulatingBounty.value = true
  bountySimulationStep.value = 0
  bountyLogs.value = []

  const appendLog = (text: string, color?: string) => {
    bountyLogs.value.push({ text, color })
  }

  appendLog('[INIT] 启动全域悬赏委托派遣与信赖演化推演...', 'text-amber-400 font-bold')
  await new Promise(r => setTimeout(r, 400))

  // Step 1
  bountySimulationStep.value = 1
  appendLog(`[STEP 1] 扫描公会告示板：选定【${currentBounty.value.name}】，难度 ${bountyDifficulty.value} 星，信赖度 ${guildReputation.value} Pt。`, 'text-cyan-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 2
  bountySimulationStep.value = 2
  appendLog(`[STEP 2] 激活履约保险契约: ${bountyInsuranceContract.value ? '已生效 (零碎裂保全)' : '未开启'}；紧急救援信标: ${emergencyDistressBeacon.value ? '在线' : '离线'}。`, 'text-purple-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 3
  bountySimulationStep.value = 3
  appendLog(`[STEP 3] 探险队抵临目标险域！队伍羁绊共鸣 ${partyResonance.value}%，胜率期望 ${calculatedSuccessRate.value.toFixed(1)}%，击破目标守卫！`, 'text-rose-400 font-bold')
  await new Promise(r => setTimeout(r, 500))

  // Step 4
  bountySimulationStep.value = 4
  appendLog(`[STEP 4] 开启远古宝库！双倍锁相环生效: ${doubleDropPurityLock.value ? '已触发极品双宝箱' : '标准掉落'}，结算赏金 ${calculatedTotalGil.value.toLocaleString()} Gil！`, 'text-emerald-300')
  await new Promise(r => setTimeout(r, 450))

  // Step 5
  bountySimulationStep.value = 5
  appendLog(`[SUCCESS] 委托交付完成！获得功勋 +${calculatedHonorPts.value.toLocaleString()} Pt，当前认证位阶: 【${calculatedRankTier.value}】！`, 'text-amber-300 font-bold')
  isSimulatingBounty.value = false
  message?.success('悬赏委托推演圆满完成！')
}

const exportBountyCertificate = () => {
  const certData = {
    studio: 'Multi-Dimensional Bounty Guild Rating & Trust Studio v2.2.295',
    bounty: currentBounty.value.name,
    difficulty: bountyDifficulty.value,
    guildReputation: guildReputation.value,
    partyResonance: partyResonance.value,
    rewardPremium: rewardPremium.value,
    calculatedSuccessRate: calculatedSuccessRate.value,
    calculatedTotalGil: calculatedTotalGil.value,
    calculatedHonorPts: calculatedHonorPts.value,
    calculatedRankTier: calculatedRankTier.value,
    timestamp: new Date().toISOString(),
    sha256Certificate: 'BOUNTY-GUILD-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase()
  }

  const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bounty_guild_certificate_${certData.sha256Certificate}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success(`已导出公会信赖方案书: ${certData.sha256Certificate}`)
}

// 源码展台
type BountyScriptKey = 'bounty_dispatcher' | 'npc_trust_manager' | 'insurance_guard'

const activeBountyScriptTab = ref<BountyScriptKey>('bounty_dispatcher')

const bountyScriptTabs = [
  { key: 'bounty_dispatcher' as const, name: '公会悬赏调度器' },
  { key: 'npc_trust_manager' as const, name: '居民信赖状态机' },
  { key: 'insurance_guard' as const, name: '履约保险守护者' }
]

const bountyScriptCodes: Record<BountyScriptKey, string> = {
  bounty_dispatcher: `class_name BountyGuildDispatcherSystem
extends RefCounted

## 最终幻想：时空之轮 - 公会悬赏派遣调度核心系统
## 文件路径: res://scripts/sidequests/bounty_guild_dispatcher_system.gd
## 引擎版本: Godot Engine 4.6 LTS

signal bounty_dispatched(bounty_id: String, difficulty: int)
signal bounty_completed(bounty_id: String, reward_data: Dictionary)

var active_bounties: Dictionary = {}

func dispatch_bounty(bounty_id: String, difficulty: int, resonance: float, premium: float) -> Dictionary:
    var base_success: float = 0.70 + (resonance / 200.0 * 0.22) - (float(difficulty) / 10.0 * 0.14)
    var success: bool = randf() <= clampf(base_success, 0.50, 0.998)

    var reward_gil: int = int(float(150000 + difficulty * 22000) * premium)
    var outcome := {
        "bounty_id": bounty_id,
        "success": success,
        "reward_gil": reward_gil if success else 0,
        "status": "COMPLETED" if success else "FAILED"
    }
    bounty_completed.emit(bounty_id, outcome)
    return outcome
`,

  npc_trust_manager: `class_name NPCTrustEvolutionManager
extends RefCounted

## 最终幻想：时空之轮 - 居民信赖度与好感演化状态机
## 文件路径: res://scripts/sidequests/npc_trust_evolution_manager.gd
## 引擎版本: Godot Engine 4.6 LTS

const MAX_TRUST_POINTS: int = 5000

var current_reputation: int = 3800

func add_trust(points: int) -> String:
    current_reputation = mini(current_reputation + points, MAX_TRUST_POINTS)
    if current_reputation >= 4000:
        return "SSS_MYTHIC_LORD"
    elif current_reputation >= 3000:
        return "SS_LEGENDARY_HUNTER"
    elif current_reputation >= 1500:
        return "S_ELITE_EXPLORER"
    return "A_SILVER_RANGER"
`,

  insurance_guard: `class_name BountyInsuranceRiskGuard
extends RefCounted

## 最终幻想：时空之轮 - 全额履约保险与紧急信标守护者
## 文件路径: res://scripts/sidequests/bounty_insurance_risk_guard.gd
## 引擎版本: Godot Engine 4.6 LTS

static func handle_mission_failure(base_gil: int, has_insurance: bool, has_beacon: bool) -> Dictionary:
    var compensation: int = int(float(base_gil) * 0.60) if has_insurance else 0
    return {
        "casualty_free": has_beacon,
        "material_recovered": has_insurance,
        "compensation_gil": compensation,
        "emergency_warp": has_beacon
    }
`
}

const currentBountyScriptCode = computed(() => {
  return bountyScriptCodes[activeBountyScriptTab.value]
})

const copyBountyScript = () => {
  navigator.clipboard.writeText(currentBountyScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 脚本源码到剪贴板！')
}


// ==========================================
// 跨纪元支线剧情任务链、NPC羁绊交互与遗迹宝箱工坊 (v2.2.324)
// ==========================================
const scrollToEpochSidequestStudio = () => {
  document.getElementById('epoch-sidequest-chain-studio')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedEpochQuestArchetype = ref('millennium_scholar')
const epochQuestArchetypes = [
  {
    id: 'millennium_scholar',
    name: '太古学者千年纪行',
    icon: '📜',
    typeTag: '纪元石碑',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    desc: '横跨三世三大文明纪元的石碑考据，破译古代水晶裂变根因，解锁太古高阶法术石。',
    inheritanceReward: '太古全息星图 / 禁咒法术石',
    epochSpan: '古代纪元 ➔ 现代 ➔ 终焉裂隙'
  },
  {
    id: 'princess_legacy',
    name: '遗落王女宿命寻踪',
    icon: '👑',
    typeTag: '王女羁绊',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    desc: '追随王室遗孤从平民暗巷至王座归位的四重变装线索，解锁专属命座守护光环。',
    inheritanceReward: '王女婚誓金戒 / 命座真圣印',
    epochSpan: '四大王国宫廷 ➔ 避风港要塞'
  },
  {
    id: 'blacksmith_reforge',
    name: '铁匠世家神兵重铸',
    icon: '🔨',
    typeTag: '神灭重铸',
    tagClass: 'bg-red-500/20 text-red-300 border border-red-500/30',
    desc: '寻回七代祖传以太淬火秘方，借熔岩地核真火熔铸神话断刃，达成极致破限攻击力。',
    inheritanceReward: '超越诸神黄昏断刃锻造权',
    epochSpan: '矮人地底工坊 ➔ 熔岩禁区'
  },
  {
    id: 'smuggler_pact',
    name: '虚空流浪商人契约',
    icon: '🪙',
    typeTag: '黑市暗拍',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    desc: '游走于各时代次元裂隙黑市商会，激活跨时空随身以太仓库与绝版道具暗拍权。',
    inheritanceReward: '跨时空以太无限仓 / 9折暗拍',
    epochSpan: '全域 97 场景黑市暗巷流窜'
  }
]

const epochChainDepthStages = ref(5)
const epochNpcAffinityPoints = ref(750)
const epochVaultQualityFactor = ref(3.2)
const epochBranchEntanglementPct = ref(85)

const enableCausalityBranchFreeRewind = ref(true)
const enableNpcAboardAirshipPact = ref(true)
const enableGuaranteedRelicDoubleLoot = ref(true)

const isEpochQuestSimulating = ref(false)
const epochQuestSimProgress = ref(0)
const epochQuestSimStep = ref('')
const epochQuestLogs = ref<string[]>([])

const epochCompletionBonusPct = computed(() => {
  let pct = 35.0 + (epochChainDepthStages.value / 7) * 35.0 + (epochBranchEntanglementPct.value / 100) * 15.0
  return Math.min(85.0, parseFloat(pct.toFixed(1)))
})

const epochAffinityEfficiencyPct = computed(() => {
  let val = 84.0 + (epochNpcAffinityPoints.value / 1000) * 11.5
  if (enableNpcAboardAirshipPact.value) val += 4.3
  return Math.min(99.8, parseFloat(val.toFixed(1)))
})

const epochVaultExpectedGil = computed(() => {
  let gil = 1500000 * epochVaultQualityFactor.value
  if (enableGuaranteedRelicDoubleLoot.value) gil *= 1.35
  return Math.round(gil)
})

const epochQuestTierBadge = computed(() => {
  if (epochCompletionBonusPct.value > 80 && epochAffinityEfficiencyPct.value > 98) return 'EX·跨纪元神话纪行先知'
  if (epochCompletionBonusPct.value > 70) return 'SSS·时空因果律大宗师'
  if (epochCompletionBonusPct.value > 60) return 'SS·高阶宿命任务探索者'
  return 'S·标准支线探险家'
})

const selectEpochQuestArchetype = (id: string) => {
  selectedEpochQuestArchetype.value = id
  const target = epochQuestArchetypes.find(a => a.id === id)
  if (target) {
    message?.info(`已切入支线任务链：${target.name}（${target.typeTag}）`)
  }
}

const resetEpochQuestDefaults = () => {
  epochChainDepthStages.value = 5
  epochNpcAffinityPoints.value = 750
  epochVaultQualityFactor.value = 3.2
  epochBranchEntanglementPct.value = 85
  enableCausalityBranchFreeRewind.value = true
  enableNpcAboardAirshipPact.value = true
  enableGuaranteedRelicDoubleLoot.value = true
  message?.success('已恢复跨纪元支线任务链基准参数！')
}

const runEpochQuestSimulation = () => {
  if (isEpochQuestSimulating.value) return
  isEpochQuestSimulating.value = true
  epochQuestSimProgress.value = 0
  epochQuestLogs.value = []

  const steps = [
    { p: 20, step: '定位三千年历史轴上的跨纪元支线锚点与求援信标...', log: '信标捕获完成，任务链深入至第 5 阶段，因果律纠缠度 85%。' },
    { p: 45, step: '推演 NPC 关键对白分支，好感度升华至 750 点...', log: 'NPC 羁绊共鸣成功，随舰飞空艇工坊特权契约正式缔结。' },
    { p: 70, step: '启动因果律无悔重选与时间线回溯守护机制...', log: '抉择回溯断路器就绪，任意支线分支皆可无损重置重温。' },
    { p: 90, step: '解密遗迹密室宝箱符文锁，双倍掉落保底激活...', log: '宝箱防空箱生效，获得稀世珍宝期望估值 ' + epochVaultExpectedGil.value.toLocaleString() + ' G。' },
    { p: 100, step: '跨纪元支线推演收敛，冒险家方案证书签发！', log: `探索加成: +${epochCompletionBonusPct.value}%，羁绊效率: ${epochAffinityEfficiencyPct.value}%，认证: ${epochQuestTierBadge.value}。` }
  ]

  let idx = 0
  const interval = setInterval(() => {
    if (idx < steps.length) {
      epochQuestSimProgress.value = steps[idx].p
      epochQuestSimStep.value = steps[idx].step
      epochQuestLogs.value.push(steps[idx].log)
      idx++
    } else {
      clearInterval(interval)
      isEpochQuestSimulating.value = false
      message?.success('跨纪元支线任务链沙盘推演圆满成功！')
    }
  }, 250)
}

const exportEpochQuestCert = () => {
  const cert = {
    standard: 'GODOT-4.6-LTS-EPOCH-QUEST-CHAIN-SPEC',
    version: 'v2.2.324',
    timestamp: new Date().toISOString(),
    archetype: selectedEpochQuestArchetype.value,
    chain_stages: epochChainDepthStages.value,
    affinity_points: epochNpcAffinityPoints.value,
    vault_factor: epochVaultQualityFactor.value,
    entanglement_pct: epochBranchEntanglementPct.value,
    causality_rewind: enableCausalityBranchFreeRewind.value,
    npc_aboard: enableNpcAboardAirshipPact.value,
    double_loot: enableGuaranteedRelicDoubleLoot.value,
    completion_bonus_pct: epochCompletionBonusPct.value,
    affinity_efficiency_pct: epochAffinityEfficiencyPct.value,
    vault_expected_gil: epochVaultExpectedGil.value,
    tier: epochQuestTierBadge.value,
    cert_sha256: '9c0d1e2f3a4b56789012cdef3456789012bcde3456789012bcde324b1234'
  }
  const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `epoch_sidequest_chain_cert_${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  message?.success('已导出跨纪元支线任务方案认证证书！')
}

const activeEpochQuestScriptTab = ref<'director' | 'dialogue' | 'loot_matrix'>('director')

const epochQuestScriptCodes = {
  director: `class_name CrossEpochQuestChainDirector
extends RefCounted

## 最终幻想：时空之轮 - 跨纪元支线任务链流转编排器
## 文件路径: res://scripts/sidequests/cross_epoch_quest_chain_director.gd
## 引擎版本: Godot Engine 4.6 LTS

signal quest_stage_advanced(quest_id: String, stage: int)
signal causality_rewound(quest_id: String)

static func evaluate_quest_progress(stage: int, entanglement: float) -> Dictionary:
    var completion_bonus: float = 35.0 + (float(stage) / 7.0) * 35.0 + (entanglement / 100.0) * 15.0
    return {
        "current_stage": stage,
        "completion_bonus_pct": clampf(completion_bonus, 35.0, 85.0),
        "status": "EPOCH_CHAIN_ACTIVE"
    }
`,

  dialogue: `class_name NPCAffinityDialogueTree
extends RefCounted

## 最终幻想：时空之轮 - NPC 羁绊好感度与多分支对白决策树
## 文件路径: res://scripts/sidequests/npc_affinity_dialogue_tree.gd
## 引擎版本: Godot Engine 4.6 LTS

static func calculate_affinity(points: int, airship_pact: bool) -> Dictionary:
    var efficiency: float = 84.0 + (float(points) / 1000.0) * 11.5
    if airship_pact:
        efficiency += 4.3
    return {
        "affinity_points": points,
        "efficiency_pct": clampf(efficiency, 80.0, 99.8),
        "is_pact_signed": airship_pact
    }
`,

  loot_matrix: `class_name RelicVaultLootMatrix
extends RefCounted

## 最终幻想：时空之轮 - 遗迹宝箱掉落概率与防空箱保底矩阵
## 文件路径: res://scripts/sidequests/relic_vault_loot_matrix.gd
## 引擎版本: Godot Engine 4.6 LTS

static func roll_vault_chest(quality_factor: float, double_loot: bool) -> Dictionary:
    var base_gil: int = int(1500000.0 * quality_factor)
    if double_loot:
        base_gil = int(float(base_gil) * 1.35)
    return {
        "expected_gil": base_gil,
        "anti_empty_chest": true,
        "relic_tier": "MYTHIC_SEALED"
    }
`
}

const currentEpochQuestScriptCode = computed(() => {
  return epochQuestScriptCodes[activeEpochQuestScriptTab.value]
})

const copyEpochQuestScript = () => {
  navigator.clipboard.writeText(currentEpochQuestScriptCode.value)
  message?.success('已复制 Godot 4.6 LTS 支线任务源码到剪贴板！')
}

</script>
