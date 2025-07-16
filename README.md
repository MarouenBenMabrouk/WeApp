# AI-Powered Software Project Generation Platform

A comprehensive SaaS platform that allows users to generate full software projects using natural language descriptions, powered by AI and built with modern web technologies.

## Features

- **AI-Powered Project Generation**: Create complete software projects from natural language descriptions
- **Multi-Project Support**: Generate websites, web apps, mobile apps, and SaaS tools
- **In-Browser Code Editor**: Monaco Editor with syntax highlighting and IntelliSense
- **Live Preview**: Real-time preview of generated projects
- **AI Chat Interface**: Refine and update code through conversational AI
- **Document Upload**: Upload specifications and files to guide AI generation
- **User Authentication**: Secure authentication with Supabase Auth
- **Project Management**: Dashboard to organize and manage multiple projects
- **Export & Deploy**: Download projects or deploy directly to hosting platforms

## Technology Stack

### Frontend
- **Next.js 13+** - React-based full-stack framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Monaco Editor** - VS Code-powered code editor
- **Framer Motion** - Smooth animations and transitions

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Supabase Auth** - Authentication and user management
- **Supabase Storage** - File storage for documents and assets
- **Row Level Security** - Database-level security policies

### AI Integration (Planned)
- **OpenAI API** - GPT models for code generation
- **Google Gemini** - Alternative AI model support
- **LangChain.js** - AI workflow orchestration
- **Vector Database** - Document embeddings and semantic search

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-project-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the migration file: `supabase/migrations/001_initial_schema.sql`

5. Configure authentication providers (optional):
   - In Supabase dashboard, go to Authentication > Providers
   - Enable and configure GitHub, Google, or other OAuth providers

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Database Schema

The application uses the following main tables:

- **users**: User profiles and authentication data
- **projects**: Generated software projects
- **project_files**: Individual files within projects
- **chat_messages**: AI chat conversation history
- **documents**: Uploaded specification documents

All tables include Row Level Security (RLS) policies to ensure users can only access their own data.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── editor/            # Code editor interface
│   └── create/            # Project creation flow
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client configuration
│   ├── database.ts       # Database operations
│   └── supabase-auth.ts  # Authentication helpers
├── supabase/
│   └── migrations/       # Database migration files
└── ...
```

## Key Features Implementation

### Authentication
- Supabase Auth with email/password and OAuth providers
- Automatic user profile creation
- Protected routes and middleware

### Project Management
- Create projects with natural language descriptions
- Real-time status updates during generation
- File management and organization

### Code Editor
- Monaco Editor integration
- Syntax highlighting for multiple languages
- File tree navigation
- Live preview capabilities

### AI Integration (Coming Soon)
- Multi-model AI support (OpenAI, Gemini, etc.)
- Structured prompt engineering
- Context-aware code generation
- Document-guided AI assistance

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Join our community discussions

---

Built with ❤️ using modern web technologies and AI.