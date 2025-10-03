import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Inicio from '../views/Inicio.vue'
import PlaceDetail from '../views/PlaceDetail.vue'
import Salvos from '../views/Salvos.vue'
import Perfil from '../views/Perfil.vue'
import Gerenciar from '../views/Gerenciar.vue'
import Eventos from '../views/Eventos.vue'
import EventoDetail from '../views/EventoDetail.vue'
import Pesquisa from '../views/Pesquisa.vue'

function isAuthenticated() {
  try {
    const raw = localStorage.getItem('auth')
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return !!parsed?.email
  } catch {
    return false
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'inicio', component: Inicio },
  { path: '/trilhas', name: 'trilhas', component: Home },
  { path: '/eventos', name: 'eventos', component: Eventos },
  { path: '/pesquisa', name: 'pesquisa', component: Pesquisa },
  { path: '/salvos', name: 'salvos', component: Salvos },
  { path: '/perfil', name: 'perfil', component: Perfil },
  { path: '/gerenciar', name: 'gerenciar', component: Gerenciar },
    { path: '/detalhe/:id', name: 'place-detail', component: PlaceDetail, props: true },
    { path: '/evento/:id', name: 'evento-detail', component: EventoDetail, props: true },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

// Login deixou de ser obrigatório; sem guard global

export default router
