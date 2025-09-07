'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/lib/types';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (title) return title;
    
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1) return 'Dashboard';
    
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { label, path, isLast: index === segments.length - 1 };
    });
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-orange-500';
      case 'teacher': return 'bg-green-500';
      case 'student': return 'bg-blue-500';
      case 'parent': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Title and Breadcrumbs */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {getPageTitle()}
          </h1>
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            {getBreadcrumbs().map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <span className={crumb.isLast ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}>
                  {crumb.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Right Section - User Info and Actions */}
        <div className="flex items-center space-x-4">
          {/* Date Display */}
          <div className="hidden md:block text-sm text-gray-600">
            {getCurrentTime()}
          </div>

          {/* Notifications Button */}
          <Button variant="ghost" size="sm" className="relative">
            <span className="text-lg">🔔</span>
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className={`${getRoleColor(user.role)} text-white text-sm`}>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}