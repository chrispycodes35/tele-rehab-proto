# Backend Communication Proposal

## Overview
This document outlines the backend API requirements for the tele-rehabilitation platform, with clear mappings to frontend components and features.

## Frontend Components and Their Backend Requirements

### 1. Calendar System (`/calendar`)
**Frontend Components:**
- `WeekCalendar.tsx`: Main calendar view
- `EventPopup`: Event details and actions
- `CalendarFilters`: Event filtering and search

**Required Endpoints:**
```typescript
// Calendar Events
GET /api/calendar/events
  Query params:
    - therapistId: string
    - startDate: ISO string
    - endDate: ISO string
    - type?: 'patient_chat' | 'team_meeting' | 'note' | 'assessment'
    - status?: 'scheduled' | 'completed' | 'cancelled'
  Response: CalendarEvent[]

POST /api/calendar/events
  Body: Omit<CalendarEvent, 'id'>
  Response: CalendarEvent

PUT /api/calendar/events/:id
  Body: Partial<CalendarEvent>
  Response: CalendarEvent

DELETE /api/calendar/events/:id
  Response: void

// Meeting Integration
POST /api/calendar/events/:id/meeting
  Body: {
    platform: 'zoom' | 'teams' | 'google_meet'
    duration: number // in minutes
  }
  Response: {
    meetingLink: string
    meetingId: string
    meetingPassword?: string
  }

// Session Recording
POST /api/calendar/events/:id/recording
  Body: {
    recordingUrl: string
    duration: number
    thumbnailUrl?: string
  }
  Response: void
```

### 2. Patient Management (`/patients`)
**Frontend Components:**
- `PatientList.tsx`: Patient overview
- `PatientDetails.tsx`: Individual patient information
- `ExerciseHistory.tsx`: Patient exercise tracking

**Required Endpoints:**
```typescript
GET /api/patients
  Query params:
    - therapistId: string
    - status?: 'active' | 'inactive'
  Response: Patient[]

GET /api/patients/:id
  Response: Patient

POST /api/patients
  Body: Omit<Patient, 'id'>
  Response: Patient

PUT /api/patients/:id
  Body: Partial<Patient>
  Response: Patient
```

### 3. Exercise Management
**Frontend Components:**
- `ExerciseList.tsx`: Available exercises
- `ExerciseSession.tsx`: Exercise tracking
- `ProgressChart.tsx`: Progress visualization

**Required Endpoints:**
```typescript
GET /api/exercises
  Response: Exercise[]

GET /api/patients/:patientId/exercises
  Response: ExerciseSession[]

POST /api/patients/:patientId/exercises
  Body: {
    exerciseId: string
    frequency: {
      timesPerWeek: number
      daysOfWeek: string[]
    }
  }
  Response: ExerciseSession

PUT /api/exercises/:sessionId
  Body: {
    status: 'completed' | 'in_progress'
    duration: number
    notes: string
    progress: number
  }
  Response: ExerciseSession
```

## Data Models

### CalendarEvent
```typescript
interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'patient_chat' | 'team_meeting' | 'note' | 'assessment';
  title: string;
  description: string;
  start: Date;
  end: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  attendees?: string[];
  notes?: string;
  followUpRequired: boolean;
  // Tele-rehab specific fields
  meetingLink?: string;
  meetingPlatform?: 'zoom' | 'teams' | 'google_meet' | 'other';
  meetingId?: string;
  meetingPassword?: string;
  recordingUrl?: string;
  sessionType?: 'initial' | 'follow_up' | 'assessment' | 'review';
  equipment?: string[];
  preparationNotes?: string;
  postSessionNotes?: string;
}
```

### Patient
```typescript
interface Patient {
  id: string;
  mrn: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  diagnosis: string[];
  strokeOnsetDate: string;
  assignedTherapistId: string;
  status: 'active' | 'inactive';
  lastVisit: string;
  nextAppointment: string;
  exerciseHistory: ExerciseSession[];
  functionalTests: FunctionalTest[];
  prescriptions: Prescription[];
  education: Education[];
}
```

### ExerciseSession
```typescript
interface ExerciseAttempt {
  date: string; // ISO date string
  duration: number; // seconds
}

interface ExerciseSession {
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
  progress: number; // 0-1 (calculated as completedAttempts.length / totalRequired)
  tasks: string[];
}
```

## Security Considerations

1. **Authentication**
   - All endpoints require JWT authentication
   - Role-based access control (therapist, admin, patient)
   - Session management with refresh tokens

2. **Data Protection**
   - Encrypt sensitive patient data
   - Secure meeting links and passwords
   - HIPAA compliance for medical information

3. **API Security**
   - Rate limiting
   - Input validation
   - CORS configuration
   - Request sanitization

## Performance Requirements

1. **Response Times**
   - Calendar events: < 200ms
   - Patient data: < 300ms
   - Exercise data: < 200ms

2. **Caching Strategy**
   - Cache calendar events for 5 minutes
   - Cache patient data for 15 minutes
   - Cache exercise data for 10 minutes

3. **Pagination**
   - Default page size: 20 items
   - Maximum page size: 100 items
   - Cursor-based pagination for large datasets

## Future Considerations

1. **Real-time Features**
   - WebSocket integration for live updates
   - Real-time chat during sessions
   - Live exercise tracking

2. **Integration Points**
   - Video conferencing platforms (Zoom, Teams, Google Meet)
   - Electronic Health Records (EHR) systems
   - Wearable device data integration

3. **Analytics and Reporting**
   - Session attendance tracking
   - Exercise completion rates
   - Patient progress metrics
   - Therapist performance analytics

4. **Mobile Support**
   - Progressive Web App (PWA) capabilities
   - Mobile-optimized video sessions
   - Offline exercise tracking

5. **Accessibility**
   - Screen reader support
   - Keyboard navigation
   - High contrast mode
   - Voice commands

## Implementation 

1. **Core Features**
   - Basic calendar functionality
   - Patient management
   - Exercise tracking
   - Video session integration


## Current API Assessment

### Existing Functions
- `databaseFetch(id)`: Returns a record by ID
- `databaseUpload(data)`: Uploads a new record

### Sufficiency Analysis
The current API functions are insufficient for the full application requirements. We need additional endpoints to support:

1. Authentication & Authorization
2. Patient Management
3. Exercise History
4. Calendar Management
5. Therapist-Patient Relationships

## Required Data Structures

### Therapist Profile
```typescript
interface TherapistProfile {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  status: 'active' | 'inactive';
  patients: string[]; // Array of patient IDs
}
```

### Patient Profile
```typescript
interface PatientProfile {
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
```

### Exercise Session
```typescript
interface ExerciseSession {
  id: string;
  patientId: string;
  exerciseId: string;
  date: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  duration: number;
  notes: string;
  progress: number; // 0-100 percentage
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
```

### Calendar Event
```typescript
interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'patient_chat' | 'team_meeting' | 'note' | 'assessment';
  title: string;
  description: string;
  start: Date;
  end: Date;
  color: string; // Tailwind color token
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  attendees?: string[];
  notes?: string;
  followUpRequired: boolean;
}
```

## Required API Endpoints

### Authentication
- `POST /api/auth/login` - Therapist login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current therapist profile
- `POST /api/auth/refresh` - Refresh authentication token

### Patient Management
- `GET /api/patients` - List all patients for current therapist
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/:id/history` - Get patient's complete history
- `GET /api/patients/:id/progress` - Get patient's progress summary
- `GET /api/patients/:id/functional-tests` - Get patient's functional tests
- `POST /api/patients/:id/functional-tests` - Create new functional test for patient
- `GET /api/patients/:id/prescriptions` - Get patient's prescriptions
- `PUT /api/prescriptions/:id` - Update prescription
- `GET /api/patients/:id/education` - Get patient's education
- `POST /api/patients/:id/education/complete` - Mark education as complete

### Exercise Management
- `GET /api/patients/:id/exercises` - Get patient's exercise history
- `POST /api/exercises` - Create new exercise session
- `PUT /api/exercises/:id` - Update exercise session
- `GET /api/exercises/:id/progress` - Get exercise progress
- `GET /api/exercises/:id/stats` - Get exercise statistics
- `POST /api/exercises/:id/complete` - Mark exercise as complete

### Calendar Management
- `GET /api/calendar` - Get calendar events for current therapist
- `POST /api/calendar` - Create calendar event
- `PUT /api/calendar/:id` - Update calendar event
- `DELETE /api/calendar/:id` - Delete calendar event
- `GET /api/calendar/upcoming` - Get upcoming events
- `GET /api/calendar/patient/:patientId` - Get patient-specific events

## Data Storage Recommendations

### Database Structure
Recommend using a SQL database with the following tables:

1. `therapists`
   - id (PK)
   - name
   - email
   - specialization
   - status
   - created_at
   - updated_at

2. `patients`
   - id (PK)
   - name
   - date_of_birth
   - stroke_onset_date
   - email
   - phone
   - emergency_contact_name
   - emergency_contact_relationship
   - emergency_contact_phone
   - status
   - created_at
   - updated_at

3. `therapist_patient_relationships`
   - therapist_id (FK)
   - patient_id (FK)
   - assigned_date
   - status
   - created_at
   - updated_at

4. `exercise_sessions`
   - id (PK)
   - patient_id (FK)
   - exercise_id (FK)
   - date
   - status
   - duration
   - notes
   - progress
   - last_attempt_date
   - last_attempt_duration
   - last_attempt_success
   - average_time_to_complete
   - created_at
   - updated_at

5. `calendar_events`
   - id (PK)
   - therapist_id (FK)
   - patient_id (FK, nullable)
   - type
   - title
   - description
   - start_time
   - end_time
   - color
   - status
   - location
   - follow_up_required
   - created_at
   - updated_at

### Data Relationships
- Many-to-many relationship between Therapists and Patients (via therapist_patient_relationships)
- One-to-many relationship between Patients and Exercise Sessions
- One-to-many relationship between Therapists and Calendar Events
- One-to-many relationship between Patients and Calendar Events

## API Response Format
All API responses should follow this format:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

## Next Steps
1. Implement authentication system
2. Set up database schema
3. Create API endpoints
4. Implement data validation
5. Set up error handling

## Questions for Backend Team
1. What authentication system to set up? 
4. What are the performance requirements?
5. Are there any specific security requirements?
6. What monitoring and logging solutions do you recommend?
7. How should we handle data backup and recovery?

## Additional Notes
- The backend should store detailed exercise attempt history (date, duration) for each exercise session to enable accurate progress tracking, analytics, and reporting.
- Progress for an exercise is calculated as `completedAttempts.length / totalRequired`.
- Average time to complete is calculated from the durations in `completedAttempts`.

## 1. Are the two provided functions (`databaseFetch`, `databaseUpload`) sufficient?

**No, they are not sufficient.**
The frontend requires RESTful endpoints and richer data relationships than generic fetch/upload. The following endpoints are needed:

### Required Endpoints

#### Patient Management
- `GET /api/patients?therapistId=...` — List all patients for a therapist
- `GET /api/patients/:id` — Get a single patient profile (with exercise history)
- `POST /api/patients` — Create a new patient
- `PUT /api/patients/:id` — Update patient details
- `DELETE /api/patients/:id` — Remove a patient

#### Therapist-Patient Relationships
- `GET /api/therapists/:id/patients` — List all patients assigned to a therapist
- `POST /api/therapists/:id/patients` — Assign a patient to a therapist

#### Exercise Management
- `GET /api/patients/:id/exercises` — Get all exercise sessions for a patient
- `POST /api/patients/:id/exercises` — Add a new exercise session
- `PUT /api/exercises/:sessionId` — Update an exercise session (status, progress, attempts, etc.)

#### Calendar & Scheduling
- `GET /api/calendar/events?therapistId=...` — List all calendar events for a therapist
- `POST /api/calendar/events` — Create a new event
- `PUT /api/calendar/events/:id` — Update an event
- `DELETE /api/calendar/events/:id` — Remove an event

#### Authentication (for future)
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

---

## 2. What kind of data needs to be stored?

### a. Therapist-Patient Relationships (Many-to-Many)
- A therapist can have many patients; a patient can be assigned to multiple therapists.
- Store as a join table: `therapist_patient_relationships` with `therapistId`, `patientId`, `assignedDate`, `status`.

### b. Patient Profiles (including exercise history and progress)
- Store all patient demographic info, medical data, and exercise history.
- Exercise history is an array of `ExerciseSession` objects, each with attempts, progress, and completion data.

### c. Therapist Calendars and Scheduling
- Store events (appointments, meetings, notes) with links to patients and therapists.
- Each event should have type, status, time, and optional video/meeting info.

---

## 3. What data structures would you expect?

### a. Patient Profile

```typescript
interface Patient {
  id: string;
  mrn: string;
  name: string;
  dateOfBirth: string; // ISO date
  gender: string;
  diagnosis: string[];
  strokeOnsetDate: string; // ISO date
  assignedTherapistId: string;
  status: 'active' | 'inactive';
  lastVisit: string; // ISO date
  nextAppointment: string; // ISO date
  exerciseHistory: ExerciseSession[];
  // ...other fields (functionalTests, prescriptions, education)
}
```

### b. Exercise Session History

```typescript
interface ExerciseAttempt {
  date: string; // ISO date
  duration: number; // seconds
}

interface ExerciseSession {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  frequency: {
    timesPerWeek: number;
    daysOfWeek: string[];
  };
  totalRequired: number;
  completedAttempts: ExerciseAttempt[];
  lastAttempt: string; // ISO date
  averageTimeToComplete: number; // seconds
  progress: number; // 0-1
  tasks: string[];
}
```

### c. Calendar Event or Task

```typescript
interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'patient_chat' | 'team_meeting' | 'note' | 'assessment';
  title: string;
  description: string;
  start: string; // ISO date
  end: string;   // ISO date
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  attendees?: string[];
  notes?: string;
  followUpRequired: boolean;
  meetingLink?: string;
  meetingPlatform?: string;
}
```

---

## 4. Should it be JSON? Or as tables in SQL databases?

- **API responses and requests:** Should be JSON, matching the above TypeScript interfaces.
- **Backend storage:**  
  - Use SQL tables for core entities (patients, therapists, exercises, events).
  - Use join tables for many-to-many relationships (e.g., therapist-patient).
  - Store arrays (like `exerciseHistory`) as related rows in a separate table (`exercise_sessions`), not as a JSON blob, for queryability and analytics.

---

## 5. System Architecture & API/Data Requirements

- **Frontend** expects RESTful JSON APIs, with endpoints as above.
- **Backend** should use normalized SQL tables for all major entities and relationships.
- **Authentication** and **role-based access** are required for production.
- **Data model** should match the TypeScript interfaces above, which are already used in the frontend mock data and types.
- **All dates** should be stored and transmitted as ISO 8601 strings.

---

## 6. Summary Table

| Area                | Requirement                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| API                 | RESTful, JSON, endpoints as above                                           |
| Data Storage        | SQL tables for all entities, join tables for relationships                  |
| Data Structures     | Match provided TypeScript interfaces                                        |
| Relationships       | Many-to-many for therapist-patient, one-to-many for exercises, events       |
| Authentication      | JWT or session-based, role-based access                                     |
| Dates               | ISO 8601 strings                                                            |
| Analytics           | Store exercise attempts as rows for progress tracking and reporting         |

