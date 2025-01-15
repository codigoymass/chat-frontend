<script setup>
const url_api = 'http://localhost:4000';
const toast = useToast();
const router = useRouter();

useHead({
  title: 'Registro | Chat'
});

const isLoading = ref(false);

const form = ref({
  name: null,
  username: null,
  password: null
});

const registerForm = async() => {

  isLoading.value = true;

  const data = await $fetch(`${url_api}/api/register`, {
    method: 'POST',
    body: form.value,
  });

  isLoading.value = false;

  toast.add({
    title: data.data,
    color: (data.error) ? 'red' : 'green',
    icon: (data.error) ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'
  });

  if(!data.error) {
    router.push('/login');
  }
}
</script>

<template>
  <main class="w-screen h-screen bg-white lg:bg-slate-100 flex justify-center items-center">
    <div class="bg-white w-full lg:w-1/4 rounded-lg lg:shadow px-10 py-5 flex flex-col lg:border lg:border-cyan-300">
      <h3 class="text-cyan-600 font-bold uppercase text-center py-3">Registra tu cuenta</h3>
      <span class="text-gray-400 text-sm text-center mb-5">Registra tu cuenta para ingresar a la clase virtual en vivo</span>

      <form @submit.prevent="registerForm">
        <UFormGroup label="Nombre" class="mb-5">
          <UInput v-model="form.name" placeholder="Ingresa tu nombre" icon="i-heroicons-user" color="cyan" size="lg" :autofocus="true" />
        </UFormGroup>

        <UFormGroup label="Usuario" class="mb-5">
          <UInput v-model="form.username" placeholder="Ingresa tu usuario" icon="i-heroicons-user" color="cyan" size="lg" />
        </UFormGroup>

        <UFormGroup label="Contraseña" class="mb-5">
          <UInput v-model="form.password" type="password" placeholder="**************" icon="i-heroicons-lock-closed" color="cyan" size="lg" />
        </UFormGroup>

        <UButton type="submit" class="uppercase" block size="lg" color="cyan" :loading="status">Registrar</UButton>

      </form>

      <span class="flex justify-center gap-1 w-100 text-gray-400 text-sm my-3">
        ¿Ya tienes una cuenta? <ULink to="/login" class="hover:underline hover:text-cyan-600">Ingresa aquí</ULink>
      </span>

      <ColorMode />

    </div>
  </main>
  <UNotifications />
</template>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}
</style>