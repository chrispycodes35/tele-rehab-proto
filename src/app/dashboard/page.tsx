'use client';

import { DashboardButtons } from '@/components/dashboard/DashboardButtons';

const dashboardButtons = [
  {
    title: 'Patients List',
    description: 'View and manage your patients, track progress, and schedule sessions.',
    href: '/dashboard/patients',
  },
  {
    title: 'Calendar',
    description: 'Schedule and manage your therapy sessions in one place.',
    href: '/dashboard/calendar',
  },
  {
    title: 'Notifications',
    description: 'View and manage your notifications.',
    href: '/dashboard',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to TeleRehab</h1>
        <p className="text-muted-foreground mt-2">
          Manage your physiotherapy sessions and patient care efficiently.
        </p>
      </div>

      <DashboardButtons buttons={dashboardButtons} />
    </div>
  );
} 