import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkMath from 'remark-math';

export interface Chapter {
  slug: string;
  title: string;
  content: string;
  order: number;
}

const CHAPTERS_DIR = path.join(process.cwd(), '..', 'chapters');

export function getChapterSlugs(): string[] {
  if (!fs.existsSync(CHAPTERS_DIR)) return [];
  return fs.readdirSync(CHAPTERS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();
}

export async function getChapter(filename: string): Promise<Chapter> {
  const filePath = path.join(CHAPTERS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);

  const result = await remark()
    .use(remarkMath)
    .use(html, { sanitize: false })
    .process(content);

  // Extract title from first h1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : filename.replace(/\.md$/, '');

  // Order from filename prefix
  const orderMatch = filename.match(/^(\d+)/);
  const order = orderMatch ? parseInt(orderMatch[1]) : 0;

  return {
    slug: filename.replace(/\.md$/, ''),
    title,
    content: result.toString(),
    order,
  };
}

export async function getAllChapters(): Promise<Chapter[]> {
  const filenames = getChapterSlugs();
  const chapters = await Promise.all(filenames.map(getChapter));
  return chapters.sort((a, b) => a.order - b.order);
}
