<script setup>
/**
 * Componente de Contacto - CERTIFIX S.A.S
 * Vue 3 + TailwindCSS
 */
import { onBeforeUnmount, ref, watch } from 'vue';

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
let previousBodyOverflow = '';

watch(showPolicy, (isOpen) => {
  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = previousBodyOverflow;
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow;
});

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
    label: 'Contáctanos', 
    val: '323 590 9225 / 324 507 4813',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
  },
  { 
    label: 'Correo', 
    val: 'certifixsas@gmail.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  },
  { 
    label: 'Sede', 
    val: 'Calle 28 N 65 C 65, Medellín, Antioquia',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
  }
];

const socialIcons = [
  { name: 'Instagram', color: '#E4405F', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>` },
  { name: 'Facebook', color: '#1877F2', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>` },
  { name: 'Linkedin', color: '#0A66C2', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>` }
];
</script>

<template>
  <section id="contacto" class="py-32 bg-white relative overflow-hidden z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-20">

        <div>
          <h2 class="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">Hablemos hoy</h2>
          <h3 class="text-4xl md:text-5xl font-extrabold text-[#0f2a2d] mb-8">
            ¿Listo para asegurar su infraestructura?
          </h3>
          <p class="text-lg text-gray-600 mb-12 text-justify">
            Nuestro equipo está listo para brindarle una asesoría técnica personalizada.
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
              class="social-link w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center
                     text-gray-400 transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-md"
              :style="{ '--social-color': social.color }"
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

    <Teleport to="body">
      <div
        v-if="showPolicy"
        class="fixed inset-0 bg-black/85 backdrop-blur-sm z-[9999] flex items-start justify-center px-4 py-4 sm:py-8 overflow-hidden"
      >
        <div
          class="bg-white max-w-3xl w-full rounded-2xl shadow-2xl h-[calc(100dvh-2rem)] sm:h-[calc(100dvh-4rem)] flex flex-col overflow-hidden"
        >
        <div class="shrink-0 p-5 sm:p-8 pb-4 border-b border-gray-100">
          <p class="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">
            Habeas Data Colombia
          </p>
          <h3 class="text-2xl font-extrabold text-[#0f2a2d] mb-2">
            Política de tratamiento y seguridad de datos personales
          </h3>
          <p class="text-sm font-semibold text-gray-500">
            Última actualización: abril de 2026
          </p>
        </div>

        <div class="min-h-0 flex-1 space-y-5 text-sm text-gray-600 text-justify px-5 sm:px-8 py-5 overflow-y-auto overscroll-contain">
          <p>
            Esta política informa cómo CERTIFIX S.A.S, en calidad de Responsable del Tratamiento,
            recolecta, almacena, usa, conserva, consulta, actualiza, transmite, elimina y protege
            los datos personales enviados mediante este formulario de contacto, canales telefónicos,
            WhatsApp, correo electrónico u otros medios habilitados para la atención comercial y técnica.
          </p>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">1. Marco normativo aplicable</h4>
            <p>
              El tratamiento se realiza conforme a la Constitución Política de Colombia, la Ley
              Estatutaria 1581 de 2012, el Decreto 1377 de 2013, las normas incorporadas en el
              Decreto Único Reglamentario 1074 de 2015, las instrucciones de la Superintendencia
              de Industria y Comercio y las normas que las modifiquen, adicionen o sustituyan.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">2. Datos personales recolectados</h4>
            <p>
              A través del formulario se solicitan datos necesarios para atender una solicitud
              comercial o técnica: nombre completo, empresa, ciudad, teléfono celular, correo
              electrónico y mensaje o requerimiento. También podrán tratarse los datos que el titular
              suministre voluntariamente durante la comunicación. No se solicitan datos sensibles,
              datos de niñas, niños o adolescentes, datos financieros, datos de salud, datos
              biométricos ni información sujeta a reserva especial.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">3. Finalidades del tratamiento</h4>
            <ul class="list-disc pl-5 space-y-1 text-left">
              <li>Contactar al titular para responder su solicitud de información.</li>
              <li>Entender el requerimiento técnico, comercial o de certificación solicitado.</li>
              <li>Preparar orientación, propuesta, cotización o visita técnica cuando aplique.</li>
              <li>Gestionar comunicaciones por correo electrónico, llamada, mensaje o WhatsApp.</li>
              <li>Dar seguimiento a la conversación comercial iniciada por el titular.</li>
              <li>Conservar soporte de la autorización otorgada y de la gestión realizada.</li>
              <li>Cumplir obligaciones legales, contractuales, contables o administrativas aplicables.</li>
              <li>Prevenir usos no autorizados, fraude, incidentes de seguridad o accesos indebidos.</li>
            </ul>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">4. Autorización</h4>
            <p>
              Al marcar la casilla de aceptación y enviar el formulario, el titular otorga
              autorización previa, expresa e informada para el tratamiento de sus datos personales
              de acuerdo con esta política. La autorización podrá ser consultada posteriormente y
              podrá ser revocada cuando no exista un deber legal o contractual que obligue a
              conservar la información.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">5. Derechos del titular</h4>
            <ul class="list-disc pl-5 space-y-1 text-left">
              <li>Conocer, actualizar, rectificar y consultar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso dado a sus datos.</li>
              <li>Solicitar la supresión de sus datos o revocar la autorización, cuando proceda.</li>
              <li>Presentar consultas, reclamos o quejas ante el responsable del tratamiento.</li>
              <li>Acudir ante la Superintendencia de Industria y Comercio cuando corresponda.</li>
              <li>Acceder gratuitamente a los datos personales que hayan sido objeto de tratamiento.</li>
            </ul>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">6. Procedimiento para consultas y reclamos</h4>
            <p>
              El titular puede ejercer sus derechos mediante los canales de atención de CERTIFIX
              S.A.S, indicando su nombre, documento de identificación si es necesario para validar
              la titularidad, descripción de la solicitud y datos de contacto para responder.
            </p>
            <p class="mt-2">
              Las consultas serán atendidas en un término máximo de diez (10) días hábiles,
              prorrogable hasta por cinco (5) días hábiles adicionales cuando sea necesario.
              Los reclamos serán atendidos en un término máximo de quince (15) días hábiles,
              prorrogable hasta por ocho (8) días hábiles adicionales conforme a la Ley 1581 de 2012.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">7. Seguridad y confidencialidad</h4>
            <p>
              CERTIFIX S.A.S aplicará medidas técnicas, humanas y administrativas razonables para
              proteger los datos contra adulteración, pérdida, consulta, uso, acceso no autorizado
              o fraudulento. El acceso estará limitado a personas autorizadas que necesiten la
              información para cumplir las finalidades descritas.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">8. Circulación, encargados y terceros</h4>
            <p>
              Los datos podrán ser tratados por personal autorizado, proveedores tecnológicos,
              herramientas de hosting, correo, mensajería, CRM, analítica o automatización que
              actúen como encargados del tratamiento, siempre bajo deberes de seguridad,
              confidencialidad y uso limitado a las finalidades autorizadas. También podrán
              suministrarse a autoridades públicas o judiciales cuando exista obligación legal.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">9. Transferencias o transmisiones internacionales</h4>
            <p>
              Si se usan servicios tecnológicos alojados fuera de Colombia, podrá existir transmisión
              o transferencia internacional de datos. En ese caso se procurará que el tercero ofrezca
              medidas adecuadas de seguridad y confidencialidad, y que el tratamiento se mantenga
              limitado a las finalidades autorizadas.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">10. Vigencia y conservación</h4>
            <p>
              Los datos se conservarán durante el tiempo razonable y necesario para gestionar la
              solicitud, mantener la relación comercial o contractual si se llega a concretar, cumplir
              obligaciones legales o contractuales y atender eventuales consultas o reclamos. Cumplidas
              las finalidades, se procederá a su supresión, anonimización o archivo seguro cuando
              corresponda.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">11. Cambios de la política</h4>
            <p>
              Cualquier cambio sustancial en esta política será informado por medios razonables y
              oportunos. Si el cambio afecta finalidades previamente autorizadas, se solicitará una
              nueva autorización cuando la ley lo exija.
            </p>
          </div>

          <div>
            <h4 class="font-extrabold text-[#0f2a2d] mb-2">12. Responsable del tratamiento</h4>
            <p>
              Responsable: CERTIFIX S.A.S.
            </p>
            <p>
              Canal de atención: certifixsas@gmail.com / +57 323 590 9225 / +57 324 507 4813.
            </p>
            <p>
              Dirección: Calle 28 N 65 C 65, Medellín, Antioquia.
            </p>
          </div>
        </div>

        <div class="shrink-0 flex justify-end gap-4 p-5 sm:p-8 pt-4 border-t border-gray-100 bg-white">
          <button @click="showPolicy = false" class="px-5 py-2 rounded-lg border">
            Cancelar
          </button>
          <button @click="acceptPolicy" class="px-5 py-2 rounded-lg bg-teal-700 text-white font-bold">
            Aceptar
          </button>
        </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.social-link:hover {
  color: var(--social-color);
  border-color: var(--social-color);
  background-color: color-mix(in srgb, var(--social-color) 10%, white);
}
</style>
