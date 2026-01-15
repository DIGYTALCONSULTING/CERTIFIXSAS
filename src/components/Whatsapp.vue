<script setup>
/**
 * Botón Flotante de WhatsApp - CERTIFIX S.A.S
 * Optimizado para conversión y visibilidad.
 */
</script>

<template>
  <a 
    href="https://wa.me/573235909225" 
    target="_blank" 
    rel="noopener noreferrer"
    class="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
    aria-label="Contactar por WhatsApp a Certifix SAS"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>

    <span class="absolute right-full mr-4 bg-white text-[#0f2a2d] px-4 py-2 rounded-xl text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
      ¿Necesitas ayuda? ¡Contáctanos!
    </span>

    <span class="absolute -top-1 -right-1 flex h-4 w-4">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
    </span>
  </a>
</template>

<style scoped>
/* Estilo para asegurar que el tooltip se vea bien sobre cualquier fondo */
span.absolute.right-full {
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
}
</style>