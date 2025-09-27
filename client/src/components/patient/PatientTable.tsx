'use client'
import { useState } from 'react'
import Link from 'next/link'
import { calculateAge, daysAgo } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import type { Patient } from '@/lib/types/patient'

interface Props {
  patients: Patient[]
  pageSize?: number
}

export default function PatientTable({ patients, pageSize = 10 }: Props) {
  const [visible, setVisible] = useState(pageSize)
  const slice = patients.slice(0, visible)

  return (
    <table className="min-w-[980px] text-sm">
      <thead className="bg-gray-50 sticky top-0 z-10 text-muted-foreground">
        <tr>
          <th className="w-10 p-3" />
          <th className="px-3 py-2 text-left font-semibold">MRN</th>
          <th className="px-3 py-2 text-left font-semibold">Name</th>
          <th className="px-3 py-2 text-left font-semibold">Date&nbsp;of&nbsp;Birth</th>
          <th className="px-3 py-2 text-left font-semibold">Gender</th>
          <th className="px-3 py-2 text-left font-semibold">Diagnosis</th>
          <th className="px-3 py-2 text-left font-semibold">Date&nbsp;of&nbsp;Stroke&nbsp;Onset</th>
          <th className="w-32 px-3 py-2 text-left font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {slice.map((p, i) => (
          <tr key={p.id} className={i % 2 ? 'bg-gray-50' : ''}>
            <td className="p-3 text-center cursor-pointer">☆ {/* TODO(cursor): implement stateful star toggle */}</td>
            <td className="px-3 py-2 font-mono">{p.mrn}</td>
            <td className="px-3 py-2 font-medium">{p.name}</td>
            <td className="px-3 py-2">
              {new Date(p.dateOfBirth).toLocaleDateString('en-US', { month:'2-digit', day:'2-digit', year:'numeric' })}
              <span className="text-muted-foreground"> ({calculateAge(p.dateOfBirth)} y.o)</span>
            </td>
            <td className="px-3 py-2">{p.gender}</td>
            <td className="px-3 py-2">
              <div className="flex flex-wrap gap-1">
                {p.diagnosis.slice(0,3).map((d, index) => (
                  <span
                    key={`${p.id}-${d}-${index}`}
                    className="rounded-full bg-gray-100 text-xs px-2 py-1 border border-gray-200"
                  >
                    {d}
                  </span>
                ))}
                {p.diagnosis.length > 3 && (
                  <span className="rounded-full border border-gray-300 w-5 h-5 flex items-center justify-center text-xs">
                    + {/* TODO(cursor): show overflow modal with all diagnoses */}
                  </span>
                )}
              </div>
            </td>
            <td className="px-3 py-2">
              {new Date(p.strokeOnsetDate).toLocaleDateString('en-US', { month:'2-digit', day:'2-digit', year:'numeric' })}
              <div className="inline-block ml-2 rounded-full bg-teal-100 text-teal-600 text-[10px] px-2 py-[1px]">
                {daysAgo(p.strokeOnsetDate)} days ago
              </div>
            </td>
            <td className="px-3 py-2 flex items-center gap-3">
              <Link href={`/post-login/patients/${p.id}`} className="text-blue-600 hover:underline whitespace-nowrap">
                View More →
              </Link>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:bg-gray-100">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
        {visible < patients.length && (
          <tr>
            <td colSpan={8} className="py-4 text-center">
              <Button variant="secondary" onClick={() => setVisible(v => v + pageSize)}>
                Load more
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
} 