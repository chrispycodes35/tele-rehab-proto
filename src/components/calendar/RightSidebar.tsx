'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/lib/types/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function RightSidebar({ events, selectedDate, onDateChange }: RightSidebarProps) {
  const todayEvents = events.filter(event => {
    return (
      event.start.getDate() === selectedDate.getDate() &&
      event.start.getMonth() === selectedDate.getMonth() &&
      event.start.getFullYear() === selectedDate.getFullYear()
    );
  });

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const today = new Date();

  return (
    <div className="w-[210px] border-l bg-background p-2 flex flex-col gap-6">
      {/* Mini Month Picker */}
      <div className="rounded-lg border bg-white/70 dark:bg-background/70 p-2 shadow-sm">
        <div className="text-center text-sm font-medium">
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-muted-foreground">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const thisDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
            const isToday =
              thisDate.getDate() === today.getDate() &&
              thisDate.getMonth() === today.getMonth() &&
              thisDate.getFullYear() === today.getFullYear();
            const isSelected =
              thisDate.getDate() === selectedDate.getDate() &&
              thisDate.getMonth() === selectedDate.getMonth() &&
              thisDate.getFullYear() === selectedDate.getFullYear();
            return (
              <div
                key={day}
                className={cn(
                  'cursor-pointer rounded-full p-1 transition-colors',
                  isSelected && 'bg-primary text-primary-foreground',
                  !isSelected && isToday && 'ring-2 ring-primary'
                )}
                onClick={() => onDateChange(thisDate)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="rounded-lg border bg-white/70 dark:bg-background/70 shadow-sm">
        <div className="px-4 pt-4 pb-2 border-b">
          <div className="text-sm font-semibold">{format(selectedDate, "MMMM d, yyyy")}'s Schedule</div>
        </div>
        <div className="p-4 space-y-4">
          {todayEvents.length === 0 && (
            <div className="text-xs text-muted-foreground">No events scheduled.</div>
          )}
          {todayEvents.map((event) => (
            <div key={event.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-muted-foreground">
                  {format(event.start, 'h:mm a')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 