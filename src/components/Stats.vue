<script setup>
// Definición de las estadísticas con SVGs integrados
const stats = [
  { 
    value: '10+', 
    label: 'Años Experiencia',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`
  },
  { 
    value: '1000+', 
    label: 'Tanques Evaluados',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`
  },
  { 
    value: '100%', 
    label: 'Satisfacción',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  { 
    value: '24/7', 
    label: 'Soporte Técnico',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  }
];
</script>

<template>
  <section class="bg-[#0f2a2d] py-16 border-t border-teal-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        <div v-for="(stat, idx) in stats" :key="idx" class="flex flex-col items-center text-center space-y-4">
          <div class="text-teal-400 bg-teal-900/40 p-4 rounded-2xl border border-teal-800/30" v-html="stat.icon">
          </div>
          
          <div>
            <p class="text-4xl font-black text-white tracking-tight">
              {{ stat.value }}
            </p>
            <p class="text-teal-400/70 uppercase tracking-widest text-[10px] font-bold mt-1">
              {{ stat.label }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>