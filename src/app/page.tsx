'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import BottomNav from '@/components/bottom-nav';
import PhotoPhil from '@/components/photo-phil';
import { CATEGORIES, getCategoriesForCameraType, getLessonsByCategory, LESSONS } from '@/data/lessons';
import type { Lesson, LessonCategory } from '@/data/lessons';

// ── Constants ─────────────────────────────────────────────────────────────────

const LEVEL_TITLES: Record<number, string> = {
  1: 'Rookie', 2: 'Photographer', 3: 'Enthusiast', 4: 'Pro',
  5: 'Expert', 6: 'Veteran', 7: 'Virtuoso', 8: 'Master', 9: 'Legend',
};

const CHAPTER_THEMES: Record<LessonCategory, { color: string; bg: string; shadow: string; tagline: string }> = {
  composition:  { color: '#FF6B00', bg: '#FFF4EE', shadow: '#C45200', tagline: 'Frame your world like a pro' },
  color:        { color: '#E8534A', bg: '#FFF1F0', shadow: '#B83A32', tagline: 'Paint with light and hue' },
  lighting:     { color: '#F5A623', bg: '#FFFCEF', shadow: '#C07D10', tagline: 'Chase the perfect light' },
  technique:    { color: '#1B9AE4', bg: '#EFF8FF', shadow: '#1070BE', tagline: 'Master your camera controls' },
  iphone:       { color: '#1B9AE4', bg: '#EFF8FF', shadow: '#1070BE', tagline: 'Get the most from your iPhone' },
  'pro-camera': { color: '#8B5CF6', bg: '#F3F0FF', shadow: '#6D3FD1', tagline: 'Get everything from your pro camera' },
  gear:         { color: '#10B981', bg: '#ECFDF5', shadow: '#0A8A61', tagline: 'Gear that elevates every shot' },
};

const NODE_SIZE = 64;

// ── Types ─────────────────────────────────────────────────────────────────────

type NodeState = 'done' | 'active' | 'next' | 'locked';
type ConnState = 'done' | 'active' | 'locked';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  const prefix = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  return `${prefix}, ${name.split(' ')[0]}!`;
}

function getNodeState(
  lessonId: string,
  completedLessons: string[],
  currentLessonId: string | undefined,
  isFirstUncompletedInChapter: boolean,
): NodeState {
  if (completedLessons.includes(lessonId)) return 'done';
  if (lessonId === currentLessonId) return 'active';
  if (isFirstUncompletedInChapter) return 'next';
  return 'locked';
}

function getConnState(left: NodeState, right: NodeState): ConnState {
  if (left === 'done' && right === 'done') return 'done';
  if (left === 'done' && (right === 'active' || right === 'next')) return 'active';
  return 'locked';
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CameraIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8CBD8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function ChevronRight({ color = 'white' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}

// ── LessonNode ────────────────────────────────────────────────────────────────

function LessonNode({ lesson, state, chapterColor, practiced }: { lesson: Lesson; state: NodeState; chapterColor: string; practiced: boolean }) {
  const circleBg =
    state === 'done'   ? '#58CC02' :
    state === 'active' ? '#FF6B00' :
    state === 'next'   ? '#FFFFFF' : '#EEF4F9';

  const circleShadow =
    state === 'done'   ? '0 4px 0 #46A201' :
    state === 'active' ? '0 4px 0 #C45200' :
    state === 'next'   ? `0 4px 0 ${chapterColor}44` :
    '0 3px 0 #D4E4F0';

  const textColor = state === 'locked' ? '#B8CBD8' : state === 'next' ? '#6A89AA' : 'var(--foreground)';
  const opacity = state === 'locked' ? 0.55 : 1;

  const inner = (
    <div className="flex flex-col items-center gap-1.5" style={{ opacity, width: NODE_SIZE + 8 }}>
      <div style={{ position: 'relative', width: NODE_SIZE, height: NODE_SIZE, flexShrink: 0 }}>
        {state === 'active' && (
          <div
            className="animate-pulse-ring"
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: '3px solid #FF6B00',
            }}
          />
        )}
        <div
          style={{
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderRadius: '50%',
            background: circleBg,
            boxShadow: circleShadow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {state === 'done'   && <CheckIcon />}
          {state === 'active' && <CameraIcon color="white" size={22} />}
          {state === 'next'   && <CameraIcon color={chapterColor} size={22} />}
          {state === 'locked' && <LockIcon />}
        </div>
        {state === 'done' && practiced && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
            }}
          >
            📷
          </div>
        )}
      </div>
      <p
        className="text-[10px] font-semibold text-center leading-tight"
        style={{ color: textColor, width: NODE_SIZE + 8 }}
      >
        {lesson.title}
      </p>
    </div>
  );

  if (state === 'locked') return <div>{inner}</div>;
  const href = state === 'done' && practiced ? `/practice/${lesson.id}` : `/learn/${lesson.id}`;
  return (
    <Link href={href} className="block active:scale-95 transition-transform">
      {inner}
    </Link>
  );
}

// ── Connector ─────────────────────────────────────────────────────────────────

function Connector({ state }: { state: ConnState }) {
  const color  = state === 'done' ? '#58CC02' : state === 'active' ? '#FF6B00' : '#D4E4F0';
  const dashed = state !== 'done';
  const lineY  = NODE_SIZE / 2;

  return (
    <div style={{ width: 22, flexShrink: 0, height: NODE_SIZE, display: 'flex', alignItems: 'flex-start' }}>
      <svg width="22" height={NODE_SIZE} style={{ display: 'block', overflow: 'visible' }}>
        <line
          x1="0" y1={lineY} x2="22" y2={lineY}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={dashed ? '5 4' : undefined}
        />
      </svg>
    </div>
  );
}

// ── ChapterRow ────────────────────────────────────────────────────────────────

function ChapterRow({
  category,
  completedLessons,
  practicedLessons,
  currentLessonId,
}: {
  category: (typeof CATEGORIES)[number];
  completedLessons: string[];
  practicedLessons: string[];
  currentLessonId: string | undefined;
}) {
  const lessons = getLessonsByCategory(category.id);
  const theme = CHAPTER_THEMES[category.id as LessonCategory];
  const scrollRef = useRef<HTMLDivElement>(null);

  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
  const pct = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  const firstUncompletedInChapter = lessons.find(l => !completedLessons.includes(l.id));

  const nodeStates: NodeState[] = lessons.map(l => {
    const isFirstUncompleted =
      firstUncompletedInChapter?.id === l.id && l.id !== currentLessonId;
    return getNodeState(l.id, completedLessons, currentLessonId, isFirstUncompleted);
  });

  const activeIdx = nodeStates.findIndex(s => s === 'active');

  useEffect(() => {
    if (!scrollRef.current || activeIdx === -1) return;
    const nodeW = NODE_SIZE + 8 + 22;
    const center = activeIdx * nodeW + (NODE_SIZE + 8) / 2;
    scrollRef.current.scrollLeft = Math.max(0, center - scrollRef.current.offsetWidth / 2);
  }, [activeIdx]);

  return (
    <div className="mb-6">
      {/* Chapter header */}
      <div className="px-5 mb-3 flex items-center gap-3">
        <div
          style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: theme.bg, boxShadow: `0 2px 0 ${theme.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}
        >
          {category.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--foreground)' }}>{category.label}</span>
            <span
              style={{
                fontSize: 11, fontWeight: 700, color: theme.color,
                background: theme.bg, borderRadius: 99, padding: '1px 7px',
              }}
            >
              {completedCount}/{lessons.length}
            </span>
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#8A9EAF', marginTop: 1 }}>{theme.tagline}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-3">
        <div style={{ height: 5, borderRadius: 10, background: '#EEF4F9', overflow: 'hidden' }}>
          <div
            style={{ height: '100%', borderRadius: 10, width: `${pct}%`, background: theme.color, transition: 'width 0.6s ease' }}
          />
        </div>
      </div>

      {/* Horizontal scroll */}
      <div style={{ position: 'relative' }}>
        <div
          ref={scrollRef}
          className="hide-scrollbar"
          style={{
            overflowX: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            paddingLeft: 20,
            paddingRight: 48,
            paddingBottom: 8,
          }}
        >
          {lessons.map((lesson, i) => (
            <div key={lesson.id} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
              <LessonNode lesson={lesson} state={nodeStates[i]} chapterColor={theme.color} practiced={practicedLessons.includes(lesson.id)} />
              {i < lessons.length - 1 && (
                <Connector state={getConnState(nodeStates[i], nodeStates[i + 1])} />
              )}
            </div>
          ))}
        </div>
        {/* Right-edge fade */}
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 8, width: 56, pointerEvents: 'none',
            background: 'linear-gradient(to right, transparent, var(--bg) 78%)',
          }}
        />
      </div>
    </div>
  );
}

// ── GreetingCard (mobile) ─────────────────────────────────────────────────────

function GreetingCard({ displayName, xp, level }: { displayName: string; xp: number; level: number }) {
  const xpIntoLevel = xp % 500;
  const xpPct = (xpIntoLevel / 500) * 100;

  return (
    <div
      className="mx-5 mb-4 rounded-[22px] overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--border)',
        boxShadow: '0 2px 20px rgba(27,154,228,0.07), 0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-end justify-between px-5 pt-5 pb-0">
        <div className="flex-1 pb-5 min-w-0">
          <p style={{ fontSize: 12.5, fontWeight: 700, color: '#8A9EAF', marginBottom: 3 }}>
            {getGreeting(displayName)}
          </p>
          <p style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.3, marginBottom: 12 }}>
            Keep shooting. Keep growing.
          </p>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>
            Level {level} · {LEVEL_TITLES[level] ?? 'Legend'}
          </p>
          <div style={{ height: 8, borderRadius: 10, background: '#EEF4F9', overflow: 'hidden', marginBottom: 4 }}>
            <div
              style={{
                height: '100%', borderRadius: 10, width: `${xpPct}%`,
                background: 'linear-gradient(to right, #FF6B00, #FFB347)',
              }}
            />
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>{xpIntoLevel} / 500 XP</p>
        </div>
        <div
          className="animate-phil-float self-end ml-2 flex-shrink-0"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))' }}
        >
          <PhotoPhil size={88} />
        </div>
      </div>
    </div>
  );
}

// ── ContinueButton ────────────────────────────────────────────────────────────

function ContinueButton({ lesson }: { lesson: Lesson }) {
  const btnRef = useRef<HTMLDivElement>(null);

  function press() {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translateY(4px)';
    btnRef.current.style.boxShadow = 'none';
  }
  function release() {
    if (!btnRef.current) return;
    btnRef.current.style.transform = '';
    btnRef.current.style.boxShadow = '0 5px 0 #C45200';
  }

  return (
    <Link href={`/learn/${lesson.id}`} className="block mx-5 mb-5">
      <div
        ref={btnRef}
        onPointerDown={press}
        onPointerUp={release}
        onPointerLeave={release}
        className="flex items-center gap-3"
        style={{
          background: '#FF6B00',
          borderRadius: 18,
          padding: '15px 18px',
          boxShadow: '0 5px 0 #C45200',
          transition: 'transform 80ms, box-shadow 80ms',
        }}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CameraIcon color="white" size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
            Continue Lesson
          </p>
          <p className="truncate" style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>
            {lesson.title}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            style={{
              fontSize: 11, fontWeight: 700, color: '#fff',
              background: 'rgba(255,255,255,0.25)', borderRadius: 99, padding: '3px 8px',
            }}
          >
            {lesson.estimatedMinutes} min
          </span>
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header({ streak, displayName, photoURL }: { streak: number; displayName: string; photoURL?: string }) {
  const initial = displayName.charAt(0).toUpperCase();
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-5 pb-3"
      style={{
        background: 'var(--bg)',
        paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          style={{
            width: 34, height: 34, borderRadius: 10, background: '#FF6B00', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
        <span style={{ fontSize: 21, fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>shotly</span>
      </div>


      {/* Streak + avatar */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
          style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}
        >
          <span className="text-base leading-none">🔥</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--streak)' }}>{streak}</span>
        </div>
        <div
          style={{
            width: 34, height: 34, borderRadius: '50%', background: '#FF6B00',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
          }}
        >
          {photoURL ? (
            <img src={photoURL} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>{initial}</span>
          )}
        </div>
      </div>
    </header>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  const visibleCategories = getCategoriesForCameraType(profile.cameraTypes ?? []);
  const visibleCategoryIds = visibleCategories.map(c => c.id);
  const visibleLessons = LESSONS.filter(l => visibleCategoryIds.includes(l.category));
  const currentLesson = visibleLessons.find(l => !profile.completedLessons.includes(l.id));
  const completedCount = profile.completedLessons.length;
  const xpIntoLevel = profile.xp % 500;

  return (
    <div className="min-h-screen pb-24 sm:pb-8" style={{ background: 'var(--bg)' }}>
      <Header
        streak={profile.streak}
        displayName={profile.displayName}
        photoURL={profile.photoURL || undefined}
      />

      {/* Desktop two-column wrapper */}
      <div className="sm:flex sm:max-w-5xl sm:mx-auto">

        {/* ── Desktop sidebar ── */}
        <aside className="hidden sm:flex sm:flex-col sm:w-60 sm:shrink-0 sm:sticky sm:top-[61px] sm:self-start sm:h-[calc(100vh-61px)] sm:overflow-y-auto sm:px-5 sm:pt-6 sm:pb-8 sm:gap-4 hide-scrollbar">
          <div className="flex justify-center mb-1 animate-phil-float" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))' }}>
            <PhotoPhil size={120} />
          </div>

          {/* Greeting */}
          <div
            className="rounded-[18px] p-4"
            style={{ background: '#fff', border: '1.5px solid var(--border)', boxShadow: '0 2px 12px rgba(27,154,228,0.06)' }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: '#8A9EAF', marginBottom: 2 }}>
              {getGreeting(profile.displayName)}
            </p>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.35, marginBottom: 10 }}>
              Keep shooting. Keep growing.
            </p>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>
              Level {profile.level} · {LEVEL_TITLES[profile.level] ?? 'Legend'}
            </p>
            <div style={{ height: 7, borderRadius: 10, background: '#EEF4F9', overflow: 'hidden', marginBottom: 4 }}>
              <div
                style={{
                  height: '100%', borderRadius: 10,
                  width: `${(xpIntoLevel / 500) * 100}%`,
                  background: 'linear-gradient(to right, #FF6B00, #FFB347)',
                }}
              />
            </div>
            <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)' }}>{xpIntoLevel} / 500 XP</p>
          </div>

          {/* Continue */}
          {currentLesson && (
            <Link href={`/learn/${currentLesson.id}`} className="block">
              <div
                className="flex items-center gap-2.5 rounded-2xl px-4 py-3 active:translate-y-1 transition-all"
                style={{ background: '#FF6B00', boxShadow: '0 4px 0 #C45200' }}
              >
                <CameraIcon color="white" size={18} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Continue
                  </p>
                  <p className="truncate" style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>
                    {currentLesson.title}
                  </p>
                </div>
                <ChevronRight />
              </div>
            </Link>
          )}

          {/* Stats */}
          <div
            className="rounded-[18px] p-4"
            style={{ background: '#fff', border: '1.5px solid var(--border)', boxShadow: '0 2px 12px rgba(27,154,228,0.06)' }}
          >
            {[
              { label: 'Lessons done', value: completedCount,   color: '#58CC02' },
              { label: 'Day streak',   value: profile.streak,   color: '#FF6B00' },
              { label: 'Total XP',     value: profile.xp,       color: '#1B9AE4' },
            ].map(({ label, value, color }, i, arr) => (
              <div
                key={label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color }}>{value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 pt-4 sm:pt-6">

          {/* Mobile: greeting + continue */}
          <div className="sm:hidden">
            <GreetingCard displayName={profile.displayName} xp={profile.xp} level={profile.level} />
            {currentLesson && <ContinueButton lesson={currentLesson} />}
          </div>

          {/* Desktop: section heading */}
          <div className="hidden sm:block px-5 mb-5">
            <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--foreground)' }}>Your Journey</h1>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
              {completedCount} / {LESSONS.length} lessons complete
            </p>
          </div>

          {/* Chapter rows */}
          {visibleCategories.map(cat => (
            <ChapterRow
              key={cat.id}
              category={cat}
              completedLessons={profile.completedLessons}
              practicedLessons={profile.practicedLessons ?? []}
              currentLessonId={currentLesson?.id}
            />
          ))}

          {/* Camera type nudge if not set */}
          {(profile.cameraTypes ?? []).length === 0 && (
            <div
              className="mx-5 mb-5 rounded-2xl p-4 flex items-center gap-3"
              style={{ background: '#FFF4EE', border: '1.5px solid #FFD0B0' }}
            >
              <span style={{ fontSize: 22 }}>📷</span>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 13, fontWeight: 800, color: '#FF6B00', marginBottom: 2 }}>
                  Unlock your camera's lessons
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.4 }}>
                  Set your camera type in Profile to unlock iPhone or Pro Camera chapters.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
