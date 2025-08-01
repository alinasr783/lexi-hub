import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const TeamSection = () => {
  const { t } = useLanguage();
  const [teamMembers, setTeamMembers] = useState([]);
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('ourTeam')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('teamDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="card-elegant text-center group">
              <div className="relative mb-6">
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-elegant group-hover:shadow-glow transition-smooth"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-accent/10 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-smooth">
                    <span className="text-3xl font-bold text-accent">{member.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-accent font-medium mb-2">{member.position}</p>
              <p className="text-muted-foreground mb-1">{member.specialization}</p>
              {member.years_experience && (
                <p className="text-muted-foreground mb-4">{member.years_experience} سنة خبرة</p>
              )}
              
              <div className="flex justify-center gap-3">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth">
                    <Phone className="w-5 h-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};