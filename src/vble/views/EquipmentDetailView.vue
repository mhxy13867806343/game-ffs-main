<template>
  <div class="equipment-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/equipment">
          <n-button type="info" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回神兵装备矩阵
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-amber-300">神装全息独立档案</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-cyan-300 font-bold">{{ equip?.name || '未知神装' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
          VBLE ARMORY SPEC v2.2.348
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!equip" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定神装档案</h2>
      <p class="text-sm text-slate-300 mb-4">该装备编号在当前军备库中不存在，请返回装备矩阵查验。</p>
      <router-link to="/vble/equipment">
        <n-button type="primary" round>返回神兵装备库</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主装备名片头图卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                {{ equip.rarityText || '★★★★★ 传说神装' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                装备槽位: {{ equip.typeName || equip.type || '主手武器' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">
                适配职业: {{ compatibleJobs }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ equip.name }}</span>
            </h1>

            <p class="text-base text-amber-200/90 italic border-l-2 border-amber-400 pl-3 py-0.5">
              {{ equip.effect || '注入双月晶石以太共鸣的极境武装。' }}
            </p>

            <p class="text-xs sm:text-sm text-slate-300">
              产出途径: <span class="text-emerald-300 font-bold">{{ equipOrigin }}</span>
            </p>
          </div>

          <!-- 右侧锻造等级滑块与强化加成 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">当前模拟强化等级</div>
              <div class="text-2xl font-mono font-black text-amber-400 mt-0.5">+{{ refineLevel }} 精炼</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">精炼附加全属性增幅</div>
              <div class="text-sm font-mono text-cyan-300 font-bold mt-0.5">+{{ refineLevel * 12 }}% 威力增幅</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 属性推演与精炼沙盘 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 数值详情与精炼模拟 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>⚔️</span> 神装核心作战数值与精炼推演
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-300">精炼度:</span>
              <span class="text-sm font-mono font-black text-amber-400">+{{ refineLevel }}</span>
            </div>
          </div>

          <!-- 精炼等级调节 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-300">拖动滑块模拟铁匠铺 +1 ~ +10 极限星纹精炼数值成长：</span>
              <span class="font-mono text-amber-400 font-bold">+{{ refineLevel }} / 10 阶</span>
            </div>
            <n-slider v-model:value="refineLevel" :min="0" :max="10" :step="1" />
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>+0 (初锻原生)</span>
              <span>+5 (大师铭刻)</span>
              <span>+10 (极境太古附魔)</span>
            </div>
          </div>

          <!-- 实装动态数值栅格 -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">物理攻击 (ATK)</div>
              <div class="text-xl font-mono font-black text-amber-400 mt-1">{{ calculatedStats.atk }}</div>
              <div class="text-[10px] text-emerald-400 mt-0.5">+{{ refineLevel * 15 }} 精炼附加</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">魔法攻击 (MATK)</div>
              <div class="text-xl font-mono font-black text-cyan-400 mt-1">{{ calculatedStats.matk }}</div>
              <div class="text-[10px] text-emerald-400 mt-0.5">+{{ refineLevel * 12 }} 精炼附加</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">暴击加成 (CRIT)</div>
              <div class="text-xl font-mono font-black text-rose-400 mt-1">{{ calculatedStats.crit }}%</div>
              <div class="text-[10px] text-cyan-400 mt-0.5">暴伤 +{{ 150 + refineLevel * 10 }}%</div>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div class="text-xs text-slate-400">防御护甲 (DEF)</div>
              <div class="text-xl font-mono font-black text-blue-400 mt-1">{{ calculatedStats.def }}</div>
              <div class="text-[10px] text-emerald-400 mt-0.5">+{{ refineLevel * 8 }} 精炼附加</div>
            </div>
          </div>

          <!-- 词缀特效与被动神威 -->
          <div class="border-t border-slate-800 pt-4 space-y-3">
            <div class="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span>✨</span> 专属神器神威与以太共鸣词缀
            </div>
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-amber-300">【极意共鸣】{{ equip.effect || '无视目标 30% 护甲抗性' }}</div>
              <div class="text-xs text-slate-300 leading-relaxed">
                当装备者职能与该神兵深度契合时，技能消耗降低 20%，并在暴击时触发【以太回荡】，恢复造成伤害 5% 的生命值。
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 配装模拟与快捷跳转 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>⚔️</span> 配装模拟器集成
            </h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              可直接将该神装装载至配装工坊沙盘，与 26 大职业自由组合，计算全套神装搭配下的综合 DPS 与防御承伤。
            </p>
            <router-link to="/vble/armory">
              <n-button block type="warning" round secondary>
                前往配装模拟器 →
              </n-button>
            </router-link>
          </div>

          <!-- 锻造材料消耗 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🔨</span> 下一阶精炼材料
            </h2>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-slate-300">秘银纯矿石</span>
                <span class="text-amber-300 font-mono font-bold">{{ (refineLevel + 1) * 3 }} 块</span>
              </div>
              <div class="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-slate-300">时空水晶粉末</span>
                <span class="text-cyan-300 font-mono font-bold">{{ (refineLevel + 1) * 2 }} 瓶</span>
              </div>
              <div class="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
                <span class="text-slate-300">金币手续费</span>
                <span class="text-emerald-300 font-mono font-bold">{{ (refineLevel + 1) * 5000 }} G</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ARMORY_ITEMS, type ArmoryItem } from '../config/armoryEquipmentConfig'
import { GAME_DATABASE } from '../data/gameDatabase'

const route = useRoute()
const equipId = computed(() => (route.params.id as string) || '')

const refineLevel = ref(5)

const equip = computed(() => {
  const foundInArmory = ARMORY_ITEMS.find((e: ArmoryItem) => e.id === equipId.value)
  if (foundInArmory) return foundInArmory

  const foundInDb = (GAME_DATABASE.equipment || []).find((e: any) => e.id === equipId.value)
  if (foundInDb) {
    return {
      id: foundInDb.id,
      name: foundInDb.name,
      slot: 'weapon',
      type: foundInDb.type,
      typeName: foundInDb.type,
      rarity: 5,
      rarityText: foundInDb.rarity || '★★★★★ 传说神装',
      icon: '⚔️',
      atk: 150,
      matk: 80,
      def: 25,
      job: foundInDb.job,
      origin: foundInDb.origin,
      effect: foundInDb.effect
    }
  }

  return null
})

const compatibleJobs = computed(() => {
  if (!equip.value) return '全职业通用'
  const eq = equip.value as any
  if (eq.job) return eq.job
  if (eq.allowedJobs && eq.allowedJobs.length > 0) return eq.allowedJobs.join(' · ')
  return '自由战士 / 龙骑士 / 圣骑士'
})

const equipOrigin = computed(() => {
  if (!equip.value) return '深渊秘境锻造'
  const eq = equip.value as any
  return eq.origin || '深渊第49层通关或高级黑铁锻造'
})

const calculatedStats = computed(() => {
  const baseAtk = equip.value?.atk || 120
  const baseMatk = equip.value?.matk || 60
  const baseDef = equip.value?.def || 20
  const r = refineLevel.value

  const atk = Math.round(baseAtk + r * 15)
  const matk = Math.round(baseMatk + r * 12)
  const def = Math.round(baseDef + r * 8)
  const crit = Math.min(60, Math.round(15 + r * 2.5))

  return { atk, matk, def, crit }
})
</script>

<style scoped>
</style>
