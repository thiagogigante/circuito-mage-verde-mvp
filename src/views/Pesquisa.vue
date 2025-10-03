<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
import PlaceCard from '../components/PlaceCard.vue'
import EventCard from '../components/EventCard.vue'
import { useGlobalSearch } from '../composables/useGlobalSearch'
import { usePlacesStore } from '../stores/places'
import { useEventsStore } from '../stores/events'
import { Search, MapPin, Calendar } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { searchResults, setSearchQuery, searchQuery } = useGlobalSearch()
const placesStore = usePlacesStore()
const eventsStore = useEventsStore()

// Inicializar com a query da URL
onMounted(() => {
  const query = route.query.q
  if (query) {
    setSearchQuery(query)
  }
})

// Funções de navegação
function goToPlaceDetail(place) {
  router.push(`/detalhe/${place.id}`)
}

function goToEventDetail(event) {
  router.push(`/evento/${event.id}`)
}

function togglePlaceFav(place) {
  placesStore.toggleFavorite(place.id)
}

function toggleEventFav(event) {
  eventsStore.toggleFavorite(event.id)
}

const isPlaceFav = (place) => placesStore.isFavorite(place.id)
const isEventFav = (event) => eventsStore.isFavorite(event.id)

// Função para atualizar pesquisa
function onSearch(query) {
  setSearchQuery(query)
  // Atualizar URL sem recarregar a página
  router.replace({ query: { q: query || undefined } })
}
</script>

<template>
  <TopBar :showMenu="false" @search="onSearch" />
  
  <div class="main-content">
    <section class="header">
      <div class="search-info">
        <Search :size="20" />
        <div>
          <h1 v-if="searchQuery">Resultados para "{{ searchQuery }}"</h1>
          <h1 v-else>Pesquisar</h1>
          <p class="muted" v-if="searchQuery">
            {{ searchResults.totalResults }} resultado{{ searchResults.totalResults !== 1 ? 's' : '' }} encontrado{{ searchResults.totalResults !== 1 ? 's' : '' }}
          </p>
          <p class="muted" v-else>Digite algo para pesquisar destinos e eventos</p>
        </div>
      </div>
    </section>

    <!-- Resultados de Destinos -->
    <section v-if="searchResults.places.length > 0" class="results-section">
      <h2 class="section-title">
        <MapPin :size="18" />
        Destinos ({{ searchResults.places.length }})
      </h2>
      <div class="results-grid">
        <PlaceCard 
          v-for="place in searchResults.places" 
          :key="place.id" 
          :place="place" 
          :isFav="isPlaceFav(place)" 
          @toggle-fav="togglePlaceFav" 
          @open="goToPlaceDetail" 
        />
      </div>
    </section>

    <!-- Resultados de Eventos -->
    <section v-if="searchResults.events.length > 0" class="results-section">
      <h2 class="section-title">
        <Calendar :size="18" />
        Eventos ({{ searchResults.events.length }})
      </h2>
      <div class="results-grid">
        <EventCard 
          v-for="event in searchResults.events" 
          :key="event.id" 
          :event="event" 
          :isFav="isEventFav(event)" 
          @toggle-fav="toggleEventFav" 
          @open="goToEventDetail" 
        />
      </div>
    </section>

    <!-- Nenhum resultado -->
    <section v-if="searchQuery && !searchResults.hasResults" class="no-results">
      <div class="no-results-box">
        <Search :size="48" />
        <h3>Nenhum resultado encontrado</h3>
        <p>Tente pesquisar por:</p>
        <ul>
          <li>Nomes de trilhas ou cachoeiras</li>
          <li>Tipos de atividade (montanha, rios)</li>
          <li>Eventos e shows</li>
          <li>Localizações em Magé</li>
        </ul>
      </div>
    </section>
  </div>

  <BottomNav />
</template>

<style scoped>
.main-content {
  padding-bottom: 5rem;
}

.header {
  padding: 1rem .75rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-surface-3);
}

.search-info {
  display: flex;
  align-items: flex-start;
  gap: .75rem;
  color: var(--color-primary-deep);
}

.search-info h1 {
  margin: 0 0 .25rem;
  font-size: 1.25rem;
  color: var(--color-text);
}

.muted {
  color: var(--color-muted);
  margin: 0;
  font-size: .9rem;
}

.results-section {
  padding: 1rem .75rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 1rem;
  color: var(--color-text);
  margin: 0 0 .75rem;
  font-weight: 600;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
}

.no-results {
  padding: 2rem .75rem;
  display: flex;
  justify-content: center;
}

.no-results-box {
  background: var(--color-card);
  border: 1px solid var(--color-surface-3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  color: var(--color-muted);
}

.no-results-box h3 {
  margin: 1rem 0 .5rem;
  color: var(--color-text);
}

.no-results-box ul {
  text-align: left;
  margin: 1rem 0 0;
  padding-left: 1.5rem;
}

.no-results-box li {
  margin-bottom: .5rem;
}

/* Responsividade melhorada */
@media (min-width: 480px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 720px) {
  .results-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 2rem;
  }
  
  .header {
    padding: 2rem;
  }
  
  .search-info h1 {
    font-size: 1.75rem;
  }
  
  .muted {
    font-size: 1rem;
  }
  
  .results-section {
    padding: 1rem 2rem;
  }
  
  .section-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .results-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  
  .no-results {
    padding: 3rem 2rem;
  }
}

@media (min-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>