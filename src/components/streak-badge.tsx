interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const sizes = {
    sm: { text: 'text-sm', icon: 'text-base', gap: 'gap-0.5', px: 'px-2 py-0.5' },
    md: { text: 'text-base', icon: 'text-lg', gap: 'gap-1', px: 'px-3 py-1' },
    lg: { text: 'text-xl font-bold', icon: 'text-2xl', gap: 'gap-1.5', px: 'px-4 py-2' },
  };
  const s = sizes[size];

  return (
    <div
      className={`inline-flex items-center rounded-full font-semibold ${s.gap} ${s.px}`}
      style={{ background: 'rgba(255, 150, 0, 0.12)', color: 'var(--streak)', border: '1.5px solid rgba(255, 150, 0, 0.25)' }}
    >
      <span className={s.icon}>🔥</span>
      <span className={s.text}>{streak}</span>
    </div>
  );
}
