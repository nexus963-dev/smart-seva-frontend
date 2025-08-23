'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    name: "राजेश कुमार",
    position: "किसान, हरियाणा",
    content: "Smart Kisan Seva ने मेरी फसल में लगी बीमारी को पहचानकर मुझे सही इलाज बताया। अब मेरी पैदावार 30% बढ़ गई है। बहुत ही उपयोगी ऐप है।",
    rating: 5,
    avatar: "👨‍🌾"
  },
  {
    name: "प्रिया शर्मा", 
    position: "कृषि विशेषज्ञ, महाराष्ट्र",
    content: "मंडी के दाम मिलना और मौसम की जानकारी मिलना बहुत फायदेमंद है। वीडियो ट्यूटोरियल भी बहुत अच्छे हैं। किसानों के लिए वरदान है यह प्लेटफॉर्म।",
    rating: 5,
    avatar: "👩‍🌾"
  },
  {
    name: "अरुण पटेल",
    position: "प्रगतिशील किसान, गुजरात",
    content: "AI से बीमारी पहचानना, मौसम अलर्ट, और सरकारी योजनाओं की जानकारी - सब कुछ एक जगह मिल जाता है। Tech-savvy farming के लिए perfect है।",
    rating: 5,
    avatar: "🧑‍🌾"
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            किसान भाइयों के <span className="text-green-600">अनुभव</span>
          </h2>
          <div className="w-12 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            हजारों किसान भाइयों का भरोसा और उनके सफलता की कहानियां हमारी प्रेरणा हैं।
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={activeIndex}
              className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-8">
                <div className="text-6xl mb-4">{testimonials[activeIndex].avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 text-lg">
                  "{testimonials[activeIndex].content}"
                </p>
                <h4 className="text-xl font-bold text-gray-800">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-gray-500">{testimonials[activeIndex].position}</p>
              </div>
            </motion.div>

            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <FaChevronLeft className="text-green-600" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <FaChevronRight className="text-green-600" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
