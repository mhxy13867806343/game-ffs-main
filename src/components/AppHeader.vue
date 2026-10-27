<template>
  <header class="sticky top-0 z-50 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-[#1b2333]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- 品牌 LOGO -->
      <router-link to="/" class="flex items-center gap-3 text-decoration-none group shrink-0">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <span class="text-white font-black text-xl tracking-tighter">FF</span>
        </div>
        <div class="flex flex-col">
          <span class="text-white font-bold text-base sm:text-lg leading-tight tracking-wider">
            GAME <span class="text-blue-400">FFS</span>
          </span>
          <span class="text-[10px] text-gray-400 tracking-wider">单机游戏首页</span>
        </div>
      </router-link>

      <!-- 搜索框与提示 -->
      <div class="flex-1 max-w-md hidden sm:block">
        <n-input
          :value="modelValue"
          size="small"
          placeholder="搜索游戏名称、分类或标签..."
          clearable
          class="bg-[#121824] rounded-full text-xs"
          @update:value="$emit('update:modelValue', $event)"
        >
          <template #prefix>
            <span class="text-gray-400 text-xs">🔍</span>
          </template>
        </n-input>
      </div>

      <!-- 右侧信息 -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400 bg-[#121824] border border-[#1e273a] px-3 py-1 rounded-full">
          共 <span class="text-blue-400 font-bold font-mono">{{ totalGames }}</span> 款游戏
        </span>
      </div>
    </div>

    <!-- 移动端搜索框 -->
    <div class="sm:hidden px-4 pb-3">
      <n-input
        :value="modelValue"
        size="small"
        placeholder="搜索游戏..."
        clearable
        class="bg-[#121824] rounded-lg text-xs"
        @update:value="$emit('update:modelValue', $event)"
      >
        <template #prefix>
          <span class="text-gray-400 text-xs">🔍</span>
        </template>
      </n-input>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
  totalGames: number
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
