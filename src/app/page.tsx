'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { getRedirectPath } from '@/lib/auth';
import { UserRole } from '@/lib/types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const { user, isAuthenticated, login } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(getRedirectPath(user.role));
    }
  }, [isAuthenticated, user, router]);

  // Demo credentials for each role
  const demoCredentials = {
    student: { email: 'alice.johnson@school.edu', password: 'student123' },
    teacher: { email: 'sarah.williams@school.edu', password: 'teacher123' },
    parent: { email: 'michael.johnson@email.com', password: 'parent123' },
    admin: { email: 'principal@school.edu', password: 'admin123' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        router.push(getRedirectPath(result.user.role));
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const credentials = demoCredentials[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Welcome to
              <span className="block text-blue-600">EduManage</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your comprehensive school management system for students, teachers, parents, and administrators.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Students</h3>
              <p className="text-sm text-gray-600">Track grades, assignments, attendance, and academic progress</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Teachers</h3>
              <p className="text-sm text-gray-600">Manage classes, track attendance, grade assignments, and communicate</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Parents</h3>
              <p className="text-sm text-gray-600">Monitor child's progress, communicate with teachers, manage fees</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Admins</h3>
              <p className="text-sm text-gray-600">Complete school management with analytics and reporting</p>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)} className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="student" className="text-xs">Student</TabsTrigger>
                  <TabsTrigger value="teacher" className="text-xs">Teacher</TabsTrigger>
                  <TabsTrigger value="parent" className="text-xs">Parent</TabsTrigger>
                  <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
                </TabsList>
                
                {Object.entries(demoCredentials).map(([role, creds]) => (
                  <TabsContent key={role} value={role} className="mt-4">
                    <div className="p-3 bg-gray-50 rounded-md text-sm">
                      <p className="font-medium mb-1">Demo {role} credentials:</p>
                      <p className="text-gray-600">Email: {creds.email}</p>
                      <p className="text-gray-600">Password: {creds.password}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => handleDemoLogin(role as UserRole)}
                      >
                        Use Demo Credentials
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                Select a role above to see demo credentials and sign in
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}