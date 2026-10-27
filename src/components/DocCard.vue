<template>
  <div
    class="group relative bg-[#121824] rounded-xl overflow-hidden border border-[#1f283c] hover:border-emerald-500/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col cursor-pointer"
    @click="goToDoc"
  >
    <!-- 卡片封面图 -->
    <div class="relative w-full aspect-[16/10] overflow-hidden bg-[#0c1017]">
      <img
        :src="doc.coverUrl"
        :alt="doc.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent opacity-80"></div>

      <!-- 分类标签 -->
      <div class="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-medium text-emerald-300 border border-emerald-500/20">
        {{ doc.category }}
      </div>
    </div>

    <!-- 卡片文字信息 -->
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
          {{ doc.title }}
        </h3>
        <p class="text-xs text-gray-400 mt-1 line-clamp-1">
          {{ doc.subtitle }}
        </p>
      </div>

      <!-- 底部进入提示 -->
      <div class="mt-4 pt-3 border-t border-[#1a2334] flex items-center justify-between">
        <span class="text-xs text-emerald-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
          阅读文档 <span>→</span>
        </span>
        <span class="text-[11px] text-gray-500">
          {{ doc.updateTime }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DocItem } from '@/types/game'

const props = defineProps<{
  doc: DocItem
}>()

function goToDoc() {
  if (props.doc.path) {
    if (props.doc.path.startsWith('http')) {
      window.open(props.doc.path, '_blank')
    } else {
      window.location.href = props.doc.path
    }
  }
}
</script>
