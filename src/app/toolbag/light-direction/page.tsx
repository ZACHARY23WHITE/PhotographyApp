'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Stage geometry ─────────────────────────────────────────────────────────
const STAGE = 280;
const FC = { x: 140, y: 152 };   // face center
const R_MIN = 66;
const R_MAX = 128;

interface Pattern { name: string; desc: string }

// Classify a lighting setup from the light's position relative to the face.
function classify(dx: number, dy: number, r: number): Pattern {
  const frac = (r - R_MIN) / (R_MAX - R_MIN);      // 0 close … 1 far
  const horiz = Math.abs(dx) / r;                  // 0 centered … 1 side
  const vert = -dy / r;                            // +up … −down

  if (frac < 0.28)
    return { name: 'Flat / Front', desc: 'Light straight-on and close. Even and soft, but the face can look a little flat and shapeless.' };
  if (vert < -0.35)
    return { name: 'Uplight', desc: 'Light from below — the "campfire ghost story" look. Dramatic and unnatural; use it on purpose.' };
  if (vert > 0.72 && horiz < 0.4)
    return { name: 'Butterfly', desc: 'High and centered, casting a small butterfly-shaped shadow under the nose. Classic glamour & beauty lighting.' };
  if (horiz > 0.72 && Math.abs(vert) < 0.22)
    return { name: 'Split', desc: 'Light straight to the side at eye level — lights half the face, shadows the other half. Bold and moody.' };
  if (horiz > 0.6 && vert > 0.18 && vert < 0.62)
    return { name: 'Rembrandt', desc: 'A little triangle of light on the shadowed cheek. Timeless, painterly portrait lighting.' };
  if (vert > 0.3 && horiz > 0.3)
    return { name: 'Loop', desc: 'A small shadow loops off the side of the nose. The most common, flattering everyday portrait light.' };
  return { name: 'Side', desc: 'Raking light from the side reveals texture and form. Great for character and drama.' };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LightDirectionPage() {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [light, setLight] = useState({ x: 140, y: 46 }); // default: butterfly

  function moveTo(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * STAGE;
    const y = ((clientY - rect.top) / rect.height) * STAGE;
    let dx = x - FC.x, dy = y - FC.y;
    let r = Math.hypot(dx, dy);
    if (r === 0) { dx = 0; dy = -1; r = 1; }
    const clamped = Math.max(R_MIN, Math.min(R_MAX, r));
    setLight({ x: FC.x + (dx / r) * clamped, y: FC.y + (dy / r) * clamped });
  }

  const dragging = useRef(false);

  const dx = light.x - FC.x, dy = light.y - FC.y;
  const r = Math.hypot(dx, dy) || 1;
  const ux = dx / r, uy = dy / r;                  // unit dir face→light
  const pattern = classify(dx, dy, r);

  // Lit point on the face surface (drives the shadow & highlight gradients).
  const litX = FC.x + ux * 74;
  const litY = FC.y + uy * 74;
  // Nose shadow falls opposite the light.
  const noseX = 140 - ux * 12;
  const noseY = 150 - uy * 12 + 10;

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
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Light Direction</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Drag the light — watch the shadows</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        {/* Stage */}
        <div
          style={{
            background: 'var(--surface)', borderRadius: 18, border: '1.5px solid var(--border)',
            boxShadow: '0 2px 14px rgba(27,154,228,0.08)', padding: 12, marginBottom: 16,
            display: 'flex', justifyContent: 'center', touchAction: 'none',
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${STAGE} ${STAGE}`}
            style={{ width: '100%', maxWidth: 320, display: 'block', cursor: 'grab', userSelect: 'none' }}
            onPointerDown={e => { dragging.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); moveTo(e.clientX, e.clientY); }}
            onPointerMove={e => { if (dragging.current) moveTo(e.clientX, e.clientY); }}
            onPointerUp={() => { dragging.current = false; }}
            onPointerLeave={() => { dragging.current = false; }}
          >
            <defs>
              <radialGradient id="stageBg" cx="50%" cy="42%" r="70%">
                <stop offset="0%" stopColor="#3A4A63" />
                <stop offset="100%" stopColor="#20293A" />
              </radialGradient>
              <radialGradient id="formShadow" gradientUnits="userSpaceOnUse" cx={litX} cy={litY} r={155}>
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="48%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.66)" />
              </radialGradient>
              <radialGradient id="faceHi" gradientUnits="userSpaceOnUse" cx={litX} cy={litY} r={95}>
                <stop offset="0%" stopColor="rgba(255,240,210,0.75)" />
                <stop offset="70%" stopColor="rgba(255,240,210,0)" />
              </radialGradient>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,224,130,0.9)" />
                <stop offset="100%" stopColor="rgba(255,224,130,0)" />
              </radialGradient>
            </defs>

            {/* backdrop */}
            <rect width={STAGE} height={STAGE} rx="12" fill="url(#stageBg)" />
            {/* orbit hint ring */}
            <circle cx={FC.x} cy={FC.y} r={R_MAX} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4,6" />

            {/* ── Face ── */}
            {/* neck */}
            <rect x="126" y="196" width="28" height="32" rx="12" fill="#EFC6A8" />
            {/* long hair behind the head (dark blonde) */}
            <path d="M72 150 Q62 62 140 58 Q218 62 208 150 L204 216 Q194 228 182 216 L184 150 Q188 98 140 94 Q92 98 96 150 L98 216 Q86 228 76 216 Z" fill="#A9843E" />
            {/* head base */}
            <ellipse cx="140" cy="150" rx="62" ry="72" fill="#F3CEB2" />
            {/* ears */}
            <circle cx="80" cy="152" r="11" fill="#ECC0A0" />
            <circle cx="200" cy="152" r="11" fill="#ECC0A0" />
            {/* hair top + soft side-swept fringe */}
            <path d="M80 150 Q72 72 140 68 Q208 72 200 150 Q204 106 182 90 Q164 102 140 102 Q112 102 100 90 Q76 106 80 150 Z" fill="#B8904A" />
            <path d="M100 90 Q118 110 152 105 Q178 101 186 88 Q168 84 140 85 Q114 85 100 90 Z" fill="#A9843E" />
            {/* eyebrows */}
            <path d="M109 132 Q119 128 129 131" stroke="#96702F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M151 131 Q161 128 171 132" stroke="#96702F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            {/* eyes — almond with blue irises */}
            <ellipse cx="118" cy="146" rx="8" ry="6.4" fill="#fff" />
            <ellipse cx="162" cy="146" rx="8" ry="6.4" fill="#fff" />
            <circle cx="119" cy="147" r="4.4" fill="#5B8FD4" />
            <circle cx="161" cy="147" r="4.4" fill="#5B8FD4" />
            <circle cx="119" cy="147" r="2" fill="#213041" />
            <circle cx="161" cy="147" r="2" fill="#213041" />
            <circle cx="120.6" cy="145.3" r="1" fill="#fff" />
            <circle cx="162.6" cy="145.3" r="1" fill="#fff" />
            {/* upper lashes */}
            <path d="M109 143 Q118 137 127 143" stroke="#5A4632" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M153 143 Q162 137 171 143" stroke="#5A4632" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* nose */}
            <path d="M140 150 Q135 165 141 169 Q146 167 140 150" fill="#E7BC9A" />
            {/* cheeks */}
            <ellipse cx="110" cy="167" rx="8" ry="5" fill="#F2A6A0" opacity="0.35" />
            <ellipse cx="170" cy="167" rx="8" ry="5" fill="#F2A6A0" opacity="0.35" />
            {/* smile with teeth */}
            <path d="M120 181 Q140 178 160 181 Q156 200 140 202 Q124 200 120 181 Z" fill="#BC544B" />
            <path d="M126 183 Q140 181 154 183 Q150 191 140 191.5 Q130 191 126 183 Z" fill="#FFFFFF" />
            <path d="M120 181 Q140 178 160 181" stroke="#9E4139" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M124 194 Q140 205 156 194" stroke="#D07E73" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* nose cast shadow (falls away from the light) */}
            <ellipse cx={noseX} cy={noseY} rx="9" ry="7" fill="rgba(0,0,0,0.16)" />
            {/* highlight + form shadow overlays clipped to the head */}
            <ellipse cx="140" cy="150" rx="62" ry="72" fill="url(#faceHi)" />
            <ellipse cx="140" cy="150" rx="62" ry="72" fill="url(#formShadow)" />

            {/* ── The light ── */}
            <circle cx={light.x} cy={light.y} r="34" fill="url(#glow)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const a = (deg * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={light.x + 15 * Math.cos(a)} y1={light.y + 15 * Math.sin(a)}
                  x2={light.x + 21 * Math.cos(a)} y2={light.y + 21 * Math.sin(a)}
                  stroke="#FFD34D" strokeWidth="2.5" strokeLinecap="round"
                />
              );
            })}
            <circle cx={light.x} cy={light.y} r="12" fill="#FFDA5B" stroke="#fff" strokeWidth="2" />
          </svg>
        </div>

        {/* Pattern readout */}
        <div style={{ background: '#FFFCEF', borderLeft: '3px solid #F5A623', borderRadius: 14, padding: '14px 16px', marginBottom: 18 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#C07D10', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            Lighting pattern
          </p>
          <p style={{ fontSize: 19, fontWeight: 900, color: 'var(--foreground)', marginBottom: 5 }}>{pattern.name}</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.5 }}>{pattern.desc}</p>
        </div>

        {/* Quick jump presets */}
        <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Jump to a setup
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {([
            { name: 'Butterfly', x: 140, y: 46 },
            { name: 'Loop',      x: 92,  y: 78 },
            { name: 'Rembrandt', x: 60,  y: 118 },
            { name: 'Split',     x: 20,  y: 152 },
            { name: 'Side',      x: 24,  y: 130 },
            { name: 'Uplight',   x: 140, y: 258 },
            { name: 'Flat',      x: 140, y: 96 },
          ] as const).map(p => {
            const active = pattern.name.startsWith(p.name);
            return (
              <button
                key={p.name}
                onClick={() => setLight({ x: p.x, y: p.y })}
                style={{
                  padding: '8px 14px', borderRadius: 99, cursor: 'pointer',
                  fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${active ? '#F5A623' : 'var(--border)'}`,
                  background: active ? '#F5A623' : 'var(--surface)',
                  color: active ? 'white' : 'var(--muted)',
                  transition: 'all 0.15s',
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
