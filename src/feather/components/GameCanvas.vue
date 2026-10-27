<template>
  <div class="relative w-full rounded-2xl overflow-hidden border border-[#2a344a] bg-[#070a10] shadow-[0_12px_40px_rgba(0,0,0,0.8)] select-none">
    <!-- Top HUD Bar -->
    <div class="flex items-center justify-between px-4 py-2 bg-[#0e1422] border-b border-[#1f293d] text-xs font-mono">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <span class="text-amber-400 font-bold">机体:</span>
          <span class="text-white bg-[#1a2338] px-2 py-0.5 rounded border border-[#2a3754] font-semibold">
            {{ currentHero.avatar }} {{ currentHero.name }}
          </span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-emerald-400 font-bold">护甲(HP):</span>
          <div class="w-24 h-2.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-150"
              :style="{ width: `${Math.max(0, (playerHp / maxHp) * 100)}%` }"
            ></div>
          </div>
          <span class="text-gray-300 font-mono">{{ playerHp }}/{{ maxHp }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-cyan-400 font-bold">护盾:</span>
          <div class="flex gap-1">
            <div
              v-for="i in maxShields"
              :key="i"
              class="w-3.5 h-3.5 rounded border transition-colors"
              :class="i <= playerShields ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_6px_#06b6d4]' : 'bg-gray-800 border-gray-700'"
            ></div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-5">
        <div class="flex items-center gap-1.5">
          <span class="text-pink-400 font-bold">擦弹(Graze):</span>
          <span class="text-pink-300 font-bold text-sm">{{ grazeCount }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-amber-400 font-bold">超载(Overload):</span>
          <div class="w-24 h-2.5 bg-gray-800 rounded-full overflow-hidden border border-amber-900/60">
            <div
              class="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-100"
              :class="{ 'animate-pulse shadow-[0_0_8px_#f59e0b]': overloadGauge >= 100 }"
              :style="{ width: `${overloadGauge}%` }"
            ></div>
          </div>
          <span class="text-amber-300 font-mono font-bold">{{ Math.floor(overloadGauge) }}%</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-yellow-400 font-bold">得分:</span>
          <span class="text-white font-bold text-sm">{{ score.toLocaleString() }}</span>
        </div>
        <button
          @click="toggleSound"
          class="px-2 py-1 rounded bg-[#1e293b] hover:bg-[#2b3a55] text-gray-300 text-[11px] transition-colors"
        >
          {{ soundEnabled ? '🔊 声音 开' : '🔇 声音 关' }}
        </button>
      </div>
    </div>

    <!-- Main Game Canvas Area -->
    <div class="relative w-full h-[520px] overflow-hidden bg-black flex items-center justify-center">
      <canvas
        ref="canvasRef"
        width="960"
        height="520"
        class="w-full h-full object-contain cursor-crosshair"
      ></canvas>

      <!-- Start Overlay Screen -->
      <div
        v-if="gameState === 'ready'"
        class="absolute inset-0 bg-[#080d1a]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20"
      >
        <div class="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-3">
          单机 2D 横版卷轴飞行射击 · 试玩演示
        </div>
        <h2 class="text-3xl font-extrabold text-white tracking-wider mb-2">
          《裂空之羽》第 1 章 · 赤霞港空战
        </h2>
        <p class="text-gray-300 max-w-lg text-sm mb-6 leading-relaxed">
          驾驶苍鹞骑士团战机，在夕阳云海中穿梭。靠近敌弹可触发<span class="text-pink-400 font-bold">【擦弹 Graze】</span>为超载槽充能，满槽发动无敌全屏终结技！
        </p>

        <!-- Choose Aircraft -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full mb-6">
          <div
            v-for="hero in HERO_CLASSES"
            :key="hero.id"
            @click="selectedHeroId = hero.id"
            class="p-3 rounded-xl border text-left cursor-pointer transition-all duration-200"
            :class="selectedHeroId === hero.id
              ? 'bg-[#1a253c] border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.3)] scale-[1.02]'
              : 'bg-[#101726] border-[#222f46] hover:border-gray-500 opacity-80 hover:opacity-100'"
          >
            <div class="text-2xl mb-1">{{ hero.avatar }}</div>
            <div class="font-bold text-white text-sm flex items-center justify-between">
              {{ hero.name }}
              <span v-if="selectedHeroId === hero.id" class="text-amber-400 text-xs">✓ 选用</span>
            </div>
            <div class="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{{ hero.role }}</div>
          </div>
        </div>

        <button
          @click="startGame"
          class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-950 font-extrabold text-base shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 active:scale-95"
        >
          🚀 立即出击起飞
        </button>

        <div class="mt-4 text-xs text-gray-400 flex items-center gap-4">
          <span>⌨️ 键盘: <kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">W/A/S/D</kbd> 或方向键移动</span>
          <span><kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">J</kbd> 或 <kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">Z</kbd> 射击</span>
          <span><kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">K</kbd> 或 <kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">空格</kbd> 超载爆发</span>
          <span><kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">Shift</kbd> 精准判定</span>
        </div>
      </div>

      <!-- Game Over Screen -->
      <div
        v-if="gameState === 'gameover'"
        class="absolute inset-0 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20"
      >
        <div class="text-5xl mb-2">💥</div>
        <h3 class="text-3xl font-extrabold text-red-400 tracking-wider mb-2">机体坠毁 MISSION FAILED</h3>
        <p class="text-gray-300 text-sm mb-4">云海空域遭遇密集防空弹幕，战机动力衰竭坠落。</p>
        <div class="bg-black/60 px-6 py-3 rounded-xl border border-red-900/50 mb-6 flex gap-6 text-sm">
          <div><span class="text-gray-400">本次最终得分:</span> <span class="text-white font-bold ml-1">{{ score }}</span></div>
          <div><span class="text-gray-400">擦弹次数:</span> <span class="text-pink-400 font-bold ml-1">{{ grazeCount }}</span></div>
        </div>
        <button
          @click="restartGame"
          class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          🔄 重新出击
        </button>
      </div>

      <!-- Victory Screen -->
      <div
        v-if="gameState === 'victory'"
        class="absolute inset-0 bg-gradient-to-b from-[#0a1f18]/90 to-[#07130f]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20"
      >
        <div class="text-5xl mb-2">🏆</div>
        <div class="text-amber-400 font-bold text-sm tracking-widest uppercase mb-1">STAGE CLEARED · 关卡大捷</div>
        <h3 class="text-3xl font-extrabold text-white tracking-wider mb-3">击破赤霞港旗舰【赤鳍巨鲸】！</h3>
        
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="text-2xl text-amber-400">★</span>
          <span class="text-2xl text-amber-400">★</span>
          <span class="text-2xl text-amber-400">★</span>
          <span class="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 ml-2">三星完美通关</span>
        </div>

        <div class="bg-[#0e1f18] px-6 py-4 rounded-xl border border-emerald-500/30 mb-6 max-w-md w-full text-left space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-gray-400">最终战斗评分:</span> <span class="text-emerald-400 font-bold">{{ score }}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">惊险擦弹统计:</span> <span class="text-pink-400 font-bold">{{ grazeCount }} 次</span></div>
          <div class="flex justify-between"><span class="text-gray-400">主线战利品:</span> <span class="text-red-400 font-bold">🟥 赤之虹棱（已点亮赤色彩虹）</span></div>
          <div class="flex justify-between"><span class="text-gray-400">装备掉落:</span> <span class="text-amber-300 font-bold">巨鲸重装引擎 + 工坊零件×15</span></div>
        </div>

        <div class="flex gap-4">
          <button
            @click="restartGame"
            class="px-6 py-2.5 rounded-xl bg-[#1e293b] text-gray-200 hover:bg-[#2c3c56] font-semibold text-sm transition-colors"
          >
            🔄 再次挑战
          </button>
          <router-link
            to="/stages"
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 hover:from-emerald-400 hover:to-teal-400 font-bold text-sm shadow-lg transition-transform hover:scale-105"
          >
            🗺️ 查看后续 7 章节关卡
          </router-link>
        </div>
      </div>

      <!-- Boss Warning Banner -->
      <div
        v-if="bossWarning"
        class="absolute top-16 left-0 right-0 bg-red-600/90 text-white font-black text-center py-2.5 tracking-[0.3em] uppercase text-sm animate-pulse z-10 border-y border-red-300 shadow-[0_0_20px_#ef4444]"
      >
        ⚠️ WARNING: 空天旗舰【赤鳍巨鲸】突入空域 ⚠️
      </div>
    </div>

    <!-- Onscreen Bottom Controls for Mobile / Ease of Use -->
    <div class="px-4 py-3 bg-[#0a0e18] border-t border-[#1f293d] flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-2">
        <span class="text-gray-400 font-medium">战机操作面板:</span>
        <button
          @mousedown="keys.ArrowLeft = true"
          @mouseup="keys.ArrowLeft = false"
          @touchstart.prevent="keys.ArrowLeft = true"
          @touchend.prevent="keys.ArrowLeft = false"
          class="w-8 h-8 rounded bg-[#182338] hover:bg-[#253554] active:bg-amber-600 text-white flex items-center justify-center font-bold border border-[#2a3854]"
        >
          ←
        </button>
        <div class="flex flex-col gap-1">
          <button
            @mousedown="keys.ArrowUp = true"
            @mouseup="keys.ArrowUp = false"
            @touchstart.prevent="keys.ArrowUp = true"
            @touchend.prevent="keys.ArrowUp = false"
            class="w-8 h-8 rounded bg-[#182338] hover:bg-[#253554] active:bg-amber-600 text-white flex items-center justify-center font-bold border border-[#2a3854]"
          >
            ↑
          </button>
          <button
            @mousedown="keys.ArrowDown = true"
            @mouseup="keys.ArrowDown = false"
            @touchstart.prevent="keys.ArrowDown = true"
            @touchend.prevent="keys.ArrowDown = false"
            class="w-8 h-8 rounded bg-[#182338] hover:bg-[#253554] active:bg-amber-600 text-white flex items-center justify-center font-bold border border-[#2a3854]"
          >
            ↓
          </button>
        </div>
        <button
          @mousedown="keys.ArrowRight = true"
          @mouseup="keys.ArrowRight = false"
          @touchstart.prevent="keys.ArrowRight = true"
          @touchend.prevent="keys.ArrowRight = false"
          class="w-8 h-8 rounded bg-[#182338] hover:bg-[#253554] active:bg-amber-600 text-white flex items-center justify-center font-bold border border-[#2a3854]"
        >
          →
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button
          @mousedown="keys.KeyZ = true"
          @mouseup="keys.KeyZ = false"
          @touchstart.prevent="keys.KeyZ = true"
          @touchend.prevent="keys.KeyZ = false"
          class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold shadow transition-colors flex items-center gap-1"
        >
          🔫 开火 (Fire)
        </button>
        <button
          @click="triggerOverload"
          :disabled="overloadGauge < 100"
          class="px-4 py-2 rounded-lg font-bold shadow transition-all flex items-center gap-1"
          :class="overloadGauge >= 100
            ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-gray-950 animate-bounce shadow-[0_0_15px_#f59e0b]'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'"
        >
          ⚡ 超载爆发 (Overload)
        </button>
        <button
          @click="toggleFocusMode"
          class="px-3 py-2 rounded-lg border text-gray-300 text-xs transition-colors"
          :class="focusMode ? 'bg-cyan-900 border-cyan-400 text-cyan-200' : 'bg-[#182235] border-[#293754]'"
        >
          🎯 精准模式: {{ focusMode ? 'ON' : 'OFF' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { HERO_CLASSES } from '../data/gameData'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const selectedHeroId = ref('windrunner')
const currentHero = computed(() => HERO_CLASSES.find(h => h.id === selectedHeroId.value) || HERO_CLASSES[0])

const gameState = ref<'ready' | 'playing' | 'gameover' | 'victory'>('ready')
const score = ref(0)
const grazeCount = ref(0)
const playerHp = ref(100)
const maxHp = 100
const playerShields = ref(3)
const maxShields = 3
const overloadGauge = ref(30)
const soundEnabled = ref(true)
const bossWarning = ref(false)
const focusMode = ref(false)

// Controls state
const keys = reactive<Record<string, boolean>>({
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  KeyW: false,
  KeyS: false,
  KeyA: false,
  KeyD: false,
  KeyJ: false,
  KeyZ: false,
  KeyK: false,
  Space: false,
  ShiftLeft: false,
  ShiftRight: false
})

// Web Audio API Sound Synthesizer (Zero asset dependency)
let audioCtx: AudioContext | null = null

function initAudio() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

function playTone(freq: number, type: OscillatorType, duration: number, gainVal = 0.1) {
  if (!soundEnabled.value) return
  initAudio()
  if (!audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)
    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (_e) {
    // Ignore audio error
  }
}

function playLaser() {
  playTone(580, 'square', 0.08, 0.06)
}

function playExplosion() {
  playTone(120, 'sawtooth', 0.25, 0.12)
}

function playGraze() {
  playTone(920, 'sine', 0.05, 0.04)
}

function playOverload() {
  playTone(320, 'triangle', 0.6, 0.2)
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) initAudio()
}

function toggleFocusMode() {
  focusMode.value = !focusMode.value
}

// Game Loop Entities
interface Player {
  x: number
  y: number
  w: number
  h: number
  speed: number
  invulnerableTimer: number
  shootCooldown: number
}

interface Bullet {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  isPlayer: boolean
  damage: number
  grazed?: boolean
}

interface Enemy {
  x: number
  y: number
  w: number
  h: number
  hp: number
  maxHp: number
  type: 'drone' | 'cruiser' | 'boss'
  shootTimer: number
  shootInterval: number
  speedX: number
  speedY: number
  color: string
  patternPhase?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface BackgroundCloud {
  x: number
  y: number
  w: number
  h: number
  speed: number
  opacity: number
}

const player: Player = {
  x: 80,
  y: 260,
  w: 42,
  h: 24,
  speed: 5.5,
  invulnerableTimer: 0,
  shootCooldown: 0
}

let bullets: Bullet[] = []
let enemies: Enemy[] = []
let particles: Particle[] = []
let clouds: BackgroundCloud[] = []
let animationFrameId: number | null = null
let spawnTimer = 0
let bossSpawned = false

// Initialize Clouds for parallax background
for (let i = 0; i < 20; i++) {
  clouds.push({
    x: Math.random() * 960,
    y: Math.random() * 520,
    w: 60 + Math.random() * 140,
    h: 20 + Math.random() * 50,
    speed: 0.3 + Math.random() * 1.2,
    opacity: 0.08 + Math.random() * 0.15
  })
}

function startGame() {
  initAudio()
  gameState.value = 'playing'
  score.value = 0
  grazeCount.value = 0
  playerHp.value = 100
  playerShields.value = 3
  overloadGauge.value = 40
  bossWarning.value = false
  bossSpawned = false

  player.x = 80
  player.y = 260
  player.invulnerableTimer = 60
  bullets = []
  enemies = []
  particles = []
  spawnTimer = 0
}

function restartGame() {
  startGame()
}

function triggerOverload() {
  if (overloadGauge.value < 100 || gameState.value !== 'playing') return
  overloadGauge.value = 0
  player.invulnerableTimer = 180 // 3 seconds invulnerability
  playOverload()

  // Screen wipe particles & damage
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: player.x,
      y: player.y,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16,
      life: 45,
      maxLife: 45,
      color: '#f59e0b',
      size: 4 + Math.random() * 4
    })
  }

  // Clear all enemy bullets & heavily damage enemies
  bullets = bullets.filter(b => b.isPlayer)
  enemies.forEach(e => {
    e.hp -= 250
    score.value += 200
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: e.x + e.w / 2,
        y: e.y + e.h / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 25,
        maxLife: 25,
        color: '#ef4444',
        size: 3
      })
    }
  })
}

function gameLoop() {
  if (gameState.value === 'playing') {
    update()
  }
  render()
  animationFrameId = requestAnimationFrame(gameLoop)
}

function update() {
  // Overload gradual increase
  if (overloadGauge.value < 100) {
    overloadGauge.value = Math.min(100, overloadGauge.value + 0.04)
  }

  // Focus Mode reduces movement speed for precise dodging
  const isFocus = keys.ShiftLeft || keys.ShiftRight || focusMode.value
  const currentSpeed = isFocus ? player.speed * 0.45 : player.speed

  // Movement input
  let dx = 0
  let dy = 0
  if (keys.ArrowUp || keys.KeyW) dy -= 1
  if (keys.ArrowDown || keys.KeyS) dy += 1
  if (keys.ArrowLeft || keys.KeyA) dx -= 1
  if (keys.ArrowRight || keys.KeyD) dx += 1

  if (dx !== 0 && dy !== 0) {
    dx *= 0.7071
    dy *= 0.7071
  }

  player.x = Math.max(20, Math.min(940 - player.w, player.x + dx * currentSpeed))
  player.y = Math.max(20, Math.min(500 - player.h, player.y + dy * currentSpeed))

  if (player.invulnerableTimer > 0) player.invulnerableTimer--

  // Shooting input
  if (player.shootCooldown > 0) player.shootCooldown--
  const isShooting = keys.KeyJ || keys.KeyZ || keys.Space
  if (isShooting && player.shootCooldown <= 0) {
    player.shootCooldown = 7
    playLaser()

    // Weapon styles by class
    if (selectedHeroId.value === 'windrunner') {
      // 3-way scatter wind blades
      bullets.push({ x: player.x + player.w, y: player.y + player.h / 2, vx: 13, vy: 0, radius: 4, color: '#38bdf8', isPlayer: true, damage: 18 })
      bullets.push({ x: player.x + player.w, y: player.y + player.h / 2 - 4, vx: 12.5, vy: -2, radius: 3.5, color: '#06b6d4', isPlayer: true, damage: 14 })
      bullets.push({ x: player.x + player.w, y: player.y + player.h / 2 + 4, vx: 12.5, vy: 2, radius: 3.5, color: '#06b6d4', isPlayer: true, damage: 14 })
    } else if (selectedHeroId.value === 'ironclad') {
      // Heavy twin explosive cannons
      bullets.push({ x: player.x + player.w, y: player.y + 4, vx: 11, vy: 0, radius: 6, color: '#f97316', isPlayer: true, damage: 32 })
      bullets.push({ x: player.x + player.w, y: player.y + player.h - 4, vx: 11, vy: 0, radius: 6, color: '#f97316', isPlayer: true, damage: 32 })
    } else if (selectedHeroId.value === 'arcanist') {
      // Ether tracking orbs
      bullets.push({ x: player.x + player.w, y: player.y + player.h / 2, vx: 12, vy: (Math.random() - 0.5) * 4, radius: 4.5, color: '#c084fc', isPlayer: true, damage: 22 })
    } else {
      // Rapid piercing nails
      bullets.push({ x: player.x + player.w, y: player.y + player.h / 2, vx: 15, vy: 0, radius: 3, color: '#fbbf24', isPlayer: true, damage: 20 })
    }
  }

  // Check Overload Key
  if (keys.KeyK) {
    triggerOverload()
  }

  // Update Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i]
    b.x += b.vx
    b.y += b.vy

    // Graze detection on enemy bullets
    if (!b.isPlayer && !b.grazed) {
      const pCenter = { x: player.x + player.w / 2, y: player.y + player.h / 2 }
      const dist = Math.hypot(b.x - pCenter.x, b.y - pCenter.y)
      // Graze range ~28px, hit range ~8px
      if (dist < 28 && dist > 8) {
        b.grazed = true
        grazeCount.value++
        score.value += 50
        overloadGauge.value = Math.min(100, overloadGauge.value + 4)
        playGraze()
        // Graze sparks
        for (let s = 0; s < 3; s++) {
          particles.push({
            x: b.x,
            y: b.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 12,
            maxLife: 12,
            color: '#f472b6',
            size: 2
          })
        }
      }
    }

    // Player bullet hit enemy
    if (b.isPlayer) {
      for (const e of enemies) {
        if (b.x >= e.x && b.x <= e.x + e.w && b.y >= e.y && b.y <= e.y + e.h) {
          e.hp -= b.damage
          score.value += 10
          particles.push({
            x: b.x,
            y: b.y,
            vx: -2 + Math.random() * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 10,
            maxLife: 10,
            color: b.color,
            size: 2.5
          })
          bullets.splice(i, 1)
          break
        }
      }
    } else {
      // Enemy bullet hit player hitbox
      const pCenter = { x: player.x + player.w / 2, y: player.y + player.h / 2 }
      const dist = Math.hypot(b.x - pCenter.x, b.y - pCenter.y)
      if (dist < b.radius + 5 && player.invulnerableTimer <= 0) {
        bullets.splice(i, 1)
        if (playerShields.value > 0) {
          playerShields.value--
          player.invulnerableTimer = 40
          playExplosion()
        } else {
          playerHp.value -= b.damage
          player.invulnerableTimer = 60
          playExplosion()
          if (playerHp.value <= 0) {
            playerHp.value = 0
            gameState.value = 'gameover'
            return
          }
        }
      }
    }

    // Bullet out of bounds
    if (b.x < -20 || b.x > 980 || b.y < -20 || b.y > 540) {
      bullets.splice(i, 1)
    }
  }

  // Spawn Enemies & Boss Logic
  spawnTimer++
  if (!bossSpawned && score.value < 1500 && spawnTimer % 70 === 0) {
    const isCruiser = Math.random() > 0.65
    enemies.push({
      x: 960,
      y: 40 + Math.random() * 420,
      w: isCruiser ? 56 : 36,
      h: isCruiser ? 36 : 24,
      hp: isCruiser ? 80 : 30,
      maxHp: isCruiser ? 80 : 30,
      type: isCruiser ? 'cruiser' : 'drone',
      shootTimer: 0,
      shootInterval: isCruiser ? 55 : 80,
      speedX: isCruiser ? -1.8 : -2.6,
      speedY: Math.sin(spawnTimer * 0.05) * 1.2,
      color: isCruiser ? '#ef4444' : '#f97316'
    })
  }

  // Boss appearance trigger
  if (score.value >= 1500 && !bossSpawned) {
    bossSpawned = true
    bossWarning.value = true
    setTimeout(() => {
      bossWarning.value = false
      const boss: Enemy = {
        x: 960,
        y: 180,
        w: 160,
        h: 90,
        hp: 1200,
        maxHp: 1200,
        type: 'boss',
        shootTimer: 0,
        shootInterval: 30,
        speedX: -1.2,
        speedY: 1.5,
        color: '#dc2626',
        patternPhase: 0
      }
      enemies.push(boss)
    }, 2000)
  }

  // Update Enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i]
    e.x += e.speedX
    e.y += e.speedY

    if (e.type === 'boss') {
      // Boss boundary and behavior
      if (e.x < 740) {
        e.speedX = 0
      }
      if (e.y < 50 || e.y > 380) {
        e.speedY = -e.speedY
      }

      e.shootTimer++
      if (e.shootTimer >= e.shootInterval) {
        e.shootTimer = 0
        // Whale Boss Spiral Pattern
        const count = 8
        const baseAngle = (Date.now() / 400) % (Math.PI * 2)
        for (let a = 0; a < count; a++) {
          const angle = baseAngle + (a * (Math.PI * 2)) / count
          bullets.push({
            x: e.x + 20,
            y: e.y + e.h / 2,
            vx: Math.cos(angle) * 3.5,
            vy: Math.sin(angle) * 3.5,
            radius: 5,
            color: '#ef4444',
            isPlayer: false,
            damage: 25
          })
        }
      }
    } else {
      // Standard enemies
      if (e.y < 30 || e.y > 470) e.speedY = -e.speedY
      e.shootTimer++
      if (e.shootTimer >= e.shootInterval && e.x > 150) {
        e.shootTimer = 0
        bullets.push({
          x: e.x,
          y: e.y + e.h / 2,
          vx: -5,
          vy: (player.y - e.y) * 0.015,
          radius: 4,
          color: '#fb923c',
          isPlayer: false,
          damage: 15
        })
      }
    }

    // Death check
    if (e.hp <= 0) {
      playExplosion()
      score.value += e.type === 'boss' ? 5000 : 150
      // Explosion particles
      for (let p = 0; p < (e.type === 'boss' ? 60 : 16); p++) {
        particles.push({
          x: e.x + e.w / 2,
          y: e.y + e.h / 2,
          vx: (Math.random() - 0.5) * (e.type === 'boss' ? 12 : 7),
          vy: (Math.random() - 0.5) * (e.type === 'boss' ? 12 : 7),
          life: 30,
          maxLife: 30,
          color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
          size: 3 + Math.random() * 3
        })
      }

      if (e.type === 'boss') {
        gameState.value = 'victory'
      }
      enemies.splice(i, 1)
      continue
    }

    // Out of screen
    if (e.x < -100) {
      enemies.splice(i, 1)
    }
  }

  // Update Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.life--
    if (p.life <= 0) {
      particles.splice(i, 1)
    }
  }

  // Update Parallax Background Clouds
  for (const c of clouds) {
    c.x -= c.speed
    if (c.x + c.w < 0) {
      c.x = 960 + Math.random() * 100
      c.y = Math.random() * 520
    }
  }
}

function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 1. Clear & Draw Sky Backdrop (Steampunk Sunset Clouds)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 520)
  skyGrad.addColorStop(0, '#0c1322')
  skyGrad.addColorStop(0.5, '#1e1b2e')
  skyGrad.addColorStop(0.85, '#3b1c1c')
  skyGrad.addColorStop(1, '#6b2d24')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, 960, 520)

  // Floating Island Silhouettes
  ctx.fillStyle = '#080c14'
  ctx.beginPath()
  ctx.ellipse(300, 480, 160, 45, 0, 0, Math.PI * 2)
  ctx.ellipse(750, 490, 200, 50, 0, 0, Math.PI * 2)
  ctx.fill()

  // 2. Parallax Clouds
  for (const c of clouds) {
    ctx.fillStyle = `rgba(255, 220, 200, ${c.opacity})`
    ctx.beginPath()
    ctx.roundRect(c.x, c.y, c.w, c.h, 16)
    ctx.fill()
  }

  // 3. Draw Particles
  for (const p of particles) {
    ctx.fillStyle = p.color
    ctx.globalAlpha = p.life / p.maxLife
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1.0

  // 4. Draw Bullets
  for (const b of bullets) {
    ctx.fillStyle = b.color
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
    ctx.fill()
    // Inner bright core
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.radius * 0.45, 0, Math.PI * 2)
    ctx.fill()
  }

  // 5. Draw Enemies
  for (const e of enemies) {
    if (e.type === 'boss') {
      // Crimson Fin Whale Airship Boss
      ctx.fillStyle = '#7f1d1d'
      ctx.strokeStyle = '#f87171'
      ctx.lineWidth = 3
      ctx.beginPath()
      // Whale body outline
      ctx.roundRect(e.x, e.y, e.w, e.h, 24)
      ctx.fill()
      ctx.stroke()

      // Giant Whale Fins & Armor Plates
      ctx.fillStyle = '#991b1b'
      ctx.fillRect(e.x + 30, e.y - 12, 45, 12)
      ctx.fillRect(e.x + 30, e.y + e.h, 45, 12)
      // Glowing Core
      ctx.fillStyle = '#ef4444'
      ctx.shadowColor = '#ef4444'
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(e.x + 35, e.y + e.h / 2, 16, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Boss HP Bar above boss
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(e.x, e.y - 20, e.w, 8)
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(e.x, e.y - 20, (e.hp / e.maxHp) * e.w, 8)
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      ctx.strokeRect(e.x, e.y - 20, e.w, 8)
    } else {
      // Standard Airships
      ctx.fillStyle = e.color
      ctx.beginPath()
      ctx.roundRect(e.x, e.y, e.w, e.h, 6)
      ctx.fill()
      ctx.fillStyle = '#374151'
      ctx.fillRect(e.x + e.w - 8, e.y + 4, 6, e.h - 8)
    }
  }

  // 6. Draw Player Aircraft
  if (gameState.value === 'playing') {
    const isBlinking = player.invulnerableTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0
    if (!isBlinking) {
      // Steampunk Wings & Body
      ctx.save()
      ctx.translate(player.x, player.y)

      // Exhaust steam particle trail
      ctx.fillStyle = 'rgba(245, 158, 11, 0.7)'
      ctx.beginPath()
      ctx.arc(-6, player.h / 2, 5 + Math.random() * 3, 0, Math.PI * 2)
      ctx.fill()

      // Aircraft Fuselage
      ctx.fillStyle = currentHero.value.color
      ctx.beginPath()
      ctx.moveTo(player.w, player.h / 2) // Nose cone
      ctx.lineTo(8, 0) // Upper wing tip
      ctx.lineTo(0, player.h / 2 - 4)
      ctx.lineTo(0, player.h / 2 + 4)
      ctx.lineTo(8, player.h) // Lower wing tip
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Cockpit Window
      ctx.fillStyle = '#38bdf8'
      ctx.beginPath()
      ctx.arc(player.w * 0.6, player.h / 2, 4, 0, Math.PI * 2)
      ctx.fill()

      // Precise Hitbox Dot (Crucial STG mechanic from doc: 6x6 pixel glowing core!)
      const isFocus = keys.ShiftLeft || keys.ShiftRight || focusMode.value
      if (isFocus) {
        ctx.fillStyle = '#ffffff'
        ctx.strokeStyle = '#ec4899'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(player.w / 2, player.h / 2, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        // Graze Ring Indicator
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)'
        ctx.beginPath()
        ctx.arc(player.w / 2, player.h / 2, 26, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.restore()
    }
  }
}

// Global Key Listeners
function handleKeyDown(e: KeyboardEvent) {
  if (keys[e.code] !== undefined) {
    keys[e.code] = true
  }
}

function handleKeyUp(e: KeyboardEvent) {
  if (keys[e.code] !== undefined) {
    keys[e.code] = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  animationFrameId = requestAnimationFrame(gameLoop)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (audioCtx) {
    audioCtx.close()
  }
})
</script>
