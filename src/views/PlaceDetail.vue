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

    <div class="content">
      <section class="info">
        <h1>{{ place.name }}</h1>
        <p class="description">{{ place.description }}</p>
      </section>
      
      <section class="map">
        <!-- Placeholder para mapa -->
        <div class="map-box">Mapa do Parque Nacional da Tijuca (placeholder)</div>
      </section>
    </div>

    <BottomNav active="trilhas" />
  </div>
</template>

<style scoped>
.detail{ display:flex; flex-direction:column; }
.hero{ position:relative; height:52vh; background-size:cover; background-position:center; box-shadow: var(--shadow-md); }
.hero::after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.05) 40%, rgba(255,255,255,0) 100%); pointer-events:none; }
.back{ position:absolute; top:.75rem; left:.5rem; background: rgba(0,0,0,.45); color:#fff; border:none; padding:.45rem; border-radius:.6rem; cursor: pointer; z-index: 10; }
.back:hover{ background: rgba(0,0,0,.65); }
.like{ position:absolute; top:.75rem; right:.5rem; background: rgba(255,255,255,.92); color: var(--color-muted); border:1px solid var(--color-surface-3); padding:.45rem; border-radius:.6rem; cursor: pointer; z-index: 10; }
.like:hover{ background: rgba(255,255,255,1); }
.like.active{ color: rgba(7, 95, 14, 0.99); border-color: rgba(7, 95, 14, 0.99); background: rgba(170, 236, 175, 0.75); }
.stats{ position:absolute; left:.5rem; top:40%; list-style:none; display:flex; flex-direction:column; gap:.4rem; color:#fff; padding:0; margin:0; z-index: 5; }
.stats li{ display:flex; align-items:center; gap:.4rem; background: rgba(0,0,0,.35); padding:.35rem .5rem; border-radius:.6rem; }
.info { padding: 1rem; background: #fff; }
.info h1 { margin: 0 0 .5rem; font-size: 1.5rem; color: #2d3d2f; }
.description { margin: 0; color: var(--color-text); line-height: 1.5; }
.map{ background:#fff; }
.map-box{ height:28vh; border-top-left-radius: 1rem; border-top-right-radius: 1rem; margin-top:-1rem; background: var(--grad-soft); display:flex; align-items:center; justify-content:center; color:#2d3d2f; font-weight:600; border:1px solid var(--color-surface-3); box-shadow: 0 -8px 20px rgba(0,0,0,.04); }

/* Melhorias para desktop */
@media (min-width: 768px) {
  .hero { height: 60vh; }
  .back, .like { top: 1.5rem; padding: .6rem; }
  .back { left: 1.5rem; }
  .like { right: 1.5rem; }
  .stats { left: 1.5rem; gap: .6rem; }
  .stats li { padding: .5rem .75rem; font-size: 1rem; }
  .content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 0 2rem; }
  .info { padding: 2rem; }
  .info h1 { font-size: 2rem; margin-bottom: 1rem; }
  .description { font-size: 1.1rem; }
  .map-box { height: 400px; margin-top: 0; border-radius: 1rem; }
}

@media (min-width: 1200px) {
  .content { grid-template-columns: 2fr 3fr; }
}
</style>
