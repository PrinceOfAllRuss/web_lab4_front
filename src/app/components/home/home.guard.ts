export const homeGuard = () => {
  return sessionStorage.getItem('token') != '';
};
