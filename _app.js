import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }){
  return (
    <div>
      <Navbar />
      <main className="container py-6">
        <Component {...pageProps} />
      </main>
      <footer className="container py-10 text-sm text-gray-500">© 2025 StudyLove</footer>
    </div>
  )
}
