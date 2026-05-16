<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Stats
const stats = [
  { value: '700+', label: 'Tanques Evaluados', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/></svg>` },
  { value: '100%', label: 'Satisfacción', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>` },
  { value: '350+', label: 'Informes Entregados', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M16 13H8"/>
    <path d="M16 17H8"/>
    <path d="M10 9H8"/>
  </svg>` },
  { value: '250+', label: 'Certificados Expedidos', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    <path d="m9 15 2 2 4-4"/>
  </svg>` }
]

const animatedValues = ref(stats.map(() => '0'))
const sectionRef = ref(null)

let observer
let lastScrollY = window.scrollY
let lastTime = performance.now()
let scrollVelocity = 1

// Scroll velocity detector
function updateScrollVelocity() {
  const now = performance.now()
  const dy = Math.abs(window.scrollY - lastScrollY)
  const dt = now - lastTime || 1

  scrollVelocity = Math.min(Math.max(dy / dt, 0.2), 3)

  lastScrollY = window.scrollY
  lastTime = now
}

// Easing (easeOutCubic)
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3)
}

function startCount() {
  stats.forEach((stat, index) => {
    const match = stat.value.match(/^(\d+)/)

    if (!match) {
      animatedValues.value[index] = stat.value
      return
    }

    const end = Number(match[1])
    const suffix = stat.value.replace(match[1], '')
    const baseDuration = 1800
    const duration = baseDuration / scrollVelocity
    const startTime = performance.now()

    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      const value = Math.floor(eased * end)

      animatedValues.value[index] = `${Math.max(1, value)}${suffix}`

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  })
}

function resetCount() {
  animatedValues.value = stats.map(() => '0')
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollVelocity, { passive: true })

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startCount()
      } else {
        resetCount()
      }
    },
    { threshold: 0.45 }
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollVelocity)
  observer.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-[#0f2a2d] py-16 border-t border-teal-900"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-12 lg:gap-8 max-w-5xl mx-auto">

        <div
          v-for="(stat, idx) in stats"
          :key="idx"
          class="flex flex-col items-center text-center space-y-4"
        >
          <div
            class="text-teal-400 bg-teal-900/40 p-4 rounded-2xl border border-teal-800/30"
            v-html="stat.icon"
          />

          <div>
            <p
              class="text-4xl font-black text-white tracking-tight transition-transform duration-300 hover:scale-[1.5]"
            >
              {{ animatedValues[idx] }}
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
