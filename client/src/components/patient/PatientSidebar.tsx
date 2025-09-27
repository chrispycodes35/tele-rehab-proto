'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { mockFetchPatientById } from '@/lib/mock/patientData';

const menu = [
  { key: 'overview',             label: 'Overview',              icon: '👁️' },
  { key: 'functional-tests',     label: 'Functional Tests',      icon: '🧪' },
  { key: 'exercise-prescription',label: 'Exercise Prescription', icon: '💊' },
  { key: 'exercise-history',     label: 'Exercise History',      icon: '⏱️' },
  { key: 'education',            label: 'Education',             icon: '🎓' },
];

export default function PatientSidebar({ patientId }: { patientId: string }) {
  const router  = useRouter();
  const active  = useSelectedLayoutSegment() ?? 'overview';
  const [patient, setPatient] = useState<any>(null);

  /* fetch name / avatar once */
  useEffect(() => {
    mockFetchPatientById(patientId).then(setPatient);
  }, [patientId]);

  return (
    <aside className="w-56 h-full border-r bg-background flex flex-col py-6">
      {/* ───────── top section ───────── */}
      <div className="flex-1 px-4">
        {/* back button */}
        <button
          onClick={() => router.push('/post-login/patients')}
          className="mb-6 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm 
                     text-muted-foreground hover:bg-muted/60 transition"
        >
          ← Back to Patient List
        </button>

        {/* avatar + name */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={patient?.avatar ?? '/avatar1.png'}
            alt="avatar"
            className="w-14 h-14 rounded-full border"
          />
          <span className="mt-3 text-center text-base font-medium">
            {patient?.name ?? 'Loading…'}
          </span>
        </div>

        {/* nav */}
        <nav className="space-y-1">
          {menu.map(({ key, label, icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => router.push(`/post-login/patients/${patientId}/${key}`, { scroll: false })}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition
                  ${isActive
                    ? 'bg-muted text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted/50'}`}
              >
                <span className={isActive ? '' : 'opacity-70'}>{icon}</span>
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
