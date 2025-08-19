import { useState } from 'react';
import { api } from '@/lib/api';

const ADMIN_PASSWORD = "Vaishnavikesharwaniji"; // demo purpose only

export default function Admin(){
  const [entered,setEntered] = useState('');
  const [authed,setAuthed] = useState(false);
  const [msg,setMsg] = useState('');

  const [key,setKey] = useState('');
  const [hours,setHours] = useState(24);
  const [user,setUser] = useState('');

  function check(){
    if(entered === ADMIN_PASSWORD){ setAuthed(true); setMsg('Access granted'); }
    else setMsg('Wrong admin password');
  }

  if(!authed){
    return (
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
        <input className="w-full border p-2 rounded" placeholder="Admin password" type="password" value={entered} onChange={e=>setEntered(e.target.value)} />
        <button onClick={check} className="mt-3 w-full px-4 py-2 rounded bg-blue-600 text-white">Enter</button>
        {msg && <p className="mt-2 text-sm">{msg}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <section className="p-4 border rounded">
        <h3 className="font-semibold">Generate Key</h3>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          <input className="border p-2 rounded" placeholder="KEY-1234" value={key} onChange={e=>setKey(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Validity hours" type="number" value={hours} onChange={e=>setHours(Number(e.target.value))} />
          <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={async()=>{
            setMsg('Please wait...');
            try{ const r = await api.genKey({key,validityHours:Number(hours)}); setMsg(r.message); }
            catch(e){ setMsg(e.error||e.message); }
          }}>Create</button>
        </div>
      </section>

      <section className="p-4 border rounded">
        <h3 className="font-semibold">Ban / Unban User</h3>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          <input className="border p-2 rounded" placeholder="username" value={user} onChange={e=>setUser(e.target.value)} />
          <button className="px-4 py-2 rounded bg-rose-600 text-white" onClick={async()=>{
            setMsg('Please wait...');
            try{ const r = await api.ban({username:user}); setMsg(r.message); }
            catch(e){ setMsg(e.error||e.message); }
          }}>Ban</button>
          <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={async()=>{
            setMsg('Please wait...');
            try{ const r = await api.unban({username:user}); setMsg(r.message); }
            catch(e){ setMsg(e.error||e.message); }
          }}>Unban</button>
        </div>
      </section>

      {msg && <p className="text-sm">{msg}</p>}
    </div>
  )
}
