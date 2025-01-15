<script setup>
const url_api = 'http://localhost:4000';
const { data: messages } = await useFetch(`${url_api}/api/messages`)

const scrollContainer = ref(null);
const scrollToBottom = () => {
  const container = scrollContainer.value;
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }
}

onMounted(() => { 
  scrollToBottom();
});
</script>

<template>
  <div ref="scrollContainer" class="overflow-auto px-3 py-2" style="height: calc(100% - 110px)">
    <div class="my-2" v-for="(message, index) in messages.rows" :key="index">
      <MessageUser :message="message" />
    </div>
    <div v-if="messages.rows.length == 0">
      <h3 class="text-center text-gray-400 font-bold text-sm mt-4">¡No hay mensajes por ahora!</h3>
    </div>
  </div>
</template>