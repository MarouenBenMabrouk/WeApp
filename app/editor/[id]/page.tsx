'use client';

import { useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { ProjectPreview } from '@/components/project-preview';
import { AiChat } from '@/components/ai-chat';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Eye, 
  MessageCircle, 
  Play, 
  Download, 
  Share,
  ArrowLeft,
  FileText,
  Folder
} from 'lucide-react';
import Link from 'next/link';

// Mock project data
const mockProject = {
  id: '1',
  name: 'E-commerce Store',
  description: 'Modern online store with product catalog and shopping cart',
  files: {
    'app/page.tsx': `import { ProductGrid } from '@/components/product-grid';
import { Hero } from '@/components/hero';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ProductGrid />
    </div>
  );
}`,
    'components/product-grid.tsx': `'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';

export function ProductGrid() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from API
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    // Mock API call
    const mockProducts = [
      { id: 1, name: 'Laptop', price: 999, image: '/laptop.jpg' },
      { id: 2, name: 'Phone', price: 699, image: '/phone.jpg' },
    ];
    setProducts(mockProducts);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`,
    'components/hero.tsx': `export function Hero() {
  return (
    <div className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-xl">
          Find the best products at amazing prices
        </p>
      </div>
    </div>
  );
}`,
  }
};

export default function EditorPage({ params }: { params: { id: string } }) {
  const [activeFile, setActiveFile] = useState('app/page.tsx');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [code, setCode] = useState(mockProject.files[activeFile as keyof typeof mockProject.files]);

  const handleFileChange = (fileName: string) => {
    setActiveFile(fileName);
    setCode(mockProject.files[fileName as keyof typeof mockProject.files]);
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-white">{mockProject.name}</h1>
            <p className="text-sm text-slate-400">{mockProject.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-slate-800 border-r border-slate-700">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Files
                </h3>
              </div>
              <div className="p-2">
                {Object.keys(mockProject.files).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => handleFileChange(fileName)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeFile === fileName
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      {fileName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-slate-700" />

          {/* Code Editor */}
          <ResizablePanel defaultSize={50}>
            <div className="h-full">
              <Tabs defaultValue="code" className="h-full flex flex-col">
                <TabsList className="bg-slate-800 border-b border-slate-700 rounded-none">
                  <TabsTrigger value="code" className="flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="flex-1 mt-0">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language="typescript"
                    theme="vs-dark"
                  />
                </TabsContent>
                <TabsContent value="preview" className="flex-1 mt-0">
                  <ProjectPreview projectId={params.id} />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          {isChatOpen && (
            <>
              <ResizableHandle className="bg-slate-700" />
              <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
                <AiChat onClose={() => setIsChatOpen(false)} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {/* Chat Toggle Button */}
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}