export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      await fetch();
      navigateTo('/?message=Login successful');

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    // await $fetch('/api/auth/login') // register

    return true;
  };

  const logout = async () => {
    await clear();
    navigateTo('/?message=Logout successful');
  };

  return {
    loggedIn,
    session,
    user,

    // Getters
    isLoggedIn: loggedIn,
    isAdmin: computed(() => user.value?.roles.includes('admin')),

    // Methods, Acciones
    fetch,
    login,
    register,
    logout,
  };
};
