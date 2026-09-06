'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────

interface Stop {
  label: string;
  seconds: number;
}

// Full-stop ladder from 1 second to 1/4000.
const STOPS: Stop[] = [
  { label: '1s',     seconds: 1 },
  { label: '1/2',    seconds: 1 / 2 },
  { label: '1/4',    seconds: 1 / 4 },
  { label: '1/8',    seconds: 1 / 8 },
  { label: '1/15',   seconds: 1 / 15 },
  { label: '1/30',   seconds: 1 / 30 },
  { label: '1/60',   seconds: 1 / 60 },
  { label: '1/125',  seconds: 1 / 125 },
  { label: '1/250',  seconds: 1 / 250 },
  { label: '1/500',  seconds: 1 / 500 },
  { label: '1/1000', seconds: 1 / 1000 },
  { label: '1/2000', seconds: 1 / 2000 },
  { label: '1/4000', seconds: 1 / 4000 },
];

interface Band {
  name: string;
  color: string;
  bg: string;
  headline: string;
  scenarios: string[];
  handheld: boolean;
}

function bandFor(seconds: number): Band {
  if (seconds >= 0.25) {
    return {
      name: 'Long Exposure', color: '#8B5CF6', bg: '#F3F0FF',
      headline: 'Motion becomes silky and dreamy.',
      scenarios: ['Silky waterfalls & rivers', 'Car light trails at night', 'Star trails & light painting'],
      handheld: false,
    };
  }
  if (seconds >= 1 / 30) {
    return {
      name: 'Slow', color: '#1B9AE4', bg: '#EFF8FF',
      headline: 'Intentional blur — pan with your subject.',
      scenarios: ['Panning a moving cyclist or car', 'Sense of motion in a crowd', 'Low light without flash'],
      handheld: false,
    };
  }
  if (seconds >= 1 / 250) {
    return {
      name: 'Everyday', color: '#58CC02', bg: '#F0FBE8',
      headline: 'The safe zone for sharp handheld shots.',
      scenarios: ['Portraits & street photography', 'Walking people, gentle movement', 'General everyday shooting'],
      handheld: true,
    };
  }
  if (seconds >= 1 / 1000) {
    return {
      name: 'Fast', color: '#FF6B00', bg: '#FFF4EE',
      headline: 'Freezes quick action cleanly.',
      scenarios: ['Sports & running kids', 'Pets in motion', 'Cars & cyclists frozen sharp'],
      handheld: true,
    };
  }
  return {
    name: 'Very Fast', color: '#E8534A', bg: '#FFF1F0',
    headline: 'Stops the fastest motion dead.',
    scenarios: ['Splashing water & droplets', 'Birds in flight', 'Racing & high-speed action'],
    handheld: true,
  };
}

// ── Motion-blur fan ─────────────────────────────────────────────────────────
// A fan spinning at a fixed rate. During the exposure, each blade sweeps an
// angle = angularSpeed × shutterTime. We render ghost copies across that swept
// angle to produce a physically-honest motion blur: fast shutter = crisp
// blades, slow shutter = a smeared disc.

const ANGULAR_SPEED = 1800; // degrees per second (5 rev/sec)

function Blade({ angle, opacity }: { angle: number; opacity: number }) {
  return (
    <g transform={`rotate(${angle} 80 80)`} opacity={opacity}>
      <path d="M80 80 Q92 34 80 16 Q68 34 80 80 Z" fill="#FF6B00" />
    </g>
  );
}

function MotionFan({ seconds }: { seconds: number }) {
  const swept = Math.min(360, ANGULAR_SPEED * seconds);
  const copies = Math.max(1, Math.min(72, Math.round(swept / 2.5)));
  const bladeOpacity = Math.max(0.05, Math.min(0.9, 2.2 / copies));

  const ghosts: React.ReactNode[] = [];
  for (let b = 0; b < 3; b++) {
    const base = b * 120;
    for (let i = 0; i < copies; i++) {
      const a = base + (swept * i) / Math.max(1, copies - 1) - swept / 2;
      ghosts.push(<Blade key={`${b}-${i}`} angle={a} opacity={bladeOpacity} />);
    }
  }

  return (
    <svg viewBox="0 0 160 160" style={{ width: 200, height: 200, display: 'block' }}>
      {/* soft backdrop */}
      <circle cx="80" cy="80" r="74" fill="#FFF7F0" />
      <circle cx="80" cy="80" r="74" fill="none" stroke="var(--border)" strokeWidth="2" />
      {ghosts}
      {/* hub */}
      <circle cx="80" cy="80" r="12" fill="#1A2840" />
      <circle cx="80" cy="80" r="5" fill="#FFB877" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ShutterSpeedPage() {
  const router = useRouter();
  const [idx, setIdx] = useState(6); // 1/60
  const [focal, setFocal] = useState(50);

  const stop = STOPS[idx];
  const band = bandFor(stop.seconds);
  // Reciprocal rule: safe handheld shutter ≈ 1 / focal length.
  const handheldSafe = stop.seconds <= 1 / focal;

  return (
    <div className="min-h-screen pb-10" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-20 flex items-center gap-3 px-4"
        style={{
          background: 'var(--bg)',
          paddingTop: 'max(env(safe-area-inset-top), 16px)',
          paddingBottom: 12,
          borderBottom: '1.5px solid var(--border)',
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36, height: 36, borderRadius: 10, border: '1.5px solid var(--border)',
            background: 'var(--surface)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0, cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Shutter Speed</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Freeze it or blur it</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        {/* Live demo */}
        <div
          style={{
            background: 'var(--surface)', borderRadius: 18, border: '1.5px solid var(--border)',
            boxShadow: '0 2px 14px rgba(27,154,228,0.08)', padding: 20, marginBottom: 18,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <MotionFan seconds={stop.seconds} />
          <p style={{ fontSize: 34, fontWeight: 900, color: 'var(--foreground)', marginTop: 8, lineHeight: 1 }}>
            {stop.label}
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)' }}> sec</span>
          </p>
          <span
            style={{
              marginTop: 8, fontSize: 12, fontWeight: 800, color: band.color, background: band.bg,
              borderRadius: 99, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: '0.05em',
            }}
          >
            {band.name}
          </span>
        </div>

        {/* Slider */}
        <div style={{ marginBottom: 6 }}>
          <input
            type="range"
            min={0}
            max={STOPS.length - 1}
            value={idx}
            onChange={e => setIdx(+e.target.value)}
            style={{ width: '100%', accentColor: band.color, cursor: 'pointer' }}
          />
          <div className="flex justify-between" style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted-light)', marginTop: 2 }}>
            <span>1s · blur</span>
            <span>freeze · 1/4000</span>
          </div>
        </div>

        {/* Band detail */}
        <div style={{ background: band.bg, borderRadius: 14, padding: '14px 16px', marginTop: 12, marginBottom: 18 }}>
          <p style={{ fontSize: 14.5, fontWeight: 800, color: band.color, marginBottom: 10 }}>{band.headline}</p>
          {band.scenarios.map((s, i) => (
            <div key={i} className="flex items-start gap-2" style={{ marginBottom: i < band.scenarios.length - 1 ? 7 : 0 }}>
              <span style={{ color: band.color, fontWeight: 900, fontSize: 13, marginTop: 1 }}>→</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.4 }}>{s}</p>
            </div>
          ))}
          <div
            className="flex items-center gap-2"
            style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${band.color}33` }}
          >
            <span style={{ fontSize: 15 }}>{band.handheld ? '🖐️' : '🎯'}</span>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: band.color }}>
              {band.handheld ? 'Generally safe handheld' : 'Use a tripod — too slow to hold steady'}
            </p>
          </div>
        </div>

        {/* Reciprocal-rule mini calculator */}
        <div
          style={{
            background: 'var(--surface)', borderRadius: 14, border: '1.5px solid var(--border)',
            padding: '14px 16px',
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--foreground)', marginBottom: 4 }}>
            Handheld check
          </p>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 12 }}>
            The reciprocal rule: your shutter should be at least <strong>1 / focal length</strong> to avoid camera shake.
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--muted)', flexShrink: 0 }}>Focal length</span>
            <input
              type="range" min={14} max={400} step={1} value={focal}
              onChange={e => setFocal(+e.target.value)}
              style={{ flex: 1, accentColor: '#1B9AE4', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--foreground)', width: 56, textAlign: 'right' }}>
              {focal}mm
            </span>
          </div>
          <div
            style={{
              borderRadius: 10, padding: '10px 12px',
              background: handheldSafe ? '#F0FBE8' : '#FFF1F0',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>{handheldSafe ? '✅' : '⚠️'}</span>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: handheldSafe ? '#3F8F00' : '#C0392B', lineHeight: 1.4 }}>
              {handheldSafe
                ? `${stop.label}s is fast enough for a ${focal}mm lens handheld.`
                : `Too slow for ${focal}mm — aim for 1/${focal}s or faster (or use a tripod).`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
