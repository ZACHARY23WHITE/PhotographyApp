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
