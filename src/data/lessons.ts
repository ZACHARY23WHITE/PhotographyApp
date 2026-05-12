export type LessonCategory = 'composition' | 'color' | 'lighting' | 'technique';
export type StepType = 'info' | 'quiz';

export interface LessonStep {
  type: StepType;
  content: string;
  tip?: string;
  options?: string[];
  correct?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  estimatedMinutes: number;
  steps: LessonStep[];
}

export const LESSONS: Lesson[] = [
  // ── Composition ──────────────────────────────────────────────────────────
  {
    id: 'rule-of-thirds',
    title: 'Rule of Thirds',
    description: 'Learn the most fundamental composition rule in photography.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'The Rule of Thirds divides your frame into a 3×3 grid using two horizontal and two vertical lines. This creates four intersection points — called "power points."',
        tip: 'Most cameras and phones have a grid overlay in the viewfinder. Turn it on!',
      },
      {
        type: 'info',
        content: 'Placing your subject on one of the four power points (rather than the center) creates a more dynamic and engaging image. The viewer\'s eye naturally flows to these spots.',
      },
      {
        type: 'quiz',
        content: 'A photographer is taking a portrait outdoors. Where should they ideally place the subject\'s eyes?',
        options: [
          'Dead center of the frame',
          'Along the top horizontal third line',
          'In the bottom-left corner',
          'At the very top of the frame',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'For landscapes, place the horizon along the top or bottom third — not the middle. If the sky is dramatic, give it the top two-thirds. If the ground is the star, flip it.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a beautiful sunset. The sky has stunning colors. Where should you place the horizon line?',
        options: [
          'In the middle of the frame',
          'Along the bottom third',
          'Cropped out entirely',
          'It doesn\'t matter',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'leading-lines',
    title: 'Leading Lines',
    description: 'Use lines to guide your viewer\'s eye through the photo.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Leading lines are natural or man-made lines in a scene that draw the viewer\'s eye toward your subject. Roads, rivers, fences, bridges, and staircases are all classic examples.',
      },
      {
        type: 'info',
        content: 'The strongest leading lines converge toward your subject or the vanishing point. Diagonal lines feel more dynamic than horizontal or vertical ones.',
        tip: 'Get low to the ground to exaggerate the effect of leading lines.',
      },
      {
        type: 'quiz',
        content: 'Which of these is the best example of a leading line?',
        options: [
          'A flat gray sky with no detail',
          'A long road stretching toward a mountain in the distance',
          'A portrait subject\'s smile',
          'A blurred background',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Lines don\'t have to be straight! Curved lines (like a winding river or a spiral staircase) create a sense of elegance and draw the eye in a slower, more relaxed way.',
      },
      {
        type: 'quiz',
        content: 'You\'re at a beach. What could you use as a leading line to draw the viewer toward a lighthouse in the distance?',
        options: [
          'The lighthouse itself',
          'The shoreline curving toward the lighthouse',
          'A cloud above the lighthouse',
          'The color of the sand',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'framing',
    title: 'Natural Framing',
    description: 'Use elements in the scene to frame your subject.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'Natural framing means using elements in the environment — like archways, trees, windows, or doorways — to create a "frame within a frame" around your subject.',
      },
      {
        type: 'info',
        content: 'This technique adds depth to a photo, draws the viewer\'s attention directly to the subject, and gives context about the location.',
        tip: 'The framing element doesn\'t need to be in sharp focus — a soft, blurry frame often looks better.',
      },
      {
        type: 'quiz',
        content: 'Which approach best demonstrates natural framing?',
        options: [
          'Shooting a person against a plain white wall',
          'Photographing a person through an archway so the arch surrounds them',
          'Using a wide-angle lens with no foreground',
          'Placing the subject in the center with nothing around them',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Common framing elements: tunnels, cave openings, overhanging branches, doorways, windows, rock formations, and even the hands of other people in the scene.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a city street. How could you use natural framing?',
        options: [
          'Stand in the middle of the road and shoot wide',
          'Shoot through a doorway, with the entrance framing the street scene',
          'Use a telephoto lens from far away',
          'Shoot straight up at the sky',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'negative-space',
    title: 'Negative Space',
    description: 'Use empty space to make your subject pop.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Negative space is the empty area around your subject. When used intentionally, it creates a sense of isolation, scale, or calm — and makes the subject stand out dramatically.',
      },
      {
        type: 'quiz',
        content: 'A bird is flying against a clear blue sky and takes up only 5% of the frame. The rest is empty sky. This is an example of:',
        options: [
          'Poor composition with too much empty space',
          'Intentional use of negative space to emphasize the bird',
          'A framing mistake',
          'Leading lines',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Negative space works best when the background is simple and uncluttered — a clear sky, calm water, a plain wall, or a foggy background.',
        tip: 'Don\'t be afraid of "empty" space. White (or blue, or gray) space is a powerful compositional tool.',
      },
      {
        type: 'quiz',
        content: 'Which background would create the strongest negative space for a portrait?',
        options: [
          'A busy city street with lots of signs',
          'A bright, overcast sky with no clouds',
          'A forest with many overlapping branches',
          'A crowded marketplace',
        ],
        correct: 1,
      },
    ],
  },

  // ── Color ────────────────────────────────────────────────────────────────
  {
    id: 'color-temperature',
    title: 'Color Temperature',
    description: 'Understand warm vs. cool light and how it changes your photos.',
    category: 'color',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Color temperature describes whether light looks warm (orange/yellow) or cool (blue). It\'s measured in Kelvin (K). Lower Kelvin = warmer. Higher Kelvin = cooler.',
        tip: 'Candlelight is ~1800K (very warm). Overcast sky is ~7000K (cool blue).',
      },
      {
        type: 'quiz',
        content: 'A photo taken at sunset has an orange-golden glow. What is the color temperature of this light?',
        options: [
          'High Kelvin — cool blue light',
          'Low Kelvin — warm orange/golden light',
          'Neutral — no color temperature',
          'Green — forest light',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'White Balance is your camera\'s way of compensating for color temperature. Setting it correctly ensures whites look white — not orange or blue.',
      },
      {
        type: 'info',
        content: 'Intentional color temperature choices can set a mood: warm tones feel cozy, nostalgic, or romantic. Cool tones feel clinical, calm, or melancholic.',
      },
      {
        type: 'quiz',
        content: 'You want to make a portrait feel warm and intimate. Which lighting condition would naturally help achieve this?',
        options: [
          'Bright midday sun (high Kelvin)',
          'Fluorescent office lighting',
          'Candlelight or golden hour sun (low Kelvin)',
          'Moonlight (very blue)',
        ],
        correct: 2,
      },
    ],
  },
  {
    id: 'complementary-colors',
    title: 'Complementary Colors',
    description: 'Create visual impact using colors opposite each other on the color wheel.',
    category: 'color',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Complementary colors sit directly opposite each other on the color wheel. Common pairs: Red & Green, Blue & Orange, Yellow & Purple. Placing them together creates high contrast and visual energy.',
      },
      {
        type: 'quiz',
        content: 'Why is a portrait of a person wearing an orange jacket against a blue sky so visually striking?',
        options: [
          'Orange and blue are complementary colors that create strong contrast',
          'Orange is a warm color that makes skin look good',
          'Blue sky always makes photos look better',
          'The contrast in brightness between sky and jacket',
        ],
        correct: 0,
      },
      {
        type: 'info',
        content: 'The most popular Hollywood "teal and orange" look exploits complementary colors — warm orange skin tones against teal/blue-green shadows. You\'ve definitely seen it.',
        tip: 'Look for complementary color combinations already present in your scene before adding any editing.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing red autumn leaves. What colored background would create the most complementary contrast?',
        options: [
          'A brown wooden fence',
          'A clear green mossy ground or green foliage',
          'A gray concrete wall',
          'White snow',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'color-harmony',
    title: 'Color Harmony',
    description: 'Build palettes that feel intentional and cohesive.',
    category: 'color',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 7,
    steps: [
      {
        type: 'info',
        content: 'Color harmony means choosing colors in your photo that work well together. The main types: Analogous (colors next to each other — calming), Complementary (opposite — bold), Triadic (three evenly spaced — vibrant).',
      },
      {
        type: 'quiz',
        content: 'A photo uses only yellows, oranges, and reds. What type of color harmony is this?',
        options: [
          'Complementary',
          'Triadic',
          'Analogous',
          'Split complementary',
        ],
        correct: 2,
      },
      {
        type: 'info',
        content: 'Monochromatic harmony uses one color in different shades, tints, and tones. It creates a sophisticated, cohesive look — popular in fine art and fashion photography.',
        tip: 'Street photographers often look for scenes where all the colors naturally align into a single palette.',
      },
      {
        type: 'quiz',
        content: 'Which of these photo descriptions sounds most like a monochromatic color scheme?',
        options: [
          'A portrait with red lips, green hat, and yellow scarf',
          'A foggy street scene where everything is in shades of gray and blue',
          'A colorful market with every color of the rainbow',
          'A sunset with orange and purple sky',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'In post-processing, you can enhance harmony by shifting colors toward a chosen palette. This is why film emulations (like Kodak Portra) are so popular — they impose a color harmony on your image automatically.',
      },
    ],
  },

  // ── Lighting ─────────────────────────────────────────────────────────────
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    description: 'Shoot in the best light of the day, every time.',
    category: 'lighting',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Golden Hour refers to the period shortly after sunrise and just before sunset. The sun is low, casting soft, warm, directional light that is flattering for almost any subject.',
      },
      {
        type: 'info',
        content: 'Why is it so good? The light travels through more atmosphere at a low angle, scattering the harsh blue wavelengths and leaving warm reds, oranges, and yellows. Shadows are long and soft.',
        tip: 'Use apps like PhotoPills or the Photographer\'s Ephemeris to plan exactly when golden hour hits your location.',
      },
      {
        type: 'quiz',
        content: 'Why does midday sun often produce less flattering portraits than golden hour light?',
        options: [
          'Midday sun is too warm and orange',
          'Midday sun comes from directly above, creating harsh shadows under the eyes and nose',
          'There is too little light at midday',
          'Midday sun is too blue',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Blue Hour comes right after golden hour (after sunset / before sunrise). The sky turns a deep, even blue with no direct sun. Perfect for cityscapes and architecture.',
      },
      {
        type: 'quiz',
        content: 'A photographer wants a warm, soft, cinematic look for outdoor portraits. When should they schedule the shoot?',
        options: [
          'High noon on a clear day',
          'Overcast midday',
          'About 30–60 minutes after sunrise or before sunset',
          'Just after midnight with artificial lights',
        ],
        correct: 2,
      },
    ],
  },
  {
    id: 'exposure-basics',
    title: 'Understanding Exposure',
    description: 'Master the relationship between ISO, aperture, and shutter speed.',
    category: 'lighting',
    difficulty: 'beginner',
    xpReward: 150,
    estimatedMinutes: 8,
    steps: [
      {
        type: 'info',
        content: 'Exposure is how much light hits your camera sensor. It\'s controlled by three settings called the Exposure Triangle: ISO, Aperture, and Shutter Speed.',
      },
      {
        type: 'info',
        content: 'ISO: Your sensor\'s sensitivity to light. Low ISO (100) = less sensitive, cleaner image. High ISO (3200+) = more sensitive, brighter but grainy/noisy.',
        tip: 'Always use the lowest ISO that still gets you a proper exposure.',
      },
      {
        type: 'quiz',
        content: 'You\'re shooting indoors in low light and your photos are coming out dark and grainy. What should you do first?',
        options: [
          'Lower your ISO to reduce noise',
          'Raise your ISO so the sensor captures more light',
          'Use a faster shutter speed',
          'Switch to a smaller aperture',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Aperture: The opening in your lens that lets light in. Measured in f-stops (f/1.8, f/8, f/16). Smaller f-number = wider opening = more light + blurry background. Larger f-number = narrower = less light + sharp background.',
      },
      {
        type: 'quiz',
        content: 'You want a beautifully blurred background (bokeh) for a portrait. Which aperture setting should you choose?',
        options: [
          'f/16',
          'f/11',
          'f/8',
          'f/1.8',
        ],
        correct: 3,
      },
      {
        type: 'info',
        content: 'Shutter Speed: How long the shutter stays open. Fast (1/1000s) freezes motion. Slow (1/30s or longer) creates motion blur. Slower than 1/60s usually requires a tripod.',
      },
    ],
  },

  // ── Technique ────────────────────────────────────────────────────────────
  {
    id: 'depth-of-field',
    title: 'Depth of Field',
    description: 'Control what\'s in focus and what\'s beautifully blurred.',
    category: 'technique',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'Depth of Field (DoF) refers to the range of distance in a photo that appears acceptably sharp. A shallow DoF isolates your subject (blurry background). A deep DoF keeps everything sharp.',
      },
      {
        type: 'info',
        content: 'Three things control DoF: Aperture (biggest factor), distance to subject, and focal length. Wider aperture + closer subject + longer lens = shallower DoF.',
        tip: 'Portrait photographers often shoot at f/1.4–f/2.8 to get that creamy background blur.',
      },
      {
        type: 'quiz',
        content: 'Which combination will give you the most dramatic background blur for a portrait?',
        options: [
          'f/16, far from subject, wide-angle lens',
          'f/1.8, close to subject, 85mm lens',
          'f/8, medium distance, 50mm lens',
          'f/11, far from subject, 50mm lens',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'For landscape photography you often want deep DoF — everything from the foreground to the horizon in focus. Shoot at f/8–f/16, and focus about 1/3 into the scene.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a mountain scene and want both the flowers in the foreground and the mountain peak to be sharp. What do you do?',
        options: [
          'Shoot at f/1.8 focused on the flowers',
          'Shoot at f/11, focus 1/3 into the scene, use a tripod',
          'Shoot at f/1.8 focused on the mountain',
          'Use a 200mm telephoto lens wide open',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'capturing-motion',
    title: 'Capturing Motion',
    description: 'Freeze action or show movement with shutter speed.',
    category: 'technique',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'Shutter speed is your tool for motion. A fast shutter (1/500s or faster) freezes a moving subject sharply. A slow shutter (1/30s or slower) creates a motion blur effect.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a soccer player mid-kick and want them to be razor sharp. What shutter speed should you use?',
        options: [
          '1 second',
          '1/30s',
          '1/1000s',
          '1/60s',
        ],
        correct: 2,
      },
      {
        type: 'info',
        content: 'Long exposure is a technique where you leave the shutter open for seconds or minutes. Waterfalls turn silky smooth, car headlights become light trails, and stars turn into streaks.',
        tip: 'For long exposures, always use a tripod and a remote shutter release (or the camera\'s timer) to prevent camera shake.',
      },
      {
        type: 'info',
        content: 'Panning is a technique where you move the camera along with a moving subject during a slow exposure. The subject stays relatively sharp while the background blurs dynamically.',
      },
      {
        type: 'quiz',
        content: 'You want to photograph a waterfall so the water looks silky and smooth. What do you need?',
        options: [
          'A fast shutter speed (1/2000s) and no tripod',
          'A slow shutter speed (1–5 seconds), a tripod, and lower ISO',
          'A wide aperture and fast shutter',
          'ISO 6400 to capture the movement',
        ],
        correct: 1,
      },
    ],
  },
];

export const CATEGORIES: { id: LessonCategory; label: string; emoji: string; description: string }[] = [
  { id: 'composition', label: 'Composition', emoji: '📐', description: 'Frame your shots like a pro' },
  { id: 'color', label: 'Color', emoji: '🎨', description: 'Use color intentionally' },
  { id: 'lighting', label: 'Lighting', emoji: '☀️', description: 'Master light in any situation' },
  { id: 'technique', label: 'Technique', emoji: '📷', description: 'Camera settings & skills' },
];

export function getLessonsByCategory(category: LessonCategory): Lesson[] {
  return LESSONS.filter(l => l.category === category);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(l => l.id === id);
}
