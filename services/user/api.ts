import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const userAPI = {
  getUserInfo: async (id: string) => {
    const supabase: SupabaseClient<Database> = createClient();

    const { data } = await supabase
      .from('users')
      .select('name')
      .eq('id', id)
      .limit(1)
      .single();

    return data;
  },
};

export default userAPI;
