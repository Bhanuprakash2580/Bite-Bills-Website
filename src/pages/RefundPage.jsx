import { Helmet } from 'react-helmet-async'

export default function RefundPage() {
  return (
    <>
      <Helmet>
        <title>Refund Policy | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite font-outfit">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-12 text-gold">Refund Policy 🍩</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/70">
            <section className="bg-darkBg2 p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-2">Can I cancel my order?</h2>
              <p>Yes. You can cancel your order and receive a full refund if the cancellation is made at least <strong>2 hours</strong> before the scheduled delivery or pickup time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 capitalize">Refund eligibility</h2>
              <p>As our products are perishable food items, we cannot offer returns or refunds once the product has been delivered/picked up, unless:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The product received is damaged (e.g. smashed during transit).</li>
                <li>The item received is significantly different from what was ordered.</li>
                <li>The order was not delivered at all.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Refund Process</h2>
              <p>To request a refund, please send a photo of the product to our WhatsApp (+91 7288039532) within 1 hour of receiving it. Once approved, refunds are processed back to the original payment method within 5-7 business days.</p>
            </section>

            <p className="text-sm opacity-50 italic pt-12 font-medium">Bite Bills — Bite Bills Bakery</p>
          </div>
        </div>
      </main>
    </>
  )
}
