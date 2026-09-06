// Doodle-style SVG concept diagrams for lessons — a hand-drawn "notebook page"
// look. A real example photo renders beside these (via LessonStep.image).
import type { JSX, ReactNode } from 'react';

// Shared notebook-paper canvas: cream page, blue rule lines, red margin, spiral
// binding, a hand-written title, and the wobbly camera frame. Concept art for
// each lesson is passed as children and drawn inside the frame.
function Paper({ title, children, frameFill = 'none', frame = true }: { title: string; children: ReactNode; frameFill?: string; frame?: boolean }) {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="220" fill="#fefce8" rx="4" />
      {[40,55,70,85,100,115,130,145,160,175,190,205].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#bfdbfe" strokeWidth="0.8" />
      ))}
      <line x1="38" y1="0" x2="38" y2="220" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="160" y="28" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="17" fill="#1e293b" fontWeight="bold">{title}</text>
      {frame && <path d="M52,42 L268,44 L270,178 L50,176 Z" fill={frameFill} stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />}
      {children}
      {[20,50,80,110,140,170,200].map(y => (
        <circle key={y} cx="15" cy={y} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

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

      {/* clouds — gently drifting */}
      <g className="animate-drift" style={{ animationDuration: '9s' }}>
        <ellipse cx="80" cy="45" rx="30" ry="14" fill="white" opacity="0.85" />
        <ellipse cx="100" cy="38" rx="22" ry="13" fill="white" opacity="0.85" />
      </g>
      <ellipse className="animate-drift" style={{ animationDuration: '11s' }} cx="240" cy="55" rx="25" ry="11" fill="white" opacity="0.7" />

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

      {/* power point dot on top-left intersection — pulsing to draw the eye */}
      <circle className="animate-glow" cx="107" cy="67" r="4" fill="white" />
      <circle className="animate-glow" style={{ animationDelay: '0.4s' }} cx="107" cy="67" r="8" fill="none" stroke="white" strokeWidth="1.5" />

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

      {/* arrows showing eye path — dashes march toward the subject */}
      <path className="animate-march" d="M80,170 Q110,145 130,110 Q145,90 160,75" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr)" />
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

      {/* tiny bird in upper right power point area — drifting on the breeze */}
      <g className="animate-bob" style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDuration: '5s' }}>
        {/* bird body */}
        <ellipse cx="210" cy="68" rx="10" ry="6" fill="#1e293b" />
        {/* wing */}
        <path d="M204,65 Q200,56 208,62" fill="#1e293b" />
        <path d="M216,65 Q222,56 214,62" fill="#1e293b" />
        {/* tail */}
        <path d="M200,68 L194,63 M200,68 L193,68 M200,68 L194,72" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        {/* beak */}
        <line x1="220" y1="67" x2="226" y2="66" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </g>

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

function DoodleSymmetry() {
  return (
    <Paper title="Symmetry">
      {/* sky + water halves split by the mirror line */}
      <rect x="53" y="45" width="216" height="65" fill="#eff6ff" />
      <rect x="53" y="110" width="216" height="65" fill="#dbeafe" />
      {/* mountain */}
      <polygon points="105,110 160,58 215,110" fill="#94a3b8" />
      <polygon points="140,110 160,58 180,110" fill="#e2e8f0" />
      {/* mirrored reflection below */}
      <polygon points="105,110 160,162 215,110" fill="#94a3b8" opacity="0.45" />
      <polygon points="140,110 160,162 180,110" fill="#e2e8f0" opacity="0.45" />
      {/* mirror axis */}
      <line x1="53" y1="110" x2="269" y2="110" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="6,4" />
      <text x="192" y="105" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#ef4444">mirror line</text>
      <text x="60" y="152" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">both halves match!</text>
    </Paper>
  );
}

function DoodleFillFrame() {
  const petals = Array.from({ length: 12 }).map((_, i) => {
    const a = (i * 30) * Math.PI / 180;
    const cx = 160 + 44 * Math.cos(a);
    const cy = 110 + 44 * Math.sin(a);
    return <ellipse key={i} cx={cx} cy={cy} rx="17" ry="9" fill="#fbbf24" transform={`rotate(${i * 30} ${cx} ${cy})`} />;
  });
  return (
    <Paper title="Fill the Frame">
      {/* one big subject touching every edge */}
      {petals}
      <circle cx="160" cy="110" r="34" fill="#92400e" />
      <circle cx="160" cy="110" r="34" fill="none" stroke="#78350f" strokeWidth="2" strokeDasharray="3,3" />
      <text x="58" y="58" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#ef4444">get CLOSE!</text>
      <text x="118" y="170" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">fills every edge — no wasted space</text>
    </Paper>
  );
}

function DoodleGoldenRatio() {
  return (
    <Paper title="The Golden Ratio">
      {/* nested golden rectangles */}
      <rect x="65" y="58" width="190" height="104" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1="169" y1="58" x2="169" y2="162" stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1="169" y1="122" x2="255" y2="122" stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1="223" y1="122" x2="223" y2="162" stroke="#cbd5e1" strokeWidth="1.2" />
      {/* the spiral, curling inward */}
      <path d="M255,122 C255,80 200,58 160,58 C110,58 65,95 65,130 C65,150 90,162 115,158 C140,154 150,135 148,122"
        fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
      {/* subject sits at the eye of the spiral */}
      <circle cx="150" cy="122" r="4.5" fill="#ef4444" />
      <text x="120" y="150" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">spiral guides the eye in →</text>
    </Paper>
  );
}

function DoodleRuleOfOdds() {
  const tree = (x: number) => (
    <g key={x}>
      <rect x={x - 3} y="128" width="6" height="26" fill="#78350f" />
      <polygon points={`${x},80 ${x - 22},130 ${x + 22},130`} fill="#15803d" />
      <polygon points={`${x},96 ${x - 16},132 ${x + 16},132`} fill="#16a34a" />
    </g>
  );
  return (
    <Paper title="Rule of Odds">
      {[110, 160, 210].map(tree)}
      <text x="118" y="168" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#16a34a">THREE feels natural ✓</text>
      <text x="60" y="60" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">odd &gt; even:  2 = ✗   3 = ✓</text>
    </Paper>
  );
}

function DoodleDepthLayers() {
  return (
    <Paper title="Depth & Layers">
      {/* background ridge (lightest, far) */}
      <polygon points="53,116 120,74 190,116" fill="#cbd5e1" />
      <polygon points="150,116 215,82 269,116" fill="#cbd5e1" />
      <text x="228" y="70" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#94a3b8">BG</text>
      {/* midground hill */}
      <path d="M53,140 Q160,104 269,140 L269,155 L53,155 Z" fill="#86a06f" />
      <text x="150" y="134" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#4d5f3d">MG</text>
      {/* foreground (darkest, near) with a tree */}
      <rect x="53" y="155" width="216" height="21" fill="#3f5130" />
      <rect x="78" y="132" width="7" height="30" fill="#1e293b" />
      <ellipse cx="81" cy="126" rx="17" ry="20" fill="#14532d" />
      <text x="150" y="169" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#e2e8f0">FG — layers build depth!</text>
    </Paper>
  );
}

function DoodleViewpoint() {
  return (
    <Paper title="Viewpoint">
      {/* a tall subject in the middle */}
      <rect x="157" y="96" width="7" height="66" fill="#78350f" />
      <ellipse cx="160" cy="88" rx="26" ry="30" fill="#15803d" />
      {/* eye-level camera (meh) */}
      <rect x="70" y="104" width="22" height="15" rx="2" fill="#94a3b8" />
      <line x1="92" y1="111" x2="150" y2="111" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4,3" />
      <text x="60" y="98" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="8.5" fill="#94a3b8">eye level = meh</text>
      {/* low camera (dramatic) */}
      <rect x="74" y="150" width="24" height="16" rx="2" fill="#ef4444" />
      <line x1="98" y1="156" x2="158" y2="120" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="4,3" />
      <text x="104" y="164" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#ef4444">try LOW = dramatic!</text>
    </Paper>
  );
}

function DoodleDiagonal() {
  return (
    <Paper title="Diagonal Lines">
      {/* bold diagonal + parallels for energy */}
      <line x1="60" y1="168" x2="262" y2="52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="140" x2="220" y2="52" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeDasharray="7,5" />
      <line x1="110" y1="168" x2="262" y2="90" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeDasharray="7,5" />
      {/* motion arrow along the main diagonal */}
      <path d="M235,68 l14,-8 l-3,13" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="70" y="120" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#ef4444" transform="rotate(-30 70 120)">energy + movement!</text>
    </Paper>
  );
}

const WHEEL = ['#ef4444','#f97316','#f59e0b','#eab308','#84cc16','#22c55e','#14b8a6','#06b6d4','#3b82f6','#6366f1','#a855f7','#ec4899'];
function wheelDots(cx: number, cy: number, r: number, dot = 9) {
  return WHEEL.map((c, i) => {
    const a = (i * 30 - 90) * Math.PI / 180;
    return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={dot} fill={c} />;
  });
}
const wheelPos = (i: number, cx: number, cy: number, r: number) => {
  const a = (i * 30 - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

// ── Color ──────────────────────────────────────────────────────────────────
function DoodleColorTemp() {
  return (
    <Paper title="Color Temperature" frame={false}>
      <defs>
        <linearGradient id="kelvin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8a3d" /><stop offset="45%" stopColor="#ffe9c7" />
          <stop offset="55%" stopColor="#eef4ff" /><stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="72" r="12" fill="#fbbf24" />
      {[0,45,90,135,180,225,270,315].map((d,i)=>{const r=d*Math.PI/180;return <line key={i} x1={70+15*Math.cos(r)} y1={72+15*Math.sin(r)} x2={70+20*Math.cos(r)} y2={72+20*Math.sin(r)} stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />;})}
      <path d="M232,64 a10,10 0 1 0 12,12 a13,13 0 1 1 -12,-12 Z" fill="#93c5fd" />
      <rect x="45" y="98" width="230" height="30" rx="6" fill="url(#kelvin)" stroke="#1e293b" strokeWidth="1.5" />
      <text x="46" y="150" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#c2410c">warm · 2000K</text>
      <text x="196" y="150" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#1d4ed8">cool · 10000K</text>
      <text x="108" y="90" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">light has a color!</text>
    </Paper>
  );
}
function DoodleComplementary() {
  const [ax,ay] = wheelPos(1,160,104,54);
  const [bx,by] = wheelPos(7,160,104,54);
  return (
    <Paper title="Complementary" frame={false}>
      <circle cx="160" cy="104" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
      {wheelDots(160,104,54)}
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#1e293b" strokeWidth="2" strokeDasharray="5,4" />
      <circle cx={ax} cy={ay} r="13" fill="none" stroke="#1e293b" strokeWidth="2.2" />
      <circle cx={bx} cy={by} r="13" fill="none" stroke="#1e293b" strokeWidth="2.2" />
      <text x="96" y="182" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">opposites POP against each other</text>
    </Paper>
  );
}
function DoodleColorHarmony() {
  return (
    <Paper title="Color Harmony" frame={false}>
      <circle cx="160" cy="104" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
      {wheelDots(160,104,54)}
      {[3,4,5].map(i => { const [x,y]=wheelPos(i,160,104,54); return <circle key={i} cx={x} cy={y} r="13" fill="none" stroke="#1e293b" strokeWidth="2.2" />; })}
      <text x="92" y="182" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">neighbors blend in harmony</text>
    </Paper>
  );
}

// ── Lighting ───────────────────────────────────────────────────────────────
function DoodleGoldenHour() {
  return (
    <Paper title="Golden Hour" frameFill="#fff7ed">
      <rect x="53" y="44" width="216" height="88" fill="#fed7aa" />
      <rect x="53" y="132" width="216" height="44" fill="#f59e0b" opacity="0.35" />
      <circle cx="160" cy="130" r="20" fill="#fbbf24" />
      {[160,200,240,280,320,20,60,100].map((d,i)=>{const r=d*Math.PI/180;return <line key={i} x1={160+24*Math.cos(r)} y1={130+24*Math.sin(r)} x2={160+34*Math.cos(r)} y2={130+34*Math.sin(r)} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />;})}
      <line x1="53" y1="132" x2="269" y2="132" stroke="#b45309" strokeWidth="1.5" />
      {/* long shadow from a little tree */}
      <rect x="90" y="112" width="4" height="20" fill="#78350f" />
      <ellipse cx="92" cy="108" rx="10" ry="12" fill="#15803d" />
      <polygon points="92,132 78,132 60,140 92,140" fill="#78350f" opacity="0.3" />
      <text x="150" y="162" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#7c2d12">low sun = warm, soft light + long shadows</text>
    </Paper>
  );
}
function DoodleExposure() {
  const frames = [
    { x: 60, fill: '#1e293b', label: 'too dark', tick: false },
    { x: 133, fill: '#9ca3af', label: 'just right', tick: true },
    { x: 206, fill: '#f8fafc', label: 'too bright', tick: false },
  ];
  return (
    <Paper title="Exposure" frame={false}>
      {frames.map(f => (
        <g key={f.x}>
          <rect x={f.x} y="72" width="54" height="44" rx="4" fill={f.fill} stroke="#1e293b" strokeWidth={f.tick ? 2.6 : 1.6} />
          <circle cx={f.x + 27} cy="94" r="9" fill={f.fill === '#f8fafc' ? '#e2e8f0' : '#fbbf24'} opacity={f.fill === '#1e293b' ? 0.35 : 1} />
          <text x={f.x + 27} y="132" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill={f.tick ? '#16a34a' : '#64748b'}>{f.label}</text>
          {f.tick && <text x={f.x + 27} y="66" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="13" fill="#16a34a">✓</text>}
        </g>
      ))}
      <text x="86" y="158" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">balance the light — not too much, not too little</text>
    </Paper>
  );
}

// ── Technique ──────────────────────────────────────────────────────────────
function DoodleDepthOfField() {
  return (
    <Paper title="Depth of Field">
      {/* blurry background blobs */}
      <circle cx="120" cy="80" r="16" fill="#a7f3d0" opacity="0.6" />
      <circle cx="200" cy="90" r="20" fill="#bae6fd" opacity="0.6" />
      <circle cx="235" cy="72" r="12" fill="#fde68a" opacity="0.6" />
      {/* sharp subject in front */}
      <circle cx="150" cy="120" r="20" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="150" cy="120" r="20" fill="none" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="4,3" />
      <text x="150" y="156" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#ef4444">sharp subject</text>
      <text x="196" y="120" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">blurry bg</text>
      <text x="70" y="168" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">wide aperture = creamy background</text>
    </Paper>
  );
}
function DoodleCapturingMotion() {
  return (
    <Paper title="Capturing Motion">
      {/* fast = frozen runner */}
      <circle cx="110" cy="80" r="7" fill="#1e293b" />
      <line x1="110" y1="87" x2="110" y2="104" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="110" y1="92" x2="100" y2="100" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="110" y1="92" x2="121" y2="98" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="110" y1="104" x2="103" y2="118" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="110" y1="104" x2="118" y2="118" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="84" y="138" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#16a34a">1/1000 · frozen</text>
      {/* slow = blurred trail */}
      {[188,198,208,218].map((x,i)=>(<g key={x} opacity={0.25+i*0.22}><circle cx={x} cy="90" r="7" fill="#3b82f6" /><line x1={x} y1="97" x2={x} y2="114" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" /></g>))}
      <text x="176" y="138" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#3b82f6">1/30 · motion blur</text>
      <text x="86" y="164" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">shutter speed freezes or flows motion</text>
    </Paper>
  );
}

// ── iPhone ─────────────────────────────────────────────────────────────────
function Phone({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x="120" y="50" width="80" height="120" rx="12" fill="#0f172a" />
      <rect x="126" y="60" width="68" height="100" rx="4" fill="#e2e8f0" />
      {children}
    </g>
  );
}
function DoodleTapFocus() {
  return (
    <Paper title="Tap to Focus" frame={false}>
      <Phone>
        <circle cx="160" cy="98" r="15" fill="#fbbf24" />
        <rect x="146" y="84" width="28" height="28" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <line x1="160" y1="80" x2="160" y2="84" stroke="#f59e0b" strokeWidth="2" /><line x1="160" y1="112" x2="160" y2="116" stroke="#f59e0b" strokeWidth="2" />
      </Phone>
      {/* tapping finger */}
      <path d="M168,132 q4,-14 10,-8 q6,-4 6,4 l-1,12 q-2,8 -10,8 q-7,0 -9,-8 Z" fill="#fcd34d" stroke="#1e293b" strokeWidth="1.5" />
      <text x="60" y="150" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">tap to set focus + lock it</text>
    </Paper>
  );
}
function DoodlePortraitMode() {
  return (
    <Paper title="Portrait Mode" frame={false}>
      <Phone>
        <circle cx="146" cy="86" r="7" fill="#bae6fd" opacity="0.7" /><circle cx="176" cy="140" r="9" fill="#fde68a" opacity="0.7" /><circle cx="182" cy="82" r="6" fill="#a7f3d0" opacity="0.7" />
        <circle cx="160" cy="104" r="16" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
      </Phone>
      <text x="56" y="150" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">subject sharp · background softly blurred</text>
    </Paper>
  );
}
function DoodleProRaw() {
  return (
    <Paper title="ProRAW" frame={false}>
      <Phone>
        <rect x="126" y="60" width="68" height="52" fill="#7dd3fc" /><rect x="126" y="112" width="68" height="48" fill="#166534" />
        <circle cx="176" cy="78" r="8" fill="#fde047" />
      </Phone>
      {/* edit sliders */}
      {[80,100,120].map((y,i)=>(<g key={y}><line x1="216" y1={y} x2="292" y2={y} stroke="#94a3b8" strokeWidth="2" /><circle cx={228+i*24} cy={y} r="5" fill="#ef4444" /></g>))}
      <text x="212" y="146" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#334155">RAW = huge</text>
      <text x="212" y="158" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9" fill="#334155">editing power</text>
    </Paper>
  );
}
function DoodleNightMode() {
  return (
    <Paper title="Night Mode" frameFill="#0f172a">
      <path d="M232,58 a12,12 0 1 0 8,20 a15,15 0 1 1 -8,-20 Z" fill="#e2e8f0" />
      {[[80,66],[120,54],[200,70],[100,90],[250,100]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="1.6" fill="#e2e8f0" />))}
      {/* brightened subject */}
      <ellipse cx="120" cy="150" rx="46" ry="24" fill="#fbbf24" opacity="0.35" />
      <rect x="110" y="128" width="6" height="24" fill="#fcd34d" /><ellipse cx="113" cy="124" rx="12" ry="14" fill="#fcd34d" />
      <text x="150" y="150" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#fde68a">hold still — it gathers light</text>
    </Paper>
  );
}
function DoodleCinematic() {
  return (
    <Paper title="Cinematic Mode" frame={false}>
      {/* clapperboard */}
      <rect x="60" y="120" width="52" height="34" rx="2" fill="#1e293b" />
      <polygon points="60,120 112,120 112,110 60,110" fill="#0f172a" />
      {[64,76,88,100].map((x,i)=>(<polygon key={x} points={`${x},110 ${x+6},110 ${x+3},120 ${x-3},120`} fill="#e2e8f0" />))}
      {/* two subjects, focus racks between them */}
      <circle cx="180" cy="88" r="15" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="235" cy="120" r="15" fill="#cbd5e1" />
      <path d="M196,92 Q216,100 222,114" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#cinArr)" />
      <defs><marker id="cinArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" /></marker></defs>
      <text x="150" y="172" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">focus shifts automatically between subjects</text>
    </Paper>
  );
}

// ── Pro Camera ─────────────────────────────────────────────────────────────
function DoodleExposureTriangle() {
  return (
    <Paper title="Exposure Triangle" frame={false}>
      <polygon points="160,56 250,156 70,156" fill="#fff7ed" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="160" cy="56" r="15" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
      <circle cx="250" cy="156" r="15" fill="#93c5fd" stroke="#1e293b" strokeWidth="2" />
      <circle cx="70" cy="156" r="15" fill="#86efac" stroke="#1e293b" strokeWidth="2" />
      <text x="160" y="46" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#b45309">Aperture</text>
      <text x="254" y="176" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#1d4ed8">Shutter</text>
      <text x="66" y="176" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#15803d">ISO</text>
      <text x="160" y="126" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">3 settings,</text>
      <text x="160" y="139" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">one exposure</text>
    </Paper>
  );
}
function DoodleProAutofocus() {
  return (
    <Paper title="Autofocus (Eye AF)">
      {/* face */}
      <circle cx="160" cy="108" r="46" fill="#fde68a" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="144" cy="100" rx="7" ry="5" fill="#fff" stroke="#1e293b" strokeWidth="1.2" /><circle cx="144" cy="100" r="2.5" fill="#1e293b" />
      <ellipse cx="176" cy="100" rx="7" ry="5" fill="#fff" stroke="#1e293b" strokeWidth="1.2" /><circle cx="176" cy="100" r="2.5" fill="#1e293b" />
      <path d="M150,124 Q160,132 170,124" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      {/* AF box locked on eye */}
      <rect x="134" y="90" width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2.4" />
      <text x="150" y="166" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#16a34a">the camera locks onto the eye ✓</text>
    </Paper>
  );
}
function DoodleSlog() {
  return (
    <Paper title="S-Log Profile" frame={false}>
      <rect x="56" y="78" width="84" height="60" rx="4" fill="#9ca3af" stroke="#1e293b" strokeWidth="1.6" />
      <text x="98" y="112" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#4b5563">flat + gray</text>
      <path d="M150,108 l24,0 m-8,-7 l8,7 l-8,7" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <defs><linearGradient id="graded" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient></defs>
      <rect x="182" y="78" width="84" height="60" rx="4" fill="url(#graded)" stroke="#1e293b" strokeWidth="1.6" />
      <text x="224" y="112" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#fff">rich grade</text>
      <text x="70" y="164" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">record flat now, color it beautifully later</text>
    </Paper>
  );
}
function DoodleFrameRates() {
  return (
    <Paper title="Frame Rates" frame={false}>
      <rect x="48" y="80" width="224" height="52" fill="#1e293b" />
      {[48,88,128,168,208,248].map(x=>(<rect key={x} x={x} y="80" width="24" height="52" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />))}
      {[0,1,2,3,4,5].map(i=>(<g key={i}><rect x={48+i*40} y="72" width="6" height="6" fill="#94a3b8" /><rect x={48+i*40} y="132" width="6" height="6" fill="#94a3b8" /><rect x={66+i*40} y="72" width="6" height="6" fill="#94a3b8" /><rect x={66+i*40} y="132" width="6" height="6" fill="#94a3b8" /></g>))}
      <text x="90" y="158" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">24fps = cinematic · 120fps = slow-mo</text>
    </Paper>
  );
}
function DoodleBackButton() {
  return (
    <Paper title="Back Button Focus" frame={false}>
      {/* camera back */}
      <rect x="72" y="60" width="176" height="112" rx="8" fill="#0f172a" />
      <rect x="86" y="74" width="96" height="72" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      {/* AF-ON button highlighted */}
      <circle cx="222" cy="86" r="11" fill="#22c55e" stroke="#fff" strokeWidth="1.5" />
      <text x="222" y="106" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="8" fill="#22c55e">AF-ON</text>
      <circle cx="222" cy="126" r="7" fill="#475569" />
      <text x="150" y="190" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">thumb focuses · shutter only shoots</text>
    </Paper>
  );
}

// ── Gear ───────────────────────────────────────────────────────────────────
function DoodleTripod() {
  return (
    <Paper title="Tripods" frame={false}>
      <rect x="138" y="66" width="44" height="26" rx="3" fill="#1e293b" />
      <circle cx="176" cy="79" r="9" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      <line x1="160" y1="92" x2="160" y2="110" stroke="#334155" strokeWidth="4" />
      <line x1="160" y1="110" x2="112" y2="168" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="160" y1="110" x2="160" y2="170" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <line x1="160" y1="110" x2="208" y2="168" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <text x="150" y="188" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">rock steady = tack sharp</text>
    </Paper>
  );
}
function DoodleNdFilters() {
  return (
    <Paper title="ND Filters" frame={false}>
      <circle cx="150" cy="104" r="42" fill="#334155" />
      <circle cx="150" cy="104" r="42" fill="none" stroke="#1e293b" strokeWidth="3" />
      <circle cx="150" cy="104" r="30" fill="#0f172a" opacity="0.55" />
      {/* dimmed sun behind */}
      <circle cx="230" cy="70" r="14" fill="#fbbf24" opacity="0.5" />
      <text x="196" y="104" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">dims the</text>
      <text x="196" y="116" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">light</text>
      <text x="60" y="170" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">sunglasses for your lens</text>
    </Paper>
  );
}
function DoodleSlider() {
  return (
    <Paper title="Sliders" frame={false}>
      <rect x="50" y="128" width="220" height="12" rx="4" fill="#334155" />
      {[60,110,160,210,260].map(x=>(<circle key={x} cx={x} cy="134" r="2.5" fill="#94a3b8" />))}
      <rect x="132" y="96" width="56" height="30" rx="3" fill="#1e293b" />
      <circle cx="196" cy="111" r="10" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      <rect x="140" y="126" width="40" height="8" rx="2" fill="#475569" />
      <path d="M96,112 l-16,0 m6,-6 l-6,6 l6,6" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M224,112 l16,0 m-6,-6 l6,6 l-6,6" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="86" y="166" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="10" fill="#334155">smooth gliding camera moves</text>
    </Paper>
  );
}
function DoodleGearLighting() {
  return (
    <Paper title="3-Point Lighting" frame={false}>
      <circle cx="160" cy="108" r="20" fill="#fde68a" stroke="#1e293b" strokeWidth="2" />
      {/* key */}
      <rect x="66" y="60" width="26" height="26" rx="3" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="92" y1="82" x2="142" y2="102" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,3" />
      <text x="58" y="98" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="8.5" fill="#b45309">key</text>
      {/* fill */}
      <rect x="228" y="60" width="26" height="26" rx="3" fill="#bae6fd" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="228" y1="82" x2="178" y2="102" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,3" />
      <text x="228" y="98" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="8.5" fill="#0369a1">fill</text>
      {/* back */}
      <rect x="147" y="150" width="26" height="20" rx="3" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="160" y1="150" x2="160" y2="130" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,3" />
      <text x="176" y="166" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="8.5" fill="#475569">back</text>
    </Paper>
  );
}
function DoodleMicrophones() {
  return (
    <Paper title="Microphones" frame={false}>
      {/* shotgun mic */}
      <rect x="70" y="96" width="70" height="18" rx="9" fill="#1e293b" />
      {[76,84,92,100,108].map(x=>(<line key={x} x1={x} y1="99" x2={x} y2="111" stroke="#475569" strokeWidth="1.5" />))}
      <rect x="140" y="101" width="20" height="8" rx="2" fill="#334155" />
      {/* sound waves */}
      {[16,26,36].map((r,i)=>(<path key={r} d={`M172,${104-r} a${r},${r} 0 0 1 0,${2*r}`} fill="none" stroke="#22c55e" strokeWidth="2" opacity={1-i*0.28} />))}
      {/* lav mic */}
      <circle cx="96" cy="150" r="7" fill="#0f172a" />
      <path d="M96,157 q-20,6 -30,20" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="150" y="180" textAnchor="middle" fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="9.5" fill="#334155">great audio matters as much as video</text>
    </Paper>
  );
}

const ILLUSTRATIONS: Record<string, { Doodle: () => JSX.Element; Photo?: () => JSX.Element }> = {
  'rule-of-thirds': { Doodle: DoodleRuleOfThirds, Photo: PhotoRuleOfThirds },
  'leading-lines':  { Doodle: DoodleLeadingLines,  Photo: PhotoLeadingLines  },
  'natural-framing':{ Doodle: DoodleNaturalFraming, Photo: PhotoNaturalFraming },
  'negative-space': { Doodle: DoodleNegativeSpace,  Photo: PhotoNegativeSpace  },
  'symmetry':            { Doodle: DoodleSymmetry },
  'fill-the-frame':      { Doodle: DoodleFillFrame },
  'golden-ratio':        { Doodle: DoodleGoldenRatio },
  'rule-of-odds':        { Doodle: DoodleRuleOfOdds },
  'depth-and-layers':    { Doodle: DoodleDepthLayers },
  'viewpoint':           { Doodle: DoodleViewpoint },
  'diagonal-composition':{ Doodle: DoodleDiagonal },
  'color-temperature':   { Doodle: DoodleColorTemp },
  'complementary-colors':{ Doodle: DoodleComplementary },
  'color-harmony':       { Doodle: DoodleColorHarmony },
  'golden-hour':         { Doodle: DoodleGoldenHour },
  'exposure-basics':     { Doodle: DoodleExposure },
  'depth-of-field':      { Doodle: DoodleDepthOfField },
  'capturing-motion':    { Doodle: DoodleCapturingMotion },
  'iphone-tap-focus':    { Doodle: DoodleTapFocus },
  'iphone-portrait-mode':{ Doodle: DoodlePortraitMode },
  'iphone-proraw':       { Doodle: DoodleProRaw },
  'iphone-night-mode':   { Doodle: DoodleNightMode },
  'iphone-cinematic':    { Doodle: DoodleCinematic },
  'exposure-triangle':   { Doodle: DoodleExposureTriangle },
  'pro-autofocus':       { Doodle: DoodleProAutofocus },
  'pro-slog':            { Doodle: DoodleSlog },
  'pro-frame-rates':     { Doodle: DoodleFrameRates },
  'pro-back-button-focus':{ Doodle: DoodleBackButton },
  'gear-tripod':         { Doodle: DoodleTripod },
  'gear-nd-filters':     { Doodle: DoodleNdFilters },
  'gear-slider':         { Doodle: DoodleSlider },
  'gear-lighting':       { Doodle: DoodleGearLighting },
  'gear-microphones':    { Doodle: DoodleMicrophones },
};

export default function LessonIllustration({ id }: { id: string }) {
  const pair = ILLUSTRATIONS[id];
  if (!pair) return null;
  const { Doodle } = pair;

  // A real example photo renders beside this (via LessonStep.image), so the
  // illustration serves purely as the concept diagram — no fake SVG "photo".
  // Renders as a square card that fills its container to match the photo cell.
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}>
      <div className="px-3 pt-2 pb-1">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Diagram</p>
      </div>
      <div className="aspect-square">
        <Doodle />
      </div>
    </div>
  );
}
