import { Helmet } from 'react-helmet-async'

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-12 text-gold">Privacy Policy 🔐</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-white/70">
            <p>At Bite Bills, your privacy is as important to us as our secret recipes.</p>

            <h2 className="text-xl font-bold text-white uppercase tracking-wider">What We Collect</h2>
            <p>We collect your Name, Phone Number, and Delivery Address to process your orders. If you use Google Login, we receive your email address and profile name.</p>

            <h2 className="text-xl font-bold text-white uppercase tracking-wider">How We Use It</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To deliver your warm cookies and cakes.</li>
              <li>To send order updates via WhatsApp or Email.</li>
              <li>To respond to your support requests.</li>
            </ul>

            <h2 className="text-xl font-bold text-white uppercase tracking-wider">Third Parties</h2>
            <p>We use Razorpay for payments and Supabase for cloud storage. These partners are compliant with global security standards. We NEVER sell or trade your data.</p>

            <p className="text-xs italic pt-12 border-t border-white/10 opacity-50">Last updated: March 2024 | Bite Bills Our Bakery</p>
          </div>
        </div>
      </main>
    </>
  )
}
