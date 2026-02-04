const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create a function to get a client with user's token
const getSupabaseClient = (userToken) => {
  if (userToken) {
    return createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    });
  }
  return createClient(supabaseUrl, supabaseKey);
};

class userService {
  static async updateProfile(id, profileData, userToken) {
    const supabase = getSupabaseClient(userToken);
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: id,
        ...profileData,
        updated_at: new Date()
      })
      .select('*');
    
    if (error) {
      console.error('Supabase upsert error:', error);
      throw new Error(error.message);
    }
    return data;
  }

  static async getEmail(id, userToken) {
    const supabase = getSupabaseClient(userToken);
    const { data, error } = await supabase
      .from('auth.users')
      .select('email')
      .eq('id', id);
  
    if (error) {
      console.error('Supabase get email error:', error);
      throw new Error(error.message);
    }
    return data?.email;
  }
  
  static async getProfile(id, userToken) {
    const supabase = getSupabaseClient(userToken);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id);

    if (error) {
      console.error('Supabase get profile error:', error);
      throw new Error(error.message);
    }
    return data;
  }
}

module.exports = userService;