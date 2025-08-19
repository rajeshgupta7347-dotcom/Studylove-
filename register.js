import { useState } from 'react';
import { api } from '@/lib/api';

export default function Register(){
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');

  async function onSubmit(e){
    e.preventDefault();
    setMsg('Please wait...');
    try{
      const r = await api.register({username,password});
      setMsg(r.message || 'Registered');
      setTimeout(()=>location.href='/login',800);
    }catch(err){
      setMsg(err.error || err.message || 'Error');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create your account</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="w-full px-4 py-2 rounded bg-blue-600 text-white">Register</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  )
}
