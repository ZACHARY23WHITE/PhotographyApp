import Image from 'next/image';

// ── Photo Phil pose system ──────────────────────────────────────────────────
// Zach drew 10 expressive poses — this maps friendly names to the files in
// /public so any screen can say <PhotoPhil pose="thinking" />.

export type PhilPose =
  | 'celebrate'   // default hero pose
  | 'cheer'       // hands raised in the air
  | 'reading'     // nose in a book — great while learning
  | 'thinking'    // hand on chin — great for quizzes
  | 'excited'     // rubbing hands together
  | 'running'
  | 'shocked'     // big surprise — wrong answer
  | 'surprised'   // milder surprise
  | 'sleeping'    // empty / resting states
  | 'starstruck'  // stars above head — perfect score
  | 'cool';       // fonzie thumbs-up

const POSE_SRC: Record<PhilPose, string> = {
  celebrate:  '/photo-phil.png',
  cheer:      '/photo phil hands raised in the air.png',
  reading:    '/photo phil reading.png',
  thinking:   '/photo phil thinking.png',
  excited:    '/photo phil rubbing hands together.png',
  running:    '/photo phil running.png',
  shocked:    '/photo phil shocked big time.png',
  surprised:  '/photo phil surprised look on face.png',
  sleeping:   '/photo phil sleeping.png',
  starstruck: '/photo phil stars above head.png',
  cool:       '/photo phil fonzie.png',
};

const POSE_ALT: Record<PhilPose, string> = {
  celebrate:  'Photo Phil celebrating',
  cheer:      'Photo Phil cheering with hands in the air',
  reading:    'Photo Phil reading a book',
  thinking:   'Photo Phil thinking',
  excited:    'Photo Phil rubbing his hands together excitedly',
  running:    'Photo Phil running',
  shocked:    'Photo Phil looking shocked',
  surprised:  'Photo Phil looking surprised',
  sleeping:   'Photo Phil sleeping',
  starstruck: 'Photo Phil with stars above his head',
  cool:       'Photo Phil giving a cool thumbs up',
};

export default function PhotoPhil({
  size = 220,
  pose = 'celebrate',
  className,
  priority,
}: {
  size?: number;
  pose?: PhilPose;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      key={pose} /* remount on pose change so entrance animations re-fire */
      src={encodeURI(POSE_SRC[pose])}
      alt={POSE_ALT[pose]}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
      priority={priority ?? pose === 'celebrate'}
    />
  );
}
