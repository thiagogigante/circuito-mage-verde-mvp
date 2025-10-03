<script setup>
import { Search, Menu as MenuIcon, Settings } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useGlobalSearch } from '../composables/useGlobalSearch'
import { ref, watch } from 'vue'

const props = defineProps({ showMenu: { type: Boolean, default: false } })
const emit = defineEmits(['toggle-menu', 'search'])
const router = useRouter()
const route = useRoute()
const { isLoggedIn } = useAuth()
const { setSearchQuery, searchQuery } = useGlobalSearch()

const localSearchInput = ref('')

// Sincronizar com a query global quando necessário
watch(() => route.query.q, (newQuery) => {
  if (route.name === 'pesquisa') {
    localSearchInput.value = newQuery || ''
  }
}, { immediate: true })

function onSearch(e) {
  const query = e.target.value
  localSearchInput.value = query
  
  // Se não estamos na página de pesquisa e há uma query, navegar para pesquisa
  if (query && route.name !== 'pesquisa') {
    router.push({ name: 'pesquisa', query: { q: query } })
  } else if (route.name === 'pesquisa') {
    // Se estamos na página de pesquisa, atualizar em tempo real
    setSearchQuery(query)
    router.replace({ query: { q: query || undefined } })
  } else {
    // Para páginas locais (como /trilhas), emitir o evento como antes
    emit('search', query)
  }
}

function onSearchFocus() {
  // Se clicar na busca em qualquer página que não seja pesquisa, ir para pesquisa
  if (route.name !== 'pesquisa') {
    router.push({ name: 'pesquisa', query: localSearchInput.value ? { q: localSearchInput.value } : {} })
  }
}

function onSearchSubmit(e) {
  e.preventDefault()
  const query = localSearchInput.value?.trim()
  if (query) {
    router.push({ name: 'pesquisa', query: { q: query } })
  }
}

function goLogin(){ router.push('/login') }
function goHome(){ router.push('/') }
</script>

<template>
  <header class="topbar">
    <img src="../assets/ICONE_COM_FUNDO.png" alt="Circuito Magé Verde" class="logo" @click="goHome" />
    <button v-if="props.showMenu" class="icon-btn" aria-label="menu" @click="$emit('toggle-menu')">
      <MenuIcon :size="22" />
    </button>
    <form class="search" @submit="onSearchSubmit">
      <Search :size="18" />
      <input 
        v-model="localSearchInput"
        placeholder="Pesquisar destinos e eventos..." 
        @input="onSearch" 
        @focus="onSearchFocus"
      />
    </form>
    <button v-if="!isLoggedIn()" class="icon-btn admin-icon" aria-label="Admin" @click="goLogin">
      <Settings :size="20" />
    </button>
  </header>
  <div class="divider" />
</template>

<style scoped>
.topbar { display:flex; align-items:center; gap:.5rem; padding:.6rem .9rem; background: var(--color-surface); }
.logo { height: 32px; width: 32px; object-fit: contain; cursor: pointer; transition: transform 0.2s ease; }
.logo:hover { transform: scale(1.05); }
.icon-btn { background: transparent; border:none; color: var(--color-text); display:grid; place-items:center; padding:.3rem; border-radius:.5rem; cursor: pointer; }
.icon-btn:hover{ background: var(--color-surface-2); }
.search { flex:1; display:flex; align-items:center; gap:.5rem; background: var(--color-surface-2); border-radius: 999px; padding:.5rem .7rem; border:1px solid var(--color-surface-3); }
.search input { flex:1; border:none; outline:none; background: transparent; color: var(--color-text); font-size:.95rem; }
.divider { height:1px; background: var(--color-surface-3); box-shadow: 0 1px 0 rgba(255,255,255,.6) inset; }

/* Melhorias para desktop */
@media (min-width: 768px) {
  .topbar { padding: 1rem 2rem; gap: 1rem; }
  .logo { height: 40px; width: 40px; }
  .search { max-width: 600px; padding: .75rem 1rem; }
  .search input { font-size: 1rem; }
  .icon-btn { padding: .5rem; }
}
</style>
