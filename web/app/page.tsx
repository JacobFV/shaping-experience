import { getAllChapters } from '@/lib/chapters';
import Link from 'next/link';

export default async function Home() {
  const chapters = await getAllChapters();

  return (
    <div>
      <h1>Shaping Experience</h1>
      <p><em>The Shape of Experience</em> establishes the geometry. This book works with it.</p>
      <p>The first book ends with &ldquo;The One Who Causes to Become.&rdquo; This one picks up from your body, right now, and asks: what do you do with the shape?</p>
      <hr />
      {chapters.map((ch) => (
        <div key={ch.slug} style={{ marginBottom: '1rem' }}>
          <Link href={`/${ch.slug}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
            {ch.title}
          </Link>
        </div>
      ))}
      <hr />
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
        Work in progress. This is active research, not a finished publication.
      </p>
    </div>
  );
}
