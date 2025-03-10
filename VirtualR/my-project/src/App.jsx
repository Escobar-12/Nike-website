import NavigationBar from "./NavBar"
import "./App.css"
import HeroSec from "./Hero"
import PopProducts from "./PopularProducts"
import SuperQuality from "./SuperQuality"
import ServicesSec from "./Services"
import SpecialOffer from "./SpecialOffers"
import CustomerReview from "./CustomerReviews"
import ContactUs from "./Contactus"
import Footer from "./Footer"

function App() {

  return (
    <>
      <NavigationBar/>
      <HeroSec/>
      <PopProducts/>
      <SuperQuality/>
      <ServicesSec/>
      <SpecialOffer/>
      <CustomerReview/>
      <ContactUs/>
      <Footer/>
    </>
  )
}

export default App
