import { Roboto } from 'next/font/google'
import './globals.css'
import Footer from "@/components/layout/Footer";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Fast Sushi',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={roboto.className}>
      <main className='bg-blue-950'>
          <div className='max-w-6xl mx-auto p-4 relative'>
              {children}
          </div>
          <div className="bg-black"><Footer /></div>
      </main>
      </body>
    </html>
  )
}
