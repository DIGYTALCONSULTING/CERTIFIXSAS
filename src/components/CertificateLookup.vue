<script setup>
import { computed, ref } from 'vue'
import { Download, FileCheck2, FileText, LoaderCircle, Search, ShieldCheck } from 'lucide-vue-next'

const API_URL = 'https://script.google.com/macros/s/AKfycbxLFJmQtKCRnazRRy9NdLb0Zplxg_VbfZKJnCcS6dbOpPRqS2IKsJRHLrafz-8byA3y/exec'

const searchTerm = ref('')
const isLoading = ref(false)
const certificate = ref(null)
const errorMessage = ref('')

const normalizedSearch = computed(() => searchTerm.value.trim())
const hasCertificatePdf = computed(() => Boolean(certificate.value?.certificado_url))
const hasReportPdf = computed(() => Boolean(certificate.value?.informe_url))
const documentLinks = computed(() => {
  if (!certificate.value) return []

  return [
    {
      label: 'Certificado',
      description: 'Documento oficial de inspección',
      url: certificate.value.certificado_url,
      icon: Download,
      className: 'bg-[#b89344] hover:bg-[#9d7b31]',
    },
    {
      label: 'Informe técnico',
      description: 'Soporte técnico asociado',
      url: certificate.value.informe_url,
      icon: FileText,
      className: 'bg-teal-700 hover:bg-[#0f2a2d]',
    },
  ].filter((document) => Boolean(document.url))
    .map((document) => ({
      ...document,
      url: getDriveDownloadUrl(document.url),
    }))
})

function getDriveDownloadUrl(url) {
  const fileId = String(url).match(/\/d\/([^/]+)/)?.[1]

  if (!fileId) return url

  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

const lookupCertificate = async () => {
  certificate.value = null
  errorMessage.value = ''

  if (!normalizedSearch.value) {
    errorMessage.value = 'Ingresa el número del certificado para realizar la consulta.'
    return
  }

  isLoading.value = true

  try {
    const searchParam = encodeURIComponent(normalizedSearch.value)
    const response = await fetch(`${API_URL}?certificado=${searchParam}`)

    if (!response.ok) {
      throw new Error('No fue posible consultar el certificado.')
    }

    const data = await response.json()

    if (!data.ok) {
      errorMessage.value = data.message || 'No encontramos un certificado con ese número.'
      return
    }

    certificate.value = data.certificate
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
              Ingresa el número del certificado emitido por CERTIFIX S.A.S para validar su estado
              y descargar el certificado junto con el informe técnico asociado.
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
                Número de certificado
              </label>
              <div class="relative">
                <input
                  id="certificate-number"
                  v-model="searchTerm"
                  type="text"
                  inputmode="text"
                  autocomplete="off"
                  placeholder="Ej: CERT-2026-001"
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
            v-if="certificate"
            class="mt-6 space-y-4"
            aria-live="polite"
          >
            <p class="text-sm font-bold text-teal-700">
              Certificado encontrado
            </p>

            <article
              class="rounded-2xl border border-teal-100 bg-white p-5 sm:p-6 shadow-sm"
            >
              <div class="flex flex-col items-center text-center">
                <div class="min-w-0">
                  <p class="text-xs font-bold uppercase tracking-widest text-teal-600">
                    {{ certificate.estado }}
                  </p>
                  <h3 class="text-lg sm:text-xl font-extrabold text-[#0f2a2d] wrap-break-word">
                    {{ certificate.numero_certificado }}
                  </h3>
                  <p class="text-sm font-semibold text-gray-500 mt-1">
                    {{ certificate.estacion }}
                  </p>
                </div>
              </div>

              <div class="mt-5 grid sm:grid-cols-2 gap-3">
                <a
                  v-for="document in documentLinks"
                  :key="document.label"
                  :href="document.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full flex items-center gap-4 text-white p-4 rounded-2xl transition-all shadow-lg hover:-translate-y-1"
                  :class="document.className"
                >
                  <span class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <component :is="document.icon" class="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span class="min-w-0 text-left">
                    <span class="block font-extrabold">{{ document.label }}</span>
                    <span class="block text-xs font-semibold text-white/80">{{ document.description }}</span>
                  </span>
                </a>

                <div
                  v-if="!hasCertificatePdf"
                  class="w-full flex items-center gap-4 bg-gray-100 text-gray-400 p-4 rounded-2xl border border-gray-200"
                >
                  <span class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <Download class="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span class="min-w-0 text-left">
                    <span class="block font-extrabold">Certificado</span>
                    <span class="block text-xs font-semibold">No disponible</span>
                  </span>
                </div>
                <div
                  v-if="!hasReportPdf"
                  class="w-full flex items-center gap-4 bg-gray-100 text-gray-400 p-4 rounded-2xl border border-gray-200"
                >
                  <span class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <FileText class="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span class="min-w-0 text-left">
                    <span class="block font-extrabold">Informe técnico</span>
                    <span class="block text-xs font-semibold">No disponible</span>
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
