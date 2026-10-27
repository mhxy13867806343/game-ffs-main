<template>
  <div class="content-container py-8 flex flex-col items-center">
    <!-- Header info -->
    <div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
            STAGE 1-6 · 赤鳍巨鲸
          </span>
          <span class="text-xs text-gray-400">单机 STG 战役实装版</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white">
          《裂空之羽》赤霞港空域作战
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <router-link
          to="/feather/stages"
          class="px-4 py-2 rounded-lg bg-[#141d2f] hover:bg-[#1b273e] border border-[#24334f] text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <span>🗺️</span>
          <span>全 8 章 48 关一览</span>
        </router-link>
        <router-link
          to="/feather/doc"
          class="px-4 py-2 rounded-lg bg-[#141d2f] hover:bg-[#1b273e] border border-[#24334f] text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <span>📜</span>
          <span>设计文档</span>
        </router-link>
      </div>
    </div>

    <!-- The Playable Canvas -->
    <div class="w-full mb-8">
      <GameCanvas />
    </div>

    <!-- Combat Guide & Instructions -->
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Panel 1: Flight Controls -->
      <div class="p-5 rounded-2xl bg-[#0e1625] border border-[#1e2a42]">
        <div class="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
          <span>🕹️</span>
          <span>操作手感与核心指令</span>
        </div>
        <ul class="text-xs text-gray-300 space-y-2.5">
          <li class="flex items-start justify-between">
            <span class="text-gray-400">8 方向自由机动:</span>
            <span class="font-mono bg-black/40 px-2 py-0.5 rounded border border-gray-700">W/A/S/D 或 方向键</span>
          </li>
          <li class="flex items-start justify-between">
            <span class="text-gray-400">常规弹幕开火:</span>
            <span class="font-mono bg-black/40 px-2 py-0.5 rounded border border-gray-700">J / Z / 空格键</span>
          </li>
          <li class="flex items-start justify-between">
            <span class="text-gray-400">超载终结大招 (100%):</span>
            <span class="font-mono bg-black/40 px-2 py-0.5 rounded border border-gray-700">K 键 或 屏幕按钮</span>
          </li>
          <li class="flex items-start justify-between">
            <span class="text-gray-400">微核心精准模式:</span>
            <span class="font-mono bg-black/40 px-2 py-0.5 rounded border border-gray-700">按住 Shift / 切换开关</span>
          </li>
        </ul>
      </div>

      <!-- Panel 2: Graze & Overload -->
      <div class="p-5 rounded-2xl bg-[#0e1625] border border-[#1e2a42]">
        <div class="flex items-center gap-2 text-pink-400 font-bold text-sm mb-3">
          <span>✨</span>
          <span>擦弹 (Graze) 与超载爆发</span>
        </div>
        <p class="text-xs text-gray-300 leading-relaxed mb-3">
          战机正中央拥有一个发光的 6×6 像素判定红心。只要敌方弹幕掠过机身外侧（28 像素内）而未命中红心，即可触发「擦弹」。
        </p>
        <div class="bg-pink-500/10 border border-pink-500/20 p-2.5 rounded-lg text-[11px] text-pink-300">
          🔥 每次擦弹可立刻增加得分并为超载爆发充能 4%！超载发动期间完全无敌并消灭常规弹幕。
        </div>
      </div>

      <!-- Panel 3: Shield & Recovery -->
      <div class="p-5 rounded-2xl bg-[#0e1625] border border-[#1e2a42]">
        <div class="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-3">
          <span>🛡️</span>
          <span>护盾与生命判定</span>
        </div>
        <p class="text-xs text-gray-300 leading-relaxed mb-3">
          战机默认配备 3 格高能能量护盾。受弹时优先由护盾完全抵消，并赋予短暂的受创无敌时间。
        </p>
        <div class="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-lg text-[11px] text-cyan-300">
          ⚡ 护盾耗尽后将直接扣除机体护甲 HP。若 HP 降至 0 则机体坠毁，注意随时避让高危弹幕！
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCanvas from '../components/GameCanvas.vue'
</script>
