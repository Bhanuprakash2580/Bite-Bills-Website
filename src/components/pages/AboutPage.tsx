import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            About Bite Bills
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting moments of joy through freshly baked goodness since our founding.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                Bite Bills was born from a passion for creating extraordinary baked goods that bring people together.
                What started as a small family kitchen has grown into a beloved bakery known for our commitment to
                quality, freshness, and that perfect balance of tradition and innovation.
              </p>
              <p className="mb-6">
                Every morning, our skilled bakers begin their craft with the finest ingredients, carefully selected
                to ensure each cookie, cupcake, brownie, and cake meets our exacting standards. We believe that
                baking is not just about creating delicious treats—it's about creating memories.
              </p>
              <p>
                Our tagline "Luxury You Can Taste" reflects our dedication to providing an elevated baking experience
                that feels indulgent yet accessible. From our signature Butter Cookies to our decadent Chocolate Cakes,
                every item is baked fresh daily with love and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-card rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-foreground mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on the quality of our ingredients or our baking standards.
              </p>
            </div>
            <div className="text-center p-8 bg-card rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-foreground mb-4">Made with Love</h3>
              <p className="text-muted-foreground">
                Every item is handcrafted with care and attention to detail.
              </p>
            </div>
            <div className="text-center p-8 bg-card rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-foreground mb-4">Fresh Daily</h3>
              <p className="text-muted-foreground">
                Our commitment to freshness means everything is baked fresh every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            Meet Our Baking Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Our passionate team of bakers brings years of experience and creativity to every creation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">👩‍🍳</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Master Baker</h3>
              <p className="text-muted-foreground">15+ years of baking excellence</p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Cake Decorator</h3>
              <p className="text-muted-foreground">Artistry in every design</p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🍪</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Cookie Specialist</h3>
              <p className="text-muted-foreground">Perfection in every bite</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}