'use client'
import { useUser, useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaSun, FaChartLine, FaVideo, FaSearch, FaRobot, FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useState } from 'react'

interface DashboardFeature {
  icon: string;
  title: string;
  desc: string;
  link: string;
  bgColor: string;
  isNew?: boolean;
}

const dashboardFeatures: DashboardFeature[] = [
  {
    icon: "/images/health-svgrepo-com.svg",
    title: "Scan Plant Disease",
    desc: "Upload plant photo for instant AI diagnosis and treatment",
    link: "/features/plant-detection",
    bgColor: "from-blue-500 to-blue-600"
  },
  {
    icon: "/images/agriculture-crop-cropduster-svgrepo-com.svg",
    title: "Weather & Alerts",
    desc: "Check today's weather and get extreme weather warnings",
    link: "/features/weather-alerts",
    bgColor: "from-yellow-500 to-orange-500"
  },
  {
    icon: "/images/agriculture-eco-farm-svgrepo-com.svg",
    title: "Mandi Prices",
    desc: "Live market rates from 3000+ mandis across India",
    link: "/features/mandi-price",
    bgColor: "from-green-500 to-green-600"
  },
  {
    icon: "/images/agriculture-worker-svgrepo-com.svg",
    title: "Video Learning",
    desc: "Watch farming tutorials in your preferred language",
    link: "/features/search-tutorial",
    bgColor: "from-purple-500 to-purple-600"
  },
  {
    icon: "/images/research-presentation-left-svgrepo-com.svg",
    title: "Smart Search",
    desc: "Find government schemes and agricultural guides",
    link: "/features/search-tutorial",
    bgColor: "from-indigo-500 to-indigo-600"
  },
  {
    icon: "/images/assistant-svgrepo-com.svg",
    title: "AI Assistant",
    desc: "Chat with our farming expert bot - voice enabled",
    link: "/features/chatbot-assistant",
    bgColor: "from-pink-500 to-pink-600",
    isNew: true
  },
];

const quickStats = [
  { label: "Crops Scanned", value: "0", icon: "🌱" },
  { label: "Weather Alerts", value: "3", icon: "⚠️" },
  { label: "Mandi Updates", value: "Today", icon: "💹" },
  { label: "Videos Watched", value: "0", icon: "📺" }
];

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to home page after sign out
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    redirect('/')
  }

  return (
    <main className="bg-green-50 min-h-screen">
      {/* Welcome Header with User Menu */}
      <section className="bg-gradient-to-r from-green-700 to-lime-500 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                🙏 नमस्ते {user?.firstName || 'किसान भाई'}!
              </h1>
              <p className="text-green-100 text-base sm:text-lg">
                Welcome to your Smart Kisan Seva dashboard - Let's make farming smarter today
              </p>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Image
                  src="/images/smart-seva.png"
                  alt="Dashboard"
                  width={100}
                  height={100}
                  className="opacity-80"
                />
              </div>
              
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <FaUser className="text-green-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold">{user?.firstName || 'User'}</p>
                    <p className="text-xs text-green-100">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    
                    <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                      <FaUser className="mr-3 text-gray-500" />
                      Profile Settings
                    </Link>
                    
                    <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                      <FaRobot className="mr-3 text-gray-500" />
                      App Settings
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" />
                        साइन आउट करें (Sign Out)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-green-700">{stat.value}</div>
              <div className="text-xs sm:text-sm text-green-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Today's Highlights */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <FaBell className="mr-2" />
            आज की खास बातें (Today's Highlights)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
              <div className="flex items-center mb-2">
                <FaSun className="text-yellow-500 mr-2" />
                <span className="font-medium text-gray-800">Weather Alert</span>
              </div>
              <p className="text-sm text-gray-600">Moderate rain expected tomorrow. Good for wheat crops.</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center mb-2">
                <FaChartLine className="text-green-500 mr-2" />
                <span className="font-medium text-gray-800">Mandi Update</span>
              </div>
              <p className="text-sm text-gray-600">Wheat prices up by ₹50/quintal in Delhi mandi</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-center mb-2">
                <FaVideo className="text-purple-500 mr-2" />
                <span className="font-medium text-gray-800">New Tutorial</span>
              </div>
              <p className="text-sm text-gray-600">Organic fertilizer preparation video available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-8 text-center">
          🌾 Your Farming Tools
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardFeatures.map((feature, idx) => (
            <Link href={feature.link} key={idx}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden h-full">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${feature.bgColor} p-6 text-white relative`}>
                  {feature.isNew && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
                      NEW
                    </span>
                  )}
                  <div className="flex items-center justify-center mb-3">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] filter brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 text-center leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                      Open Tool →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-white border-t border-green-200 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            🤝 Need Help Getting Started?
          </h2>
          <p className="text-green-700 mb-6 text-lg">
            Our agricultural experts are here to guide you through every feature
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/features/chatbot-assistant">
              <button className="bg-gradient-to-r from-green-600 to-lime-500 text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition shadow-md">
                💬 Chat with AI Assistant
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-green-600 text-green-600 font-bold px-6 py-3 rounded-xl hover:bg-green-600 hover:text-white transition">
                📞 Call Support: 1800-KISAN
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </main>
  )
}
