<script setup>
import { computed, ref } from 'vue'
import { Download, FileCheck2, LoaderCircle, Search, ShieldCheck } from 'lucide-vue-next'

const API_URL = 'https://script.google.com/macros/s/AKfycbwLRmklCmmJuh949gt4u4yWQiLGKxYM8zEREIKlHK6z3a6DLXhLYYfmrU7TP_NvuOoQ/exec'

const searchTerm = ref('')
const isLoading = ref(false)
const results = ref([])
const errorMessage = ref('')

const normalizedSearch = computed(() => searchTerm.value.trim())

const lookupCertificate = async () => {
  results.value = []
  errorMessage.value = ''

  if (!normalizedSearch.value) {
    errorMessage.value = 'Ingresa el nombre de la empresa o del certificado para realizar la consulta.'
    return
  }

  isLoading.value = true

  try {
    const searchParam = encodeURIComponent(normalizedSearch.value)
    const response = await fetch(`${API_URL}?q=${searchParam}&cert=${searchParam}`)

    if (!response.ok) {
      throw new Error('No fue posible consultar el certificado.')
    }

    const data = await response.json()

    if (!data.ok) {
      errorMessage.value = data.message || 'No encontramos certificados con ese nombre.'
      return
    }

    results.value = data.results || []
  } catch (error) {
    errorMessage.value = 'No pudimos consultar en este momento. Intenta nuevamente.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section
    id="certificados"
    class="py-24 md:py-32 bg-white relative z-20 scroll-mt-28"
    aria-labelledby="certificate-lookup-title"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <div class="space-y-6">
          <div class="inline-flex items-center gap-3 rounded-full bg-teal-50 px-4 py-2 text-teal-700">
            <ShieldCheck class="w-5 h-5" aria-hidden="true" />
            <span class="text-xs font-bold uppercase tracking-widest">Verificación documental</span>
          </div>

          <div class="space-y-5">
            <h2
              id="certificate-lookup-title"
              class="text-4xl md:text-5xl font-extrabold text-[#0f2a2d] leading-tight"
            >
              Consulta tu certificado
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed text-justify">
              Ingresa el nombre de la empresa o una parte del nombre del certificado emitido por
              CERTIFIX S.A.S para validar su disponibilidad y descargar el documento en PDF.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
              <p class="text-2xl font-black text-teal-700">PDF</p>
              <p class="text-sm font-semibold text-gray-600">Descarga disponible al validar</p>
            </div>
            <div class="rounded-2xl border border-yellow-100 bg-[#b89344]/10 p-5">
              <p class="text-2xl font-black text-[#b89344]">ONAC</p>
              <p class="text-sm font-semibold text-gray-600">Respaldo técnico acreditado</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 rounded-4xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-xl border border-gray-100">
          <form @submit.prevent="lookupCertificate" class="space-y-5">
            <div>
              <label for="certificate-number" class="block text-sm font-bold text-[#0f2a2d] mb-2">
                Nombre de empresa o certificado
              </label>
              <div class="relative">
                <input
                  id="certificate-number"
                  v-model="searchTerm"
                  type="text"
                  inputmode="text"
                  autocomplete="off"
                  placeholder="Ej: EDS DEL CAFE"
                  class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 pr-12 text-base font-semibold text-[#0f2a2d] uppercase focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
                  :disabled="isLoading"
                />
                <FileCheck2
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600"
                  aria-hidden="true"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full inline-flex items-center justify-center gap-3 bg-teal-700 hover:bg-[#0f2a2d] disabled:bg-teal-900/60 text-white font-bold py-4 rounded-xl transition-all shadow-xl"
            >
              <LoaderCircle v-if="isLoading" class="w-5 h-5 animate-spin" aria-hidden="true" />
              <Search v-else class="w-5 h-5" aria-hidden="true" />
              <span>{{ isLoading ? 'Consultando...' : 'Consultar certificado' }}</span>
            </button>
          </form>

          <div
            v-if="errorMessage"
            class="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4"
            role="alert"
          >
            <p class="text-sm font-bold text-red-700">{{ errorMessage }}</p>
          </div>

          <div
            v-if="results.length"
            class="mt-6 space-y-4"
            aria-live="polite"
          >
            <p class="text-sm font-bold text-teal-700">
              {{ results.length === 1 ? 'Certificado encontrado' : `${results.length} certificados encontrados` }}
            </p>

            <article
              v-for="certificate in results"
              :key="certificate.file_id"
              class="rounded-2xl border border-teal-100 bg-white p-5 sm:p-6 shadow-sm"
            >
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <FileCheck2 class="w-6 h-6" aria-hidden="true" />
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold uppercase tracking-widest text-teal-600">
                    PDF disponible
                  </p>
                  <h3 class="text-lg sm:text-xl font-extrabold text-[#0f2a2d] wrap-break-word">
                    {{ certificate.file_name }}
                  </h3>
                </div>
              </div>

              <a
                :href="certificate.download_url"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-5 w-full inline-flex items-center justify-center gap-3 bg-[#b89344] hover:bg-[#9d7b31] text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                <Download class="w-5 h-5" aria-hidden="true" />
                <span>Descargar PDF</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
