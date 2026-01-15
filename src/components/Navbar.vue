<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, ShieldCheck } from 'lucide-vue-next';

/** * 1. IMPORTACIÓN DE IMÁGENES (Opción A - La más recomendada)
 * Al importarlas así, Vite las optimiza y evita errores de ruta en GitHub Pages.
 */
import logoHero from '@/assets/Images/logo_hero.webp';


// --- ESTADO DEL FORMULARIO Y POLÍTICA ---
const formData = ref({
  nombre: '', empresa: '', email: '', ciudad: '', celular: '', mensaje: ''
});
const acceptedPolicy = ref(false);
const showPolicy = ref(false);
const policyError = ref(false);

const handleSubmit = () => {
  if (!acceptedPolicy.value) {
    policyError.value = true;
    return;
  }
  policyError.value = false;
  console.log('Formulario enviado:', formData.value);
  alert('Gracias por contactarnos.');
};

const acceptPolicy = () => {
  acceptedPolicy.value = true;
  policyError.value = false;
  showPolicy.value = false;
};

// --- ESTADO REACTIVO NAVEGACIÓN ---
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const navLinks = [
  { name: 'Inicio', href: '#' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proceso', href: '#Proceso' },
  { name: 'Acreditación', href: '#acreditacion' },
  { name: 'Contacto', href: '#contacto' },
];

// Lógica de Scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav 
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    ]"
    role="navigation"
    aria-label="Navegación principal"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        
        <div class="flex items-center gap-2">
          <a href="/" class="flex items-center">
            <img 
              :src="logoHero"
              alt="Certifix S.A.S Logo" 
              class="h-15 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </a>

          
          <span :class="[
            'text-2xl font-black tracking-tighter transition-colors',
            isScrolled ? 'text-teal-900' : 'text-white'
          ]">
            CERTIFIX <span class="text-teal-600">S.A.S</span>
          </span>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            :class="[
              'text-sm font-semibold uppercase tracking-wider transition-colors hover:text-teal-500',
              isScrolled ? 'text-gray-700' : 'text-white'
            ]"
          >
            {{ link.name }}
          </a>
          <a 
            href="#contacto" 
            class="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md"
          >
            COTIZAR AHORA
          </a>
        </div>

        <div class="md:hidden">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            :class="[isScrolled ? 'text-gray-900' : 'text-white', 'p-2 focus:outline-none']"
            :aria-expanded="isMenuOpen"
            aria-label="Abrir menú"
          >
            <X v-if="isMenuOpen" class="w-8 h-8" />
            <Menu v-else class="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white shadow-xl">
        <div class="flex flex-col p-6 space-y-4">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            @click="closeMenu"
            class="text-lg font-bold text-gray-800 hover:text-teal-700 border-b border-gray-100 pb-2"
          >
            {{ link.name }}
          </a>
          <a 
            href="#contacto" 
            @click="closeMenu"
            class="bg-teal-700 text-white text-center py-4 rounded-xl font-bold"
          >
            COTIZAR AHORA
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>