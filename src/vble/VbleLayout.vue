<template>
  <div class="vble-layout">
    <NavBar />
    <main class="vble-main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterBar />
    <FloatingRightDock />
    <GlobalDetailModal />
    <!-- CRT 复古轻扫描线滤镜 (对齐 Godot 引擎 crt_filter.gd) -->
    <div v-if="isCrtFilterActive" class="crt-overlay" />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import FloatingRightDock from './components/FloatingRightDock.vue'
import GlobalDetailModal from './components/GlobalDetailModal.vue'
import { useCrtFilter } from '@/composables/useCrtFilter'

const { isCrtFilterActive } = useCrtFilter()
</script>

<style scoped>
.vble-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0b101d;
  color: #e5e7eb;
}

.vble-main-content {
  flex: 1;
  padding: 12px 8px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .vble-main-content {
    padding: 24px 16px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.16s ease-out, transform 0.16s ease-out;
}

.fade-enter-from {
  opacity: 0.35;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.crt-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 1px,
    rgba(0, 0, 0, 0.08) 1px,
    rgba(0, 0, 0, 0.08) 2px
  );
}
</style>
