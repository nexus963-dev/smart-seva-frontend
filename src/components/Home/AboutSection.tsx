'use client'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

export default function About() {
  const features = [
    "AI-Powered Disease Detection with 95% Accuracy",
    "Real-time Weather Alerts from Trusted APIs", 
    "Live Mandi Prices from 3000+ Markets",
    "Multilingual Support (Hindi, Marathi, Tamil & More)"
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why <span className="text-green-600">Trust</span> Smart Kisan Seva?
            </h2>
            <div className="w-12 h-1 bg-green-600 mb-6"></div>
            <p className="text-gray-600 mb-8">
              Built by agricultural experts and technology professionals, Smart Kisan Seva combines traditional farming wisdom 
              with cutting-edge AI technology to provide reliable, actionable insights for modern farmers.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all transform hover:scale-105">
              Join 10,000+ Farmers
            </button>
            <p className="text-sm text-gray-500 mt-4">*Free Registration | Trusted by Agricultural Universities</p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-12 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="text-8xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Award Winning</h3>
                  <p className="text-gray-600">Digital Agriculture Platform</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
