import { LESSONS } from '@/data/lessons';
import SubmitPracticeClient from './submit-client';

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <SubmitPracticeClient lessonId={lessonId} />;
}
