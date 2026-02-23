import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Google Cloud Tech Conference 2026',
  description: '1-Day Google Cloud Technical Conference Event Schedule',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className} suppressHydrationWarning>
        <nav className="global-nav">
          <div className="container nav-content">
            <a href="/" className="nav-logo">Google Cloud App</a>
            <div className="nav-links">
              <a href="/" className="nav-link">Event Schedule</a>
              <a href="/learning" className="nav-link">Backend Learning</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
