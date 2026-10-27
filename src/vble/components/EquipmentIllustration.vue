<template>
  <div class="equipment-illustration-card relative overflow-hidden rounded-2xl flex items-center justify-center select-none" :class="wrapperClass">
    <!-- 背景流光与渐变光晕 -->
    <div class="absolute inset-0 bg-radial pointer-events-none opacity-80" :style="radialGlowStyle"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

    <!-- 稀有度专属光环角标 -->
    <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
      <span class="text-xs px-2 py-0.5 rounded font-mono font-black border backdrop-blur-md" :class="rarityBadgeClass">
        {{ item?.rarityText || 'SSR 神兵' }}
      </span>
      <span class="text-[11px] font-bold text-gray-300 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
        {{ item?.typeName || '神兵防具' }}
      </span>
    </div>

    <div class="absolute top-2.5 right-2.5 flex items-center gap-1 z-10">
      <span v-for="n in (item?.rarity || 5)" :key="n" class="text-amber-400 text-xs">⭐</span>
    </div>

    <!-- 核心 SVG 装备渲染立绘 -->
    <div class="relative z-10 w-full h-full flex items-center justify-center p-4">
      <svg
        :viewBox="svgViewBox"
        class="w-full h-full max-h-56 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- 圣光金黄渐变 -->
          <linearGradient id="goldBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff8db" />
            <stop offset="40%" stop-color="#fbbf24" />
            <stop offset="100%" stop-color="#b45309" />
          </linearGradient>

          <!-- 虚空暗夜渐变 -->
          <linearGradient id="voidBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e9d5ff" />
            <stop offset="50%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#3b0764" />
          </linearGradient>

          <!-- 秘法青蓝渐变 -->
          <linearGradient id="cyanBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#cffafe" />
            <stop offset="50%" stop-color="#06b6d4" />
            <stop offset="100%" stop-color="#0e7490" />
          </linearGradient>

          <!-- 烈焰赤红渐变 -->
          <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fee2e2" />
            <stop offset="50%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#991b1b" />
          </linearGradient>

          <!-- 铠甲精钢渐变 -->
          <linearGradient id="steelArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f1f5f9" />
            <stop offset="40%" stop-color="#94a3b8" />
            <stop offset="100%" stop-color="#334155" />
          </linearGradient>

          <!-- 缎带华彩粉紫渐变 -->
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf2f8" />
            <stop offset="40%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#be185d" />
          </linearGradient>

          <!-- 发光滤镜 -->
          <filter id="weaponGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- 1. 诸神之黄昏 / 圣剑 / 巨剑 (Sword) -->
        <g v-if="visualType === 'sword'">
          <!-- 剑气光环 -->
          <circle cx="150" cy="150" r="110" stroke="url(#goldBladeGrad)" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.4" />
          <circle cx="150" cy="150" r="85" stroke="url(#goldBladeGrad)" stroke-width="0.8" opacity="0.3" />
          <!-- 剑身倒影光芒 -->
          <polygon points="150,15 168,170 150,225 132,170" fill="url(#goldBladeGrad)" filter="url(#weaponGlow)" opacity="0.3" />
          <!-- 圣剑剑刃 -->
          <polygon points="150,25 163,165 150,210 137,165" fill="url(#goldBladeGrad)" />
          <polygon points="150,25 150,210 163,165" fill="#fde68a" opacity="0.5" />
          <!-- 剑身铭文凹槽 -->
          <line x1="150" y1="45" x2="150" y2="185" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
          <line x1="150" y1="55" x2="150" y2="165" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          <!-- 剑格护手 -->
          <path d="M110,195 Q150,215 190,195 Q205,210 185,215 Q150,210 115,215 Q95,210 110,195 Z" fill="#b45309" stroke="#fef08a" stroke-width="1.5" />
          <circle cx="150" cy="205" r="7" fill="#ef4444" stroke="#fbbf24" stroke-width="2" />
          <!-- 剑柄与配重球 -->
          <rect x="146" y="213" width="8" height="48" rx="3" fill="#451a03" stroke="#d97706" stroke-width="1.2" />
          <circle cx="150" cy="268" r="9" fill="#b45309" stroke="#fef08a" stroke-width="2" />
          <!-- 圣光十字星 -->
          <path d="M150,10 L153,23 L166,25 L153,27 L150,40 L147,27 L134,25 L147,23 Z" fill="#ffffff" filter="url(#weaponGlow)" />
        </g>

        <!-- 2. 正宗 / 村雨 / 太刀 (Katana) -->
        <g v-else-if="visualType === 'katana'">
          <!-- 刀气半月残影 -->
          <path d="M70,250 Q160,110 240,40" stroke="url(#flameGrad)" stroke-width="12" stroke-linecap="round" opacity="0.25" filter="url(#weaponGlow)" />
          <!-- 太刀弧形刃身 -->
          <path d="M85,240 Q165,115 235,45 Q230,52 155,125 Q82,235 85,240 Z" fill="url(#steelArmorGrad)" stroke="#f8fafc" stroke-width="1.5" />
          <!-- 淬火刃纹 (Hamon) -->
          <path d="M88,235 Q120,175 140,150 Q170,120 225,55" stroke="url(#flameGrad)" stroke-width="2.5" stroke-dasharray="6 3" fill="none" opacity="0.8" />
          <!-- 刀镡 (Tsuba) -->
          <ellipse cx="85" cy="240" rx="14" ry="9" transform="rotate(-40 85 240)" fill="#d97706" stroke="#fbbf24" stroke-width="2" />
          <!-- 刀柄 (Tsuka) 缠绳 -->
          <line x1="85" y1="240" x2="45" y2="280" stroke="#7f1d1d" stroke-width="9" stroke-linecap="round" />
          <line x1="85" y1="240" x2="45" y2="280" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round" />
        </g>

        <!-- 3. 诸神之杖 / 贤者法杖 (Staff) -->
        <g v-else-if="visualType === 'staff'">
          <!-- 法杖魔能环 -->
          <circle cx="150" cy="90" r="55" stroke="url(#cyanBladeGrad)" stroke-width="2" stroke-dasharray="10 5" opacity="0.6" />
          <circle cx="150" cy="90" r="70" stroke="url(#voidBladeGrad)" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.4" />
          <!-- 浮空魔导水晶球 -->
          <circle cx="150" cy="90" r="24" fill="url(#voidBladeGrad)" filter="url(#weaponGlow)" />
          <circle cx="143" cy="83" r="7" fill="#ffffff" opacity="0.7" />
          <!-- 杖头金色拱翼环抱 -->
          <path d="M125,125 C110,85 130,45 150,45 C170,45 190,85 175,125 C165,110 135,110 125,125 Z" fill="none" stroke="url(#goldBladeGrad)" stroke-width="5" stroke-linecap="round" />
          <path d="M105,95 C100,65 125,35 150,35 C175,35 200,65 195,95" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 4" />
          <!-- 长柄法杖木身 -->
          <rect x="146" y="125" width="8" height="150" rx="3" fill="#3b200b" stroke="#78350f" stroke-width="1" />
          <!-- 符文镶金箍节 -->
          <rect x="144" y="140" width="12" height="7" rx="1.5" fill="#f59e0b" />
          <rect x="144" y="190" width="12" height="7" rx="1.5" fill="#f59e0b" />
          <rect x="144" y="240" width="12" height="7" rx="1.5" fill="#f59e0b" />
        </g>

        <!-- 4. 暗杀匕首 / 舞者短剑 (Dagger) -->
        <g v-else-if="visualType === 'dagger'">
          <!-- 毒素与阴影刃雾 -->
          <path d="M150,50 Q180,140 150,210 Q120,140 150,50" fill="url(#voidBladeGrad)" opacity="0.25" filter="url(#weaponGlow)" />
          <!-- 双刃匕首刃部 -->
          <polygon points="150,40 166,150 150,195 134,150" fill="url(#steelArmorGrad)" stroke="#c084fc" stroke-width="1.5" />
          <line x1="150" y1="60" x2="150" y2="185" stroke="#9333ea" stroke-width="2" />
          <!-- 幽暗血槽波浪纹 -->
          <path d="M142,110 Q150,120 142,130 Q150,140 142,150" stroke="#f43f5e" stroke-width="1.8" fill="none" />
          <path d="M158,110 Q150,120 158,130 Q150,140 158,150" stroke="#f43f5e" stroke-width="1.8" fill="none" />
          <!-- 弧形獠牙护手 -->
          <path d="M115,185 Q150,200 185,185 Q175,200 150,202 Q125,200 115,185 Z" fill="#581c87" stroke="#e9d5ff" stroke-width="1.5" />
          <!-- 握柄与骷髅/宝石柄尾 -->
          <rect x="146" y="202" width="8" height="38" rx="2" fill="#1e1b4b" stroke="#6b21a8" stroke-width="1.5" />
          <polygon points="150,242 157,250 150,258 143,250" fill="#a855f7" stroke="#f3e8ff" stroke-width="1.2" />
        </g>

        <!-- 5. 神圣之枪 / 飞龙重矛 (Spear) -->
        <g v-else-if="visualType === 'spear'">
          <!-- 螺旋风暴光效 -->
          <ellipse cx="150" cy="150" rx="90" ry="25" transform="rotate(-30 150 150)" stroke="url(#cyanBladeGrad)" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.5" />
          <!-- 长矛穿刺尖锋 -->
          <polygon points="150,20 162,110 150,140 138,110" fill="url(#cyanBladeGrad)" stroke="#ffffff" stroke-width="1.5" filter="url(#weaponGlow)" />
          <line x1="150" y1="30" x2="150" y2="130" stroke="#ffffff" stroke-width="1.5" />
          <!-- 两侧龙翼倒刺 -->
          <path d="M138,95 Q115,115 125,135 Q135,125 142,115 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2" />
          <path d="M162,95 Q185,115 175,135 Q165,125 158,115 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2" />
          <!-- 银白重枪长杆 -->
          <rect x="147" y="140" width="6" height="140" rx="2" fill="#0f172a" stroke="#0284c7" stroke-width="1.5" />
          <circle cx="150" cy="142" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
        </g>

        <!-- 6. 诸神之盾 / 源氏之盾 (Shield) -->
        <g v-else-if="visualType === 'shield'">
          <!-- 绝对防御神圣结界 -->
          <polygon points="150,30 225,65 210,185 150,265 90,185 75,65" fill="url(#goldBladeGrad)" opacity="0.15" filter="url(#weaponGlow)" />
          <!-- 外层金边盾牌主形 -->
          <polygon points="150,45 215,75 200,180 150,250 100,180 85,75" fill="#1e293b" stroke="url(#goldBladeGrad)" stroke-width="4.5" />
          <!-- 内层坚盾核心纹饰 -->
          <polygon points="150,65 195,90 185,170 150,225 115,170 105,90" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
          <!-- 盾心救世圣徽 / 宝石 -->
          <circle cx="150" cy="140" r="18" fill="url(#flameGrad)" stroke="#fde047" stroke-width="2.5" />
          <path d="M150,115 L153,135 L170,140 L153,145 L150,165 L147,145 L130,140 L147,135 Z" fill="#ffffff" />
        </g>

        <!-- 7. 头部防具 / 缎带 / 源氏之盔 (Headgear) -->
        <g v-else-if="visualType === 'head'">
          <g v-if="item?.name.includes('缎带')">
            <!-- 飘逸彩带七彩光晕 -->
            <path d="M60,190 C90,110 130,90 150,90 C170,90 210,110 240,190 C220,180 180,120 150,120 C120,120 80,180 60,190 Z" fill="url(#ribbonGrad)" filter="url(#weaponGlow)" />
            <!-- 蝴蝶结双翼 -->
            <path d="M150,130 C130,90 80,100 95,145 C110,175 140,150 150,130 Z" fill="url(#ribbonGrad)" stroke="#fda4af" stroke-width="2" />
            <path d="M150,130 C170,90 220,100 205,145 C190,175 160,150 150,130 Z" fill="url(#ribbonGrad)" stroke="#fda4af" stroke-width="2" />
            <!-- 缎带中心闪耀晶石 -->
            <circle cx="150" cy="135" r="9" fill="#ffffff" stroke="#f43f5e" stroke-width="2.5" />
            <!-- 下垂丝带飘带 -->
            <path d="M144,142 Q125,200 110,245 Q125,230 142,165 Z" fill="url(#ribbonGrad)" opacity="0.85" />
            <path d="M156,142 Q175,200 190,245 Q175,230 158,165 Z" fill="url(#ribbonGrad)" opacity="0.85" />
          </g>
          <g v-else>
            <!-- 战盔重型角饰 -->
            <path d="M150,55 L165,95 L150,90 L135,95 Z" fill="#f59e0b" stroke="#fde68a" stroke-width="1.5" />
            <path d="M135,90 C110,60 85,80 80,110 C100,105 125,115 130,125 Z" fill="url(#steelArmorGrad)" stroke="#d97706" stroke-width="2" />
            <path d="M165,90 C190,60 215,80 220,110 C200,105 175,115 170,125 Z" fill="url(#steelArmorGrad)" stroke="#d97706" stroke-width="2" />
            <!-- 头盔主体面甲 -->
            <path d="M110,120 Q150,105 190,120 L195,185 Q150,225 105,185 Z" fill="url(#steelArmorGrad)" stroke="#fbbf24" stroke-width="2.5" />
            <!-- 眼神护目缝隙 (透出威严金光) -->
            <rect x="125" y="148" width="50" height="8" rx="2" fill="#020617" />
            <rect x="128" y="150" width="18" height="4" rx="1" fill="#38bdf8" filter="url(#weaponGlow)" />
            <rect x="154" y="150" width="18" height="4" rx="1" fill="#38bdf8" filter="url(#weaponGlow)" />
          </g>
        </g>

        <!-- 8. 身体防具 / 诸神之铠 / 黑色长袍 (Body Armor) -->
        <g v-else-if="visualType === 'body'">
          <!-- 胸甲护肩神圣轮廓 -->
          <path d="M90,85 Q65,110 80,150 Q105,135 115,110 Z" fill="url(#steelArmorGrad)" stroke="#fbbf24" stroke-width="2" />
          <path d="M210,85 Q235,110 220,150 Q195,135 185,110 Z" fill="url(#steelArmorGrad)" stroke="#fbbf24" stroke-width="2" />
          <!-- 领口与颈部护圈 -->
          <path d="M115,80 Q150,95 185,80 L180,105 Q150,115 120,105 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
          <!-- 胸甲主铠胸部与腹肌护甲 -->
          <path d="M115,105 Q150,115 185,105 L190,185 Q150,220 110,185 Z" fill="url(#steelArmorGrad)" stroke="#fbbf24" stroke-width="2.5" />
          <!-- 铠甲中央能量反应堆晶核 -->
          <circle cx="150" cy="145" r="14" fill="url(#cyanBladeGrad)" filter="url(#weaponGlow)" />
          <circle cx="150" cy="145" r="7" fill="#ffffff" />
          <!-- 护腰战裙叶片 -->
          <polygon points="120,190 145,245 130,250 110,200" fill="#334155" stroke="#f59e0b" stroke-width="1.5" />
          <polygon points="180,190 155,245 170,250 190,200" fill="#334155" stroke="#f59e0b" stroke-width="1.5" />
          <polygon points="140,195 160,195 155,255 145,255" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
        </g>

        <!-- 9. 特殊饰品 / 赫尔墨斯之靴 / 反射指环 / 水晶宝珠 / 护腕 (Accessory) -->
        <g v-else>
          <g v-if="item?.name.includes('靴')">
            <!-- 神速赫尔墨斯之羽双翼 -->
            <path d="M150,110 Q195,60 230,85 Q205,125 170,135 Z" fill="url(#cyanBladeGrad)" stroke="#ffffff" stroke-width="2" filter="url(#weaponGlow)" />
            <path d="M150,110 Q105,60 70,85 Q95,125 130,135 Z" fill="url(#cyanBladeGrad)" stroke="#ffffff" stroke-width="2" filter="url(#weaponGlow)" />
            <!-- 神速战靴靴筒与脚踝 -->
            <path d="M125,120 L175,120 L168,185 L195,210 L195,230 L115,230 L115,200 L132,185 Z" fill="url(#goldBladeGrad)" stroke="#ffffff" stroke-width="2" />
            <circle cx="150" cy="160" r="7" fill="#38bdf8" />
          </g>
          <g v-else-if="item?.name.includes('戒') || item?.name.includes('指环')">
            <!-- 永恒魔反光环 -->
            <circle cx="150" cy="150" r="80" stroke="url(#cyanBladeGrad)" stroke-width="2" stroke-dasharray="12 6" opacity="0.6" />
            <!-- 魔导指环环身 (立体透视) -->
            <ellipse cx="150" cy="165" rx="55" ry="32" fill="none" stroke="url(#goldBladeGrad)" stroke-width="14" />
            <ellipse cx="150" cy="165" rx="55" ry="32" fill="none" stroke="#fef08a" stroke-width="3" />
            <!-- 巨型反射蓝宝石核心 -->
            <polygon points="150,75 180,105 168,145 132,145 120,105" fill="url(#cyanBladeGrad)" stroke="#ffffff" stroke-width="2.5" filter="url(#weaponGlow)" />
            <polygon points="150,75 168,145 132,145" fill="#e0f2fe" opacity="0.4" />
          </g>
          <g v-else-if="item?.name.includes('手')">
            <!-- 源氏重装武士精钢护腕与二刀流利爪 (Gauntlet) -->
            <path d="M110,100 L190,100 L205,170 L185,220 L115,220 L95,170 Z" fill="url(#steelArmorGrad)" stroke="#fbbf24" stroke-width="2.5" />
            <path d="M120,115 L180,115 L175,155 L125,155 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
            <!-- 金纹龙鳞甲片 -->
            <path d="M100,165 Q150,185 200,165 L185,215 Q150,230 115,215 Z" fill="url(#goldBladeGrad)" stroke="#b45309" stroke-width="2" />
            <!-- 双持二刀流利爪勾刃 -->
            <path d="M120,220 L115,245 L130,225" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
            <path d="M140,225 L145,255 L155,230" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
            <path d="M165,225 L175,250 L175,220" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
            <!-- 中央源氏家纹印记宝珠 -->
            <circle cx="150" cy="135" r="9" fill="url(#cyanBladeGrad)" filter="url(#weaponGlow)" />
            <circle cx="150" cy="135" r="4" fill="#ffffff" />
          </g>
          <g v-else>
            <!-- 始源水晶宝珠 / 巨人护腕 / 诸神印记 -->
            <circle cx="150" cy="150" r="95" stroke="url(#goldBladeGrad)" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5" />
            <!-- 旋转六芒星魔法阵 -->
            <polygon points="150,70 178,120 236,120 189,155 207,210 150,175 93,210 111,155 64,120 122,120" stroke="url(#voidBladeGrad)" stroke-width="2" fill="none" opacity="0.5" />
            <!-- 漂浮奥术宝珠主体 -->
            <circle cx="150" cy="150" r="45" fill="url(#voidBladeGrad)" filter="url(#weaponGlow)" />
            <circle cx="150" cy="150" r="30" fill="url(#cyanBladeGrad)" opacity="0.75" />
            <circle cx="138" cy="138" r="10" fill="#ffffff" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>

    <!-- 底部装备名称与出处水印条 -->
    <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-gray-400 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 z-10 backdrop-blur-md">
      <div class="flex items-center gap-1.5 overflow-hidden">
        <span class="text-amber-400 text-sm">{{ item?.icon || '⚔️' }}</span>
        <span class="font-bold text-gray-100 truncate">{{ item?.name || '未知神器' }}</span>
      </div>
      <div class="text-cyan-300 font-mono text-[10px] shrink-0">
        {{ item?.slot?.toUpperCase() || 'EQUIP' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArmoryItem } from '../config/armoryEquipmentConfig'

const props = defineProps<{
  item: ArmoryItem | null
}>()

const svgViewBox = '0 0 300 300'

// 根据装备 slot 与名称特征推导立绘类别
const visualType = computed(() => {
  if (!props.item) return 'sword'
  const name = props.item.name || ''
  const slot = props.item.slot

  if (slot === 'weapon') {
    if (name.includes('正宗') || name.includes('村雨') || name.includes('刀')) return 'katana'
    if (name.includes('杖') || name.includes('杆')) return 'staff'
    if (name.includes('短剑') || name.includes('匕首') || name.includes('刃')) return 'dagger'
    if (name.includes('枪') || name.includes('矛')) return 'spear'
    return 'sword'
  }

  if (slot === 'offhand') {
    return 'shield'
  }

  if (slot === 'head') {
    return 'head'
  }

  if (slot === 'body') {
    return 'body'
  }

  return 'accessory'
})

const radialGlowStyle = computed(() => {
  const isGod = props.item?.name.includes('诸神')
  if (isGod) {
    return { background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.35) 0%, rgba(147, 51, 234, 0.25) 50%, transparent 80%)' }
  }
  if (props.item?.rarity === 5) {
    return { background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.35) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 80%)' }
  }
  return { background: 'radial-gradient(circle at center, rgba(148, 163, 184, 0.2) 0%, transparent 70%)' }
})

const wrapperClass = computed(() => {
  const isGod = props.item?.name.includes('诸神')
  if (isGod) {
    return 'bg-gradient-to-br from-[#1a1329] via-[#101426] to-[#0a0d18] border-2 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
  }
  return 'bg-gradient-to-br from-[#121626] via-[#0d111d] to-[#090c15] border border-slate-700/60 shadow-xl'
})

const rarityBadgeClass = computed(() => {
  if (props.item?.name.includes('诸神') || props.item?.rarity === 5) {
    return 'bg-amber-500/20 text-amber-300 border-amber-500/50'
  }
  return 'bg-purple-500/20 text-purple-300 border-purple-500/50'
})
</script>
