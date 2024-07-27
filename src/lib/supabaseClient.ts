import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqtjsnhskrwjgdlnauos.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdGpzbmhza3J3amdkbG5hdW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwOTc5ODIsImV4cCI6MjAzNzY3Mzk4Mn0.kUsmB0GnI0l37WnCCdw8f8CQqaG0qXMz_Rz7lMILNI0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
