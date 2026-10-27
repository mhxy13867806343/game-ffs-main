<template>
  <div
    class="group relative bg-[#121824] rounded-xl overflow-hidden border border-[#1f283c] hover:border-blue-500/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col cursor-pointer"
    @click="goToGame"
  >
    <!-- 卡片封面图 -->
    <div class="relative w-full aspect-[16/10] overflow-hidden bg-[#0c1017]">
      <img
        :src="game.coverUrl"
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
        loading="lazy"
      />
      <!-- 渐变阴影 -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent opacity-80"></div>

      <!-- 分类标签 -->
      <div class="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-medium text-blue-300 border border-blue-500/20">
        {{ game.category }}
      </div>
    </div>

    <!-- 卡片文字信息 -->
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
          {{ game.title }}
        </h3>
        <p class="text-xs text-gray-400 mt-1 line-clamp-1">
          {{ game.subtitle }}
        </p>
      </div>

      <!-- 底部简洁进入提示 -->
      <div class="mt-4 pt-3 border-t border-[#1a2334] flex items-center justify-between">
        <span class="text-xs text-blue-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
          进入游戏 <span>→</span>
        </span>
        <span class="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
          点击进入
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { GameItem } from '@/types/game'

const props = defineProps<{
  game: GameItem
}>()

const router = useRouter()

function goToGame() {
  if (props.game.path) {
    if (props.game.path.startsWith('http')) {
      window.open(props.game.path, '_blank')
    } else {
      router.push(props.game.path)
    }
  }
}
</script>
