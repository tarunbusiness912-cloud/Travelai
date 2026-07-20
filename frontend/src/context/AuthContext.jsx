import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toAppUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const applySession = (session) => {
      if (!mounted) return;

      if (session?.user) {
        const appUser = toAppUser(session.user, session);
        setUser(appUser);
        localStorage.setItem('travelai_user', JSON.stringify(appUser));
      } else {
        setUser(null);
        localStorage.removeItem('travelai_user');
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      applySession(data.session);
      if (mounted) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('travelai_user', JSON.stringify(userData));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('travelai_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
