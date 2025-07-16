'use client';

import { useState } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Smartphone, Globe, Zap, Users, Shield, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function LandingPage() {
  const { user } = useSupabase();
  const [activeDemo, setActiveDemo] = useState(0);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'AI-Powered Code Generation',
      description: 'Generate complete software projects from natural language descriptions using advanced AI models.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Visual Code Editor',
      description: 'Edit generated code in a powerful Monaco-based editor with syntax highlighting and IntelliSense.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Live Preview',
      description: 'See your project come to life instantly with real-time preview and hot reloading.'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Multi-Platform Support',
      description: 'Generate websites, web apps, mobile apps, and SaaS tools all from one platform.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Deployment',
      description: 'Deploy your projects to popular hosting platforms with one-click deployment.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaborative Development',
      description: 'Share projects with team members and collaborate in real-time.'
    }
  ];

  const demos = [
    'Create a modern e-commerce website with product catalog and shopping cart',
    'Build a task management app with user authentication and real-time updates',
    'Generate a portfolio website with responsive design and contact forms',
    'Develop a SaaS dashboard with analytics and user management'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CodeCraft AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#docs" className="text-slate-300 hover:text-white transition-colors">
                Documentation
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="default">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="default">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Powered by Advanced AI
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Generate Software
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {' '}Projects{' '}
                </span>
                with AI
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Describe your project in natural language and watch as our AI generates complete, 
                production-ready code for websites, web apps, mobile apps, and SaaS tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Building Free
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-xl font-semibold text-white mb-4">Try it now:</h3>
                <div className="space-y-2">
                  {demos.map((demo, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDemo(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeDemo === index
                          ? 'bg-blue-600/20 border-blue-500/30 text-blue-300'
                          : 'bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-700/70'
                      } border`}
                    >
                      {demo}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-400 text-sm ml-2">Generated Project</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-green-400">✓ Frontend components generated</div>
                    <div className="text-green-400">✓ Backend API created</div>
                    <div className="text-green-400">✓ Database schema configured</div>
                    <div className="text-green-400">✓ Styling applied</div>
                    <div className="text-blue-400">→ Project ready for deployment</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to build amazing software
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with professional development tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to build your next project?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who are already using AI to accelerate their development workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary">
                  Start Building Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CodeCraft AI</span>
              </div>
              <p className="text-slate-400">
                Generate complete software projects using the power of AI
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 CodeCraft AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}