export interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'patient_chat' | 'team_meeting' | 'note' | 'assessment';
  title: string;
  description: string;
  start: Date;
  end: Date;
  color?: string;         // tailwind color token e.g. 'bg-sky-200' (optional, UI will auto-color)
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  attendees?: string[];
  notes?: string;
  followUpRequired: boolean;
  meetingLink?: string;   // URL for virtual meeting (e.g., Zoom, Teams)
  meetingPlatform?: 'zoom' | 'teams' | 'google_meet' | 'other';
  meetingId?: string;     // Platform-specific meeting ID
  meetingPassword?: string; // Optional meeting password
  recordingUrl?: string;  // URL to session recording (if available)
  sessionType?: 'initial' | 'follow_up' | 'assessment' | 'review';
  equipment?: string[];   // Required equipment for the session
  preparationNotes?: string; // Notes for patient preparation
  postSessionNotes?: string; // Notes after session completion
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  strokeOnsetDate: string;
  contactInfo: {
    email: string;
    phone: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  assignedTherapistId: string;
  status: 'active' | 'inactive';
  lastVisit: string;
  nextAppointment: string;
  exerciseHistory: ExerciseSession[];
}

export interface ExerciseSession {
  id: string;
  patientId: string;
  exerciseId: string;
  date: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  duration: number;
  notes: string;
  progress: number;
  lastAttempt: {
    date: string;
    duration: number;
    success: boolean;
  };
  averageTimeToComplete: number;
  frequency: {
    timesPerWeek: number;
    daysOfWeek: string[];
  };
}

export interface CalendarFilter {
  id: string;
  label: string;
  count: number;
  active: boolean;
}

export interface WeatherInfo {
  temperature: {
    high: number;
    low: number;
  };
  condition: string;
  icon: string;
} 