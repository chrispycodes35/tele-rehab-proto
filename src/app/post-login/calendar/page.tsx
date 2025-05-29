'use client';

import { useEffect, useState } from 'react';
import { CalendarShell } from '@/components/calendar/CalendarShell';
import { mockFetchCalendarEvents, mockMarkEventComplete } from '@/lib/mock/calendarData';
import { CalendarEvent } from '@/lib/types/calendar';
import { Loader2 } from 'lucide-react';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetchCalendarEvents('therapist-1').then(ev => {
      setEvents(ev);
      setLoading(false);
    });
  }, []);

  const handleMarkComplete = async (eventId: string) => {
    await mockMarkEventComplete(eventId);
    const updated = await mockFetchCalendarEvents('therapist-1');
    setEvents(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Mock Up Calendar</h1>
      </div>
      <div className="flex-1 rounded-lg border bg-card shadow-sm">
        <CalendarShell events={events} onMarkComplete={handleMarkComplete} />
      </div>
    </div>
  );
}
