export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name: string
          category: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          case_type: string
          consultation_type: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          preferred_date: string | null
          preferred_time: string | null
          status: string | null
        }
        Insert: {
          case_type: string
          consultation_type?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
        }
        Update: {
          case_type?: string
          consultation_type?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
        }
        Relationships: []
      }
      contact_forms: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string
          email: string
          facebook: string | null
          id: string
          linkedin: string | null
          map_embed: string | null
          office_hours: string | null
          phone: string
          twitter: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address: string
          email: string
          facebook?: string | null
          id?: string
          linkedin?: string | null
          map_embed?: string | null
          office_hours?: string | null
          phone: string
          twitter?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string
          email?: string
          facebook?: string | null
          id?: string
          linkedin?: string | null
          map_embed?: string | null
          office_hours?: string | null
          phone?: string
          twitter?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string | null
          id: string
          order_index: number | null
          question: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string | null
          id?: string
          order_index?: number | null
          question: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string | null
          id?: string
          order_index?: number | null
          question?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          apply_email: string | null
          benefits: string[] | null
          created_at: string
          description: string
          employment_type: string | null
          experience_level: string | null
          id: string
          is_active: boolean | null
          position: string
          requirements: string[] | null
          salary_range: string | null
          updated_at: string
        }
        Insert: {
          apply_email?: string | null
          benefits?: string[] | null
          created_at?: string
          description: string
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          position: string
          requirements?: string[] | null
          salary_range?: string | null
          updated_at?: string
        }
        Update: {
          apply_email?: string | null
          benefits?: string[] | null
          created_at?: string
          description?: string
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          position?: string
          requirements?: string[] | null
          salary_range?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      page_contents: {
        Row: {
          content: string
          id: string
          image_url: string | null
          meta_description: string | null
          page_key: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          id?: string
          image_url?: string | null
          meta_description?: string | null
          page_key: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          id?: string
          image_url?: string | null
          meta_description?: string | null
          page_key?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          detailed_description: string | null
          duration: string | null
          icon: string | null
          id: string
          image: string | null
          price_range: string | null
          required_documents: string[] | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          detailed_description?: string | null
          duration?: string | null
          icon?: string | null
          id?: string
          image?: string | null
          price_range?: string | null
          required_documents?: string[] | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          detailed_description?: string | null
          duration?: string | null
          icon?: string | null
          id?: string
          image?: string | null
          price_range?: string | null
          required_documents?: string[] | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          education: string[] | null
          email: string | null
          id: string
          linkedin: string | null
          name: string
          phone: string | null
          photo: string | null
          position: string
          slug: string
          specialization: string
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          education?: string[] | null
          email?: string | null
          id?: string
          linkedin?: string | null
          name: string
          phone?: string | null
          photo?: string | null
          position: string
          slug: string
          specialization: string
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          education?: string[] | null
          email?: string | null
          id?: string
          linkedin?: string | null
          name?: string
          phone?: string | null
          photo?: string | null
          position?: string
          slug?: string
          specialization?: string
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          case_type: string
          client_name: string
          created_at: string | null
          id: string
          is_anonymous: boolean | null
          is_featured: boolean | null
          rating: number | null
          testimonial: string
        }
        Insert: {
          case_type: string
          client_name: string
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
          testimonial: string
        }
        Update: {
          case_type?: string
          client_name?: string
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
          testimonial?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
