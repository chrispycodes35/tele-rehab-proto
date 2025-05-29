import { Header } from '@/components/layout/Header';

export default function PostLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
} 