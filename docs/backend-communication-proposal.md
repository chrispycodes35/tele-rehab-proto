# Backend Communication Proposal

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
  };
  assignedTherapistId: string;
  status: 'active' | 'inactive';
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
}
```

### Calendar Event
```typescript
interface CalendarEvent {
  id: string;
  therapistId: string;
  patientId?: string;
  type: 'appointment' | 'meeting' | 'note';
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
```

## Required API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Patient Management
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Exercise Management
- `GET /api/patients/:id/exercises` - Get patient's exercise history
- `POST /api/exercises` - Create new exercise session
- `PUT /api/exercises/:id` - Update exercise session
- `GET /api/exercises/:id/progress` - Get exercise progress

### Calendar Management
- `GET /api/calendar` - Get calendar events
- `POST /api/calendar` - Create calendar event
- `PUT /api/calendar/:id` - Update calendar event
- `DELETE /api/calendar/:id` - Delete calendar event

## Data Storage Recommendations

### Database Structure
We recommend using a SQL database with the following tables:
1. Users (Therapists)
2. Patients
3. Exercise_Sessions
4. Calendar_Events
5. Therapist_Patient_Relationships

### Data Relationships
- Many-to-many relationship between Therapists and Patients
- One-to-many relationship between Patients and Exercise Sessions
- One-to-many relationship between Therapists and Calendar Events

## Next Steps
1. Implement authentication system
2. Set up database schema
3. Create API endpoints
4. Implement data validation
5. Set up error handling
6. Add rate limiting and security measures

## Questions for Backend Team
1. What authentication system do you prefer?
2. Do you have a preferred database system?
3. What are the expected data volumes?
4. What are the performance requirements?
5. Are there any specific security requirements? 