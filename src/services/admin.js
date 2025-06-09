import { supabase } from '../config/supabaseConfig';

export const loginAdmin = async (username, password) => {
  const { data, error } = await supabase
    .from('admin_la_llave')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .maybeSingle(); 

  if (error) {
    console.error('Login fallido:', error);
    return null;
  }

  return data;
};