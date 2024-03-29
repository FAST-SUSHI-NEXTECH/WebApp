import { Roboto } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/AuthContext';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
    title: 'Fast Sushi',
    description: 'Web app created by @talace',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={roboto.className}>
        <AuthProvider>
                <main className="bg-gray-800">
                    <div className="max-w-6xl mx-auto p-4 relative">
                        <Header />
                        {children}
                    </div>
                    <div className="bg-black">
                        <Footer />
                    </div>
                </main>
        </AuthProvider>
        </body>
        </html>
    );
}
