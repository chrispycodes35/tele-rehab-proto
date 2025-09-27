import { CalendarEvent, Patient, ExerciseSession } from '../types/calendar';

// Mock data
const mockPatients: Patient[] = [
  {
    id: 'patient-1',
    name: 'John Smith',
    dateOfBirth: '1955-06-15',
    strokeOnsetDate: '2023-12-01',
    contactInfo: {
      email: 'john.smith@email.com',
      phone: '555-0123',
      emergencyContact: {
        name: 'Sarah Smith',
        relationship: 'Spouse',
        phone: '555-0124'
      }
    },
    status: 'active',
    assignedTherapistId: 'therapist-1',
    lastVisit: '2024-03-11',
    nextAppointment: '2024-03-18',
    exerciseHistory: []
  },
  {
    id: 'patient-2',
    name: 'Mary Johnson',
    dateOfBirth: '1962-03-22',
    strokeOnsetDate: '2024-01-15',
    contactInfo: {
      email: 'mary.johnson@email.com',
      phone: '555-0125',
      emergencyContact: {
        name: 'James Johnson',
        relationship: 'Son',
        phone: '555-0126'
      }
    },
    status: 'active',
    assignedTherapistId: 'therapist-1',
    lastVisit: '2024-03-12',
    nextAppointment: '2024-03-19',
    exerciseHistory: []
  }
];

const mockSessions: ExerciseSession[] = [
  {
    id: 'session-1',
    patientId: 'patient-1',
    exerciseId: 'ex1',
    date: '2024-03-11',
    status: 'completed',
    duration: 30,
    notes: 'Good progress on upper limb exercises',
    progress: 75,
    lastAttempt: {
      date: '2024-03-11',
      duration: 30,
      success: true
    },
    averageTimeToComplete: 25,
    frequency: {
      timesPerWeek: 3,
      daysOfWeek: ['Monday', 'Wednesday', 'Friday']
    }
  }
];

let mockEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    therapistId: 'therapist-1',
    patientId: 'patient-1',
    type: 'patient_chat',
    title: 'Initial Assessment - John Smith',
    description: 'Conduct initial assessment and create treatment plan',
    start: new Date(2024, 2, 18, 9, 0),
    end: new Date(2024, 2, 18, 10, 0),
    color: 'bg-sky-200',
    status: 'scheduled',
    location: 'Virtual Meeting Room A',
    attendees: ['patient-1', 'therapist-1'],
    notes: 'Prepare assessment forms and review medical history',
    followUpRequired: true
  }
];

// Mock API functions
export async function listPatients(): Promise<Patient[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatients;
}

export async function getPatient(id: string): Promise<Patient | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatients.find(p => p.id === id) || null;
}

export async function listSessions(patientId: string): Promise<ExerciseSession[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSessions.filter(s => s.patientId === patientId);
}

export async function createSession(session: Omit<ExerciseSession, 'id'>): Promise<ExerciseSession> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newSession: ExerciseSession = {
    ...session,
    id: `session-${mockSessions.length + 1}`
  };
  mockSessions.push(newSession);
  return newSession;
}

export async function updateSession(
  sessionId: string,
  updates: Partial<ExerciseSession>
): Promise<ExerciseSession> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const sessionIndex = mockSessions.findIndex(s => s.id === sessionId);
  if (sessionIndex === -1) {
    throw new Error('Session not found');
  }
  
  mockSessions[sessionIndex] = {
    ...mockSessions[sessionIndex],
    ...updates
  };
  
  return mockSessions[sessionIndex];
}

export async function listEvents(
  therapistId: string,
  startDate: string,
  endDate: string
): Promise<CalendarEvent[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents.filter(e => 
    e.therapistId === therapistId &&
    new Date(e.start) >= new Date(startDate) &&
    new Date(e.end) <= new Date(endDate)
  );
}

export async function createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newEvent: CalendarEvent = {
    ...event,
    id: `event-${mockEvents.length + 1}`
  };
  mockEvents.push(newEvent);
  return newEvent;
}

export async function updateEvent(
  eventId: string,
  updates: Partial<CalendarEvent>
): Promise<CalendarEvent> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const eventIndex = mockEvents.findIndex(e => e.id === eventId);
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }
  
  mockEvents[eventIndex] = {
    ...mockEvents[eventIndex],
    ...updates
  };
  
  return mockEvents[eventIndex];
}

export async function deleteEvent(eventId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
  mockEvents = mockEvents.filter(e => e.id !== eventId);
} 