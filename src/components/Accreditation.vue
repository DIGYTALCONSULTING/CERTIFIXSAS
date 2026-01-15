<script setup>
/**
 * Componente de Acreditación ONAC - CERTIFIX S.A.S
 * Migrado a Vue 3 con enfoque en SEO y consistencia visual.
 */

const accreditationPoints = [
  "Cumplimiento Resolución No. 40198 de 2021",
  "Certificado vigente 2025 - 2028",
  "Sistemas de gestión de calidad auditados",
  "Independencia e imparcialidad garantizada"
];
</script>

<template>
  <section id="acreditacion" class="py-24 bg-teal-50/50 relative z-10" aria-labelledby="accreditation-title">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-teal-100">
        
        <div class="lg:w-1/2 p-12 lg:p-20 space-y-8">
          <div class="flex items-center gap-4">
            <div class="bg-[#b89344] p-3 rounded-xl shadow-lg shadow-yellow-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                <circle cx="12" cy="8" r="6"/>
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-[#0f2a2d]">Acreditación ISO/IEC 17020:2012</h3>
          </div>

          <h2 id="accreditation-title" class="text-4xl font-extrabold text-gray-900 leading-tight">
            Validación y Confianza
          </h2>

          <p class="text-lg text-gray-600 leading-relaxed text-justify">
            Contamos con el aval de la <strong class="text-[#0f2a2d]">ONAC (Organismo Nacional de Acreditación de Colombia)</strong> bajo el código 24-OIN-037. Esta certificación nos faculta para realizar inspecciones críticas legalmente vinculantes.
          </p>

          <ul class="space-y-4">
            <li v-for="(point, i) in accreditationPoints" :key="i" class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span class="text-gray-700 font-medium">{{ point }}</span>
            </li>
          </ul>

          <div class="pt-6 flex items-center gap-6">
             <img 
               src="https://onac.org.co/wp-content/uploads/2021/08/logo-onac-horizontal.png" 
               alt="Acreditación ONAC Colombia" 
               class="h-14 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer" 
             />
             <div class="h-12 w-px bg-gray-200"></div>
             <p class="text-[10px] text-gray-400 uppercase tracking-widest leading-tight">
               Organismo Nacional de<br/>Acreditación de Colombia
             </p>
          </div>
        </div>

        <div class="lg:w-1/2 bg-[#0f2a2d] relative min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
            class="w-full h-full object-cover opacity-30" 
            alt="Tanque industrial inspeccionado" 
          />
          <div class="absolute inset-0 flex items-center justify-center p-8 md:p-12">
             <div class="bg-white/5 backdrop-blur-2xl border border-white/20 p-10 rounded-[2.5rem] text-white text-center shadow-2xl">
                <p class="text-5xl md:text-7xl font-black mb-3 tracking-tighter text-teal-400">24-OIN-037</p>
                <div class="h-1 w-20 bg-[#b89344] mx-auto mb-4 rounded-full"></div>
                <p class="text-xs md:text-sm tracking-[0.4em] uppercase font-bold opacity-80">Código de Acreditación Oficial</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>