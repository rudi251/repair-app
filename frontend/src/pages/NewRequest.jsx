import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function NewRequest(){
  const [machineName,setMachineName] = useState('');
  const [issueType,setIssueType] = useState('');
  const [description,setDescription] = useState('');
  const [location,setLocation] = useState('');
  const [file,setFile] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await API.post('/requests', { machineName, issueType, description, location });
      if(file){
        const fd = new FormData();
        fd.append('file', file);
        await API.post(`/requests/${res.data._id}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      }
      alert('Request created');
      nav('/requests');
    } catch(err){
      alert(err.response?.data?.message || 'Failed');
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>New Request</h2>
      <input placeholder="Machine name" value={machineName} onChange={e=>setMachineName(e.target.value)} required />
      <input placeholder="Issue type" value={issueType} onChange={e=>setIssueType(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="file" onChange={e=>setFile(e.target.files[0])} />
      <button>Submit</button>
    </form>
  );
}
