<script setup>
/**
 * Componente de Contacto - CERTIFIX S.A.S
 * Vue 3 + TailwindCSS
 */
import { ref } from 'vue';

const formData = ref({
  nombre: '',
  empresa: '',
  email: '',
  ciudad: '',
  celular: '',
  mensaje: ''
});

const acceptedPolicy = ref(false);
const showPolicy = ref(false);
const policyError = ref(false); // Estado para la validación

const handleSubmit = () => {
  if (!acceptedPolicy.value) {
    policyError.value = true;
    return;
  }
  
  policyError.value = false;
  console.log('Formulario enviado:', formData.value);
  alert('Gracias por contactarnos. Pronto nos comunicaremos con usted.');
};

const acceptPolicy = () => {
  acceptedPolicy.value = true;
  policyError.value = false; // Limpia el error al aceptar desde el modal
  showPolicy.value = false;
};

const contactInfo = [
  { 
    label: 'Llámanos', 
    val: '323 590 9225 / 324 507 4813',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
  },
  { 
    label: 'Escríbenos', 
    val: 'certifixsas@gmail.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  },
  { 
    label: 'Visítanos', 
    val: 'Calle 28 N 65 C 65, Medellín, Antioquia',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
  }
];

const socialIcons = [
  { name: 'Instagram', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>` },
  { name: 'Facebook', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>` },
  { name: 'Linkedin', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>` }
];
</script>

<template>
  <section id="contacto" class="py-24 bg-white relative overflow-hidden z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-20">

        <div>
          <h2 class="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">Hablemos hoy</h2>
          <h3 class="text-4xl md:text-5xl font-extrabold text-[#0f2a2d] mb-8">
            ¿Listo para asegurar su infraestructura?
          </h3>
          <p class="text-lg text-gray-600 mb-12 text-justify">
            Nuestro equipo está listo para brindarle una asesoría técnica personalizada.
            No deje la seguridad de su planta al azar.
          </p>

          <div class="space-y-8">
            <div
              v-for="(item, idx) in contactInfo"
              :key="idx"
              class="flex items-center gap-6 group"
            >
              <div
                class="w-14 h-14 bg-teal-50 text-teal-700 rounded-2xl flex items-center justify-center
                       group-hover:bg-[#0f2a2d] group-hover:text-white transition-all duration-300 shadow-sm"
                v-html="item.icon"
              ></div>
              <div>
                <p class="text-sm font-bold text-teal-600 uppercase tracking-wider">
                  {{ item.label }}
                </p>
                <p class="text-lg font-bold text-[#0f2a2d]">
                  {{ item.val }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-12 flex gap-4">
            <a
              v-for="(social, i) in socialIcons"
              :key="i"
              href="#"
              class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center
                     text-gray-400 hover:text-teal-600 hover:border-teal-600 transition-all shadow-sm"
              :aria-label="social.name"
              v-html="social.icon"
            ></a>
          </div>
        </div>

        <div class="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <form @submit.prevent="handleSubmit" class="space-y-6">

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-[#0f2a2d] mb-2">Nombre Completo</label>
                <input v-model="formData.nombre" required class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-bold text-[#0f2a2d] mb-2">Empresa</label>
                <input v-model="formData.empresa" class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-[#0f2a2d] mb-2">Ciudad</label>
                <input v-model="formData.ciudad" required class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-bold text-[#0f2a2d] mb-2">Teléfono Celular</label>
                <input v-model="formData.celular" type="tel" required class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-[#0f2a2d] mb-2">Correo Electrónico</label>
              <input v-model="formData.email" type="email" required class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
            </div>

            <div>
              <label class="block text-sm font-bold text-[#0f2a2d] mb-2">Mensaje / Requerimiento</label>
              <textarea v-model="formData.mensaje" rows="4" required class="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none resize-none shadow-sm"></textarea>
            </div>

            <div class="space-y-2">
              <div class="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="check-policy"
                  v-model="acceptedPolicy" 
                  @change="policyError = false"
                  class="mt-1 accent-teal-600 h-4 w-4 cursor-pointer" 
                />
                <label for="check-policy" class="text-sm text-gray-600 cursor-pointer select-none">
                  He leído y acepto la
                  <button type="button" @click.stop="showPolicy = true" class="text-teal-700 font-bold underline">
                    política de tratamiento de datos personales
                  </button>
                </label>
              </div>
              <p v-if="policyError && !acceptedPolicy" class="text-red-500 text-xs font-bold animate-pulse">
                * Debe aceptar la política para continuar.
              </p>
            </div>

            <button
              type="submit"
              class="w-full bg-teal-700 hover:bg-[#0f2a2d] text-white font-bold py-5 rounded-xl transition-all shadow-xl"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showPolicy" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div class="bg-white max-w-xl w-full rounded-2xl p-8 shadow-2xl">
        <h3 class="text-xl font-extrabold text-[#0f2a2d] mb-4">
          Política de Tratamiento de Datos
        </h3>
        <p class="text-sm text-gray-600 text-justify mb-6">
          CERTIFIX S.A.S dará tratamiento a los datos personales conforme a la Ley 1581 de 2012,
          garantizando confidencialidad, seguridad y uso exclusivo para fines comerciales y de contacto.
        </p>
        <div class="flex justify-end gap-4">
          <button @click="showPolicy = false" class="px-5 py-2 rounded-lg border">
            Cancelar
          </button>
          <button @click="acceptPolicy" class="px-5 py-2 rounded-lg bg-teal-700 text-white font-bold">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>