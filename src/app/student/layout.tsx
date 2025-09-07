'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={['student']}>
      {children}
    </DashboardLayout>
  );
}