// Mock data types
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  strokeOnsetDate: string;
  status: 'active' | 'inactive';
  assignedTherapistId: string;
}

export interface ExerciseSession {
  id: string;
  patientId: string;
  exerciseId: string;
  date: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  duration: number;
  progress: number;
}

export interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'appointment' | 'meeting' | 'note';
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    dateOfBirth: '1955-06-15',
    strokeOnsetDate: '2023-12-01',
    status: 'active',
    assignedTherapistId: 'demo-1',
  },
  {
    id: '2',
    name: 'Mary Johnson',
    dateOfBirth: '1962-03-22',
    strokeOnsetDate: '2024-01-15',
    status: 'active',
    assignedTherapistId: 'demo-1',
  },
];

const mockSessions: ExerciseSession[] = [
  {
    id: '1',
    patientId: '1',
    exerciseId: 'ex1',
    date: '2024-02-20',
    status: 'completed',
    duration: 30,
    progress: 75,
  },
];

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    therapistId: 'demo-1',
    patientId: '1',
    type: 'appointment',
    startTime: '2024-02-21T10:00:00Z',
    endTime: '2024-02-21T11:00:00Z',
    title: 'Session with John Smith',
    description: 'Regular physiotherapy session',
  },
];

// Mock API functions
export async function listPatients(): Promise<Patient[]> {
  // TODO(cursor): Replace with real API call
  return mockPatients;
}

export async function getPatient(id: string): Promise<Patient | null> {
  // TODO(cursor): Replace with real API call
  return mockPatients.find(p => p.id === id) || null;
}

export async function listSessions(patientId: string): Promise<ExerciseSession[]> {
  // TODO(cursor): Replace with real API call
  return mockSessions.filter(s => s.patientId === patientId);
}

export async function listEvents(
  therapistId: string,
  startDate: string,
  endDate: string
): Promise<CalendarEvent[]> {
  // TODO(cursor): Replace with real API call
  return mockEvents.filter(e => 
    e.therapistId === therapistId &&
    new Date(e.startTime) >= new Date(startDate) &&
    new Date(e.endTime) <= new Date(endDate)
  );
} 