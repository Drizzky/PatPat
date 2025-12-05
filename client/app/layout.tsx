import './globals.css';
import Footer from '../components/ui/FooterComponent';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <main className="flex-1 flex items-center justify-center">{children}</main>
          <Toaster position="top-center" />

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
