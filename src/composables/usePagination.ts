import { ref, computed, watch, Ref } from 'vue'

export interface UsePaginationOptions {
  pageSize?: number
  pageSizes?: number[]
  scrollOnChange?: boolean
  scrollTarget?: string
}

/**
 * 通用单机档案与列表分页管理逻辑
 * 支持：自动计算起止切片、总数统计、过滤条件变动自动回归第一页、平滑滚动回顶部
 */
export function usePagination<T>(sourceList: Ref<T[]>, options: UsePaginationOptions = {}) {
  const currentPage = ref(1)
  const pageSize = ref(options.pageSize || 6)
  const pageSizes = options.pageSizes || [6, 10, 20]

  const total = computed(() => sourceList.value.length)
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value) || 1)

  const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return sourceList.value.slice(start, end)
  })

  // 当源数据变更（过滤、搜索或分类变动）时，自动纠正溢出页码
  watch(
    () => sourceList.value.length,
    () => {
      if (currentPage.value > totalPages.value) {
        currentPage.value = 1
      }
    }
  )

  const resetPage = () => {
    currentPage.value = 1
  }

  const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
    if (options.scrollOnChange !== false) {
      if (options.scrollTarget) {
        const el = document.querySelector(options.scrollTarget)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  const handlePageSizeChange = (newSize: number) => {
    pageSize.value = newSize
    currentPage.value = 1
  }

  return {
    currentPage,
    pageSize,
    pageSizes,
    total,
    totalPages,
    paginatedList,
    resetPage,
    handlePageChange,
    handlePageSizeChange
  }
}
