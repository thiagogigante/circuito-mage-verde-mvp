<script setup>
import { Home, Map, Bookmark, User, Settings, CalendarDays } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
const props = defineProps({ active: { type: String, default: 'inicio' } })
const router = useRouter()
const { isLoggedIn } = useAuth()
function go(path){ router.push(path) }
</script>

<template>
  <nav class="bottom-nav">
    <button :class="{active: props.active==='inicio'}" @click="go('/')">
      <Home :size="20" />
      <span>Início</span>
    </button>
    <button :class="{active: props.active==='trilhas'}" @click="go('/trilhas')">
      <Map :size="20" />
      <span>Destinos</span>
    </button>
    <button :class="{active: props.active==='eventos'}" @click="go('/eventos')">
      <CalendarDays :size="20" />
      <span>Eventos</span>
    </button>
    <!-- Gerenciar quando logado; Salvos quando deslogado -->
    <button :class="{active: props.active===(isLoggedIn()? 'gerenciar' : 'salvos') }" @click="go(isLoggedIn()? '/gerenciar' : '/salvos')">
      <component :is="isLoggedIn()? Settings : Bookmark" :size="20" />
      <span>{{ isLoggedIn()? 'Gerenciar' : 'Salvos' }}</span>
    </button>
    <button :class="{active: props.active==='perfil'}" @click="go('/perfil')">
      <User :size="20" />
      <span>Perfil</span>
    </button>
  </nav>
  <div style="height:64px" />
</template>

<style scoped>
.bottom-nav{ position:fixed; bottom:0; left:0; right:0; height:64px; background:#fff; border-top:1px solid var(--color-surface-3); display:grid; grid-template-columns: repeat(5,1fr); backdrop-filter: saturate(1.2) blur(6px); box-shadow: 0 -2px 10px rgba(0,0,0,.04); }
.bottom-nav button{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.25rem; background:transparent; border:none; color: var(--color-muted); font-size:.75rem; transform: translateY(0); }
.bottom-nav button:hover{ transform: translateY(-1px); }
.bottom-nav button.active{ color: var(--color-primary-deep); font-weight:600; transform: translateY(-2px); }
</style>
