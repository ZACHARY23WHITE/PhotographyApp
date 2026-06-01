'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────

const COLOR_DATA = [
  { name: 'Red',          hue: 0,   moods: ['Passion', 'Energy', 'Excitement', 'Love', 'Danger', 'Power'] },
  { name: 'Orange',       hue: 30,  moods: ['Warmth', 'Enthusiasm', 'Creativity', 'Friendly', 'Optimism'] },
  { name: 'Yellow',       hue: 60,  moods: ['Joy', 'Happiness', 'Intellect', 'Cheerful', 'Caution'] },
  { name: 'Yellow-Green', hue: 90,  moods: ['Growth', 'Freshness', 'Renewal', 'Nature', 'Vitality'] },
  { name: 'Green',        hue: 120, moods: ['Harmony', 'Nature', 'Growth', 'Balance', 'Calm'] },
  { name: 'Cyan',         hue: 180, moods: ['Tranquility', 'Clarity', 'Communication', 'Peace'] },
  { name: 'Blue',         hue: 240, moods: ['Trust', 'Loyalty', 'Calm', 'Wisdom', 'Professional'] },
  { name: 'Purple',       hue: 270, moods: ['Creativity', 'Spirituality', 'Luxury', 'Mystery'] },
  { name: 'Magenta',      hue: 300, moods: ['Imagination', 'Innovation', 'Compassion', 'Bold'] },
  { name: 'Pink',         hue: 330, moods: ['Love', 'Tenderness', 'Playful', 'Youthful', 'Fresh'] },
];

const HARMONIES = [
  { id: 'none',           label: 'Wheel' },
  { id: 'complementary',  label: 'Complement' },
  { id: 'analogous',      label: 'Analogous' },
  { id: 'triadic',        label: 'Triadic' },
  { id: 'split',          label: 'Split' },
  { id: 'tetradic',       label: 'Tetradic' },
];

const HARMONY_INFO: Record<string, { title: string; description: string }> = {
  complementary: {
    title: 'Complementary',
    description: 'Colors opposite on the wheel — high contrast and vibrant. Perfect for making a subject pop.',
  },
  analogous: {
    title: 'Analogous',
    description: 'Colors next to each other — harmonious and natural. Serene, cohesive feel often found in nature.',
  },
  triadic: {
    title: 'Triadic',
    description: 'Three colors evenly spaced — vibrant and balanced. High contrast with visual interest.',
  },
  split: {
    title: 'Split-Complementary',
    description: "Base color + two colors adjacent to its complement. High contrast with less tension.",
  },
  tetradic: {
    title: 'Tetradic',
    description: 'Two pairs of complementary colors. Rich and versatile — one color should dominate.',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getHarmonyHues(base: number, harmony: string): number[] {
  switch (harmony) {
    case 'complementary': return [base, (base + 180) % 360];
    case 'analogous':     return [base, (base + 30) % 360, (base + 60) % 360];
    case 'triadic':       return [base, (base + 120) % 360, (base + 240) % 360];
    case 'split':         return [base, (base + 150) % 360, (base + 210) % 360];
    case 'tetradic':      return [base, (base + 90) % 360, (base + 180) % 360, (base + 270) % 360];
    default:              return [base];
  }
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function closestColorData(hue: number) {
  let closest = COLOR_DATA[0];
  let minDiff = Infinity;
  for (const c of COLOR_DATA) {
    const diff = Math.min(Math.abs(hue - c.hue), Math.abs(hue - c.hue + 360), Math.abs(hue - c.hue - 360));
    if (diff < minDiff) { minDiff = diff; closest = c; }
  }
  return closest;
}

function rgbToHue(r: number, g: number, b: number): number {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  if (delta === 0) return 0;
  let hue: number;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;
  return hue;
}

function parseColorToHue(raw: string): number | null {
  const s = raw.toLowerCase().trim();
  if (s.startsWith('#')) {
    const hex = s.slice(1);
    if (hex.length === 3 || hex.length === 6) {
      const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
      const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
      const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
      return rgbToHue(r, g, b);
    }
  }
  const rgb = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (rgb) return rgbToHue(+rgb[1], +rgb[2], +rgb[3]);
  const hsl = s.match(/hsl\s*\(\s*(\d+)/);
  if (hsl) return +hsl[1] % 360;
  return null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ColorWheelPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [selectedHue, setSelectedHue] = useState(0);
  const [harmony, setHarmony] = useState('none');
  const [colorInput, setColorInput] = useState('');
  const [inputError, setInputError] = useState(false);

  const drawWheel = useCallback((hue: number, h: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    const cx = width / 2, cy = height / 2;
    const r = Math.min(cx, cy) - 10;

    ctx.clearRect(0, 0, width, height);

    // HSL ring
    for (let angle = 0; angle < 360; angle++) {
      const s = (angle - 0.5) * Math.PI / 180;
      const e = (angle + 0.5) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, s, e);
      ctx.closePath();
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }

    // White center
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Indicators
    if (h !== 'none') {
      getHarmonyHues(hue, h).forEach(deg => {
        const a = deg * Math.PI / 180;
        const x = cx + Math.cos(a) * r * 0.85;
        const y = cy + Math.sin(a) * r * 0.85;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${deg}, 100%, 50%)`;
        ctx.fill();
      });
    }
  }, []);

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const size = Math.min(container.offsetWidth, 400);
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
    }
  }, []);

  useEffect(() => {
    syncCanvasSize();
    drawWheel(selectedHue, harmony);
  }, [selectedHue, harmony, syncCanvasSize, drawWheel]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      syncCanvasSize();
      drawWheel(selectedHue, harmony);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [selectedHue, harmony, syncCanvasSize, drawWheel]);

  function pickHueFromEvent(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
    setSelectedHue(((angle * 180 / Math.PI) + 360) % 360);
  }

  function handleColorInput() {
    const hue = parseColorToHue(colorInput);
    if (hue !== null) {
      setSelectedHue(hue);
      setInputError(false);
    } else {
      setInputError(true);
    }
  }

  const hues = harmony !== 'none' ? getHarmonyHues(selectedHue, harmony) : [];
  const psychologyColors = hues.length > 0
    ? hues.map(h => ({ ...closestColorData(h), actualHue: h }))
    : COLOR_DATA.map(c => ({ ...c, actualHue: c.hue }));

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
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Color Wheel</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Color theory & harmonies</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        {/* Harmony selector */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {HARMONIES.map(h => (
            <button
              key={h.id}
              onClick={() => setHarmony(h.id)}
              style={{
                padding: '7px 14px', borderRadius: 99, flexShrink: 0,
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                border: '1.5px solid',
                borderColor: harmony === h.id ? '#E8534A' : 'var(--border)',
                background: harmony === h.id ? '#E8534A' : 'var(--surface)',
                color: harmony === h.id ? 'white' : 'var(--muted)',
                transition: 'all 0.15s',
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          style={{ width: '100%', maxWidth: 400, margin: '0 auto 16px', aspectRatio: '1' }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'crosshair', display: 'block' }}
            onMouseDown={(e) => { isDragging.current = true; pickHueFromEvent(e); }}
            onMouseMove={(e) => { if (isDragging.current) pickHueFromEvent(e); }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onClick={pickHueFromEvent}
            onTouchStart={(e) => { isDragging.current = true; pickHueFromEvent(e); }}
            onTouchMove={(e) => { if (isDragging.current) pickHueFromEvent(e); }}
            onTouchEnd={() => { isDragging.current = false; }}
          />
        </div>

        {/* Selected color swatches */}
        {hues.length > 0 && (
          <div className="flex justify-center gap-3 mb-4">
            {hues.map((h, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: `hsl(${h}, 100%, 50%)`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                />
                <p style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--muted)', marginTop: 4 }}>
                  {hslToHex(h, 100, 50)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Harmony info */}
        {harmony !== 'none' && HARMONY_INFO[harmony] && (
          <div
            style={{
              background: '#FFF1F0', borderRadius: 12, padding: '12px 14px',
              borderLeft: '3px solid #E8534A', marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 13.5, fontWeight: 800, color: '#E8534A', marginBottom: 3 }}>
              {HARMONY_INFO[harmony].title}
            </p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.5 }}>
              {HARMONY_INFO[harmony].description}
            </p>
          </div>
        )}

        {/* Color input */}
        <div className="flex gap-2 mb-6">
          <input
            value={colorInput}
            onChange={e => { setColorInput(e.target.value); setInputError(false); }}
            onKeyDown={e => { if (e.key === 'Enter') handleColorInput(); }}
            placeholder="#FF5733 or rgb(255,87,51)"
            style={{
              flex: 1, padding: '9px 12px', borderRadius: 10,
              border: `1.5px solid ${inputError ? '#E8534A' : 'var(--border)'}`,
              background: 'var(--surface)', color: 'var(--foreground)',
              fontSize: 13, fontWeight: 600, outline: 'none',
            }}
          />
          <button
            onClick={handleColorInput}
            style={{
              padding: '9px 16px', borderRadius: 10, flexShrink: 0,
              background: 'var(--primary)', color: 'white',
              fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
            }}
          >
            Find
          </button>
        </div>

        {/* Psychology grid */}
        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--foreground)', marginBottom: 12 }}>
          {harmony !== 'none' ? 'Selected Colors' : 'Color Psychology'}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
          }}
        >
          {psychologyColors.map((c, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface)', borderRadius: 12,
                border: '1.5px solid var(--border)', padding: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '100%', height: 44, borderRadius: 8, marginBottom: 8,
                  background: `hsl(${c.actualHue}, 80%, 55%)`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
                }}
              />
              <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--foreground)', marginBottom: 6 }}>
                {c.name}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {c.moods.slice(0, 4).map(mood => (
                  <span
                    key={mood}
                    style={{
                      fontSize: 10.5, fontWeight: 700, padding: '2px 6px',
                      background: `hsl(${c.actualHue}, 80%, 93%)`,
                      color: `hsl(${c.actualHue}, 60%, 35%)`,
                      borderRadius: 5,
                    }}
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
