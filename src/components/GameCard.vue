<template>
  <div
    class="group relative bg-[#131926] rounded-xl overflow-hidden border border-[#1f293d] hover:border-blue-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col cursor-pointer"
    @click="handleCardClick"
  >
    <!-- 卡片封面 -->
    <div class="relative w-full aspect-[16/10] overflow-hidden bg-[#0c1017]">
      <img
        :src="game.coverUrl"
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-black/30"></div>

      <!-- 状态徽标 -->
      <div class="absolute top-2.5 left-2.5">
        <span
          v-if="game.isReady"
          class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white shadow flex items-center gap-1"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          已就绪
        </span>
        <span
          v-else
          class="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-700/80 text-gray-300"
        >
          预留路径
        </span>
      </div>

      <!-- 分类徽章 -->
      <div class="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-xs font-medium text-blue-300 border border-blue-500/20">
        {{ game.category }}
      </div>

      <!-- 更新日期 -->
      <div class="absolute bottom-2 left-3">
        <span class="px-2 py-0.5 text-[10px] rounded bg-black/70 text-gray-300 font-mono">
          {{ game.date }}
        </span>
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
          {{ game.title }}
        </h3>

        <p class="text-xs text-gray-400 mt-1 line-clamp-1">
          {{ game.subtitle }}
        </p>

        <!-- 打包出来的跳转路径 -->
        <div class="mt-3 px-2.5 py-1.5 rounded bg-[#0b0e14] border border-[#1d273a] flex items-center gap-1.5">
          <span class="text-[10px] text-gray-500 font-mono shrink-0">跳转路径:</span>
          <span class="text-[11px] text-blue-300 font-mono truncate select-all">{{ game.path }}</span>
        </div>

        <!-- 标签 -->
        <div class="flex flex-wrap gap-1.5 mt-3">
          <span
            v-for="tag in game.tags"
            :key="tag"
            class="text-[11px] px-2 py-0.5 rounded bg-[#1c2538] text-gray-300"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div class="mt-4 pt-3 border-t border-[#1e273a] flex items-center gap-2" @click.stop>
        <n-button
          size="small"
          type="primary"
          class="flex-1 rounded font-medium"
          @click="handleCardClick"
        >
          ▶ 进入页面
        </n-button>
        <n-button
          size="small"
          quaternary
          class="text-gray-300 hover:text-white"
          title="在新标签页独立打开该路径"
          @click="openInNewTab"
        >
          新窗口 ↗
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import type { GameItem } from '@/types/game'

const props = defineProps<{
  game: GameItem
}>()

const router = useRouter()
const message = useMessage()

function handleCardClick() {
  if (props.game.isReady) {
    router.push(`/play/${props.game.id}`)
  } else {
    message.info(`该游戏路径预留为：${props.game.path}，放入打包文件即可生效。`)
    router.push(`/play/${props.game.id}`)
  }
}

function openInNewTab() {
  if (props.game.isReady) {
    window.open(props.game.path, '_blank')
  } else {
    message.warning(`请先将打包产物放入 ${props.game.path}`)
  }
}
</script>
