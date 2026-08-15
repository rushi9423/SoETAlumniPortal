'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { 
  Home, Users, Briefcase, CheckCircle, Calendar, 
  MessageSquare, Bell, User, Settings, Info, 
  Search, Moon, LogOut 
} from 'lucide-react';

const mainNavItems = [
  { name: 'Dashboard', icon: Home, href: '/student' },
  { name: 'Alumni directory', icon: Users, href: '/student/alumni' },
  { name: 'Jobs', icon: Briefcase, href: '/student/jobs' },
  { name: 'Internships', icon: CheckCircle, href: '/student/internships' },
  { name: 'Events', icon: Calendar, href: '/student/events' },
  { name: 'Chat', icon: MessageSquare, href: '/student/chat' },
  { name: 'Notifications', icon: Bell, href: '/student/notifications' },
  { name: 'Profile', icon: User, href: '/student/profile' },
];

const moreNavItems = [
  { name: 'Settings', icon: Settings, href: '/student/settings' },
  { name: 'About', icon: Info, href: '/student/about' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getFirstName = (name: string) => {
    if (!name) return 'User';
    return name.split(' ')[0];
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  const userInitials = user?.profile?.fullName ? getInitials(user.profile.fullName) : 'U';
  const userName = user?.profile?.fullName || 'User';
  const firstName = getFirstName(userName);
  const userEmail = user?.email || '';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B1528] text-gray-300 flex flex-col hidden md:flex shrink-0 h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-3">
            SP
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">SOET Portal</h1>
            <p className="text-xs text-gray-400">Student</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-700">
            <p className="text-xs font-semibold text-gray-500 mb-4 px-2 tracking-wider">MAIN</p>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-600 text-white font-medium' : 'hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <p className="text-xs font-semibold text-gray-500 mt-8 mb-4 px-2 tracking-wider">MORE</p>
            <nav className="space-y-1">
              {moreNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-600 text-white font-medium' : 'hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-4 bg-[#121E33] border-t border-gray-800 shrink-0">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
              {userInitials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight truncate w-40">{userName}</p>
              <p className="text-xs text-gray-400 truncate w-40">{userEmail}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors w-full px-2 py-1"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search alumni, jobs, events" 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700">
              <Moon className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-6 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {userInitials}
              </div>
              <span className="text-sm font-medium text-gray-700">{firstName}</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
