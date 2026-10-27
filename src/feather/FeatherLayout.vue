<template>
  <div class="feather-layout min-h-screen bg-[#070b12] text-[#f3f4f6] font-sans antialiased flex flex-col selection:bg-amber-500 selection:text-white">
    <FeatherHeader />

    <main class="feather-main-content flex-1 w-full flex flex-col">
      <router-view />
    </main>

    <FeatherFooter />
  </div>
</template>

<script setup lang="ts">
import FeatherHeader from './components/FeatherHeader.vue'
import FeatherFooter from './components/FeatherFooter.vue'
</script>

<style scoped>
.feather-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.feather-main-content {
  flex: 1;
}
</style>
