import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/constants/data';

export const CategoryGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleCategoryClick = (category) => {
    window.location.href = `/products?category=${encodeURIComponent(category.parentCategory)}`;
  };

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-choco mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of freshly baked premium cookies, cupcakes, and brownies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category)}
              className="bg-softCream rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-choco/10"
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>
                <h3 className="font-semibold text-choco mb-1 group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.itemCount} items
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};