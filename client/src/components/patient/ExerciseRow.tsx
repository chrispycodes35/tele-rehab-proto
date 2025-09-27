'use client'
import { ExerciseSession } from '@/lib/types/patient'
import ProgressRing from './ProgressRing'
import AverageTimeBar from './AverageTimeBar'
import { daysAgo } from '@/lib/utils'
import Link from 'next/link'

export default function ExerciseRow({ ex }: { ex: ExerciseSession }) {
  return (
    <tr className="border-b last:border-0">
      <td className="p-3"><ProgressRing value={ex.progress ?? 0}/></td>
      <td className="p-3">
        <span className="rounded-full text-xs px-2 py-[2px] mr-2" style={{backgroundColor:'#e6f7ff'}}>{ex.category}</span>
        <div className="text-sm font-medium leading-tight">{ex.name}</div>
      </td>
      <td className="p-3">
        <span className={`rounded-full text-[11px] px-2 py-[1px] ${ex.status==='active'?'bg-blue-100 text-blue-600':'bg-gray-200 text-gray-500'}`}>{ex.status}</span>
        <div className="text-xs text-muted-foreground">{ex.frequency.timesPerWeek} Times / Week</div>
      </td>
      <td className="p-3 whitespace-nowrap text-xs">
        <span className="font-medium text-green-600">{daysAgo(ex.lastAttempt)} days ago</span>
        <br/>{new Date(ex.lastAttempt).toLocaleDateString()}
      </td>
      <td className="p-3"><AverageTimeBar value={ex.averageTimeToComplete}/></td>
      <td className="p-3 text-right text-blue-600 text-sm"><Link href="#">View More{/* TODO(cursor): modal for details */}</Link></td>
    </tr>
  )
} 