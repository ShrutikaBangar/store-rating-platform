import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
