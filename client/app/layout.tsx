import type { Metadata } from 'next';
import '@/app/globals.css';
import Footer from '../components/ui/FooterComponent';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Pat²',
    description: 'Meow',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className='flex flex-col min-h-screen'>
                <main className='flex-1 flex items-center justify-center'>
                    {children}
                </main>
                <Toaster />
                <Footer />
            </body>
        </html>
    );
}
