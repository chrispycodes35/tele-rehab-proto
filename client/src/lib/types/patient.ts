import type { FunctionalTest } from './functionalTest';

export interface EducationResource {
  id: string;
  title: string;
  url: string;
  completed: boolean;
  assignedDate: string;
}

export interface PrescriptionItem {
  id: string;
  exerciseName: string;
  status: 'active'|'inactive';
  frequency: { timesPerWeek: number; daysOfWeek: string[] };
}

export interface ExerciseAttempt {
  date: string; // ISO date string
  duration: number; // seconds
}

export interface ExerciseSession {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  frequency: {
    timesPerWeek: number;
    daysOfWeek: string[];
  };
  totalRequired: number; // total number of times to complete
  completedAttempts: ExerciseAttempt[];
  lastAttempt: string; // ISO date string
  averageTimeToComplete: number; // seconds
  progress: number; // 0-1 (can be calculated from completedAttempts/totalRequired)
  tasks: string[];
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  avatar?: string;
  dateOfBirth: string; // ISO date string
  gender: string;
  diagnosis: string[];
  strokeOnsetDate: string; // ISO date string
  assignedTherapistId: string;
  status: 'active' | 'inactive';
  lastVisit: string; // ISO date string
  nextAppointment: string; // ISO date string
  exerciseHistory: ExerciseSession[];
  functionalTests: any[]; // TODO: type this properly
  prescriptions: any[]; // TODO: type this properly
  education: any[]; // TODO: type this properly
} 