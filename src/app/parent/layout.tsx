'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={['parent']}>
      {children}
    </DashboardLayout>
  );
}