//import Image from 'next/image'
import Link from 'next/link'

import Header from '../components/header.js';
import Footer from '@/components/footer.js';
//import landingimage from "public/images/landing-image.png"

export default function Home() {
  return (
    <div className = "landing-page min-h-screen flex flex-col justify-between font-sans text-gray-800">
      <Header />

      <main className = "flex-grow flex items-center justify-center">
        <section className = "hero flex items-center justify-center">
            <div className = "max-w-md text-center">
              <h1 className = "text-4xl text-indigo-700  font-bold mb-4">FieldANT</h1>
              <p className = "text-lg text-white mb-6">Your data, Your Decision, In Real Time</p>
              <Link href = "/dashboard" className = "bg-yellow-500 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Get Started
              </Link>
            </div>
        </section>
      </main>
      
      <Footer />
      </div>
  )
}
