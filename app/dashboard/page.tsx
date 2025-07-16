'use client';

import { useState } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Folder, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Store',
    description: 'Modern online store with product catalog and shopping cart',
    type: 'Website',
    status: 'completed',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    preview: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Task Manager App',
    description: 'Collaborative task management with real-time updates',
    type: 'Web App',
    status: 'generating',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    preview: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'Portfolio Website',
    description: 'Personal portfolio with responsive design',
    type: 'Website',
    status: 'completed',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13',
    preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  }
];

export default function DashboardPage() {
  const { user } = useSupabase();
  const [projects] = useState(mockProjects);
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    generating: projects.filter(p => p.status === 'generating').length,
    recent: projects.filter(p => {
      const daysDiff = Math.floor((new Date().getTime() - new Date(p.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    }).length
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Welcome back, {user?.user_metadata?.name || user?.email || 'Developer'}! Ready to build something amazing?
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Folder className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">{stats.total}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-white">{stats.completed}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Generating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">{stats.generating}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Recent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">{stats.recent}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
          {['all', 'completed', 'generating'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-400 mb-2">No projects found</h3>
            <p className="text-slate-500 mb-4">
              {filter === 'all' 
                ? "You haven't created any projects yet. Start by creating your first project!"
                : `No ${filter} projects found. Try adjusting your filter.`
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}