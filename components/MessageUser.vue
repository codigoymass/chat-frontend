<script setup>
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale'
import { jwtDecode } from 'jwt-decode';

const props = defineProps({
  message: {
    type: Array,
    required: true,
  },
});
const { message } = props;

const token = useCookie('token').value;
const { id } = jwtDecode(token);
</script>

<template>
  <div class=" flex py-3 px-3 w-4/5 rounded flex flex-col relative" :class="(id == message[3]) ? 'bg-emerald-100 border-2 border-emerald-300 ml-auto' : 'bg-cyan-100 border-2 border-cyan-300'">
    <span class="font-black text-sm">
      {{ (message[3] == id) ? 'Tú' : message[5] }}
      <UTooltip text="Moderador" v-if="message[6] == 'moderator'">
        <UIcon name="i-heroicons-star-16-solid" class="text-yellow-500" />
      </UTooltip>
    </span>
    <UTooltip :text="(message[2] == 1) ? 'Bloqueado por el moderador' : ''">
      <span class="text-xs" :class="(message[2] == 1 ? 'text-red-300' : '')">{{ (message[2] == 0) ? message[1] : '&%$%&#"$' }}</span>
    </UTooltip>
    <span class="text-xs text-gray-500 absolute top-2 right-2">{{ formatDistance(message[4], new Date(), { locale: es }) }}</span>
  </div>
</template>
