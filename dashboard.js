import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Dashboard(){
  const [challenge,setChallenge] = useState(null);
  const [expired,setExpired] = useState(false);
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : '';

  useEffect(()=>{
    const exp = Number(localStorage.getItem('sessionExpires')||0);
    if(Date.now() > exp){ setExpired(true); return; }
    api.daily().then(setChallenge).catch(()=>{});
  },[]);

  if(expired){
    return <div>
      <h2 className="text-2xl font-bold">Session expired</h2>
      <p className="mt-2">Please login again.</p>
      <a href="/login" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">Go to Login</a>
    </div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome, {username || 'Student'} 👋</h2>
      <div className="mt-6 p-4 rounded border">
        <h3 className="font-semibold">Daily Challenge</h3>
        <p className="mt-1">{challenge?.challenge || 'Loading...'}</p>
        {challenge && <p className="text-sm mt-1">Reward: {challenge.reward}</p>}
      </div>
      <div className="mt-6 flex gap-3">
        <a className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800" href="/leaderboard">View Leaderboard</a>
        <a className="px-4 py-2 rounded bg-blue-600 text-white" href="/admin">Admin Panel</a>
      </div>
    </div>
  )
}
