import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServer = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let query = supabaseServer
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (req.query.published === 'true') {
        query = query.eq('published', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch articles" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}