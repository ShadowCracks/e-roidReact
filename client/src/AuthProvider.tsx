// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabase'; // Import your Supabase client

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check user session on initial load
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    getUser();

    // Listen for changes in auth state
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    // Unsubscribe the listener on cleanup
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

