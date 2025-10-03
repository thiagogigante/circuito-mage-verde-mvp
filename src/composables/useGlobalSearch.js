import { ref, computed } from 'vue'
import { usePlacesStore } from '../stores/places'
import { useEventsStore } from '../stores/events'

// Estado global da pesquisa
const searchQuery = ref('')

export function useGlobalSearch() {
  const placesStore = usePlacesStore()
  const eventsStore = useEventsStore()

  // Resultados de pesquisa
  const searchResults = computed(() => {
    if (!searchQuery.value.trim()) {
      return { places: [], events: [], hasResults: false }
    }

    const query = searchQuery.value.toLowerCase().trim()
    
    // Buscar em destinos/lugares
    const places = placesStore.search({ q: query })
    
    // Buscar em eventos
    const events = eventsStore.search(query)
    
    return {
      places,
      events,
      hasResults: places.length > 0 || events.length > 0,
      totalResults: places.length + events.length
    }
  })

  // Função para definir a query de pesquisa
  const setSearchQuery = (query) => {
    searchQuery.value = query || ''
  }

  // Função para limpar a pesquisa
  const clearSearch = () => {
    searchQuery.value = ''
  }

  return {
    searchQuery,
    searchResults,
    setSearchQuery,
    clearSearch
  }
}