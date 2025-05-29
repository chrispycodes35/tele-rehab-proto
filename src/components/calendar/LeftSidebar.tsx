'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarFilter } from '@/lib/types/calendar';

const filters: CalendarFilter[] = [
  { id: 'my-day', label: 'My day', count: 5, active: true },
  { id: 'next-7', label: 'Next 7 days', count: 20, active: false },
  { id: 'all-tasks', label: 'All tasks', count: 45, active: false },
];

export function LeftSidebar() {
  return (
    <div className="w-60 border-r bg-background">
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4">
          <div className="space-y-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={filter.active ? 'secondary' : 'ghost'}
                className="w-full justify-between"
              >
                <span>{filter.label}</span>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {filter.count}
                </span>
              </Button>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">My Calendar (beta)</h3>
            </div>

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📅</span>
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📋</span>
                Tasks
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-amber-500">#</span>
                Priority
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-blue-500">#</span>
                Follow-up
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-green-500">#</span>
                Completed
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
} 