'use client'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaHeadset } from 'react-icons/fa'
import { useUser, SignInButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function Contact() {
  const { isSignedIn, user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    state: '',
    problemType: '',
    message: ''
  })

  // Pre-fill form if user is signed in
  useState(() => {
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
      }))
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) {
      alert('कृपया पहले साइन इन करें')
      return
    }
    
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('आपका संदेश भेज दिया गया है! हम जल्द ही आपसे संपर्क करेंगे।')
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            किसान भाइयों से <span className="text-green-600">संपर्क करें</span>
          </h2>
          <div className="w-12 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            खेती से जुड़ी कोई भी समस्या हो या तकनीकी सहायता चाहिए, हम 24/7 आपकी सेवा में हैं। 
            हमारे कृषि विशेषज्ञ आपकी मदद के लिए तैयार हैं।
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information - Same as before */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Previous contact info code remains the same */}
          </motion.div>

          {/* Contact Form with Authentication */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📝 अपनी समस्या लिखें
              </h3>
              
              {!isSignedIn ? (
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-4">
                    सहायता प्राप्त करने के लिए कृपया पहले साइन इन करें
                  </p>
                  <SignInButton mode="modal">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                      साइन इन करें
                    </button>
                  </SignInButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800">
                      🙏 नमस्ते {user?.firstName}! आप साइन इन हैं। 
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        आपका नाम *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="अपना पूरा नाम लिखें"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    {/* Rest of the form fields remain the same */}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold text-lg"
                  >
                    📤 संदेश भेजें - निःशुल्क सलाह पाएं
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
