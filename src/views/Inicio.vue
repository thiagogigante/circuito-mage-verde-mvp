<script setup>
import { computed } from 'vue'
import TopBar from '../components/TopBar.vue'
import SideMenu from '../components/SideMenu.vue'
import BottomNav from '../components/BottomNav.vue'
import PlaceCard from '../components/PlaceCard.vue'
import { usePlacesStore } from '../stores/places'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { ListFilter, Star, MapPin } from 'lucide-vue-next'

const router = useRouter()
const { logout } = useAuth()
const store = usePlacesStore()

// dados
const categories = store.getCategories()
const all = computed(() => store.all()) // tornar reativo

const total = computed(() => all.value.length)
const byCat = computed(() => categories.map(c => ({
  key: c.key,
  label: c.label || (c.key || 'Todos'),
  count: c.key ? all.value.filter(p => p.category === c.key).length : total.value
})))

const topRated = computed(() => [...all.value].sort((a,b) => b.rating - a.rating).slice(0,4))

function goToDetail(p){ router.push(`/detalhe/${p.id}`) }
function toggleFav(p){ store.toggleFavorite(p.id) }
const isFav = (p) => store.isFavorite(p.id)
function onLogout(){ logout(); router.replace('/') }
</script>

<template>
  <SideMenu :open="false" :items="categories" @logout="onLogout" />
  <TopBar @toggle-menu="() => {}" />

  <div class="main-content">
    <section class="hero">
      <div class="hero-inner">
        <h1>Bem-vindo(a) a Magé</h1>
        <p>Descubra trilhas, cachoeiras e história: tudo em um só lugar.</p>
        <div class="stats">
          <div class="stat"><Star :size="18"/> <b>{{ total }}</b> lugares</div>
          <div class="stat"><MapPin :size="18"/> {{ byCat.find(c=>c.key==='Montanha')?.count || 0 }} montanhas</div>
          <div class="stat"><MapPin :size="18"/> {{ byCat.find(c=>c.key==='Rios')?.count || 0 }} rios & cachoeiras</div>
          <div class="stat"><MapPin :size="18"/> {{ byCat.find(c=>c.key==='Urbano')?.count || 0 }} locais históricos</div>
        </div>
      </div>
    </section>

  <section class="grid">
    <h2 class="section-title"><ListFilter :size="18"/> Categorias</h2>
    <div class="chips">
      <button v-for="c in byCat" :key="c.key||'all'" class="chip" @click="router.push(c.key ? { path: '/trilhas', query: { category: c.key } } : { path: '/trilhas' })">
        <span class="chip-label">{{ c.label }}</span>
        <span class="chip-count">{{ c.count }}</span>
      </button>
    </div>
  </section>

  <section class="grid">
    <h2 class="section-title"><Star :size="18"/> Destaques</h2>
    <div class="cards">
      <PlaceCard v-for="p in topRated" :key="p.id" :place="p" :isFav="isFav(p)" @toggle-fav="toggleFav" @open="goToDetail" />
    </div>
  </section>

  <section class="grid">
    <h2 class="section-title"><MapPin :size="18"/> Turismo em Magé</h2>
    <div class="tourism">
      <p>
        Magé reúne natureza e história em plena Região Metropolitana do Rio. Entre a Baía de Guanabara e a
        Serra dos Órgãos, o município preserva trechos de Mata Atlântica, rios e cachoeiras — destaque para
        Santo Aleixo, onde trilhas como as de Andorinhas e quedas d’água como a Cachoeira do Monjolo atraem
        aventureiros e famílias.
      </p>
      <p>
        À beira d’água, Mauá (Guia de Pacobaíba) marca a origem da ferrovia no Brasil, com a histórica
        Estação Guia de Pacobaíba. O cais e a praia oferecem vistas para a Guanabara e clima de interior
        litorâneo, enquanto o Parque Natural Municipal Barão de Mauá e áreas de proteção ambiental reforçam o
        potencial de ecoturismo, observação da fauna e caminhadas leves.
      </p>
      <p>
        Conectando tudo, correm rios como o Inhomirim e o Suruí, que moldaram a ocupação local e seguem como
        referência paisagística. Para quem busca experiências autênticas perto da capital, Magé combina
        patrimônio ferroviário, tradição cultural e rotas ao ar livre de diferentes níveis.
      </p>
    </div>
  </section>
  </div>

  <BottomNav active="inicio" />
</template>

<style scoped>
.hero{ padding:1rem .75rem 0; }
.hero-inner{ background: var(--grad-soft); border:1px solid var(--color-surface-3); border-radius: 1rem; padding: 1rem; box-shadow: var(--shadow-md); }
.hero-inner h1{ font-size:1.35rem; margin:0 0 .25rem; color:#2d3d2f; }
.hero-inner p{ margin:0 0 .75rem; color:#4b5a4e; }
.stats{ display:flex; gap:.75rem; flex-wrap:wrap; color:#2d3d2f; }
.stat{ display:flex; align-items:center; gap:.4rem; background: rgba(255,255,255,.6); border:1px solid var(--color-surface-3); padding:.35rem .6rem; border-radius:.6rem; box-shadow: var(--shadow-sm); }

.grid{ padding: .75rem; }
.section-title{ display:flex; align-items:center; gap:.5rem; font-size:1rem; color:#2d3d2f; margin: .25rem 0 .5rem; }
.chips{ display:flex; gap:.5rem; overflow:auto; padding-bottom:.25rem; }
.chip{ display:flex; align-items:center; gap:.35rem; background:#fff; border:1px solid var(--color-surface-3); padding:.35rem .6rem; border-radius: 999px; box-shadow: var(--shadow-sm); color:#2d3d2f; cursor:pointer; }
.chip:hover{ background: var(--color-surface-2); transform: translateY(-1px); }
.chip-count{ background: var(--color-primary-soft); color: var(--color-primary-deep); font-weight:600; padding:.1rem .45rem; border-radius: 999px; border:1px solid var(--color-primary); }

.cards{ display:grid; grid-template-columns: 1fr 1fr; gap:.75rem; }
.tourism { color: var(--color-text); line-height: 1.6; }
.tourism p { margin-bottom: 1rem; }

/* Melhorias para desktop */
@media (min-width: 768px) {
  .main-content { max-width: 1200px; margin: 0 auto; }
  .hero { padding: 2rem; }
  .hero-inner { padding: 2rem; }
  .hero-inner h1 { font-size: 2rem; }
  .hero-inner p { font-size: 1.1rem; }
  .stats { gap: 1rem; }
  .stat { padding: .5rem .8rem; }
  
  .grid { padding: 1rem 2rem; }
  .section-title { font-size: 1.2rem; margin: .5rem 0 1rem; }
  .chips { gap: .75rem; }
  .chip { padding: .5rem .8rem; }
  
  .cards { grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .tourism { columns: 2; column-gap: 2rem; font-size: 1rem; }
}

@media (min-width:480px){ .cards{ grid-template-columns: repeat(2,1fr); } }
@media (min-width:720px){ .cards{ grid-template-columns: repeat(3,1fr); } }
</style>
