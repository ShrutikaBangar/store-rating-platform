// File: frontend/src/pages/Auth/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      login(res.data.token, res.data.role);
      if (res.data.role === 'admin') navigate('/admin/dashboard');
      if (res.data.role === 'user') navigate('/stores');
      if (res.data.role === 'store_owner') navigate('/owner/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input {...register('email')} placeholder="Email" className="block w-full mb-2 p-2 border" />
      <p className="text-red-500">{errors.email?.message}</p>
      <input {...register('password')} type="password" placeholder="Password" className="block w-full mb-2 p-2 border" />
      <p className="text-red-500">{errors.password?.message}</p>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">Login</button>
    </form>
  );
};

export default Login;
