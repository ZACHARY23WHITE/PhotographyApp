'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getLessonById, CATEGORIES } from '@/data/lessons';
import BottomNav from '@/components/bottom-nav';
import { useEffect } from 'react';

export default function PracticePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLessonById(lessonId);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    if (!loading && (!lesson || !lesson.practicePrompt)) router.replace('/');
  }, [loading, user, lesson, router]);

  if (loading || !user || !lesson || !lesson.practicePrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === lesson.category);

  return (
    <div className="min-h-screen flex flex-col pb-24" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: 'var(--surface)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            {category?.emoji} Practice Challenge
          </p>
          <p className="text-sm font-bold truncate">{lesson.title}</p>
        </div>
      </div>

      <div className="flex-1 px-5 flex flex-col">
        {/* Category badge */}
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'var(--surface)', color: 'var(--muted)' }}
          >
            {category?.emoji} {category?.label}
          </span>
        </div>

        {/* Challenge card */}
        <div
          className="rounded-3xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, #FF6B00 0%, #FF9A3C 100%)',
            boxShadow: '0 8px 32px rgba(255,107,0,0.25)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: 22 }}>📷</span>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Your Challenge
            </p>
          </div>
          <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>
            {lesson.practicePrompt}
          </p>
        </div>

        {/* Instruction */}
        <p className="text-sm mb-8 text-center" style={{ color: 'var(--muted)' }}>
          Go shoot — then come back and upload your best photo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={() => router.push(`/practice/${lessonId}/submit`)}
            className="w-full py-4 rounded-2xl font-bold text-base"
            style={{ background: '#1B9AE4', color: '#fff', boxShadow: '0 4px 0 #1070BE' }}
          >
            Submit my photo →
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm"
            style={{ background: 'var(--surface)', color: 'var(--foreground)', border: '1.5px solid var(--border)' }}
          >
            I'll come back later
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
