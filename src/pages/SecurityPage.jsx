import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function SecurityPage() {
  return (
    <>
      <Helmet>
        <title>Security | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-syne font-bold mb-12 text-gold"
          >
            Your Security 🛡️
          </motion.h1>

          <div className="prose prose-invert max-w-none text-lg leading-relaxed text-white/80 space-y-8">
            <section className="bg-darkBg2 p-8 rounded-3xl border border-white/5">
              <h2 className="text-white font-syne font-bold">Safe Payments</h2>
              <p>
                We use Razorpay — India’s leading payment gateway — to process all online transactions. Your credit card, UPI, and bank details are encrypted and never stored on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-white font-syne font-bold">Data Protection</h2>
              <p>
                Your personal information (name, address, phone) is used strictly for delivery purposes. We do not sell your data to third parties. Our website uses SSL encryption to ensure that every byte sent is secure.
              </p>
            </section>

            <section>
              <h2 className="text-white font-syne font-bold">Account Security</h2>
              <p>
                We use Supabase Auth for secure handling of user accounts. We recommend using a strong password and not sharing your login credentials with anyone.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
