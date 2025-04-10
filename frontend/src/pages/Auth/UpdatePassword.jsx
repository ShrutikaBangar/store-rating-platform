import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const pwdRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!pwdRegex.test(password)) return setMsg('Invalid password format');
    try {
      await axios.put('/api/auth/update-password', { password });
      setMsg('Password updated successfully');
    } catch (err) {
      setMsg('Error updating password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Update Password</h1>
      {msg && <p className="mb-2 text-blue-600">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdatePassword;