//import Image from 'next/image'
import Link from 'next/link'

//import landingimage from "public/images/landing-image.png"

export default function Home() {
  return (
    <div className = "landing-page min-h-screen flex flex-col justify-between font-sans text-gray-800">
      <header className = "bg-gray-900 text-white py-4">
        <nav className = "container mx-auto">
          <ul className = "flex justify-end space-x-4">
            <li className = "hover:text-yellow-300"><a href = "/home">Home</a></li>
            <li className = "hover:text-yellow-300"><a href = "/home">Features</a></li>
            <li className = "hover:text-yellow-300"><a href = "/home">Pricing</a></li>
            <li className = "hover:text-yellow-300"><a href = "/home">Cotact</a></li>
          </ul>
        </nav>
      </header>

      <main className = "flex-grow flex items-center justify-center">
        <section className = "hero flex items-center justify-center">
            <div className = "max-w-md text-center">
              <h1 className = "text-4xl text-indigo-700  font-bold mb-4">FieldANT</h1>
              <p className = "text-lg text-white mb-6">Your data, Your Decision, In Real Time</p>
              <Link href = "/login" className = "bg-yellow-500 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Get Started
              </Link>
            </div>
        </section>
      </main>

      <footer className = "text-center py-8 bg-gray-900 text-white">
        <p>&copy; 2023 rAIn Technologies</p>
      </footer>

    </div>
  )
}
