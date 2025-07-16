import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function VerifyRequest() {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-[#1DE9B6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-black" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">
            Check your email
          </h1>
          
          <p className="text-gray-300 mb-6">
            A sign in link has been sent to your email address. Click the link to sign in to your account.
          </p>
          
          <div className="text-sm text-gray-400 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </div>
          
          <Link 
            href="/"
            className="inline-block bg-[#1DE9B6] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#1DE9B6]/90 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

