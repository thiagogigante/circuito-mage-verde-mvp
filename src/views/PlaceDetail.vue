<script setup>
import { useRoute, useRouter } from 'vue-router'
import { usePlacesStore } from '../stores/places'
import BottomNav from '../components/BottomNav.vue'
import { ChevronLeft, Heart, Star, Timer, Footprints, Mountain, TrendingUp } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const store = usePlacesStore()
const place = store.getById(route.params.id)

if(!place){
  router.replace('/')
}

function back(){ router.back() }
function toggleFav(){ store.toggleFavorite(place.id) }
const isFav = () => store.isFavorite(place.id)
</script>

<template>
  <div class="detail">
    <div class="hero" :style="{ backgroundImage: `url(${place.image})` }">
  <button class="back" @click="back"><ChevronLeft :size="22" /></button>
  <button class="like" :class="{ active: isFav() }" @click="toggleFav"><Heart :size="20" /></button>
      <ul class="stats">
        <li><Footprints :size="16"/> {{ place.distanceKm }} km</li>
        <li><Timer :size="16"/> {{ place.durationH }} h</li>
        <li><Star :size="16"/> {{ place.rating }}</li>
        <li><Mountain :size="16"/> {{ place.level }}</li>
        <li><TrendingUp :size="16"/> {{ place.elevationM }} m</li>
      </ul>
    </div>

    <section class="map">
      <!-- Placeholder para mapa -->
      <div class="map-box">Mapa do Parque Nacional da Tijuca (placeholder)</div>
    </section>

    <BottomNav active="trilhas" />
  </div>
</template>

<style scoped>
.detail{ display:flex; flex-direction:column; }
.hero{ position:relative; height:52vh; background-size:cover; background-position:center; box-shadow: var(--shadow-md); }
.hero::after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.05) 40%, rgba(255,255,255,0) 100%); pointer-events:none; }
.back{ position:absolute; top:.75rem; left:.5rem; background: rgba(0,0,0,.45); color:#fff; border:none; padding:.45rem; border-radius:.6rem; }
.like{ position:absolute; top:.75rem; right:.5rem; background: rgba(255,255,255,.92); color: var(--color-muted); border:1px solid var(--color-surface-3); padding:.45rem; border-radius:.6rem; }
.like.active{ color: rgba(7, 95, 14, 0.99); border-color: rgba(7, 95, 14, 0.99); background: rgba(170, 236, 175, 0.75); }
.stats{ position:absolute; left:.5rem; top:40%; list-style:none; display:flex; flex-direction:column; gap:.4rem; color:#fff; padding:0; margin:0; }
.stats li{ display:flex; align-items:center; gap:.4rem; background: rgba(0,0,0,.35); padding:.35rem .5rem; border-radius:.6rem; }
.map{ background:#fff; }
.map-box{ height:28vh; border-top-left-radius: 1rem; border-top-right-radius: 1rem; margin-top:-1rem; background: var(--grad-soft); display:flex; align-items:center; justify-content:center; color:#2d3d2f; font-weight:600; border:1px solid var(--color-surface-3); box-shadow: 0 -8px 20px rgba(0,0,0,.04); }
/* bottom nav is shared component now */
</style>
