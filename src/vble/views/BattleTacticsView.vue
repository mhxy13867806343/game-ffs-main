<template>
  <div class="battle-tactics-page p-4 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="error" size="small" round class="mb-2">ATB & Dynamic Combat Mechanics</n-tag>
      <h1 class="text-3xl font-extrabold text-glow-cyan mb-2">战斗法则：等级惩罚衰减与剪刀石头布互动</h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-sm">
        解析越级宝箱挑战的严苛回合惩罚公式、史莱姆绝对闪避机制与剪刀石头布抉择试炼
      </p>
    </div>

    <!-- 交互模拟器：等级惩罚计算器 -->
    <n-card class="border border-slate-700/60 bg-[#121626]/90 rounded-xl" title="🧮 宝箱怪/首领越级挑战回合衰减模拟器">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1 text-gray-300">
              <span>我方队伍平均等级: <strong class="text-cyan-300">{{ playerLevel }}</strong> 级</span>
              <span>怪物推荐基准等级: <strong class="text-amber-300">{{ monsterLevel }}</strong> 级</span>
            </div>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-400">我方等级:</span>
                <n-slider v-model:value="playerLevel" :min="1" :max="99" :step="1" />
              </div>
              <div>
                <span class="text-xs text-gray-400">怪物等级:</span>
                <n-slider v-model:value="monsterLevel" :min="1" :max="99" :step="1" />
              </div>
            </div>
          </div>

          <div class="p-4 bg-slate-900/80 rounded-lg border border-slate-800 text-xs space-y-2">
            <div class="text-gray-400">公式规范：</div>
            <div class="font-mono text-cyan-300">
              base_turns = 20<br>
              level_diff = monster_level - player_level<br>
              allowed_turns = max(3, base_turns - max(0, level_diff * 1.5))
            </div>
          </div>
        </div>

        <div class="p-6 bg-slate-950/70 border border-cyan-500/30 rounded-xl text-center space-y-4">
          <div class="text-sm text-gray-400">当前等级差与允许限制回合数</div>
          <div class="text-4xl font-black text-amber-400">
            {{ calculatedTurns }} <span class="text-lg font-normal text-gray-400">回合内必须击杀</span>
          </div>
          <div class="text-xs" :class="isOverlevelDangerous ? 'text-red-400 font-bold' : 'text-green-400'">
            {{ isOverlevelDangerous ? '⚠️ 严重越级警告！超时即触发全灭死之宣告！' : '✅ 处于标准攻略安全窗口期' }}
          </div>
        </div>
      </div>
    </n-card>

    <!-- 剪刀石头布即时抉择对抗试炼 -->
    <n-card class="border border-slate-700/60 bg-[#121626]/90 rounded-xl" title="⚔️ 剪刀石头布（猜拳抉择）实机互动对决">
      <div class="text-center space-y-4">
        <p class="text-sm text-gray-400">在遭遇特定魔物或首领的即时猜拳蓄力时，快速选择相克阵位获取 200% 暴击加成或打断敌方吟唱！</p>
        
        <div class="flex justify-center gap-4">
          <n-button
            v-for="choice in ['剪刀', '石头', '布']"
            :key="choice"
            size="large"
            :type="userChoice === choice ? 'primary' : 'default'"
            secondary
            @click="playRPS(choice)"
          >
            {{ choice === '剪刀' ? '✌️ 剪刀' : choice === '石头' ? '✊ 石头' : '🖐️ 布' }}
          </n-button>
        </div>

        <div v-if="rpsResult" class="p-4 bg-slate-900/80 rounded-xl border border-slate-800 max-w-md mx-auto">
          <div class="text-sm text-gray-300 mb-2">
            你出: <strong class="text-cyan-400">{{ userChoice }}</strong> vs 敌方出: <strong class="text-amber-400">{{ enemyChoice }}</strong>
          </div>
          <div class="text-lg font-bold" :class="rpsResultColor">
            {{ rpsResultText }}
          </div>
        </div>
      </div>
    </n-card>

    <!-- 暴击与弱点动态跳字表现体系 -->
    <n-card class="border border-amber-900/60 bg-[#171324]/90 rounded-xl" title="💥 战时伤害跳字视觉反馈体系 (Damage Number Badges)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗界面全新升级实装针对暴击与属性弱点的动态数字装饰管线（<code>damage_number_badges.gd</code>），极大提升打击感与破绽洞察力。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">⚡ 暴击跳字 (Critical Hit)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">150% 字号</span>
            </div>
            <p class="text-gray-400">
              判定暴击时，跳字尺寸放大为 1.5 倍基准字号，并附加高对比度金黄亮丽描边轮廓（<code>#ffd700</code>），带来强烈的暴击震颤冲击。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-red-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-red-300 text-sm">🎯 属性弱点 (WEAK Badge)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 font-mono">WEAK 徽标</span>
            </div>
            <p class="text-gray-400">
              命中克制属性（<code>element_multiplier &gt; 1</code>）时，跳字旁动态附带鲜红【WEAK】徽标子控件，随数字一同旋转、漂浮并平滑淡出。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🛡️ 严格实伤结算约束</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">零误判保底</span>
            </div>
            <p class="text-gray-400">
              仅对真实结算的正 HP 实伤进行装饰，0 实伤、MP 吸取、格挡免伤或物理落空不误装饰；清波与控制器切换时子控件自动析构无残留。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-400/30 space-y-2 md:col-span-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-200 text-sm">🛡️ 敌方即死技与死之宣告到期免疫收据头顶银白 IMMUNE 飘字 (_show_instant_death_immune / _is_doom_immunity_tick)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-200 font-mono">#e0e5ed 银白 IMMUNE</span>
            </div>
            <p class="text-gray-400">
              当敌方单体/群体即死技命中免疫即死的我方存活角色（<code>_is_instant_death_immune_hit</code>：<code>instant_death == true</code>、<code>outcome == &quot;immune&quot;</code>、<code>damage == 0</code>），或我方角色【死之宣告 (<code>doom</code>)】倒数归零触发正式到期免疫收据（<code>_is_doom_immunity_tick</code>：<code>status == &quot;doom&quot;</code>、<code>immune == true</code>、<code>remaining == 0</code>、<code>damage == 0</code>，且不倒查同次行动末可能被后续毒伤改变的实时生命状态）时，均在 <code>EffectLayer</code> 头顶（<code>y = -48</code>）生成银白色（<code>#e0e5ed</code> 配 <code>#171322</code> 描边）<code>IMMUNE</code> 飘字；复用倍速自适应漂浮淡出与 <code>wave_feedback</code> 清波生命周期，零受击动作、0 伤跳字或装备投影副作用。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 武器偷盗即时结算漂浮收据表现 -->
    <n-card class="border border-emerald-900/60 bg-[#121c24]/90 rounded-xl" title="💰 武器偷盗即时结算漂浮收据体系 (StealReceipt / steal_receipt_text.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗反馈管线（<code>battle_scene_feedback.gd</code>）与专属收据构建器（<code>steal_receipt_text.gd</code>）无缝打通，真实消费武器偷盗结算数据，实现敌人定位即时漂浮跳字反馈。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🪙 金币斩获反馈</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">steal gold</span>
            </div>
            <p class="text-gray-400">
              结算掠夺金币时向上漂浮展示 <code>偷得 %d 金币</code>，金币达标上限时精准提示 <code>金币已达上限</code>，绝不误判。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🎁 道具正式品名</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">item.json 关联</span>
            </div>
            <p class="text-gray-400">
              严格从官方道具表（<code>item.json</code>）提取正式中文品名展示 <code>偷得【物品名】×1</code>，杜绝将底层 ID 直接暴露。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">🎒 背包饱和警示</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">容量门禁</span>
            </div>
            <p class="text-gray-400">
              背包满载未取得物品时，清晰悬浮 <code>背包已满，未取得物品</code>，避免玩家对偷盗结果产生歧义或困惑。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">✨ 独立动画图层</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">#ffe08a 亮金</span>
            </div>
            <p class="text-gray-400">
              与原伤害数字错行独立排版，采用 <code>#ffe08a</code> 亮金色字配黑边，支持波次切换与倍速自适应，优雅自然渐隐。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 学者与盗贼战术情报卡表现 -->
    <n-card class="border border-indigo-900/60 bg-[#121428]/90 rounded-xl" title="🔍 战术情报卡与解析/侦察体系 (AnalysisInfoCard / analysis_snapshot_text.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          学者特技【单目标解析 (tech_scholar_analyze)】、【大解析 (tech_scholar_grand_analysis)】与盗贼特技【弱点侦察 (tech_thief_scout_weakness)】成功结算后，触发非模态悬浮情报卡（<code>analysis_info_card.gd</code>），基于瞬间快照只读格式化展示敌方属性与战术弱点（<code>analysis_snapshot_text.gd</code>）。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">📋 静态快照保护</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">解析/侦察时情报</span>
            </div>
            <p class="text-gray-400">
              标题明确标注【解析时情报】或【侦察时情报】，记录扫描瞬间的快照，不随魔物后续受击生命变动而实时更新，杜绝投影递归重算。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">⚡ 八大元素四象归类</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">弱/免/吸/抗</span>
            </div>
            <p class="text-gray-400">
              精确归类火/冰/雷/水/土/风/光/暗八大元素：倍率 &gt; 1 归为弱点、0 为免疫、&lt; 0 为吸收、&lt; 1 为抗性，无项显式标明 <code>—</code>。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🎯 非模态零干扰交互</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">360×270 暗金卡</span>
            </div>
            <p class="text-gray-400">
              采用右上角非模态悬浮窗，<code>MOUSE_FILTER_IGNORE</code> 穿透，绝不抢占玩家行动指令菜单输入，也不暂停 ATB 行动条。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🧹 严密生命周期管理</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">自动注销与清理</span>
            </div>
            <p class="text-gray-400">
              当被解析目标被击倒、逃跑退场、战斗波次切换或战斗胜利时自动清理卡片，玩家亦可轻点右上角关闭按钮主动关闭。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">📖 学者大解析群体情报翻阅体系 (Grand Analysis / tech_scholar_grand_analysis)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">多目标快照翻阅</span>
            </div>
            <p class="text-gray-400">
              学者 JLV 20 极意特技【大解析】命中多个敌方目标时，卡片标题切换为【大解析时情报】，底部自适应激活 <code>上一项 (Previous)</code> / <code>下一项 (Next)</code> 按键与 <code>%d / %d</code> 页码计数器；严格按命中顺序独立保存各魔物快照，首尾页智能禁用，翻页不重算实时 HP，任一目标被替换或阵亡即整组注销。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-teal-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-teal-300 text-sm">🗡️ 盗贼弱点侦察最小披露机制 (Scout Weakness / tech_thief_scout_weakness)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 font-mono">侦察时情报</span>
            </div>
            <p class="text-gray-400">
              盗贼 JLV 14 特技【弱点侦察】成功结算后，同样唤起 <code>AnalysisInfoCard</code> 非模态情报卡，标题呈现【侦察时情报】；采用独立最小披露格式器（<code>analysis_snapshot_text.gd scout</code>），严格按火/冰/雷/水/土/风/光/暗八大元素标准顺序，仅披露首个有限倍率 &gt; 1 的元素弱点（如“元素弱点：火”），未探明时显示“未发现元素弱点”；严守最小披露原则，绝不泄露敌方 HP 或其它全套抗性，单页 206px 独立展示，不激活翻页控件且完全不抢占战斗菜单键盘焦点。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战后掉落行单次柔金高亮回落表现 -->
    <n-card class="border border-yellow-900/60 bg-[#1a1812]/90 rounded-xl" title="🎁 战后结算掉落行柔金高亮回落体系 (LootRowHighlight / battle_result.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战后结算界面（<code>battle_result.gd</code>）接入专属掉落行高亮动画组件（<code>loot_row_highlight.gd</code>），在展示战利品时呈现优雅单次柔光反馈。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">✨ 0.8s 柔金线性回落</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">0.8s DURATION</span>
            </div>
            <p class="text-gray-400">
              结算掉落行初次登场时，字体颜色插值过渡至亮金色（<code>Color(1.0, 0.96, 0.72)</code>），在 0.8 秒内平滑回落至基础字体色。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🔒 弱引用单次去重</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">weakref 严防重叠</span>
            </div>
            <p class="text-gray-400">
              通过 <code>WeakRef</code> 精确记录已播放 Label 实例，确保每一条掉落条目仅高亮一次，重复刷新不触发闪烁。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🎮 键盘焦点零干扰</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">FOCUS 守恒</span>
            </div>
            <p class="text-gray-400">
              纯视觉动画不参与战利品入库逻辑，绝不干涉确认键、返回键或结果页键盘/手柄焦点流动。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">🛡️ 暂停与换档立即还原</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">会话即时清理</span>
            </div>
            <p class="text-gray-400">
              当游戏暂停、退回主菜单、换档或切场景时，立即终止动画并恢复基准色，彻底消除跨会话残留。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 剧情技能【属性削减】复利衰减与等级说明体系 -->
    <n-card class="border border-purple-900/60 bg-[#160f26]/90 rounded-xl" title="🔮 剧情技能【属性削减】复利衰减与等级预览体系 (Attribute Drain / BattleAttributeDrain)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          角色状态页（<code>status_page.gd</code>）剧情技能专区正式接入当前唯一实装战斗效果的剧情技能【属性削减】（<code>attr_drain</code>）专用等级格式器（<code>story_drain_description.gd</code>），直接复用战斗系统正式削减常量（<code>BattleAttributeDrain</code>），提供当前等级效果说明与下级（未取得）预览。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">🎲 Lv.1 随机单项衰减</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">普通20% / Boss10%</span>
            </div>
            <p class="text-gray-400">
              初阶削减在敌方属性中随机选定 1 项；对普通敌人按当前剩余值削减 20%，对首领 Boss 削减 10%。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">🎯 Lv.2 定向精准削减</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">普通30% / Boss15%</span>
            </div>
            <p class="text-gray-400">
              中阶削减解锁战术指定选项，玩家可自由指定削减攻击、防御或生命等核心项；普通敌人 30%、Boss 15%。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-pink-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-pink-300 text-sm">⚔️ Lv.3 极意附加破甲</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 font-mono">40%/20% + 破甲30%</span>
            </div>
            <p class="text-gray-400">
              高阶削减比例提升至普通 40%、Boss 20%；且仅指定 HP 时，物防额外降低 30%，持续目标 2 次有效行动。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 规则底线与界面自适应</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">230px 动态扩展</span>
            </div>
            <p class="text-gray-400">
              严守“按当前剩余值计算；正值至少保留 1，原为 0 仍为 0”底线；状态页仅为该技能动态将说明区扩展至 230px，其余 5 技能保持 148px。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 剧情技能【预判】B路线“完整行动承诺”独立基础与批量事务体系 -->
    <n-card class="border border-cyan-900/60 bg-[#0f1928]/90 rounded-xl" title="👁️ 剧情技能【预判 (prediction)】B路线“完整行动承诺”独立基础体系 (Action Commitment Foundation)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          针对剧情技能【预判】（<code>prediction</code>），设计决议正式选定 <strong>B 路线“完整行动承诺”</strong>，并已完成 7 层无副作用独立基础模块与真实执行接线边界复核（<code>docs/PREDICTION_INTEGRATION_PLAN_2026-10-23.md</code>）。当前处于独立基础原型验证通过阶段（58/58 承诺链路 + 8/8 冷却记录单测全绿），在目标失效处置与 Lv.3 增幅细则最终敲定前，暂未开放状态页 SPP 升级或战斗指令入口。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📖 纯决策读取与只读快照</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Reader &amp; Snapshot</span>
            </div>
            <p class="text-gray-400">
              <code>enemy_decision_reader.gd</code> 与 <code>enemy_decision_snapshot.gd</code> 仅从纯值快照推导敌方下一本人行动号（<code>count+1</code>）、低血量有效阶段与 19 类招式范围，绝不调用真实 <code>refresh_health_phase</code>、不清充能 <code>pending</code>、不耗 <code>once</code> 或生产 RNG。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-blue-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-300 text-sm">🎯 候选快照与确定/单体准备</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">Target &amp; Preparer</span>
            </div>
            <p class="text-gray-400">
              <code>enemy_target_snapshot.gd</code> 与 <code>enemy_commitment_preparer.gd</code> 区分援护前选中目标与挑衅池；支持普通单体/混乱一次 RNG 抽样（重复查看零抽样）以及自身/全体地面/全体存活敌军/召唤 5 类确定范围零 RNG 准备。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">📦 承诺容器与原子批量事务</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">Store &amp; Batch Commit</span>
            </div>
            <p class="text-gray-400">
              <code>enemy_action_commitment_store.gd</code> 以 <code>session + model + wave + actor + death_epoch + next_action_count</code> 严格隔离；<code>prepare_batch</code> 面向 Lv.2/3 当前可行动敌群执行全组预检与原子写入，任一不支持则整批拒绝、零部分扣费。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">⏱️ 门槛、施术者指令冷却与边界</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">HUD 5/4/3 · CD 4/3/3</span>
            </div>
            <p class="text-gray-400">
              <code>prediction_cooldown.gd</code> 落实开场 HUD 第 5/4/3 轮门槛与施术者后续有效完成指令 CD 4/3/3（同角色三级共享、跨波保留、不耗 MP/道具）；已完成 <code>act_enemy</code> 与 <code>enemy_attack_party</code> 真实接线边界复核，待失效与 Lv.3 规则确认后合龙。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战斗行动轴我方满格待命头像青白脉冲提示 -->
    <n-card class="border border-sky-900/60 bg-[#0e1b26]/90 rounded-xl" title="⏱️ 战斗行动轴我方满格待命头像青白脉冲体系 (Timeline Ready Portrait Pulse)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗行动轴（<code>battle_timeline.gd</code>）与 ATB 时钟（<code>battle_atb_clock.gd</code>）新增纯只读显示快照 <code>display_ready_actors()</code> 与头像边框脉冲渲染 <code>portrait_border_color()</code>，为我方已满格待命角色提供 1.2 秒周期的柔和青白呼吸边框提示。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">👑 当前行动者金框优先</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">#ffe591 锁定</span>
            </div>
            <p class="text-gray-400">
              当前正在输入或执行指令的 <code>active_actor</code> 始终保持高对比度亮金边框（<code>#ffe591</code>），阵亡角色维持暗灰边框（<code>#989898</code>）。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">✨ 1.2s 青白柔和脉冲</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">alpha 0.8~1.0</span>
            </div>
            <p class="text-gray-400">
              已满格且可正常输入（非混乱/停止/睡眠/石化/歌唱中）的我方待命候选头像呈现 <code>Color(0.82, 1.0, 1.0, 0.9 ± 0.1*sin)</code> 的 1.2 秒柔和呼吸脉冲。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🔒 纯只读快照零副作用</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">display_ready_actors</span>
            </div>
            <p class="text-gray-400">
              每次绘制仅读取无排序只读快照 <code>display_ready_actors()</code>，绝不调用会刷新装备先手或撤销 Quick 状态的生产仲裁函数 <code>ready_actors()</code>。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-blue-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-300 text-sm">🛡️ 独立 UI 计时守恒</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">零 RNG / 零时钟干扰</span>
            </div>
            <p class="text-gray-400">
              脉冲相位由 UI 局部 <code>_ready_pulse_elapsed</code> 独立驱动，仅在节点树可见时累加，绝不读取或推进战斗 ATB <code>elapsed</code> 与随机源。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-300 text-sm">🐢⚡ 行动轴【缓慢 (slow)】灰蓝与【加速 (haste)】0.4s 金色脉冲充能标记 (charge_marker_color / display_has_haste)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-amber-300 font-mono">#6d7f9b 灰蓝 · #f2ce69 金色脉冲</span>
            </div>
            <p class="text-gray-400">
              <code>battle_timeline.gd</code> 扩展 <code>charge_marker_color(actor, seconds)</code> 与纯只读快照函数 <code>display_has_haste(actor)</code>：存活单位处于【缓慢 (<code>slow</code>)】时充能圆点与连接线呈现灰蓝色（<code>#6d7f9b</code>）；处于【加速 (<code>haste</code>)】时呈现 0.4 秒周期的金色脉冲（<code>#f2ce69</code>，透明度 <code>0.85 ± 0.15*sin</code>）。<code>display_has_haste</code> 仅读取已投影快照（<code>statuses.has(&quot;haste&quot;)</code>、<code>course_haste_active</code> 及我方 <code>monster_data.status.equipment_effects</code> 中的 <code>auto_haste</code>），绝不调用会触发个人装备重刷写入的 <code>has_status(&quot;haste&quot;)</code>。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 吟游诗人持续歌唱五线谱光环与跃动音符表现 -->
    <n-card class="border border-amber-900/60 bg-[#1a1624]/90 rounded-xl" title="🎵 吟游诗人持续歌唱五线谱光环与跃动音符体系 (Bard Singing Indicator / battle_singing_indicator.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗角色视觉管线（<code>battle_scene_visuals.gd</code>）挂载纯表现歌唱指示器（<code>battle_singing_indicator.gd</code>），在我方角色持续吟唱【力量之歌 (<code>song_powers_song</code>)】或【英雄之歌 (<code>song_heros_song</code>)】期间，通过纯几何矢量实时绘制脚底五线谱光环与头顶跃动音符。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🎼 脚底五线谱椭圆光环</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">#e5c158 / #83ceff</span>
            </div>
            <p class="text-gray-400">
              在角色脚底（<code>FOOT = Vector2(0, 48)</code>）绘制 5 圈金蓝相间（<code>#e5c158</code> 与 <code>#83ceff</code>）的椭圆五线谱光环，并配有一颗沿 4 秒周期轨迹环绕的金色音轨光点。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🎶 头顶三枚跃动音符</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">纯矢量无字体依赖</span>
            </div>
            <p class="text-gray-400">
              在角色头顶（<code>y = -72 ± 4*sin</code>）呈现 3 枚错落起伏的八分音符，完全由圆、符干与符尾折线（<code>display_geometry()</code>）几何绘制，彻底摆脱系统字体符号缺失风险。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">⚡ 异常与起跳即时隐退</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">只读中断判定</span>
            </div>
            <p class="text-gray-400">
              当歌唱者阵亡、起跳滞空或陷入沉默/睡眠/停止/石化/混乱时立即隐藏光环与音符；仅做只读视觉收敛，绝不越权调用 <code>stop_singing</code> 修改战斗状态。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🛡️ 弱引用单次绑定守恒</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">WeakRef + 祖先链核验</span>
            </div>
            <p class="text-gray-400">
              采用 <code>WeakRef</code> 弱引用与完整祖先链 <code>is_queued_for_deletion()</code> 核验，模板重建时自动卸载旧实例，局部 <code>_visual_seconds</code> 独立运转，零 RNG/ATB 干扰。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 自动战斗道具耗尽回退普攻即时提示 -->
    <n-card class="border border-yellow-900/60 bg-[#1c1810]/90 rounded-xl" title="🔄 自动战斗道具耗尽回退普攻即时提示体系 (AutoResourceNotice / auto_resource_notice.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗场景（<code>battle_scene.gd</code> / <code>battle_scene_actions.gd</code>）接入纯只读自动资源耗尽提示组件（<code>auto_resource_notice.gd</code>）：当自动战斗记忆的战斗可用消耗品因零库存回退为普通攻击且实际启动结算时，呈现 1.0 秒非模态明黄提示 <code>道具已耗尽，切换为普通攻击</code>。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-yellow-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-yellow-300 text-sm">📦 派发前库存快照冻结</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-yellow-950 text-yellow-300 font-mono">duplicate 守恒</span>
            </div>
            <p class="text-gray-400">
              在调用自动动作前先行冻结 <code>notice_inventory = GameState.inventory.duplicate()</code>，即便本次回退普攻触发武器偷盗立刻补入同一道具，亦能准确识别派发瞬间的零库存回退。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🎯 严格零库存与启动门禁</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">is_depleted_fallback</span>
            </div>
            <p class="text-gray-400">
              排除封印武器主动技（<code>sealed_weapon_use</code>）与非战斗道具，且仅在 <code>!was_resolving &amp;&amp; _is_resolving_action</code> 确认原普攻入口真实启动后才提示，拒绝重入或无效派发误报。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 行动轴上方零遮挡排版</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">y=60 · 28px 高度</span>
            </div>
            <p class="text-gray-400">
              采用 <code>#facc15</code> 明黄字配深紫描边，定位于顶部提示栏左对齐 <code>y = 60</code>、高度 28px（恰好止于 <code>y = 88</code> 行动轴上方），紧凑宽度绝不侵入右侧自动战斗开关按钮。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🧹 1.0s 消隐与跨波/退自动即清</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">MOUSE_FILTER_IGNORE</span>
            </div>
            <p class="text-gray-400">
              无焦点、鼠标穿透，显示 1.0 秒后自动隐退；一旦关闭自动战斗、推进波次（<code>_wave</code> 变化）、换档或离开战斗树立即清空，零选招与库存副作用。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战斗我方中毒状态角色立绘着色同步 -->
    <n-card class="border border-lime-900/60 bg-[#121f18]/90 rounded-xl" title="☠️ 战斗我方中毒状态角色序列帧着色同步体系 (BattleStatusTint / battle_status_tint.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗表现与 UI 同步管线（<code>battle_scene_feedback.gd</code> / <code>battle_scene_ui_sync.gd</code> / <code>battle_scene_visuals.gd</code>）接入纯表现中毒着色同步器（<code>battle_status_tint.gd</code>），在不干扰姿势动画与战斗数值的前提下，实时将我方存活中毒角色的序列帧着色器参数 <code>poisoned</code> 同步至绿幕材质。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-lime-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-lime-300 text-sm">🧪 专属绿幕 Shader 参数驱动</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-lime-950 text-lime-300 font-mono">green_key.gdshader</span>
            </div>
            <p class="text-gray-400">
              严格核验 <code>material.shader.resource_path == KEY_SHADER</code>，仅对标准 <code>green_key.gdshader</code> 材质注入 <code>poisoned</code> 布尔参数，绝不污染自定义回退材质。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🗿 石化与阵亡优先级守恒</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">alive &amp;&amp; !petrify</span>
            </div>
            <p class="text-gray-400">
              判定条件严格遵循 <code>actor.is_alive() and actor.has_status("poison") and not actor.has_status("petrify")</code>，石化灰度冻结与阵亡倒地优先，解除中毒或阵亡即刻恢复原色。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">🎬 零姿势重播与双入口同步</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Pose &amp; HP Bar Sync</span>
            </div>
            <p class="text-gray-400">
              在姿势刷新（<code>_refresh_party_battle_pose</code>）与血条状态同步（<code>_sync_player_health_bar</code>）双入口实时更新材质参数，绝不因颜色变化打断或重播角色当前动作帧。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🔒 槽位独立材质实例隔离</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">material.duplicate()</span>
            </div>
            <p class="text-gray-400">
              <code>_prepare_party_visual</code> 搭建时统一对所有 <code>ShaderMaterial</code> 执行单次 <code>duplicate()</code>，确保无独立帧的模板槽位亦拥有独立材质副本，零跨槽串色。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 失明状态头部黑雾与死之宣告行动倒数指示器 -->
    <n-card class="border border-slate-700/80 bg-[#141320]/90 rounded-xl" title="🌫️ 战斗失明状态头部黑雾与死之宣告倒数指示体系 (BlindIndicator &amp; DoomIndicator)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战斗角色视觉管线（<code>battle_scene_visuals.gd</code>）挂载纯只读异常状态指示组件：失明头部黑雾（<code>battle_blind_indicator.gd</code>）与死之宣告本人行动剩余数（<code>battle_doom_indicator.gd</code>），以独立局部几何与排版直观呈现关键负面状态，零命中率/行动计数/RNG 干扰。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-purple-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-300 text-sm">🌫️ 失明面部五团环绕黑雾</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">y=-25 · 2.4s 周期</span>
            </div>
            <p class="text-gray-400">
              存活且非跳跃滞空的【失明 (<code>blind</code>)】我方角色面部（<code>y = -25 ± 4*sin</code>，横向振幅 18px）绘制 5 团半透明黑灰交替雾球（半径 4px），不改角色材质或透明度。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">💀 死之宣告行动剩余数</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">#ffe591 → #f87171</span>
            </div>
            <p class="text-gray-400">
              <code>battle_doom_indicator.gd</code> 只读投影 <code>doom_actions_remaining</code>：剩余 &gt;1 次显示亮金（<code>#ffe591</code>），剩余 1 次切换鲜红警示（<code>#f87171</code>），停止/睡眠期间保持原数不越权递减。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 错位排版与自动按钮避让</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">(36,-76) 动态换侧</span>
            </div>
            <p class="text-gray-400">
              失明黑雾限定于面部 <code>y=-25</code>，死之宣告置于头顶右侧 <code>(36, -76)</code> 避开诗人音符；若与顶排自动按钮矩形相交，则自动镜像移至左侧 <code>-36 - size.x</code>。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 text-sm">🛡️ 会话守卫与永久退休</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">WeakRef + cycle 核验</span>
            </div>
            <p class="text-gray-400">
              严格核验宿主、模型、演员、<code>party_runtime</code> 与 <code>cycle_index</code>；普通解除或阵亡仅隐藏（后续再中招可重显），来源替换或退树则永久退休销毁。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-indigo-500/30 space-y-1.5 md:col-span-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-indigo-300 text-sm">👾 我方头顶四项核心负面状态 12×12 点阵角标 (StatusBadges / battle_status_badges.gd)</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">doom &gt; petrify &gt; sleep &gt; poison</span>
            </div>
            <p class="text-gray-400">
              <code>battle_status_badges.gd</code> 按固定优先级 <code>[&quot;doom&quot;, &quot;petrify&quot;, &quot;sleep&quot;, &quot;poison&quot;]</code> 在存活且未跳跃的我方角色头顶（默认居中 <code>y = -62</code>，间距 15px；若与顶排自动按钮矩形相交则自动抬高至 <code>y = -104</code>）绘制纯程序化 12×12 像素点阵角标：死之宣告（<code>#f87171</code> 骷髅，需 <code>doom_actions_remaining &gt; 0</code>）、石化（<code>#b9b9c6</code> 棱石）、睡眠（<code>#83ceff</code> Z 字）与中毒（<code>#c18ce5</code> 毒滴）。无图集或字体依赖，仅在几何变化（<code>geometry != _last_geometry</code>）时按需重绘，零循环计时器与状态副作用。
            </p>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 战后结算成长表格无奖励资格显式说明 -->
    <n-card class="border border-rose-900/60 bg-[#1e1416]/90 rounded-xl" title="📜 战后结算成长表格无奖励资格显式说明体系 (Reward Ineligibility Notice / battle_result.gd)">
      <div class="space-y-4 text-xs leading-relaxed">
        <p class="text-gray-300">
          战后结算界面（<code>battle_result.gd</code>）成长表格（<code>_add_reward_overlay</code> / <code>_add_growth_table_row</code>）新增对无奖励资格成员（如战斗结束时阵亡或石化）的显式中文说明与色彩区分，杜绝玩家对“+0 EXP / +0 AP”产生结算异常疑惑。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-900/80 rounded-lg border border-rose-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 text-sm">🔒 原生布尔收据严格核验</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">reward_eligible == false</span>
            </div>
            <p class="text-gray-400">
              仅当正式结算收据显式携带原生布尔 <code>reward_eligible == false</code>（<code>eligible is bool and not eligible</code>）时才判定为无资格；字段缺失或普通 0 奖励绝不误标。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-amber-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-300 text-sm">🖍️ 姓名红字提示与灰化数值</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">#a22631 / #716b65</span>
            </div>
            <p class="text-gray-400">
              首列角色名下方追加换行提示 <code>无法获得奖励</code> 并着色暗红（<code>#a22631</code>），右侧经验与 AP 列呈现灰褐色（<code>#716b65</code>），正常获奖角色维持羊皮纸深褐（<code>#392717</code>）。
            </p>
          </div>
          <div class="p-3 bg-slate-900/80 rounded-lg border border-cyan-500/30 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-cyan-300 text-sm">📐 羊皮纸滚动区自适应</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Rect2(62,327,580,207)</span>
            </div>
            <p class="text-gray-400">
              复用既有三列固定比例与智能换行（<code>AUTOWRAP_WORD_SMART</code>），严格收束在羊皮纸美术滚动区内，完全保留正式收据原数值与键盘确认焦点。
            </p>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
const playerLevel = ref(20)
const monsterLevel = ref(30)

const calculatedTurns = computed(() => {
  const diff = monsterLevel.value - playerLevel.value
  const penalty = Math.max(0, diff * 1.5)
  return Math.max(3, Math.round(20 - penalty))
})

const isOverlevelDangerous = computed(() => {
  return monsterLevel.value - playerLevel.value >= 8
})

const userChoice = ref('')
const enemyChoice = ref('')
const rpsResult = ref('')

const rpsResultText = computed(() => {
  if (rpsResult.value === 'win') return '🎉 命中弱点破绽！造成 200% 真实崩解暴击！'
  if (rpsResult.value === 'lose') return '💥 敌方反制成功！受到 150% 震荡破防反击！'
  if (rpsResult.value === 'tie') return '🛡️ 势均力敌！进入破招僵直重置对峙！'
  return ''
})

const rpsResultColor = computed(() => {
  if (rpsResult.value === 'win') return 'text-green-400'
  if (rpsResult.value === 'lose') return 'text-red-400'
  return 'text-amber-400'
})

const playRPS = (choice: string) => {
  userChoice.value = choice
  const options = ['剪刀', '石头', '布']
  const randomEnemy = options[Math.floor(Math.random() * options.length)]
  enemyChoice.value = randomEnemy

  if (choice === randomEnemy) {
    rpsResult.value = 'tie'
  } else if (
    (choice === '剪刀' && randomEnemy === '布') ||
    (choice === '石头' && randomEnemy === '剪刀') ||
    (choice === '布' && randomEnemy === '石头')
  ) {
    rpsResult.value = 'win'
  } else {
    rpsResult.value = 'lose'
  }
}
</script>
