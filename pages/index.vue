<script setup>
const url_api = 'http://localhost:4000';
const router = useRouter();
const toast = useToast();
import { io } from "socket.io-client";

useHead({
  title: 'Inicio | Chat'
});

definePageMeta({
  middleware: [
    'auth',
  ]
});

const content = ref('');
const user_token = jwtDecode(useCookie('token').value);

import { jwtDecode } from "jwt-decode";
const socket = io("http://localhost:4000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: useCookie('token').value
  },
  transports: ['websocket'],
});

socket.on('message:receive', () => {
  // alert('Nuevo mensaje');
  refreshNuxtData();
})


const logout = () => {
  socket.disconnect();
  const authCookie = useCookie('token')
  authCookie.value = null
  router.push('/login');
}

const sendMessage = async() => {

  const data = await $fetch(`${url_api}/api/messages`, {
    method: 'POST',
    headers: {
      authentication: useCookie('token').value,
    },
    body: {
      content: content.value
    }
  });

  if(data.error) {
    toast.add({
      title: data.data,
      color: 'red'
    });
    return;
  }
  
  socket.emit('message:update');
  content.value = '';
}

</script>

<template>
  <main class="w-screen h-screen bg-slate-100 flex justify-center items-center">
    <div class="flex flex-col lg:flex-row gap-2 h-[500px] px-2 lg:px-0">
      
      <!-- CONTENT VIDEO -->
      <div class="bg-white w-full lg:w-[800px] rounded-lg shadow p-5 flex flex-col border border-cyan-300">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/bYv8q8PtL-M?si=hitjxdmkmc6cbdOO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h2 class="text-cyan-600 text-2xl font-bold mt-4">Video de la clase</h2>
        <p class="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et iste, labore quos harum, recusandae quibusdam eos praesentium unde nesciunt tempora maiores. Quaerat eos dolorem sunt aut, eligendi aspernatur aliquam reprehenderit?</p>
      </div>
      <!-- !CONTENT VIDEO -->
      
      <!-- CONTENT CHAT -->
      <div class="bg-white w-full lg:w-[400px] rounded-lg shadow flex flex-col border border-cyan-300 relative h-100 overflow-hidden">
        <div class="w-100 flex justify-between items-center px-3 py-1 shadow-md z-10">
          <h3 class="text-cyan-600 text-lg font-bold flex items-center gap-3">
            <UAvatar :alt="user_token.username.toUpperCase()" size="md" />
            <div class="flex flex-col items-start">
              {{ user_token.username }}
              <UBadge :label="user_token.role_type == 'moderator' ? 'Moderador' : 'Estudiante'" color="cyan" size="xs" />
            </div>
            <UTooltip text="Cerrar sesión">
              <UButton @click="logout" icon="i-heroicons-arrow-left-start-on-rectangle-16-solid" color="cyan" variant="ghost" />
            </UTooltip>
          </h3>
          <span class="text-cyan-600 flex items-center gap-2">
            {{ users_online }}
            <UIcon name="i-heroicons-user-group" class="w-5 h-5"></UIcon>
          </span>
        </div>

        <ListMessages />
        
        <form @submit.prevent="sendMessage">
          <div class="bg-white absolute bottom-0 left-0 w-full flex items-center p-2 shadow flex gap-2 items-center border-t-2">
            <UInput type="text" v-model="content" padded class="w-full border-none" size="lg" variant="none" placeholder="Escribe un mensaje..." />
            <UTooltip text="Enviar mensaje">
              <UButton type="submit" color="cyan" icon="i-heroicons-paper-airplane" :disabled="content == ''" />
            </UTooltip>
          </div>
        </form>

      </div>
      <!-- !CONTENT CHAT -->
    </div>
  </main>
  <UNotifications />
</template>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}
</style>