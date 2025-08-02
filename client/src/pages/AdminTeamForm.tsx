import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from '@/components/ui/image-upload';
import { Scale, ArrowLeft, Save, Plus, X } from 'lucide-react';

interface TeamMemberFormData {
  name: string;
  slug: string;
  position: string;
  specialization: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  linkedin: string;
  years_experience: number;
  education: string[];
}

const AdminTeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [educationInput, setEducationInput] = useState('');
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    slug: '',
    position: '',
    specialization: '',
    bio: '',
    photo: '',
    email: '',
    phone: '',
    linkedin: '',
    years_experience: 0,
    education: []
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }

    if (isEditing) {
      loadTeamMember();
    }
  }, [id, navigate]);

  const loadTeamMember = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          ...data,
          bio: data.bio || '',
          email: data.email || '',
          phone: data.phone || '',
          photo: data.photo || '',
          linkedin: data.linkedin || '',
          specialization: data.specialization || '',
          education: data.education || [],
          years_experience: data.years_experience || 0
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات عضو الفريق",
        variant: "destructive",
      });
      navigate('/admin/team');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = async (name: string): Promise<string> => {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if slug exists
    const { data: existing } = await supabase
      .from('team_members')
      .select('slug')
      .eq('slug', baseSlug)
      .neq('id', id || ''); // Exclude current record if editing
    
    if (!existing || existing.length === 0) {
      return baseSlug;
    }
    
    // If slug exists, add number suffix
    let counter = 1;
    let newSlug = `${baseSlug}-${counter}`;
    
    while (true) {
      const { data: existingNumbered } = await supabase
        .from('team_members')
        .select('slug')
        .eq('slug', newSlug)
        .neq('id', id || '');
      
      if (!existingNumbered || existingNumbered.length === 0) {
        return newSlug;
      }
      
      counter++;
      newSlug = `${baseSlug}-${counter}`;
    }
  };

  const handleInputChange = async (field: keyof TeamMemberFormData, value: string | number | string[]) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    
    // Generate slug when name changes
    if (field === 'name' && value) {
      const newSlug = await generateSlug(value as string);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  };

  const addEducation = () => {
    if (educationInput.trim()) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, educationInput.trim()]
      }));
      setEducationInput('');
    }
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('team_members')
          .update(formData)
          .eq('id', id!);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث بيانات عضو الفريق بنجاح",
        });
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "تم الإنشاء",
          description: "تم إضافة عضو الفريق بنجاح",
        });
      }

      navigate('/admin/team');
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ بيانات عضو الفريق",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
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
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/team')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للفريق
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-xl">
                    {isEditing ? 'تعديل عضو الفريق' : 'إضافة عضو فريق جديد'}
                  </h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="أدخل الاسم الكامل"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">الرابط المخصص</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="سيتم إنشاؤه تلقائياً"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">المنصب *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="مثال: محامي أول"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">التخصص *</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="مثال: القانون التجاري"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="years_experience">سنوات الخبرة</Label>
                  <Input
                    id="years_experience"
                    type="number"
                    value={formData.years_experience}
                    onChange={(e) => handleInputChange('years_experience', parseInt(e.target.value) || 0)}
                    placeholder="عدد سنوات الخبرة"
                    min="0"
                  />
                </div>
                <ImageUpload
                  value={formData.photo}
                  onChange={(url) => handleInputChange('photo', url)}
                  bucket="team-photos"
                  folder="members"
                  label="الصورة الشخصية"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">السيرة الذاتية</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="نبذة عن عضو الفريق وخبراته..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+966 50 000 0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">رابط LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/profile"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المؤهلات العلمية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={educationInput}
                  onChange={(e) => setEducationInput(e.target.value)}
                  placeholder="أدخل المؤهل العلمي"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEducation())}
                />
                <Button type="button" onClick={addEducation}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.education.map((edu, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {edu}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => removeEducation(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 md:flex-none"
            >
              {loading ? (
                <>
                  <Scale className="w-4 h-4 mr-2 animate-pulse" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'تحديث البيانات' : 'إضافة عضو الفريق'}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/team')}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminTeamForm;