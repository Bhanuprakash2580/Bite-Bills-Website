import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Products } from '@/entities';
import { getBakeryImage } from '@/lib/utils';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, categoryFilter, sortBy]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Products>('products', {}, { limit: 100 });
      setProducts(result.items);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.itemName?.toLowerCase().includes(query) ||
          p.itemDescription?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.itemName || '').localeCompare(b.itemName || '');
      } else if (sortBy === 'price-low') {
        return (a.itemPrice || 0) - (b.itemPrice || 0);
      } else if (sortBy === 'price-high') {
        return (b.itemPrice || 0) - (a.itemPrice || 0);
      }
      return 0;
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product: Products) => {
    await cartActions.addToCart({
      collectionId: 'products',
      itemId: product._id,
      quantity: 1
    });
  };

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <AnimatedElement>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 text-center">
              Our Menu
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Discover our delicious selection of cookies, cakes, and desserts
            </p>
          </div>
        </section>
      </AnimatedElement>

      {/* Filters Section */}
      <AnimatedElement>
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Products Grid */}
      <AnimatedElement>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="min-h-[500px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <LoadingSpinner />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product._id}
                      className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                          src={getBakeryImage(product)}
                          alt={product.itemName || 'Product'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          width={300}
                        />
                        {product.category && (
                          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                            {product.category}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-1">
                          {product.itemName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.itemDescription}
                        </p>
                        {product.ingredients && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                            {product.ingredients}
                          </p>
                        )}
                        <div className="flex flex-col gap-2">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              disabled={addingItemId === product._id}
                              className="bg-primary text-primary-foreground hover:bg-dark-chocolate flex-1"
                            >
                              {addingItemId === product._id ? 'Adding...' : 'Add'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                const message = `Hi! I'd like to order ${product.itemName}`;
                                window.open(`https://wa.me/9199999999993?text=${encodeURIComponent(message)}`, '_blank');
                              }}
                              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                            >
                              📱
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                    }}
                    className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}

// Animated Element Component
function AnimatedElement({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} animate-reveal`}>
      {children}
    </div>
  );
}
