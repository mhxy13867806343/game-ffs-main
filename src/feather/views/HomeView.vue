<template>
  <div class="w-full flex flex-col items-center">
    <!-- Hero Section -->
    <section class="relative w-full py-16 lg:py-24 overflow-hidden border-b border-[#182335]">
      <!-- Ambient Glows -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div class="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="content-container relative z-10 flex flex-col items-center text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>原创单机企划 · 2D 横版卷轴飞行射击 + 角色养成</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
          《<span class="text-gold-gradient">裂空之羽</span>》
        </h1>
        <p class="text-gray-300 text-lg sm:text-xl max-w-2xl font-light mb-8 leading-relaxed">
          云海浮岛「云垣」面临渊蚀侵袭。作为苍鹞骑士团王牌，击破七道虹脉的渊蚀巨舰，夺回七枚虹棱，登临虹上之天！
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
          <router-link
            to="/feather/play"
            class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-gray-950 font-extrabold text-base shadow-[0_4px_25px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>🚀</span>
            <span>立即试玩作战 (第一章)</span>
          </router-link>

          <router-link
            to="/feather/stages"
            class="px-7 py-3.5 rounded-xl bg-[#131b2c] hover:bg-[#1a253c] border border-[#26354f] text-gray-200 font-bold text-base transition-all hover:border-amber-400 flex items-center gap-2"
          >
            <span>🗺️</span>
            <span>全 8 章 48 关全景图谱</span>
          </router-link>

          <router-link
            to="/feather/doc"
            class="px-7 py-3.5 rounded-xl bg-[#131b2c] hover:bg-[#1a253c] border border-[#26354f] text-amber-300 font-bold text-base transition-all hover:border-amber-400 flex items-center gap-2"
          >
            <span>📜</span>
            <span>完整策划设计文档 (v1.3)</span>
          </router-link>
        </div>

        <!-- Rainbow Spectrum Pipeline -->
        <div class="w-full max-w-4xl p-4 rounded-2xl bg-[#0c1220]/80 border border-[#1e2a40] backdrop-blur">
          <div class="text-xs text-gray-400 font-semibold mb-3 flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="text-amber-400">🌈</span>
              <span>七色彩虹主线光谱与虹棱进度</span>
            </span>
            <span class="text-gray-400">单机 15~20 小时完整主线 · 无需联网</span>
          </div>

          <div class="grid grid-cols-4 sm:grid-cols-8 gap-2">
            <router-link
              v-for="ch in CHAPTERS_DATA"
              :key="ch.id"
              :to="{ path: '/feather/stages', query: { chapter: ch.id } }"
              class="flex flex-col items-center p-2 rounded-xl border transition-all duration-200 group"
              :style="{ borderColor: `${ch.color}40`, backgroundColor: `${ch.color}10` }"
            >
              <div class="w-3 h-3 rounded-full mb-1 group-hover:scale-125 transition-transform" :style="{ backgroundColor: ch.color, boxShadow: `0 0 8px ${ch.color}` }"></div>
              <span class="text-[11px] font-bold text-white group-hover:text-amber-300">{{ ch.name.split('·')[0].trim() }}</span>
              <span class="text-[10px] text-gray-400 line-clamp-1">{{ ch.name.split('·')[1]?.trim() }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Embedded Playable Teaser -->
    <section class="w-full py-14 bg-[#080c14] border-b border-[#182335]">
      <div class="content-container">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div class="inline-block text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              LIVE CANVAS DEMO · 试玩演示
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
              苍鹞初鸣 · 赤霞港上空接敌
            </h2>
          </div>
          <div class="text-xs text-gray-400 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>已支持按键移动、擦弹蓄力、超载爆发与赤鳍巨鲸 Boss 战斗</span>
          </div>
        </div>

        <GameCanvas />
      </div>
    </section>

    <!-- Core Highlights Grid -->
    <section class="w-full py-16 content-container">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-white mb-3">四大核心玩法体系</h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto">
          忠实还原策划文档中的 STG 精髓与单机 RPG 装备成长节奏
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-6 rounded-2xl bg-[#0e1524] border border-[#1e2a42] card-glow flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-2xl mb-4">
              🎯
            </div>
            <h3 class="text-lg font-bold text-white mb-2">微核心精准擦弹 (Graze)</h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-4">
              战机碰撞体仅 6×6 像素。贴近密集的敌方弹幕擦弹，即可快速蓄满超载能量槽，实现高风险高回报的刺激走位。
            </p>
          </div>
          <div class="text-[11px] text-cyan-400 font-semibold">
            超载爆发期间全屏清弹并进入无敌 →
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-[#0e1524] border border-[#1e2a42] card-glow flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl mb-4">
              ⚔️
            </div>
            <h3 class="text-lg font-bold text-white mb-2">4 大专属战机职业</h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-4">
              风行者（高机动近身）、铁壁炮手（双联重炮护壁）、秘术师（追踪以太飞弹）、机巧师（哨戒无人机）。
            </p>
          </div>
          <router-link to="/feather/characters" class="text-[11px] text-amber-400 font-semibold hover:underline">
            浏览职业技能树与专属大招 →
          </router-link>
        </div>

        <div class="p-6 rounded-2xl bg-[#0e1524] border border-[#1e2a42] card-glow flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center text-2xl mb-4">
              👾
            </div>
            <h3 class="text-lg font-bold text-white mb-2">全 48 Boss 震撼登场</h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-4">
              从赤霞港空天巨舰【赤鳍巨鲸】到火山机兵【熔炉巨像】，再到终局决战无色之源【虚冕·诺克提斯】，机制层层演进。
            </p>
          </div>
          <router-link to="/feather/stages" class="text-[11px] text-red-400 font-semibold hover:underline">
            查看 48 关与首领机制 →
          </router-link>
        </div>

        <div class="p-6 rounded-2xl bg-[#0e1524] border border-[#1e2a42] card-glow flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center text-2xl mb-4">
              ⚙️
            </div>
            <h3 class="text-lg font-bold text-white mb-2">纯单机装备养成体系</h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-4">
              霍恩工坊强化 +0~+10，固定关卡装备掉落，虹色模组副武器切换。彻底拒绝课金抽卡与体力限制。
            </p>
          </div>
          <router-link to="/feather/doc" class="text-[11px] text-purple-400 font-semibold hover:underline">
            查阅养成与数值平衡设计 →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Boss Showcase -->
    <section class="w-full py-16 bg-[#080d17] border-t border-[#182335]">
      <div class="content-container">
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              CHAPTER BOSSES · 章节主首领速览
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
              守卫虹棱的八大巅峰强敌
            </h2>
          </div>
          <router-link to="/feather/stages" class="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold">
            <span>浏览全 48 关 Boss 详情</span>
            <span>→</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="boss in BOSS_LIST"
            :key="boss.code"
            class="p-4 rounded-xl bg-[#0f1728] border border-[#1f2b42] hover:border-amber-400/60 transition-all group flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between text-xs mb-2">
                <span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono font-bold">{{ boss.code }}</span>
                <span class="text-gray-400">{{ boss.chapter }}</span>
              </div>
              <h4 class="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                {{ boss.name }}
              </h4>
              <div class="text-xs text-gray-400 mb-2">
                类型: <span class="text-gray-300">{{ boss.type }}</span>
              </div>
              <p class="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-3">
                {{ boss.feature }}
              </p>
            </div>
            <div class="pt-3 border-t border-[#1a2335] text-[10px] text-amber-300/90 font-mono">
              🎁 核心掉落: {{ boss.drop }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import GameCanvas from '../components/GameCanvas.vue'
import { CHAPTERS_DATA, BOSS_LIST } from '../data/gameData'
</script>
