<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

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

const sectionRef = ref(null)
const isVisible = ref(false)
const progress = ref(0)
const pointerX = ref(0)
const pointerY = ref(0)

let observer

const sectionStyle = computed(() => ({
  '--process-progress-percent': `${progress.value * 100}%`,
  '--pointer-x': pointerX.value,
  '--pointer-y': pointerY.value,
}))

function updateProgress() {
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight || 1
  const total = rect.height + windowHeight
  const visibleProgress = (windowHeight - rect.top) / total

  progress.value = Math.min(Math.max(visibleProgress, 0), 1)
}

function updatePointer(event) {
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  pointerX.value = ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3)
  pointerY.value = ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3)
}

function resetPointer() {
  pointerX.value = 0
  pointerY.value = 0
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting
      updateProgress()
    },
    { threshold: 0.25 }
  )

  observer.observe(sectionRef.value)
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
  updateProgress()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <section
    id="Proceso"
    ref="sectionRef"
    class="process-section py-24 bg-slate-50"
    :class="{ 'is-visible': isVisible }"
    :style="sectionStyle"
    @mousemove="updatePointer"
    @mouseleave="resetPointer"
  >
    <div class="container mx-auto px-4">
      
      <!-- Header -->
      <div class="process-header text-center mb-20">
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
            class="process-step flex flex-col items-center"
            :style="{ '--step-index': i }"
          >
            <!-- Step Number -->
            <div
              class="step-number w-16 h-16 bg-white border-4 border-brand-primary text-brand-primary rounded-full
                     flex items-center justify-center text-2xl font-black mb-6 shadow-xl shrink-0
                     group hover:bg-brand-primary hover:text-white transition-all duration-300"
            >
              {{ i + 1 }}
            </div>

            <!-- Step Content -->
            <div
              class="step-content bg-white p-6 rounded-2xl shadow-sm text-center border border-slate-100
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
        class="process-norms mt-16 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm
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

<style scoped>
.process-section {
  perspective: 1200px;
}

.process-header,
.process-step,
.process-norms {
  opacity: 0;
  filter: blur(12px);
  transform: translate3d(0, 42px, 0) scale(0.96);
  transition:
    opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 900ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, filter, transform;
}

.process-section.is-visible .process-header,
.process-section.is-visible .process-step,
.process-section.is-visible .process-norms {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0) scale(1);
}

.process-section.is-visible .process-step {
  transition-delay: calc(var(--step-index) * 90ms);
}

.process-section.is-visible .process-norms {
  transition-delay: 560ms;
}

.process-step {
  transform-style: preserve-3d;
}

.process-section.is-visible .process-step:hover {
  transform:
    translate3d(
      calc(var(--pointer-x) * 10px),
      calc(var(--pointer-y) * 6px - 8px),
      36px
    )
    rotateX(calc(var(--pointer-y) * -5deg))
    rotateY(calc(var(--pointer-x) * 5deg))
    scale(1.03);
  transition-duration: 360ms;
}

.step-number,
.step-content {
  transition:
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 360ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.process-step:hover .step-number {
  transform: translate3d(0, -8px, 34px) scale(1.08);
}

.process-step:hover .step-content {
  transform: translate3d(0, -4px, 22px);
}

@media (prefers-reduced-motion: reduce) {
  .process-header,
  .process-step,
  .process-norms,
  .step-number,
  .step-content {
    filter: none;
    transform: none;
    transition: none;
  }

}
</style>
