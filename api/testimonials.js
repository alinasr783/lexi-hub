import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServer = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let query = supabaseServer
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (req.query.featured === 'true') {
        query = query.eq('is_featured', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch testimonials" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}