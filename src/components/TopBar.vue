<script setup>
import { Search, Menu as MenuIcon, Settings } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
const props = defineProps({ showMenu: { type: Boolean, default: false } })
const emit = defineEmits(['toggle-menu', 'search'])
const onSearch = (e) => emit('search', e.target.value)
const router = useRouter()
const { isLoggedIn } = useAuth()
function goLogin(){ router.push('/login') }
</script>

<template>
  <header class="topbar">
    <button v-if="props.showMenu" class="icon-btn" aria-label="menu" @click="$emit('toggle-menu')">
      <MenuIcon :size="22" />
    </button>
    <div class="search">
      <Search :size="18" />
      <input placeholder="Onde gostaria de ir?" @input="onSearch" />
    </div>
    <button v-if="!isLoggedIn()" class="icon-btn admin-icon" aria-label="Admin" @click="goLogin">
      <Settings :size="20" />
    </button>
  </header>
  <div class="divider" />
</template>

<style scoped>
.topbar { display:flex; align-items:center; gap:.5rem; padding:.6rem .9rem; background: var(--color-surface); }
.icon-btn { background: transparent; border:none; color: var(--color-text); display:grid; place-items:center; padding:.3rem; border-radius:.5rem; }
.icon-btn:hover{ background: var(--color-surface-2); }
.search { flex:1; display:flex; align-items:center; gap:.5rem; background: var(--color-surface-2); border-radius: 999px; padding:.5rem .7rem; border:1px solid var(--color-surface-3); }
.search input { flex:1; border:none; outline:none; background: transparent; color: var(--color-text); font-size:.95rem; }
.admin-icon{ }
.divider { height:1px; background: var(--color-surface-3); box-shadow: 0 1px 0 rgba(255,255,255,.6) inset; }
</style>
