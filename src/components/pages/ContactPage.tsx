import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Simulate form submission
    setTimeout(() => {
      setMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Get in touch for orders, custom cakes, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 99999999993</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">bitebills@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">Your Area Name</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Instagram</h3>
                    <p className="text-muted-foreground">@bitebills</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <div className="mt-8">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg"
                  onClick={() => window.open('https://wa.me/9199999999993', '_blank')}
                >
                  <span className="mr-2">📱</span>
                  Order via WhatsApp
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[120px]"
                    placeholder="Tell us about your order or inquiry..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-dark-chocolate"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {message && (
                  <p className="text-sm text-green-600 text-center">{message}</p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            Business Hours
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}