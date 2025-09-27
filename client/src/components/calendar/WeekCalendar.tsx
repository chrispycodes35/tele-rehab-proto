'use client';

import { Calendar, dateFnsLocalizer, EventProps, ToolbarProps, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays, addWeeks, endOfWeek } from 'date-fns';
import { CalendarEvent } from '@/lib/types/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { EventPopup } from './EventPopup';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface WeekCalendarProps {
  events: CalendarEvent[];
  onMarkComplete: (eventId: string) => void;
  date: Date;
  onDateChange: (date: Date) => void;
}

// Color map for event types
const EVENT_TYPE_COLOR: Record<string, string> = {
  patient_chat: 'event-patient',
  team_meeting: 'event-team-meeting',
  note: 'event-note',
  assessment: 'event-assessment',
};

function CustomToolbar({ date, onDateChange, view, setView }: { date: Date; onDateChange: (date: Date) => void; view: 'day' | 'week' | 'month' | 'year'; setView: (v: 'day' | 'week' | 'month' | 'year') => void }) {
  // Calculate labels for day, week, month, year
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const weekLabel = `${format(weekStart, 'MMMM d')} – ${format(weekEnd, 'd, yyyy')}`;
  const dayLabel = format(date, 'MMMM d, yyyy');
  const monthLabel = format(date, 'MMMM yyyy');
  const yearLabel = format(date, 'yyyy');

  // Navigation logic: arrows move by selected view
  const handlePrev = () => {
    switch (view) {
      case 'day':
        onDateChange(addDays(date, -1));
        break;
      case 'week':
        onDateChange(addWeeks(date, -1));
        break;
      case 'month':
        onDateChange(addDays(date, -7 * 4)); // Approx 1 month back
        break;
      case 'year':
        onDateChange(addDays(date, -7 * 52)); // Approx 1 year back
        break;
    }
  };
  const handleNext = () => {
    switch (view) {
      case 'day':
        onDateChange(addDays(date, 1));
        break;
      case 'week':
        onDateChange(addWeeks(date, 1));
        break;
      case 'month':
        onDateChange(addDays(date, 7 * 4)); // Approx 1 month forward
        break;
      case 'year':
        onDateChange(addDays(date, 7 * 52)); // Approx 1 year forward
        break;
    }
  };

  let centerLabel = weekLabel;
  if (view === 'day') centerLabel = dayLabel;
  else if (view === 'month') centerLabel = monthLabel;
  else if (view === 'year') centerLabel = yearLabel;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 text-sm font-medium rounded hover:bg-accent"
          onClick={handlePrev}
        >
          {'<'}
        </button>
        <button
          className="px-2 py-1 text-sm font-medium rounded hover:bg-accent"
          onClick={() => onDateChange(new Date())}
        >
          Today
        </button>
        <button
          className="px-2 py-1 text-sm font-medium rounded hover:bg-accent"
          onClick={handleNext}
        >
          {'>'}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={cn(
            'px-2 py-1 text-sm font-medium rounded',
            view === 'day' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
          )}
          onClick={() => setView('day')}
        >
          Day
        </button>
        <button
          className={cn(
            'px-2 py-1 text-sm font-medium rounded',
            view === 'week' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
          )}
          onClick={() => setView('week')}
        >
          Week
        </button>
        <button
          className={cn(
            'px-2 py-1 text-sm font-medium rounded',
            view === 'month' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
          )}
          onClick={() => setView('month')}
        >
          Month
        </button>
        <button
          className={cn(
            'px-2 py-1 text-sm font-medium rounded',
            view === 'year' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
          )}
          onClick={() => setView('year')}
        >
          Year
        </button>
      </div>
      <div className="text-lg font-semibold min-w-[200px] text-center">
        {centerLabel}
      </div>
      <div />
    </div>
  );
}

export function WeekCalendar({ events, onMarkComplete, date, onDateChange }: WeekCalendarProps) {
  // View state: 'day', 'week', 'month', or 'year'
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('week');

  // Helper to get color class for event type
  function getEventColor(event: CalendarEvent) {
    return EVENT_TYPE_COLOR[event.type] || 'bg-gray-200';
  }

  // react-big-calendar eventPropGetter for styling events
  const eventPropGetter = (event: CalendarEvent) => ({
    className: cn(
      'rounded-md border-none shadow-sm',
      getEventColor(event), // Color by type
      event.status === 'completed' && 'opacity-50', // Completed = faded
      event.status === 'cancelled' && 'line-through'
    ),
  });

  // Always show all events for the week containing the selected date
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const filteredEvents = events.filter(
    (event) => event.start >= weekStart && event.start <= weekEnd
  );

  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['week']}
        defaultView="week"
        min={new Date(0, 0, 0, 7, 0, 0)} // 7 AM
        max={new Date(0, 0, 0, 17, 0, 0)} // 5 PM
        date={date}
        onNavigate={onDateChange}
        eventPropGetter={eventPropGetter}
        showMultiDayTimes={false}
        formats={{
          eventTimeRangeFormat: () => '', // Hide default time
        }}
        components={{
          event: (props: EventProps<CalendarEvent>) => (
            <EventPopup event={props.event} onMarkComplete={onMarkComplete} />
          ),
          toolbar: () => <CustomToolbar date={date} onDateChange={onDateChange} view={view} setView={setView} />,
        }}
      />
      {/*
        NOTE: If fetching events from an API, ensure start/end are Date objects:
        events = events.map(ev => ({ ...ev, start: new Date(ev.start), end: new Date(ev.end) }))
      */}
    </div>
  );
} 