'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import BottomNav from '@/components/bottom-nav';
import StreakBadge from '@/components/streak-badge';
import XpBar from '@/components/xp-bar';
import { LESSONS, CATEGORIES } from '@/data/lessons';

export default function HomePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    if (!loading && user && !profile) router.replace('/onboarding');
  }, [loading, user, profile, router]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const nextLesson = LESSONS.find(l => !profile.completedLessons.includes(l.id));
  const completedCount = profile.completedLessons.length;

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">
            Hey, {profile.displayName.split(' ')[0]} 👋
          </h1>
          <StreakBadge streak={profile.streak} />
        </div>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {completedCount === 0
            ? 'Ready to take your first lesson?'
            : `${completedCount} lesson${completedCount !== 1 ? 's' : ''} completed — keep going!`}
        </p>
      </div>

      <div className="px-5 space-y-5">
        {/* XP Bar */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
          <XpBar xp={profile.xp} />
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
            Level {profile.level} Photographer
          </p>
        </div>

        {/* Today's Lesson */}
        {nextLesson && (
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Up Next
            </h2>
            <Link href={`/learn/${nextLesson.id}`}>
              <div
                className="rounded-2xl p-5 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                style={{ background: 'var(--primary)', color: '#0A0A0A' }}
              >
                <div className="text-4xl">
                  {CATEGORIES.find(c => c.id === nextLesson.category)?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                    {nextLesson.category}
                  </p>
                  <p className="font-bold text-lg leading-tight">{nextLesson.title}</p>
                  <p className="text-sm opacity-75 mt-0.5">{nextLesson.estimatedMinutes} min · {nextLesson.xpReward} XP</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          </div>
        )}

        {completedCount === LESSONS.length && (
          <div className="rounded-2xl p-5 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-3xl mb-2">🏆</p>
            <p className="font-bold">All lessons complete!</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>More lessons coming soon.</p>
          </div>
        )}

        {/* Categories overview */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(cat => {
              const catLessons = LESSONS.filter(l => l.category === cat.id);
              const catCompleted = catLessons.filter(l => profile.completedLessons.includes(l.id)).length;
              const pct = Math.round((catCompleted / catLessons.length) * 100);
              return (
                <Link key={cat.id} href="/learn">
                  <div
                    className="rounded-2xl p-4 active:scale-[0.97] transition-transform cursor-pointer"
                    style={{ background: 'var(--surface)' }}
                  >
                    <div className="text-2xl mb-2">{cat.emoji}</div>
                    <p className="font-semibold text-sm">{cat.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      {catCompleted}/{catLessons.length} done
                    </p>
                    <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: 'var(--primary)' }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
