import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from '@/hooks/useProducts';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { products } = useProducts();

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const filtered = products
        .filter(product =>
          product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          product.bakery_name.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery, products]);

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (product) => {
    window.location.href = `/products/${product.id}`;
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search for cookies, cupcakes, brownies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full px-6 py-4 pr-24 text-lg bg-cream border-2 border-choco/20 rounded-full focus:border-gold focus:outline-none shadow-lg placeholder:text-muted-foreground"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuery('')}
                className="h-8 w-8 hover:bg-choco/10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={handleSearch}
              className="h-8 w-8 bg-gold hover:bg-gold/90 text-choco rounded-full p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-cream border border-choco/20 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          >
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="w-full px-4 py-3 text-left hover:bg-choco/5 flex items-center gap-3 border-b border-choco/10 last:border-b-0"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium text-choco">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.bakery_name}</div>
                </div>
                <div className="text-gold font-semibold">₹{product.price}</div>
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};