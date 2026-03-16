import { useEffect, useRef } from 'react';
import { useMember } from '@/integrations';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function AccountPage() {
  const { member, actions } = useMember();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <AnimatedElement>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 text-center">
              My Account
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Manage your profile and preferences
            </p>
          </div>
        </section>
      </AnimatedElement>

      {/* Account Details */}
      <AnimatedElement>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Card */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground">Profile</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p className="text-foreground font-semibold">
                      {member?.profile?.nickname || 
                       `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() || 
                       'Not set'}
                    </p>
                  </div>
                  {member?.profile?.title && (
                    <div>
                      <label className="text-sm text-muted-foreground">Title</label>
                      <p className="text-foreground font-semibold">{member.profile.title}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Contact Card */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground">Contact</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="text-foreground font-semibold">
                      {member?.loginEmail || 'Not set'}
                    </p>
                  </div>
                  {member?.contact?.phones && member.contact.phones.length > 0 && (
                    <div>
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <p className="text-foreground font-semibold">
                        {member.contact.phones[0]}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Account Info Card */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground">Account Info</h2>
                </div>
                <div className="space-y-3">
                  {member?._createdDate && (
                    <div>
                      <label className="text-sm text-muted-foreground">Member Since</label>
                      <p className="text-foreground font-semibold">
                        {new Date(member._createdDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {member?.lastLoginDate && (
                    <div>
                      <label className="text-sm text-muted-foreground">Last Login</label>
                      <p className="text-foreground font-semibold">
                        {new Date(member.lastLoginDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <p className="text-foreground font-semibold">
                      {member?.status || 'Active'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Actions Card */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <LogOut className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground">Actions</h2>
                </div>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </Card>
            </div>

            {/* Profile Photo */}
            {member?.profile?.photo?.url && (
              <AnimatedElement className="mt-8">
                <Card className="p-6">
                  <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                    Profile Photo
                  </h2>
                  <div className="flex justify-center">
                    <Image src={member.profile.photo.url} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" />
                  </div>
                </Card>
              </AnimatedElement>
            )}
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
