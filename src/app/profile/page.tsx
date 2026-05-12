'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import BottomNav from '@/components/bottom-nav';
import XpBar from '@/components/xp-bar';
import StreakBadge from '@/components/streak-badge';
import { LESSONS, CATEGORIES } from '@/data/lessons';

export default function ProfilePage() {
  const { user, profile, loading, signOut } = useAuth();
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

  const completedCount = profile.completedLessons.length;
  const totalLessons = LESSONS.length;

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={async () => { await signOut(); router.replace('/login'); }}
          className="text-sm px-3 py-1.5 rounded-lg"
          style={{ color: 'var(--muted)', background: 'var(--surface)' }}
        >
          Sign out
        </button>
      </div>

      <div className="px-5 space-y-5">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{ background: 'var(--primary)', color: '#0A0A0A' }}
          >
            {profile.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-lg">{profile.displayName}</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Level {profile.level} Photographer</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{profile.xp.toLocaleString()}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Total XP</p>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
            <div className="flex justify-center">
              <StreakBadge streak={profile.streak} size="sm" />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Streak</p>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Lessons</p>
          </div>
        </div>

        {/* XP progress */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
          <p className="font-semibold text-sm mb-3">Progress to Level {profile.level + 1}</p>
          <XpBar xp={profile.xp} />
        </div>

        {/* Category progress */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Skills
          </h2>
          <div className="space-y-3">
            {CATEGORIES.map(cat => {
              const catLessons = LESSONS.filter(l => l.category === cat.id);
              const catCompleted = catLessons.filter(l => profile.completedLessons.includes(l.id)).length;
              const pct = catLessons.length > 0 ? (catCompleted / catLessons.length) * 100 : 0;

              return (
                <div key={cat.id} className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span className="font-semibold text-sm">{cat.label}</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>
                      {catCompleted}/{catLessons.length}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: pct === 100 ? 'var(--success)' : 'var(--primary)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        {profile.interests.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map(interest => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full text-sm font-medium capitalize"
                  style={{ background: 'var(--surface)', color: 'var(--muted-light)' }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Progress bar overall */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">Overall completion</p>
            <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
              {Math.round((completedCount / totalLessons) * 100)}%
            </p>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(completedCount / totalLessons) * 100}%`,
                background: 'var(--primary)',
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
            {completedCount} of {totalLessons} lessons complete
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
