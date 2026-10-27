<template>
  <aside
    class="fixed right-0 top-1/2 -translate-y-1/2 z-999 select-none max-md:hidden"
    aria-label="右侧快捷功能悬浮栏"
  >
    <div
      class="flex flex-col items-center bg-white rounded-l-2xl shadow-[-4px_6px_24px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[-6px_8px_32px_rgba(0,0,0,0.38)] border border-r-0 border-slate-200/90 py-2 w-[58px] max-sm:(w-12 py-1.5 rounded-l-xl) transition-all duration-250"
    >
      <!-- 1. 最新更新页面 (带红点提醒，对齐用户图片 2 样式) -->
      <router-link
        to="/vble/updates"
        class="flex flex-col items-center justify-center w-full py-2 px-1 text-slate-700 hover:(bg-slate-50 text-sky-600) transition-colors relative no-underline cursor-pointer group"
        :class="{ 'text-sky-600 bg-sky-50 font-bold': route.path === '/vble/updates' }"
        title="点击查看最新更新日志"
      >
        <div class="relative flex items-center justify-center w-7 h-7">
          <!-- 实时红点指示灯 (对齐图片 2 购物车右上角红点) -->
          <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-1.5 border-white shadow-[0_0_6px_rgba(239,68,68,0.6)]"></span>
          <svg class="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-112 max-sm:(w-4.5 h-4.5)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight mt-0.75 text-center tracking-tight max-sm:text-[9px]">最新更新</span>
      </router-link>

      <div class="w-9 h-px bg-slate-100 my-0.5"></div>

      <!-- 2. 后面要加的功能页面 -->
      <router-link
        to="/vble/roadmap"
        class="flex flex-col items-center justify-center w-full py-2 px-1 text-slate-700 hover:(bg-slate-50 text-sky-600) transition-colors relative no-underline cursor-pointer group"
        :class="{ 'text-sky-600 bg-sky-50 font-bold': route.path === '/vble/roadmap' }"
        title="点击查看后续规划与期望功能"
      >
        <div class="relative flex items-center justify-center w-7 h-7">
          <svg class="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-112 max-sm:(w-4.5 h-4.5)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight mt-0.75 text-center tracking-tight max-sm:text-[9px]">功能规划</span>
      </router-link>

      <div class="w-9 h-px bg-slate-100 my-0.5"></div>

      <!-- 3. 客户端下载专区 (四大网盘直链) -->
      <router-link
        to="/vble/download"
        class="flex flex-col items-center justify-center w-full py-2 px-1 text-slate-700 hover:(bg-slate-50 text-amber-600) transition-colors relative no-underline cursor-pointer group"
        :class="{ 'text-amber-600 bg-amber-50 font-bold': route.path === '/vble/download' }"
        title="点击获取百度/123/阿里/夸克四大网盘完整单机包"
      >
        <div class="relative flex items-center justify-center w-7 h-7">
          <svg class="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-112 max-sm:(w-4.5 h-4.5) text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight mt-0.75 text-center tracking-tight text-amber-600 font-bold max-sm:text-[9px]">游戏下载</span>
      </router-link>

      <div class="w-9 h-px bg-slate-100 my-0.5"></div>

      <!-- 4. 架构白皮书 -->
      <router-link
        to="/vble/docs"
        class="flex flex-col items-center justify-center w-full py-2 px-1 text-slate-700 hover:(bg-slate-50 text-sky-600) transition-colors relative no-underline cursor-pointer group"
        :class="{ 'text-sky-600 bg-sky-50 font-bold': route.path === '/vble/docs' }"
        title="16 卷架构白皮书"
      >
        <div class="relative flex items-center justify-center w-7 h-7">
          <svg class="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-112 max-sm:(w-4.5 h-4.5)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight mt-0.75 text-center tracking-tight max-sm:text-[9px]">白皮书</span>
      </router-link>

      <div class="w-9 h-px bg-slate-100 my-0.5"></div>

      <!-- 5. 配装模拟器 -->
      <router-link
        to="/vble/armory"
        class="flex flex-col items-center justify-center w-full py-2 px-1 text-slate-700 hover:(bg-slate-50 text-sky-600) transition-colors relative no-underline cursor-pointer group"
        :class="{ 'text-sky-600 bg-sky-50 font-bold': route.path === '/vble/armory' }"
        title="全神装配装模拟器"
      >
        <div class="relative flex items-center justify-center w-7 h-7">
          <svg class="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-112 max-sm:(w-4.5 h-4.5)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
            <path d="m13 19 6 2 2-6-4.5-4.5" />
            <path d="m9.5 12.5 2 2" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight mt-0.75 text-center tracking-tight max-sm:text-[9px]">配装模拟</span>
      </router-link>

      <div class="w-9 h-px bg-slate-100 my-0.5"></div>

      <!-- 6. 回到顶部 -->
      <button
        type="button"
        class="flex flex-col items-center justify-center w-full py-2 px-1 text-slate-500 hover:(bg-slate-50 text-sky-600) transition-colors relative no-underline cursor-pointer group bg-transparent border-0"
        title="回到页面顶部"
        @click="scrollToTop"
      >
        <div class="relative flex items-center justify-center w-7 h-7">
          <svg class="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-112 max-sm:(w-4.5 h-4.5)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </div>
        <span class="text-[11px] leading-tight mt-0.75 text-center tracking-tight max-sm:text-[9px]">回顶部</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
