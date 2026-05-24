import { LangProvider } from './context/LangContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Fleet from './components/Fleet/Fleet'
import Gallery from './components/Gallery/Gallery'
import Quoter from './components/Quoter/Quoter'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Fleet />
        <Gallery />
        <Quoter />
      </main>
      <Footer />
    </LangProvider>
  )
}