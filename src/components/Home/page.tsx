import Header from './Header'
import Hero from './Hero'
import Services from './Services'
import About from './AboutSection'
import Testimonials from './Testimols'
import Contact from './Contact'
import Footer from './Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
