'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition-colors">
          Abrar's Blog
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-6 items-center font-medium text-gray-300">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <button
              onClick={() => router.push('/auth/signup')}  // Redirect to Sign Up page
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition-all duration-300"
            >
              Login / Register
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
