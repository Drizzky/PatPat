import './globals.css';
import Footer from '../components/ui/FooterComponent';
import { Toaster } from '@/components/ui/sonner';
import ClientProviders from './client-providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientProviders>
          <main className="flex-1 flex items-center justify-center">{children}</main>
          <Toaster />
        </ClientProviders>
        <Footer />
      </body>
    </html>
  );
}
