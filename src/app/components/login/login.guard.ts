export const loginGuard = () => {
  return localStorage.getItem('token') != '';
};
