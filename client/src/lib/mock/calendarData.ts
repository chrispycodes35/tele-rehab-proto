import { CalendarEvent } from '../types/calendar';
import { startOfWeek, addDays, addWeeks, setHours, setMinutes } from 'date-fns';

// Utility to get a date in the current week, at a specific day and time
function getEventDate(weekOffset: number, dayOfWeek: number, hour: number, minute: number = 0) {
  const base = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
  const week = addWeeks(base, weekOffset);
  const day = addDays(week, dayOfWeek);
  return setMinutes(setHours(day, hour), minute);
}

/**
 * In-memory mock event store for demo purposes.
 * In production, replace with real API/database calls.
 */
let mockEvents: CalendarEvent[] = [
  // patient_chat
  {
    id: '1',
    therapistId: 'therapist-1',
    patientId: 'patient-1',
    type: 'patient_chat',
    title: 'Initial Assessment - John Smith',
    description: 'Conduct initial assessment and create treatment plan',
    start: getEventDate(0, 1, 9), // Monday 9:00 AM
    end: getEventDate(0, 1, 10),  // Monday 10:00 AM
    status: 'scheduled',
    location: 'online',
    attendees: ['Dr. Sarah Johnson', 'John Smith'],
    notes: 'Prepare assessment forms and review medical history',
    followUpRequired: true,
    meetingLink: 'https://zoom.us/j/123456789',
    meetingPlatform: 'zoom',
    meetingId: '123-456-789',
    meetingPassword: 'rehab123',
    sessionType: 'initial',
    equipment: ['Theraband'],
    preparationNotes: 'Patient should be ready with exercise mat.',
    postSessionNotes: 'Assessment completed. Plan created.'
  },
  // assessment
  {
    id: '2',
    therapistId: 'therapist-1',
    patientId: 'patient-2',
    type: 'assessment',
    title: 'Progress Assessment - Mary Johnson',
    description: 'Evaluate progress on upper limb exercises',
    start: getEventDate(0, 1, 10), // Monday 10:00 AM
    end: getEventDate(0, 1, 11),  // Monday 11:00 AM
    status: 'scheduled',
    location: 'online',
    attendees: ['Dr. Sarah Johnson', 'Mary Johnson'],
    notes: 'Review exercise logs and measure range of motion',
    followUpRequired: true,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    meetingPlatform: 'google_meet',
    meetingId: 'abc-defg-hij',
    sessionType: 'assessment',
    equipment: ['Dumbbells'],
    preparationNotes: 'Patient should have exercise log ready.',
    postSessionNotes: 'Progress noted. Next assessment in 2 weeks.'
  },
  // team_meeting
  {
    id: '3',
    therapistId: 'therapist-1',
    type: 'team_meeting',
    title: 'Weekly Team Sync',
    description: 'Review patient progress and discuss treatment plans',
    start: getEventDate(0, 3, 13), // Wednesday 1:00 PM
    end: getEventDate(0, 3, 14),   // Wednesday 2:00 PM
    status: 'scheduled',
    location: 'online',
    attendees: ['Dr. Sarah Johnson', 'Dr. Mike Brown', 'Nurse Lisa'],
    notes: 'Prepare patient progress reports',
    followUpRequired: false,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/123',
    meetingPlatform: 'teams',
    meetingId: '987-654-321',
    sessionType: 'review',
    equipment: [],
    preparationNotes: '',
    postSessionNotes: ''
  },
  // note
  {
    id: '4',
    therapistId: 'therapist-1',
    type: 'note',
    title: 'Treatment Plan Review',
    description: 'Review and update treatment plans for upcoming week',
    start: getEventDate(0, 4, 15), // Thursday 3:00 PM
    end: getEventDate(0, 4, 16),   // Thursday 4:00 PM
    status: 'scheduled',
    location: 'online',
    attendees: ['Dr. Sarah Johnson'],
    notes: 'Update exercise protocols based on recent assessments',
    followUpRequired: false,
    meetingLink: 'https://zoom.us/j/456789012',
    meetingPlatform: 'zoom',
    meetingId: '456-789-012',
    sessionType: 'review',
    equipment: [],
    preparationNotes: '',
    postSessionNotes: ''
  },
  // patient_chat follow-up
  {
    id: '5',
    therapistId: 'therapist-1',
    patientId: 'patient-3',
    type: 'patient_chat',
    title: 'Follow-up Session - Robert Brown',
    description: 'Review home exercise program progress',
    start: getEventDate(0, 2, 9), // Tuesday 9:00 AM
    end: getEventDate(0, 2, 10),  // Tuesday 10:00 AM
    status: 'scheduled',
    location: 'online',
    attendees: ['Dr. Sarah Johnson', 'Robert Brown'],
    notes: 'Check adherence to home exercise program',
    followUpRequired: true,
    meetingLink: 'https://zoom.us/j/987654321',
    meetingPlatform: 'zoom',
    meetingId: '987-654-321',
    sessionType: 'follow_up',
    equipment: ['Chair'],
    preparationNotes: 'Patient should be seated comfortably.',
    postSessionNotes: 'Good adherence. Continue program.'
  },
  // Next week events
  {
    id: '6',
    therapistId: 'therapist-1',
    patientId: 'patient-2',
    type: 'assessment',
    title: 'Future Assessment - Mary Johnson',
    description: 'Future assessment for Mary',
    start: getEventDate(1, 4, 11), // Next Thursday 11:00 AM
    end: getEventDate(1, 4, 12),   // Next Thursday 12:00 PM
    status: 'scheduled',
    location: 'Virtual Meeting Room B',
    attendees: ['patient-2', 'therapist-1'],
    notes: 'Future event',
    followUpRequired: false,
    meetingLink: 'https://meet.google.com/xyz-abc-123',
    meetingPlatform: 'google_meet',
    meetingId: 'xyz-abc-123'
  },
  {
    id: '7',
    therapistId: 'therapist-1',
    type: 'team_meeting',
    title: 'Next Week Team Sync',
    description: 'Team meeting for next week',
    start: getEventDate(1, 3, 13), // Next Wednesday 1:00 PM
    end: getEventDate(1, 3, 14),   // Next Wednesday 2:00 PM
    status: 'scheduled',
    location: 'Conference Room 1',
    attendees: ['therapist-1', 'therapist-2', 'therapist-3'],
    notes: 'Next week event',
    followUpRequired: false,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/456',
    meetingPlatform: 'teams',
    meetingId: '456-789-012'
  },
  // Previous week event
  {
    id: '8',
    therapistId: 'therapist-1',
    type: 'note',
    title: 'Last Week Plan Review',
    description: 'Review plans from last week',
    start: getEventDate(-1, 4, 15), // Last Thursday 3:00 PM
    end: getEventDate(-1, 4, 16),   // Last Thursday 4:00 PM
    status: 'completed',
    location: 'Office',
    notes: 'Last week review',
    followUpRequired: false,
    meetingLink: 'https://zoom.us/j/789012345',
    meetingPlatform: 'zoom',
    meetingId: '789-012-345'
  }
];

/**
 * Simulates fetching calendar events from an API.
 * @param therapistId - The therapist whose events to fetch.
 * @returns Promise<CalendarEvent[]>
 */
export async function mockFetchCalendarEvents(therapistId: string): Promise<CalendarEvent[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents.filter(event => event.therapistId === therapistId);
}

/**
 * Simulates updating an event's status to 'completed'.
 * @param eventId - The event to mark as complete.
 */
export async function mockMarkEventComplete(eventId: string): Promise<void> {
  mockEvents = mockEvents.map(event =>
    event.id === eventId ? { ...event, status: 'completed' } : event
  );
}

/**
 * Simulates creating a new calendar event.
 * @param event - The event to create.
 */
export async function mockCreateCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  const newEvent: CalendarEvent = {
    ...event,
    id: `event-${mockEvents.length + 1}`
  };
  mockEvents.push(newEvent);
  return newEvent;
}

/**
 * Simulates updating an existing calendar event.
 * @param eventId - The ID of the event to update.
 * @param updates - The updates to apply to the event.
 */
export async function mockUpdateCalendarEvent(
  eventId: string,
  updates: Partial<CalendarEvent>
): Promise<CalendarEvent> {
  const eventIndex = mockEvents.findIndex(event => event.id === eventId);
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }
  
  mockEvents[eventIndex] = {
    ...mockEvents[eventIndex],
    ...updates
  };
  
  return mockEvents[eventIndex];
}

/**
 * Simulates deleting a calendar event.
 * @param eventId - The ID of the event to delete.
 */
export async function mockDeleteCalendarEvent(eventId: string): Promise<void> {
  mockEvents = mockEvents.filter(event => event.id !== eventId);
} 