import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', address: '', password: '' });
    setError('');
  };

  const validate = () => {
    const { name, email, address, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwdRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    if (!pwdRegex.test(password)) return 'Password must be 8-16 characters, include one uppercase and one special character';
    if (!isLogin) {
      if (name.length < 20 || name.length > 60) return 'Name must be between 20 and 60 characters';
      if (address.length > 400) return 'Address too long';
    }
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(endpoint, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input type="text" placeholder="Name" className="w-full p-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="text" placeholder="Address" className="w-full p-2 border" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </>
        )}
        <input type="email" placeholder="Email" className="w-full p-2 border" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 border" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={toggleMode} className="mt-4 text-blue-600 underline">
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginSignup;