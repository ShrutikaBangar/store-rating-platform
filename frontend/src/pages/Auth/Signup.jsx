// File: frontend/src/pages/Auth/Signup.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().min(20).max(60).required(),
  email: yup.string().email().required(),
  address: yup.string().max(400).required(),
  password: yup.string()
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[@$!%*?&]/, 'Must contain a special character')
    .min(8).max(16).required(),
});

const Signup = () => {
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/auth/register', { ...data, role: 'user' });
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input {...register('name')} placeholder="Full Name" className="block w-full mb-2 p-2 border" />
      <p className="text-red-500">{errors.name?.message}</p>
      <input {...register('email')} placeholder="Email" className="block w-full mb-2 p-2 border" />
      <p className="text-red-500">{errors.email?.message}</p>
      <textarea {...register('address')} placeholder="Address" className="block w-full mb-2 p-2 border" />
      <p className="text-red-500">{errors.address?.message}</p>
      <input {...register('password')} type="password" placeholder="Password" className="block w-full mb-2 p-2 border" />
      <p className="text-red-500">{errors.password?.message}</p>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 mt-2">Signup</button>
    </form>
  );
};

export default Signup;
