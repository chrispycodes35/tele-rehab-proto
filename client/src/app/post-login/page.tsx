'use client';

import { DashboardButtons } from '@/components/dashboard/DashboardButtons';

const dashboardButtons = [
  {
    title: 'Patients',
    description: 'View and manage your patients, track progress, and schedule sessions.',
    href: '/post-login/patients',
  },
  {
    title: 'Calendar',
    description: 'Schedule and manage your therapy sessions in one place.',
    href: '/post-login/calendar',
  },
];

export default function PostLoginPage() {
  return (
    <div className="flex flex-col bg-background px-2 pt-4 md:pt-6">
      {/* Main content right after header */}
      <div className="flex flex-col items-center gap-4 md:gap-6 text-center py-4 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold">Welcome to TeleRehab</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
          Manage your physiotherapy sessions and patient care efficiently.
        </p>
      </div>

      {/* Buttons section with controlled spacing */}
      <div className="flex justify-center w-full max-w-3xl mx-auto py-4">
        <DashboardButtons buttons={dashboardButtons} />
      </div>
    </div>
  );
}
