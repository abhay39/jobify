import CurrentOpening from "../components/CurrentOpening"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Journey from "../components/Journey"
import NavBar from "../components/NavBar"

const LandingPage = () => {
  return (
    <div>
        <NavBar />
        <HeroSection />
        <CurrentOpening />
        <Journey />
        <Footer />
    </div>
  )
}

export default LandingPage