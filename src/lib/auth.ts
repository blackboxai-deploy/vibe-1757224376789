'use client';

import { User, UserRole } from './types';
import { getUserByEmail } from './data';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock authentication - in a real app, this would be handled by a proper auth service
export const mockCredentials = {
  // Admin
  'principal@school.edu': { password: 'admin123', role: 'admin' as UserRole },
  
  // Teachers
  'sarah.williams@school.edu': { password: 'teacher123', role: 'teacher' as UserRole },
  'james.anderson@school.edu': { password: 'teacher123', role: 'teacher' as UserRole },
  'maria.rodriguez@school.edu': { password: 'teacher123', role: 'teacher' as UserRole },
  
  // Students
  'alice.johnson@school.edu': { password: 'student123', role: 'student' as UserRole },
  'bob.smith@school.edu': { password: 'student123', role: 'student' as UserRole },
  'carol.davis@school.edu': { password: 'student123', role: 'student' as UserRole },
  
  // Parents
  'michael.johnson@email.com': { password: 'parent123', role: 'parent' as UserRole },
  'jennifer.smith@email.com': { password: 'parent123', role: 'parent' as UserRole },
  'robert.davis@email.com': { password: 'parent123', role: 'parent' as UserRole },
};

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const credentials = mockCredentials[email as keyof typeof mockCredentials];
  if (!credentials || credentials.password !== password) {
    return { user: null, error: 'Invalid email or password' };
  }
  
  const user = getUserByEmail(email);
  if (!user) {
    return { user: null, error: 'User not found' };
  }
  
  // Store user in localStorage for persistence
  localStorage.setItem('auth_user', JSON.stringify(user));
  localStorage.setItem('auth_token', 'mock_token_' + user.id);
  
  return { user, error: null };
}

export async function signOut(): Promise<void> {
  localStorage.removeItem('auth_user');
  localStorage.removeItem('auth_token');
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStr = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');
    
    if (!userStr || !token) return null;
    
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('auth_token');
  const user = getCurrentUser();
  
  return !!(token && user);
}

export function hasRole(requiredRole: UserRole): boolean {
  const user = getCurrentUser();
  return user?.role === requiredRole;
}

export function canAccess(allowedRoles: UserRole[]): boolean {
  const user = getCurrentUser();
  return user ? allowedRoles.includes(user.role) : false;
}

// Route protection utility
export function getRedirectPath(userRole: UserRole): string {
  switch (userRole) {
    case 'admin':
      return '/admin';
    case 'teacher':
      return '/teacher';
    case 'student':
      return '/student';
    case 'parent':
      return '/parent';
    default:
      return '/';
  }
}