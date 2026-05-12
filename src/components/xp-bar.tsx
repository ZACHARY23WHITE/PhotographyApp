'use client';

import { levelFromXp, xpForLevel } from '@/lib/firestore-users';

interface XpBarProps {
  xp: number;
  className?: string;
}

export default function XpBar({ xp, className = '' }: XpBarProps) {
  const level = levelFromXp(xp);
  const currentLevelXp = (level - 1) * 500;
  const nextLevelXp = xpForLevel(level);
  const progress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted-light)' }}>
        <span>Level {level}</span>
        <span>{xp - currentLevelXp} / {nextLevelXp - currentLevelXp} XP</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%`, background: 'var(--primary)' }}
        />
      </div>
    </div>
  );
}
