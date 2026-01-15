<script setup>
/** * Componente Hero para Certifix SAS
 * Migrado de React a Vue 3
 */
import imagenHero from '@/assets/Images/hero_tanque.webp';
</script>

<template>
  <section class="relative min-h-screen min-h-[700px] flex items-center overflow-hidden bg-gray-900">
    <div class="absolute inset-0">
      <img 
        :src="imagenHero" 
        alt="Infraestructura de inspección de tanques" 
        class="w-full h-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-900/60 to-transparent"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-teal-500/20 backdrop-blur-md border border-teal-500/30 px-4 py-2 rounded-full mb-8 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-400">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span class="text-teal-100 text-sm font-semibold tracking-wide uppercase">Acreditado por ONAC</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Seguridad y Hermeticidad <span class="text-teal-400">Garantizada</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-teal-100/90 mb-10 leading-relaxed font-light md:text-justify">
          Hacemos pruebas de Hermeticidad en tanques y tuberías bajo normativas NTC.    
          Evite desastres ambientales y riesgos operacionales con expertos acreditados.
        </p>  
        
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <a href="#contacto" class="w-full sm:w-auto text-center bg-teal-600 hover:bg-teal-500 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-xl shadow-teal-900/40 transform hover:-translate-y-1">
            EMPEZAR AHORA
          </a>
          <a href="#servicios" class="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full text-lg font-bold transition-all">
            Ver Servicios
          </a>
        </div>

        <div class="mt-16 flex items-center gap-8 border-t border-white/10 pt-8">
          <div class="flex -space-x-4">
            <img v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/150?u=${i}`" class="w-12 h-12 rounded-full border-2 border-teal-900" alt="Avatar cliente" />
          </div>
          <div>
            <p class="text-white font-bold text-lg">+500 Proyectos</p>
            <p class="text-teal-300/80 text-sm uppercase tracking-wide pb-12">Clientes satisfechos en Colombia</p>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
      
    </div>
  </section>
</template>