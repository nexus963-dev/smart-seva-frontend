'use client'
import { motion } from 'framer-motion'
import { useUser, useAuth, SignInButton, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function Hero() {
  const { isSignedIn, user } = useUser()
  const { signOut } = useAuth()
  const [showWelcome, setShowWelcome] = useState(false)

  const handleStartFarming = () => {
    if (isSignedIn) {
      // Redirect to dashboard or main app
      window.location.href = '/dashboard'
    } else {
      setShowWelcome(true)
    }
  }

  const handleGetStarted = () => {
    if (isSignedIn) {
      // Redirect to features or specific section
      window.location.href = '/features'
    }
  }

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center pt-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              🌾 Smart 
              <span className="text-green-600"> Kisan</span> 
              <span className="text-emerald-500"> Seva</span>
            </h1>
            
            {isSignedIn && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  🙏 नमस्ते {user?.firstName || 'किसान भाई'}! आपका स्वागत है।
                </p>
              </div>
            )}

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Empowering farmers with AI-powered crop disease detection, real-time weather alerts, 
              mandi prices, and expert guidance. Your trusted digital companion for modern farming success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {isSignedIn ? (
                <button 
                  onClick={handleStartFarming}
                  className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                >
                  🚀 डैशबोर्ड देखें
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all transform hover:scale-105">
                    Start Farming Smart
                  </button>
                </SignInButton>
              )}
              
              <button 
                onClick={handleGetStarted}
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white transition-all"
              >
                {isSignedIn ? 'Explore Features' : 'Watch Demo'}
              </button>
            </div>

            {isSignedIn && (
              <div className="mt-6 flex items-center gap-4">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-12 h-12"
                    }
                  }}
                />
                <div>
                  <p className="text-sm text-gray-600">Logged in as</p>
                  <p className="font-semibold text-gray-800">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {isSignedIn ? 'Welcome Back!' : 'Trusted by 10,000+ Farmers'}
                  </h3>
                  <p className="text-gray-600">
                    {isSignedIn ? 'Ready to start farming smart?' : 'AI-Powered Agricultural Solutions'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
