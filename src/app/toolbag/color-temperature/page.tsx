'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Kelvin → RGB ──────────────────────────────────────────────────────────────
// Tanner Helland's black-body approximation. Gives the color a light source of
// temperature K actually emits — warm/orange when low, blue-white when high.

function kelvinToRGB(kelvin: number): { r: number; g: number; b: number } {
  const temp = kelvin / 100;
  let r: number, g: number, b: number;

  if (temp <= 66) r = 255;
  else r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);

  if (temp <= 66) g = 99.4708025861 * Math.log(temp) - 161.1195681661;
  else g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);

  if (temp >= 66) b = 255;
  else if (temp <= 19) b = 0;
  else b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307;

  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return { r: clamp(r), g: clamp(g), b: clamp(b) };
}

// ── Presets ───────────────────────────────────────────────────────────────────

interface Preset { k: number; label: string; emoji: string }

const PRESETS: Preset[] = [
  { k: 1900,  label: 'Candle',        emoji: '🕯️' },
  { k: 2800,  label: 'Tungsten bulb', emoji: '💡' },
  { k: 3400,  label: 'Golden hour',   emoji: '🌅' },
  { k: 4200,  label: 'Fluorescent',   emoji: '🏢' },
  { k: 5500,  label: 'Noon daylight', emoji: '☀️' },
  { k: 6500,  label: 'Cloudy',        emoji: '☁️' },
  { k: 7500,  label: 'Open shade',    emoji: '🌳' },
  { k: 9500,  label: 'Blue hour',     emoji: '🌌' },
];

const MIN_K = 1500;
const MAX_K = 11000;

function describe(k: number): { title: string; body: string; color: string } {
  if (k < 3200) return { title: 'Very warm', color: '#E8703A', body: 'Cozy, golden, orange. Great for candlelight and sunset moods — but skin can look overly amber.' };
  if (k < 4500) return { title: 'Warm', color: '#F5A623', body: 'Inviting golden-hour warmth. Flattering for portraits and food.' };
  if (k < 6000) return { title: 'Neutral', color: '#58CC02', body: 'Balanced daylight — colors look true to life. The safe default.' };
  if (k < 8000) return { title: 'Cool', color: '#1B9AE4', body: 'Crisp and slightly blue. Clean, modern, a little moody.' };
  return { title: 'Very cool', color: '#3B6FE0', body: 'Strong blue cast. Twilight, shade, and icy atmospheres.' };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ColorTemperaturePage() {
  const router = useRouter();
  const [k, setK] = useState(5500);

  const { r, g, b } = kelvinToRGB(k);
  const lightCss = `rgb(${r}, ${g}, ${b})`;
  const info = describe(k);
  const sliderPct = ((k - MIN_K) / (MAX_K - MIN_K)) * 100;

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
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Color Temperature</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>The Kelvin scale</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        {/* Live tinted scene */}
        <div
          style={{
            borderRadius: 18, overflow: 'hidden', marginBottom: 16,
            border: '1.5px solid var(--border)', boxShadow: '0 2px 14px rgba(27,154,228,0.08)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2' }}>
            {/* neutral base scene — whites make the cast obvious */}
            <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="ctSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D7E4EE" />
                  <stop offset="100%" stopColor="#F3F7FA" />
                </linearGradient>
              </defs>
              <rect width="300" height="140" fill="url(#ctSky)" />
              <rect y="140" width="300" height="60" fill="#EDEFF1" />
              {/* snowy mountains (white reads the cast strongly) */}
              <polygon points="0,140 70,60 130,140" fill="#FFFFFF" />
              <polygon points="90,140 170,45 250,140" fill="#F4F6F8" />
              <polygon points="200,140 260,80 300,140" fill="#FFFFFF" />
              {/* pine trees */}
              <polygon points="40,150 55,110 70,150" fill="#3E7D3A" />
              <polygon points="45,135 55,112 65,135" fill="#4C9247" />
              <rect x="52" y="150" width="6" height="10" fill="#6B4423" />
              {/* a red cabin for a color anchor */}
              <rect x="210" y="120" width="34" height="22" fill="#C0392B" />
              <polygon points="206,120 227,104 248,120" fill="#7A3B2E" />
              {/* grayscale strip to read the cast */}
              {['#111','#444','#777','#aaa','#ddd','#fff'].map((c, i) => (
                <rect key={i} x={12 + i * 20} y={168} width="20" height="20" fill={c} />
              ))}
            </svg>
            {/* light-color overlay */}
            <div
              style={{
                position: 'absolute', inset: 0, background: lightCss,
                mixBlendMode: 'multiply', opacity: 0.55, transition: 'background 0.2s',
              }}
            />
            <div
              style={{
                position: 'absolute', inset: 0, background: lightCss,
                mixBlendMode: 'soft-light', opacity: 0.4, transition: 'background 0.2s',
              }}
            />
            {/* readout */}
            <div
              style={{
                position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.55)',
                color: 'white', padding: '5px 11px', borderRadius: 8, backdropFilter: 'blur(2px)',
              }}
            >
              <span style={{ fontSize: 17, fontWeight: 900 }}>{k.toLocaleString()}K</span>
            </div>
          </div>
        </div>

        {/* Slider on a warm→cool gradient track */}
        <div style={{ marginBottom: 6 }}>
          <div
            style={{
              height: 14, borderRadius: 99, marginBottom: 10, position: 'relative',
              background: 'linear-gradient(90deg, #FF8A3D 0%, #FFC680 22%, #FFF3E0 45%, #EAF2FF 62%, #9CC2FF 100%)',
              border: '1.5px solid var(--border)',
            }}
          >
            <div
              style={{
                position: 'absolute', top: '50%', left: `${sliderPct}%`,
                width: 22, height: 22, borderRadius: '50%', background: lightCss,
                transform: 'translate(-50%, -50%)', border: '3px solid #fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)', transition: 'background 0.2s',
              }}
            />
          </div>
          <input
            type="range" min={MIN_K} max={MAX_K} step={100} value={k}
            onChange={e => setK(+e.target.value)}
            style={{ width: '100%', accentColor: info.color, cursor: 'pointer' }}
          />
          <div className="flex justify-between" style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted-light)', marginTop: 2 }}>
            <span>Warm · orange</span>
            <span>Cool · blue</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 14, padding: '13px 16px', marginTop: 12, marginBottom: 18 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: info.color, marginBottom: 3 }}>{info.title}</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.5 }}>{info.body}</p>
        </div>

        {/* Presets */}
        <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Common light sources
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
          {PRESETS.map(p => {
            const active = Math.abs(p.k - k) < 150;
            const swatch = kelvinToRGB(p.k);
            return (
              <button
                key={p.k}
                onClick={() => setK(p.k)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  background: 'var(--surface)', textAlign: 'left',
                  border: `2px solid ${active ? '#F5A623' : 'var(--border)'}`,
                  borderRadius: 12, padding: '10px 12px',
                  boxShadow: active ? '0 4px 14px rgba(245,166,35,0.18)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                <div
                  style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: `rgb(${swatch.r}, ${swatch.g}, ${swatch.b})`,
                    border: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
                  }}
                >
                  {p.emoji}
                </div>
                <div className="min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.1 }}>{p.label}</p>
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--muted)' }}>{p.k.toLocaleString()}K</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* White balance tip */}
        <div style={{ background: '#FFFCEF', borderLeft: '3px solid #F5A623', borderRadius: 12, padding: '12px 14px', marginTop: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#C07D10', marginBottom: 3 }}>💡 White balance in one line</p>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.5 }}>
            Set your camera's white balance to the light's temperature to make whites look neutral. Set it <em>warmer</em> than the light for a cozy glow, <em>cooler</em> for a crisp, moody feel.
          </p>
        </div>
      </div>
    </div>
  );
}
