import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/StarRating';
import { TESTIMONIALS } from '@/constants/data';

export const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 bg-choco">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Our Customers Say
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto">
            Real reviews from real customers who love our freshly baked treats
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-softCream rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Background quote */}
            <div className="absolute top-4 right-4 text-gold/20">
              <Quote className="w-16 h-16" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gold/20"
                  />
                </div>

                <StarRating rating={currentTestimonial.rating} size={20} className="justify-center mb-4" />

                <blockquote className="text-lg md:text-xl text-choco mb-6 italic leading-relaxed">
                  "{currentTestimonial.comment}"
                </blockquote>

                <div className="text-choco font-semibold">
                  {currentTestimonial.name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {currentTestimonial.date}
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
            <ChevronLeft className="w-6 h-6 text-choco" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-cream/80 hover:bg-cream shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6 text-choco" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gold' : 'bg-cream/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};