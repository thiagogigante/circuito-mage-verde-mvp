import { ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
// Imagens locais de trilhas
import imgCaminhoDoOuro from '../assets/trails/caminho_do_ouro.jpg'
import imgPocoVerdeAndorinhas from '../assets/trails/poco_verde_andorinhas.jpg'
// Imagens locais de pontos (spots)
import imgCachoeiraVeoDaNoiva from '../assets/spots/cachoeira-veu-da-noiva.jpg'
import imgCapelaRemedios from '../assets/spots/capela-nossa-senhora-dos-remedios.jpg'
import imgCapelaBonfim from '../assets/spots/capela-nosso-senhor-do-bonfim.jpg'
import imgCapelaSantaAnaIriri from '../assets/spots/capela-santa-ana-do-iriri.jpg'
import imgEstacaoGuiaPacobaiba from '../assets/spots/estacao-guia-de-pacobaiba.jpg'
import imgIgrejaMatrizPiedade from '../assets/spots/igreja-matriz-nossa-senhora-da-piedade.jpg'
import imgIgrejaNsGuiaPacobaiba from '../assets/spots/igreja-nossa-senhora-da-guia-de-pacobaiba.jpg'
import imgIgrejaSantana from '../assets/spots/igreja-santana.jpg'
import imgIgrejaSaoNicolau from '../assets/spots/igreja-sao-nicolau.jpg'
import imgPocoBento from '../assets/spots/poco-bento.png'

const favStorage = useLocalStorage('favorites', [])
const extraStorage = useLocalStorage('places_extra', [])
const removedStorage = useLocalStorage('places_removed', [])

// Reactive favorites (shared across all store consumers)
const favoritesRef = ref(favStorage.get() || [])
// Trigger reativo para forçar atualização das listas
const updateTrigger = ref(0)

const samplePlaces = [
  // Montanha
  {
    id: 'pico-monjolo',
    name: 'Pico do Monjolo (Santo Aleixo)',
    rating: 4.8,
    distanceKm: 6,
    durationH: 2,
    level: 'Intermediário',
    elevationM: 650,
    category: 'Montanha',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
    hasTrail: true,
    description: 'Trilha até o Pico do Monjolo, com vista para a Serra e acesso às quedas do Monjolo.'
  },
  {
    id: 'morro-piedade',
    name: 'Morro da Piedade (Sede-Magé)',
    rating: 4.6,
    distanceKm: 3,
    durationH: 1.2,
    level: 'Fácil',
    elevationM: 280,
    category: 'Montanha',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop',
    hasTrail: true,
    description: 'Subida curta com mirantes históricos na região central de Magé.'
  },

  // Floresta
  {
    id: 'caminho-do-ouro',
    name: 'Caminho do Ouro (Vila Inhomirim)',
    rating: 4.8,
    distanceKm: 7.5,
    durationH: 3,
    level: 'Intermediário',
    elevationM: 260,
    category: 'Floresta',
    image: imgCaminhoDoOuro,
    hasTrail: true,
    description: 'Trecho histórico da antiga via colonial que ligava a Baía de Guanabara à serra. Piso de pedras, mata densa e vestígios históricos em Vila Inhomirim/Magé.'
  },
  {
    id: 'poco-verde-andorinhas',
    name: 'Poço Verde / Andorinhas (Santo Aleixo)',
    rating: 4.7,
    distanceKm: 3.8,
    durationH: 1.8,
    level: 'Intermediário',
    elevationM: 110,
    category: 'Floresta',
    image: imgPocoVerdeAndorinhas,
    hasTrail: true,
    description: 'Trilha em mata atlântica com acesso ao Poço Verde, quedas d’água e trechos no vale das Andorinhas, em Santo Aleixo/Magé.'
  },

  // Rios
  {
    id: 'cachoeira-monjolo',
    name: 'Cachoeira do Monjolo (Santo Aleixo)',
    rating: 4.9,
    distanceKm: 3,
    durationH: 1.3,
    level: 'Intermediário',
    elevationM: 80,
    category: 'Rios',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop',
    hasTrail: true,
    description: 'Conjunto de três quedas com piscinas naturais em meio à mata; principal atração de Santo Aleixo.'
  },
  {
    id: 'cachoeira-veu-da-noiva',
    name: 'Cachoeira Véu da Noiva (Santo Aleixo)',
    rating: 4.8,
    distanceKm: 2.2,
    durationH: 1.2,
    level: 'Intermediário',
    elevationM: 90,
    category: 'Rios',
    image: imgCachoeiraVeoDaNoiva,
    hasTrail: true,
    description: 'Queda d’água clássica de Santo Aleixo com trilha leve em mata atlântica e poços para banho.'
  },
  {
    id: 'rio-inhomirim',
    name: 'Rio Inhomirim (Vila Inhomirim)',
    rating: 4.5,
    distanceKm: 2,
    durationH: 1,
    level: 'Fácil',
    elevationM: 30,
    category: 'Rios',
    image: 'https://images.unsplash.com/photo-1520962922320-2038eebab146?q=80&w=1200&auto=format&fit=crop',
    hasTrail: true,
    description: 'Trecho de rio com corredeiras leves e margens arborizadas na região de Vila Inhomirim.'
  },
  {
    id: 'rio-surui',
    name: 'Rio Suruí (Suruí)',
    rating: 4.4,
    distanceKm: 2.5,
    durationH: 1,
    level: 'Fácil',
    elevationM: 25,
    category: 'Rios',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
    hasTrail: true,
    description: 'Passeio pelas margens do Rio Suruí com pequenas áreas de descanso e observação de fauna.'
  },
  {
    id: 'poco-bento',
    name: 'Poço do Bento (Santo Aleixo)',
    rating: 4.7,
    distanceKm: 2.8,
    durationH: 1.4,
    level: 'Intermediário',
    elevationM: 95,
    category: 'Rios',
    image: imgPocoBento,
    hasTrail: true,
    description: 'Poço natural com águas claras em Santo Aleixo, acessível por trilha leve com trechos de pedra.'
  },

  // Urbano
  {
    id: 'estacao-guia-pacobaiba',
    name: 'Estação Guia de Pacobaíba (Mauá)',
    rating: 4.8,
    distanceKm: 1,
    durationH: 0.8,
    level: 'Fácil',
    elevationM: 5,
    category: 'Urbano',
    image: imgEstacaoGuiaPacobaiba,
    hasTrail: false,
    description: 'Primeira estação ferroviária do Brasil (1854), tombada pelo IPHAN; conjunto histórico à beira da baía.'
  },
  {
    id: 'cais-de-maua',
    name: 'Cais de Mauá / Praia de Mauá',
    rating: 4.5,
    distanceKm: 1.5,
    durationH: 1,
    level: 'Fácil',
    elevationM: 2,
    category: 'Urbano',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    hasTrail: false,
    description: 'Orla histórica com píer e vista para a Baía de Guanabara; ponto tradicional de lazer dos mageenses.'
  },
  {
    id: 'igreja-ns-guia',
    name: 'Igreja de Nossa Senhora da Guia (Mauá)',
    rating: 4.6,
    distanceKm: 0.6,
    durationH: 0.5,
    level: 'Fácil',
    elevationM: 6,
    category: 'Urbano',
    image: imgIgrejaNsGuiaPacobaiba,
    hasTrail: false,
    description: 'Igreja histórica que dá nome à antiga freguesia; arquitetura colonial e vista para o distrito.'
  },
  {
    id: 'igreja-matriz-piedade',
    name: 'Igreja Matriz N. Sra. da Piedade (Magé)',
    rating: 4.7,
    distanceKm: 0.4,
    durationH: 0.4,
    level: 'Fácil',
    elevationM: 10,
    category: 'Urbano',
    image: imgIgrejaMatrizPiedade,
    hasTrail: false,
    description: 'Igreja matriz no Centro de Magé, palco das celebrações da padroeira do município.'
  },
  {
    id: 'capela-croara',
    name: 'Capela de São Francisco do Croará',
    rating: 4.4,
    distanceKm: 0.8,
    durationH: 0.6,
    level: 'Fácil',
    elevationM: 4,
    category: 'Urbano',
    image: 'https://images.unsplash.com/photo-1523419409543-a6c56e3b8643?q=80&w=1200&auto=format&fit=crop',
    hasTrail: false,
    description: 'Capela tradicional do distrito de Guia de Pacobaíba, parte do circuito de igrejas históricas.'
  },
  {
    id: 'capela-ns-remedios',
    name: 'Capela N. Sra. dos Remédios (Magé)',
    rating: 4.5,
    distanceKm: 0.5,
    durationH: 0.3,
    level: 'Fácil',
    elevationM: 8,
    category: 'Urbano',
    image: imgCapelaRemedios,
    hasTrail: false,
    description: 'Capela histórica do município de Magé, integrante do circuito religioso local.'
  },
  {
    id: 'capela-ns-bonfim',
    name: 'Capela N. Sra. do Bonfim (Magé)',
    rating: 4.5,
    distanceKm: 0.6,
    durationH: 0.4,
    level: 'Fácil',
    elevationM: 7,
    category: 'Urbano',
    image: imgCapelaBonfim,
    hasTrail: false,
    description: 'Capela tradicional de Magé, com celebrações e arquitetura simples de época.'
  },
  {
    id: 'capela-santa-ana-iriri',
    name: 'Capela Santa Ana do Iriri (Magé)',
    rating: 4.5,
    distanceKm: 0.7,
    durationH: 0.5,
    level: 'Fácil',
    elevationM: 6,
    category: 'Urbano',
    image: imgCapelaSantaAnaIriri,
    hasTrail: false,
    description: 'Capela do bairro/litoral do Iriri em Magé, ponto de fé e história local.'
  },
  {
    id: 'igreja-santana',
    name: 'Igreja de Sant’Ana (Magé)',
    rating: 4.6,
    distanceKm: 0.6,
    durationH: 0.5,
    level: 'Fácil',
    elevationM: 9,
    category: 'Urbano',
    image: imgIgrejaSantana,
    hasTrail: false,
    description: 'Igreja histórica dedicada a Sant’Ana em Magé, parte do patrimônio religioso local.'
  },
  {
    id: 'igreja-sao-nicolau',
    name: 'Igreja de São Nicolau (Magé)',
    rating: 4.6,
    distanceKm: 0.6,
    durationH: 0.5,
    level: 'Fácil',
    elevationM: 9,
    category: 'Urbano',
    image: imgIgrejaSaoNicolau,
    hasTrail: false,
    description: 'Igreja tradicional de São Nicolau em Magé, referência cultural e religiosa.'
  },

  // Campos
  {
    id: 'haras-dos-anjos',
    name: 'Haras dos Anjos (Santo Aleixo)',
    rating: 4.5,
    distanceKm: 2,
    durationH: 1,
    level: 'Fácil',
    elevationM: 15,
    category: 'Campos',
    image: 'https://images.unsplash.com/photo-1504280390368-3972f557a2db?q=80&w=1200&auto=format&fit=crop',
    hasTrail: false,
    description: 'Área de eventos e atividades equestres em campos abertos, com vista para a serra.'
  },
  {
    id: 'campo-pau-grande',
    name: 'Campo do EC Pau Grande (Pau Grande)',
    rating: 4.6,
    distanceKm: 1.2,
    durationH: 0.8,
    level: 'Fácil',
    elevationM: 12,
    category: 'Campos',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop',
    hasTrail: false,
    description: 'Campo histórico do bairro Pau Grande, berço do craque Mané Garrincha, cercado por áreas verdes.'
  }
]

const categories = [
  { key: '', label: 'Todos', icon: 'ListFilter' },
  { key: 'Montanha', icon: 'Mountain' },
  { key: 'Floresta', icon: 'Trees' },
  { key: 'Rios', icon: 'Waves' },
  { key: 'Urbano', icon: 'Building2' },
  { key: 'Campos', icon: 'Flower2' },
]

export function usePlacesStore() {
  const all = () => {
    // Usar trigger para forçar reatividade
    updateTrigger.value
    const extras = extraStorage.get() || []
    const removed = new Set(removedStorage.get() || [])
    return [...samplePlaces.filter(p => !removed.has(p.id)), ...extras]
  }
  const getById = (id) => all().find(p => p.id === id)
  const getCategories = () => categories
  const getFavorites = () => favoritesRef.value
  const isFavorite = (id) => favoritesRef.value.includes(id)
  const toggleFavorite = (id) => {
    const cur = new Set(favoritesRef.value)
    if (cur.has(id)) cur.delete(id)
    else cur.add(id)
    const next = [...cur]
    favoritesRef.value = next
    favStorage.set(next)
    return next
  }
  const search = ({ q = '', category = '' } = {}) => {
    return all().filter(p => {
      const byText = q ? p.name.toLowerCase().includes(q.toLowerCase()) : true
      const byCat = category ? p.category === category : true
      return byText && byCat
    })
  }
  const addPlace = (place) => {
    const extras = extraStorage.get() || []
    const exists = extras.find(e => e.id === place.id) || samplePlaces.find(s => s.id === place.id)
    if (exists) throw new Error('ID já existe')
    extraStorage.set([...extras, place])
    updateTrigger.value++
    return place
  }
  const removePlace = (id) => {
    // Remover de extras, ou marcar removido se for sample
    const extras = extraStorage.get() || []
    const nextExtras = extras.filter(e => e.id !== id)
    if (nextExtras.length !== extras.length) {
      extraStorage.set(nextExtras)
      console.log('Removido dos extras:', id)
    } else {
      const removed = new Set(removedStorage.get() || [])
      removed.add(id)
      removedStorage.set([...removed])
      console.log('Marcado como removido:', id)
    }
    // Forçar reavaliação removendo do localStorage de favoritos se existir
    const currentFavs = favoritesRef.value
    if (currentFavs.includes(id)) {
      const newFavs = currentFavs.filter(fav => fav !== id)
      favoritesRef.value = newFavs
      favStorage.set(newFavs)
    }
    updateTrigger.value++
    return true
  }
  return { all, getById, getCategories, search, isFavorite, toggleFavorite, addPlace, removePlace }
}
