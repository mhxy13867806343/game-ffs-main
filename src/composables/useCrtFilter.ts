import { ref } from 'vue'

const isCrtFilterActive = ref<boolean>(localStorage.getItem('crt_filter') === 'true')

export function useCrtFilter() {
  const toggleCrtFilter = () => {
    isCrtFilterActive.value = !isCrtFilterActive.value
    localStorage.setItem('crt_filter', String(isCrtFilterActive.value))
  }

  return {
    isCrtFilterActive,
    toggleCrtFilter
  }
}
