import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {

  const token = useCookie('token');

  if (!token) {
    return redirect('/login');
  }

  try {
    // Verifica el token con la clave secreta (puedes usar una función personalizada o una librería como jwt-decode)
    const decodedToken = jwtDecode(token.value);

    // Opcional: verifica la expiración del token
    if (decodedToken.exp * 1000 < Date.now()) {
      return navigateTo('/login'); // Token expirado, redirige al login
    }
  } catch (error) {
    console.error('Token inválido:', error);
    return navigateTo('/login'); // Token inválido, redirige al login
  }
});
