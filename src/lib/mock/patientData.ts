import { Patient, ExerciseSession, ExerciseAttempt, PrescriptionItem, EducationResource } from '../types/patient';
import { FunctionalTest } from '../types/functionalTest';

const makeAttempts = (count: number, start: string, duration: number) =>
  Array.from({ length: count }, (_, i) => ({
    date: new Date(new Date(start).getTime() - i * 86400000).toISOString(),
    duration,
  }));

export const mockFunctionalTests: FunctionalTest[] = [
  { id: 'ft1', name: 'Berg Balance', date: '2024-10-20', score: 45, maxScore: 56 },
  { id: 'ft2', name: 'Timed Up & Go', date: '2024-10-18', score: 12, maxScore: 20 },
];

export const mockPrescriptions: PrescriptionItem[] = [
  { id: 'pr1', exerciseName: 'ADV Static Standing', status: 'active', frequency: { timesPerWeek: 3, daysOfWeek: ['Mon', 'Wed', 'Fri'] } },
];

export const mockEdu: EducationResource[] = [
  { id: 'ed1', title: 'Stroke Recovery Basics', url: 'https://edu.com/1', completed: true, assignedDate: '2024-10-01' },
];

// Mock exercise sessions
const mockExerciseSessions: ExerciseSession[] = [
  {
    id: 'ex-1',
    name: 'ADV Static Standing',
    category: 'Balance',
    status: 'active',
    frequency: { timesPerWeek: 3, daysOfWeek: ['Mon', 'Wed', 'Fri'] },
    totalRequired: 10,
    completedAttempts: makeAttempts(3, '2024-10-26T09:00:00Z', 49),
    lastAttempt: '2024-10-26T09:00:00Z',
    averageTimeToComplete: 49,
    progress: 0.3,
    tasks: ['Balance'],
  },
  {
    id: 'ex-2',
    name: 'ADV Dynamic stance, upper extremity',
    category: 'Combo',
    status: 'active',
    frequency: { timesPerWeek: 3, daysOfWeek: ['Tue', 'Thu', 'Sat'] },
    totalRequired: 10,
    completedAttempts: makeAttempts(5, '2024-10-20T09:00:00Z', 40),
    lastAttempt: '2024-10-20T09:00:00Z',
    averageTimeToComplete: 40,
    progress: 0.5,
    tasks: ['Combo'],
  },
  {
    id: 'ex-3',
    name: 'Sit To Stand',
    category: 'Upper Ex',
    status: 'inactive',
    frequency: { timesPerWeek: 5, daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    totalRequired: 10,
    completedAttempts: makeAttempts(2, '2024-09-20T09:00:00Z', 155),
    lastAttempt: '2024-09-20T09:00:00Z',
    averageTimeToComplete: 155,
    progress: 0.2,
    tasks: ['Upper Ex'],
  },
];

const defaultFunctionalTests = mockFunctionalTests;
const defaultPrescriptions = mockPrescriptions;
const defaultEducation = mockEdu;

const diagnoses = [
  'Ischemic Stroke',
  'Hemorrhagic Stroke',
  'TIA',
  'Aphasia',
  'Dysphagia',
  'Hemiparesis',
  'Ataxia',
  'Visual Field Defect',
  'Cognitive Impairment',
  'Depression'
]

const generatePatient = (id: number): Patient => {
  const today = new Date()
  const lastVisit = new Date(today)
  lastVisit.setDate(today.getDate() - Math.floor(Math.random() * 30))
  
  const nextAppointment = new Date(today)
  nextAppointment.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1)

  return {
    id: `patient-${id}`,
    mrn: `MRN${String(id).padStart(6, '0')}`,
    name: `Patient ${id}`,
    dateOfBirth: new Date(1950 + Math.floor(Math.random() * 50), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    diagnosis: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => diagnoses[Math.floor(Math.random() * diagnoses.length)]),
    strokeOnsetDate: new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    assignedTherapistId: 'therapist-1',
    status: 'active',
    lastVisit: lastVisit.toISOString(),
    nextAppointment: nextAppointment.toISOString(),
    exerciseHistory: id <= 5 ? mockExerciseSessions : [],
    functionalTests: id <= 5 ? defaultFunctionalTests : [],
    prescriptions: id <= 5 ? defaultPrescriptions : [],
    education: id <= 5 ? defaultEducation : [],
  }
}

export const mockFetchPatients = async (therapistId: string): Promise<Patient[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Generate 20 mock patients
  return Array.from({ length: 20 }, (_, i) => generatePatient(i + 1))
}

export const mockFetchPatientById = async (id: string): Promise<Patient | undefined> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Find patient by ID or return undefined
  const patients = await mockFetchPatients('therapist-1')
  return patients.find(p => p.id === id)
} 