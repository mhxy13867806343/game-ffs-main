<template>
  <div class="content-container py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
        <span>⚔️</span>
        <span>AIRCRAFT CLASSES & WORKSHOP · 战机职业与工坊装备</span>
      </div>
      <h1 class="text-3xl font-black text-white">苍鹞空战编队与装备养成</h1>
      <p class="text-sm text-gray-400 mt-2 max-w-2xl">
        通关 1-6、5-6、7-6 依次解锁全部四大职业。所有职业共享玩家等级与云晶，可在机库随时免费重置天赋树切换出击！
      </p>
    </div>

    <!-- Class Selector Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="hero in HERO_CLASSES"
        :key="hero.id"
        @click="activeHeroId = hero.id"
        class="p-5 rounded-2xl border cursor-pointer transition-all duration-200"
        :class="activeHeroId === hero.id
          ? 'bg-[#152035] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]'
          : 'bg-[#0e1625] border-[#1e2a42] hover:border-gray-600 opacity-80 hover:opacity-100'"
      >
        <div class="text-3xl mb-2">{{ hero.avatar }}</div>
        <div class="flex items-center justify-between mb-1">
          <h3 class="text-lg font-bold text-white">{{ hero.name }}</h3>
          <span class="text-xs px-2 py-0.5 rounded" :style="{ backgroundColor: `${hero.color}25`, color: hero.color }">
            {{ hero.role.split('/')[0] }}
          </span>
        </div>
        <p class="text-xs text-gray-400 line-clamp-2">{{ hero.desc }}</p>
      </div>
    </div>

    <!-- Detailed Class Showcase -->
    <div v-if="currentHero" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <!-- Left: Aircraft Stats & Spec -->
      <div class="p-6 rounded-2xl bg-[#0e1625] border border-[#1e2a42] flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-4xl">{{ currentHero.avatar }}</span>
            <div>
              <h2 class="text-2xl font-black text-white">{{ currentHero.name }}</h2>
              <div class="text-xs text-amber-400 font-mono">{{ currentHero.role }}</div>
            </div>
          </div>
          <p class="text-xs text-gray-300 leading-relaxed mb-6">{{ currentHero.desc }}</p>

          <!-- Stat Bars -->
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-400">机动航速 (Speed)</span>
                <span class="text-cyan-400 font-bold font-mono">{{ currentHero.speed }} / 100</span>
              </div>
              <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full bg-cyan-400" :style="{ width: `${currentHero.speed}%` }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-400">装甲防护 (Armor)</span>
                <span class="text-amber-400 font-bold font-mono">{{ currentHero.armor }} / 100</span>
              </div>
              <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400" :style="{ width: `${currentHero.armor}%` }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-400">主炮火力 (Firepower)</span>
                <span class="text-red-400 font-bold font-mono">{{ currentHero.firepower }} / 100</span>
              </div>
              <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full bg-red-400" :style="{ width: `${currentHero.firepower}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-[#182335]">
          <router-link
            to="/feather/play"
            class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
          >
            <span>🚀</span>
            <span>选用此机体进行实战试飞</span>
          </router-link>
        </div>
      </div>

      <!-- Right: Weapons and Skill Loadouts -->
      <div class="lg:col-span-2 p-6 rounded-2xl bg-[#0e1625] border border-[#1e2a42] space-y-5">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <span>⚡</span>
          <span>机载战术武器与技能系统 (5 技能栏位)</span>
        </h3>

        <div class="space-y-3.5">
          <div class="p-4 rounded-xl bg-[#121c2e] border border-[#202d45]">
            <div class="text-xs text-amber-400 font-bold mb-1">1. 主武器系统 (Main Weapon)</div>
            <div class="text-sm font-semibold text-white mb-1">{{ currentHero.mainWeapon }}</div>
            <p class="text-xs text-gray-400">随火力等级 Lv1~Lv5 改变弹道。拾取关卡能量球或击落精英空机可快速强化。</p>
          </div>

          <div class="p-4 rounded-xl bg-[#121c2e] border border-[#202d45]">
            <div class="text-xs text-cyan-400 font-bold mb-1">2. 副武器系统 (Sub Weapon)</div>
            <div class="text-sm font-semibold text-white mb-1">{{ currentHero.subWeapon }}</div>
            <p class="text-xs text-gray-400">可配合各章节获得的七枚虹棱模组（赤爆裂/青冰冻/黄金雷等）自由替换变异副武器。</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3.5 rounded-xl bg-[#121c2e] border border-[#202d45]">
              <div class="text-xs text-emerald-400 font-bold mb-1">3. 主动战术技能 I</div>
              <div class="text-xs text-white leading-relaxed">{{ currentHero.activeSkill1 }}</div>
            </div>
            <div class="p-3.5 rounded-xl bg-[#121c2e] border border-[#202d45]">
              <div class="text-xs text-emerald-400 font-bold mb-1">4. 主动战术技能 II</div>
              <div class="text-xs text-white leading-relaxed">{{ currentHero.activeSkill2 }}</div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-red-500/10 to-purple-500/10 border border-amber-500/30">
            <div class="text-xs text-amber-300 font-black mb-1 flex items-center gap-1.5">
              <span>👑</span>
              <span>5. 职业超载终极爆发 (Overload Burst)</span>
            </div>
            <div class="text-sm font-bold text-white mb-1">{{ currentHero.overload }}</div>
            <p class="text-xs text-gray-300">
              通过高风险擦弹(Graze)让超载槽满 100% 即可释放。爆发期间具备完全无敌帧，并消灭屏幕上的所有常规弹幕。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-[#121c2e] border border-[#202d45]">
            <div class="text-xs text-purple-400 font-bold mb-1">6. 辅助僚机 (Companion Drone)</div>
            <div class="text-xs text-white">{{ currentHero.drone }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Horn's Workshop Overview -->
    <div class="p-6 rounded-2xl bg-[#0b101c] border border-[#1b263b]">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">🛠️</span>
        <div>
          <h3 class="text-xl font-black text-white">霍恩大师工坊 (Horn's Workshop · 2-5 解锁)</h3>
          <p class="text-xs text-gray-400">纯单机装备养成系统 · 强化 +0~+10 · 固定掉落 · 拒绝课金抽卡</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div class="p-4 rounded-xl bg-[#111929] border border-[#1d2a40]">
          <div class="font-bold text-amber-400 mb-1">🚀 推进引擎 (Engine)</div>
          <div class="text-gray-300 mb-1">提供基础移动速度与冲刺无敌帧加成</div>
          <div class="text-[11px] text-gray-500">示例: 巨鲸重装引擎 (1-6 掉落)</div>
        </div>

        <div class="p-4 rounded-xl bg-[#111929] border border-[#1d2a40]">
          <div class="font-bold text-cyan-400 mb-1">🛡️ 装甲外壳 (Armor)</div>
          <div class="text-gray-300 mb-1">提升机体最大 HP 与受击减伤百分比</div>
          <div class="text-[11px] text-gray-500">示例: 烈焰熔炉装甲 (2-6 掉落)</div>
        </div>

        <div class="p-4 rounded-xl bg-[#111929] border border-[#1d2a40]">
          <div class="font-bold text-red-400 mb-1">💥 武器模组 (Weapon Mod)</div>
          <div class="text-gray-300 mb-1">赋予穿透、暴击、多重散射等弹道特效</div>
          <div class="text-[11px] text-gray-500">示例: 始源时空引擎模组 (6-6 掉落)</div>
        </div>

        <div class="p-4 rounded-xl bg-[#111929] border border-[#1d2a40]">
          <div class="font-bold text-purple-400 mb-1">💍 虹棱饰品 (Accessory)</div>
          <div class="text-gray-300 mb-1">装载 7 色虹棱结晶，触发全套套装共鸣</div>
          <div class="text-[11px] text-gray-500">示例: 金雷风暴饰品 (3-6 掉落)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HERO_CLASSES } from '../data/gameData'

const activeHeroId = ref('windrunner')
const currentHero = computed(() => HERO_CLASSES.find(h => h.id === activeHeroId.value) || HERO_CLASSES[0])
</script>
