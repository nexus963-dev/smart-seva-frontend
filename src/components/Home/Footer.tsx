import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Chain App Dev</h3>
            <p className="text-gray-400 mb-4">
              Building innovative mobile applications for the future.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="text-2xl hover:text-blue-500 cursor-pointer transition-colors" />
              <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer transition-colors" />
              <FaInstagram className="text-2xl hover:text-pink-500 cursor-pointer transition-colors" />
              <FaLinkedin className="text-2xl hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">App Development</span></li>
              <li><span className="text-gray-400">Mobile Design</span></li>
              <li><span className="text-gray-400">Cloud Solutions</span></li>
              <li><span className="text-gray-400">Consulting</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white border-none focus:outline-none"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Chain App Dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
