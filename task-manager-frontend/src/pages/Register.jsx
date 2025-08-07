import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/register', form);
    navigate('/login');
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} Register>
        <input placeholder="Username"         className="w-full border px-3 py-2 rounded" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Password"         className="w-full border px-3 py-2 rounded" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="w-full border px-3 py-2 rounded" onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
