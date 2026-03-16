import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-hot-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('newsletter')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') { // unique violation
          toast.success("You're already on our list! 🎉")
        } else {
          throw error
        }
      } else {
        toast.success("Welcome to the Bite Bills family! 🍪")
        setEmail('')
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Try again later.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gold py-20 relative overflow-hidden">
      {/* Decorative text background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
        <h2 className="text-[20vw] font-syne font-bold text-darkBg whitespace-nowrap">
          FRESH COOKIES
        </h2>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-darkBg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-4 tracking-tight">
            Get the inside scoop 🍦
          </h2>
          <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto font-medium">
            Join the waitlist for new flavors, secret menus, and exclusive drops before anyone else.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full border-2 border-darkBg/20 bg-goldLight/20 focus:bg-white focus:border-darkBg outline-none placeholder:text-darkBg/50 text-darkBg font-medium transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-full bg-darkBg text-gold font-bold hover:bg-black transition-colors disabled:opacity-70 whitespace-nowrap shadow-xl"
            >
              {loading ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
          <p className="mt-4 text-xs opacity-60 font-medium">No spam. Only warm, gooey cookie news.</p>
        </motion.div>
      </div>
    </section>
  )
}