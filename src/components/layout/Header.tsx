'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Patients', href: '/dashboard/patients' },
  { name: 'Calendar', href: '/dashboard/calendar' },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('therapistId');
    router.push('/login');
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center">
        {/* Left section: TeleRehab + nav links + logout */}
        <div className="flex items-center space-x-6 flex-grow">
          <Link 
            href="/dashboard" 
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            TeleRehab
          </Link>
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>

        {/* Right section: Demo Therapist */}
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">Demo Therapist</span>
        </div>
      </div>
    </header>
  );
}
