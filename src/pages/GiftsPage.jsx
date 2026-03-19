import { Helmet } from 'react-helmet-async'
import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/products/ProductGrid'

export default function GiftsPage() {
  const { products, loading } = useProducts()
  
  // Only show products in the 'gifts' category
  const giftProducts = products?.filter(p => p.category === 'gifts') || []

  return (
    <>
      <Helmet>
        <title>Gift Boxes | Bite Bills</title>
        <meta name="description" content="Send the perfect gift with a customizable box of Our Bakery’s Favorite treats." />
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-syne font-bold mb-4">
              Gifts & Combos 🎁
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From birthday surprises to secret santa, our assorted gift boxes are the perfect way to say "I care." Every box is packed fresh with a lot of love.
            </p>
          </div>

          <ProductGrid 
            products={giftProducts} 
            loading={loading} 
          />
          
        </div>
      </main>
    </>
  )
}