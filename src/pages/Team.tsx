import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Mail, Phone, Award, BookOpen } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  specialization: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  education?: string[];
  years_experience?: number;
  created_at: string;
}

const Team = () => {
  const { language } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <main className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="text-center lg:text-right">
                      <div className="w-64 h-64 bg-muted rounded-2xl mx-auto lg:mx-0 mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-12 bg-muted rounded-lg"></div>
                        <div className="h-12 bg-muted rounded-lg"></div>
                        <div className="h-12 bg-muted rounded-lg"></div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                      <div className="h-8 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded w-1/2"></div>
                      <div className="h-20 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">فريق العمل</h1>
              <p className="text-xl lg:text-2xl text-white/90">
                محامون متخصصون مع سنوات من الخبرة في مختلف فروع القانون
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {teamMembers.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">لا يوجد أعضاء فريق</h3>
                  <p className="text-muted-foreground">لم يتم إضافة أعضاء فريق بعد</p>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                {teamMembers.map((member) => (
                  <div key={member.id} className="card-elegant">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Photo and Contact */}
                      <div className="text-center lg:text-right">
                        <img 
                          src={member.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face'} 
                          alt={member.name}
                          className="w-64 h-64 rounded-2xl mx-auto lg:mx-0 object-cover shadow-elegant mb-6"
                        />
                        
                        <div className="space-y-3">
                          {member.email && (
                            <a 
                              href={`mailto:${member.email}`} 
                              className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                            >
                              <Mail className="w-5 h-5" />
                              <span>{member.email}</span>
                            </a>
                          )}
                          {member.phone && (
                            <a 
                              href={`tel:${member.phone}`} 
                              className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                            >
                              <Phone className="w-5 h-5" />
                              <span>{member.phone}</span>
                            </a>
                          )}
                          {member.linkedin && (
                            <a 
                              href={member.linkedin} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                            >
                              <Linkedin className="w-5 h-5" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                          <p className="text-xl text-accent font-medium mb-2">{member.position}</p>
                          <p className="text-lg text-muted-foreground mb-4">{member.specialization}</p>
                          {member.years_experience && (
                            <p className="text-muted-foreground">
                              <span className="font-medium">{member.years_experience} سنة خبرة</span>
                            </p>
                          )}
                        </div>
                        
                        {member.bio && (
                          <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                        )}
                        
                        {member.education && member.education.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                              <BookOpen className="w-5 h-5 text-accent" />
                              التعليم
                            </h3>
                            <ul className="space-y-2">
                              {member.education.map((edu, idx) => (
                                <li key={idx} className="text-muted-foreground">
                                  • {edu}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;