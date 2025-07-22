import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'DUYDUY',
  description: 'Short video app with heart system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-4xl mx-auto mt-4 px-4">{children}</main>
      </body>
    </html>
  )
}
