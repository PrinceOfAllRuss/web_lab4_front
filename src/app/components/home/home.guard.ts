export const homeGuard = () => {
  return localStorage.getItem('token') != '';
};
