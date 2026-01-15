<script setup>
/**
 * Componente Footer - CERTIFIX S.A.S
 * Migrado a Vue 3 con optimización SEO y tipografía corporativa.
 */
import logoDigytal from '@/assets/Images/logo_digytal_header.jpeg';

const currentYear = new Date().getFullYear();

const navLinks = [
  { name: 'Inicio', href: '#' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Contacto', href: '#contacto' }
];

const legalLinks = [
  { name: 'Tratamiento de Datos', href: '#' },
  { name: 'Política de Calidad', href: '#' },
  { name: 'Términos y Condiciones', href: '#' }
];
</script>

<template>
  <footer class="bg-[#0f2a2d] text-white pt-20 pb-10 relative z-40 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div class="space-y-6">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <span class="text-2xl font-black tracking-tighter">
              CERTIFIX <span class="text-teal-400">S.A.S</span>
            </span>
          </div>
          <p class="text-teal-100/60 leading-relaxed text-sm">
            Soluciones integrales acreditadas por ONAC para la industria de hidrocarburos y almacenamiento de combustibles en Colombia.
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-bold mb-6 text-white italic">Navegación</h4>
          <ul class="space-y-4 text-teal-100/60 text-sm">
            <li v-for="link in navLinks" :key="link.name">
              <a :href="link.href" class="hover:text-teal-400 transition-colors duration-300">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-6 text-white italic">Legal</h4>
          <ul class="space-y-4 text-teal-100/60 text-sm">
            <li v-for="link in legalLinks" :key="link.name">
              <a :href="link.href" class="hover:text-teal-400 transition-colors duration-300">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-6 text-white italic">Newsletter</h4>
          <p class="text-teal-100/60 mb-6 text-sm">Recibe actualizaciones sobre normativas NTC y seguridad industrial.</p>
          <div class="flex bg-white/5 rounded-xl p-1 border border-white/10 focus-within:border-teal-400/50 transition-all">
            <input 
              type="email" 
              placeholder="Su correo" 
              class="bg-transparent border-none outline-none px-4 flex-grow text-sm text-white placeholder:text-teal-100/30" 
            />
            <button class="bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95">
              OK
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-teal-100/40">
        <p>© {{ currentYear }} CERTIFIX S.A.S. Todos los derechos reservados.</p>
        <p class="flex items-center gap-2">
          <span class="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
          Medellín, Antioquia - Colombia
        </p>
      </div>
    </div>
    <div class="w-full text-center py-4 text-xs text-gray-400 flex items-center justify-center gap-2">
      <img
        :src="logoDigytal"
        alt="Digytal Consulting"
        class="h-4 opacity-70"
      />
      <span>
        © Digytal Consulting · Diseño y Desarrollo de páginas Web · Contacto:
        <a href="tel:3144706996" class="hover:text-gray-600 transition-colors">
          314 470 6996
        </a>
      </span>
    </div>
  </footer>
</template>