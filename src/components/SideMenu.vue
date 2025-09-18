<script setup>
import { X, List } from 'lucide-vue-next'
const props = defineProps({ open: Boolean, items: { type: Array, default: () => [] } })
const emit = defineEmits(['close', 'select', 'logout'])
</script>

<template>
  <Transition name="overlay-fade">
    <div v-if="open" class="overlay" @click.self="$emit('close')">
      <Transition name="menu-slide">
        <aside v-if="open" class="menu">
          <div class="menu-header">
            <div class="title">
              <List :size="20" />
              <span>Menu</span>
            </div>
            <button class="icon-btn" @click="$emit('close')" aria-label="fechar">
              <X :size="18" />
            </button>
          </div>
          <ul class="menu-list">
            <li v-for="i in items" :key="i.key || 'all'">
              <button class="menu-item" @click="$emit('select', i.key ?? '')">{{ i.label || i.key || 'Todos' }}</button>
            </li>
          </ul>
          <div class="menu-footer">
            <button class="logout" @click="$emit('logout')">Sair</button>
          </div>
        </aside>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.overlay{ position:fixed; inset:0; background: rgba(0,0,0,.35); z-index:50; display:flex; }
.menu{ width:72%; max-width:300px; background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0)) , var(--color-primary-deep); color: #fff; padding: 1rem .9rem; box-shadow: 0 10px 30px rgba(0,0,0,.15); display:flex; flex-direction:column; min-height:100%; }
.menu-header{ display:flex; align-items:center; justify-content:space-between; gap:.5rem; margin-bottom:.25rem; padding-bottom:.5rem; border-bottom: 1px solid rgba(255,255,255,.12); }
.title{ display:flex; align-items:center; gap:.5rem; font-weight:600; letter-spacing:.2px; }
.icon-btn{ background:transparent; border:none; color:#fff; }
.menu-list{ list-style:none; padding: .25rem 0 0; margin:0; display:flex; flex-direction:column; gap:.25rem; }
.menu-item{ width:100%; text-align:left; padding:.8rem .6rem; border:none; background: transparent; color:#fff; border-radius:.6rem; }
.menu-item:hover{ background: rgba(255,255,255,.08); }
.menu-footer{ margin-top:auto; padding-top:.75rem; border-top: 1px solid rgba(255,255,255,.12); }
.logout{ width:100%; padding:.75rem .6rem; border-radius:.6rem; background: #ffffff10; border: 1px solid rgba(255,255,255,.16); color:#fff; font-weight:600; }
.logout:hover{ background: #ffffff20; }

/* Transitions */
.overlay-fade-enter-active, .overlay-fade-leave-active{ transition: opacity .2s ease; }
.overlay-fade-enter-from, .overlay-fade-leave-to{ opacity: 0; }

.menu-slide-enter-active, .menu-slide-leave-active{ transition: transform .25s ease, opacity .25s ease; }
.menu-slide-enter-from, .menu-slide-leave-to{ transform: translateX(-12%); opacity: 0; }
</style>
