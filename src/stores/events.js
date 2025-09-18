import { ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
// Imagens locais dos eventos (Festa de Nossa Senhora da Piedade 2025 – Magé/RJ)
import imgModoOn from '../assets/events/festa_nsra_piedade_2025_modoonA1209-2030.jpg'
import imgTheFevers from '../assets/events/festa_nsra_piedade_2025_thefeversB1209-2230.jpg'
import imgRomuloLoves from '../assets/events/festa_nsra_piedade_2025_romulolovesC1309-2300.jpg'
import imgKleberMonteiro from '../assets/events/festa_nsra_piedade_2025_klebermonteiroD1409-1300.jpg'
import imgMinisterioPorCristo from '../assets/events/festa_nsra_piedade_2025_ministerioporcristoE1409-2030.jpg'

const favStorage = useLocalStorage('event_favorites', [])
const favoritesRef = ref(favStorage.get() || [])

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
  const all = () => sampleEvents
  const getById = (id) => sampleEvents.find(e => e.id === id)
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
  return { all, getById, getFavorites, isFavorite, toggleFavorite }
}
