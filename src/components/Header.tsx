import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Phone, Menu, X } from 'lucide-react';
import { useCart, useMember, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { useState } from 'react';

export default function Header() {
  const { itemCount, actions: cartActions } = useCart();
  const { member, isAuthenticated, actions: memberActions } = useMember();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl">🍪</span>
              </div>
              <span className="text-2xl font-heading font-bold text-primary">Bite Bills</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
                Menu
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              {isAuthenticated && (
                <Link to="/account" className="text-foreground hover:text-primary transition-colors font-medium">
                  Account
                </Link>
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Button - Hidden on mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://wa.me/9199999999993', '_blank')}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 hidden sm:flex"
                title="Order via WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={cartActions.toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>

              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.location.href = '/account'}
                >
                  <User className="h-5 w-5" />
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-primary text-primary-foreground hover:bg-dark-chocolate hidden sm:flex">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="sm:hidden"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-sm">
              <div className="px-4 py-6 space-y-4">
                <nav className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Menu
                  </Link>
                  <Link
                    to="/about"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  {isAuthenticated && (
                    <Link
                      to="/account"
                      className="text-foreground hover:text-primary transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Account
                    </Link>
                  )}
                </nav>

                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      window.open('https://wa.me/9199999999993', '_blank');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 justify-start"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Order via WhatsApp
                  </Button>

                  {!isAuthenticated && (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="bg-primary text-primary-foreground hover:bg-dark-chocolate w-full">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Component */}
      <Cart />
    </>
  );
}

function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={actions.closeCart}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-heading font-bold text-foreground">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={actions.closeCart}>
            <span className="text-2xl">&times;</span>
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                  {item.image && (
                    <Image src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => actions.removeFromCart(item)}
                        className="ml-auto text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">
                {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
              </span>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={actions.checkout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
