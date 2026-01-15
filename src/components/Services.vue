<script setup>
/**
 * Componente de Servicios - CERTIFIX S.A.S
 * Migrado a Vue 3 con optimización para SEO y rendimiento.
 */

const services = [
  {
    title: "Pruebas de Hermeticidad",
    desc: "Detección de fugas en tanques y tuberías mediante tecnología avanzada de presión y vacío.",
    // Droplets Icon
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`
  },
  {
    title: "Manejo de Combustibles",
    desc: "Cumplimiento con NTC 6032 para Biodiesel y NTC 6198 para mezclas gasolina-alcohol.",
    // Gauge Icon
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`
  },
  {
    title: "Detección de Corrosión",
    desc: "Evaluación estructural profunda para identificar debilidades químicas en materiales.",
    // Activity Icon
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
  },
  {
    title: "Prevención de Explosiones",
    desc: "Análisis de atmósferas explosivas para garantizar la seguridad total del personal y planta.",
    // AlertTriangle Icon
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`
  },
  {
    title: "Auditoría Técnica",
    desc: "Revisión completa de sistemas de abastecimiento y plantas de gran consumidor.",
    // Search Icon
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
  },
  {
    title: "Certificación ONAC",
    desc: "Generación de informes válidos ante entes reguladores bajo acreditación oficial.",
    // FileCheck Icon
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>`
  }
];
</script>

<template>
  <section id="servicios" class="py-24 bg-white relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">
          Servicios Especializados
        </h2>
        <h3 class="text-4xl md:text-5xl font-extrabold text-[#0f2a2d] mb-6">
          Expertos en Inspección y Diagnóstico
        </h3>
        <p class="text-lg text-gray-600">
          Nuestras soluciones están diseñadas para maximizar la vida útil de sus activos industriales y garantizar cero fugas bajo normativas nacionales.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(service, idx) in services" 
          :key="idx" 
          class="group p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-[#0f2a2d] transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2"
        >
          <div 
            class="w-16 h-16 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500"
            v-html="service.icon"
          >
          </div>
          
          <h4 class="text-2xl font-bold text-[#0f2a2d] group-hover:text-white mb-4 transition-colors">
            {{ service.title }}
          </h4>
          
          <p class="text-gray-600 group-hover:text-teal-100/80 leading-relaxed transition-colors">
            {{ service.desc }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Optimizamos el renderizado de las sombras para evitar saltos visuales */
.group {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>