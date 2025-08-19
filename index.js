export default function Home(){
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Welcome to StudyLove</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Practice tests, challenges, and leaderboards — all in one place.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <a href="/register" className="px-4 py-2 rounded bg-blue-600 text-white">Create account</a>
        <a href="/login" className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800">Login</a>
      </div>
    </section>
  )
}
