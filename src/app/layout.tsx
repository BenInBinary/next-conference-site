import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dev Interview Prep Hub',
  description: 'A comprehensive resource for modern backend and full-stack technical interviews',
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
            <a href="/" className="nav-logo">Dev Interview Prep</a>
            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/learning" className="nav-link">Interview Questions</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
