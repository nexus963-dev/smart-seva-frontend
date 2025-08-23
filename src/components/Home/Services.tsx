'use client'
import { motion } from 'framer-motion'

const services = [
  {
    icon: "🔍",
    title: "Crop Disease Detection",
    description: "Upload plant images for instant AI-powered disease diagnosis with treatment recommendations and preventive measures."
  },
  {
    icon: "🌦️", 
    title: "Weather & Rainfall Alerts",
    description: "Real-time weather forecasts and extreme weather alerts to protect your crops from storms, droughts, and heavy rainfall."
  },
  {
    icon: "💹",
    title: "Live Mandi Prices",
    description: "Daily market prices from thousands of mandis across India. Get minimum, maximum, and modal prices for informed selling decisions."
  },
  {
    icon: "🎥",
    title: "Expert Video Tutorials", 
    description: "Curated agricultural videos covering crop care, organic farming, and irrigation techniques in multiple regional languages."
  },
  {
    icon: "🔎",
    title: "Smart Search & Guidance",
    description: "Find government schemes, agricultural articles, and expert advice through our intelligent search powered by Google APIs."
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🌾 Smart Kisan Seva <span className="text-green-600">Features</span>
          </h2>
          <div className="w-12 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive agricultural solutions designed by experts to increase your farm productivity and profitability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:bg-gradient-to-br hover:from-green-600 hover:to-emerald-500 border border-green-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-100 transition-colors leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
