import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client component helper
export const createSupabaseClient = () => createClientComponentClient();

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          type: 'website' | 'webapp' | 'mobile' | 'saas';
          status: 'generating' | 'completed' | 'error';
          files: any;
          preview_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description: string;
          type: 'website' | 'webapp' | 'mobile' | 'saas';
          status?: 'generating' | 'completed' | 'error';
          files?: any;
          preview_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          type?: 'website' | 'webapp' | 'mobile' | 'saas';
          status?: 'generating' | 'completed' | 'error';
          files?: any;
          preview_url?: string | null;
          updated_at?: string;
        };
      };
      project_files: {
        Row: {
          id: string;
          project_id: string;
          file_path: string;
          content: string;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          file_path: string;
          content: string;
          language: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          file_path?: string;
          content?: string;
          language?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          project_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          content: string;
          file_type: string;
          file_size: number;
          storage_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          content: string;
          file_type: string;
          file_size: number;
          storage_path: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          content?: string;
          file_type?: string;
          file_size?: number;
          storage_path?: string;
        };
      };
    };
  };
};