<template>
  <div class="modifier-page p-3 sm:p-5 max-w-7xl mx-auto space-y-8">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="error" size="small" round class="mb-2">GM Character & Stat Modifier Studio</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-amber mb-2">🛠️ 全域属性修改器 (1~255级无上限)</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        支持直接修改角色 1 级初始属性与成长步进、输入血量即时逆向反推等级、关联场景地下城自动定级、以及一键保存全局生效
      </p>
    </div>

    <!-- 顶层快捷操作条：角色切换 + 场景快速联动 -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#121626]/90 border border-slate-700/60 p-4 rounded-2xl shadow-xl">
      <!-- 选择要修改的目标角色 -->
      <div class="md:col-span-6 space-y-1.5">
        <label class="text-xs text-gray-400 block font-semibold">1. 选择需要修改属性的英雄角色:</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div
            v-for="char in characters"
            :key="char.id"
            class="p-2 rounded-lg border text-center cursor-pointer transition-all"
            :class="selectedCharId === char.id ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'border-slate-800 bg-slate-900/60 text-gray-300 hover:border-slate-700'"
            @click="handleSelectChar(char.id)"
          >
            <div class="text-xs sm:text-sm">{{ char.name }}</div>
            <div class="text-[10px] text-gray-400 truncate">{{ char.title }}</div>
          </div>
        </div>
      </div>

      <!-- 场景地宫联动自动定级 -->
      <div class="md:col-span-6 space-y-1.5">
        <label class="text-xs text-gray-400 block font-semibold">2. 关联场景地下城 (自动调节推荐等级):</label>
        <div class="flex gap-2">
          <n-select
            v-model:value="selectedSceneId"
            :options="sceneOptions"
            size="small"
            style="flex: 1;"
            @update:value="handleSceneChange"
          />
          <n-button size="small" type="warning" secondary @click="applySceneLevel">
            应用场景等级
          </n-button>
        </div>
        <div class="text-[11px] text-cyan-300 flex items-center justify-between pt-1">
          <span>当前场景: <strong>{{ currentSceneName }}</strong></span>
          <span>推荐等级: <strong class="text-amber-400 font-mono">Lv. {{ currentSceneLevel }}</strong></span>
        </div>
      </div>
    </div>

    <!-- 逆向反推器：输入属性数值 (如输入 500 血量) 即时反推等级 -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-purple-950/30 border border-amber-500/40 shadow-lg">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
        <div class="flex items-center gap-2">
          <span class="text-xl">🧮</span>
          <h3 class="text-base sm:text-lg font-bold text-amber-300">输入属性数值反推等级 (如输入 500 血量反推等级)</h3>
        </div>
        <n-tag size="tiny" type="warning">逆向求解算法</n-tag>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-7 space-y-3 text-xs">
          <p class="text-gray-300 leading-relaxed">
            直接在下方输入框中输入期望达成的血量或力量，系统将实时计算逆向反推出所需的<strong>角色等级 (Lv.1 ~ 255)</strong>：
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-gray-400 block mb-1">输入期望生命值 (HP):</label>
              <n-input-number
                v-model:value="targetInputHP"
                :min="50"
                :max="9999999"
                :step="50"
                placeholder="例如输入 500"
                size="small"
                @update:value="handleReverseHPInput"
              >
                <template #suffix>HP</template>
              </n-input-number>
            </div>

            <div>
              <label class="text-gray-400 block mb-1">输入期望力量值 (STR):</label>
              <n-input-number
                v-model:value="targetInputSTR"
                :min="10"
                :max="999999"
                :step="10"
                placeholder="例如输入 300"
                size="small"
                @update:value="handleReverseSTRInput"
              >
                <template #suffix>点</template>
              </n-input-number>
            </div>
          </div>

          <!-- 快速血量预设 -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            <span class="text-gray-400">快捷血量快选:</span>
            <n-button
              v-for="hp in [300, 500, 1000, 3000, 8000, 20000, 50000]"
              :key="hp"
              size="tiny"
              quaternary
              type="info"
              @click="quickSetHP(hp)"
            >
              {{ hp }} HP
            </n-button>
          </div>
        </div>

        <!-- 逆向反推解算结果展示卡 -->
        <div class="lg:col-span-5 p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 text-center space-y-2.5">
          <div class="text-xs text-gray-400">根据当前设置反推得出目标等级</div>
          <div class="text-3xl font-black text-amber-400 font-mono">
            Lv. {{ reverseSolvedLevel }}
          </div>
          <div class="text-xs text-gray-300">
            实际达成血量: <strong class="text-red-400 font-mono">{{ getEstimatedHP(reverseSolvedLevel) }} HP</strong>
          </div>
          <n-button size="small" type="primary" block @click="applyReverseLevel">
            一键将当前等级应用为 Lv.{{ reverseSolvedLevel }}
          </n-button>
        </div>
      </div>
    </div>

    <!-- 核心修改工作台：左侧直接修改属性 VS 右侧实时演算与修改前后对比 -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- 左侧：直接属性输入修改区 (1~255级完全无上限) -->
      <div class="lg:col-span-7 space-y-5">
        <n-card title="⚙️ 属性直接输入修改工作台 (1~255级无上限)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl shadow-lg">
          <div class="space-y-4 text-xs">
            
            <!-- 等级设置 (支持滑块 + 数字输入框 1 ~ 255) -->
            <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-gray-200">当前角色等级 (Level):</span>
                <div class="flex items-center gap-1.5">
                  <n-input-number
                    v-model:value="currentLevel"
                    :min="1"
                    :max="255"
                    size="small"
                    style="width: 100px;"
                  />
                  <span class="text-sm font-bold text-amber-400">级</span>
                </div>
              </div>
              <n-slider v-model:value="currentLevel" :min="1" :max="255" :step="1" />
              <div class="flex justify-between text-[10px] text-gray-500">
                <span>Lv.1 序章</span>
                <span>Lv.70 融合</span>
                <span>Lv.150 深渊</span>
                <span>Lv.255 巅峰极意</span>
              </div>
            </div>

            <!-- 六维基础属性与每级成长直接修改网格 -->
            <div class="space-y-2">
              <div class="text-gray-300 font-semibold flex items-center justify-between">
                <span>六维基础属性修改 (支持自由修改初始点数与成长步进):</span>
                <span class="text-[11px] text-amber-400">公式: 最终属性 = 初始值 + (等级-1) × 成长步进</span>
              </div>

              <!-- 力量 STR -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                <div class="col-span-3 font-bold text-red-400">力量 (STR):</div>
                <div class="col-span-4">
                  <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                  <n-input-number v-model:value="editStats.strBase" :min="1" size="tiny" />
                </div>
                <div class="col-span-5">
                  <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.strGrowth }}/级)</span>
                  <n-input-number v-model:value="editStats.strGrowth" :min="1" size="tiny" />
                </div>
              </div>

              <!-- 敏捷 AGI -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                <div class="col-span-3 font-bold text-green-400">敏捷 (AGI):</div>
                <div class="col-span-4">
                  <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                  <n-input-number v-model:value="editStats.agiBase" :min="1" size="tiny" />
                </div>
                <div class="col-span-5">
                  <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.agiGrowth }}/级)</span>
                  <n-input-number v-model:value="editStats.agiGrowth" :min="1" size="tiny" />
                </div>
              </div>

              <!-- 体质 VIT -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                <div class="col-span-3 font-bold text-amber-400">体质 (VIT):</div>
                <div class="col-span-4">
                  <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                  <n-input-number v-model:value="editStats.vitBase" :min="1" size="tiny" />
                </div>
                <div class="col-span-5">
                  <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.vitGrowth }}/级)</span>
                  <n-input-number v-model:value="editStats.vitGrowth" :min="1" size="tiny" />
                </div>
              </div>

              <!-- 魔力 MAG -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                <div class="col-span-3 font-bold text-cyan-400">魔力 (MAG):</div>
                <div class="col-span-4">
                  <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                  <n-input-number v-model:value="editStats.magBase" :min="1" size="tiny" />
                </div>
                <div class="col-span-5">
                  <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.magGrowth }}/级)</span>
                  <n-input-number v-model:value="editStats.magGrowth" :min="1" size="tiny" />
                </div>
              </div>

              <!-- 精神 SPR -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                <div class="col-span-3 font-bold text-blue-400">精神 (SPR):</div>
                <div class="col-span-4">
                  <span class="text-[10px] text-gray-400 block">1 级初始点数</span>
                  <n-input-number v-model:value="editStats.sprBase" :min="1" size="tiny" />
                </div>
                <div class="col-span-5">
                  <span class="text-[10px] text-gray-400 block">每级成长点数 (+{{ editStats.sprGrowth }}/级)</span>
                  <n-input-number v-model:value="editStats.sprGrowth" :min="1" size="tiny" />
                </div>
              </div>

              <!-- 基础 HP 与 MP 直接修改 -->
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center">
                <div class="col-span-3 font-bold text-red-500">生命值 (HP):</div>
                <div class="col-span-4">
                  <span class="text-[10px] text-gray-400 block">1 级初始 HP</span>
                  <n-input-number v-model:value="editStats.hpBase" :min="50" size="tiny" />
                </div>
                <div class="col-span-5">
                  <span class="text-[10px] text-gray-400 block">每级成长 HP (+{{ editStats.hpGrowth }})</span>
                  <n-input-number v-model:value="editStats.hpGrowth" :min="10" size="tiny" />
                </div>
              </div>
            </div>

            <!-- 操作按钮：保存生效、重置默认、一键满级超模 -->
            <div class="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
              <n-button type="success" size="medium" @click="handleSaveAndApply">
                💾 保存并全局生效
              </n-button>
              <n-button type="warning" size="medium" secondary @click="handleMaxOverpower">
                ⚡ 一键满级 255 巅峰超神
              </n-button>
              <n-button type="default" size="medium" quaternary @click="handleResetDefault">
                🔄 恢复默认设定
              </n-button>
            </div>
          </div>
        </n-card>
      </div>

      <!-- 右侧：实时计算结果与修改前后对比面板 -->
      <div class="lg:col-span-5 space-y-5">
        <!-- 实时演算看板 -->
        <div class="p-5 bg-gradient-to-br from-[#1b223d] via-[#121629] to-[#0c101d] rounded-2xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,243,255,0.15)] space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs text-cyan-300 font-mono">MODIFIED REAL-TIME STATS</span>
              <h3 class="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                <span>{{ currentChar?.name }}</span>
                <span class="text-xs text-amber-400 font-mono">Lv. {{ currentLevel }}</span>
              </h3>
            </div>
            <div class="text-right">
              <div class="text-[10px] text-gray-400">实时战斗力评分</div>
              <div class="text-2xl font-black text-amber-300 font-mono">{{ computedCombatPower }}</div>
            </div>
          </div>

          <!-- 核心血量与法力值 -->
          <div class="space-y-2 text-xs">
            <div class="p-3 bg-red-950/30 rounded-xl border border-red-900/40 flex items-center justify-between">
              <div>
                <span class="text-gray-400 block text-[10px]">HP 当前总生命上限</span>
                <strong class="text-2xl font-black text-red-400 font-mono">{{ computedFinalHP.toLocaleString() }}</strong>
              </div>
              <n-tag size="small" type="error">生命潜能</n-tag>
            </div>

            <div class="p-3 bg-cyan-950/30 rounded-xl border border-cyan-900/40 flex items-center justify-between">
              <div>
                <span class="text-gray-400 block text-[10px]">MP 当前总魔力上限</span>
                <strong class="text-2xl font-black text-cyan-300 font-mono">{{ computedFinalMP.toLocaleString() }}</strong>
              </div>
              <n-tag size="small" type="info">法力池</n-tag>
            </div>
          </div>

          <!-- 六维面板 -->
          <div class="grid grid-cols-3 gap-2 text-xs text-center">
            <div class="p-2 bg-slate-900/80 rounded border border-slate-800">
              <span class="text-[10px] text-gray-400 block">力量</span>
              <strong class="text-red-400 text-base font-mono">{{ computedFinalSTR }}</strong>
            </div>
            <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
              <span class="text-[10px] text-gray-400 block">敏捷</span>
              <strong class="text-green-400 text-base font-mono">{{ computedFinalAGI }}</strong>
            </div>
            <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
              <span class="text-[10px] text-gray-400 block">体质</span>
              <strong class="text-amber-400 text-base font-mono">{{ computedFinalVIT }}</strong>
            </div>
            <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
              <span class="text-[10px] text-gray-400 block">魔力</span>
              <strong class="text-cyan-400 text-base font-mono">{{ computedFinalMAG }}</strong>
            </div>
            <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
              <span class="text-[10px] text-gray-400 block">精神</span>
              <strong class="text-blue-400 text-base font-mono">{{ computedFinalSPR }}</strong>
            </div>
            <div class="p-2 bg-slate-900/80 rounded border border-slate-800 text-center">
              <span class="text-[10px] text-gray-400 block">物攻</span>
              <strong class="text-yellow-300 text-base font-mono">{{ computedPAtk }}</strong>
            </div>
          </div>
        </div>

        <!-- 修改前后对照表 (Before VS After) -->
        <n-card title="📊 修改前后数值差异对比 (Before VS After)" size="small" class="border border-slate-700/60 bg-[#121626]/90 rounded-2xl">
          <div class="space-y-2 text-xs">
            <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
              <span class="text-gray-400">生命值 (HP):</span>
              <div class="flex items-center gap-2">
                <span class="text-gray-400 line-through font-mono">{{ originalBaseHP }}</span>
                <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalHP.toLocaleString() }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
              <span class="text-gray-400">力量 (STR):</span>
              <div class="flex items-center gap-2">
                <span class="text-gray-400 line-through font-mono">{{ originalBaseSTR }}</span>
                <span class="text-green-400 font-bold font-mono">&rarr; {{ computedFinalSTR }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
              <span class="text-gray-400">物理攻击 (P.ATK):</span>
              <div class="flex items-center gap-2">
                <span class="text-gray-400 line-through font-mono">{{ originalBasePAtk }}</span>
                <span class="text-green-400 font-bold font-mono">&rarr; {{ computedPAtk }}</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-500 pt-1 leading-relaxed">
              * 点击「保存并全局生效」后，修改后的数值将永久保存在浏览器本地，全站所有角色页面与伤害推演均将以修改后的数值为准。
            </p>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import { WORLD_SCENES } from '../config/scenesConfig'

const route = useRoute()

const gameStore = useGameStore()
const message = useMessage()

const characters = computed(() => gameStore.db.characters || [])
const selectedCharId = ref('li_chuan')
const currentLevel = ref(1)

const currentChar = computed(() => {
  return characters.value.find((c: any) => c.id === selectedCharId.value) || characters.value[0]
})

// 场景与地下城推荐等级列表
const baseSceneOptions = [
  { label: '始源神殿外围 (序章启程 · 推荐 Lv.1~5)', value: 'map-intro', level: 1, name: '始源神殿外围' },
  { label: '风之神殿 顶部神圣祭坛 (推荐 Lv.10)', value: 'wind-shrine', level: 10, name: '风之神殿' },
  { label: '托尔纳运河 水道 (推荐 Lv.15)', value: 'torna-canal', level: 15, name: '托尔纳运河' },
  { label: '沃鲁斯水之塔 (推荐 Lv.20)', value: 'worus-water', level: 20, name: '沃鲁斯水之塔' },
  { label: '卡尔纳克城堡 逃生倒计时 (推荐 Lv.28)', value: 'karnak-castle', level: 28, name: '卡尔纳克城堡' },
  { label: '古代大图书馆 (推荐 Lv.35)', value: 'ancient-library', level: 35, name: '古代大图书馆' },
  { label: '朗卡浮空遗迹 核心中枢 (推荐 Lv.45)', value: 'ronka-ruins', level: 45, name: '朗卡浮空遗迹' },
  { label: '穆亚大森林 圣树封印 (推荐 Lv.55)', value: 'moore-forest', level: 55, name: '穆亚大森林' },
  { label: '艾克斯德斯要塞 虚空王座 (推荐 Lv.70)', value: 'exdeath-castle', level: 70, name: '艾克斯德斯要塞' },
  { label: '双子分歧之塔 魔物分流 (推荐 Lv.85)', value: 'fork-tower', level: 85, name: '双子分歧之塔' },
  { label: '大海沟熔岩地宫 深渊 (推荐 Lv.100)', value: 'great-trench', level: 100, name: '大海沟熔岩地宫' },
  { label: '沉没沃鲁斯塔 模仿士试炼 (推荐 Lv.115)', value: 'sunken-worus', level: 115, name: '沉没沃鲁斯塔' },
  { label: '翡翠冥河通道 (推荐 Lv.135)', value: 'emerald-river', level: 135, name: '翡翠冥河通道' },
  { label: '万魔殿 冥界王座 (推荐 Lv.160)', value: 'pandemonium', level: 160, name: '万魔殿' },
  { label: '奈落地狱 熔岩十层 (推荐 Lv.185)', value: 'naraku-abyss', level: 185, name: '奈落地狱' },
  { label: '天空要塞浮游城 (推荐 Lv.210)', value: 'floating-city', level: 210, name: '天空要塞浮游城' },
  { label: '月之地下溪谷 12F 龙穴 (推荐 Lv.235)', value: 'lunar-valley', level: 235, name: '月之地下溪谷 12F' },
  { label: '次元之隙 & 终焉虚无核心 (满级极意 · 推荐 Lv.255)', value: 'void-core', level: 255, name: '次元之隙 & 终焉虚无核心' }
]

// 现有城镇入口传原目录ID，只为有效来源补一个选项，不猜同名地宫。
const sceneOptions = computed(() => {
  const sceneId = route.query.sceneId
  const scene = typeof sceneId === 'string' ? WORLD_SCENES.find(item => item.id === sceneId) : undefined
  if (!scene || baseSceneOptions.some(item => item.value === scene.id)) return baseSceneOptions
  return [...baseSceneOptions, {
    label: `${scene.name} (推荐 Lv.${scene.recommendedLevel})`,
    value: scene.id,
    level: scene.recommendedLevel,
    name: scene.name
  }]
})

const selectedSceneId = ref('wind-shrine')

const currentSceneName = computed(() => {
  return sceneOptions.value.find(s => s.value === selectedSceneId.value)?.name || '风之神殿'
})

const currentSceneLevel = computed(() => {
  return sceneOptions.value.find(s => s.value === selectedSceneId.value)?.level || 10
})

const handleSceneChange = () => {
  currentLevel.value = currentSceneLevel.value
}

// 路由来源只读取原目录；空值、数组和未知ID恢复原默认，不写全局配置。
watch(() => route.query.sceneId, sceneId => {
  const scene = typeof sceneId === 'string' ? sceneOptions.value.find(item => item.value === sceneId) : undefined
  selectedSceneId.value = scene?.value || 'wind-shrine'
  currentLevel.value = scene?.level || 1
}, { immediate: true })

const applySceneLevel = () => {
  currentLevel.value = currentSceneLevel.value
  message.info(`已切换至「${currentSceneName.value}」，角色等级已自动定级为 Lv.${currentSceneLevel.value}！`)
}

// 自由编辑属性对象
const editStats = reactive({
  strBase: 41,
  strGrowth: 9,
  agiBase: 35,
  agiGrowth: 7,
  vitBase: 38,
  vitGrowth: 8,
  magBase: 25,
  magGrowth: 7,
  sprBase: 30,
  sprGrowth: 8,
  hpBase: 180,
  hpGrowth: 120
})

// 切换角色时同步该角色的配置
const handleSelectChar = (charId: string) => {
  selectedCharId.value = charId
  const custom = gameStore.customOverrides[charId]
  if (custom) {
    Object.assign(editStats, custom)
  } else {
    const c = characters.value.find((x: any) => x.id === charId)
    if (c?.stats) {
      editStats.strBase = c.stats.str || 41
      editStats.agiBase = c.stats.agi || 35
      editStats.vitBase = c.stats.vit || 38
      editStats.magBase = c.stats.mag || 25
      editStats.sprBase = c.stats.spr || 30
    }
  }
}

// 目标血量反推等级
const targetInputHP = ref<number>(500)
const targetInputSTR = ref<number | null>(null)
const reverseSolvedLevel = ref(3)

const getEstimatedHP = (lvl: number) => {
  const vit = editStats.vitBase + (lvl - 1) * editStats.vitGrowth
  return Math.round(editStats.hpBase + (lvl - 1) * editStats.hpGrowth + vit * 2.2 * (lvl / 10))
}

const solveLevel = (targetHp: number) => {
  if (targetHp <= editStats.hpBase) return 1
  for (let l = 1; l <= 255; l++) {
    if (getEstimatedHP(l) >= targetHp) {
      return l
    }
  }
  return 255
}

const handleReverseHPInput = (val: number | null) => {
  if (typeof val === 'number') {
    reverseSolvedLevel.value = solveLevel(val)
  }
}

const quickSetHP = (val: number) => {
  targetInputHP.value = val
  reverseSolvedLevel.value = solveLevel(val)
}

const handleReverseSTRInput = (val: number | null) => {
  if (typeof val === 'number') {
    const lvl = Math.max(1, Math.min(255, Math.ceil((val - editStats.strBase) / editStats.strGrowth) + 1))
    reverseSolvedLevel.value = lvl
  }
}

const applyReverseLevel = () => {
  currentLevel.value = reverseSolvedLevel.value
  message.success(`已根据目标数值将角色等级自动设定为 Lv.${reverseSolvedLevel.value}！`)
}

// 最终实时衍生属性计算 (完全无上限)
const computedFinalSTR = computed(() => editStats.strBase + (currentLevel.value - 1) * editStats.strGrowth)
const computedFinalAGI = computed(() => editStats.agiBase + (currentLevel.value - 1) * editStats.agiGrowth)
const computedFinalVIT = computed(() => editStats.vitBase + (currentLevel.value - 1) * editStats.vitGrowth)
const computedFinalMAG = computed(() => editStats.magBase + (currentLevel.value - 1) * editStats.magGrowth)
const computedFinalSPR = computed(() => editStats.sprBase + (currentLevel.value - 1) * editStats.sprGrowth)
const computedFinalHP = computed(() => getEstimatedHP(currentLevel.value))
const computedFinalMP = computed(() => {
  const lvl = currentLevel.value
  return Math.round(50 + (lvl - 1) * 25 + (computedFinalMAG.value + computedFinalSPR.value) * 0.4 * (lvl / 10))
})

const computedPAtk = computed(() => Math.round(computedFinalSTR.value * 1.8 + 180))
const computedCombatPower = computed(() => {
  return computedPAtk.value * 2 + computedFinalHP.value + computedFinalMP.value
})

// 原版基准数值对比
const originalBaseHP = computed(() => 180 + (currentLevel.value - 1) * 60)
const originalBaseSTR = computed(() => 50 + (currentLevel.value - 1) * 3)
const originalBasePAtk = computed(() => Math.round(originalBaseSTR.value * 1.8 + 100))

// 保存并全局生效
const handleSaveAndApply = () => {
  gameStore.saveCharacterOverride(selectedCharId.value, { ...editStats })
  message.success(`🎉 ${currentChar.value?.name} 的属性修改已成功保存至本地，并在全站实时生效！`)
}

// 一键满级 255 超神
const handleMaxOverpower = () => {
  currentLevel.value = 255
  editStats.strBase = 99
  editStats.strGrowth = 25
  editStats.vitBase = 99
  editStats.vitGrowth = 25
  editStats.hpBase = 500
  editStats.hpGrowth = 350
  message.warning(`⚡ 已开启 255 级满破巅峰模式！HP 与攻击力突破星辰界限！`)
}

// 恢复默认
const handleResetDefault = () => {
  gameStore.resetCharacterOverride(selectedCharId.value)
  editStats.strBase = 41
  editStats.strGrowth = 9
  editStats.agiBase = 35
  editStats.agiGrowth = 7
  editStats.vitBase = 38
  editStats.vitGrowth = 8
  editStats.magBase = 25
  editStats.magGrowth = 7
  editStats.sprBase = 30
  editStats.sprGrowth = 8
  editStats.hpBase = 180
  editStats.hpGrowth = 120
  message.info('已恢复为官方标准数值设定。')
}
</script>
