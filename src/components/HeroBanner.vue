<template>
  <div class="relative w-full overflow-hidden bg-[#0a0d14]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div class="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#121824] aspect-[16/9] sm:aspect-[21/9]">
        <!-- 背景图片与渐变遮罩 -->
        <transition name="fade" mode="out-in">
          <div
            :key="currentGame.id"
            class="absolute inset-0 bg-cover bg-center transition-all duration-700"
            :style="{ backgroundImage: `url(${currentGame.bannerUrl})` }"
          >
            <div class="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/80 to-transparent"></div>
          </div>
        </transition>

        <!-- 文字与操作区 -->
        <div class="relative h-full flex flex-col justify-end sm:justify-center p-6 sm:p-10 lg:p-12 z-10 max-w-2xl">
          <div class="flex items-center gap-2 mb-2 sm:mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {{ currentGame.category }}
            </span>
            <span v-if="currentGame.isReady" class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
              已就绪
            </span>
          </div>

          <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md mb-2 sm:mb-3">
            {{ currentGame.title }}
          </h2>

          <p class="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 line-clamp-2">
            {{ currentGame.subtitle }}
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <n-button
              type="primary"
              size="large"
              class="font-bold px-6 shadow-lg shadow-blue-500/30"
              @click="handleLaunchGame(currentGame)"
            >
              ▶ 立即体验
            </n-button>
            <n-button
              secondary
              size="large"
              class="text-white hover:text-blue-300"
              @click="handleOpenDirect(currentGame)"
            >
              独立窗口打开 ↗
            </n-button>
          </div>
        </div>

        <!-- 桌面端右侧快捷切换标签条 -->
        <div class="hidden lg:flex absolute right-6 bottom-6 top-6 w-64 flex-col justify-center gap-2 z-20">
          <div
            v-for="(game, idx) in games"
            :key="game.id"
            class="p-3 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md"
            :class="idx === currentIndex ? 'bg-black/70 border-blue-500/80 shadow-lg' : 'bg-black/30 border-white/5 hover:bg-black/40'"
            @mouseenter="selectGame(idx)"
          >
            <div class="text-[11px] font-semibold tracking-wider" :class="idx === currentIndex ? 'text-blue-400' : 'text-gray-400'">
              {{ game.category }}
            </div>
            <div class="text-xs font-bold text-gray-100 truncate mt-0.5">
              {{ game.title }}
            </div>
          </div>
        </div>

        <!-- 移动端圆点指示器 -->
        <div class="flex lg:hidden absolute bottom-3 right-4 z-20 gap-1.5">
          <button
            v-for="(_, idx) in games"
            :key="idx"
            class="h-1.5 rounded-full transition-all duration-300 border-none"
            :class="idx === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-white/40'"
            @click="selectGame(idx)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { GameItem } from '@/types/game'

const props = defineProps<{
  games: GameItem[]
}>()

const router = useRouter()
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const currentGame = computed(() => props.games[currentIndex.value] || props.games[0])

function selectGame(idx: number) {
  currentIndex.value = idx
}

function handleLaunchGame(game: GameItem) {
  router.push(`/play/${game.id}`)
}

function handleOpenDirect(game: GameItem) {
  if (game.isReady) {
    window.open(game.path, '_blank')
  } else {
    router.push(`/play/${game.id}`)
  }
}

function startAutoPlay() {
  stopAutoPlay()
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.games.length
  }, 5000)
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
