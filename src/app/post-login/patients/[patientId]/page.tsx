import { mockFetchPatientById } from '@/lib/mock/patientData'
import { calculateAge, daysAgo } from '@/lib/utils'
import Link from 'next/link'

export default async function PatientProfile({ params }: { params: { patientId: string } }) {
  const patient = await mockFetchPatientById(params.patientId)

  if (!patient) {
    return <div className="text-red-500 p-8 text-center">Patient not found.</div>
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <Link href="/post-login/patients" className="inline-block mb-6 text-blue-600 hover:underline">← Back to Patients List</Link>
      <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
      <div className="mb-4 text-gray-600">MRN: <span className="font-mono">{patient.mrn}</span></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><span className="font-semibold">Gender:</span> {patient.gender}</div>
        <div><span className="font-semibold">DOB:</span> {new Date(patient.dateOfBirth).toLocaleDateString()} ({calculateAge(patient.dateOfBirth)} y.o)</div>
        <div><span className="font-semibold">Stroke Onset:</span> {new Date(patient.strokeOnsetDate).toLocaleDateString()} ({daysAgo(patient.strokeOnsetDate)} days ago)</div>
        <div><span className="font-semibold">Status:</span> <span className={patient.status === 'active' ? 'text-green-600' : 'text-gray-400'}>{patient.status}</span></div>
      </div>
      <div className="mb-6">
        <span className="font-semibold">Diagnosis:</span>
        <ul className="list-disc ml-6 text-gray-700">
          {patient.diagnosis.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
      <h3 className="text-xl font-bold mb-2">Exercise History</h3>
      {patient.exerciseHistory.length === 0 ? (
        <div className="text-gray-500">No exercise history.</div>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Task</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Frequency</th>
              <th className="p-2 text-left">Progress</th>
              <th className="p-2 text-left">Last Attempt</th>
              <th className="p-2 text-left">Avg Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {patient.exerciseHistory.map((ex) => (
              <tr key={ex.id} className="border-t">
                <td className="p-2 font-medium">{ex.name}</td>
                <td className="p-2">
                  <span className={ex.status === 'active' ? 'text-green-600' : 'text-gray-400'}>{ex.status}</span>
                </td>
                <td className="p-2">{ex.frequency.timesPerWeek}x/wk ({ex.frequency.daysOfWeek.join(', ')})</td>
                <td className="p-2">
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.round((ex.progress ?? 0) * 100)}%` }} />
                  </div>
                  <span className="ml-2 text-xs">{Math.round((ex.progress ?? 0) * 100)}%</span>
                </td>
                <td className="p-2">{ex.lastAttempt ? new Date(ex.lastAttempt).toLocaleDateString() : '—'}</td>
                <td className="p-2">{ex.averageTimeToComplete ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 