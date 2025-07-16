'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabaseAuth } from '@/lib/supabase-auth';

interface SupabaseContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name?: string) => Promise<any>;
  signOut: () => Promise<any>;
  signInWithProvider: (provider: 'github' | 'google') => Promise<any>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    supabaseAuth.getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabaseAuth.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await supabaseAuth.signIn(email, password);
    setLoading(false);
    return result;
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setLoading(true);
    const result = await supabaseAuth.signUp(email, password, name);
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await supabaseAuth.signOut();
    setUser(null);
    setLoading(false);
    return result;
  };

  const signInWithProvider = async (provider: 'github' | 'google') => {
    setLoading(true);
    const result = await supabaseAuth.signInWithProvider(provider);
    setLoading(false);
    return result;
  };

  return (
    <SupabaseContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithProvider,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};