<script setup>
import { computed, onMounted, ref } from 'vue'

const STORAGE_KEY = 'certifix-service-reviews'
const REVIEWS_API_URL = import.meta.env.VITE_REVIEWS_API_URL || 'https://script.google.com/macros/s/AKfycbzNxVUzvSh5aXxqk85KK0-3wr6G_lC4n_9Eiw_GRJ9EazlGCF1HzTpXLVcbPsYkAgKX/exec'
const defaultStationName = 'EDS Certifix'
const REQUEST_TIMEOUT_MS = 12000

const stationName = ref('')
const rating = ref(0)
const reviewText = ref('')
const website = ref('')
const reviews = ref([])
const ratingError = ref(false)
const reviewSaved = ref(false)
const isLoadingReviews = ref(false)
const isSavingReview = ref(false)
const reviewError = ref('')
const showAllReviews = ref(false)

const remainingCharacters = computed(() => 200 - reviewText.value.length)
const visibleReviews = computed(() => (showAllReviews.value ? reviews.value : reviews.value.slice(0, 2)))

const averageRating = computed(() => {
  if (!reviews.value.length) return '0.0'

  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

function normalizeReview(review) {
  return {
    id: review.id || Date.now(),
    station: review.station || defaultStationName,
    rating: Number(review.rating) || 0,
    text: review.text || '',
    date: review.date || '',
  }
}

async function loadReviews() {
  reviewError.value = ''

  if (REVIEWS_API_URL) {
    isLoadingReviews.value = true

    try {
      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
      const response = await fetch(REVIEWS_API_URL, {
        signal: controller.signal,
      })

      window.clearTimeout(timeoutId)

      if (!response.ok) throw new Error('No fue posible cargar las reseñas.')

      const data = await response.json()
      reviews.value = Array.isArray(data.reviews) ? data.reviews.map(normalizeReview) : []
      return
    } catch {
      reviewError.value = 'No pudimos cargar las reseñas en línea. Mostramos las guardadas en este navegador.'
    } finally {
      isLoadingReviews.value = false
    }
  }

  const savedReviews = localStorage.getItem(STORAGE_KEY)

  if (!savedReviews) return

  try {
    reviews.value = JSON.parse(savedReviews).map(normalizeReview)
  } catch {
    reviews.value = []
  }
}

function saveReviews() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews.value))
}

function selectRating(value) {
  rating.value = value
  ratingError.value = false
  reviewSaved.value = false
}

async function submitReview() {
  reviewSaved.value = false
  reviewError.value = ''

  if (!rating.value) {
    ratingError.value = true
    return
  }

  const newReview = {
    id: Date.now(),
    station: stationName.value.trim() || defaultStationName,
    rating: rating.value,
    text: reviewText.value.trim(),
    website: website.value,
    date: new Date().toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  }

  isSavingReview.value = true

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    if (REVIEWS_API_URL) {
      const response = await fetch(REVIEWS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(newReview),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error('No fue posible guardar la reseña.')

      await loadReviews()
    } else {
      reviews.value = [newReview, ...reviews.value]
      saveReviews()
    }
  } catch {
    reviewError.value = 'No pudimos guardar la reseña en línea. Intente nuevamente.'
    return
  } finally {
    window.clearTimeout(timeoutId)
    isSavingReview.value = false
  }

  stationName.value = ''
  rating.value = 0
  reviewText.value = ''
  website.value = ''
  ratingError.value = false
  reviewSaved.value = true
}

onMounted(loadReviews)
</script>

<template>
  <section id="calificaciones" class="py-24 bg-white relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-stretch">
        <div class="bg-[#0f2a2d] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl flex flex-col justify-between overflow-hidden relative">
          <div class="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-teal-400/20"></div>
          <div class="absolute -left-20 -bottom-20 w-56 h-56 rounded-full border border-teal-400/10"></div>

          <div class="relative z-10">
            <p class="text-teal-400 font-bold uppercase tracking-widest text-sm mb-4">
              Experiencia del cliente
            </p>
            <h2 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Califique el servicio recibido
            </h2>
            <p class="text-teal-50/80 text-lg leading-relaxed text-justify">
              Cada calificación nos permite identificar oportunidades de mejora en nuestros procesos
              técnicos, fortalecer la calidad del servicio y asegurar una atención más clara, oportuna
              y confiable para cada estación de servicio atendida.
            </p>
          </div>

          <div class="relative z-10 mt-12 grid grid-cols-2 gap-4">
            <div class="bg-white/10 border border-white/10 rounded-2xl p-5">
              <p class="text-4xl font-black text-teal-400">{{ averageRating }}</p>
              <p class="text-xs uppercase tracking-widest text-teal-50/70 mt-1">
                Promedio
              </p>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-5">
              <p class="text-4xl font-black text-teal-400">{{ reviews.length }}</p>
              <p class="text-xs uppercase tracking-widest text-teal-50/70 mt-1">
                Reseñas
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <form @submit.prevent="submitReview" class="space-y-6">
            <div class="hidden" aria-hidden="true">
              <label for="review-website">Sitio web</label>
              <input
                id="review-website"
                v-model="website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-[#0f2a2d] mb-2">
                Nombre de estación de servicio
              </label>
              <input
                v-model="stationName"
                type="text"
                placeholder="Ej: EDS Principal"
                maxlength="80"
                class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
              />
              <p class="text-xs text-gray-400 mt-2">
                Campo opcional. Si queda vacío se registrará como {{ defaultStationName }}.
              </p>
            </div>

            <div>
              <p class="block text-sm font-bold text-[#0f2a2d] mb-3">
                Calificación del servicio
              </p>
              <div class="flex items-center gap-2" role="radiogroup" aria-label="Calificación del servicio">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  class="review-star text-4xl md:text-5xl leading-none transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
                  :class="star <= rating ? 'text-[#f5b301] drop-shadow-sm' : 'text-gray-300'"
                  :aria-label="`${star} de 5 estrellas`"
                  :aria-checked="rating === star"
                  role="radio"
                  @click="selectRating(star)"
                >
                  ★
                </button>
              </div>
              <p v-if="ratingError" class="text-red-500 text-xs font-bold mt-2">
                * Seleccione una calificación para guardar la reseña.
              </p>
            </div>

            <div>
              <div class="flex items-center justify-between gap-4 mb-2">
                <label class="block text-sm font-bold text-[#0f2a2d]">
                  Reseña o experiencia
                </label>
                <span class="text-xs font-bold" :class="remainingCharacters < 20 ? 'text-red-500' : 'text-gray-400'">
                  {{ remainingCharacters }} caracteres
                </span>
              </div>
              <textarea
                v-model="reviewText"
                maxlength="200"
                rows="4"
                placeholder="Cuéntenos cómo fue su experiencia con Certifix..."
                class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none resize-none shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSavingReview"
              class="w-full bg-teal-700 hover:bg-[#0f2a2d] text-white font-bold py-5 rounded-xl transition-all shadow-xl"
            >
              {{ isSavingReview ? 'Guardando...' : 'Guardar reseña' }}
            </button>

            <p v-if="reviewSaved" class="text-sm font-bold text-teal-700 text-center">
              Gracias. Su calificación fue registrada correctamente.
            </p>

            <p v-if="reviewError" class="text-sm font-bold text-red-500 text-center">
              {{ reviewError }}
            </p>
          </form>

        </div>
      </div>

      <div class="mt-10 bg-gray-50 rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p class="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">
              Opiniones registradas
            </p>
            <h3 class="text-2xl font-extrabold text-[#0f2a2d]">
              Comentarios guardados
            </h3>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400">
              {{ reviews.length }} {{ reviews.length === 1 ? 'registro guardado' : 'registros guardados' }}
            </span>
            <button
              v-if="reviews.length > 2"
              type="button"
              class="px-4 py-2 rounded-xl border border-teal-700 text-teal-700 font-bold text-sm hover:bg-teal-700 hover:text-white transition-all"
              @click="showAllReviews = !showAllReviews"
            >
              {{ showAllReviews ? 'Ver menos' : 'Ver todos' }}
            </button>
          </div>
        </div>

        <div
          v-if="isLoadingReviews"
          class="bg-white rounded-2xl border border-gray-100 p-6 text-center"
        >
          <p class="text-sm font-semibold text-gray-500">
            Cargando comentarios...
          </p>
        </div>

        <div
          v-else-if="reviews.length"
          class="reviews-list grid md:grid-cols-2 gap-4"
          :class="showAllReviews ? 'max-h-96 overflow-y-auto pr-2 overscroll-contain' : ''"
        >
          <article
            v-for="review in visibleReviews"
            :key="review.id"
            class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h4 class="font-extrabold text-[#0f2a2d]">
                  {{ review.station }}
                </h4>
                <p class="text-xs uppercase tracking-widest text-gray-400">
                  {{ review.date }}
                </p>
              </div>
              <div class="text-[#f5b301] text-lg tracking-wide" aria-label="Calificación guardada">
                <span v-for="star in 5" :key="star">
                  {{ star <= review.rating ? '★' : '☆' }}
                </span>
              </div>
            </div>
            <p v-if="review.text" class="text-sm text-gray-600 leading-relaxed">
              {{ review.text }}
            </p>
          </article>
        </div>

        <div
          v-else
          class="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center"
        >
          <p class="text-sm font-semibold text-gray-500">
            Aún no hay comentarios guardados.
          </p>
          <p class="text-xs text-gray-400 mt-1">
            La primera calificación aparecerá aquí dentro de esta sección.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-star {
  text-shadow: 0 10px 24px rgb(15 42 45 / 0.12);
}

.reviews-list {
  scrollbar-width: thin;
  scrollbar-color: #0d9488 #f3f4f6;
}

.reviews-list::-webkit-scrollbar {
  width: 8px;
}

.reviews-list::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 999px;
}

.reviews-list::-webkit-scrollbar-thumb {
  background: #0d9488;
  border-radius: 999px;
}
</style>
