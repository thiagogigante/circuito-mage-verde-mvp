<script setup>
import * as icons from 'lucide-vue-next'
const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
const iconComp = (name) => icons[name] || icons.Circle
</script>

<template>
  <div class="chips">
    <button v-for="c in items" :key="c.key || 'all'" :class="['chip', {active: (c.key ?? '')=== (props.modelValue ?? '')}]" @click="$emit('update:modelValue', c.key ?? '')">
      <component :is="iconComp(c.icon)" :size="16" />
      <span>{{ c.label || c.key || 'Todos' }}</span>
    </button>
  </div>
</template>

<style scoped>
.chips{ display:flex; gap:.5rem; overflow:auto; padding:.5rem .75rem; }
.chip{ flex:0 0 auto; display:flex; align-items:center; gap:.35rem; padding:.48rem .7rem; border-radius:999px; border:1px solid var(--color-surface-3); background: var(--color-surface); color: var(--color-text); box-shadow: 0 1px 0 rgba(0,0,0,.02); }
.chip:hover{ background: var(--color-surface-2); }
.chip.active{ background: var(--color-primary-soft); border-color: var(--color-primary); }
</style>
