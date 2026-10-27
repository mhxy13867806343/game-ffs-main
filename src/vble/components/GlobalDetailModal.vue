<template>
  <n-modal
    v-model:show="gameStore.isDetailModalOpen"
    preset="card"
    :title="modalTitle"
    style="width: 90%; max-width: 720px;"
    :bordered="true"
    size="medium"
  >
    <div v-if="item" class="leading-relaxed">
      <div class="mb-3 flex items-center gap-2 flex-wrap">
        <n-tag v-if="item.tier" type="info" size="small">{{ item.tier }}</n-tag>
        <n-tag v-if="item.category" type="warning" size="small">{{ item.category }}</n-tag>
        <n-tag v-if="item.type" type="default" size="small">{{ item.type }}</n-tag>
        <n-tag v-if="item.rank" type="error" size="small">{{ item.rank }}</n-tag>
      </div>

      <p v-if="item.desc || item.summary" class="text-sm text-gray-300 mb-4">
        {{ item.desc || item.summary }}
      </p>

      <n-descriptions label-placement="left" :column="1" bordered size="small" class="my-3">
        <n-descriptions-item v-if="item.features" label="特色机制">
          {{ item.features }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.mechanics" label="极限制约">
          {{ item.mechanics }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.monsters" label="守卫Boss/魔物">
          {{ item.monsters }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.stats" label="基础属性">
          {{ item.stats }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.effect" label="专属效果">
          {{ item.effect }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.capability" label="通行能力">
          {{ item.capability }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.reward" label="通关成果">
          {{ item.reward }}
        </n-descriptions-item>
        <n-descriptions-item v-if="item.origin" label="获取渊源">
          {{ item.origin }}
        </n-descriptions-item>
      </n-descriptions>

      <div v-if="item.lore" class="mt-3 px-3 py-2 rounded-md bg-black/40 text-gray-400 italic text-xs border-l-3 border-amber-400">
        “{{ item.lore }}”
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <n-button size="small" @click="gameStore.closeDetail">关闭</n-button>
        <n-button size="small" type="primary" @click="navigateToSearch">
          在全能资料库检索相似项
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()

const item = computed(() => gameStore.activeDetailItem)
const modalTitle = computed(() => {
  if (!item.value) return '全息档案'
  return `${item.value.name || item.value.title || '情报'} · 全息档案`
})

const navigateToSearch = () => {
  const query = item.value?.name || item.value?.title || ''
  gameStore.closeDetail()
  router.push({ path: '/vble/search', query: { q: query } })
}
</script>
