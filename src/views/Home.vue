<script setup>
import { ref, computed, watch } from 'vue'
import TopBar from '../components/TopBar.vue'
import SideMenu from '../components/SideMenu.vue'
import BottomNav from '../components/BottomNav.vue'
import CategoryChips from '../components/CategoryChips.vue'
import PlaceCard from '../components/PlaceCard.vue'
import { usePlacesStore } from '../stores/places'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { logout } = useAuth()
const store = usePlacesStore()

const q = ref('')
const category = ref('')
const openMenu = ref(false)

const categories = store.getCategories()
const places = computed(() => store.search({ q: q.value, category: category.value }))

function goToDetail(p){
  router.push(`/detalhe/${p.id}`)
}
function toggleFav(p){
  store.toggleFavorite(p.id)
}
const isFav = (p) => store.isFavorite(p.id)

function onSearch(val){ q.value = val }
function selectCategory(val){ category.value = val; openMenu.value = false }
function onLogout(){ logout(); router.replace('/') }

// Sync category with query param from /trilhas?category=...
const applyQueryCategory = () => {
  const qcat = route.query.category
  category.value = typeof qcat === 'string' ? qcat : ''
}
applyQueryCategory()
watch(() => route.query.category, () => applyQueryCategory())
</script>

<template>
  <SideMenu :open="openMenu" :items="categories" @close="openMenu=false" @select="selectCategory" @logout="onLogout" />
  <TopBar @toggle-menu="openMenu=true" @search="onSearch" />

  <CategoryChips :items="categories" v-model="category" />

  <div class="main-content">
    <section class="list">
      <PlaceCard v-for="p in places" :key="p.id" :place="p" :isFav="isFav(p)" @toggle-fav="toggleFav" @open="goToDetail" />
    </section>
  </div>

  <BottomNav active="trilhas" />
</template>

<style scoped>
.main-content { }
.list{ display:grid; grid-template-columns: 1fr 1fr; gap:.75rem; padding: .5rem .75rem 5rem; }

/* Responsividade melhorada */
@media (min-width:480px){ .list{ grid-template-columns: repeat(2, 1fr); } }
@media (min-width:720px){ .list{ grid-template-columns: repeat(3, 1fr); max-width:900px; margin:0 auto; } }
@media (min-width: 768px) { 
  .main-content { max-width: 1200px; margin: 0 auto; }
  .list { padding: 1rem 2rem 2rem; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: none; }
}
@media (min-width: 1200px) { 
  .list { grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }
}
</style>
