import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ConsultationSettings {
  id?: string;
  hero_title: string;
  hero_description: string;
  consultation_types: any[];
  time_slots: any[];
  case_types: any[];
  booking_instructions?: string;
  is_active: boolean;
}

export const useConsultationSettings = () => {
  const [settings, setSettings] = useState<ConsultationSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('consultation_page_settings')
        .select('*')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          id: data.id,
          hero_title: data.hero_title,
          hero_description: data.hero_description,
          consultation_types: Array.isArray(data.consultation_types) ? data.consultation_types : [],
          time_slots: Array.isArray(data.time_slots) ? data.time_slots as any[] : [],
          case_types: Array.isArray(data.case_types) ? data.case_types as any[] : [],
          booking_instructions: data.booking_instructions || '',
          is_active: data.is_active || true
        });
      } else {
        setSettings(null);
      }
    } catch (err: any) {
      console.error('Error fetching consultation settings:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<ConsultationSettings>) => {
    try {
      setIsLoading(true);
      
      if (settings?.id) {
        // Update existing
        const { error } = await supabase
          .from('consultation_page_settings')
          .update(updates)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('consultation_page_settings')
          .insert([{ ...updates, is_active: true }]);

        if (error) throw error;
      }

      await fetchSettings();
      return { success: true };
    } catch (err: any) {
      console.error('Error updating consultation settings:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    refetch: fetchSettings
  };
};