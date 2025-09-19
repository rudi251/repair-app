import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const payload = { ...res.data.user, accessToken: res.data.accessToken };
      onLogin(payload);
      nav('/');
    } catch(err){
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Login</h2>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
