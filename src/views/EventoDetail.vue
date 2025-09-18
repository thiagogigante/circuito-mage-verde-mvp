<script setup>
import BottomNav from '../components/BottomNav.vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventsStore } from '../stores/events'
import { ChevronLeft, Heart } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const store = useEventsStore()
const event = store.getById(route.params.id)

function back(){ router.back() }
function toggleFav(){ store.toggleFavorite(event.id) }
const isFav = () => store.isFavorite(event.id)
</script>

<template>
  <div class="detail">
    <div class="hero" :style="{ backgroundImage: `url(${event.image})` }">
  <button class="back" @click="back"><ChevronLeft :size="22" /></button>
  <button class="like" :class="{ active: isFav() }" @click="toggleFav"><Heart :size="20" /></button>
    </div>
    <div class="content">
      <h1>{{ event.name }}</h1>
      <p class="muted">{{ event.date }} — {{ event.location }}</p>
      <p>{{ event.description }}</p>
    </div>
  </div>
  <BottomNav active="eventos" />
  <div style="height:64px" />
</template>

<style scoped>
.detail{ display:flex; flex-direction:column; }
.hero{ position:relative; width:100%; aspect-ratio: 16/9; background-size:cover; background-position:center; box-shadow: var(--shadow-md); }
.hero::after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.05) 40%, rgba(255,255,255,0) 100%); pointer-events:none; }
.back{ position:absolute; top:.75rem; left:.5rem; background: rgba(0,0,0,.45); color:#fff; border:none; padding:.45rem; border-radius:.6rem; }
.like{ position:absolute; top:.75rem; right:.5rem; background: rgba(255,255,255,.92); color: var(--color-muted); border:1px solid var(--color-surface-3); padding:.45rem; border-radius:.6rem; }
.like.active{ color: rgba(7, 95, 14, 0.99); border-color: rgba(7, 95, 14, 0.99); background: rgba(170, 236, 175, 0.75); }
.content{ padding: .75rem; }
.muted{ color: var(--color-muted); }
</style>
