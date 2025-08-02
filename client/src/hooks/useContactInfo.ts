import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  id: string;
  site_name: string;
  phone: string;
  email: string;
  address: string;
  address_link?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  office_hours?: string | null;
  map_embed?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      if (error) throw error;
      setContactInfo(data as ContactInfo);
    } catch (err: any) {
      setError(err?.message || 'حدث خطأ');
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactInfo = async (updates: Partial<ContactInfo>) => {
    try {
      // If no contact info exists, create new record
      if (!contactInfo) {
        const { data, error } = await supabase
          .from('contact_info')
          .insert({
            site_name: updates.site_name || '',
            phone: updates.phone || '',
            email: updates.email || '',
            address: updates.address || '',
            ...updates
          })
          .select()
          .single();

        if (error) throw error;
        setContactInfo(data as ContactInfo);
        return { success: true };
      }

      // Update existing record
      const { data, error } = await supabase
        .from('contact_info')
        .update(updates)
        .eq('id', contactInfo.id)
        .select()
        .single();

      if (error) throw error;
      setContactInfo(data as ContactInfo);
      return { success: true };
    } catch (err) {
      console.error('Update contact info error:', err);
      return { success: false, error: (err as any)?.message || 'حدث خطأ غير متوقع' };
    }
  };

  return {
    contactInfo,
    isLoading,
    error,
    updateContactInfo,
    refetch: fetchContactInfo
  };
};