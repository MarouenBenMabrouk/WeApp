'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import { SupabaseProvider } from '@/components/supabase-provider';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </SessionProvider>
    </SupabaseProvider>
  );
}