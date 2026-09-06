'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────

interface Ratio {
  id: string;
  label: string;
  w: number;
  h: number;
  bestFor: string;
  pixels: string;
}

const GROUPS: { group: string; ratios: Ratio[] }[] = [
  {
    group: 'Social',
    ratios: [
      { id: 'sq',   label: '1:1',  w: 1, h: 1,  bestFor: 'Instagram grid, profile pics, album covers', pixels: '1080 × 1080' },
      { id: 'ig',   label: '4:5',  w: 4, h: 5,  bestFor: 'Instagram portrait — the largest feed footprint', pixels: '1080 × 1350' },
      { id: 'story',label: '9:16', w: 9, h: 16, bestFor: 'Stories, Reels, TikTok, full-screen vertical', pixels: '1080 × 1920' },
      { id: 'wide', label: '16:9', w: 16, h: 9, bestFor: 'YouTube, landscape video, presentations', pixels: '1920 × 1080' },
    ],
  },
  {
    group: 'Photo',
    ratios: [
      { id: '32', label: '3:2', w: 3, h: 2, bestFor: 'The classic 35mm / DSLR frame. Standard 4×6 prints', pixels: '5472 × 3648' },
      { id: '43', label: '4:3', w: 4, h: 3, bestFor: 'Micro 4/3, phones, a touch taller than 3:2', pixels: '4032 × 3024' },
      { id: '54', label: '5:4', w: 5, h: 4, bestFor: 'Portraits & 8×10 prints — gallery-friendly', pixels: '4000 × 3200' },
    ],
  },
  {
    group: 'Cinema',
    ratios: [
      { id: 'cine', label: '2.39:1', w: 2.39, h: 1, bestFor: 'Anamorphic widescreen — epic, cinematic mood', pixels: '2048 × 858' },
      { id: 'photo169', label: '16:9', w: 16, h: 9, bestFor: 'Standard video & film delivery', pixels: '3840 × 2160' },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

// Fit a ratio inside a bounding box, returning display px dimensions.
function fitInside(rw: number, rh: number, boxW: number, boxH: number) {
  const scale = Math.min(boxW / rw, boxH / rh);
  return { width: Math.round(rw * scale), height: Math.round(rh * scale) };
}

// A reusable golden-hour park scene, drawn generously so any crop looks good.
function Scene() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id="arSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD59E" />
          <stop offset="45%" stopColor="#FFB877" />
          <stop offset="100%" stopColor="#FFE9C7" />
        </linearGradient>
        <linearGradient id="arGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FBF6A" />
          <stop offset="100%" stopColor="#5E9A45" />
        </linearGradient>
      </defs>
      <rect width="400" height="270" fill="url(#arSky)" />
      <circle cx="200" cy="150" r="46" fill="#FFF0D0" opacity="0.9" />
      <circle cx="200" cy="150" r="30" fill="#FFF7E6" />
      <rect y="270" width="400" height="130" fill="url(#arGround)" />
      {/* distant hills */}
      <ellipse cx="90" cy="272" rx="130" ry="34" fill="#6FA84F" />
      <ellipse cx="320" cy="274" rx="120" ry="28" fill="#79B457" />
      {/* lone tree near a power point */}
      <rect x="264" y="212" width="10" height="64" rx="3" fill="#6B4423" />
      <ellipse cx="269" cy="200" rx="30" ry="34" fill="#3E7D3A" />
      <ellipse cx="252" cy="212" rx="18" ry="20" fill="#4C9247" />
      <ellipse cx="286" cy="214" rx="18" ry="18" fill="#4C9247" />
      {/* birds */}
      <path d="M110 96 q7 -7 14 0 q7 -7 14 0" fill="none" stroke="#7A5A38" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M150 120 q5 -5 10 0 q5 -5 10 0" fill="none" stroke="#7A5A38" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AspectRatioPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Ratio>(GROUPS[0].ratios[1]); // 4:5
  const [showGrid, setShowGrid] = useState(true);

  const box = fitInside(selected.w, selected.h, 300, 320);

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
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Aspect Ratio</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Frame &amp; crop previewer</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        {/* Live preview frame */}
        <div
          style={{
            background: 'var(--surface)', borderRadius: 18, border: '1.5px solid var(--border)',
            boxShadow: '0 2px 14px rgba(27,154,228,0.08)', padding: 20, marginBottom: 18,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            minHeight: 360, justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative', width: box.width, height: box.height,
              borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              transition: 'width 0.35s cubic-bezier(0.34,1.3,0.64,1), height 0.35s cubic-bezier(0.34,1.3,0.64,1)',
              border: '3px solid #fff',
            }}
          >
            <Scene />
            {/* rule-of-thirds overlay */}
            {showGrid && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
                <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="white" strokeWidth="1" opacity="0.55" strokeDasharray="5,4" />
                <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="white" strokeWidth="1" opacity="0.55" strokeDasharray="5,4" />
                <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="white" strokeWidth="1" opacity="0.55" strokeDasharray="5,4" />
                <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="white" strokeWidth="1" opacity="0.55" strokeDasharray="5,4" />
              </svg>
            )}
            {/* ratio badge */}
            <div
              style={{
                position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)',
                color: 'white', fontSize: 12, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
                backdropFilter: 'blur(2px)',
              }}
            >
              {selected.label}
            </div>
          </div>

          <button
            onClick={() => setShowGrid(g => !g)}
            style={{
              marginTop: 16, fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
              color: showGrid ? '#FF6B00' : 'var(--muted)', background: 'none', border: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{showGrid ? '☑' : '☐'}</span> Rule-of-thirds grid
          </button>
        </div>

        {/* Info card */}
        <div
          style={{
            background: '#FFF4EE', borderRadius: 12, padding: '12px 14px',
            borderLeft: '3px solid #FF6B00', marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 13.5, fontWeight: 800, color: '#FF6B00', marginBottom: 3 }}>
            {selected.label} · {selected.pixels}
          </p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.5 }}>
            {selected.bestFor}
          </p>
        </div>

        {/* Ratio picker */}
        {GROUPS.map(({ group, ratios }) => (
          <div key={group} style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              {group}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(78px, 1fr))', gap: 10 }}>
              {ratios.map(r => {
                const active = selected.id === r.id;
                const thumb = fitInside(r.w, r.h, 44, 44);
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r)}
                    style={{
                      background: 'var(--surface)', cursor: 'pointer',
                      border: `2px solid ${active ? '#FF6B00' : 'var(--border)'}`,
                      borderRadius: 12, padding: '12px 6px 10px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      boxShadow: active ? '0 4px 14px rgba(255,107,0,0.16)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ height: 44, display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          width: thumb.width, height: thumb.height, borderRadius: 3,
                          background: active ? '#FF6B00' : '#CBD9E6',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: active ? '#FF6B00' : 'var(--foreground)' }}>
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
