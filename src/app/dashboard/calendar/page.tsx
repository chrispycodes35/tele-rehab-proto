import { CalendarShell } from '@/components/calendar/CalendarShell';
import { mockFetchCalendarEvents } from '@/lib/mock/calendarData';

export default async function CalendarPage() {
  const events = await mockFetchCalendarEvents('therapist-1');

  return (
    <div className="container mx-auto">
      <CalendarShell events={events} />
    </div>
  );
} 