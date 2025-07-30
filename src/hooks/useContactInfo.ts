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
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactInfo = async (updates: Partial<ContactInfo>) => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .update(updates)
        .eq('id', contactInfo?.id)
        .select()
        .single();

      if (error) throw error;
      setContactInfo(data as ContactInfo);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
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