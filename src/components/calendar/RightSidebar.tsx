'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/lib/types/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  events: CalendarEvent[];
}

export function RightSidebar({ events }: RightSidebarProps) {
  const todayEvents = events.filter(event => {
    const today = new Date();
    return (
      event.start.getDate() === today.getDate() &&
      event.start.getMonth() === today.getMonth() &&
      event.start.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="w-[210px] border-l bg-background p-4">
      <div className="space-y-6">
        {/* Mini Month Picker */}
        <div className="rounded-lg border p-2">
          <div className="text-center text-sm font-medium">
            {format(new Date(), 'MMMM yyyy')}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={cn(
                  'cursor-pointer rounded-full p-1',
                  day === new Date().getDate() && 'bg-primary text-primary-foreground'
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Weather Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl">☀️</div>
              <div className="text-right">
                <div className="text-sm font-medium">55°</div>
                <div className="text-xs text-muted-foreground">40°</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayEvents.map((event) => (
              <div key={event.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(event.start, 'h:mm a')}
                  </div>
                </div>
                {event.type === 'patient_chat' && (
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/avatars/02.png" />
                        <AvatarFallback>TS</AvatarFallback>
                      </Avatar>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 