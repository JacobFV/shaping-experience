import './globals.css';
import type { Metadata } from 'next';
import { getAllChapters } from '@/lib/chapters';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shaping Experience',
  description: 'Follow-up to The Shape of Experience. What do you do with the geometry?',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const chapters = await getAllChapters();

  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <h2>Shaping Experience</h2>
            <nav>
              {chapters.map((ch) => (
                <Link key={ch.slug} href={`/${ch.slug}`}>
                  {ch.title}
                </Link>
              ))}
            </nav>
            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
              <p>Follows <a href="https://theshapeofexperience.org" style={{ color: 'var(--accent)' }}>The Shape of Experience</a></p>
            </div>
          </aside>
          <main className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
