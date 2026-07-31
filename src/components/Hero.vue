<script setup>
import imagenHero from '@/assets/Images/hero_tanque_rbg.webp'
const whatsappNumber = '573235909225' // 🔴 número real, sin +
const whatsappMessage = encodeURIComponent(
  'Hola, quiero recibir información para poder agendar una cotización'
)

const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`

;
</script>

<template>
  <section class="relative min-h-screen min-h-[700px] flex items-center overflow-hidden bg-gray-900">
    <div class="absolute inset-0">
      <img 
        :src="imagenHero" 
        alt="Pruebas de hermeticidad en tanques de combustible" 
        width="1536"
        height="1024"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-900/60 to-transparent"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-teal-500/20 backdrop-blur-md border border-teal-500/30 px-4 py-2 rounded-full mb-8 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-400">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span id="acreditacion" class="text-teal-100 text-sm font-semibold tracking-wide uppercase">Acreditado por la ONAC</span>
        </div>
        
        <h1 class="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-5">
          Pruebas de Hermeticidad en <span class="text-teal-400">Tanques y Tuberías</span>
        </h1>
        
        <p class="text-xl md:text-xl text-white mb-10 leading-relaxed font-light md:text-justify">
          CERTIFIX S.A.S realiza pruebas de hermeticidad en tanques y tuberías para estaciones de servicio,
          plantas de abastecimiento e instalaciones fijas de almacenamiento de combustibles líquidos en Colombia.
          Emitimos informes y certificados técnicos bajo criterios de inspección ISO/IEC 17020:2012,
          Resolución 40198 de 2021, NTC aplicables y NFPA 30.
        </p>  
        
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <a 
            :href="whatsappLink"
            class="w-full sm:w-auto text-center bg-teal-600 hover:bg-teal-500 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-xl shadow-teal-900/40 transform hover:-translate-y-1">
            EMPEZAR AHORA
          </a>
          <a href="#servicios" class="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full text-lg font-bold transition-all">
            Ver Servicios
          </a>
        </div>

        <div class="mt-16 flex items-center gap-8 border-t border-white/10 pt-8">
          <div class="flex -space-x-4">
            <img v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/150?u=${i}`" class="w-12 h-12 rounded-full border-2 border-teal-900" alt="Avatar cliente" width="48" height="48" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
          </div>
          <div>
            <p class="text-white font-bold text-lg">+350 Proyectos</p>
            <p class="text-teal-300/80 text-sm uppercase tracking-wide pb-12">Pruebas de hermeticidad en Colombia</p>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
      
    </div>
  </section>
</template>
