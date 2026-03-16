import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Products, ProductReviews } from '@/entities';
import { getBakeryImage } from '@/lib/utils';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Products | null>(null);
  const [reviews, setReviews] = useState<ProductReviews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    if (id) {
      loadProductData();
    }
  }, [id]);

  const loadProductData = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const [productData, reviewsResult] = await Promise.all([
        BaseCrudService.getById<Products>('products', id),
        BaseCrudService.getAll<ProductReviews>('productreviews', {}, { limit: 50 })
      ]);
      
      setProduct(productData);
      
      // Filter reviews for this product
      const productReviews = reviewsResult.items.filter(
        (r) => r.productName?.toLowerCase() === productData?.itemName?.toLowerCase()
      );
      setReviews(productReviews);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    await cartActions.addToCart({
      collectionId: 'products',
      itemId: product._id,
      quantity
    });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewText || !reviewerName) return;

    setIsSubmittingReview(true);
    try {
      await BaseCrudService.create<ProductReviews>('productreviews', {
        _id: crypto.randomUUID(),
        reviewText,
        reviewerName,
        rating,
        productName: product.itemName,
        reviewDate: new Date().toISOString()
      });
      
      setReviewText('');
      setReviewerName('');
      setRating(5);
      
      // Reload reviews
      await loadProductData();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[500px]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center min-h-[500px]">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>

      {/* Product Details */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg group cursor-pointer" onClick={() => setIsImageZoomed(true)}>
              <Image
                src={getBakeryImage(product)}
                alt={product.itemName || 'Product'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width={600}
              />
              {product.category && (
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                  {product.category}
                </div>
              )}
              {/* Zoom indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-sm font-medium">🔍 Click to zoom</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                {product.itemName}
              </h1>

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-4xl font-bold text-primary mb-6">
                {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.itemDescription}
                </p>
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ingredients</h3>
                  <p className="text-muted-foreground">
                    {product.ingredients}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={addingItemId === product._id}
                  className="bg-primary text-primary-foreground hover:bg-dark-chocolate flex-1"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const message = `Hi! I'd like to order ${product.itemName} (${formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)})`;
                    window.open(`https://wa.me/9199999999993?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex-1"
                >
                  <span className="mr-2">📱</span>
                  Order via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
            Customer Reviews
          </h2>

          {/* Review Form */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Your Name
                </label>
                <Input
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 cursor-pointer transition-colors ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Your Review
                </label>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this product"
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmittingReview}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </Card>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card key={review._id} className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (review.rating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">{review.reviewText}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      {review.reviewerName}
                    </span>
                    {review.reviewDate && (
                      <span className="text-muted-foreground">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </section>

      {/* Image Zoom Modal */}
      {isImageZoomed && product && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={getBakeryImage(product)}
              alt={product.itemName || 'Product'}
              className="max-w-full max-h-full object-contain"
              width={800}
            />
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
