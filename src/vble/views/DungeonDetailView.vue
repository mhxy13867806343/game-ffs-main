<template>
  <div class="dungeon-detail-page p-3 sm:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
    <!-- 顶部导航与面包屑 -->
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/vble/dungeons">
          <n-button type="info" round secondary size="medium">
            <template #icon><span>←</span></template>
            返回秘境地城
          </n-button>
        </router-link>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-bold text-cyan-300">秘境城镇独立全息档案</span>
        <span class="text-slate-500">/</span>
        <span class="text-sm font-mono text-amber-300 font-bold">{{ dungeon?.name || '未知秘境' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40">
          VBLE DUNGEON TOPOLOGY v2.2.349
        </span>
      </div>
    </div>

    <!-- 未找到提示 -->
    <div v-if="!dungeon" class="p-12 text-center rounded-2xl bg-slate-900/90 border border-red-500/30">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">未找到指定秘境场景档案</h2>
      <p class="text-sm text-slate-300 mb-4">该场景可能处于未探索迷雾区域中，请核对地图代号。</p>
      <router-link to="/vble/dungeons">
        <n-button type="primary" round>返回秘境地城总览</n-button>
      </router-link>
    </div>

    <template v-else>
      <!-- 主场景头图名片卡片 -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                {{ dungeon.tier || 'T1' }} 危险等级
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 text-xs font-mono border border-slate-700">
                类型: {{ dungeon.type || '古代地宫秘境' }}
              </span>
              <span class="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">
                ID: {{ dungeon.id }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{{ dungeon.name }}</span>
            </h1>

            <p class="text-base text-cyan-200/90 italic border-l-2 border-cyan-400 pl-3 py-0.5">
              地貌特征: {{ dungeon.features || '地脉晶石交汇处，存在暗影裂缝与古代机关。' }}
            </p>

            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
              {{ dungeon.desc || '双月大陆关键探索节点，栖息着强大的首领与未被发掘的远古宝箱。' }}
            </p>
          </div>

          <!-- 右侧出没魔物与探索推荐 -->
          <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700 text-left md:text-right space-y-3 min-w-[240px]">
            <div>
              <div class="text-xs text-slate-400">常驻遭遇魔物群落</div>
              <div class="text-sm font-bold text-rose-300 mt-0.5 leading-relaxed">{{ dungeon.monsters || '原野凶兽与盗贼头目' }}</div>
            </div>
            <div class="border-t border-slate-800 pt-2">
              <div class="text-xs text-slate-400">建议探索小队战力</div>
              <div class="text-sm font-mono text-amber-300 font-bold mt-0.5">Lv.{{ exploreLevel }} ~ Lv.{{ exploreLevel + 10 }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景层级拓扑与探险推演 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧 2 列: 场景层级与机关探索 -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🗺️</span> 场景分层拓扑与宝箱探索推演
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-300">当前探险深度:</span>
              <span class="text-sm font-mono font-bold text-cyan-300">{{ selectedFloor }} 层</span>
            </div>
          </div>

          <!-- 层级切换 -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-300">切换当前检视的地宫楼层与危险区域：</span>
              <span class="font-mono text-amber-400 font-bold">{{ selectedFloor }} / {{ totalFloors }} 层</span>
            </div>
            <n-slider v-model:value="selectedFloor" :min="1" :max="totalFloors" :step="1" />
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>1F (入口大厅 / 安全扎营区)</span>
              <span>{{ Math.round(totalFloors / 2) }}F (迷宫中枢 / 机关岔路)</span>
              <span>{{ totalFloors }}F (深渊祭坛 / 守关首领室)</span>
            </div>
          </div>

          <!-- 楼层机制详解 -->
          <div class="space-y-3">
            <div class="text-xs font-bold text-slate-300">当前层级环境与关键机制：</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-amber-300">🗝️ 宝箱与秘藏物资</span>
                  <span class="text-[10px] text-emerald-400">可搜寻</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  包含 3 口隐藏宝箱，内含以太万灵药、不死鸟之尾与对应层级精炼矿石。
                </p>
              </div>

              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-rose-400">⚠️ 环境陷阱与地貌危害</span>
                  <span class="text-[10px] text-rose-300">高危</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  存在晶石乱流毒雾，每行走 50 步全队受到 5% 最大生命值暗属性侵蚀。
                </p>
              </div>
            </div>
          </div>

          <!-- 探索指标 -->
          <div class="border-t border-slate-800 pt-4">
            <div class="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <span>📊</span> 场景探索全景指标解算
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">魔物遭遇率</div>
                <div class="text-lg font-mono font-bold text-rose-400 mt-1">18.5% / 步</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">宝箱收集率</div>
                <div class="text-lg font-mono font-bold text-amber-400 mt-1">4 / 4 宝箱</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">传送晶石锚点</div>
                <div class="text-lg font-mono font-bold text-cyan-400 mt-1">已激活双向</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div class="text-xs text-slate-400">通关评价</div>
                <div class="text-lg font-mono font-bold text-emerald-400 mt-1">S 级探索</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 1 列: 快速跳转与其他秘境索引 -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-4">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>⚔️</span> 关联首领战术
            </h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              该地宫深处驻留有守关大首领，可在挑战前查阅首领狂暴机制与推荐阵容配置。
            </p>
            <router-link to="/vble/boss-tactics">
              <n-button block type="error" round secondary>
                查看首领攻坚战术列表 →
              </n-button>
            </router-link>
          </div>

          <!-- 快速跳转至其他秘境 -->
          <div class="p-6 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-md space-y-3">
            <h2 class="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🏰</span> 秘境地城全景索引
            </h2>
            <div class="space-y-1.5 max-h-64 overflow-y-auto">
              <div
                v-for="d in allDungeons"
                :key="d.id"
                class="p-2 rounded-lg transition-colors flex items-center justify-between"
                :class="d.id === dungeon.id ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40' : 'hover:bg-slate-800 text-slate-300'"
              >
                <router-link :to="'/vble/dungeons/' + d.id" class="text-xs block truncate max-w-[180px]">
                  {{ d.name }}
                </router-link>
                <span class="text-[10px] text-amber-400 font-mono">{{ d.tier || 'T1' }}</span>
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
import { dungeonProgression } from '../config/dungeonProgression'
import { GAME_DATABASE } from '../data/gameDatabase'

const route = useRoute()
const dungeonId = computed(() => (route.params.id as string) || '')

const selectedFloor = ref(1)
const totalFloors = ref(5)
const exploreLevel = ref(25)

const allDungeons = computed(() => {
  const list: any[] = [...dungeonProgression]
  // 补充 GAME_DATABASE.maps
  for (const m of (GAME_DATABASE.maps || [])) {
    if (!list.some(d => d.id === m.id)) {
      list.push(m)
    }
  }
  return list
})

const dungeon = computed(() => {
  const foundInProg = dungeonProgression.find(p => p.id === dungeonId.value)
  const foundInMaps = (GAME_DATABASE.maps || []).find((m: any) => m.id === dungeonId.value)

  if (foundInMaps) {
    return {
      id: foundInMaps.id,
      name: foundInMaps.name,
      tier: 'T2',
      type: foundInMaps.type,
      features: foundInMaps.features,
      monsters: foundInMaps.monsters,
      desc: foundInMaps.desc
    }
  }

  if (foundInProg) {
    return {
      id: foundInProg.id,
      name: foundInProg.name,
      tier: foundInProg.tier || 'T1',
      type: '主线进阶秘境',
      features: foundInProg.desc || '地脉晶石交汇处，存在暗影裂缝与古代机关。',
      monsters: '原野凶兽与守护魔像',
      desc: foundInProg.desc || '双月大陆关键探索节点，栖息着强大的首领与未被发掘的远古宝箱。'
    }
  }

  return null
})
</script>

<style scoped>
</style>
