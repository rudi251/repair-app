import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewRequest from './pages/NewRequest';
import RequestList from './pages/RequestList';
import { setToken } from './api/api';

function App(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.accessToken) setToken(user.accessToken);
  }, [user]);

  function logout(){
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    navigate('/login');
  }

  return (
    <div className="container">
      <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/new">New Request</Link>
        {user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={(u)=>{ localStorage.setItem('user', JSON.stringify(u)); setUser(u); setToken(u.accessToken); navigate('/'); }} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/new" element={<NewRequest />} />
      </Routes>
    </div>
  );
}

export default App;
