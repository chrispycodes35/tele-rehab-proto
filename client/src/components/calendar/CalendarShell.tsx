'use client';

import { CalendarEvent } from '@/lib/types/calendar';
import { LeftSidebar } from './LeftSidebar';
import { WeekCalendar } from './WeekCalendar';
import { RightSidebar } from './RightSidebar';
import { useState, useMemo } from 'react';

interface CalendarShellProps {
  events: CalendarEvent[];
  onMarkComplete: (eventId: string) => void;
}

export function CalendarShell({ events, onMarkComplete }: CalendarShellProps) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'all') return events;
    if (selectedFilter === 'patient_chat') return events.filter(e => e.type === 'patient_chat');
    if (selectedFilter === 'team_meeting') return events.filter(e => e.type === 'team_meeting');
    if (selectedFilter === 'other') return events.filter(e => e.type === 'note' || e.type === 'assessment');
    return events;
  }, [events, selectedFilter]);

  return (
    <div className="flex flex-1 h-full bg-background">
      <LeftSidebar selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <div className="flex-1 overflow-hidden">
        <WeekCalendar 
          events={filteredEvents} 
          onMarkComplete={onMarkComplete} 
          date={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>
      <RightSidebar events={filteredEvents} selectedDate={selectedDate} onDateChange={setSelectedDate} />
    </div>
  );
}
