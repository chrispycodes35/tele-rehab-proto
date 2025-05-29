import { CalendarEvent } from '@/lib/types/calendar';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Popover } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Video, Users, Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react';

interface EventPopupProps {
  event: CalendarEvent;
  onMarkComplete: (eventId: string) => void;
}

export function EventPopup({ event, onMarkComplete }: EventPopupProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-full flex flex-col justify-center cursor-pointer focus:outline-none">
          <span className="font-semibold text-white text-xs truncate">{event.title}</span>
          <span className="text-[10px] text-white opacity-90 truncate">{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{event.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  event.status === 'completed' ? "bg-green-100 text-green-800" :
                  event.status === 'cancelled' ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
                )}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {event.meetingLink && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(event.meetingLink, '_blank')}
                  className="flex items-center gap-1"
                >
                  <Video className="w-4 h-4" />
                  Join
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkComplete(event.id)}
                disabled={event.status === 'completed'}
                className="flex items-center gap-1"
              >
                {event.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {event.status === 'completed' ? 'Completed' : 'Mark Complete'}
              </Button>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-3">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Online Session</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {Math.round((event.end.getTime() - event.start.getTime()) / (1000 * 60))} minutes
              </span>
            </div>

            {/* Attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Attendees:</span>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {event.attendees.map((attendee, index) => (
                      <li key={index}>{attendee}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Meeting Details */}
            {event.meetingLink && (
              <div className="pt-2 border-t space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Video className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Platform: {event.meetingPlatform?.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Meeting Link:</span>
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {event.meetingLink}
                  </a>
                </div>
                {event.meetingId && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">Meeting ID: {event.meetingId}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(event.meetingId!)}
                      className="h-6 px-2"
                    >
                      Copy
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 