import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 font-['Playfair_Display']">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          Article Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 bg-[#1DE9B6] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#1DE9B6]/90 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
