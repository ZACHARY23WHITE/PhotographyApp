// Doodle-style SVG illustrations for lessons.
// Each export is a pair: { Doodle, Photo } — both rendered as SVG scenes.
import type { JSX } from 'react';

function DoodleRuleOfThirds() {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* lined notebook paper background */}
      <rect width="320" height="220" fill="#fefce8" rx="4" />
      {[40,55,70,85,100,115,130,145,160,175,190,205].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#bfdbfe" strokeWidth="0.8" />
      ))}
      <line x1="38" y1="0" x2="38" y2="220" stroke="#fca5a5" strokeWidth="1.5" />

      {/* title */}
      <text x="160" y="28" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="17" fill="#1e293b" fontWeight="bold">Rule of Thirds</text>

      {/* camera frame — slightly wobbly */}
      <path d="M52,42 L268,44 L270,178 L50,176 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />

      {/* vertical thirds lines — dashed */}
      <line x1="123" y1="44" x2="121" y2="176" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="6,4" />
      <line x1="197" y1="44" x2="199" y2="176" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="6,4" />

      {/* horizontal thirds lines — dashed */}
      <line x1="52" y1="88" x2="270" y2="90" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="6,4" />
      <line x1="52" y1="132" x2="270" y2="134" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="6,4" />

      {/* power point X marks */}
      {[[121,89],[199,89],[121,133],[199,133]].map(([cx,cy], i) => (
        <g key={i}>
          <line x1={cx-7} y1={cy-7} x2={cx+7} y2={cy+7} stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={cx+7} y1={cy-7} x2={cx-7} y2={cy+7} stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}

      {/* annotation labels */}
      <text x="68" y="82" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">put subject</text>
      <text x="72" y="93" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">here! ↙</text>

      <text x="207" y="82" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">cool stuff</text>
      <text x="204" y="93" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">goes here ↙</text>

      <text x="68" y="148" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">important ↗</text>
      <text x="70" y="159" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">thing here</text>

      <text x="204" y="148" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">main char ↗</text>
      <text x="207" y="159" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">spot!</text>

      {/* spiral binding holes */}
      {[20,50,80,110,140,170,200].map(y => (
        <circle key={y} cx="15" cy={y} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

function PhotoRuleOfThirds() {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      {/* sky — top 2/3 */}
      <rect width="320" height="134" fill="url(#sky)" />
      {/* ground — bottom 1/3 */}
      <rect y="134" width="320" height="66" fill="url(#ground)" />

      {/* clouds */}
      <ellipse cx="80" cy="45" rx="30" ry="14" fill="white" opacity="0.85" />
      <ellipse cx="100" cy="38" rx="22" ry="13" fill="white" opacity="0.85" />
      <ellipse cx="240" cy="55" rx="25" ry="11" fill="white" opacity="0.7" />

      {/* tree / subject on left power point (x≈107) */}
      <rect x="101" y="70" width="12" height="65" fill="#713f12" rx="2" />
      <ellipse cx="107" cy="62" rx="22" ry="28" fill="#15803d" />
      <ellipse cx="95" cy="72" rx="14" ry="18" fill="#16a34a" />
      <ellipse cx="119" cy="74" rx="14" ry="16" fill="#16a34a" />

      {/* distant hills */}
      <ellipse cx="220" cy="134" rx="80" ry="30" fill="#4ade80" />
      <ellipse cx="60" cy="140" rx="60" ry="22" fill="#86efac" />

      {/* grid overlay — subtle white */}
      <line x1="107" y1="0" x2="107" y2="200" stroke="white" strokeWidth="1" opacity="0.5" strokeDasharray="4,3" />
      <line x1="213" y1="0" x2="213" y2="200" stroke="white" strokeWidth="1" opacity="0.5" strokeDasharray="4,3" />
      <line x1="0" y1="67" x2="320" y2="67" stroke="white" strokeWidth="1" opacity="0.5" strokeDasharray="4,3" />
      <line x1="0" y1="134" x2="320" y2="134" stroke="white" strokeWidth="1" opacity="0.5" strokeDasharray="4,3" />

      {/* power point dot on top-left intersection */}
      <circle cx="107" cy="67" r="4" fill="white" opacity="0.9" />

      {/* label */}
      <rect x="4" y="184" width="200" height="14" rx="3" fill="rgba(0,0,0,0.35)" />
      <text x="8" y="195" fontFamily="sans-serif" fontSize="9" fill="white">Subject placed on left power point ✓</text>
    </svg>
  );
}

function DoodleLeadingLines() {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="220" fill="#fefce8" rx="4" />
      {[40,55,70,85,100,115,130,145,160,175,190,205].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#bfdbfe" strokeWidth="0.8" />
      ))}
      <line x1="38" y1="0" x2="38" y2="220" stroke="#fca5a5" strokeWidth="1.5" />

      <text x="160" y="28" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="17" fill="#1e293b" fontWeight="bold">Leading Lines</text>

      {/* camera frame */}
      <path d="M52,42 L268,44 L270,178 L50,176 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />

      {/* road converging to vanishing point */}
      <polygon points="100,176 220,176 185,90 135,90" fill="#d1d5db" />
      {/* road lines */}
      <line x1="160" y1="176" x2="160" y2="90" stroke="white" strokeWidth="2" strokeDasharray="8,6" />

      {/* sky */}
      <rect x="52" y="44" width="216" height="46" fill="#e0f2fe" />

      {/* sun */}
      <circle cx="160" cy="72" r="10" fill="#fde047" />
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return <line key={i} x1={160 + 13*Math.cos(rad)} y1={72 + 13*Math.sin(rad)} x2={160 + 18*Math.cos(rad)} y2={72 + 18*Math.sin(rad)} stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />;
      })}

      {/* ground / fields */}
      <rect x="52" y="90" width="216" height="86" fill="#bbf7d0" />
      <rect x="52" y="90" width="83" height="86" fill="#86efac" />
      <rect x="185" y="90" width="83" height="86" fill="#86efac" />

      {/* arrows showing eye path */}
      <path d="M80,170 Q110,145 130,110 Q145,90 160,75" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
        </marker>
      </defs>

      {/* label */}
      <text x="56" y="196" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">road pulls eye toward the subject →</text>

      {[20,50,80,110,140,170,200].map(y => (
        <circle key={y} cx="15" cy={y} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

function PhotoLeadingLines() {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="skyLL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
      {/* sky */}
      <rect width="320" height="110" fill="url(#skyLL)" />
      {/* ground */}
      <rect y="110" width="320" height="90" fill="#78716c" />

      {/* road */}
      <polygon points="100,200 220,200 195,110 125,110" fill="#9ca3af" />
      <polygon points="145,200 175,200 165,110 155,110" fill="#6b7280" />
      {/* lane dashes */}
      {[120,140,160,180].map(y => (
        <rect key={y} x="157" y={y} width="6" height="10" fill="white" opacity="0.8" rx="1" />
      ))}

      {/* fence posts receding */}
      {[[98,112,200],[88,100,195],[78,90,190],[68,80,184]].map(([x1,x2,y], i) => (
        <g key={i}>
          <line x1={x1} y1={y} x2={x1} y2={200} stroke="#92400e" strokeWidth={4-i*0.5} />
          <line x1={x2} y1={y} x2={x2} y2={200} stroke="#92400e" strokeWidth={4-i*0.5} />
          <line x1={x1-4} y1={y+6} x2={x2+4} y2={y+6} stroke="#92400e" strokeWidth={1.5} />
          <line x1={x1-4} y1={y+16} x2={x2+4} y2={y+16} stroke="#92400e" strokeWidth={1.5} />
        </g>
      ))}

      {/* mountain at vanishing point */}
      <polygon points="130,110 160,60 190,110" fill="#6b7280" />
      <polygon points="145,110 165,75 185,110" fill="#9ca3af" />

      {/* snow cap */}
      <polygon points="155,65 160,60 165,65 162,68 158,68" fill="white" />

      {/* label */}
      <rect x="4" y="184" width="220" height="14" rx="3" fill="rgba(0,0,0,0.4)" />
      <text x="8" y="195" fontFamily="sans-serif" fontSize="9" fill="white">Road + fence lines converge to subject ✓</text>
    </svg>
  );
}

function DoodleNaturalFraming() {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="220" fill="#fefce8" rx="4" />
      {[40,55,70,85,100,115,130,145,160,175,190,205].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#bfdbfe" strokeWidth="0.8" />
      ))}
      <line x1="38" y1="0" x2="38" y2="220" stroke="#fca5a5" strokeWidth="1.5" />

      <text x="160" y="28" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="17" fill="#1e293b" fontWeight="bold">Natural Framing</text>

      {/* outer camera frame */}
      <path d="M52,42 L268,44 L270,178 L50,176 Z" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />

      {/* archway — the "frame" */}
      <path d="M80,176 L80,90 Q80,50 160,48 Q240,50 240,90 L240,176" fill="none" stroke="#92400e" strokeWidth="8" strokeLinejoin="round" />
      {/* arch fill to show depth */}
      <path d="M88,176 L88,92 Q88,60 160,58 Q232,60 232,92 L232,176" fill="#fef9c3" />

      {/* person / subject inside arch */}
      <circle cx="160" cy="110" r="12" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M152,122 Q160,140 168,122" fill="#6366f1" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="148" y1="128" x2="172" y2="128" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" />
      <line x1="148" y1="128" x2="140" y2="148" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      <line x1="172" y1="128" x2="180" y2="148" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      <line x1="155" y1="148" x2="152" y2="170" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="165" y1="148" x2="168" y2="170" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

      {/* annotation arrows */}
      <path d="M56,80 Q68,90 78,100" fill="none" stroke="#ef4444" strokeWidth="1.8" />
      <text x="44" y="72" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#ef4444">frame!</text>

      <path d="M180,100 Q210,90 225,80" fill="none" stroke="#ef4444" strokeWidth="1.8" />
      <text x="222" y="72" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#ef4444">frame!</text>

      <text x="120" y="196" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">arch = frame within frame</text>

      {[20,50,80,110,140,170,200].map(y => (
        <circle key={y} cx="15" cy={y} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

function PhotoNaturalFraming() {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="skyNF" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
      {/* background scene */}
      <rect width="320" height="200" fill="#78350f" />
      {/* inner scene through arch */}
      <path d="M75,200 L75,80 Q75,30 160,28 Q245,30 245,80 L245,200" fill="url(#skyNF)" />
      <rect x="75" y="145" width="170" height="55" fill="#86efac" />

      {/* distant city */}
      {[[110,130,145],[125,118,145],[145,125,145],[165,120,145],[180,128,145],[200,115,145],[215,130,145]].map(([x,top,bot], i) => (
        <rect key={i} x={x} y={top} width="14" height={bot-top} fill="#64748b" opacity="0.7" />
      ))}

      {/* arch stone texture */}
      <path d="M75,200 L75,80 Q75,30 160,28 Q245,30 245,80 L245,200 L232,200 L232,83 Q232,46 160,44 Q88,46 88,83 L88,200 Z" fill="#92400e" />

      {/* shadow inside arch */}
      <path d="M88,200 L88,83 Q88,46 160,44 Q232,46 232,83 L232,200" fill="none" stroke="#78350f" strokeWidth="3" opacity="0.5" />

      {/* person in scene */}
      <circle cx="160" cy="122" r="8" fill="#fbbf24" />
      <rect x="155" y="130" width="10" height="18" fill="#3b82f6" rx="2" />

      {/* label */}
      <rect x="4" y="184" width="200" height="14" rx="3" fill="rgba(0,0,0,0.4)" />
      <text x="8" y="195" fontFamily="sans-serif" fontSize="9" fill="white">Archway frames the subject ✓</text>
    </svg>
  );
}

function DoodleNegativeSpace() {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="220" fill="#fefce8" rx="4" />
      {[40,55,70,85,100,115,130,145,160,175,190,205].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#bfdbfe" strokeWidth="0.8" />
      ))}
      <line x1="38" y1="0" x2="38" y2="220" stroke="#fca5a5" strokeWidth="1.5" />

      <text x="160" y="28" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="17" fill="#1e293b" fontWeight="bold">Negative Space</text>

      {/* frame */}
      <path d="M52,42 L268,44 L270,178 L50,176 Z" fill="#e0f2fe" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />

      {/* big empty sky area with "this is empty (on purpose!)" label */}
      <text x="160" y="100" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="11" fill="#94a3b8">empty space</text>
      <text x="160" y="114" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="11" fill="#94a3b8">(on purpose!)</text>

      {/* tiny bird in upper right power point area */}
      {/* bird body */}
      <ellipse cx="210" cy="68" rx="10" ry="6" fill="#1e293b" />
      {/* wing */}
      <path d="M204,65 Q200,56 208,62" fill="#1e293b" />
      <path d="M216,65 Q222,56 214,62" fill="#1e293b" />
      {/* tail */}
      <path d="M200,68 L194,63 M200,68 L193,68 M200,68 L194,72" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      {/* beak */}
      <line x1="220" y1="67" x2="226" y2="66" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

      {/* annotation: tiny bird, huge sky = drama */}
      <path d="M215,80 Q220,100 215,116" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="222" y="100" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#ef4444">tiny</text>
      <text x="220" y="111" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#ef4444">bird!</text>

      {/* ground line at bottom third */}
      <line x1="52" y1="155" x2="268" y2="155" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,4" />
      <text x="56" y="170" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">← subject small = space feels HUGE</text>

      {[20,50,80,110,140,170,200].map(y => (
        <circle key={y} cx="15" cy={y} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

function PhotoNegativeSpace() {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="skyNS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="60%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>
      {/* big open sky */}
      <rect width="320" height="200" fill="url(#skyNS)" />

      {/* very thin ground strip */}
      <rect y="175" width="320" height="25" fill="#166534" />

      {/* tiny lone tree — off center, bottom third */}
      <rect x="93" y="140" width="6" height="38" fill="#14532d" />
      <ellipse cx="96" cy="132" rx="14" ry="18" fill="#15803d" />
      <ellipse cx="88" cy="140" rx="9" ry="12" fill="#16a34a" />

      {/* subtle clouds far away */}
      <ellipse cx="220" cy="50" rx="28" ry="9" fill="white" opacity="0.3" />
      <ellipse cx="60" cy="70" rx="20" ry="7" fill="white" opacity="0.2" />

      {/* label */}
      <rect x="4" y="184" width="230" height="14" rx="3" fill="rgba(0,0,0,0.35)" />
      <text x="8" y="195" fontFamily="sans-serif" fontSize="9" fill="white">Tiny tree, vast sky = dramatic isolation ✓</text>
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, { Doodle: () => JSX.Element; Photo: () => JSX.Element }> = {
  'rule-of-thirds': { Doodle: DoodleRuleOfThirds, Photo: PhotoRuleOfThirds },
  'leading-lines':  { Doodle: DoodleLeadingLines,  Photo: PhotoLeadingLines  },
  'natural-framing':{ Doodle: DoodleNaturalFraming, Photo: PhotoNaturalFraming },
  'negative-space': { Doodle: DoodleNegativeSpace,  Photo: PhotoNegativeSpace  },
};

export default function LessonIllustration({ id }: { id: string }) {
  const pair = ILLUSTRATIONS[id];
  if (!pair) return null;
  const { Doodle, Photo } = pair;

  return (
    <div className="mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)' }}>
          <div className="px-3 pt-2 pb-1">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Doodle</p>
          </div>
          <div className="aspect-[4/3]">
            <Doodle />
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)' }}>
          <div className="px-3 pt-2 pb-1">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Example</p>
          </div>
          <div className="aspect-[4/3]">
            <Photo />
          </div>
        </div>
      </div>
    </div>
  );
}
