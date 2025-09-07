'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/lib/types';
import { Sidebar } from '@/components/navigation/sidebar';
import { Header } from '@/components/navigation/header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  title?: string;
}

export function DashboardLayout({ children, allowedRoles, title }: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push('/');
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        // Redirect to user's appropriate dashboard
        const redirectMap: Record<UserRole, string> = {
          admin: '/admin',
          teacher: '/teacher',
          student: '/student',
          parent: '/parent'
        };
        router.push(redirectMap[user.role]);
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar className="fixed inset-y-0 left-0 z-50" />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header title={title} />
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}