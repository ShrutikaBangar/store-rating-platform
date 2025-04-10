// utils/auth.js

// Logs out the user by clearing the token and redirecting to login
export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  
  // Retrieves the current token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Checks if the user is logged in
  export const isLoggedIn = () => {
    return !!getToken();
  };
  
  // Decode JWT to get user info (optional if you need roles, etc.)
  export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  
  // Get current user role from token (if stored in payload)
  export const getUserRole = () => {
    const token = getToken();
    const decoded = parseJwt(token);
    return decoded?.role || null;
  };
  