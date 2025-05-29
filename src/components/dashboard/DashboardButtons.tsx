'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface DashboardButtonProps {
  title: string;
  description: string;
  href: string;
  buttonText?: string;
}

interface DashboardButtonsProps {
  buttons: DashboardButtonProps[];
  columns?: 1 | 2 | 3 | 4;
}

export function DashboardButtons({ buttons, columns = 2 }: DashboardButtonsProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]}`}>
      {buttons.map((button) => (
        <Link key={button.href} href={button.href}>
          <div className="p-6 border rounded-lg hover:border-primary transition-colors flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-2">{button.title}</h2>
            <p className="text-muted-foreground mb-4">{button.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
} 