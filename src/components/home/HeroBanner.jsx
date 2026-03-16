import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './SearchBar';

export const HeroBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-choco via-darkChoco to-choco flex items-center justify-center overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, gold 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, gold 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            Premium Bakery Experience
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Indulge in Luxury
            <br />
            <span className="text-gold">Cookies & Cakes</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-cream/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Freshly baked premium cookies, cupcakes, and brownies delivered to your doorstep.
            Made with love, finest ingredients, and traditional baking techniques.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-choco font-semibold px-8 py-4 text-lg"
              onClick={() => window.location.href = '/products'}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream hover:text-choco px-8 py-4 text-lg"
              onClick={() => window.location.href = '/bakeries'}
            >
              Explore Bakeries
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-1">2.4K+</div>
              <div className="text-cream/80 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-1">120+</div>
              <div className="text-cream/80 text-sm">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-1">4.9★</div>
              <div className="text-cream/80 text-sm">Average Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating product cards */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-10 hidden lg:block"
        >
          <div className="bg-cream/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=150&h=100&fit=crop&crop=center"
              alt="Chocolate Chip Cookie"
              className="w-32 h-20 object-cover rounded mb-2"
            />
            <div className="text-xs text-choco font-medium">Premium Cookies</div>
            <div className="text-xs text-gold">★★★★★</div>
          </div>
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-10 hidden lg:block"
          style={{ animationDelay: '1s' }}
        >
          <div className="bg-cream/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=100&fit=crop&crop=center"
              alt="Red Velvet Cupcake"
              className="w-32 h-20 object-cover rounded mb-2"
            />
            <div className="text-xs text-choco font-medium">Fresh Cupcakes</div>
            <div className="text-xs text-gold">★★★★★</div>
          </div>
        </motion.div>
      </div>

      {/* Search bar positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cream to-transparent pt-20 pb-10">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};