import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const posts = [
  {
    id: 1,
    title: "5 Reasons to choose eggless cakes for your next party",
    excerpt: "Eggless doesn't mean tasteless. Discover why Nizamabad is falling in love with our moisture-rich recipes...",
    date: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "How we bake fresh daily locally",
    excerpt: "A behind-the-scenes look at our early morning rituals, from kneading dough to the first warm batches...",
    date: "Mar 10, 2024",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The secret to our perfectly gooey cookies",
    excerpt: "It's all in the butter temperature (and a lot of love). We reveal the science behind our texture...",
    date: "Mar 05, 2024",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop"
  }
]

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Bakery Blog | Bite Bills</title>
        <meta name="description" content="Tips, recipes, and stories from Our Bakery’s Favorite Bakery." />
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-syne font-bold mb-4 text-gold">Bakery Blog 🥖</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Tips, stories, and the secret science behind our sweet treats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-darkBg2 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest">{post.date}</span>
                  <h2 className="text-xl font-syne font-bold mt-2 mb-3 leading-tight group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="text-gold font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Read More <span>→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
