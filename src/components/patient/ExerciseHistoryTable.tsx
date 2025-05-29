'use client'
import { useMemo, useState } from 'react'
import type { ExerciseSession } from '@/lib/types/patient'
import TableToolbar from './DataTable/TableToolbar'
import DataTable from './DataTable/DataTable'

interface Props { sessions: ExerciseSession[] }

export default function ExerciseHistoryTable({ sessions }: Props) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'recent'|'name'>('recent')
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    let rows = sessions
    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter(r => r.name.toLowerCase().includes(q))
    }
    if (sortKey === 'name') {
      rows = [...rows].sort((a,b) => a.name.localeCompare(b.name))
    } else { // recent
      rows = [...rows].sort((a,b) => (b.lastAttempt ?? '').localeCompare(a.lastAttempt ?? ''))
    }
    return rows.slice(0, pageSize)
  }, [sessions, search, sortKey, pageSize])

  if (!sessions.length) return <p className="text-center text-gray-500 mt-12">No exercise history.</p>

  return (
    <div>
      <TableToolbar
        search={search}
        sortKey={sortKey}
        pageSize={pageSize}
        onSearch={setSearch}
        onSortChange={v => setSortKey(v as any)}
        onPageSizeChange={setPageSize}
      />
      <DataTable sessions={filtered}/>
    </div>
  )
} 