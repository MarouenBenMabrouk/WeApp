'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  Code, 
  Upload, 
  FileText, 
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const projectTypes = [
  {
    id: 'website',
    name: 'Website',
    description: 'Static or dynamic websites with modern design',
    icon: <Globe className="w-6 h-6" />,
    examples: ['Portfolio', 'Blog', 'Landing Page', 'Company Site']
  },
  {
    id: 'webapp',
    name: 'Web App',
    description: 'Interactive web applications with user accounts',
    icon: <Monitor className="w-6 h-6" />,
    examples: ['Dashboard', 'CRM', 'E-commerce', 'Social Platform']
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'Cross-platform mobile applications',
    icon: <Smartphone className="w-6 h-6" />,
    examples: ['iOS App', 'Android App', 'PWA', 'React Native']
  },
  {
    id: 'saas',
    name: 'SaaS Tool',
    description: 'Software as a Service applications',
    icon: <Code className="w-6 h-6" />,
    examples: ['Analytics', 'Project Management', 'API Service', 'Automation']
  }
];

export default function CreateProjectPage() {
  const [selectedType, setSelectedType] = useState('website');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const generationSteps = [
    'Analyzing requirements...',
    'Generating file structure...',
    'Creating frontend components...',
    'Setting up backend logic...',
    'Configuring database...',
    'Finalizing project...'
  ];

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('Please provide a project description');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGenerationStep(0);

    // Simulate generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      setProgress(((i + 1) / generationSteps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    toast.success('Project generated successfully!');
    router.push('/editor/new-project');
  };

  const exampleDescriptions = {
    website: "Create a modern portfolio website for a graphic designer with a clean layout, project gallery, about section, and contact form.",
    webapp: "Build a task management web app with user authentication, project boards, team collaboration features, and real-time updates.",
    mobile: "Develop a fitness tracking mobile app with workout logging, progress charts, social features, and integration with wearables.",
    saas: "Create a SaaS analytics platform with dashboard, data visualization, user management, API access, and subscription billing."
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 flex items-center mb-4">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create New Project</h1>
          <p className="text-slate-400">
            Describe your project in natural language and let AI generate complete code for you
          </p>
        </div>

        {!isGenerating ? (
          <div className="space-y-8">
            {/* Project Type Selection */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Choose Project Type</CardTitle>
                <CardDescription className="text-slate-400">
                  Select the type of project you want to create
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => setSelectedType(type.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          selectedType === type.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg ${
                            selectedType === type.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {type.icon}
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-white">{type.name}</h3>
                            <p className="text-sm text-slate-400">{type.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {type.examples.map((example, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Describe Your Project</CardTitle>
                <CardDescription className="text-slate-400">
                  Be as specific as possible about features, design, and functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={exampleDescriptions[selectedType as keyof typeof exampleDescriptions]}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[120px]"
                    rows={6}
                  />
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Pro tip: Include details about design style, colors, features, and user flow</span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="border-slate-600 text-slate-300">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300">
                      <FileText className="w-4 h-4 mr-2" />
                      Add Specs
                    </Button>
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={!description.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Generate Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Code className="w-8 h-8 text-white animate-pulse" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Generating Your Project
                  </h3>
                  <p className="text-slate-400">
                    Our AI is creating your {projectTypes.find(t => t.id === selectedType)?.name.toLowerCase()} with all the features you requested
                  </p>
                </div>

                <div className="space-y-4">
                  <Progress value={progress} className="w-full" />
                  
                  <div className="space-y-2">
                    {generationSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          index < generationStep
                            ? 'bg-green-500/20 text-green-400'
                            : index === generationStep
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-700/50 text-slate-500'
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <span className="text-sm">{step}</span>
                        {index === generationStep && (
                          <Clock className="w-4 h-4 animate-spin ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  This usually takes 1-2 minutes. Feel free to grab a coffee! ☕
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}