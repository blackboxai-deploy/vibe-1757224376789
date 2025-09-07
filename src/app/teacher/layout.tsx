'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={['teacher']}>
      {children}
    </DashboardLayout>
  );
}