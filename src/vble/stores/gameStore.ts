import { GAME_DATABASE } from '../data/gameDatabase'

export const useGameStore = defineStore('game', () => {
  const db = reactive(GAME_DATABASE)
  const searchQuery = ref('')
  const activeDetailItem = ref<any>(null)
  const isDetailModalOpen = ref(false)
  const customOverrides = ref<Record<string, any>>({})

  try {
    const saved = localStorage.getItem('ff_custom_stat_overrides')
    if (saved) {
      customOverrides.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load overrides:', e)
  }

  const saveCharacterOverride = (charId: string, statsData: any) => {
    customOverrides.value[charId] = statsData
    try {
      localStorage.setItem('ff_custom_stat_overrides', JSON.stringify(customOverrides.value))
    } catch (e) {}

    const target = (db.characters || []).find((c: any) => c.id === charId) as any
    if (target) {
      target.customStats = statsData
    }
  }

  const resetCharacterOverride = (charId: string) => {
    delete customOverrides.value[charId]
    try {
      localStorage.setItem('ff_custom_stat_overrides', JSON.stringify(customOverrides.value))
    } catch (e) {}
  }

  const openDetail = (item: any) => {
    activeDetailItem.value = item
    isDetailModalOpen.value = true
  }

  const closeDetail = () => {
    isDetailModalOpen.value = false
    activeDetailItem.value = null
  }

  return {
    db,
    searchQuery,
    activeDetailItem,
    isDetailModalOpen,
    customOverrides,
    saveCharacterOverride,
    resetCharacterOverride,
    openDetail,
    closeDetail
  }
})
