import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Mail, Phone, Award, BookOpen } from 'lucide-react';

const Team = () => {
  const { language } = useLanguage();

  const teamMembers = [
    {
      name: 'أحمد محمد علي',
      position: 'محامي أول - الشريك المؤسس',
      specialization: 'القضايا التجارية وأنظمة الشركات',
      experience: 15,
      bio: 'محامي متخصص في القضايا التجارية مع خبرة واسعة في تأسيس الشركات والاندماج والاستحواذ. حاصل على ماجستير في القانون التجاري من جامعة الملك سعود.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face',
      email: 'ahmed@lexihub.com',
      phone: '+966501234567',
      linkedin: 'https://linkedin.com/in/ahmed-ali',
      education: [
        'ماجستير القانون التجاري - جامعة الملك سعود',
        'بكالوريوس الحقوق - جامعة الإمام محمد بن سعود'
      ],
      achievements: [
        'عضو الهيئة السعودية للمحامين',
        'محكم معتمد لدى المركز السعودي للتحكيم التجاري',
        'خبير في قانون الشركات السعودي'
      ]
    },
    {
      name: 'فاطمة الزهراء',
      position: 'محامية متخصصة - شريكة',
      specialization: 'الأحوال الشخصية والقضايا الأسرية',
      experience: 12,
      bio: 'محامية متخصصة في قضايا الأحوال الشخصية والقضايا الأسرية مع تركيز خاص على حقوق المرأة والطفل. تتمتع بسمعة ممتازة في حل النزاعات الأسرية.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop&crop=face',
      email: 'fatima@lexihub.com',
      phone: '+966501234568',
      linkedin: 'https://linkedin.com/in/fatima-alzahra',
      education: [
        'ماجستير الأحوال الشخصية - جامعة الأزهر',
        'بكالوريوس الشريعة والقانون - جامعة أم القرى'
      ],
      achievements: [
        'عضو الهيئة السعودية للمحامين',
        'خبيرة في قضايا الأحوال الشخصية',
        'محاضرة في كلية الحقوق'
      ]
    },
    {
      name: 'محمد عبدالرحمن',
      position: 'محامي خبير',
      specialization: 'القضايا الجنائية والعمالية',
      experience: 18,
      bio: 'محامي خبير في القضايا الجنائية والعمالية مع سجل حافل في الدفاع عن المتهمين وحل النزاعات العمالية. خبرة واسعة في المحاكم السعودية.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face',
      email: 'mohamed@lexihub.com',
      phone: '+966501234569',
      linkedin: 'https://linkedin.com/in/mohamed-abdulrahman',
      education: [
        'ماجستير القانون الجنائي - جامعة الملك عبدالعزيز',
        'بكالوريوس الحقوق - جامعة الملك سعود'
      ],
      achievements: [
        'عضو الهيئة السعودية للمحامين منذ 2006',
        'خبير في القضايا الجنائية المعقدة',
        'مستشار قانوني لعدة شركات كبرى'
      ]
    }
  ];

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
            <div className="space-y-16">
              {teamMembers.map((member, index) => (
                <div key={index} className="card-elegant">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Photo and Contact */}
                    <div className="text-center lg:text-right">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-64 h-64 rounded-2xl mx-auto lg:mx-0 object-cover shadow-elegant mb-6"
                      />
                      
                      <div className="space-y-3">
                        <a 
                          href={`mailto:${member.email}`} 
                          className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                        >
                          <Mail className="w-5 h-5" />
                          <span>{member.email}</span>
                        </a>
                        <a 
                          href={`tel:${member.phone}`} 
                          className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                        >
                          <Phone className="w-5 h-5" />
                          <span>{member.phone}</span>
                        </a>
                        <a 
                          href={member.linkedin} 
                          className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-accent/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-smooth"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                        <p className="text-xl text-accent font-medium mb-2">{member.position}</p>
                        <p className="text-lg text-muted-foreground mb-4">{member.specialization}</p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">{member.experience} سنة خبرة</span>
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        
                        <div>
                          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                            <Award className="w-5 h-5 text-accent" />
                            الإنجازات والشهادات
                          </h3>
                          <ul className="space-y-2">
                            {member.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-muted-foreground">
                                • {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;