<script setup>
import { Heart, HeartOff, CalendarDays, MapPin } from 'lucide-vue-next'
const props = defineProps({ event: { type: Object, required: true }, isFav: Boolean })
const emit = defineEmits(['toggle-fav', 'open'])

function formatBRDateTime(v){
  if(!v || typeof v !== 'string') return v
  const [datePart, timePart] = v.split(' ')
  if(!datePart) return v
  const [y,m,d] = datePart.split('-')
  if(!y || !m || !d) return v
  return `${d}/${m}/${y}${timePart? ` ${timePart}` : ''}`
}
</script>

<template>
  <div class="card" @click="$emit('open', props.event)">
    <div class="img" :style="{ backgroundImage: `url(${props.event.image})` }">
      <button class="fav" :class="{ active: isFav }" @click.stop="$emit('toggle-fav', props.event)">
        <component :is="isFav ? Heart : HeartOff" :size="18" />
      </button>
    </div>
    <div class="info">
      <div class="title">{{ props.event.name }}</div>
      <div class="meta">
  <span class="tag"><span class="ico"><MapPin :size="18" :stroke-width="2" /></span> {{ props.event.location }}</span>
  <span class="tag"><span class="ico"><CalendarDays :size="18" :stroke-width="2" /></span> {{ formatBRDateTime(props.event.date) }}</span>
      </div>
    </div>
  </div>
 </template>

<style scoped>
.card{ background: #fff; border-radius: .95rem; overflow:hidden; border:1px solid var(--color-surface-3); display:flex; flex-direction:column; box-shadow: var(--shadow-sm); transform: translateY(0); }
.card:hover{ box-shadow: var(--shadow-md); transform: translateY(-2px); }
.img{ background-size: cover; background-position:center; aspect-ratio: 4/3; position:relative; }
.img::after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,0) 30%, rgba(0,0,0,.08) 100%); pointer-events:none; }
.fav{ position:absolute; top:.5rem; right:.5rem; background: rgba(255,255,255,.92); border:1px solid var(--color-surface-3); border-radius:.5rem; padding:.35rem; }
.fav.active{ color:rgba(7, 95, 14, 0.99); border-color:rgba(7, 95, 14, 0.99); background: rgba(170, 236, 175, 0.75); }
.info{ padding:.6rem .7rem; }
.title{ font-weight:600; margin-bottom:.25rem; }
.meta{ display:flex; flex-direction:column; gap:.35rem; font-size:.8rem; color: var(--color-muted); }
.tag{ display:flex; align-items:center; gap:.45rem; background: var(--color-surface-2); padding:.35rem .5rem; border-radius:.4rem; width:100%; line-height:1; }
.tag .ico{ display:inline-grid; place-items:center; width:18px; height:18px; flex:0 0 18px; }
.tag .ico :deep(svg){ width:18px; height:18px; }
</style>
