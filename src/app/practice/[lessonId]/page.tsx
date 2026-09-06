import { LESSONS } from '@/data/lessons';
import PracticeClient from './practice-client';

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <PracticeClient lessonId={lessonId} />;
}
