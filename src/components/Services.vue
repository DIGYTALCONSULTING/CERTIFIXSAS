<script setup>
import { onMounted, onBeforeUnmount } from "vue";

/* ================================
   Data
================================ */
const services = [
  {
    title: "Pruebas de Hermeticidad",
    desc: "Detección de fugas en tanques y tuberías mediante tecnología avanzada de presión y vacío.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`
  },
  {
    title: "Manejo de Combustibles",
    desc: "Cumplimiento con la resolución 148 de 2021, NTC norma técnica Colombiana 17020 y NFPA 30.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`
  },

  {
    title: "Certificación ONAC",
    desc: "Expedición de informes y certificados bajo acreditación por ONAC.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>`
  }
];

/* ================================
   Scroll velocity + observer
================================ */
let observer;
let lastScrollY = window.scrollY;
let velocity = 0;

const updateVelocity = () => {
  const currentY = window.scrollY;
  velocity = Math.min(Math.abs(currentY - lastScrollY), 40);
  lastScrollY = currentY;
};

onMounted(() => {
  window.addEventListener("scroll", updateVelocity, { passive: true });

  const cards = document.querySelectorAll(".service-card");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--scroll-velocity", velocity);
          entry.target.classList.add("animate-in");
        } else {
          entry.target.classList.remove("animate-in");
        }
      });
    },
    { threshold: 0.35 }
  );

  cards.forEach((card) => observer.observe(card));
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateVelocity);
  if (observer) observer.disconnect();
});
</script>

<template>
  <section id="servicios" class="py-24 bg-white relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">
          Servicios Especializados
        </h2>
        <h3 class="text-4xl md:text-5xl font-extrabold text-[#0f2a2d] mb-6">
          Expertos en pruebas de Hermeticidad en estaciones de Servicio 
        </h3>
        <p class="text-lg text-gray-600">
          Nuestras soluciones están diseñadas para maximizar la vida útil de sus activos industriales y garantizar cero fugas bajo normativas nacionales.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, idx) in services"
          :key="idx"
          class="service-card group p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100
                 cursor-pointer shadow-sm
                 transition-all duration-500 ease-out
                 hover:bg-[#0f2a2d] hover:shadow-2xl hover:-translate-y-2"
          :style="`--delay:${idx * 120}ms`"
        >
          <div
            class="icon-wrapper w-16 h-16 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mb-8"
            v-html="service.icon"
          />

          <h4 class="text-2xl font-bold text-[#0f2a2d] mb-4 transition-colors duration-300 group-hover:text-white">
            {{ service.title }}
          </h4>

          <p class="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-teal-100/80">
            {{ service.desc }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ================================
   Cards – Scroll driven animation
================================ */
.service-card {
  opacity: 0;
  transform:
    translateY(calc(32px + (var(--scroll-velocity, 0) * 0.4px)))
    scale(0.96);
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay);
  will-change: transform, opacity;
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ================================
   Icon – Parallax + pulse
================================ */
.icon-wrapper {
  transition:
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.5s ease;
}

.service-card.animate-in .icon-wrapper {
  animation: iconPulse 3.5s ease-in-out infinite;
}

.service-card:hover .icon-wrapper {
  transform: translateY(-6px) scale(1.15) rotate(2deg);
  background-color: #14b8a6;
  color: white;
}

/* ================================
   Keyframes
================================ */
@keyframes iconPulse {
  0%   { transform: translateY(0) scale(1) rotate(0deg); }
  50%  { transform: translateY(-4px) scale(1.05) rotate(1deg); }
  100% { transform: translateY(0) scale(1) rotate(0deg); }
}

/* GPU optimization */
.group {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
