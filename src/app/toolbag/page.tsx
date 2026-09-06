'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import BottomNav from '@/components/bottom-nav';
import { TOOLBAG_ITEMS, CATEGORY_COLORS, isToolUnlocked } from '@/data/toolbag';

const CATEGORY_LABELS: Record<string, string> = {
  color: 'Color',
  composition: 'Composition',
  lighting: 'Lighting',
  technique: 'Technique',
};

const TOOL_ICONS: Record<string, React.ReactNode> = {
  'color-wheel': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <path
          key={i}
          d={`M 16 16 L ${16 + 12 * Math.cos((deg - 90) * Math.PI / 180)} ${16 + 12 * Math.sin((deg - 90) * Math.PI / 180)} A 12 12 0 0 1 ${16 + 12 * Math.cos((deg - 60) * Math.PI / 180)} ${16 + 12 * Math.sin((deg - 60) * Math.PI / 180)} Z`}
          fill={`hsl(${deg}, 90%, 55%)`}
        />
      ))}
      <circle cx="16" cy="16" r="5" fill="white" />
    </svg>
  ),
  'composition-guide': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round">
      <rect x="4" y="4" width="24" height="18" rx="2" />
      <line x1="12" y1="4" x2="12" y2="22" />
      <line x1="20" y1="4" x2="20" y2="22" />
      <line x1="4" y1="10" x2="28" y2="10" />
      <line x1="4" y1="16" x2="28" y2="16" />
      <circle cx="12" cy="10" r="2" fill="#FF6B00" stroke="none" />
    </svg>
  ),
  'aspect-ratio': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="18" rx="2" />
      <rect x="12" y="12" width="17" height="13" rx="2" fill="#FFF4EE" />
    </svg>
  ),
  'shutter-speed': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1B9AE4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="12" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        return <line key={i} x1={16 + 5 * Math.cos(a)} y1={16 + 5 * Math.sin(a)} x2={16 + 11 * Math.cos(a)} y2={16 + 11 * Math.sin(a)} />;
      })}
      <circle cx="16" cy="16" r="3.5" fill="#1B9AE4" stroke="none" />
    </svg>
  ),
  'color-temperature': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="ctIcon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF8A3D" />
          <stop offset="50%" stopColor="#FFF3E0" />
          <stop offset="100%" stopColor="#6FB4FF" />
        </linearGradient>
      </defs>
      <rect x="4" y="12" width="24" height="8" rx="4" fill="url(#ctIcon)" />
      <circle cx="16" cy="16" r="6" fill="none" stroke="#F5A623" strokeWidth="2" />
    </svg>
  ),
  'light-direction': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="19" cy="17" r="8" fill="#F5A623" opacity="0.25" />
      <path d="M19 9 a8 8 0 0 1 0 16 z" fill="#F5A623" opacity="0.85" />
      <circle cx="19" cy="17" r="8" fill="none" stroke="#F5A623" strokeWidth="2" />
      <circle cx="8" cy="8" r="3" fill="#FFD34D" />
      {[0, 90, 180, 270].map((deg, i) => {
        const a = deg * Math.PI / 180;
        return <line key={i} x1={8 + 4 * Math.cos(a)} y1={8 + 4 * Math.sin(a)} x2={8 + 6 * Math.cos(a)} y2={8 + 6 * Math.sin(a)} stroke="#FFD34D" strokeWidth="1.6" strokeLinecap="round" />;
      })}
    </svg>
  ),
  'golden-hour': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="23" x2="28" y2="23" />
      <path d="M9 23 a7 7 0 0 1 14 0" fill="#FDE68A" stroke="#F5A623" />
      <line x1="16" y1="7" x2="16" y2="11" />
      <line x1="6" y1="12" x2="8.5" y2="14" />
      <line x1="26" y1="12" x2="23.5" y2="14" />
    </svg>
  ),
};

export default function ToolbagPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const completedLessons = profile.completedLessons;
  const unlockedCount = TOOLBAG_ITEMS.filter(t => isToolUnlocked(t, completedLessons)).length;

  return (
    <div className="min-h-screen pb-24 sm:pb-8" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-20 px-5 pt-safe-top"
        style={{ background: 'var(--bg)', paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
      >
        <div className="pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--foreground)' }}>Toolbag</h1>
            <span
              style={{
                fontSize: 12, fontWeight: 700, color: 'var(--muted)',
                background: 'var(--surface)', border: '1.5px solid var(--border)',
                borderRadius: 99, padding: '4px 10px',
              }}
            >
              {unlockedCount} / {TOOLBAG_ITEMS.length} unlocked
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600 }}>
            Your field reference — always ready when you shoot.
          </p>
        </div>
      </header>

      <div className="px-5 pt-2">
        <div className="flex flex-col gap-4">
          {TOOLBAG_ITEMS.map(item => {
            const unlocked = isToolUnlocked(item, completedLessons);
            const theme = CATEGORY_COLORS[item.category];

            const inner = (
              <div
                style={{
                  background: unlocked ? 'var(--surface)' : 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 16,
                  padding: '18px 18px',
                  boxShadow: unlocked ? '0 2px 12px rgba(27,154,228,0.08), 0 1px 4px rgba(0,0,0,0.04)' : 'none',
                  opacity: unlocked ? 1 : 0.55,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  transition: 'opacity 0.2s',
                  cursor: unlocked ? 'pointer' : 'default',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: unlocked ? theme.bg : '#F0F0F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    filter: unlocked ? 'none' : 'grayscale(1)',
                  }}
                >
                  {TOOL_ICONS[item.id]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      style={{
                        fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: unlocked ? theme.color : 'var(--muted)',
                      }}
                    >
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--foreground)', marginBottom: 4 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.45 }}>
                    {item.description}
                  </p>
                  {!unlocked && item.unlockLabel && (
                    <div
                      className="flex items-center gap-1.5 mt-3"
                      style={{
                        background: '#F4F6F8', borderRadius: 8, padding: '6px 10px',
                        display: 'inline-flex',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>
                        {item.unlockLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                {unlocked && (
                  <div
                    className="flex-shrink-0 self-center"
                    style={{ color: 'var(--muted-light)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </div>
            );

            return unlocked ? (
              <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
                {inner}
              </Link>
            ) : (
              <div key={item.id}>{inner}</div>
            );
          })}
        </div>

        {/* Coming soon hint */}
        <p
          className="text-center mt-8 mb-2"
          style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted-light)' }}
        >
          More tools unlock as you complete lessons.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
