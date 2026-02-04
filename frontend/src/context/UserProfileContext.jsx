import { createContext, useContext, useState, useEffect } from 'react';
import { UserAuth } from './AuthContext';

const UserProfileContext = createContext({
  profileData: null,
  setProfileData: () => {},
  loading: true,
  error: null
});

export const UserProfileProvider = ({ children }) => {
  const { session, user } = UserAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/users/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');
        const responseData = await res.json();
        const data = Array.isArray(responseData) ? responseData[0] : responseData;
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <UserProfileContext.Provider value={{ profileData, setProfileData, loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);