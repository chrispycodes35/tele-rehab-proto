'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { CalendarEvent } from '@/lib/types/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
}

export function WeekCalendar({ events }: WeekCalendarProps) {
  const eventPropGetter = (event: CalendarEvent) => ({
    className: cn(
      'rounded-md border-none shadow-sm',
      event.color,
      event.status === 'completed' && 'opacity-50',
      event.status === 'cancelled' && 'line-through'
    ),
  });

  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['week']}
        defaultView="week"
        min={new Date(0, 0, 0, 7, 0, 0)} // 7 AM
        max={new Date(0, 0, 0, 17, 0, 0)} // 5 PM
        eventPropGetter={eventPropGetter}
        components={{
          event: (props) => (
            <Popover>
              <PopoverTrigger asChild>
                <div className="h-full w-full p-1">
                  <div className="font-medium">{props.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(props.start, 'h:mm a')} - {format(props.end, 'h:mm a')}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{props.title}</h4>
                    <p className="text-sm text-muted-foreground">{props.event.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Handle mark as complete
                        console.log('Mark as complete:', props.event.id);
                      }}
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ),
        }}
      />
    </div>
  );
} 