<script setup>
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
import { usePlacesStore } from '../stores/places'
import { useEventsStore } from '../stores/events'
import { ref, computed } from 'vue'
import { MapPin, Calendar } from 'lucide-vue-next'

const placesStore = usePlacesStore()
const eventsStore = useEventsStore()

// Aba ativa
const activeTab = ref('destinos')

// Dados dos formulários
const places = computed(() => placesStore.all())
const events = computed(() => eventsStore.all())

// Formulário de Destinos
const placeName = ref('')
const placeCategory = ref('Montanha')
const placeId = ref('')
const placeImage = ref('')
const placeDescription = ref('')
const placeDistanceKm = ref(1)
const placeDurationH = ref(1)
const placeElevationM = ref(0)
const placeRating = ref(4.5)
const placeLevel = ref('Fácil')
const placeAttempted = ref(false)

// Formulário de Eventos
const eventName = ref('')
const eventId = ref('')
const eventImage = ref('')
const eventDescription = ref('')
const eventDate = ref('')
const eventLocation = ref('')
const eventAttempted = ref(false)

const catOptions = computed(() => (placesStore.getCategories?.() || [])
  .filter(c => c.key)
  .map(c => ({ key: c.key, label: c.label || c.key })))
const levelOptions = ['Fácil','Intermediário','Difícil']

function genIdFromName(n){
  return n.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
}

const placeGeneratedId = computed(() => placeId.value || genIdFromName(placeName.value))
const eventGeneratedId = computed(() => eventId.value || genIdFromName(eventName.value))

function isValidUrl(u){ try{ new URL(u); return true }catch{ return false } }

// Validações para Destinos
const placeErrors = computed(() => ({
  name: !placeName.value ? 'Informe o nome' : '',
  category: !placeCategory.value ? 'Selecione a categoria' : '',
  image: placeImage.value && !isValidUrl(placeImage.value) ? 'URL inválida' : '',
  distanceKm: Number(placeDistanceKm.value) > 0 ? '' : 'Distância deve ser > 0',
  durationH: Number(placeDurationH.value) > 0 ? '' : 'Duração deve ser > 0',
  elevationM: Number(placeElevationM.value) >= 0 ? '' : 'Elevação não pode ser negativa',
  rating: Number(placeRating.value) >= 0 && Number(placeRating.value) <= 5 ? '' : 'Nota deve estar entre 0 e 5',
  level: !placeLevel.value ? 'Informe o nível' : ''
}))
const placeIsValid = computed(() => Object.values(placeErrors.value).every(v => !v))

// Validações para Eventos
const eventErrors = computed(() => ({
  name: !eventName.value ? 'Informe o nome' : '',
  date: !eventDate.value ? 'Informe a data e hora' : '',
  location: !eventLocation.value ? 'Informe o local' : '',
  image: eventImage.value && !isValidUrl(eventImage.value) ? 'URL inválida' : ''
}))
const eventIsValid = computed(() => Object.values(eventErrors.value).every(v => !v))

// Funções de submit
function submitPlace(){
  placeAttempted.value = true
  if(!placeIsValid.value){ return }
  try{
    placesStore.addPlace({ 
      id: placeGeneratedId.value, 
      name: placeName.value, 
      category: placeCategory.value, 
      image: placeImage.value || 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop', 
      description: placeDescription.value || 'Novo destino adicionado.', 
      distanceKm: Number(placeDistanceKm.value)||0, 
      durationH: Number(placeDurationH.value)||0, 
      elevationM: Number(placeElevationM.value)||0, 
      rating: Number(placeRating.value)||0, 
      level: placeLevel.value || 'Fácil',
      hasTrail: true
    })
    clearPlaceForm()
    alert('Destino adicionado!')
  }catch(e){ alert(e.message || 'Erro ao adicionar destino') }
}

function submitEvent(){
  eventAttempted.value = true
  if(!eventIsValid.value){ return }
  try{
    eventsStore.addEvent({ 
      id: eventGeneratedId.value, 
      name: eventName.value, 
      date: eventDate.value,
      location: eventLocation.value,
      image: eventImage.value || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop', 
      description: eventDescription.value || 'Novo evento adicionado.'
    })
    clearEventForm()
    alert('Evento adicionado!')
  }catch(e){ alert(e.message || 'Erro ao adicionar evento') }
}

function clearPlaceForm(){
  placeName.value=''; placeId.value=''; placeImage.value=''; placeDescription.value=''
  placeDistanceKm.value=1; placeDurationH.value=1; placeElevationM.value=0; placeRating.value=4.5; 
  placeLevel.value='Fácil'; placeCategory.value='Montanha'; placeAttempted.value = false
}

function clearEventForm(){
  eventName.value=''; eventId.value=''; eventImage.value=''; eventDescription.value=''
  eventDate.value=''; eventLocation.value=''; eventAttempted.value = false
}

function removePlace(item){
  if(confirm(`Remover destino "${item.name}"?`)){
    try {
      placesStore.removePlace(item.id)
      console.log('Destino removido com sucesso:', item.name)
      // Força reatividade no componente
      setTimeout(() => {
        // Trigger para forçar re-render das listas
      }, 100)
    } catch (error) {
      console.error('Erro ao remover destino:', error)
      alert('Erro ao remover destino: ' + error.message)
    }
  }
}

function removeEvent(item){
  if(confirm(`Remover evento "${item.name}"?`)){
    try {
      eventsStore.removeEvent(item.id)
      console.log('Evento removido com sucesso:', item.name)
      // Força reatividade no componente
      setTimeout(() => {
        // Trigger para forçar re-render das listas
      }, 100)
    } catch (error) {
      console.error('Erro ao remover evento:', error)
      alert('Erro ao remover evento: ' + error.message)
    }
  }
}
</script>

<template>
  <TopBar :showMenu="false" />
  <div class="main-content">
    <section class="wrap">
      <h1>Gerenciar Conteúdo</h1>
      
      <!-- Abas -->
      <div class="tabs">
        <button 
          :class="['tab', { active: activeTab === 'destinos' }]" 
          @click="activeTab = 'destinos'"
        >
          <MapPin :size="18" />
          Destinos
        </button>
        <button 
          :class="['tab', { active: activeTab === 'eventos' }]" 
          @click="activeTab = 'eventos'"
        >
          <Calendar :size="18" />
          Eventos
        </button>
      </div>

      <!-- Formulário de Destinos -->
      <div v-if="activeTab === 'destinos'" class="tab-content">
        <form class="form" @submit.prevent="submitPlace">
          <div class="field">
            <label>Nome <span class="req">*</span></label>
            <input v-model="placeName" placeholder="Ex.: Cachoeira do Vale" :class="{ invalid: placeAttempted && placeErrors.name }" />
            <small v-if="placeAttempted && placeErrors.name" class="err">{{ placeErrors.name }}</small>
          </div>

          <div class="field">
            <label>ID (opcional)</label>
            <input v-model="placeId" placeholder="Ex.: cachoeira-do-vale" />
            <small class="hint">Se vazio, geramos a partir do nome: <b>{{ placeGeneratedId }}</b></small>
          </div>

          <div class="field">
            <label>Categoria <span class="req">*</span></label>
            <select v-model="placeCategory" :class="{ invalid: placeAttempted && placeErrors.category }">
              <option v-for="c in catOptions" :key="c.key" :value="c.key">{{ c.label }}</option>
            </select>
            <small v-if="placeAttempted && placeErrors.category" class="err">{{ placeErrors.category }}</small>
          </div>

          <div class="field">
            <label>URL da imagem (opcional)</label>
            <input v-model="placeImage" placeholder="https://..." :class="{ invalid: placeAttempted && placeErrors.image }" />
            <small v-if="placeAttempted && placeErrors.image" class="err">{{ placeErrors.image }}</small>
            <div class="img-preview" v-if="placeImage">
              <div class="img" :style="{ backgroundImage: `url(${placeImage})` }" />
            </div>
          </div>

          <div class="field">
            <label>Descrição (opcional)</label>
            <textarea v-model="placeDescription" placeholder="Breve descrição do destino"></textarea>
          </div>

          <div class="grid">
            <div class="field">
              <label>Distância (km) <span class="req">*</span></label>
              <input type="number" step="0.1" min="0.1" v-model="placeDistanceKm" placeholder="Ex.: 3.2" :class="{ invalid: placeAttempted && placeErrors.distanceKm }" />
              <small v-if="placeAttempted && placeErrors.distanceKm" class="err">{{ placeErrors.distanceKm }}</small>
            </div>
            <div class="field">
              <label>Duração (h) <span class="req">*</span></label>
              <input type="number" step="0.1" min="0.1" v-model="placeDurationH" placeholder="Ex.: 1.5" :class="{ invalid: placeAttempted && placeErrors.durationH }" />
              <small v-if="placeAttempted && placeErrors.durationH" class="err">{{ placeErrors.durationH }}</small>
            </div>
            <div class="field">
              <label>Elevação (m)</label>
              <input type="number" step="1" min="0" v-model="placeElevationM" placeholder="Ex.: 120" :class="{ invalid: placeAttempted && placeErrors.elevationM }" />
              <small v-if="placeAttempted && placeErrors.elevationM" class="err">{{ placeErrors.elevationM }}</small>
            </div>
            <div class="field">
              <label>Nota (0-5)</label>
              <input type="number" step="0.1" min="0" max="5" v-model="placeRating" placeholder="Ex.: 4.6" :class="{ invalid: placeAttempted && placeErrors.rating }" />
              <small v-if="placeAttempted && placeErrors.rating" class="err">{{ placeErrors.rating }}</small>
            </div>
            <div class="field">
              <label>Nível</label>
              <select v-model="placeLevel">
                <option v-for="lv in levelOptions" :key="lv" :value="lv">{{ lv }}</option>
              </select>
            </div>
          </div>

          <button class="btn primary" type="submit" :disabled="!placeIsValid">Adicionar Destino</button>
        </form>

        <h2 class="mt">Destinos ({{ places.length }})</h2>
        <ul class="list">
          <li v-for="place in places" :key="place.id">
            <div>
              <b>{{ place.name }}</b>
              <small class="muted"> — {{ place.category }}</small>
            </div>
            <button class="danger" @click="removePlace(place)">Remover</button>
          </li>
        </ul>
      </div>

      <!-- Formulário de Eventos -->
      <div v-if="activeTab === 'eventos'" class="tab-content">
        <form class="form" @submit.prevent="submitEvent">
          <div class="field">
            <label>Nome <span class="req">*</span></label>
            <input v-model="eventName" placeholder="Ex.: Show na Praça" :class="{ invalid: eventAttempted && eventErrors.name }" />
            <small v-if="eventAttempted && eventErrors.name" class="err">{{ eventErrors.name }}</small>
          </div>

          <div class="field">
            <label>ID (opcional)</label>
            <input v-model="eventId" placeholder="Ex.: show-na-praca" />
            <small class="hint">Se vazio, geramos a partir do nome: <b>{{ eventGeneratedId }}</b></small>
          </div>

          <div class="field">
            <label>Data e Hora <span class="req">*</span></label>
            <input type="datetime-local" v-model="eventDate" :class="{ invalid: eventAttempted && eventErrors.date }" />
            <small v-if="eventAttempted && eventErrors.date" class="err">{{ eventErrors.date }}</small>
          </div>

          <div class="field">
            <label>Local <span class="req">*</span></label>
            <input v-model="eventLocation" placeholder="Ex.: Praça da Matriz, Centro de Magé" :class="{ invalid: eventAttempted && eventErrors.location }" />
            <small v-if="eventAttempted && eventErrors.location" class="err">{{ eventErrors.location }}</small>
          </div>

          <div class="field">
            <label>URL da imagem (opcional)</label>
            <input v-model="eventImage" placeholder="https://..." :class="{ invalid: eventAttempted && eventErrors.image }" />
            <small v-if="eventAttempted && eventErrors.image" class="err">{{ eventErrors.image }}</small>
            <div class="img-preview" v-if="eventImage">
              <div class="img" :style="{ backgroundImage: `url(${eventImage})` }" />
            </div>
          </div>

          <div class="field">
            <label>Descrição (opcional)</label>
            <textarea v-model="eventDescription" placeholder="Breve descrição do evento"></textarea>
          </div>

          <button class="btn primary" type="submit" :disabled="!eventIsValid">Adicionar Evento</button>
        </form>

        <h2 class="mt">Eventos ({{ events.length }})</h2>
        <ul class="list">
          <li v-for="event in events" :key="event.id">
            <div>
              <b>{{ event.name }}</b>
              <small class="muted"> — {{ new Date(event.date).toLocaleDateString('pt-BR') }}</small>
            </div>
            <button class="danger" @click="removeEvent(event)">Remover</button>
          </li>
        </ul>
      </div>
    </section>
  </div>

  <BottomNav active="gerenciar" />
</template>

<style scoped>
.wrap{ padding: .75rem; }
h1{ font-size:1.25rem; margin:.25rem 0 1rem; color:#2d3d2f; }

/* Sistema de abas */
.tabs { 
  display: flex; 
  gap: .5rem; 
  margin-bottom: 1.5rem; 
  border-bottom: 1px solid var(--color-surface-3);
  overflow-x: auto;
}
.tab { 
  display: flex; 
  align-items: center; 
  gap: .5rem; 
  background: transparent; 
  border: none; 
  padding: .75rem 1rem; 
  border-radius: .5rem .5rem 0 0; 
  color: var(--color-muted); 
  cursor: pointer; 
  font-size: .9rem;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
}
.tab:hover { 
  background: var(--color-surface-2); 
  color: var(--color-text);
}
.tab.active { 
  background: var(--color-primary-soft); 
  color: var(--color-primary-deep); 
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}
.tab-content { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.form{ display:flex; flex-direction:column; gap:.7rem; background:#fff; border:1px solid var(--color-surface-3); padding:.9rem; border-radius:.8rem; box-shadow: var(--shadow-sm); }
.field{ display:flex; flex-direction:column; gap:.25rem; }
.field label{ font-size:.9rem; color:#2b3a2d; font-weight:600; }
.req{ color:#e11d48; }
.hint{ color: var(--color-muted); }
.err{ color:#b42318; font-size:.8rem; }
.grid{ display:grid; grid-template-columns: repeat(2,1fr); gap:.5rem; }
.form input,.form select,.form textarea{ width:100%; padding:.65rem .75rem; border-radius:.6rem; border:1px solid var(--color-surface-3); background:#fff; }
.form textarea{ min-height:88px; resize:vertical; }
.form input.invalid,.form select.invalid,.form textarea.invalid{ border-color:#f2b5b5; background:#fffafa; }
.btn.primary{ background: var(--grad-primary); color:#fff; border:none; border-radius:.6rem; padding:.6rem .9rem; font-weight:700; cursor: pointer; }
.btn.primary:hover:not(:disabled){ filter: brightness(1.05); transform: translateY(-1px); }
.btn.primary:disabled{ opacity:.6; cursor:not-allowed; filter: grayscale(20%); }
.mt{ margin-top:1rem; color:#2d3d2f; }
.list{ list-style:none; padding:0; margin:.5rem 0 5rem; display:flex; flex-direction:column; gap:.5rem; }
.list li{ display:flex; align-items:center; justify-content:space-between; background:#fff; border:1px solid var(--color-surface-3); border-radius:.7rem; padding:.6rem .75rem; }
.muted{ color: var(--color-muted); }
.danger{ background:#fff; border:1px solid #f2c1c1; color:#a33232; border-radius:.6rem; padding:.35rem .6rem; cursor: pointer; }
.danger:hover{ background:#fff0f0; }
.img-preview{ margin-top:.25rem; }
.img{ width:100%; aspect-ratio: 16/9; background-size:cover; background-position:center; border-radius:.5rem; border:1px solid var(--color-surface-3); }

/* Melhorias para desktop */
@media (min-width:560px){ .grid{ grid-template-columns: repeat(3,1fr); } }
@media (min-width: 768px) {
  .main-content { max-width: 1000px; margin: 0 auto; }
  .wrap { padding: 2rem; }
  h1 { font-size: 1.75rem; margin: 0 0 1rem; }
  .form { padding: 1.5rem; gap: 1rem; }
  .field label { font-size: 1rem; }
  .form input, .form select, .form textarea { padding: .75rem 1rem; font-size: 1rem; }
  .form textarea { min-height: 120px; }
  .grid { grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .btn.primary { padding: .75rem 1.5rem; font-size: 1rem; }
  .mt { margin-top: 2rem; font-size: 1.4rem; }
  .list { margin: 1rem 0 2rem; }
  .list li { padding: 1rem 1.25rem; }
  .danger { padding: .5rem 1rem; }
}
@media (min-width: 1200px) {
  .grid { grid-template-columns: repeat(5, 1fr); }
}
</style>