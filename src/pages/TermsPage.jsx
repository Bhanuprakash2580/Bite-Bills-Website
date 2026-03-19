import { Helmet } from 'react-helmet-async'

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite font-outfit">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-12 text-gold">Terms of Service 📜</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/70">
            <p>Welcome to Bite Bills! By placing an order, you agree to the following terms:</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Freshness Guarantee</h2>
              <p>We bake strictly on order. While we aim for perfection, slight variations in appearance may occur as all products are handcrafted in our local kitchen.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Pricing & Payment</h2>
              <p>All prices are listed in INR. For online orders, payment must be made in full through our secure gateway. For WhatsApp orders, payment is due upon delivery.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Delivery Responsibility</h2>
              <p>Please ensure someone is available at the provided delivery address. In case of no response, our rider will wait for 10 minutes before returning the package to our kitchen. Re-delivery will incur a secondary charge.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Allergies</h2>
              <p>Our products are 100% eggless. However, they are processed in a kitchen that handles nuts, dairy, and gluten. Please inform us of any severe allergies before ordering.</p>
            </section>

            <p className="text-xs pt-12 border-t border-white/10 opacity-50 italic">Last updated: March 2024</p>
          </div>
        </div>
      </main>
    </>
  )
}
