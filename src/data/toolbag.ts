export interface ToolbagItem {
  id: string;
  title: string;
  description: string;
  category: 'color' | 'composition' | 'lighting' | 'technique';
  href: string;
  unlockLessons: string[];
  unlockLabel?: string;
}

export const TOOLBAG_ITEMS: ToolbagItem[] = [
  {
    id: 'color-wheel',
    title: 'Color Wheel',
    description: 'Interactive color harmony reference with mood associations for every hue.',
    category: 'color',
    href: '/toolbag/color-wheel',
    unlockLessons: [],
  },
  {
    id: 'composition-guide',
    title: 'Composition Guide',
    description: 'Quick visual reference for 10 composition techniques — rule of thirds, leading lines, symmetry, and more.',
    category: 'composition',
    href: '/toolbag/composition-guide',
    unlockLessons: ['rule-of-thirds'],
    unlockLabel: 'Complete Rule of Thirds',
  },
  {
    id: 'aspect-ratio',
    title: 'Aspect Ratio Previewer',
    description: 'See your frame as 1:1, 4:5, 16:9 and more — with the right crop for Instagram, print, or cinematic wide.',
    category: 'composition',
    href: '/toolbag/aspect-ratio',
    unlockLessons: [],
  },
  {
    id: 'shutter-speed',
    title: 'Shutter Speed Guide',
    description: 'Drag through shutter speeds and watch motion freeze or blur. Know exactly what speed to dial in for any scene.',
    category: 'technique',
    href: '/toolbag/shutter-speed',
    unlockLessons: [],
  },
  {
    id: 'color-temperature',
    title: 'Color Temperature',
    description: 'Slide the Kelvin scale from candlelight to open shade and see the warmth shift. Fix orange or blue photos fast.',
    category: 'lighting',
    href: '/toolbag/color-temperature',
    unlockLessons: [],
  },
  {
    id: 'light-direction',
    title: 'Light Direction Studio',
    description: 'Drag the light around a face and watch the shadows fall — front, side, Rembrandt, backlight, and more.',
    category: 'lighting',
    href: '/toolbag/light-direction',
    unlockLessons: [],
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour Clock',
    description: "Today's sunrise, sunset, and the exact golden & blue hour windows for your spot — so you never miss the light.",
    category: 'lighting',
    href: '/toolbag/golden-hour',
    unlockLessons: [],
  },
];

export const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  color:       { color: '#E8534A', bg: '#FFF1F0' },
  composition: { color: '#FF6B00', bg: '#FFF4EE' },
  lighting:    { color: '#F5A623', bg: '#FFFCEF' },
  technique:   { color: '#1B9AE4', bg: '#EFF8FF' },
};

export function isToolUnlocked(item: ToolbagItem, completedLessons: string[]): boolean {
  if (item.unlockLessons.length === 0) return true;
  return item.unlockLessons.some(id => completedLessons.includes(id));
}
