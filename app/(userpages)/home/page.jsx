import CurrentOpening from "@/components/CurrentOpening"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import HomePageNavs from "@/components/HomePageNavsForUser"
import Journey from "@/components/Journey"

const Home = () => {
  return (
    <div>
        <HeroSection />
        <CurrentOpening />
        <Journey />
        <Footer />
    </div>
  )
}

export default Home