import { createClient } from './supabase';
import type { Database } from './supabase/types';

export class SupabaseAuthService {
  private supabase = createClient();

  async signUp(email: string, password: string, name?: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        },
      },
    });

    if (error) {
      return { user: null, error };
    }

    // Create user profile in users table
    if (data.user) {
      const { error: profileError } = await this.supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          name: name || null,
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }
    }

    return { user: data.user, error: null };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data.user, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async signInWithProvider(provider: 'github' | 'google') {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    return { session: data.session, error };
  }

  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    return { user: data.user, error };
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}

export const supabaseAuth = new SupabaseAuthService();