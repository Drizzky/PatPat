import type { Metadata } from 'next';
import '@/app/globals.css';
import Footer from '../components/ui/FooterComponent';

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
                {/* main content */}
                <main className='flex-1 flex items-center justify-center'>
                    {children}
                </main>

                {/* footer always at bottom */}
                <Footer />
            </body>
        </html>
    );
}
