<script setup>
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
import EventCard from '../components/EventCard.vue'
import { useEventsStore } from '../stores/events'
import { useRouter } from 'vue-router'

const store = useEventsStore()
const router = useRouter()

function goToDetail(e){ router.push(`/evento/${e.id}`) }
function toggleFav(e){ store.toggleFavorite(e.id) }
const isFav = (e) => store.isFavorite(e.id)
</script>

<template>
  <TopBar :showMenu="false" />
  <div class="main-content">
    <section class="wrap">
      <h1>Eventos</h1>
      <div class="list">
        <EventCard v-for="e in store.all()" :key="e.id" :event="e" :isFav="isFav(e)" @toggle-fav="toggleFav" @open="goToDetail" />
      </div>
    </section>
  </div>
  <BottomNav active="eventos" />
</template>

<style scoped>
.wrap{ padding: .75rem; padding-bottom:5rem; }
h1{ font-size:1.25rem; margin:.25rem 0 .5rem; color:#2d3d2f; }
.list{ display:grid; grid-template-columns: 1fr 1fr; gap:.75rem; }

/* Responsividade melhorada */
@media (min-width:480px){ .list{ grid-template-columns: repeat(2, 1fr); } }
@media (min-width:720px){ .list{ grid-template-columns: repeat(3, 1fr); max-width:900px; margin:0 auto; } }
@media (min-width: 768px) { 
  .main-content { max-width: 1200px; margin: 0 auto; }
  .wrap { padding: 2rem; padding-bottom: 2rem; }
  h1 { font-size: 1.75rem; margin: 0 0 1.5rem; }
  .list { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; max-width: none; }
}
@media (min-width: 1200px) { 
  .list { grid-template-columns: repeat(4, 1fr); }
}
</style>
