<template>
  <div class="boss-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/boss-tactics">
          <n-button type="error" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回首领攻坚战术
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-rose-400">首领攻坚独立战术详单</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-cyan-300 font-bold">{{ boss?.name || '未知首领' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-mono font-bold border border-rose-500/40">
          VBLE BOSS TACTICS v2.2.348
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!boss" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到首领攻坚档案</h2>
      <p class="text-sm text-slate-300 mb-4">该首领尚未记录在战术雷达中，请核对首领代号。</p>
      <router-link to="/vble/boss-tactics">
        <n-button type="primary" round>返回首领攻坚列表</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主首领头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/70 to-slate-900 border border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                阶位: {{ boss.tier || 'T1' }} 极度危险
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                战斗阶段: {{ boss.phases || 2 }} 阶段演变
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 text-xs border border-slate-700">
                出没秘境: {{ boss.location }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ boss.name }}</span>
              <span class="text-lg sm:text-xl font-medium text-rose-300">「{{ boss.title }}」</span>
            </h1>

            <div class="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-slate-200">
              <div class="font-bold text-amber-300 mb-1">【核心机制与灭队特技】</div>
              <div>{{ boss.keyGimmick }}</div>
            </div>
          </div>

          <!-- 右侧血量与掉落 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[220px]">
            <div>
              <div class="text-xs text-slate-400">基础估算生命总值</div>
              <div class="text-2xl font-mono font-black text-rose-400 mt-0.5">{{ boss.hp }} HP</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">首通与概率战利品</div>
              <div class="text-xs text-amber-300 mt-0.5 font-bold leading-relaxed">{{ boss.rewards }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 攻坚策略拆解与阶段演化 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 分阶段拆解与机制对策 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>⚔️</span> 首领阶段性破局攻坚法则
            </h2>
            <span class="text-xs text-cyan-300 font-mono">Phase Strategy &amp; Countermeasures</span>
          </div>

          <!-- 官方攻坚总结 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div class="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <span>🛡️</span> 推荐实战通关策略：
            </div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {{ boss.strategy }}
            </p>
          </div>

          <!-- 多阶段动态拆解流程 -->
          <div class="space-y-3">
            <div class="text-xs font-bold text-slate-300">多阶段战斗机制剖析：</div>
            <div
              v-for="(phase, idx) in phaseBreakdown"
              :key="idx"
              class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold text-xs">
                    PHASE 0{{ idx + 1 }}
                  </span>
                  <span class="text-sm font-bold text-white">{{ phase.title }}</span>
                </div>
                <span class="text-xs font-mono text-amber-400">{{ phase.hpRange }}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">{{ phase.desc }}</p>
              <div class="text-[11px] text-cyan-300 bg-slate-900 p-2 rounded border border-slate-800">
                💡 <span class="font-bold">对策指南:</span> {{ phase.tip }}
              </div>
            </div>
          </div>

          <!-- 弱点与抗性矩阵 -->
          <div class="border-t border-slate-800 pt-4">
            <div class="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <span>🎯</span> 属性弱点、控制状态与破韧抗性
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">致命弱点属性</div>
                <div class="text-sm font-bold text-amber-300 mt-1">{{ boss.weakness }}</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">异常状态抗性</div>
                <div class="text-sm font-bold text-rose-400 mt-1">免疫即死 / 石化</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">破韧蓄力条</div>
                <div class="text-sm font-bold text-cyan-400 mt-1">120 点 (弱雷/弱火)</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">狂暴时间倒数</div>
                <div class="text-sm font-bold text-purple-400 mt-1">18 回合全域灭队</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 推荐小队配置与快捷导航 -->
        <div class="space-y-4">
          <!-- 推荐出战英雄与职业 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>👥</span> 推荐攻坚小队配置
            </h2>
            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div class="text-xs text-amber-400 font-bold mb-1">🛡️ 前排主坦 (Main Tank)</div>
                <div class="text-sm font-bold text-white">卫珩 / 圣骑士 (Paladin)</div>
                <div class="text-xs text-slate-400 mt-0.5">负责覆盖【坚壁庇护】拦截 Boss 狂暴爪击</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div class="text-xs text-cyan-400 font-bold mb-1">⚔️ 主力破韧 (Primary DPS)</div>
                <div class="text-sm font-bold text-white">黎川 / 魔法剑士 (Mystic Knight)</div>
                <div class="text-xs text-slate-400 mt-0.5">附魔对应属性弱点，加速清空首领破韧槽</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div class="text-xs text-emerald-400 font-bold mb-1">🕊️ 团队续航 (Support / Healer)</div>
                <div class="text-xs font-bold text-white">昼隐 / 白魔导师 (White Mage)</div>
                <div class="text-xs text-slate-400 mt-0.5">维持全员持续再生，转阶段预先释放大痊愈</div>
              </div>
            </div>
          </div>

          <!-- Godot 4.6 LTS 首领 AI 逻辑脚本一览 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-mono font-bold text-rose-300">GODOT 4.6 LTS AI</span>
              <span class="text-[10px] text-slate-400">boss_ai_behavior.gd</span>
            </div>
            <pre class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-48">func evaluate_boss_phase() -> void:
    if current_hp <= max_hp * 0.4:
        trigger_enrage_mode()
    elif current_hp <= max_hp * 0.7:
        enter_stance_transition()
    else:
        execute_standard_rotation()</pre>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { bossTacticsList } from '../config/bossTactics'
import { GAME_DATABASE } from '../data/gameDatabase'

const route = useRoute()
const bossId = computed(() => (route.params.id as string) || '')

const boss = computed(() => {
  const foundInTactics = bossTacticsList.find(b => b.id === bossId.value)
  if (foundInTactics) return foundInTactics

  // 兜底从 GAME_DATABASE.monsters 查找
  const foundInDb = (GAME_DATABASE.monsters || []).find((m: any) => m.id === bossId.value)
  if (foundInDb) {
    return {
      id: foundInDb.id,
      name: foundInDb.name,
      title: foundInDb.rankText || '原野首领',
      tier: foundInDb.rank === 'boss' ? 'T2' : 'T1',
      location: foundInDb.location || '时空裂隙隐秘秘境',
      hp: String(foundInDb.hp || 1000),
      phases: 2,
      weakness: foundInDb.weakness ? `${foundInDb.weakness} 属性特攻` : '全属性中立',
      keyGimmick: '【高频普通攻击与狂暴充能】周期性积攒怒气释放全屏范围冲击。',
      strategy: '保持前排嘲讽，集火攻击其弱点属性，破韧后全员爆发极限技。',
      rewards: (foundInDb.drops || []).map((d: any) => `${d.name} (${d.rate})`).join('、') || '稀有金币与经验值'
    }
  }

  return null
})

const phaseBreakdown = computed(() => {
  return [
    {
      title: '常规交战阶段 (Opening Stance)',
      hpRange: '100% ~ 70% HP',
      desc: '首领以基础技能轮替出招，试探小队前排坦度。伤害中等，重点在于建立仇恨并快速积累小队 ATB。',
      tip: '全员保留神威极限技槽，优先由辅助角色上好护盾与增伤 buff。'
    },
    {
      title: '狂暴机制转阶段 (Transition Stance)',
      hpRange: '70% ~ 35% HP',
      desc: '首领进入特殊防御或狂暴姿态，释放标志性强击机制，攻击频率提升 50%，伴随全屏环境持续伤害。',
      tip: '严禁盲目攻击反伤姿态，根据首领动作执行【全员防御】或利用属性弱点强行破韧打断。'
    },
    {
      title: '终焉决战狂暴期 (Enrage Phase)',
      hpRange: '35% ~ 0% HP',
      desc: '首领开启终极蓄力灭队大招，进入倒计时狂暴阶段。如果未能在限时内击破韧性槽或直接击杀，将释放全体秒杀技。',
      tip: '立刻开启全员极限连携技与召唤兽降临，倾泻所有以太药剂全力斩杀！'
    }
  ]
})
</script>

<style scoped>
</style>
