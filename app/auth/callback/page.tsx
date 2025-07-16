'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/signin?error=callback_error');
        return;
      }

      if (data.session) {
        // Create user profile if it doesn't exist
        const { data: profile } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.session.user.id)
          .single();

        if (!profile) {
          await supabase
            .from('users')
            .insert({
              id: data.session.user.id,
              email: data.session.user.email!,
              name: data.session.user.user_metadata?.name || data.session.user.user_metadata?.full_name || null,
              avatar_url: data.session.user.user_metadata?.avatar_url || null,
            });
        }

        router.push('/dashboard');
      } else {
        router.push('/auth/signin');
      }
    };

    handleAuthCallback();
  }, [router, supabase.auth]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white">Completing authentication...</p>
      </div>
    </div>
  );
}