'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhotoPhil, { type PhilPose } from '@/components/photo-phil';

// ── Solar math ────────────────────────────────────────────────────────────────
// Compact implementation of the standard sunrise equation. For a given date,
// location, and sun altitude, returns the morning (rise) and evening (set)
// times the sun crosses that altitude.

const RAD = Math.PI / 180;

function toJulian(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}
function fromJulian(j: number): Date {
  return new Date((j - 2440587.5) * 86400000);
}

function sunTimes(date: Date, lat: number, lng: number, altitude: number): { rise: Date | null; set: Date | null } {
  const lw = -lng * RAD;
  const phi = lat * RAD;
  const J = toJulian(date);

  const n = Math.round(J - 2451545.0 + 0.0009 - lw / (2 * Math.PI));
  const Jstar = 2451545.0 + 0.0009 + lw / (2 * Math.PI) + n;
  const M = (357.5291 + 0.98560028 * (Jstar - 2451545)) * RAD;
  const C = (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) * RAD;
  const lambda = M + C + Math.PI + 102.9372 * RAD;
  const Jtransit = Jstar + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * lambda);
  const dec = Math.asin(Math.sin(lambda) * Math.sin(23.44 * RAD));

  const cosH = (Math.sin(altitude * RAD) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
  if (cosH > 1) return { rise: null, set: null };   // sun stays below this altitude
  if (cosH < -1) return { rise: null, set: null };  // sun stays above this altitude
  const H = Math.acos(cosH) / (2 * Math.PI);

  return { rise: fromJulian(Jtransit - H), set: fromJulian(Jtransit + H) };
}

interface DayLight {
  dawnBlue: Date | null;   // -6°
  dawnGold: Date | null;   // -4°
  sunrise: Date | null;    // -0.833°
  goldEndAM: Date | null;  // +6°
  goldStartPM: Date | null;// +6°
  sunset: Date | null;     // -0.833°
  duskGold: Date | null;   // -4°
  duskBlue: Date | null;   // -6°
}

function computeDay(date: Date, lat: number, lng: number): DayLight {
  const a6 = sunTimes(date, lat, lng, -6);
  const a4 = sunTimes(date, lat, lng, -4);
  const a0 = sunTimes(date, lat, lng, -0.833);
  const a6up = sunTimes(date, lat, lng, 6);
  return {
    dawnBlue: a6.rise, dawnGold: a4.rise, sunrise: a0.rise, goldEndAM: a6up.rise,
    goldStartPM: a6up.set, sunset: a0.set, duskGold: a4.set, duskBlue: a6.set,
  };
}

// ── Display helpers ───────────────────────────────────────────────────────────

function fmt(d: Date | null): string {
  if (!d) return '—';
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function fmtRange(a: Date | null, b: Date | null): string {
  if (!a || !b) return 'Not today';
  return `${fmt(a)} – ${fmt(b)}`;
}

interface Phase { key: string; label: string; color: string; pose: PhilPose; note: string }

function currentPhase(d: DayLight, now: Date): Phase {
  const t = now.getTime();
  const within = (a: Date | null, b: Date | null) => a && b && t >= a.getTime() && t < b.getTime();

  if (within(d.dawnGold, d.goldEndAM) || within(d.goldStartPM, d.duskGold))
    return { key: 'golden', label: 'Golden hour — now!', color: '#F5A623', pose: 'cheer', note: 'Warm, soft, magical light. Go shoot!' };
  if (within(d.dawnBlue, d.dawnGold) || within(d.duskGold, d.duskBlue))
    return { key: 'blue', label: 'Blue hour', color: '#3B6FE0', pose: 'excited', note: 'Cool, even, moody light — perfect for cityscapes.' };
  if (d.sunrise && d.sunset && t >= d.sunrise.getTime() && t < d.sunset.getTime())
    return { key: 'day', label: 'Daytime', color: '#1B9AE4', pose: 'reading', note: 'Harsh midday sun — find shade or wait for the golden light.' };
  return { key: 'night', label: 'Nighttime', color: '#5B4F8A', pose: 'sleeping', note: 'The sun is down. Rest up — golden hour is coming.' };
}

// ── Component ─────────────────────────────────────────────────────────────────

const DEFAULT_LOC = { lat: 39.7392, lng: -104.9903, name: 'Denver, CO (default)' };

export default function GoldenHourPage() {
  const router = useRouter();
  const [loc, setLoc] = useState<{ lat: number; lng: number; name: string }>(DEFAULT_LOC);
  const [geoState, setGeoState] = useState<'idle' | 'loading' | 'granted' | 'denied'>('idle');
  const [now, setNow] = useState(() => new Date());

  // tick every 30s so the "now" marker and phase stay live
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  function useMyLocation() {
    if (!('geolocation' in navigator)) { setGeoState('denied'); return; }
    setGeoState('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, name: 'Your location' });
        setGeoState('granted');
      },
      () => setGeoState('denied'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
  }

  const today = useMemo(() => computeDay(now, loc.lat, loc.lng), [now, loc]);
  const phase = currentPhase(today, now);

  // Next golden hour (today's windows, else tomorrow morning).
  const nextGolden = useMemo(() => {
    const t = now.getTime();
    const candidates: Date[] = [];
    if (today.dawnGold && today.dawnGold.getTime() > t) candidates.push(today.dawnGold);
    if (today.goldStartPM && today.goldStartPM.getTime() > t) candidates.push(today.goldStartPM);
    if (candidates.length === 0) {
      const tmr = computeDay(new Date(now.getTime() + 86400000), loc.lat, loc.lng);
      if (tmr.dawnGold) candidates.push(tmr.dawnGold);
    }
    return candidates.sort((a, b) => a.getTime() - b.getTime())[0] ?? null;
  }, [today, now, loc]);

  const countdown = nextGolden
    ? (() => {
        const mins = Math.max(0, Math.round((nextGolden.getTime() - now.getTime()) / 60000));
        const h = Math.floor(mins / 60), m = mins % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
      })()
    : null;

  // ── Timeline segments across the local day (as fractions 0..1) ──
  const dayStart = new Date(now); dayStart.setHours(0, 0, 0, 0);
  const frac = (d: Date | null) => (d ? Math.max(0, Math.min(1, (d.getTime() - dayStart.getTime()) / 86400000)) : null);
  const nowFrac = (now.getTime() - dayStart.getTime()) / 86400000;

  const stops: { at: number | null; color: string }[] = [
    { at: 0, color: '#2B2350' },
    { at: frac(today.dawnBlue), color: '#3B6FE0' },
    { at: frac(today.dawnGold), color: '#F5A623' },
    { at: frac(today.goldEndAM), color: '#7EC8F0' },
    { at: frac(today.goldStartPM), color: '#F5A623' },
    { at: frac(today.duskGold), color: '#3B6FE0' },
    { at: frac(today.duskBlue), color: '#2B2350' },
    { at: 1, color: '#2B2350' },
  ];
  const gradient = `linear-gradient(90deg, ${stops
    .filter(s => s.at !== null)
    .map(s => `${s.color} ${((s.at as number) * 100).toFixed(1)}%`)
    .join(', ')})`;

  const cards: { label: string; value: string; emoji: string; tint: string }[] = [
    { label: 'Golden hour', value: fmtRange(today.dawnGold, today.goldEndAM), emoji: '🌅', tint: '#FFFCEF' },
    { label: 'Sunrise', value: fmt(today.sunrise), emoji: '🌄', tint: '#FFF4EE' },
    { label: 'Sunset', value: fmt(today.sunset), emoji: '🌇', tint: '#FFF1F0' },
    { label: 'Golden hour', value: fmtRange(today.goldStartPM, today.duskGold), emoji: '🌆', tint: '#FFFCEF' },
    { label: 'Blue hour AM', value: fmtRange(today.dawnBlue, today.dawnGold), emoji: '🌌', tint: '#EFF3FF' },
    { label: 'Blue hour PM', value: fmtRange(today.duskGold, today.duskBlue), emoji: '🔵', tint: '#EFF3FF' },
  ];

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
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Golden Hour</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Chase the perfect light</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        {/* Status hero */}
        <div
          style={{
            background: 'var(--surface)', borderRadius: 18, border: '1.5px solid var(--border)',
            boxShadow: '0 2px 14px rgba(27,154,228,0.08)', padding: 18, marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          <div className="animate-bob flex-shrink-0" style={{ filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.12))' }}>
            <PhotoPhil size={74} pose={phase.pose} />
          </div>
          <div className="min-w-0">
            <span
              style={{
                fontSize: 11.5, fontWeight: 800, color: phase.color, background: `${phase.color}1A`,
                borderRadius: 99, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}
            >
              {phase.label}
            </span>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.4, marginTop: 8 }}>
              {phase.note}
            </p>
            {countdown && phase.key !== 'golden' && (
              <p style={{ fontSize: 12.5, fontWeight: 800, color: '#F5A623', marginTop: 6 }}>
                ⏱ Next golden hour in {countdown}
              </p>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ position: 'relative', height: 26, borderRadius: 99, overflow: 'hidden', background: gradient, border: '1.5px solid var(--border)' }}>
            {/* now marker */}
            <div
              style={{
                position: 'absolute', top: -3, bottom: -3, left: `${nowFrac * 100}%`,
                width: 3, background: '#fff', boxShadow: '0 0 0 1.5px rgba(0,0,0,0.35)',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
          <div className="flex justify-between" style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted-light)', marginTop: 4 }}>
            <span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>12a</span>
          </div>
        </div>

        {/* Time cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 18 }}>
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: c.tint, borderRadius: 14, padding: '13px 14px', border: '1.5px solid var(--border)',
              }}
            >
              <div className="flex items-center gap-1.5" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{c.emoji}</span>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {c.label}
                </span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 900, color: 'var(--foreground)' }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Location control */}
        <div
          style={{
            background: 'var(--surface)', borderRadius: 14, border: '1.5px solid var(--border)',
            padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>📍</span>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--foreground)' }}>{loc.name}</p>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--muted)' }}>
              {loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}
              {geoState === 'denied' && ' · location blocked — using default'}
            </p>
          </div>
          <button
            onClick={useMyLocation}
            disabled={geoState === 'loading'}
            style={{
              padding: '8px 14px', borderRadius: 10, flexShrink: 0, cursor: 'pointer',
              background: 'var(--primary)', color: 'white', fontSize: 12.5, fontWeight: 800, border: 'none',
              opacity: geoState === 'loading' ? 0.6 : 1,
            }}
          >
            {geoState === 'loading' ? 'Locating…' : geoState === 'granted' ? 'Update' : 'Use my location'}
          </button>
        </div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-light)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          Times use your device clock &amp; the location above. Tap <strong>Use my location</strong> for the exact windows where you are.
        </p>
      </div>
    </div>
  );
}
