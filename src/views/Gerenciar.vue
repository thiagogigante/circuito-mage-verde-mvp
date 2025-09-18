<script setup>
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
import { usePlacesStore } from '../stores/places'
import { ref, computed } from 'vue'

const store = usePlacesStore()
const items = computed(() => store.all())

// Simple form state
const name = ref('')
const category = ref('Montanha')
const id = ref('')
const image = ref('')
const description = ref('')
const distanceKm = ref(1)
const durationH = ref(1)
const elevationM = ref(0)
const rating = ref(4.5)
const level = ref('Fácil')
const attempted = ref(false)

const catOptions = computed(() => (store.getCategories?.() || [])
  .filter(c => c.key)
  .map(c => ({ key: c.key, label: c.label || c.key })))
const levelOptions = ['Fácil','Intermediário','Difícil']

function genIdFromName(n){
  return n.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
}

const pid = computed(() => id.value || genIdFromName(name.value))
function isValidUrl(u){ try{ new URL(u); return true }catch{ return false } }
const errors = computed(() => ({
  name: !name.value ? 'Informe o nome' : '',
  category: !category.value ? 'Selecione a categoria' : '',
  image: image.value && !isValidUrl(image.value) ? 'URL inválida' : '',
  distanceKm: Number(distanceKm.value) > 0 ? '' : 'Distância deve ser > 0',
  durationH: Number(durationH.value) > 0 ? '' : 'Duração deve ser > 0',
  elevationM: Number(elevationM.value) >= 0 ? '' : 'Elevação não pode ser negativa',
  rating: Number(rating.value) >= 0 && Number(rating.value) <= 5 ? '' : 'Nota deve estar entre 0 e 5',
  level: !level.value ? 'Informe o nível' : ''
}))
const isValid = computed(() => Object.values(errors.value).every(v => !v))

function submit(){
  attempted.value = true
  if(!isValid.value){ return }
  try{
    store.addPlace({ id: pid.value, name: name.value, category: category.value, image: image.value || 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop', description: description.value || 'Novo ponto adicionado.', distanceKm: Number(distanceKm.value)||0, durationH: Number(durationH.value)||0, elevationM: Number(elevationM.value)||0, rating: Number(rating.value)||0, level: level.value || 'Fácil' })
    name.value=''; id.value=''; image.value=''; description.value=''
    distanceKm.value=1; durationH.value=1; elevationM.value=0; rating.value=4.5; level.value='Fácil'; category.value='Montanha'
    attempted.value = false
    alert('Registro adicionado!')
  }catch(e){ alert(e.message || 'Erro ao adicionar') }
}

function removeItem(item){
  if(confirm(`Remover "${item.name}"?`)){
    store.removePlace(item.id)
  }
}
</script>

<template>
  <TopBar :showMenu="false" />
  <section class="wrap">
    <h1>Gerenciar pontos</h1>
    <form class="form" @submit.prevent="submit">
      <div class="field">
        <label>Nome <span class="req">*</span></label>
        <input v-model="name" placeholder="Ex.: Cachoeira do Vale" :class="{ invalid: attempted && errors.name }" />
        <small v-if="attempted && errors.name" class="err">{{ errors.name }}</small>
      </div>

      <div class="field">
        <label>ID (opcional)</label>
        <input v-model="id" placeholder="Ex.: cachoeira-do-vale" />
        <small class="hint">Se vazio, geramos a partir do nome: <b>{{ pid }}</b></small>
      </div>

      <div class="field">
        <label>Categoria <span class="req">*</span></label>
        <select v-model="category" :class="{ invalid: attempted && errors.category }">
          <option v-for="c in catOptions" :key="c.key" :value="c.key">{{ c.label }}</option>
        </select>
        <small v-if="attempted && errors.category" class="err">{{ errors.category }}</small>
      </div>

      <div class="field">
        <label>URL da imagem (opcional)</label>
        <input v-model="image" placeholder="https://..." :class="{ invalid: attempted && errors.image }" />
        <small v-if="attempted && errors.image" class="err">{{ errors.image }}</small>
        <div class="img-preview" v-if="image">
          <div class="img" :style="{ backgroundImage: `url(${image})` }" />
        </div>
      </div>

      <div class="field">
        <label>Descrição (opcional)</label>
        <textarea v-model="description" placeholder="Breve descrição do ponto"></textarea>
      </div>

      <div class="grid">
        <div class="field">
          <label>Distância (km) <span class="req">*</span></label>
          <input type="number" step="0.1" min="0.1" v-model="distanceKm" placeholder="Ex.: 3.2" :class="{ invalid: attempted && errors.distanceKm }" />
          <small v-if="attempted && errors.distanceKm" class="err">{{ errors.distanceKm }}</small>
        </div>
        <div class="field">
          <label>Duração (h) <span class="req">*</span></label>
          <input type="number" step="0.1" min="0.1" v-model="durationH" placeholder="Ex.: 1.5" :class="{ invalid: attempted && errors.durationH }" />
          <small v-if="attempted && errors.durationH" class="err">{{ errors.durationH }}</small>
        </div>
        <div class="field">
          <label>Elevação (m)</label>
          <input type="number" step="1" min="0" v-model="elevationM" placeholder="Ex.: 120" :class="{ invalid: attempted && errors.elevationM }" />
          <small v-if="attempted && errors.elevationM" class="err">{{ errors.elevationM }}</small>
        </div>
        <div class="field">
          <label>Nota (0-5)</label>
          <input type="number" step="0.1" min="0" max="5" v-model="rating" placeholder="Ex.: 4.6" :class="{ invalid: attempted && errors.rating }" />
          <small v-if="attempted && errors.rating" class="err">{{ errors.rating }}</small>
        </div>
        <div class="field">
          <label>Nível</label>
          <select v-model="level">
            <option v-for="lv in levelOptions" :key="lv" :value="lv">{{ lv }}</option>
          </select>
        </div>
      </div>

      <button class="btn primary" type="submit" :disabled="!isValid">Adicionar</button>
    </form>

    <h2 class="mt">Registros</h2>
    <ul class="list">
      <li v-for="it in items" :key="it.id">
        <div>
          <b>{{ it.name }}</b>
          <small class="muted"> — {{ it.category }}</small>
        </div>
        <button class="danger" @click="removeItem(it)">Remover</button>
      </li>
    </ul>
  </section>

  <BottomNav active="gerenciar" />
</template>

<style scoped>
.wrap{ padding: .75rem; }
h1{ font-size:1.25rem; margin:.25rem 0 .5rem; color:#2d3d2f; }
.form{ display:flex; flex-direction:column; gap:.7rem; background:#fff; border:1px solid var(--color-surface-3); padding:.9rem; border-radius:.8rem; box-shadow: var(--shadow-sm); }
.field{ display:flex; flex-direction:column; gap:.25rem; }
.field label{ font-size:.9rem; color:#2b3a2d; font-weight:600; }
.req{ color:#e11d48; }
.hint{ color: var(--color-muted); }
.err{ color:#b42318; font-size:.8rem; }
.grid{ display:grid; grid-template-columns: repeat(2,1fr); gap:.5rem; }
@media (min-width:560px){ .grid{ grid-template-columns: repeat(3,1fr); } }
.form input,.form select,.form textarea{ width:100%; padding:.65rem .75rem; border-radius:.6rem; border:1px solid var(--color-surface-3); background:#fff; }
.form textarea{ min-height:88px; resize:vertical; }
.form input.invalid,.form select.invalid,.form textarea.invalid{ border-color:#f2b5b5; background:#fffafa; }
.btn.primary{ background: var(--grad-primary); color:#fff; border:none; border-radius:.6rem; padding:.6rem .9rem; font-weight:700; }
.btn.primary:disabled{ opacity:.6; cursor:not-allowed; filter: grayscale(20%); }
.mt{ margin-top:1rem; color:#2d3d2f; }
.list{ list-style:none; padding:0; margin:.5rem 0 5rem; display:flex; flex-direction:column; gap:.5rem; }
.list li{ display:flex; align-items:center; justify-content:space-between; background:#fff; border:1px solid var(--color-surface-3); border-radius:.7rem; padding:.6rem .75rem; }
.muted{ color: var(--color-muted); }
.danger{ background:#fff; border:1px solid #f2c1c1; color:#a33232; border-radius:.6rem; padding:.35rem .6rem; }
.danger:hover{ background:#fff0f0; }
.img-preview{ margin-top:.25rem; }
.img{ width:100%; aspect-ratio: 16/9; background-size:cover; background-position:center; border-radius:.5rem; border:1px solid var(--color-surface-3); }
</style>