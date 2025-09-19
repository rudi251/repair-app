import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password, fullName: name, role: 'user' });
      alert('Registered. Please login.');
      nav('/login');
    } catch(err){
      alert(err.response?.data?.message || 'Register failed');
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Register</h2>
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Register</button>
    </form>
  );
}
