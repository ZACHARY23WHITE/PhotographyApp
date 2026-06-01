'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Data ──────────────────────────────────────────────────────────────────────

interface Technique {
  id: string;
  title: string;
  description: string;
  tips: string[];
  diagram: React.ReactNode;
}

const TECHNIQUES: Technique[] = [
  {
    id: 'rule-of-thirds',
    title: 'Rule of Thirds',
    description: 'Divide the frame into a 3×3 grid and place your subject on one of the four intersection points — not in the center.',
    tips: [
      'Align eyes to the top horizontal third in portraits',
      'Put the horizon on the top or bottom third, never the middle',
      'Give moving subjects space in front of them',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#E8F4FD" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Sky */}
        <rect x="1" y="1" width="158" height="39" rx="4" fill="#C5DFEF" />
        {/* Ground */}
        <rect x="1" y="80" width="158" height="39" rx="4" fill="#D4ECC4" />
        {/* Grid thirds */}
        <line x1="53.3" y1="1" x2="53.3" y2="119" stroke="#1B9AE4" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <line x1="106.7" y1="1" x2="106.7" y2="119" stroke="#1B9AE4" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <line x1="1" y1="40" x2="159" y2="40" stroke="#1B9AE4" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <line x1="1" y1="80" x2="159" y2="80" stroke="#1B9AE4" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        {/* Power points */}
        <circle cx="53.3" cy="40" r="3" fill="#1B9AE4" opacity="0.4" />
        <circle cx="106.7" cy="40" r="3" fill="#1B9AE4" opacity="0.4" />
        <circle cx="53.3" cy="80" r="3" fill="#1B9AE4" opacity="0.4" />
        <circle cx="106.7" cy="80" r="3" fill="#1B9AE4" opacity="0.4" />
        {/* Subject at top-right power point */}
        <circle cx="106.7" cy="40" r="11" fill="#FF6B00" opacity="0.9" />
        <circle cx="106.7" cy="37" r="4" fill="white" opacity="0.85" />
        <path d="M100 48 Q106.7 42 113.4 48" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'leading-lines',
    title: 'Leading Lines',
    description: 'Use natural or man-made lines to guide the viewer\'s eye toward your subject or into the scene.',
    tips: [
      'Roads, rivers, fences, and train tracks all work',
      'Converging diagonals create depth and energy',
      'Get low to exaggerate the effect',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#EEF5E8" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Sky gradient feel */}
        <rect x="1" y="1" width="158" height="60" rx="4" fill="#DCE9F5" />
        {/* Ground */}
        <path d="M1 80 L159 80 L159 119 Q80 110 1 119 Z" fill="#C8DEB8" />
        {/* Road */}
        <path d="M60 119 L75 60 L85 60 L100 119 Z" fill="#B8C4B0" />
        {/* Road center dashes */}
        <line x1="80" y1="110" x2="80" y2="100" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="93" x2="80" y2="83" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="76" x2="80" y2="68" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Vanishing point indicator */}
        <circle cx="80" cy="58" r="5" fill="#FF6B00" opacity="0.9" />
        {/* Converging lines from corners */}
        <line x1="1" y1="119" x2="80" y2="58" stroke="#FF6B00" strokeWidth="1" opacity="0.3" strokeDasharray="4,3" />
        <line x1="159" y1="119" x2="80" y2="58" stroke="#FF6B00" strokeWidth="1" opacity="0.3" strokeDasharray="4,3" />
        {/* Trees */}
        <ellipse cx="30" cy="75" rx="10" ry="14" fill="#7DAD6F" />
        <rect x="28" y="86" width="4" height="8" fill="#8B6F47" />
        <ellipse cx="130" cy="75" rx="10" ry="14" fill="#7DAD6F" />
        <rect x="128" y="86" width="4" height="8" fill="#8B6F47" />
      </svg>
    ),
  },
  {
    id: 'symmetry',
    title: 'Symmetry',
    description: 'Mirror compositions create powerful visual balance and a sense of calm, order, or grandeur.',
    tips: [
      'Shoot straight-on to keep the axis perfectly centered',
      'Water reflections are natural symmetry generators',
      'Break symmetry intentionally for tension',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#F0EDF8" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Sky */}
        <rect x="1" y="1" width="158" height="60" rx="4" fill="#DCE9F5" />
        {/* Water reflection */}
        <rect x="1" y="60" width="158" height="59" fill="#C8D8EF" />
        {/* Arch above */}
        <path d="M55 60 Q55 20 80 15 Q105 20 105 60 Z" fill="#8B7EC8" opacity="0.85" />
        <path d="M63 60 Q63 28 80 23 Q97 28 97 60 Z" fill="#F0EDF8" />
        {/* Arch reflection */}
        <path d="M55 60 Q55 100 80 105 Q105 100 105 60 Z" fill="#8B7EC8" opacity="0.4" />
        <path d="M63 60 Q63 92 80 97 Q97 92 97 60 Z" fill="#C8D8EF" opacity="0.6" />
        {/* Pillars */}
        <rect x="52" y="20" width="8" height="40" fill="#8B7EC8" opacity="0.85" />
        <rect x="100" y="20" width="8" height="40" fill="#8B7EC8" opacity="0.85" />
        {/* Reflection pillars */}
        <rect x="52" y="60" width="8" height="40" fill="#8B7EC8" opacity="0.4" />
        <rect x="100" y="60" width="8" height="40" fill="#8B7EC8" opacity="0.4" />
        {/* Center axis line */}
        <line x1="80" y1="1" x2="80" y2="119" stroke="white" strokeWidth="1" strokeDasharray="5,4" opacity="0.6" />
        {/* Small subject dot in arch */}
        <circle cx="80" cy="44" r="5" fill="#FF6B00" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: 'framing',
    title: 'Framing',
    description: 'Use elements in the scene — doorways, arches, windows, branches — to frame and draw attention to your subject.',
    tips: [
      'Natural frames: tunnels, cave openings, branches',
      'The frame doesn\'t need to be sharp — soft foreground works',
      'Works especially well for architecture and portraits',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#2A2A35" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Dark vignette frame area */}
        {/* Left dark area */}
        <path d="M1 1 L50 1 L50 119 L1 119 Z" fill="#1A1A25" rx="4" />
        {/* Right dark area */}
        <path d="M110 1 L159 1 L159 119 L110 119 Z" fill="#1A1A25" />
        {/* Top dark area */}
        <path d="M1 1 L159 1 L159 35 L1 35 Z" fill="#1A1A25" />
        {/* Bottom dark area */}
        <path d="M1 90 L159 90 L159 119 L1 119 Z" fill="#1A1A25" />
        {/* Bright center scene */}
        <rect x="50" y="35" width="60" height="55" fill="#C5DFEF" />
        <rect x="50" y="35" width="60" height="25" fill="#87CEEB" />
        <rect x="50" y="78" width="60" height="12" fill="#A8C890" />
        {/* Subject in bright center */}
        <circle cx="80" cy="58" r="9" fill="#FF6B00" opacity="0.9" />
        <circle cx="80" cy="54" r="3.5" fill="white" opacity="0.9" />
        <path d="M74 65 Q80 60 86 65" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Frame arch overlay */}
        <path d="M50 1 L50 35 Q50 119 50 119 L1 119 L1 1 Z" fill="#1C1C28" />
        <path d="M110 1 L110 35 Q110 119 110 119 L159 119 L159 1 Z" fill="#1C1C28" />
        <path d="M1 1 L159 1 L159 35 L50 35 Q65 20 80 18 Q95 20 110 35 L159 35 L159 1 Z" fill="#1C1C28" />
      </svg>
    ),
  },
  {
    id: 'negative-space',
    title: 'Negative Space',
    description: 'The empty area around your subject is a powerful compositional tool — it creates breathing room and isolates your subject.',
    tips: [
      'Sky, water, and walls make great negative space',
      'More negative space = more contemplative mood',
      'Keep background clean and uncluttered',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#E8F0F8" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Vast empty sky */}
        <rect x="1" y="1" width="158" height="90" rx="4" fill="#D4E8F4" />
        {/* Minimal ground strip */}
        <rect x="1" y="98" width="158" height="21" rx="2" fill="#D4E0CC" />
        <rect x="1" y="90" width="158" height="10" fill="#DCE8D4" />
        {/* Tiny bird in upper area — lots of space around it */}
        <path d="M38 38 Q43 33 48 38" stroke="#2A3A50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M38 38 Q35 36 33 37" stroke="#2A3A50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M48 38 Q51 36 53 37" stroke="#2A3A50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Small annotation showing the space */}
        <text x="95" y="55" fontSize="9" fill="#9BB5CC" fontFamily="sans-serif" fontWeight="600">negative space</text>
        <line x1="80" y1="52" x2="93" y2="52" stroke="#9BB5CC" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    ),
  },
  {
    id: 'fill-the-frame',
    title: 'Fill the Frame',
    description: 'Get close and let your subject dominate the entire frame — eliminates distracting backgrounds and reveals texture.',
    tips: [
      'Great for flowers, faces, food, and textures',
      'Edges of the subject can bleed off the frame',
      'Forces viewers to engage with every detail',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#FFF0ED" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Large flower filling the frame */}
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <ellipse
            key={i}
            cx={80 + 44 * Math.cos(deg * Math.PI / 180)}
            cy={60 + 44 * Math.sin(deg * Math.PI / 180)}
            rx="26" ry="16"
            fill="#FF9B7A"
            transform={`rotate(${deg}, ${80 + 44 * Math.cos(deg * Math.PI / 180)}, ${60 + 44 * Math.sin(deg * Math.PI / 180)})`}
            opacity="0.85"
          />
        ))}
        {/* Center */}
        <circle cx="80" cy="60" r="22" fill="#FF6B00" />
        <circle cx="80" cy="60" r="16" fill="#FFB347" />
        {/* Texture dots */}
        {[[-6,-6],[0,-8],[6,-6],[8,0],[6,6],[0,8],[-6,6],[-8,0],[-4,-2],[4,-2],[0,3]].map(([dx,dy], i) => (
          <circle key={i} cx={80+dx} cy={60+dy} r="1.5" fill="#E05A00" opacity="0.6" />
        ))}
      </svg>
    ),
  },
  {
    id: 'diagonal-composition',
    title: 'Diagonal Lines',
    description: 'Diagonal elements create energy, dynamism, and a sense of movement — far more powerful than horizontal or vertical lines.',
    tips: [
      'Tilt the camera (Dutch angle) for intensity',
      'Staircases, ramps, and shadows work great',
      'Bottom-left to top-right feels natural and forward',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#F5F0E8" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Background split */}
        <path d="M1 1 L159 1 L159 119 L1 119 Z" fill="#EDE8DD" />
        {/* Strong diagonal */}
        <path d="M10 115 L150 10" stroke="#E8534A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        {/* Parallel diagonals for depth */}
        <path d="M25 119 L155 25" stroke="#F5A0A0" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M1 98 L135 1" stroke="#F5A0A0" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        {/* Subject on the main diagonal */}
        <circle cx="80" cy="62" r="12" fill="#FF6B00" opacity="0.9" />
        <circle cx="80" cy="58" r="4.5" fill="white" opacity="0.85" />
        {/* Direction arrow */}
        <path d="M120 28 L128 22 L126 30" fill="#E8534A" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'depth-layers',
    title: 'Depth & Layers',
    description: 'Include a clear foreground, midground, and background to create a three-dimensional sense of depth in a flat image.',
    tips: [
      'Strong foreground element anchors the viewer',
      'Use a wide angle + low position to exaggerate layers',
      'Depth of field can separate the layers beautifully',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#E8F0F8" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Sky - background */}
        <rect x="1" y="1" width="158" height="50" rx="4" fill="#C8DFF0" />
        {/* Mountains - background */}
        <path d="M1 50 L40 20 L70 40 L100 15 L130 35 L159 25 L159 50 Z" fill="#9AB8D0" />
        {/* Midground hills */}
        <path d="M1 70 Q40 50 80 60 Q120 70 159 55 L159 80 L1 80 Z" fill="#A8C890" />
        {/* Foreground grass - large, close */}
        <rect x="1" y="90" width="158" height="29" rx="2" fill="#6EA855" />
        <path d="M1 90 Q40 82 80 87 Q120 82 159 90" fill="#7DBF62" />
        {/* Foreground detail blades */}
        {[15,30,50,70,90,110,130,148].map((x, i) => (
          <path key={i} d={`M${x} 119 Q${x-3} 100 ${x+2} 92`} stroke="#4A8A3A" strokeWidth="2" strokeLinecap="round" />
        ))}
        {/* Labels */}
        <text x="4" y="10" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="700" opacity="0.8">Background</text>
        <text x="4" y="65" fontSize="7" fill="#3A5A2A" fontFamily="sans-serif" fontWeight="700">Midground</text>
        <text x="4" y="115" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="700">Foreground</text>
      </svg>
    ),
  },
  {
    id: 'rule-of-odds',
    title: 'Rule of Odds',
    description: 'Odd numbers of subjects (3, 5, 7) feel more natural and balanced than even numbers — the eye always has a center element.',
    tips: [
      '3 subjects is the sweet spot for portraits and groups',
      'Works for flowers, windows, lamp posts, any repeating element',
      'Arrange in a triangle for visual stability',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#F8F4EE" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Background */}
        <rect x="1" y="1" width="158" height="55" rx="4" fill="#E0D8F0" />
        <rect x="1" y="55" width="158" height="64" rx="2" fill="#D4E8C8" />
        {/* Three subjects */}
        {/* Left */}
        <circle cx="38" cy="55" r="14" fill="#8B7EC8" opacity="0.85" />
        <circle cx="38" cy="50" r="5.5" fill="white" opacity="0.8" />
        <path d="M31 62 Q38 57 45 62" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Center (slightly forward = larger) */}
        <circle cx="80" cy="58" r="16" fill="#FF6B00" opacity="0.95" />
        <circle cx="80" cy="52" r="6.5" fill="white" opacity="0.85" />
        <path d="M73 66 Q80 61 87 66" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Right */}
        <circle cx="122" cy="55" r="14" fill="#8B7EC8" opacity="0.85" />
        <circle cx="122" cy="50" r="5.5" fill="white" opacity="0.8" />
        <path d="M115 62 Q122 57 129 62" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Triangle connection dots */}
        <line x1="38" y1="55" x2="80" y2="58" stroke="white" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
        <line x1="80" y1="58" x2="122" y2="55" stroke="white" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
      </svg>
    ),
  },
  {
    id: 'golden-ratio',
    title: 'Golden Spiral',
    description: 'The Fibonacci spiral naturally guides the eye through a scene. Place your subject at the spiral\'s focal point for an elegant, classical feel.',
    tips: [
      'More organic and less rigid than rule of thirds',
      'The spiral\'s tight end = the focal point',
      'Naturally occurring in shells, flowers, and galaxies',
    ],
    diagram: (
      <svg viewBox="0 0 160 120" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="1" y="1" width="158" height="118" rx="4" fill="#F4F8F0" stroke="#BDD8F0" strokeWidth="1.5" />
        {/* Background */}
        <rect x="1" y="1" width="158" height="60" rx="4" fill="#DCE9F5" />
        <rect x="1" y="60" width="158" height="59" fill="#D4ECC4" />
        {/* Golden ratio rectangles */}
        <rect x="1" y="1" width="99" height="61" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.4" />
        <rect x="100" y="1" width="59" height="61" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.4" />
        <rect x="100" y="25" width="59" height="37" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.3" />
        <rect x="100" y="25" width="36" height="37" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.2" />
        {/* Spiral approximation using arcs */}
        <path
          d="M 1 62 A 99 61 0 0 1 100 1"
          stroke="#F5A623" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round"
        />
        <path
          d="M 100 1 A 59 61 0 0 1 159 62"
          stroke="#F5A623" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"
        />
        <path
          d="M 159 62 A 59 37 0 0 1 100 99"
          stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"
        />
        <path
          d="M 100 99 A 36 37 0 0 1 64 62"
          stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"
        />
        <path
          d="M 64 62 A 36 22 0 0 1 100 40"
          stroke="#F5A623" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"
        />
        {/* Focal point */}
        <circle cx="100" cy="62" r="7" fill="#FF6B00" opacity="0.9" />
        <circle cx="100" cy="62" r="3" fill="white" opacity="0.9" />
      </svg>
    ),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CompositionGuidePage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

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
          <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>Composition Guide</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{TECHNIQUES.length} techniques</p>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6">
        <div className="flex flex-col gap-3">
          {TECHNIQUES.map(t => {
            const isOpen = expanded === t.id;
            return (
              <div
                key={t.id}
                style={{
                  background: 'var(--surface)',
                  border: `1.5px solid ${isOpen ? '#FF6B00' : 'var(--border)'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: isOpen
                    ? '0 4px 20px rgba(255,107,0,0.12)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                {/* Card tap target */}
                <button
                  onClick={() => setExpanded(isOpen ? null : t.id)}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left', padding: 0,
                  }}
                >
                  <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Mini diagram preview */}
                    <div
                      style={{
                        width: 64, height: 48, borderRadius: 8, overflow: 'hidden',
                        flexShrink: 0, border: '1px solid var(--border)',
                      }}
                    >
                      {t.diagram}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--foreground)', marginBottom: 2 }}>
                        {t.title}
                      </p>
                      <p
                        style={{
                          fontSize: 12.5, fontWeight: 600, color: 'var(--muted)',
                          lineHeight: 1.4,
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: isOpen ? undefined : 2,
                          WebkitBoxOrient: 'vertical' as const,
                        }}
                      >
                        {t.description}
                      </p>
                    </div>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round"
                      style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop: '1.5px solid var(--border)' }}>
                    {/* Large diagram */}
                    <div
                      style={{
                        padding: '16px 16px 8px',
                        background: '#FAFBFC',
                      }}
                    >
                      <div style={{ maxWidth: 320, margin: '0 auto', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        {t.diagram}
                      </div>
                    </div>

                    {/* Tips */}
                    <div style={{ padding: '12px 16px 16px' }}>
                      <p style={{ fontSize: 12, fontWeight: 800, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                        When to use
                      </p>
                      {t.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2" style={{ marginBottom: i < t.tips.length - 1 ? 7 : 0 }}>
                          <div
                            style={{
                              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                              background: '#FFF4EE', border: '1.5px solid #FFD0B0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              marginTop: 1,
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.45 }}>
                            {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
