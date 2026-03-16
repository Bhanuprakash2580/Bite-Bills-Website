import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { TrendingCarousel } from '@/components/home/TrendingCarousel';
import { TopBakeries } from '@/components/home/TopBakeries';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <HeroBanner />

      {/* Search Bar */}
      <SearchBar />

      {/* Categories */}
      <CategoryGrid />

      {/* Trending Products */}
      <TrendingCarousel />

      {/* Top Bakeries */}
      <TopBakeries />

      {/* Customer Testimonials */}
      <TestimonialsSlider />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
}