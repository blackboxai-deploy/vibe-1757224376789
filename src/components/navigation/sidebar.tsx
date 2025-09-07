'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/lib/types';

interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

const navigationItems: NavigationItem[] = [
  // Admin Navigation
  { label: 'Dashboard', href: '/admin', icon: '📊', roles: ['admin'] },
  { label: 'Students', href: '/admin/students', icon: '👥', roles: ['admin'] },
  { label: 'Teachers', href: '/admin/teachers', icon: '👨‍🏫', roles: ['admin'] },
  { label: 'Classes', href: '/admin/classes', icon: '🏫', roles: ['admin'] },
  { label: 'Fees', href: '/admin/fees', icon: '💰', roles: ['admin'] },
  { label: 'Reports', href: '/admin/reports', icon: '📈', roles: ['admin'] },
  
  // Teacher Navigation
  { label: 'Dashboard', href: '/teacher', icon: '📊', roles: ['teacher'] },
  { label: 'My Classes', href: '/teacher/classes', icon: '🏫', roles: ['teacher'] },
  { label: 'Attendance', href: '/teacher/attendance', icon: '📅', roles: ['teacher'] },
  { label: 'Grades', href: '/teacher/grades', icon: '📝', roles: ['teacher'] },
  { label: 'Assignments', href: '/teacher/assignments', icon: '📚', roles: ['teacher'] },
  
  // Student Navigation
  { label: 'Dashboard', href: '/student', icon: '📊', roles: ['student'] },
  { label: 'My Grades', href: '/student/grades', icon: '📝', roles: ['student'] },
  { label: 'Assignments', href: '/student/assignments', icon: '📚', roles: ['student'] },
  { label: 'Attendance', href: '/student/attendance', icon: '📅', roles: ['student'] },
  { label: 'Schedule', href: '/student/schedule', icon: '⏰', roles: ['student'] },
  
  // Parent Navigation
  { label: 'Dashboard', href: '/parent', icon: '📊', roles: ['parent'] },
  { label: 'My Children', href: '/parent/children', icon: '👨‍👩‍👧‍👦', roles: ['parent'] },
  { label: 'Academic Progress', href: '/parent/progress', icon: '📈', roles: ['parent'] },
  { label: 'Communication', href: '/parent/messages', icon: '💬', roles: ['parent'] },
  { label: 'Fees & Payments', href: '/parent/fees', icon: '💰', roles: ['parent'] },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const userNavigationItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-orange-500';
      case 'teacher': return 'bg-green-500';
      case 'student': return 'bg-blue-500';
      case 'parent': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (!user) return null;

  return (
    <div className={`${className} bg-white shadow-lg border-r border-gray-200 ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">EduManage</h2>
              <p className="text-sm text-gray-500">{getRoleLabel(user.role)} Portal</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? '→' : '←'}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className={`${getRoleColor(user.role)} text-white`}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {userNavigationItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== `/${user.role}` && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!isCollapsed && item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <span className="text-lg mr-3">🚪</span>
          {!isCollapsed && 'Sign Out'}
        </Button>
      </div>
    </div>
  );
}