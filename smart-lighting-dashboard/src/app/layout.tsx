import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Smart City Lighting Dashboard',
  description: 'AI-Powered Command Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden text-slate-800 bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
