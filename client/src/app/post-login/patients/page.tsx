import PatientTable from '@/components/patient/PatientTable'
import { mockFetchPatients } from '@/lib/mock/patientData'

/** Server component – renders full roster table */
export default async function PatientList() {
  const patients = await mockFetchPatients('therapist-1')

  if (!patients.length) {
    return <p className="text-center text-gray-500 mt-20">No patients yet.</p>
  }

  return (
    <div className="w-full overflow-auto rounded-lg shadow bg-white">
      <PatientTable patients={patients} />
    </div>
  )
} 