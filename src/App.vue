<script setup>
// Root layout for mobile-first views
</script>

<template>
  <div class="app-shell">
    <router-view />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  background: var(--color-bg);
  color: var(--color-text);
}
</style>
