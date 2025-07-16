import { createSupabaseClient } from './supabase';
import { AuthError, User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export class SupabaseAuth {
  private supabase = createSupabaseClient();

  async signUp(email: string, password: string, name?: string): Promise<AuthResponse> {
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

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { user: data.user, error };
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
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

  onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  }
}

export const supabaseAuth = new SupabaseAuth();