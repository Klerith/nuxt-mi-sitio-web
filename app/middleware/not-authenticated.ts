export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuthentication();

  // const notAuthenticatedRoutes = ['/login','/register']

  if (to.path.startsWith('/login') && isLoggedIn.value) {
    return navigateTo('/');
  }

  if (to.path.startsWith('/register') && isLoggedIn.value) {
    return navigateTo('/');
  }
});
