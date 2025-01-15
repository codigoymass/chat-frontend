<script setup>
const url_api = 'http://localhost:4000';
const toast = useToast();
const router = useRouter();

useHead({
  title: 'Login | Chat'
});

const isLoading = ref(false);

const form = ref({
  username: null,
  password: null
});

const validateLogin = async() => {

  isLoading.value = true;

  const data = await $fetch(`${url_api}/api/login`, {
    method: 'POST',
    body: form.value
  });

  isLoading.value = false;

  if(data.error) {
    toast.add({
      title: data.data,
      color: 'red',
      icon: 'i-heroicons-x-circle'
    })
  } else {
    useCookie('token').value = data.data.token;
    router.push('/');
  }

}
</script>

<template>
  <main class="w-screen h-screen bg-white lg:bg-slate-100 flex justify-center items-center">
    <div class="bg-white w-full lg:w-1/4 rounded-lg lg:shadow px-10 py-5 flex flex-col lg:border lg:border-cyan-300">
      <h3 class="text-cyan-600 font-bold uppercase text-center py-3">Ingresa a tu cuenta</h3>
      <span class="text-gray-400 text-sm text-center mb-5">Inicia sesión en tu cuenta para ingresar a la clase virtual en vivo</span>
      <form @submit.prevent="validateLogin">
        <UFormGroup label="Usuario" class="mb-5">
          <UInput v-model="form.username" placeholder="Ingresa tu usuario" icon="i-heroicons-user" color="cyan" size="lg" :autofocus="true" />
        </UFormGroup>

        <UFormGroup label="Contraseña" class="mb-5">
          <UInput v-model="form.password" type="password" placeholder="**************" icon="i-heroicons-lock-closed" color="cyan" size="lg" />
        </UFormGroup>

        <UButton type="submit" class="uppercase" block size="lg" color="cyan">Ingresar</UButton>

      </form>

      <span class="flex justify-center gap-1 w-100 text-gray-400 text-sm my-3">
        ¿No tienes cuenta? <ULink to="/registro" class="hover:underline hover:text-cyan-600">Regístrate aquí</ULink>
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