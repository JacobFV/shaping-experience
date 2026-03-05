import { getAllChapters, getChapterSlugs, getChapter } from '@/lib/chapters';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getChapterSlugs().map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapters = await getAllChapters();
  const filename = `${slug}.md`;

  let chapter;
  try {
    chapter = await getChapter(filename);
  } catch {
    notFound();
  }

  const idx = chapters.findIndex(c => c.slug === slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      <div className="chapter-nav">
        <div>{prev && <Link href={`/${prev.slug}`}>&larr; {prev.title}</Link>}</div>
        <div>{next && <Link href={`/${next.slug}`}>{next.title} &rarr;</Link>}</div>
      </div>
    </div>
  );
}
