import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressRing from "../ProgressRing";
import AverageTimeBar from "../AverageTimeBar";
import { ExerciseSession } from "@/lib/types/patient";

interface DataTableProps {
  sessions: ExerciseSession[];
  onRowClick?: (session: ExerciseSession) => void;
}

export default function DataTable({ sessions, onRowClick }: DataTableProps) {
  return (
    <ScrollArea className="max-h-[60vh]">
      <div className="space-y-3">
        {sessions.map((row) => (
          <Card
            key={row.id}
            className="flex items-center gap-4 px-4 py-3 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => onRowClick?.(row)}
          >
            <div className="w-16 flex-shrink-0 flex items-center justify-center">
              <ProgressRing value={row.progress ?? 0} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base">
                {row.category ? (
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mr-2"
                    style={{ background: '#f3f4f6', color: '#6366f1' }}>{row.category}</span>
                ) : null}
                {row.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {(row.tasks && row.tasks.length > 0) ? row.tasks.join(", ") : '-'}
              </div>
            </div>
            <div className="w-28 text-xs text-gray-700">
              {row.status === 'active' ? (
                <span className="text-green-600 font-semibold">Active</span>
              ) : (
                <span className="text-gray-400">Inactive</span>
              )}
              <div>{row.frequency?.timesPerWeek ? `${row.frequency.timesPerWeek}x/week` : '-'}</div>
            </div>
            <div className="w-32 flex-shrink-0">
              <AverageTimeBar value={row.averageTimeToComplete ?? 0} />
            </div>
            <div className="w-24 text-xs text-gray-700">
              {row.lastAttempt ? new Date(row.lastAttempt).toLocaleDateString() : '-'}
            </div>
            <div className="w-20 text-xs text-gray-700 text-center">
              {typeof row.averageTimeToComplete === 'number' ? `${Math.round(row.averageTimeToComplete)}s` : '-'}
            </div>
            <div className="w-8 text-right text-gray-400">⋮</div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
} 