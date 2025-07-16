'use client';

import { useState } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Code, 
  Menu,
  X,
  Plus,
  User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useSupabase();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-bold text-white">CodeCraft</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="mt-8 px-4">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          pathname === item.href
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-slate-800 lg:border-r lg:border-slate-700">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">CodeCraft</span>
          </div>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.user_metadata?.avatar_url || ''} />
              <AvatarFallback className="bg-blue-600 text-white">
                {user?.user_metadata?.name?.[0] || user?.email?.[0] || <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.user_metadata?.name || 'User'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between px-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <div className="lg:hidden">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || ''} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {user?.user_metadata?.name?.[0] || user?.email?.[0] || <User className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}