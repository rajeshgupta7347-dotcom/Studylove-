import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Leaderboard(){
  const [list,setList] = useState([]);
  const [msg,setMsg] = useState('Loading...');

  useEffect(()=>{
    api.leaderboard()
      .then(d=>{ setList(d.leaderboard||[]); setMsg(''); })
      .catch(err=> setMsg(err.error||'Failed'));
  },[]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {msg && <p>{msg}</p>}
      <ul className="divide-y rounded border">
        {list.map((u,idx)=> (
          <li key={u.username||idx} className="p-3 flex justify-between">
            <span>{idx+1}. {u.username}</span>
            <span className="font-mono">{u.score ?? 0}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
