import { ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
// Imagens locais dos eventos (Festa de Nossa Senhora da Piedade 2025 – Magé/RJ)
import imgModoOn from '../assets/events/festa_nsra_piedade_2025_modoonA1209-2030.jpg'
import imgTheFevers from '../assets/events/festa_nsra_piedade_2025_thefeversB1209-2230.jpg'
import imgRomuloLoves from '../assets/events/festa_nsra_piedade_2025_romulolovesC1309-2300.jpg'
import imgKleberMonteiro from '../assets/events/festa_nsra_piedade_2025_klebermonteiroD1409-1300.jpg'
import imgMinisterioPorCristo from '../assets/events/festa_nsra_piedade_2025_ministerioporcristoE1409-2030.jpg'

const favStorage = useLocalStorage('event_favorites', [])
const extraStorage = useLocalStorage('events_extra', [])
const removedStorage = useLocalStorage('events_removed', [])
const favoritesRef = ref(favStorage.get() || [])
// Trigger reativo para forçar atualização das listas
const updateTrigger = ref(0)

// Programação musical da Festa de Nossa Senhora da Piedade 2025 (Magé/RJ)
// Datas/horários inferidos a partir dos nomes dos arquivos de imagem (A/B/C/D/E 1209/1309/1409).
const sampleEvents = [
  {
    id: 'piedade-2025-modo-on',
    name: 'Modo On — Festa N. Sra. da Piedade 2025',
    date: '2025-09-12 20:30',
    location: 'Praça da Matriz (Centro de Magé)',
    image: imgModoOn,
    description: 'Abertura musical da festa da padroeira de Magé. Evento gratuito e para toda a família.'
  },
  {
    id: 'piedade-2025-the-fevers',
    name: 'The Fevers — Festa N. Sra. da Piedade 2025',
    date: '2025-09-12 22:30',
    location: 'Praça da Matriz (Centro de Magé)',
    image: imgTheFevers,
    description: 'Show especial do grupo The Fevers no primeiro dia da festa da padroeira.'
  },
  {
    id: 'piedade-2025-romulo-loves',
    name: 'Rômulo Loves — Festa N. Sra. da Piedade 2025',
    date: '2025-09-13 23:00',
    location: 'Praça da Matriz (Centro de Magé)',
    image: imgRomuloLoves,
    description: 'Programação musical do segundo dia da festa da padroeira de Magé.'
  },
  {
    id: 'piedade-2025-kleber-monteiro',
    name: 'Kleber Monteiro — Festa N. Sra. da Piedade 2025',
    date: '2025-09-14 13:00',
    location: 'Praça da Matriz (Centro de Magé)',
    image: imgKleberMonteiro,
    description: 'Show diurno no encerramento da programação musical da festa da padroeira.'
  },
  {
    id: 'piedade-2025-ministerio-por-cristo',
    name: 'Ministério Por Cristo — Festa N. Sra. da Piedade 2025',
    date: '2025-09-14 20:30',
    location: 'Praça da Matriz (Centro de Magé)',
    image: imgMinisterioPorCristo,
    description: 'Apresentação de louvor e adoração no encerramento da festa.'
  }
]

export function useEventsStore(){
  const all = () => {
    // Usar trigger para forçar reatividade
    updateTrigger.value
    const removed = new Set(removedStorage.get() || [])
    const filteredSample = sampleEvents.filter(e => !removed.has(e.id))
    const extras = extraStorage.get() || []
    return [...filteredSample, ...extras].sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  const getById = (id) => all().find(e => e.id === id)
  const getFavorites = () => favoritesRef.value
  const isFavorite = (id) => favoritesRef.value.includes(id)
  const toggleFavorite = (id) => {
    const cur = new Set(favoritesRef.value)
    if (cur.has(id)) cur.delete(id); else cur.add(id)
    const next = [...cur]
    favoritesRef.value = next
    favStorage.set(next)
    return next
  }
  const search = (query = '') => {
    if (!query.trim()) return all()
    const q = query.toLowerCase()
    return all().filter(event => 
      event.name.toLowerCase().includes(q) ||
      event.location?.toLowerCase().includes(q) ||
      event.description?.toLowerCase().includes(q)
    )
  }
  const addEvent = (event) => {
    const extras = extraStorage.get() || []
    const exists = extras.find(e => e.id === event.id) || sampleEvents.find(s => s.id === event.id)
    if (exists) throw new Error('ID já existe')
    extraStorage.set([...extras, event])
    updateTrigger.value++
    return event
  }
  const removeEvent = (id) => {
    // Remover de extras, ou marcar removido se for sample
    const extras = extraStorage.get() || []
    const nextExtras = extras.filter(e => e.id !== id)
    if (nextExtras.length !== extras.length) {
      extraStorage.set(nextExtras)
      console.log('Evento removido dos extras:', id)
    } else {
      const removed = new Set(removedStorage.get() || [])
      removed.add(id)
      removedStorage.set([...removed])
      console.log('Evento marcado como removido:', id)
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
  return { all, getById, getFavorites, isFavorite, toggleFavorite, search, addEvent, removeEvent }
}
