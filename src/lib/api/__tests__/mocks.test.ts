import { listPatients, getPatient, listSessions, listEvents } from '../mocks';

describe('Mock API Functions', () => {
  describe('listPatients', () => {
    it('should return an array of patients', async () => {
      const patients = await listPatients();
      expect(Array.isArray(patients)).toBe(true);
      expect(patients.length).toBeGreaterThan(0);
      expect(patients[0]).toHaveProperty('id');
      expect(patients[0]).toHaveProperty('name');
    });
  });

  describe('getPatient', () => {
    it('should return a patient by id', async () => {
      const patient = await getPatient('1');
      expect(patient).not.toBeNull();
      expect(patient?.id).toBe('1');
    });

    it('should return null for non-existent patient', async () => {
      const patient = await getPatient('999');
      expect(patient).toBeNull();
    });
  });

  describe('listSessions', () => {
    it('should return sessions for a patient', async () => {
      const sessions = await listSessions('1');
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.every(s => s.patientId === '1')).toBe(true);
    });
  });

  describe('listEvents', () => {
    it('should return events for a therapist within date range', async () => {
      const startDate = '2024-02-21T00:00:00Z';
      const endDate = '2024-02-21T23:59:59Z';
      const events = await listEvents('demo-1', startDate, endDate);
      expect(Array.isArray(events)).toBe(true);
      expect(events.every(e => e.therapistId === 'demo-1')).toBe(true);
    });
  });
}); 