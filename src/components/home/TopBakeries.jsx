import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/StarRating';
import { BAKERIES } from '@/constants/data';

export const TopBakeries = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
            Top Rated Bakeries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best bakeries in your area, handpicked for quality and taste
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BAKERIES.map((bakery) => (
            <motion.div
              key={bakery.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-softCream rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={bakery.image}
                  alt={bakery.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gold text-choco font-semibold">
                    {bakery.rating}★
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-choco mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {bakery.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {bakery.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {bakery.delivery_time}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={bakery.rating} size={14} />
                  <span className="text-sm text-muted-foreground">
                    ({bakery.review_count} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bakery.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full bg-choco hover:bg-darkChoco text-cream"
                  onClick={() => window.location.href = `/bakery/${bakery.id}`}
                >
                  View Bakery
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-choco text-choco hover:bg-choco hover:text-cream"
            onClick={() => window.location.href = '/bakeries'}
          >
            View All Bakeries
          </Button>
        </motion.div>
      </div>
    </section>
  );
};