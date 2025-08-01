import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServer = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseServer
        .from('consultation_bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch consultation bookings" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation bookings" });
    }
  } else if (req.method === 'POST') {
    try {
      const { data, error } = await supabaseServer
        .from('consultation_bookings')
        .insert(req.body)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(400).json({ error: "Failed to create consultation booking" });
      }
      
      res.status(201).json(data);
    } catch (error) {
      console.error('Server error:', error);
      res.status(400).json({ error: "Invalid consultation booking data" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}