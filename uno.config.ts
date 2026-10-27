import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    colors: {
      gameDark: '#0b0e14',
      gameSurface: '#121824',
      gameCard: '#1a2234',
      gameBorder: '#2a344a',
      gamePrimary: '#ff8c00', // 类似游戏热血动感的金色/橙色
      gameBlue: '#0070f3',
      gameCyan: '#06b6d4',
      cyanGlow: '#00f2fe',
      accentPurple: '#bc13fe',
      bgDark: '#0a0d18',
      bgCard: '#13192c'
    }
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'content-container': 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'card-glow': 'hover:shadow-[0_0_24px_rgba(32,128,240,0.18)] transition-all duration-300',
    'panel-glass': 'backdrop-blur-md bg-dark-900/80 border border-slate-700/50 rounded-xl shadow-xl',
    'text-glow-cyan': 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]',
    'text-glow-amber': 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
    'text-glow-purple': 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]',
    'cyber-card': 'bg-[#121624] border border-[#232d4b] rounded-xl p-4 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
  },
  rules: [
    ['bg-grid-pattern', {
      'background-size': '20px 20px',
      'background-image': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
    }]
  ]
})
