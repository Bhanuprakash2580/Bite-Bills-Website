import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const faqs = [
  {
    q: "How do I place an order?",
    a: "You can order directly through our website, or Click the WhatsApp icon to chat with us for custom requests."
  },
  {
    q: "Do you deliver to Nizamabad city?",
    a: "Yes! We deliver to Nizamabad for a standard charge of ₹100. Delivery usually takes 3-4 hours as we bake fresh."
  },
  {
    q: "Are all your products eggless?",
    a: "Absolutely. 100% of our cookies and cakes are eggless, crafted with special moisture-locking techniques."
  },
  {
    q: "Can I cancel my order?",
    a: "Cancellation is possible up to 2 hours before the scheduled delivery time for a full refund."
  },
  {
    q: "Do you take bulk orders for parties?",
    a: "Yes! We love catering for events. Please contact us via WhatsApp at least 2 days in advance for bulk orders."
  }
]

export default function HelpPage() {
  return (
    <>
      <Helmet>
        <title>Help & Support | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-syne font-bold mb-4 text-gold">Help & Support 🍦</h1>
            <p className="text-white/60">Find answers to common questions about your sweet orders.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-darkBg2 p-6 md:p-8 rounded-2xl border border-white/5"
              >
                <h3 className="text-lg font-bold text-white mb-2 font-syne">Q: {faq.q}</h3>
                <p className="text-white/60 leading-relaxed">A: {faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-gold/10 p-8 rounded-3xl text-center border border-gold/20">
            <h2 className="text-2xl font-syne font-bold mb-4">Still have questions?</h2>
            <p className="mb-8 opacity-80 font-medium">Our support team is active on WhatsApp from 9:00 AM to 9:00 PM.</p>
            <a 
              href="https://wa.me/917288039532" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-4 bg-gold text-darkBg font-bold rounded-full hover:bg-white transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
