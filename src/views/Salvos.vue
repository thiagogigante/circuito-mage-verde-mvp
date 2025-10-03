<script setup>
import { computed } from 'vue'
import TopBar from '../components/TopBar.vue'
import SideMenu from '../components/SideMenu.vue'
import BottomNav from '../components/BottomNav.vue'
import PlaceCard from '../components/PlaceCard.vue'
import EventCard from '../components/EventCard.vue'
import { usePlacesStore } from '../stores/places'
import { useEventsStore } from '../stores/events'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { logout } = useAuth()
const store = usePlacesStore()
const events = useEventsStore()

const favorites = computed(() => store.all().filter(p => store.isFavorite(p.id)))
const categoryDefs = store.getCategories().filter(c => c.key) // remove 'Todos'
const grouped = computed(() => {
  const byCat = {}
  for (const c of categoryDefs) byCat[c.key] = []
  for (const p of favorites.value) {
    if (!byCat[p.category]) byCat[p.category] = []
    byCat[p.category].push(p)
  }
  // return in the same order as categoryDefs, only non-empty
  return categoryDefs
    .map(c => ({ key: c.key, label: c.label || c.key, items: byCat[c.key] || [] }))
    .filter(g => g.items.length > 0)
})

function goToDetail(p){ router.push(`/detalhe/${p.id}`) }
function toggleFav(p){ store.toggleFavorite(p.id) }
const isFav = (p) => store.isFavorite(p.id)
const favEvents = computed(() => events.all().filter(e => events.isFavorite(e.id)))
function goToEvent(e){ router.push(`/evento/${e.id}`) }
function toggleFavEvent(e){ events.toggleFavorite(e.id) }
const isFavEvent = (e) => events.isFavorite(e.id)
function onLogout(){ logout(); router.replace('/') }
</script>

<template>
  <SideMenu :open="false" :items="[]" @logout="onLogout" />
  <TopBar @toggle-menu="() => {}" />

  <div class="main-content">
    <section class="header">
      <h1>Salvos</h1>
      <p class="muted">Seus lugares favoritos ficam aqui.</p>
    </section>

    <div v-if="favorites.length || favEvents.length">
      <section v-for="g in grouped" :key="g.key" class="group">
        <h2 class="group-title">{{ g.label }}</h2>
        <div class="list">
          <PlaceCard v-for="p in g.items" :key="p.id" :place="p" :isFav="isFav(p)" @toggle-fav="toggleFav" @open="goToDetail" />
        </div>
      </section>
      <section v-if="favEvents.length" class="group">
        <h2 class="group-title">Eventos</h2>
        <div class="list">
          <EventCard v-for="e in favEvents" :key="e.id" :event="e" :isFav="isFavEvent(e)" @toggle-fav="toggleFavEvent" @open="goToEvent" />
        </div>
      </section>
    </div>
    <section class="empty" v-else>
      <div class="empty-box">Nenhum salvo ainda. Explore e toque no coração para favoritar.</div>
    </section>
  </div>

  <BottomNav active="salvos" />
  <div style="height:64px" />
  
</template>

<style scoped>
.main-content { }
.header{ padding: .75rem; }
.header h1{ margin:0; font-size:1.25rem; color:#2d3d2f; }
.muted{ color: var(--color-muted); margin:.25rem 0 0; }
.group{ padding: .15rem .75rem; }
.group-title{ margin:.5rem 0 .35rem; font-size:1rem; color:#263524; font-weight:600; }
.list{ display:grid; grid-template-columns: 1fr 1fr; gap:.75rem; padding: .25rem .75rem; }
.empty{ padding:1rem; }
.empty-box{ background:#fff; border:1px solid var(--color-surface-3); border-radius: .8rem; padding:1rem; text-align:center; color:#2d3d2f; box-shadow: var(--shadow-sm); }

/* Responsividade melhorada */
@media (min-width:480px){ .list{ grid-template-columns: repeat(2,1fr); } }
@media (min-width:720px){ .list{ grid-template-columns: repeat(3,1fr); max-width:900px; margin:0 auto; } }
@media (min-width: 768px) {
  .main-content { max-width: 1200px; margin: 0 auto; }
  .header { padding: 2rem 2rem 1rem; }
  .header h1 { font-size: 1.75rem; }
  .muted { font-size: 1.1rem; }
  .group { padding: 1rem 2rem; }
  .group-title { font-size: 1.2rem; margin: 1rem 0 .75rem; }
  .list { grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 0; max-width: none; }
  .empty { padding: 2rem; }
  .empty-box { padding: 2rem; font-size: 1.1rem; }
}
@media (min-width: 1200px) {
  .list { grid-template-columns: repeat(5, 1fr); }
}
</style>
