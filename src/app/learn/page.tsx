'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import BottomNav from '@/components/bottom-nav';
import { CATEGORIES, getLessonsByCategory } from '@/data/lessons';

export default function LearnPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)' }}>
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          {profile.completedLessons.length} of {CATEGORIES.flatMap(c => getLessonsByCategory(c.id)).length} lessons completed
        </p>
      </div>

      <div className="px-5 space-y-6">
        {CATEGORIES.map(cat => {
          const lessons = getLessonsByCategory(cat.id);
          const completedInCat = lessons.filter(l => profile.completedLessons.includes(l.id)).length;

          return (
            <div key={cat.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cat.emoji}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-base">{cat.label}</h2>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{cat.description}</p>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                  {completedInCat}/{lessons.length}
                </span>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson, idx) => {
                  const completed = profile.completedLessons.includes(lesson.id);
                  const prevCompleted = idx === 0 || profile.completedLessons.includes(lessons[idx - 1].id);
                  const locked = !completed && !prevCompleted;

                  const badge = completed
                    ? { bg: 'rgba(74, 222, 128, 0.15)', color: 'var(--success)', icon: '✓' }
                    : locked
                    ? { bg: 'var(--surface-elevated)', color: 'var(--muted)', icon: '🔒' }
                    : { bg: 'rgba(245, 166, 35, 0.15)', color: 'var(--primary)', icon: '▶' };

                  const content = (
                    <div
                      className="rounded-2xl p-4 flex items-center gap-4 transition-all"
                      style={{
                        background: 'var(--surface)',
                        opacity: locked ? 0.5 : 1,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold shrink-0"
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {badge.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{lesson.title}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted)' }}>
                          {lesson.estimatedMinutes} min · {lesson.xpReward} XP · {lesson.difficulty}
                        </p>
                      </div>
                      {!locked && !completed && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--muted)', flexShrink: 0 }}>
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </div>
                  );

                  return locked ? (
                    <div key={lesson.id}>{content}</div>
                  ) : (
                    <Link key={lesson.id} href={`/learn/${lesson.id}`}>
                      <div className="active:scale-[0.98] transition-transform">{content}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
