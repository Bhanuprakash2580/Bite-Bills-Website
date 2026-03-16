import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/home/HeroSection'
import FeatureStrip from '../components/home/FeatureStrip'
import BestSellers from '../components/home/BestSellers'
import WhyBiteBills from '../components/home/WhyBiteBills'
import HowToOrder from '../components/home/HowToOrder'
import DeliveryInfoSection from '../components/home/DeliveryInfoSection'
import SocialOrderSection from '../components/home/SocialOrderSection'
import NewsletterSection from '../components/home/NewsletterSection'
// import ReviewsSection from '../components/home/ReviewsSection' // REVIEWS DISABLED FOR LAUNCH

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Bite Bills | Fresh Cookies Delivered to Your Door</title>
        <meta name="description" content="Handcrafted, premium cookies baked fresh on order. Free delivery within 5km of our bakery!" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Bakery",
              "name": "Bite Bills",
              "servesCuisine": "Bakery",
              "areaServed": "40km radius",
              "telephone": "+91 XXXXXXXXXX"
            }
          `}
        </script>
      </Helmet>

      <main>
        <HeroSection />
        <FeatureStrip />
        <BestSellers />
        <WhyBiteBills />
        <HowToOrder />
        <DeliveryInfoSection />
        <SocialOrderSection />
        {/* <ReviewsSection /> */}
        <NewsletterSection />
      </main>
    </>
  )
}