'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Download, 
  Trash2,
  Globe,
  Smartphone,
  Monitor,
  Loader2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

type Project = {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'completed' | 'generating' | 'error';
  createdAt: string;
  updatedAt: string;
  preview?: string;
};

const typeIcons = {
  'Website': Globe,
  'Web App': Monitor,
  'Mobile App': Smartphone,
  'SaaS Tool': Monitor,
};

const statusColors = {
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  generating: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function ProjectCard({ project }: { project: Project }) {
  const Icon = typeIcons[project.type as keyof typeof typeIcons] || Monitor;
  const isGenerating = project.status === 'generating';

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-blue-400" />
            <Badge variant="outline" className="text-xs">
              {project.type}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/20">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-white text-lg">{project.name}</CardTitle>
        <CardDescription className="text-slate-400">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {project.preview && (
          <div className="aspect-video bg-slate-900 rounded-lg mb-4 overflow-hidden">
            <img 
              src={project.preview} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <Badge className={statusColors[project.status]}>
            {isGenerating && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
            {project.status === 'completed' && 'Completed'}
            {project.status === 'generating' && 'Generating...'}
            {project.status === 'error' && 'Error'}
          </Badge>
          <div className="flex space-x-2">
            {project.status === 'completed' && (
              <>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <Eye className="w-4 h-4" />
                </Button>
                <Link href={`/editor/${project.id}`}>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
            {project.status === 'generating' && (
              <Button size="sm" variant="ghost" disabled className="text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
              </Button>
            )}
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-2">
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}