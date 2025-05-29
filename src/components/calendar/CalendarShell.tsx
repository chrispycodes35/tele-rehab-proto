'use client';

import { CalendarEvent } from '@/lib/types/calendar';
import { LeftSidebar } from './LeftSidebar';
import { WeekCalendar } from './WeekCalendar';
import { RightSidebar } from './RightSidebar';

interface CalendarShellProps {
  events: CalendarEvent[];
}

export function CalendarShell({ events }: CalendarShellProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <LeftSidebar />
      <div className="flex-1 overflow-hidden">
        <WeekCalendar events={events} />
      </div>
      <RightSidebar events={events} />
    </div>
  );
} 