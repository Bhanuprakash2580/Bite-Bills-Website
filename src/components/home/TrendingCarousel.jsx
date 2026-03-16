import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/StarRating';
import { MOCK_PRODUCTS } from '@/constants/data';

export const TrendingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trendingProducts = MOCK_PRODUCTS.filter(product => product.is_trending);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [trendingProducts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (trendingProducts.length === 0) return null;

  const currentProduct = trendingProducts[currentIndex];

  return (
    <section className="py-16 bg-softCream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-gold" />
            <Badge variant="secondary" className="bg-gold/20 text-gold">
              Trending Now
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-choco mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Most Popular Picks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what everyone's baking about - our trending favorites
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-cream shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={currentProduct.image_url}
                      alt={currentProduct.name}
                      className="w-full h-80 md:h-full object-cover"
                    />
                    {currentProduct.discount_percent > 0 && (
                      <Badge className="absolute top-4 left-4 bg-gold text-choco font-semibold">
                        {currentProduct.discount_percent}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-2">
                        {currentProduct.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-choco mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {currentProduct.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {currentProduct.bakery_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <StarRating rating={currentProduct.rating} size={16} />
                      <span className="text-sm text-muted-foreground">
                        ({currentProduct.review_count} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gold">
                        ₹{currentProduct.price}
                      </span>
                      {currentProduct.old_price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{currentProduct.old_price}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      {currentProduct.description}
                    </p>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-choco hover:bg-darkChoco text-cream"
                        onClick={() => window.location.href = `/products/${currentProduct.id}`}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="border-choco text-choco hover:bg-choco hover:text-cream"
                        onClick={() => window.location.href = `/products?category=${currentProduct.category}`}
                      >
                        Shop {currentProduct.category}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-cream/80 hover:bg-cream shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-cream/80 hover:bg-cream shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {trendingProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gold' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};