import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function RequestList(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ load() }, []);
  async function load(){
    try {
      const res = await API.get('/requests');
      setItems(res.data);
    } catch(err){
      alert('Failed to load requests');
    }
  }
  return (
    <div className="card">
      <h2>Requests</h2>
      {items.length === 0 && <div>No requests yet</div>}
      {items.map(it => (
        <div key={it._id} className="item">
          <div><strong>{it.machineName}</strong> — {it.status}</div>
          <div>{it.description}</div>
          <div><small>{new Date(it.createdAt).toLocaleString()}</small></div>
        </div>
      ))}
    </div>
  );
}
