// src/utils.js
export const isTokenExpired = () => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user) {
      return true;
    }
    const currentTime = new Date().getTime();
    return currentTime > user.expiration;
  };
  