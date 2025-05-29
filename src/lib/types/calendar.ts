export interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'patient_chat' | 'team_meeting' | 'note';
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color: string;         // tailwind color token e.g. 'bg-sky-200'
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Patient {
  id: string;
  name: string;
  avatar?: string;
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