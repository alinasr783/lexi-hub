import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Mail, Phone } from 'lucide-react';

export const TeamSection = () => {
  const { t } = useLanguage();

  // Placeholder team data - will be dynamic from Supabase later
  const teamMembers = [
    {
      name: 'أحمد محمد علي',
      position: 'محامي أول - القضايا التجارية',
      experience: '15 سنة خبرة',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      email: 'ahmed@lexihub.com',
      phone: '+966501234567'
    },
    {
      name: 'فاطمة الزهراء',
      position: 'محامية متخصصة - الأحوال الشخصية',
      experience: '12 سنة خبرة',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      email: 'fatima@lexihub.com',
      phone: '+966501234568'
    },
    {
      name: 'محمد عبدالرحمن',
      position: 'محامي خبير - القضايا الجنائية',
      experience: '18 سنة خبرة',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      email: 'mohamed@lexihub.com',
      phone: '+966501234569'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('ourTeam')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('teamDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="card-elegant text-center group">
              <div className="relative mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-elegant group-hover:shadow-glow transition-smooth"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-accent font-medium mb-2">{member.position}</p>
              <p className="text-muted-foreground mb-4">{member.experience}</p>
              
              <div className="flex justify-center gap-3">
                <a href={`mailto:${member.email}`} className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={`tel:${member.phone}`} className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};