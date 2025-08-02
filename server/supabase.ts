import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxbluzkvpfzkdibuaztp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4Ymx1emt2cGZ6a2RpYnVhenRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTQ0NjUsImV4cCI6MjA2OTQ3MDQ2NX0.NgeKhgmahpLlPuXJHwS4eWhIFRC8GYuxSPnBd-sIwTQ';

export const supabaseServer = createClient(supabaseUrl, supabaseKey);