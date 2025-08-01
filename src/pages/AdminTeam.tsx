import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Scale, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Linkedin
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  position: string;
  specialization: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  years_experience?: number;
  created_at: string;
}

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadTeamMembers();
  }, []);

  const checkUser = () => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
  };

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل أعضاء الفريق",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العضو؟')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف عضو الفريق بنجاح",
      });
      
      loadTeamMembers();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف عضو الفريق",
        variant: "destructive",
      });
    }
  };

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Scale className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للوحة الإدارة
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-xl">إدارة الفريق</h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate('/admin/team/new')}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة عضو جديد
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في أعضاء الفريق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={member.photo} />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="outline">{member.specialization}</Badge>
                
                {member.years_experience && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">سنوات الخبرة: </span>
                    {member.years_experience} سنة
                  </p>
                )}

                {member.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {member.bio}
                  </p>
                )}

                <div className="flex flex-col gap-2 text-sm">
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                  )}
                  {member.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">LinkedIn</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/team/${member.slug}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    عرض
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/team/edit/${member.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTeamMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeamMembers.length === 0 && (
          <div className="text-center py-12">
            <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا يوجد أعضاء فريق</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'لم يتم العثور على أعضاء يطابقون البحث' : 'لم يتم إضافة أي أعضاء بعد'}
            </p>
            <Button onClick={() => navigate('/admin/team/new')}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة أول عضو
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminTeam;