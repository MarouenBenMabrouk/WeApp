/*
  # Initial Schema for AI Project Generator

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches Supabase auth.users id
      - `email` (text, unique, not null)
      - `name` (text, nullable)
      - `avatar_url` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `projects`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `name` (text, not null)
      - `description` (text, not null)
      - `type` (enum: website, webapp, mobile, saas)
      - `status` (enum: generating, completed, error)
      - `files` (jsonb, nullable) - stores file structure
      - `preview_url` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `project_files`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `file_path` (text, not null)
      - `content` (text, not null)
      - `language` (text, not null)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `role` (enum: user, assistant)
      - `content` (text, not null)
      - `created_at` (timestamp)
    
    - `documents`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `name` (text, not null)
      - `content` (text, not null)
      - `file_type` (text, not null)
      - `file_size` (integer, not null)
      - `storage_path` (text, not null)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for project collaboration
*/

-- Create custom types
CREATE TYPE project_type AS ENUM ('website', 'webapp', 'mobile', 'saas');
CREATE TYPE project_status AS ENUM ('generating', 'completed', 'error');
CREATE TYPE message_role AS ENUM ('user', 'assistant');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  type project_type NOT NULL DEFAULT 'website',
  status project_status NOT NULL DEFAULT 'generating',
  files jsonb DEFAULT '{}',
  preview_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_files table
CREATE TABLE IF NOT EXISTS project_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  content text NOT NULL,
  language text NOT NULL DEFAULT 'text',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, file_path)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  role message_role NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  content text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_project_id ON chat_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for projects table
CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for project_files table
CREATE POLICY "Users can read files from own projects"
  ON project_files
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create files in own projects"
  ON project_files
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update files in own projects"
  ON project_files
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete files from own projects"
  ON project_files
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create RLS policies for chat_messages table
CREATE POLICY "Users can read messages from own projects"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = chat_messages.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own projects"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = chat_messages.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create RLS policies for documents table
CREATE POLICY "Users can read documents from own projects"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = documents.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create documents in own projects"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = documents.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete documents from own projects"
  ON documents
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = documents.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_files_updated_at
  BEFORE UPDATE ON project_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();