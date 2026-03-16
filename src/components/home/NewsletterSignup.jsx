import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-cream to-softCream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-6">
              <Mail className="w-8 h-8 text-choco" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-choco mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Stay Sweet with Updates
            </h2>
            <p className="text-choco/70 text-lg leading-relaxed">
              Get exclusive deals, new product launches, and baking tips delivered to your inbox.
              Join our community of dessert lovers!
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-center sm:text-left border-choco/20 focus:border-gold"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="h-12 px-8 bg-gold hover:bg-gold/90 text-choco font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-choco/30 border-t-choco rounded-full animate-spin" />
                  Subscribing...
                </div>
              ) : (
                'Subscribe'
              )}
            </Button>
          </motion.form>

          <AnimatePresence>
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Successfully subscribed! Welcome to the family!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="text-sm text-choco/50 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};