<script setup>
import TopBar from '../components/TopBar.vue'
import SideMenu from '../components/SideMenu.vue'
import BottomNav from '../components/BottomNav.vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { getUser, isLoggedIn, logout } = useAuth()
const logged = isLoggedIn()
const user = logged ? (getUser() || { name: 'Visitante', email: '—' }) : { name: 'Visitante', email: '—' }
const initial = (user.name || 'V')[0]?.toUpperCase?.() || 'V'

function onLogout(){ logout(); router.replace('/') }
function goToLogin(){ router.push('/login') }
</script>

<template>
  <SideMenu :open="false" :items="[]" @logout="onLogout" />
  <TopBar @toggle-menu="() => {}" />

  <div class="main-content">
    <section class="profile">
      <div class="avatar">{{ initial }}</div>
      <template v-if="logged">
        <h1>{{ user.name }}</h1>
        <p class="email">{{ user.email }}</p>
        <button class="logout" @click="onLogout">Sair</button>
      </template>
      <template v-else>
        <h1>Visitante</h1>
        <p class="email">Você não está logado.</p>
        <button class="login" @click="goToLogin">Entrar como Admin</button>
      </template>
    </section>
  </div>

  <BottomNav active="perfil" />
</template>

<style scoped>
.main-content { }
.profile{ padding: 1rem; display:flex; flex-direction:column; align-items:center; gap:.5rem; }
.avatar{ width:72px; height:72px; border-radius:50%; display:grid; place-items:center; background: var(--grad-soft); border:1px solid var(--color-surface-3); box-shadow: var(--shadow-sm); color:#2d3d2f; font-weight:700; font-size:1.25rem; }
h1{ margin:.5rem 0 0; font-size:1.25rem; color:#2d3d2f; }
.email{ margin:0; color: var(--color-muted); }
.logout{ margin-top:1rem; background: var(--color-primary); color:#fff; border:none; padding:.6rem 1rem; border-radius:.6rem; box-shadow: var(--shadow-md); cursor: pointer; }
.login{ margin-top:1rem; background: #0ea5e9; color:#fff; border:none; padding:.6rem 1rem; border-radius:.6rem; box-shadow: var(--shadow-md); cursor: pointer; }
.logout:hover, .login:hover { filter: brightness(1.05); transform: translateY(-1px); }

/* Melhorias para desktop */
@media (min-width: 768px) {
  .main-content { max-width: 600px; margin: 0 auto; }
  .profile { padding: 3rem 2rem; gap: 1rem; }
  .avatar { width: 120px; height: 120px; font-size: 2rem; }
  h1 { font-size: 1.75rem; margin: 1rem 0 0; }
  .email { font-size: 1.1rem; }
  .logout, .login { padding: 1rem 2rem; font-size: 1rem; margin-top: 2rem; }
}
</style>
