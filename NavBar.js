import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur sticky top-0 z-10">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-semibold text-lg">📚 StudyLove</Link>
        <div className="flex gap-2">
          <Link className="navlink" href="/leaderboard">Leaderboard</Link>
          <Link className="navlink" href="/dashboard">Dashboard</Link>
          <Link className="navlink" href="/admin">Admin</Link>
          <Link className="btn" href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
