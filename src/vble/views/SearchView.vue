<template>
  <div class="search-page p-3 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-200">
    <!-- 头部横幅 -->
    <div class="header-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-cyan-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)] relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
              OMNI DATABASE SEARCH ENGINE
            </span>
            <span class="text-xs text-gray-400">全域全字段多维检索与关联图谱</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>🔍</span> 全域数据库索引与跨维度检索工坊
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            支持对魔物首领、秘境地宫、神兵装备、全职业矩阵、英雄角色、召唤兽契约、载具、支线、调合配方与天体星阵的全字段模糊即时搜索与三维关联图谱推演。
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <n-button
            type="primary"
            size="medium"
            round
            secondary
            class="shadow-md"
            @click="scrollToStudio"
          >
            <template #icon><span>🕸️</span></template>
            前往关联图谱沙盘
          </n-button>
          <router-link to="/vble">
            <n-button size="medium" round tertiary>
              返回游戏首页
            </n-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 搜索输入框与热门热搜词 -->
    <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div class="max-w-3xl mx-auto space-y-3">
        <n-input
          v-model:value="keyword"
          :input-props="{ 'aria-label': '全域数据库搜索' }"
          placeholder="输入任意怪物名、技能名、地宫名、职业名、装备或机制关键词 (如: 奥丁、欧米茄、粉色尾巴、巨人之药)..."
          size="large"
          round
          clearable
          class="shadow-xl text-base"
        >
          <template #prefix>🔍</template>
        </n-input>

        <!-- 热门关键词快速填入 -->
        <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span class="text-gray-400 font-medium">🔥 热门搜索推荐:</span>
          <button
            v-for="hot in hotKeywords"
            :key="hot"
            type="button"
            class="px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer text-xs"
            @click="keyword = hot"
          >
            {{ hot }}
          </button>
        </div>
      </div>
    </div>

    <!-- 分类过滤与统计导航 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="cat in filterCategories"
          :key="cat.id"
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
          :class="selectedCategory === cat.id ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-800 text-gray-300 hover:text-white'"
          @click="selectedCategory = cat.id"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
          <span class="text-[10px] opacity-75 font-mono">({{ getCategoryCount(cat.id) }})</span>
        </button>
      </div>

      <div class="text-xs text-gray-400 font-mono">
        全景匹配 <strong class="text-cyan-400 font-bold text-sm">{{ filteredResults.length }}</strong> 条档案
      </div>
    </div>

    <!-- 搜索结果网格列表 -->
    <div v-if="filteredResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="res in filteredResults"
        :key="res.key"
        role="button"
        tabindex="0"
        class="p-5 rounded-xl bg-[#0f1422]/90 border border-slate-800 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between cursor-pointer group"
        @click="openItem(res)"
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ res.icon }}</span>
              <div>
                <h3 class="text-base font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                  {{ res.name }}
                </h3>
                <span class="text-[11px] text-gray-400 font-mono">{{ res.sourcePath }}</span>
              </div>
            </div>
            <n-tag size="tiny" :type="res.tagType">{{ res.categoryName }}</n-tag>
          </div>

          <p class="text-xs text-gray-300 line-clamp-3 leading-relaxed">
            {{ res.desc }}
          </p>

          <div v-if="res.extra" class="p-2 rounded bg-slate-950/70 border border-slate-850 text-amber-300/90 font-mono text-xs truncate">
            {{ res.extra }}
          </div>
        </div>

        <div class="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-500">
          <span>标识: {{ res.key }}</span>
          <span class="text-cyan-400 font-medium group-hover:underline">点击展开详情 ➔</span>
        </div>
      </div>
    </div>

    <!-- 无结果提示 -->
    <div v-else-if="keyword.trim()" class="text-center py-16 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
      <div class="text-4xl">🔭</div>
      <div class="text-base font-bold text-gray-300">未检索到与 “{{ keyword }}” 相关的档案内容</div>
      <p class="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
        请尝试简化搜索词或选用上方热门词汇。本引擎已支持魔物、地城、神装、职业、角色、召唤兽、载具、支线与调合全域跨表搜索。
      </p>
    </div>

    <!-- 初始引导 -->
    <div v-else class="text-center py-12 p-8 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2">
      <div class="text-3xl">💡</div>
      <div class="text-sm font-semibold text-gray-300">请输入关键字开启全景检索</div>
      <p class="text-xs text-gray-500">已建立全域 10 大子系统超 300+ 核心条目倒排索引缓存</p>
    </div>

    <!-- 核心实机推演沙盘：三级深度关联图谱演算工坊 -->
    <div id="relation-studio" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1424] via-[#101b30] to-[#0a0f1d] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CROSS-SYSTEM RELATION MATRIX
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🕸️</span> 全域词条三维深度关联图谱演练沙盘
            </h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            对齐 Godot 引擎 omni_database_search.gd 倒排索引：全息推演单个核心词汇跨越职业、首领、神装与秘境的三维网状羁绊。
          </p>
        </div>

        <div class="flex items-center gap-2">
          <n-button size="small" secondary type="warning" @click="resetStudioParams">
            重置参数
          </n-button>
          <n-button size="small" type="primary" class="font-bold shadow" @click="triggerOneClickAnalysis">
            ⚡ 拓扑深度解析
          </n-button>
        </div>
      </div>

      <!-- 控制面板与输入栅格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 第 1 栏：核心词汇选定与拓扑深度 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div class="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <span>🎯</span> 焦点索引词汇 (Focal Word)
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="text-gray-400 block mb-1">选定焦点分析条目</label>
              <n-select
                v-model:value="selectedFocalWord"
                :options="focalWordOptions"
                size="small"
              />
            </div>

            <div>
              <div class="flex justify-between items-center text-gray-300 mb-1">
                <span>拓扑遍历关联深度 (Graph Depth):</span>
                <span class="font-mono text-cyan-400 font-bold text-sm">{{ graphDepth }} 级跃迁</span>
              </div>
              <n-slider v-model:value="graphDepth" :min="1" :max="3" :step="1" />
            </div>

            <div class="pt-2 border-t border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【隐藏剧情与掉落反向追踪】:</span>
                <n-switch v-model:value="enableReverseTrace" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-300">开启【跨职业神装穿戴羁绊校验】:</span>
                <n-switch v-model:value="enableJobSynergyCheck" size="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 栏：拓扑关联节点展开 -->
        <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div class="text-sm font-bold text-amber-300 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><span>🔗</span> 拓扑网状节点树</span>
            <span class="text-[11px] text-gray-400 font-mono">{{ currentAssociation.nodes.length }} 个节点</span>
          </div>

          <div class="space-y-2 text-xs overflow-y-auto max-h-56 pr-1">
            <div
              v-for="node in currentAssociation.nodes"
              :key="node.name"
              class="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between"
            >
              <div>
                <span class="font-bold text-gray-200">{{ node.icon }} {{ node.name }}</span>
                <div class="text-[10px] text-cyan-400 font-mono mt-0.5">{{ node.relation }}</div>
              </div>
              <n-tag size="tiny" :type="node.tagType">{{ node.category }}</n-tag>
            </div>
          </div>
        </div>

        <!-- 第 3 栏：全息关联结算面板 -->
        <div class="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📊</span> 关联网络拓扑健康度</span>
              <n-tag size="tiny" type="success">100% 连通完整</n-tag>
            </div>

            <div class="mt-4 space-y-3">
              <!-- 关联紧密度评分 -->
              <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-center">
                <div class="text-[11px] text-gray-400">词条综合关联指数 (Affinity Index)</div>
                <div class="text-3xl font-black font-mono mt-1 tracking-wider text-cyan-400">
                  {{ currentAssociation.affinityScore }} Pt
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  {{ currentAssociation.verdict }}
                </div>
              </div>

              <!-- 拓扑判定 -->
              <div class="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div class="text-amber-400 font-bold flex items-center gap-1">
                  <span>✨ 核心关联链条:</span>
                </div>
                <div class="text-gray-300 text-[11px] leading-relaxed">
                  {{ currentAssociation.chainDesc }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 text-[10px] text-gray-500 border-t border-slate-800 flex items-center justify-between">
            <span>索引算法: omni_database_search.gd</span>
            <span class="text-cyan-400">VBLE Search Engine v2.2.214</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Godot 4.x 核心实机代码展台 -->
    <div class="p-6 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">📜</span>
          <span class="font-mono text-sm font-bold text-cyan-300">omni_database_search.gd (Godot 4.x 倒排全息索引算法)</span>
        </div>
        <n-button size="tiny" secondary type="info" @click="copyGodotCode">
          {{ copiedCode ? '✓ 已复制代码' : '复制代码' }}
        </n-button>
      </div>

      <pre class="p-4 rounded-xl bg-slate-950 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed border border-slate-900">{{ godotCodeText }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { mixRecipes } from '../config/mixRecipes'
import { bossTacticsList } from '../config/bossTactics'
import { jobsList } from '../config/jobsConfig'

const route = useRoute()
const message = useMessage()
const gameStore = useGameStore()

const keyword = ref((route.query.q as string) || '')
const selectedCategory = ref('all')
const selectedFocalWord = ref('odin')
const graphDepth = ref(2)
const enableReverseTrace = ref(true)
const enableJobSynergyCheck = ref(true)
const copiedCode = ref(false)

const hotKeywords = ['巴哈姆特', '奥丁', '欧米茄', '神龙', '巨人之药', '粉色尾巴', '魔法剑士', '斩铁剑', '飞空艇']

watch(
  () => route.query.q,
  val => {
    if (typeof val === 'string') {
      keyword.value = val
    } else if (val == null) {
      keyword.value = ''
    }
  }
)

const filterCategories = [
  { id: 'all', name: '全部词条', icon: '🌐' },
  { id: 'monster', name: '魔物首领', icon: '👾' },
  { id: 'gear', name: '神装装备', icon: '⚔️' },
  { id: 'job', name: '职业矩阵', icon: '🛡️' },
  { id: 'hero', name: '英雄传记', icon: '👥' },
  { id: 'map', name: '秘境地城', icon: '🏰' },
  { id: 'summon', name: '幻兽契约', icon: '🐉' },
  { id: 'mix', name: '调合药剂', icon: '⚗️' },
  { id: 'quest', name: '史诗支线', icon: '📜' }
]

const focalWordOptions = [
  { label: '黑铁骑皇 · 奥丁 (Odin) 核心拓扑', value: 'odin' },
  { label: '究极毁灭兵器 · 欧米茄 (Omega) 核心拓扑', value: 'omega' },
  { label: '巨人之药 (Giant Drink) 炼金拓扑', value: 'giant_drink' },
  { label: '天界龙王 · 巴哈姆特 (Bahamut) 核心拓扑', value: 'bahamut' }
]

// 全域跨系统全字段模糊索引引擎
const allIndexedResults = computed(() => {
  const q = keyword.value.toLowerCase().trim()
  if (!q) return []

  const results: any[] = []
  const db = gameStore.db

  // 1. 魔物与首领
  ;(db.monsters || []).forEach((m: any) => {
    const text = (m.name + (m.rankText || '') + (m.location || '') + (m.skills?.join(' ') || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `monster-${m.id}`,
        id: m.id,
        name: m.name,
        category: 'monster',
        categoryName: '魔物首领',
        icon: '👾',
        tagType: 'error',
        sourcePath: '/vble/monsters',
        desc: `等级 Lv.${m.level} · HP ${m.hp} · 弱点: ${m.weakness || '无'}`,
        extra: `常驻技能: ${(m.skills || []).join('、')}`,
        raw: m
      })
    }
  })

  // 2. 秘境地城
  ;(db.maps || []).forEach((map: any) => {
    const text = (map.name + (map.desc || '') + (map.boss || '') + (map.tier || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `map-${map.id}`,
        id: map.id,
        name: map.name,
        category: 'map',
        categoryName: '秘境地城',
        icon: '🏰',
        tagType: 'success',
        sourcePath: '/vble/dungeons',
        desc: map.desc,
        extra: `层级: ${map.tier || '未收录'} · 驻留首领: ${map.boss || '未收录'}`,
        raw: map
      })
    }
  })

  // 3. 神兵装备与七色尾巴
  ;(db.equipment || []).forEach((eq: any) => {
    const text = (eq.name + (eq.job || '') + (eq.type || '') + (eq.effect || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `eq-${eq.id}`,
        id: eq.id,
        name: eq.name,
        category: 'gear',
        categoryName: '神兵装备',
        icon: '⚔️',
        tagType: 'warning',
        sourcePath: '/vble/equipment',
        desc: eq.effect,
        extra: `${eq.type} · ${eq.stats}`,
        raw: eq
      })
    }
  })
  ;(db.tail_weapons || []).forEach((tw: any) => {
    const text = (tw.name + tw.tail_source + tw.type + tw.job + tw.effect).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `tail-${tw.id}`,
        id: tw.id,
        name: tw.name,
        category: 'gear',
        categoryName: '彩尾神器',
        icon: '🦊',
        tagType: 'warning',
        sourcePath: '/vble/economy',
        desc: tw.effect,
        extra: `兑换素材: ${tw.tail_source} · ${tw.stats}`,
        raw: tw
      })
    }
  })

  // 4. 全职业矩阵
  jobsList.forEach((job: any) => {
    const text = (job.name + (job.desc || '') + (job.type || '') + (job.skills?.map((s: any) => s.name).join(' ') || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `job-${job.id}`,
        id: job.id,
        name: job.name,
        category: 'job',
        categoryName: '职业矩阵',
        icon: '🛡️',
        tagType: 'info',
        sourcePath: '/vble/jobs',
        desc: job.desc,
        extra: `系别: ${job.type} · 核心技: ${(job.skills || []).map((s: any) => s.name).join('、')}`,
        raw: job
      })
    }
  })

  // 4.5 史诗首领攻坚机制
  bossTacticsList.forEach((b: any) => {
    const text = (b.name + b.title + b.location + b.weakness + b.keyGimmick).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `boss-${b.id}`,
        id: b.id,
        name: b.name,
        category: 'monster',
        categoryName: '首领攻坚',
        icon: '👹',
        tagType: 'error',
        sourcePath: '/vble/boss-tactics',
        desc: `【${b.title}】${b.keyGimmick}`,
        extra: `弱点: ${b.weakness} · 掉落: ${b.rewards}`,
        raw: b
      })
    }
  })

  // 5. 英雄角色
  ;(db.characters || []).forEach((char: any) => {
    const text = (char.name + (char.title || '') + (char.bio || '') + (char.signature_skill || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `hero-${char.id}`,
        id: char.id,
        name: char.name,
        category: 'hero',
        categoryName: '英雄传记',
        icon: '👥',
        tagType: 'success',
        sourcePath: '/vble/characters',
        desc: char.bio,
        extra: `极意绝技: ${char.signature_skill}`,
        raw: char
      })
    }
  })

  // 6. 幻兽契约
  ;(db.summons || []).forEach((s: any) => {
    const text = (s.name + (s.skill_name || '') + (s.skill_desc || '') + (s.lore || '')).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `summon-${s.id}`,
        id: s.id,
        name: s.name,
        category: 'summon',
        categoryName: '幻兽契约',
        icon: '🐉',
        tagType: 'info',
        sourcePath: '/vble/summons',
        desc: s.skill_desc,
        extra: `${s.skill_name} (${s.cost}) · 试炼: ${s.trial_dungeon}`,
        raw: s
      })
    }
  })

  // 7. 药剂师调合配方
  mixRecipes.forEach(r => {
    const text = (r.name + r.itemA + r.itemB + r.effect).toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `mix-${r.name}`,
        id: r.name,
        name: r.name,
        category: 'mix',
        categoryName: '调合药剂',
        icon: '⚗️',
        tagType: 'warning',
        sourcePath: '/vble/economy',
        desc: r.effect,
        extra: `合成公式: ${r.itemA} + ${r.itemB} (${r.tier}品阶)`,
        raw: r
      })
    }
  })

  // 8. 史诗支线
  ;(db.sidequests || []).forEach((sq: any) => {
    const name = sq.title || sq.name || ''
    const desc = sq.desc || sq.description || ''
    const reward = sq.reward || sq.rewards || ''
    const text = [sq.id, name, sq.aliases?.join(' '), sq.region || sq.location, sq.trigger, reward, desc].filter(Boolean).join(' ').toLowerCase()
    if (text.includes(q)) {
      results.push({
        key: `quest-${sq.id}`,
        id: sq.id,
        name,
        category: 'quest',
        categoryName: '史诗支线',
        icon: '📜',
        tagType: 'warning',
        sourcePath: '/vble/sidequests',
        desc,
        extra: `奖励: ${reward} · 触发: ${sq.region || sq.location}`,
        raw: sq
      })
    }
  })

  return results
})

const filteredResults = computed(() => {
  if (selectedCategory.value === 'all') return allIndexedResults.value
  return allIndexedResults.value.filter(r => r.category === selectedCategory.value)
})

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return allIndexedResults.value.length
  return allIndexedResults.value.filter(r => r.category === catId).length
}

const openItem = (item: any) => {
  if (item.raw) {
    gameStore.openDetail(item.raw)
  }
}

const scrollToStudio = () => {
  const el = document.getElementById('relation-studio')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetStudioParams = () => {
  selectedFocalWord.value = 'odin'
  graphDepth.value = 2
  enableReverseTrace.value = true
  enableJobSynergyCheck.value = true
  message.info('关联图谱沙盘参数已恢复默认')
}

const triggerOneClickAnalysis = () => {
  message.success(`🕸️ 拓扑解析完毕！${selectedFocalWord.value} 关联度评分为 ${currentAssociation.value.affinityScore} Pt`)
}

// 拓扑图谱动态推演
const currentAssociation = computed(() => {
  const focal = selectedFocalWord.value

  if (focal === 'odin') {
    return {
      affinityScore: 98,
      verdict: '极古战魂至高连通枢纽',
      chainDesc: '幻兽奥丁 ➔ 加戈古要塞地下暗殿 ➔ 60秒真·斩铁剑 ➔ 骑士与自由人神兵 ➔ 时魔道士加速克制',
      nodes: [
        { name: '黑铁骑皇 · 奥丁', category: '幻兽契约', icon: '🐉', relation: '核心实体', tagType: 'info' as const },
        { name: '加戈古古要塞地下暗殿', category: '秘境地城', icon: '🏰', relation: '1级栖息地', tagType: 'success' as const },
        { name: '真·斩铁剑 (Zantetsuken)', category: '神兵绝技', icon: '⚔️', relation: '1级破界杀招', tagType: 'warning' as const },
        { name: '圣骑士 (Paladin)', category: '职业矩阵', icon: '🛡️', relation: '2级契合契约者', tagType: 'info' as const },
        { name: '60秒斩铁生死倒计时', category: '首领机制', icon: '👹', relation: '3级转阶段门禁', tagType: 'error' as const }
      ]
    }
  } else if (focal === 'omega') {
    return {
      affinityScore: 95,
      verdict: '虚空深渊超古代科技兵器',
      chainDesc: '欧米茄巡逻 ➔ 次元之隙齿轮瀑布 ➔ 极光波反击 ➔ 魔法剑雷牙+乱打克制 ➔ 欧米茄勋章',
      nodes: [
        { name: '毁灭兵器 · 欧米茄', category: '史诗首领', icon: '🤖', relation: '核心实体', tagType: 'error' as const },
        { name: '次元之隙机械齿轮遗迹', category: '秘境地城', icon: '🏰', relation: '1级巡逻星域', tagType: 'success' as const },
        { name: '魔法剑士 + 乱打八连击', category: '职业战术', icon: '🛡️', relation: '1级破防唯一解', tagType: 'info' as const },
        { name: '欧米茄勋章 (Omega Medal)', category: '战利品', icon: '🏆', relation: '2级讨伐证明', tagType: 'warning' as const }
      ]
    }
  } else if (focal === 'giant_drink') {
    return {
      affinityScore: 92,
      verdict: '药剂师质变生命突破奥义',
      chainDesc: '巨人之血+圣水 ➔ 调合工坊 ➔ 生命上限200%翻倍 ➔ 扛下神龙与新埃克斯迪斯灭团大招',
      nodes: [
        { name: '巨人之药 (Giant Drink)', category: '调合药剂', icon: '⚗️', relation: '核心产物', tagType: 'warning' as const },
        { name: '巨人之血 (Giant Blood)', category: '基础素材', icon: '🧪', relation: '主料 A', tagType: 'info' as const },
        { name: '圣水 (Holy Water)', category: '基础素材', icon: '💧', relation: '副料 B', tagType: 'info' as const },
        { name: '药效加倍 (Pharmacology)', category: '职业被动', icon: '✨', relation: '2级效能翻倍', tagType: 'success' as const }
      ]
    }
  } else {
    return {
      affinityScore: 99,
      verdict: '双月星空亿万核爆龙神之祖',
      chainDesc: '巴哈姆特 ➔ 苍穹绝壁龙栖岭 ➔ 亿万核爆无视魔抗 ➔ 龙骑士融合技【龙王破灭击】',
      nodes: [
        { name: '龙王 · 巴哈姆特', category: '幻兽契约', icon: '🐉', relation: '核心实体', tagType: 'info' as const },
        { name: '苍穹绝壁 · 龙栖岭极顶峰', category: '秘境地城', icon: '🏰', relation: '1级试炼绝峰', tagType: 'success' as const },
        { name: '亿万核爆 (Megaflare)', category: '真实魔击', icon: '💥', relation: '1级贯穿神技', tagType: 'warning' as const },
        { name: '龙骑士 (Dragoon)', category: '职业矩阵', icon: '🛡️', relation: '2级融合技伴生', tagType: 'info' as const }
      ]
    }
  }
})

// Godot 代码
const godotCodeText = `## omni_database_search.gd
## 《光之战士：时空裂隙》全域跨系统倒排模糊索引核心引擎
extends Node
class_name OmniDatabaseSearch

var _inverted_index: Dictionary = {}

func build_index(data_source: Dictionary) -> void:
	_inverted_index.clear()
	for category in data_source.keys():
		var items = data_source[category]
		for item in items:
			var combined_text = (item.get("name", "") + " " + item.get("desc", "")).to_lower()
			for token in combined_text.split(" "):
				if token.length() > 1:
					if not _inverted_index.has(token):
						_inverted_index[token] = []
					_inverted_index[token].append(item)

func search(query: String) -> Array:
	var q = query.strip_edges().to_lower()
	if q.is_empty():
		return []
	return _inverted_index.get(q, [])
`

const copyGodotCode = async () => {
  try {
    await navigator.clipboard.writeText(godotCodeText)
    copiedCode.value = true
    message.success('已复制 omni_database_search.gd 核心实机代码！')
    setTimeout(() => {
      copiedCode.value = false
    }, 3000)
  } catch {
    message.error('复制失败，请手动选取复制')
  }
}
</script>

<style scoped>
.text-glow-cyan {
  text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}
</style>
