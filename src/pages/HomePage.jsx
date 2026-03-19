import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/home/HeroSection'
import FeatureStrip from '../components/home/FeatureStrip'
import BestSellers from '../components/home/BestSellers'
import WhyBiteBills from '../components/home/WhyBiteBills'
import SocialOrderSection from '../components/home/SocialOrderSection'
import NewsletterSection from '../components/home/NewsletterSection'
import ReviewsSection from '../components/home/ReviewsSection'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Nandipet’s Favorite Bakery | Fresh Eggless Cakes & Cookies</title>
        <meta name="description" content="Nandipet’s favorite destination for premium eggless cakes and hand-crafted cookies. Baked fresh on order in Nizamabad." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Bakery",
              "name": "Bite Bills",
              "servesCuisine": "Bakery",
              "areaServed": "Nizamabad",
              "telephone": "+91 7288039532"
            }
          `}
        </script>
      </Helmet>

      <main>
        <HeroSection />
        <FeatureStrip />
        <BestSellers />
        <WhyBiteBills />
        <SocialOrderSection />
        <ReviewsSection />
        <NewsletterSection />
      </main>
    </>
  )
}