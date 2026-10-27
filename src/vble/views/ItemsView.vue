<template>
  <div class="items-page p-4 max-w-7xl mx-auto space-y-6">
    <!-- 头部横幅 -->
    <div class="text-center">
      <n-tag type="info" size="small" round class="mb-2">Items, Armors & Spells Encyclopedia</n-tag>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-glow-cyan mb-2">全域道具、防具与四大法系图鉴</h1>
      <p class="text-gray-400 max-w-3xl mx-auto text-xs sm:text-sm">
        系统归纳探险补给、稀有防具头盔、白魔法、黑魔法、时空魔法与青魔法全谱系；集成飞空艇前置机动道具与传奇王冠连锁考据
      </p>
    </div>

    <!-- 顶部分类标签切换 (夜间高对比度) -->
    <div class="flex justify-center flex-wrap gap-2">
      <div role="group" aria-label="图鉴分类" class="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1 flex-wrap justify-center">
        <button
          v-for="tab in tabOptions"
          :key="tab.id"
          :aria-pressed="activeTab === tab.id"
          class="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border select-none flex items-center gap-1.5"
          :class="activeTab === tab.id
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
            : 'bg-transparent text-gray-300 border-transparent hover:(text-white bg-slate-800)'"
          @click="activeTab = tab.id"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.name }}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full" :class="activeTab === tab.id ? 'bg-cyan-900/40 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-300'">
            {{ tab.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- 专区 1: 交互式背包与页内显式目标切换工作台 (对齐 Godot 4.3 D09 item_page_target_switch 规范) -->
    <n-card
      v-if="activeTab === 'items'"
      class="border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#12162a] to-slate-950 rounded-xl shadow-xl"
      title="🧪 随身背包道具使用与显式目标切换模拟器 (In-Place Target Switch Studio)"
    >
      <template #header-extra>
        <n-tag size="tiny" type="info" round>Godot D09 真实交互机制</n-tag>
      </template>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- 步骤 1: 选定道具 -->
        <div class="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-amber-300 flex items-center justify-between">
            <span>1️⃣ 选择可用消耗品</span>
            <span class="text-[10px] text-gray-400">背包持有量</span>
          </div>
          <div class="space-y-1.5">
            <button
              v-for="item in inventorySimList"
              :key="item.id"
              type="button"
              class="w-full text-left p-2 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer"
              :class="selectedSimItem.id === item.id ? 'bg-cyan-950/70 border-cyan-400 text-white shadow' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
              @click="selectedSimItem = item"
            >
              <div>
                <span class="font-bold text-cyan-300">{{ item.name }}</span>
                <span class="text-[10px] text-gray-400 ml-1.5">({{ item.effect }})</span>
              </div>
              <n-tag size="tiny" :type="item.count > 0 ? 'success' : 'error'">×{{ item.count }}</n-tag>
            </button>
          </div>
        </div>

        <!-- 步骤 2: 目标同伴选择与状态监视 -->
        <div class="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
            <span>2️⃣ 显式目标切换 (Party Member)</span>
            <span class="text-[10px] text-cyan-400">支持单体/全队</span>
          </div>
          <div class="space-y-2">
            <div
              v-for="char in partyMembers"
              :key="char.id"
              class="p-2.5 rounded-lg border text-xs transition-all cursor-pointer"
              :class="selectedTargetMember.id === char.id ? 'bg-indigo-950/70 border-indigo-400 text-white ring-1 ring-indigo-500' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'"
              @click="selectedTargetMember = char"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-gray-100">{{ char.name }}</span>
                <span class="text-[10px] text-gray-400">Lv. {{ char.level }} · {{ char.job }}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div>
                  <span class="text-gray-400">HP: </span>
                  <span :class="char.currentHp < char.maxHp * 0.3 ? 'text-red-400 font-bold' : 'text-emerald-400'">
                    {{ char.currentHp }} / {{ char.maxHp }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-400">MP: </span>
                  <span class="text-cyan-400">{{ char.currentMp }} / {{ char.maxMp }}</span>
                </div>
              </div>
              <div v-if="char.status !== '正常'" class="mt-1 text-[10px] text-amber-400 flex items-center gap-1">
                <span>⚠️ 负面异常:</span>
                <span class="px-1 py-0.2 rounded bg-amber-950 border border-amber-800">{{ char.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤 3: 触发执行与收据反馈 -->
        <div class="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>3️⃣ 动作触发与事务结算</span>
            </div>
            <div class="p-3 bg-slate-900/90 rounded border border-slate-800 text-xs space-y-1.5">
              <div class="text-gray-400">预选道具: <strong class="text-cyan-300">{{ selectedSimItem.name }}</strong></div>
              <div class="text-gray-400">目标同伴: <strong class="text-amber-300">{{ selectedSimItem.targetAll ? '全体队员' : selectedTargetMember.name }}</strong></div>
              <div class="text-gray-400">库存变化: <span class="text-rose-400">消耗 1 个</span> (当前剩余: {{ selectedSimItem.count }})</div>
            </div>

            <!-- 执行操作反馈提示 -->
            <div v-if="usageNotice" class="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs text-center font-bold">
              {{ usageNotice }}
            </div>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              class="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-lg text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="selectedSimItem.count <= 0"
              @click="applySimItemUse"
            >
              {{ selectedSimItem.count > 0 ? `🚀 确认使用【${selectedSimItem.name}】` : '❌ 道具库存已耗尽' }}
            </button>
            <button
              type="button"
              class="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 text-[11px] rounded transition-all cursor-pointer"
              @click="resetPartyState"
            >
              🔄 重置模拟器状态与背包
            </button>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 专区 2: 飞空艇前置机动道具与传奇王冠四连环专区 (PRE_AIRSHIP_ITEMS.md & FF1 Crown Quests) -->
    <div v-if="activeTab === 'items'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 飞空艇前置机动道具 -->
      <n-card class="border border-sky-800/60 bg-[#12192c]/90 rounded-xl" title="🛸 飞空艇前置机动道具体系 (Pre-Airship Mobility)">
        <template #header-extra>
          <n-tag size="tiny" type="info">airship_obtained 动态守卫</n-tag>
        </template>
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            在获得飞空艇（<code>airship_obtained = true</code>）之前，世界探索广阔而步履艰难。游戏系统专门实装 3 款前置专属机动道具，在早期提供关键传送与移动辅助，获得飞空艇后自动进入失效保护：
          </p>
          <div class="space-y-2">
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-start justify-between">
              <div>
                <div class="font-bold text-sky-300">📜 回地图卷轴 (ID: 301)</div>
                <div class="text-[11px] text-gray-400">使用后立刻安全返回当前所在大陆的世界地图入口，免去深层折返跋涉。</div>
              </div>
              <n-tag size="tiny" type="info">300G</n-tag>
            </div>
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-start justify-between">
              <div>
                <div class="font-bold text-amber-300">🪶 传送羽毛 (ID: 302)</div>
                <div class="text-[11px] text-gray-400">弹出已访问地名录（<code>visited_locations</code>），确认后瞬间传送抵达指定城镇。</div>
              </div>
              <n-tag size="tiny" type="warning">800G</n-tag>
            </div>
            <div class="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-start justify-between">
              <div>
                <div class="font-bold text-purple-300">✨ 职业卷轴 (ID: 303)</div>
                <div class="text-[11px] text-gray-400">战士激励战歌、法师菲拉烈焰、白魔全队祈祷等指定职业一次性探索技能卷轴。</div>
              </div>
              <n-tag size="tiny" type="error">限定职业</n-tag>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 传奇王冠四连环关键道具 (SQ01~SQ07 & FF1 Crown Quest) -->
      <n-card class="border border-amber-800/60 bg-[#1e1712]/90 rounded-xl" title="👑 传奇王冠四连环剧情道具大典 (Items 111~114)">
        <template #header-extra>
          <n-tag size="tiny" type="warning">西方王阿斯托斯连锁</n-tag>
        </template>
        <div class="space-y-3 text-xs leading-relaxed">
          <p class="text-gray-300">
            源自经典始源 FF1 史诗委托链（<code>ff1_crown_quest.gd</code>），四大核心道具层层递进，贯穿沼泽洞窟、玛托雅洞窟与精灵城堡：
          </p>
          <div class="space-y-2">
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-amber-400">👑 [111] 王冠 (Crown)</span>
                <span class="text-[10px] text-gray-400 ml-2">沼泽洞窟取得，西方王阿斯托斯的虚伪指引</span>
              </div>
              <n-tag size="tiny" type="warning">关键物品</n-tag>
            </div>
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-cyan-400">🔮 [112] 水晶眼 (Crystal Eye)</span>
                <span class="text-[10px] text-gray-400 ml-2">击破黑暗骑士阿斯托斯夺回，交还盲女玛托雅</span>
              </div>
              <n-tag size="tiny" type="info">关键物品</n-tag>
            </div>
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-emerald-400">🧪 [113] 提神药 (Jolt Tonic)</span>
                <span class="text-[10px] text-gray-400 ml-2">玛托雅重见光明后秘制，唤醒沉睡千年的精灵王子</span>
              </div>
              <n-tag size="tiny" type="success">关键物品</n-tag>
            </div>
            <div class="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-purple-400">🗝️ [114] 神秘钥匙 (Mystic Key)</span>
                <span class="text-[10px] text-gray-400 ml-2">精灵王国的报恩：开启全大陆封印密门与传说宝箱</span>
              </div>
              <n-tag size="tiny" type="error">全域解锁</n-tag>
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 道具与消耗品卡片网格 -->
    <div v-if="activeTab === 'items'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="item in paginatedList"
        :key="item.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-cyan-300">{{ item.name }}</span>
            <n-tag size="tiny" :type="item.category === 'key' ? 'warning' : 'info'">{{ item.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <p class="text-gray-300 leading-relaxed">{{ item.effect || item.desc }}</p>
          <div v-if="item.price" class="text-amber-400 font-mono">
            💰 市价: {{ item.price }} {{ item.price.includes('G') ? '' : 'Gil' }}
          </div>

          <!-- 目标对象与使用许可 (对齐 ItemUIUseSummary 与 ItemUITargetSwitch) -->
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] flex items-center justify-between">
            <span class="text-gray-400">🎯 使用对象：</span>
            <span class="text-cyan-300 font-medium">
              {{ item.category === 'key' ? '重要道具（剧情持有）' : item.name.includes('帐篷') || item.name.includes('小屋') ? '当前全队（限营地/大地图）' : item.name.includes('万灵') || item.name.includes('圣灵') ? '选定同伴（支持上一位/下一位循环）' : '单体同伴（支持快捷切换）' }}
            </span>
          </div>

          <!-- 原典考据 (对齐 Godot 4.3 encyclopedia_volume_data.gd _append_source_references) -->
          <div
            v-if="['104', '105', '106', '108', '109', '110', '111', '112', '113', '114'].includes(item.id)"
            class="p-2 bg-amber-950/30 border border-amber-500/40 rounded text-amber-200 space-y-0.5"
          >
            <div class="text-[10px] text-amber-400 font-bold flex items-center gap-1">
              <span>📜</span>
              <span>原典考据 (Source Identity):</span>
            </div>
            <div class="text-[10px] text-gray-300 leading-relaxed">
              作品：FF1 / 时空物语 · 版本：Pixel Remaster · 原典名称：{{ item.name.split(' ')[0] }}
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 防具与头饰卡片网格 -->
    <div v-if="activeTab === 'armors'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="armor in paginatedList"
        :key="armor.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-amber-300">{{ armor.name }}</span>
            <n-tag size="tiny" type="warning">{{ armor.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <div class="text-red-400 font-semibold">{{ armor.stats }}</div>
          <p class="text-gray-300 leading-relaxed">{{ armor.effect }}</p>
          <div v-if="armor.job" class="text-gray-400">适配: {{ armor.job }}</div>

          <!-- 秘宝溯源与考据 -->
          <div
            v-if="armor.origin"
            class="p-2 bg-slate-900/90 border border-slate-800 rounded space-y-0.5"
          >
            <div class="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
              <span>🏰</span>
              <span>秘宝出处与溯源:</span>
            </div>
            <div class="text-[10px] text-gray-300">{{ armor.origin }}</div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- 魔法与咒术卡片网格 -->
    <div v-if="activeTab === 'magic'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="m in paginatedList"
        :key="m.id"
        hoverable
        class="border border-slate-700/60 bg-[#121626]/90 rounded-xl"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-base font-bold text-purple-300">{{ m.name }}</span>
            <n-tag size="tiny" type="error">{{ m.type }}</n-tag>
          </div>
        </template>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between text-gray-400">
            <span>消耗: <strong class="text-cyan-300">{{ m.cost }}</strong></span>
            <span>目标: {{ m.target }}</span>
          </div>
          <p class="text-gray-300 leading-relaxed">{{ m.effect }}</p>
        </div>
      </n-card>
    </div>

    <!-- 响应式列表分页器 -->
    <div
      v-if="currentList.length > pageSize"
      v-simple-page-label
      class="flex justify-center items-center py-4 border-t border-slate-800/80"
      @click.capture="captureSimplePaginationActivation"
      @click="preserveSimplePaginationFocus"
    >
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="currentList.length"
        :page-sizes="[9, 18, 27]"
        :simple="isMobile"
        show-size-picker
        show-quick-jumper
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <!-- 原生按钮提供键盘激活，点击冒泡仍交由分页器维护页码与边界。 -->
        <template #prev="{ page }">
          <button type="button" class="items-pagination-control" aria-label="上一页图鉴" :disabled="page <= 1">‹</button>
        </template>
        <template #label="{ type, node, active }">
          <button
            v-if="type === 'page'"
            type="button"
            class="items-pagination-control"
            :aria-label="`图鉴第 ${node} 页`"
            :aria-current="active ? 'page' : undefined"
          >{{ node }}</button>
          <component :is="node" v-else />
        </template>
        <template #next="{ page, pageCount }">
          <button type="button" class="items-pagination-control" aria-label="下一页图鉴" :disabled="page >= pageCount">›</button>
        </template>
        <template #prefix="{ itemCount }">
          <span class="text-xs text-gray-400 mr-2">共 {{ itemCount }} 项</span>
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { usePagination } from '@/composables/usePagination'

const gameStore = useGameStore()
const activeTab = ref<'items' | 'armors' | 'magic'>('items')

const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 640)

const items = computed(() => gameStore.db.items || [])
const armors = computed(() => gameStore.db.armors || [])
const magics = computed(() => gameStore.db.magic || [])

const tabOptions = computed(() => [
  { id: 'items' as const, name: '道具与消耗品', icon: '🧪', count: items.value.length },
  { id: 'armors' as const, name: '防具与头饰', icon: '🛡️', count: armors.value.length },
  { id: 'magic' as const, name: '魔法与咒术', icon: '✨', count: magics.value.length }
])

// 模拟队伍状态与显式目标切换 (对齐 D09 item_page_target_switch)
interface SimPartyMember {
  id: string
  name: string
  job: string
  level: number
  currentHp: number
  maxHp: number
  currentMp: number
  maxMp: number
  status: string
}

const partyMembers = ref<SimPartyMember[]>([
  { id: 'bartz', name: '巴兹 (Bartz)', job: '骑士', level: 38, currentHp: 650, maxHp: 1800, currentMp: 90, maxMp: 120, status: '正常' },
  { id: 'lenna', name: '蕾娜 (Lenna)', job: '白魔道士', level: 38, currentHp: 420, maxHp: 1350, currentMp: 35, maxMp: 280, status: '沉默' },
  { id: 'galuf', name: '加拉夫 (Galuf)', job: '武僧', level: 38, currentHp: 1200, maxHp: 2100, currentMp: 60, maxMp: 80, status: '正常' },
  { id: 'faris', name: '法里斯 (Faris)', job: '忍者', level: 38, currentHp: 310, maxHp: 1520, currentMp: 110, maxMp: 160, status: '中毒' },
  { id: 'sarah', name: '塞拉 (Sarah)', job: '公主/学者', level: 38, currentHp: 280, maxHp: 1200, currentMp: 200, maxMp: 250, status: '正常' }
])

const selectedTargetMember = ref<SimPartyMember>(partyMembers.value[0])

interface SimInventoryItem {
  id: number
  name: string
  effect: string
  count: number
  healHp?: number
  healMp?: number
  cureStatus?: string
  targetAll?: boolean
}

const inventorySimList = ref<SimInventoryItem[]>([
  { id: 1, name: '恢复药 (Potion)', effect: '恢复单体 500 HP', count: 9, healHp: 500 },
  { id: 2, name: '高級恢复药 (Hi-Potion)', effect: '恢复单体 1500 HP', count: 4, healHp: 1500 },
  { id: 3, name: '圣灵药 (Elixir)', effect: '恢复单体全满 HP 与 MP', count: 2, healHp: 9999, healMp: 9999 },
  { id: 4, name: '以太药 (Ether)', effect: '恢复单体 100 MP', count: 5, healMp: 100 },
  { id: 5, name: '解毒剂 (Antidote)', effect: '解除单体中毒异常', count: 6, cureStatus: '中毒' },
  { id: 6, name: '回音草 (Echo Herbs)', effect: '解除单体沉默异常', count: 3, cureStatus: '沉默' },
  { id: 7, name: '万能药 (Remedy)', effect: '解除单体全部负面状态', count: 3, cureStatus: 'ALL' },
  { id: 8, name: '野营帐篷 (Tent)', effect: '大地图全队回复 1000 HP & 100 MP', count: 2, healHp: 1000, healMp: 100, targetAll: true }
])

const selectedSimItem = ref<SimInventoryItem>(inventorySimList.value[0])
const usageNotice = ref('')

const applySimItemUse = () => {
  const item = selectedSimItem.value
  if (item.count <= 0) return

  item.count -= 1

  if (item.targetAll) {
    // 全体生效
    partyMembers.value.forEach(m => {
      if (item.healHp) m.currentHp = Math.min(m.maxHp, m.currentHp + item.healHp)
      if (item.healMp) m.currentMp = Math.min(m.maxMp, m.currentMp + item.healMp)
    })
    usageNotice.value = `✅ 对全队使用了【${item.name}】，全员恢复生命与魔力！`
  } else {
    // 显式目标生效
    const target = selectedTargetMember.value
    let detail = ''
    if (item.healHp) {
      const prev = target.currentHp
      target.currentHp = Math.min(target.maxHp, target.currentHp + item.healHp)
      detail += `+${target.currentHp - prev} HP `
    }
    if (item.healMp) {
      const prev = target.currentMp
      target.currentMp = Math.min(target.maxMp, target.currentMp + item.healMp)
      detail += `+${target.currentMp - prev} MP `
    }
    if (item.cureStatus) {
      if (item.cureStatus === 'ALL' || item.cureStatus === target.status) {
        target.status = '正常'
        detail += '净化异常状态 '
      }
    }
    usageNotice.value = `✅ 对【${target.name}】使用了【${item.name}】（扣除1个）：${detail}`
  }

  setTimeout(() => {
    usageNotice.value = ''
  }, 4000)
}

const resetPartyState = () => {
  partyMembers.value = [
    { id: 'bartz', name: '巴兹 (Bartz)', job: '骑士', level: 38, currentHp: 650, maxHp: 1800, currentMp: 90, maxMp: 120, status: '正常' },
    { id: 'lenna', name: '蕾娜 (Lenna)', job: '白魔道士', level: 38, currentHp: 420, maxHp: 1350, currentMp: 35, maxMp: 280, status: '沉默' },
    { id: 'galuf', name: '加拉夫 (Galuf)', job: '武僧', level: 38, currentHp: 1200, maxHp: 2100, currentMp: 60, maxMp: 80, status: '正常' },
    { id: 'faris', name: '法里斯 (Faris)', job: '忍者', level: 38, currentHp: 310, maxHp: 1520, currentMp: 110, maxMp: 160, status: '中毒' },
    { id: 'sarah', name: '塞拉 (Sarah)', job: '公主/学者', level: 38, currentHp: 280, maxHp: 1200, currentMp: 200, maxMp: 250, status: '正常' }
  ]
  inventorySimList.value = [
    { id: 1, name: '恢复药 (Potion)', effect: '恢复单体 500 HP', count: 9, healHp: 500 },
    { id: 2, name: '高級恢复药 (Hi-Potion)', effect: '恢复单体 1500 HP', count: 4, healHp: 1500 },
    { id: 3, name: '圣灵药 (Elixir)', effect: '恢复单体全满 HP 与 MP', count: 2, healHp: 9999, healMp: 9999 },
    { id: 4, name: '以太药 (Ether)', effect: '恢复单体 100 MP', count: 5, healMp: 100 },
    { id: 5, name: '解毒剂 (Antidote)', effect: '解除单体中毒异常', count: 6, cureStatus: '中毒' },
    { id: 6, name: '回音草 (Echo Herbs)', effect: '解除单体沉默异常', count: 3, cureStatus: '沉默' },
    { id: 7, name: '万能药 (Remedy)', effect: '解除单体全部负面状态', count: 3, cureStatus: 'ALL' },
    { id: 8, name: '野营帐篷 (Tent)', effect: '大地图全队回复 1000 HP & 100 MP', count: 2, healHp: 1000, healMp: 100, targetAll: true }
  ]
  selectedSimItem.value = inventorySimList.value[0]
  selectedTargetMember.value = partyMembers.value[0]
  usageNotice.value = '已重置队伍生命值、负面异常与随身背包道具库存。'
}

const currentList = computed<Record<string, any>[]>(() => {
  if (activeTab.value === 'items') return items.value
  if (activeTab.value === 'armors') return armors.value
  return magics.value
})

const {
  currentPage,
  pageSize,
  paginatedList,
  resetPage,
  handlePageChange,
  handlePageSizeChange
} = usePagination<Record<string, any>>(currentList, { pageSize: 9 })

// simple 输入未开放 input-props；局部指令在挂载和响应式切换后补到实际输入。
const labelSimplePageInput = (container: HTMLElement) => {
  container.querySelector<HTMLInputElement>('.n-pagination--simple input')
    ?.setAttribute('aria-label', '道具目录当前页')
}
const vSimplePageLabel: Directive<HTMLElement> = {
  mounted: labelSimplePageInput,
  updated: labelSimplePageInput
}

// 只记录同一次键盘原生点击；鼠标与普通页码更新继续使用原焦点行为。
let simplePaginationActivation: { event: MouseEvent; button: HTMLButtonElement; page: number } | null = null
const captureSimplePaginationActivation = (event: MouseEvent) => {
  simplePaginationActivation = null
  const button = event.target instanceof Element ? event.target.closest('button.items-pagination-control') : null
  if (isMobile.value && event.detail === 0 && button instanceof HTMLButtonElement
    && !button.disabled && document.activeElement === button) {
    simplePaginationActivation = { event, button, page: currentPage.value }
  }
}

const preserveSimplePaginationFocus = (event: MouseEvent) => {
  const activation = simplePaginationActivation
  simplePaginationActivation = null
  if (!activation || activation.event !== event || currentPage.value === activation.page) return
  const container = event.currentTarget as HTMLElement
  // Naive 完成翻页且 Vue 更新禁用状态后，仅补救边界按钮失焦到 BODY 的情况。
  void nextTick(() => {
    const { button } = activation
    if (!isMobile.value || !button.isConnected || !button.disabled) return
    if (document.activeElement !== button && document.activeElement !== document.body) return
    container.querySelector<HTMLInputElement>('.n-pagination--simple input')?.focus({ preventScroll: true })
  })
}

watch(activeTab, () => {
  resetPage()
})
</script>

<style scoped>
.items-pagination-control {
  min-width: 28px;
  min-height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.items-pagination-control:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

.items-pagination-control:disabled {
  cursor: not-allowed;
}
</style>
