<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { Mountain, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const { login } = useAuth()

function goBack() {
  router.back()
}

let email = ''
let password = ''

async function onSubmit(e){
  e.preventDefault()
  if(!email || !password) return alert('Preencha e-mail e senha.')
  await login({ email })
  router.push('/')
}

// Removed Google login
</script>

<template>
  <main class="login-screen">
    <button class="back-btn" @click="goBack" aria-label="Voltar">
      <ArrowLeft :size="20" />
    </button>
    <div class="hero-img" role="img" aria-label="Natureza de Magé" />
    <h1>Seja bem-vindo!</h1>
    <p class="subtitle">O Circuito Verde traz pra você a melhor forma de conhecer Magé!</p>

    <form class="form" @submit="onSubmit">
      <input type="email" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Senha" v-model="password" />
      <button type="submit" class="btn primary">Entrar</button>
    </form>

    <div class="links">
      <a href="#">Esqueci minha senha</a>
      <span> | </span>
      <a href="#">Novo cadastro</a>
    </div>

    <footer class="brand">
      <Mountain :size="18"/> Magé Verde
    </footer>
  </main>
</template>

<style scoped>
.login-screen{ max-width:420px; margin:0 auto; padding: 1rem; display:flex; flex-direction:column; align-items:center; gap:1rem; background: var(--color-card); border-radius: var(--radius-lg); margin-top:1rem; box-shadow: var(--shadow-md); position: relative; }
.back-btn{ position: absolute; top: 1rem; left: 1rem; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: var(--color-text); cursor: pointer; box-shadow: var(--shadow-sm); transition: all 0.2s ease; }
.back-btn:hover{ background: rgba(255,255,255,1); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.hero-img{ width:100%; aspect-ratio: 1/1; background:
  linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.05)),
  url('https://www.rj.gov.br/seiop/sites/default/files/imagem_noticias/CAPA%20SITE%20BASE%20%283%29.png') left -5em center/cover; border-radius: calc(var(--radius-md) + .1rem); }
h1{ font-size:1.5rem; margin-top:.25rem; color: #2d3d2f; text-align:center; }
.subtitle{ text-align:center; color: #2d3d2fb0; margin-bottom:.15rem; }
.btn{ width:100%; display:flex; align-items:center; justify-content:center; gap:.5rem; border:none; border-radius: .7rem; padding:.9rem; box-shadow: var(--shadow-sm); cursor: pointer; }
.form{ width:100%; display:flex; flex-direction:column; gap:.6rem; }
.form input{ width:100%; padding:.75rem .9rem; border-radius:.6rem; border:1px solid var(--color-surface-3); background:#fff; }
.btn.primary{ background: var(--grad-primary); color:#fff; font-weight:700; letter-spacing:.2px; margin-top:.15rem; }
.btn.primary:hover{ filter: brightness(1.03); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.links{ font-size:.85rem; color: var(--color-muted); }
.links a{ color: inherit; text-decoration:none; }
.links a:hover{ color: var(--color-primary-deep); }
.brand{ display:flex; align-items:center; gap:.35rem; color: var(--color-muted); margin-top:.1rem; }

/* Melhorias para desktop */
@media (min-width:480px){ .login-screen{ margin-top:2rem; } }
@media (min-width: 768px) { 
  .login-screen { 
    max-width: 500px; 
    margin-top: 3rem; 
    padding: 2rem; 
    gap: 1.5rem;
  }
  .back-btn { 
    top: 1.5rem; 
    left: 1.5rem; 
    width: 48px; 
    height: 48px; 
  }
  .hero-img { 
    aspect-ratio: 16/9; 
    max-height: 200px; 
  }
  h1 { 
    font-size: 1.75rem; 
    margin-top: 0.5rem; 
  }
  .subtitle { 
    font-size: 1.1rem; 
    margin-bottom: 0.5rem; 
  }
  .form { 
    gap: 1rem; 
  }
  .form input { 
    padding: 1rem 1.2rem; 
    font-size: 1rem; 
  }
  .btn { 
    padding: 1rem; 
    font-size: 1rem; 
  }
  .links { 
    font-size: 1rem; 
  }
}

/* Centralizando no desktop grande */
@media (min-width: 1200px) {
  .login-screen {
    margin-top: 5rem;
  }
}
</style>
