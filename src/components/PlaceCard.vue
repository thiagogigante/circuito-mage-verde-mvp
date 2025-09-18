<script setup>
import { Heart, HeartOff, Star, Footprints } from 'lucide-vue-next'
const props = defineProps({ place: { type: Object, required: true }, isFav: Boolean })
const emit = defineEmits(['toggle-fav', 'open'])
</script>

<template>
  <div class="card" @click="$emit('open', props.place)">
    <div class="img" :style="{ backgroundImage: `url(${props.place.image})` }">
      <span v-if="props.place.hasTrail" class="trail-badge"><Footprints :size="14" /> Trilha</span>
      <button class="fav" :class="{ active: isFav }" @click.stop="$emit('toggle-fav', props.place)">
        <component :is="isFav ? Heart : HeartOff" :size="18" />
      </button>
    </div>
    <div class="info">
      <div class="title">{{ props.place.name }}</div>
      <div class="meta">
        <span class="tag"><Star :size="14" /> {{ props.place.rating }}</span>
        <span class="tag">{{ props.place.distanceKm }} km</span>
      </div>
    </div>
  </div>
 </template>

<style scoped>
.card{ background: #fff; border-radius: .95rem; overflow:hidden; border:1px solid var(--color-surface-3); display:flex; flex-direction:column; box-shadow: var(--shadow-sm); transform: translateY(0); }
.card:hover{ box-shadow: var(--shadow-md); transform: translateY(-2px); }
.img{ background-size: cover; background-position:center; aspect-ratio: 4/3; position:relative; }
.img::after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,0) 30%, rgba(0,0,0,.08) 100%); pointer-events:none; }
.trail-badge{ position:absolute; top:.5rem; left:.5rem; display:inline-flex; align-items:center; gap:.3rem; background: rgba(7, 95, 14, 0.67); color:#fff; border-radius:.5rem; padding:.25rem .4rem; font-size:.75rem; box-shadow: var(--shadow-sm); border:1px solid rgba(255,255,255,.2); }
.fav{ position:absolute; top:.5rem; right:.5rem; background: rgba(255,255,255,.92); border:1px solid var(--color-surface-3); border-radius:.5rem; padding:.35rem; }
.fav.active{ color:rgba(7, 95, 14, 0.99); border-color:rgba(7, 95, 14, 0.99); background: rgba(170, 236, 175, 0.75); }
.info{ padding:.6rem .7rem; }
.title{ font-weight:600; margin-bottom:.25rem; }
.meta{ display:flex; gap:.5rem; font-size:.8rem; color: var(--color-muted); }
.tag{ display:inline-flex; align-items:center; gap:.25rem; background: var(--color-surface-2); padding:.2rem .4rem; border-radius:.4rem; }
</style>
