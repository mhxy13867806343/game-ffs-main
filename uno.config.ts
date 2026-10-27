import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
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
      gameCyan: '#06b6d4'
    }
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'content-container': 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'card-glow': 'hover:shadow-[0_0_24px_rgba(32,128,240,0.18)] transition-all duration-300'
  }
})
