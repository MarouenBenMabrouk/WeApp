import { createClient } from './supabase/client';
import type { Database } from './supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
type ProjectFile = Database['public']['Tables']['project_files']['Row'];
type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];
type Document = Database['public']['Tables']['documents']['Row'];

export class DatabaseService {
  private supabase = createClient();

  // Project operations
  async createProject(project: ProjectInsert): Promise<{ data: Project | null; error: any }> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    return { data, error };
  }

  async getProjects(userId: string): Promise<{ data: Project[] | null; error: any }> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    return { data, error };
  }

  async getProject(id: string): Promise<{ data: Project | null; error: any }> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }

  async updateProject(id: string, updates: ProjectUpdate): Promise<{ data: Project | null; error: any }> {
    const { data, error } = await this.supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  async deleteProject(id: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', id);

    return { error };
  }

  // Project files operations
  async getProjectFiles(projectId: string): Promise<{ data: ProjectFile[] | null; error: any }> {
    const { data, error } = await this.supabase
      .from('project_files')
      .select('*')
      .eq('project_id', projectId)
      .order('file_path');

    return { data, error };
  }

  async saveProjectFile(file: Omit<ProjectFile, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: ProjectFile | null; error: any }> {
    const { data, error } = await this.supabase
      .from('project_files')
      .upsert({
        ...file,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    return { data, error };
  }

  async deleteProjectFile(id: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('project_files')
      .delete()
      .eq('id', id);

    return { error };
  }

  // Chat messages operations
  async getChatMessages(projectId: string): Promise<{ data: ChatMessage[] | null; error: any }> {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at');

    return { data, error };
  }

  async saveChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>): Promise<{ data: ChatMessage | null; error: any }> {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .insert(message)
      .select()
      .single();

    return { data, error };
  }

  // Document operations
  async saveDocument(document: Omit<Document, 'id' | 'created_at'>): Promise<{ data: Document | null; error: any }> {
    const { data, error } = await this.supabase
      .from('documents')
      .insert(document)
      .select()
      .single();

    return { data, error };
  }

  async getDocuments(projectId: string): Promise<{ data: Document[] | null; error: any }> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at');

    return { data, error };
  }

  async deleteDocument(id: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('documents')
      .delete()
      .eq('id', id);

    return { error };
  }

  // File storage operations
  async uploadFile(bucket: string, path: string, file: File): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file);

    return { data, error };
  }

  async downloadFile(bucket: string, path: string): Promise<{ data: Blob | null; error: any }> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(path);

    return { data, error };
  }

  async deleteFile(bucket: string, path: string): Promise<{ error: any }> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([path]);

    return { error };
  }

  async getPublicUrl(bucket: string, path: string): Promise<string> {
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}

export const db = new DatabaseService();