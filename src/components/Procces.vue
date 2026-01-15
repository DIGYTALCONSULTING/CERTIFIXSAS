<script setup>
/**
 * ProcessSection - Vue 3
 * Conversión directa desde React
 */

const steps = [
  { title: "Evaluación", desc: "Revisión del sistema y normativa aplicable." },
  { title: "Inspección", desc: "Verificación de tanques, tuberías y accesorios." },
  { title: "Preparación", desc: "Aislamiento del sistema e instalación de equipos." },
  { title: "Prueba", desc: "Medición de presión, volumen y estabilidad." },
  { title: "Análisis", desc: "Validación técnica según normativa vigente." },
  { title: "Informe", desc: "Documento técnico certificado y trazable." },
];
</script>

<template>
  <section id="Proceso" class="py-24 bg-slate-50">
    <div class="container mx-auto px-4">
      
      <!-- Header -->
      <div class="text-center mb-20">
        <span class="text-teal-600 font-bold tracking-widest uppercase text-sm">
          Metodología de precisión
        </span>
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6">
          PROCESO DE HERMETICIDAD
        </h2>
        <div class="w-24 h-2 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <!-- Process -->
      <div class="relative">
        <!-- Connecting line (Desktop) -->
        <div
          class="absolute top-1/2 left-0 w-full h-1 bg-teal-100 -translate-y-1/2 hidden md:block z-0"
        ></div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10"
        >
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="flex flex-col items-center"
          >
            <!-- Step Number -->
            <div
              class="w-16 h-16 bg-white border-4 border-brand-primary text-brand-primary rounded-full
                     flex items-center justify-center text-2xl font-black mb-6 shadow-xl shrink-0
                     group hover:bg-brand-primary hover:text-white transition-all duration-300"
            >
              {{ i + 1 }}
            </div>

            <!-- Step Content -->
            <div
              class="bg-white p-6 rounded-2xl shadow-sm text-center border border-slate-100
                     flex-grow h-full w-full"
            >
              <h4
                class="font-bold text-slate-900 mb-2 uppercase tracking-tight"
              >
                {{ step.title }}
              </h4>
              <p class="text-sm text-slate-600">
                {{ step.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Normativas -->
      <div
        class="mt-16 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm
               flex flex-col md:flex-row items-center justify-center gap-10"
      >
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span class="font-bold text-slate-700">
            Normativas Aplicadas:
          </span>
        </div>

        <div
          class="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-500"
        >
          <span class="bg-slate-100 px-4 py-2 rounded-lg">
            Resolución 40198
          </span>
          <span class="bg-slate-100 px-4 py-2 rounded-lg">
            NTC 6032
          </span>
          <span class="bg-slate-100 px-4 py-2 rounded-lg">
            NTC 6198
          </span>
          <span class="bg-slate-100 px-4 py-2 rounded-lg">
            NFPA 30
          </span>
        </div>
      </div>

    </div>
  </section>
</template>
