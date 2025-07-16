'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink, Smartphone, Monitor, Tablet } from 'lucide-react';

interface ProjectPreviewProps {
  projectId: string;
}

export function ProjectPreview({ projectId }: ProjectPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => setIsLoading(false), 1000);
  };

  const viewModeStyles = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] h-[1024px] mx-auto',
    mobile: 'w-[375px] h-[667px] mx-auto'
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('desktop')}
            className="text-slate-400 hover:text-white"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('tablet')}
            className="text-slate-400 hover:text-white"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('mobile')}
            className="text-slate-400 hover:text-white"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="text-slate-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-slate-800 p-4 overflow-auto">
        <div className={`${viewModeStyles[viewMode]} transition-all duration-300`}>
          <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Mock Preview Content */}
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Live Preview
                </h3>
                <p className="text-gray-600 max-w-md">
                  Your project will appear here in real-time as you make changes to the code.
                </p>
                <div className="mt-6 space-y-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">Building preview...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}