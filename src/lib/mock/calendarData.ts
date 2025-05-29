import { CalendarEvent } from '../types/calendar';

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    therapistId: 'therapist-1',
    patientId: 'patient-1',
    type: 'patient_chat',
    title: 'Review patient files',
    description: 'Review recent progress and prepare for session',
    start: new Date(2024, 2, 18, 9, 0), // March 18, 2024, 9:00 AM
    end: new Date(2024, 2, 18, 10, 0),  // March 18, 2024, 10:00 AM
    color: 'bg-sky-200',
    status: 'scheduled'
  },
  {
    id: '2',
    therapistId: 'therapist-1',
    patientId: 'patient-2',
    type: 'patient_chat',
    title: 'Session with John Doe',
    description: 'Follow-up on exercise progress',
    start: new Date(2024, 2, 18, 10, 0),
    end: new Date(2024, 2, 18, 11, 0),
    color: 'bg-emerald-200',
    status: 'scheduled'
  },
  {
    id: '3',
    therapistId: 'therapist-1',
    type: 'team_meeting',
    title: 'Team Sync',
    description: 'Weekly team meeting',
    start: new Date(2024, 2, 18, 13, 0),
    end: new Date(2024, 2, 18, 14, 0),
    color: 'bg-purple-200',
    status: 'scheduled'
  },
  {
    id: '4',
    therapistId: 'therapist-1',
    type: 'note',
    title: 'Prepare treatment plan',
    description: 'Create new treatment plan for Patient A',
    start: new Date(2024, 2, 18, 15, 0),
    end: new Date(2024, 2, 18, 16, 0),
    color: 'bg-amber-200',
    status: 'scheduled'
  }
];

export async function mockFetchCalendarEvents(therapistId: string): Promise<CalendarEvent[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents.filter(event => event.therapistId === therapistId);
} 