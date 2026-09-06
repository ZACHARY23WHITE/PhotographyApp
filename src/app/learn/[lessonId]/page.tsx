import { LESSONS } from '@/data/lessons';
import LessonClient from './lesson-client';

// Pre-generate one static HTML file per lesson so this route works in a
// fully static export (required for the native/App Store bundle).
export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <LessonClient lessonId={lessonId} />;
}
