export type LessonCategory = 'composition' | 'color' | 'lighting' | 'technique';
export type StepType = 'info' | 'quiz' | 'when-to-use';

export interface LessonStep {
  type: StepType;
  content: string;
  tip?: string;
  options?: string[];
  correct?: number;
  illustration?: string;
  scenarios?: string[];
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
    description: 'The single most powerful composition rule — and the fastest way to make every shot stronger.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'The Rule of Thirds divides your frame into a 3×3 grid with two horizontal and two vertical lines. This creates four intersection points called "power points." This one rule will immediately make your photos more dynamic — you\'re going to love what it does to your shots!',
        tip: 'Most cameras and phones have a grid overlay in the viewfinder. Turn it on — it\'s a total game changer.',
        illustration: 'rule-of-thirds',
      },
      {
        type: 'info',
        content: 'Placing your subject on one of the four power points (rather than dead center) creates a more dynamic and engaging image. The viewer\'s eye naturally flows to these spots. Dead center can feel static — off-center feels alive.',
      },
      {
        type: 'quiz',
        content: 'A photographer is taking a portrait outdoors. Where should they ideally place the subject\'s eyes to nail the rule of thirds?',
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
        content: 'For landscapes, place the horizon along the top or bottom third — never the middle. If the sky is on fire with color, give it the top two-thirds. If the ground tells the story (a wildflower field, a mirror lake), flip it. You\'re already thinking like a landscape photographer!',
      },
      {
        type: 'when-to-use',
        content: 'Once rule of thirds becomes instinct, you\'ll see the grid everywhere — and your shots will never be the same.',
        scenarios: [
          'Landscapes — put the horizon on the top or bottom third, never the middle',
          'Portraits — align your subject\'s eyes with the top third line',
          'Wildlife — place the animal off-center with space in front to "move into"',
          'Street photography — off-center subjects create energy and tension',
          'Any asymmetrical scene where one side carries more visual weight',
        ],
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a stunning sunset with a sky full of color. Where should the horizon line sit?',
        options: [
          'In the middle of the frame',
          'Along the bottom third — giving the dramatic sky most of the frame',
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
    description: 'Guide your viewer\'s eye exactly where you want it — every single time.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Leading lines are natural or man-made lines that draw the viewer\'s eye toward your subject. Roads, rivers, fences, bridges, train tracks, staircases — these are all classic examples. Once you start seeing them, you\'ll spot leading lines everywhere you go!',
        illustration: 'leading-lines',
      },
      {
        type: 'info',
        content: 'The strongest leading lines converge toward your subject or a vanishing point. Diagonal lines feel more dynamic and energetic than horizontal or vertical ones — they give flat images a sense of depth and movement.',
        tip: 'Get low to the ground to dramatically exaggerate the effect of leading lines. This is a pro trick that works every time.',
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
        content: 'Lines don\'t have to be straight! Curved lines — a winding river, a spiral staircase, a path through a forest — create elegance and draw the eye in a slower, more relaxed way. Think of them as an invitation to explore the whole scene.',
      },
      {
        type: 'when-to-use',
        content: 'Leading lines work in almost any scene — the trick is learning to see them before you even raise the camera.',
        scenarios: [
          'Roads, paths, or railways stretching toward a distant subject or vanishing point',
          'Rivers, streams, or shorelines curving through a landscape',
          'Architecture — hallways, staircases, bridges, rows of columns',
          'Fences, walls, or tree lines converging into the distance',
          'Any time a scene feels "flat" and needs depth and direction',
        ],
      },
      {
        type: 'quiz',
        content: 'You\'re at a beach photographing a lighthouse far in the distance. What could you use as a leading line?',
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
    description: 'Use the environment to frame your subject and create incredible depth.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'Natural framing means using elements in the environment — archways, trees, windows, doorways — to create a "frame within a frame" around your subject. It\'s one of those techniques that makes people ask "how did you see that?" — and you\'re about to learn exactly how.',
        illustration: 'natural-framing',
      },
      {
        type: 'info',
        content: 'This technique adds depth to a photo, draws the viewer\'s attention directly to the subject, and gives context about the location. It tells a richer story than a plain background ever could.',
        tip: 'The framing element doesn\'t need to be in sharp focus — a soft, blurry frame in the foreground often looks even better than a sharp one.',
      },
      {
        type: 'quiz',
        content: 'Which approach best demonstrates natural framing?',
        options: [
          'Shooting a person against a plain white wall',
          'Photographing a person through an archway so the arch surrounds them',
          'Using a wide-angle lens with no foreground elements',
          'Placing the subject dead center with nothing around them',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Framing elements are everywhere: tunnels, cave openings, overhanging branches, doorways, windows, rock formations, even the hands or arms of other people in the scene. Start noticing these wherever you go — they\'re all around you!',
      },
      {
        type: 'when-to-use',
        content: 'Natural framing is your secret weapon for turning ordinary locations into extraordinary shots.',
        scenarios: [
          'Travel photography — doorways, archways, and gates frame the scene behind them perfectly',
          'Forest and nature — overhanging branches or a gap in the trees framing a vista',
          'Street photography — shoot through a window, an alley gap, or a crowd',
          'Portraits — use an arch or doorway to add environmental context and depth',
          'Architecture — frame one building through the geometry of another',
        ],
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a city street scene. How could you use natural framing?',
        options: [
          'Stand in the middle of the road and shoot wide',
          'Shoot through a doorway so the entrance frames the street scene beyond',
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
    description: 'Discover why sometimes the best thing you can add to a photo is... nothing.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Negative space is the empty area around your subject. When used intentionally, it creates a sense of isolation, scale, calm, or freedom — and makes the subject stand out dramatically. Here\'s the secret: empty space isn\'t wasted space. It\'s one of the most powerful tools in your kit.',
        illustration: 'negative-space',
      },
      {
        type: 'quiz',
        content: 'A bird is flying against a clear blue sky and takes up only 5% of the frame. The rest is empty sky. This is an example of:',
        options: [
          'Poor composition with too much wasted space',
          'Intentional use of negative space to emphasize the bird',
          'A framing mistake that should be cropped',
          'Leading lines',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Negative space works best when the background is simple and uncluttered — a clear sky, calm water, a plain wall, or a foggy scene. The simpler the "empty" area, the more powerful your subject becomes. You\'re going to look at blank space completely differently after this!',
        tip: 'Don\'t be afraid of "empty" space. Fighting the urge to fill the frame is one of the hardest — and most rewarding — skills in photography.',
      },
      {
        type: 'when-to-use',
        content: 'Negative space is a bold creative statement. Use it when you want your subject to feel undeniable.',
        scenarios: [
          'Wildlife and birds flying against a clear sky or still water',
          'Portraits conveying loneliness, freedom, or quiet contemplation',
          'Minimalist and fine art photography where simplicity is the message',
          'Product photography — isolate the product on a clean, uncluttered background',
          'Foggy or misty landscapes where the atmosphere naturally creates empty space',
          'Architecture — a single striking building against a dramatic open sky',
        ],
      },
      {
        type: 'quiz',
        content: 'Which background would create the strongest negative space for a portrait?',
        options: [
          'A busy city street with lots of signs and people',
          'A bright, clear sky with minimal detail',
          'A forest with many overlapping branches and leaves',
          'A crowded marketplace full of color',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'symmetry',
    title: 'Symmetry & Reflections',
    description: 'Create perfectly balanced, impossibly satisfying images that stop the scroll.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Symmetry in photography means both halves of your frame mirror each other. It creates balance, harmony, and calm that\'s immediately satisfying to look at. Here\'s the exciting part: once you start looking for symmetry, you\'ll find it everywhere — buildings, hallways, tunnels, and nature are full of it.',
      },
      {
        type: 'info',
        content: 'Reflections are the ultimate symmetry tool. Still water doubles your scene — a mountain becomes twice as majestic, a sky twice as dramatic. Even a small puddle on pavement after rain can create a stunning mirror image. Keep an eye out after every shower!',
        tip: 'For water reflections, get your camera as low as possible — even a few centimeters above the surface — to maximize how much reflection fills the frame.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a perfectly still lake with mountains mirrored in it. To maximize the symmetry, where should the waterline sit?',
        options: [
          'Along the top third',
          'Dead center — giving equal space to mountains and reflection',
          'Along the bottom third',
          'Off to one side',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Unlike most composition rules where dead center is "wrong," symmetry is one of the beautiful exceptions! When you have true symmetry, centering it amplifies the mirror effect. You\'re breaking the rule of thirds the right way — and it looks incredible.',
      },
      {
        type: 'when-to-use',
        content: 'Symmetry shots have an almost meditative satisfaction to them. Here\'s when to look for them:',
        scenarios: [
          'Still lakes, ponds, or calm rivers reflecting sky or mountains',
          'Symmetrical architecture — bridges, tunnels, hallways, grand staircases',
          'Glass buildings reflecting the sky or surrounding street',
          'Wet pavement after rain — even a small puddle becomes a mirror',
          'Long corridors or avenues with trees lining both sides',
          'Formal portraits centered in a symmetrical setting',
        ],
      },
      {
        type: 'quiz',
        content: 'Which scene would best lend itself to a symmetry composition?',
        options: [
          'A curved modern building photographed from a 45-degree angle',
          'A long straight tunnel photographed head-on from the center',
          'A random street corner with no repeated elements',
          'A wide landscape with an off-center subject and no reflection',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'fill-the-frame',
    title: 'Fill the Frame',
    description: 'The one move that instantly brings portraits, details, and textures to life.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 4,
    steps: [
      {
        type: 'info',
        content: 'Most beginners shoot too far away from their subject. Filling the frame means getting close — really close — so your subject takes up most or all of the image. The result? More powerful, intimate, undeniable photos. You\'ll be amazed how much better your shots get just by taking a few steps forward.',
      },
      {
        type: 'info',
        content: 'There are two ways to fill the frame: physically move closer (changes perspective, looks more dramatic), or zoom in (compresses the scene). Both work — but moving closer usually gives you a more interesting result because it changes the way the subject relates to its background.',
        tip: 'For portraits, try moving so close that parts of the face are cropped out of frame. It feels risky but looks incredibly powerful and intimate.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a vibrant flower with a distracting busy background. What\'s the best approach?',
        options: [
          'Use a wider lens to get more of the scene in',
          'Step back further to show more context',
          'Get close enough that the flower fills the frame, naturally blurring the background',
          'Add more light to the scene',
        ],
        correct: 2,
      },
      {
        type: 'info',
        content: 'Filling the frame eliminates distracting backgrounds, forces the viewer to focus on exactly what you want, and reveals details invisible from a distance — texture, emotion, pattern. Imagine the detail shots you\'re going to get with this technique!',
      },
      {
        type: 'when-to-use',
        content: 'Fill the frame whenever the details of your subject are more interesting than its surroundings.',
        scenarios: [
          'Portraits — move in close to emphasize expression and emotion',
          'Textures and patterns — bark, fabric, cobblestones, leaves',
          'Travel and street markets — colorful details and goods up close',
          'Food photography — get right up to the dish to show texture and color',
          'Flowers and nature macro — tiny details become entire worlds',
        ],
      },
      {
        type: 'quiz',
        content: 'When would you NOT want to fill the frame with your subject?',
        options: [
          'A portrait emphasizing emotion and expression',
          'When you want to show how small your subject is compared to its vast environment',
          'A texture or pattern detail shot',
          'A close-up food photograph',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'golden-ratio',
    title: 'The Golden Ratio',
    description: 'The secret composition tool of Renaissance masters — now in your hands.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'The Golden Ratio (also called the Fibonacci Spiral or Phi) is a proportion found throughout nature — seashells, flowers, galaxies, even the human face. Artists and architects have used it for thousands of years to create work that feels naturally beautiful. And now you can use it in your photography. How cool is that?',
      },
      {
        type: 'info',
        content: 'In photography, you apply it by imagining a spiral in your frame (like a nautilus shell). Place your main subject at the tight center of the spiral — where it converges. The spiral itself then guides the viewer\'s eye through the scene in a natural, flowing path.',
        tip: 'Many cameras and editing apps let you overlay a golden ratio spiral on your frame. Look for it in your camera\'s gridline settings!',
      },
      {
        type: 'quiz',
        content: 'The golden ratio places the main focal point of an image...',
        options: [
          'Dead center of the frame',
          'At the outer corners of the frame',
          'Near (but not exactly at) the center, where the spiral converges',
          'Along the very edge of the frame',
        ],
        correct: 2,
      },
      {
        type: 'info',
        content: 'How does it compare to the rule of thirds? The focal point is similar but slightly closer to center. The real difference is the spiral path — it creates a more curved, organic flow through the image versus the rigid thirds grid. Think of rule of thirds as the quick guide and the golden ratio as the refined version. You\'re leveling up!',
      },
      {
        type: 'when-to-use',
        content: 'The golden ratio shines when a scene already has natural curves or flow — it mirrors the way the spiral exists in nature itself.',
        scenarios: [
          'Portraits — the human face naturally fits golden ratio proportions',
          'Winding roads, rivers, or staircases that curve through the frame',
          'Nature scenes with spiraling flowers, shells, or organic shapes',
          'Fine art photography where you want an "old master" feel',
          'Architectural interiors with strong perspective and curving depth',
        ],
      },
      {
        type: 'quiz',
        content: 'A beautiful spiral staircase curves up through a building. Following the golden ratio, where should the top of the staircase ideally sit in your frame?',
        options: [
          'At the very top center of the frame',
          'Where the spiral tightens — off-center toward the inside of the curve',
          'Along the bottom edge of the frame',
          'Dead center of the frame',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'rule-of-odds',
    title: 'Rule of Odds',
    description: 'A simple number trick that makes your compositions feel effortlessly balanced.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Here\'s a fun one: groups of odd numbers (3, 5, 7) are more visually pleasing than even numbers. Why? With an even number of subjects, your eye bounces between them unsure which is "the" subject. With an odd number, there\'s a natural center that anchors the composition. You\'ll never look at a group of things the same way again!',
      },
      {
        type: 'info',
        content: 'With three subjects, the middle one becomes the anchor and the outer two create balance — your eye settles naturally. Even just knowing this puts you ahead of most photographers. The next time you\'re arranging a scene, count your elements and adjust if needed.',
        tip: 'If you have 4 similar objects in a shot, try moving one slightly apart to create a 3+1 grouping. It works like magic.',
      },
      {
        type: 'quiz',
        content: 'You\'re arranging flowers for a photo. Which grouping best follows the rule of odds?',
        options: [
          'Two roses side by side',
          'Four identical sunflowers in a row',
          'Three daisies in a loose cluster',
          'Six tulips arranged in two equal rows',
        ],
        correct: 2,
      },
      {
        type: 'info',
        content: 'The rule of odds doesn\'t just apply to people — it works for rocks, candles, cups of coffee, whatever you\'re shooting. In portraiture, 3 or 5 people almost always looks better than 2 or 4. Imagine the group shots you\'re going to nail knowing this!',
      },
      {
        type: 'when-to-use',
        content: 'The rule of odds is subtle — people can\'t always explain why a composition feels right, but this is often the reason.',
        scenarios: [
          'Group portraits — 3 or 5 people feel balanced; 2 or 4 compete',
          'Food and still life — 3 items on a plate, 5 objects on a table',
          'Flowers and nature — odd-numbered clusters of blooms or leaves',
          'Architecture with repeated elements — windows, arches, columns',
          'Any arranged scene where you control what enters the frame',
        ],
      },
      {
        type: 'quiz',
        content: 'A food photographer has 4 strawberries to arrange. To apply the rule of odds, they should:',
        options: [
          'Use all 4 in a perfectly symmetrical arrangement',
          'Use 3 or 5 strawberries instead',
          'Arrange them in 2 pairs side by side',
          'Spread all 4 evenly to fill the plate',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'depth-and-layers',
    title: 'Depth & Layers',
    description: 'Make your photos feel like you could step right into them.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'Photos are 2D — but great photographers make them feel 3D. The secret is layering: placing interesting elements in the foreground, midground, and background. Think of your frame not as a flat wall, but as a stage with depth you\'re inviting the viewer to walk through.',
      },
      {
        type: 'info',
        content: 'Foreground interest is one of the most powerful tools in landscape photography. Adding something interesting close to your camera — wildflowers, rocks, fallen leaves — creates a sense that the viewer is physically inside the scene. It\'s the difference between watching a place and feeling like you\'re there.',
        tip: 'Get low! Shooting near ground level dramatically exaggerates the foreground and creates incredible depth. This one move transforms landscape shots.',
      },
      {
        type: 'quiz',
        content: 'A landscape photo of a mountain feels flat and something is missing. What could you add to dramatically improve the sense of depth?',
        options: [
          'A brighter, more colorful sky',
          'Wildflowers or rocks in the very front of the frame',
          'More zoom focused on the mountain peak',
          'A wider aperture to blur everything',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'The layers don\'t even need to be in sharp focus. A blurry, colorful foreground can frame a sharp subject beautifully — adding depth without competing for attention. You\'re already building a sophisticated eye for this — keep going!',
      },
      {
        type: 'when-to-use',
        content: 'Layering is your antidote to flat, lifeless photos. Whenever a scene feels two-dimensional, ask: what can I add in front?',
        scenarios: [
          'Landscapes — add rocks, flowers, or grass anchoring the immediate foreground',
          'Street photography — shoot through or past people toward your subject',
          'Environmental portraits — include the surrounding context at different depths',
          'Architecture — use nearby elements to overlap and frame the main structure',
          'Any scene that feels flat — find something to anchor the foreground',
        ],
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a city skyline and it feels lifeless and flat. What\'s the best compositional fix?',
        options: [
          'Zoom in tighter on the tallest building',
          'Find a railing, lamppost, or person in the foreground to shoot past',
          'Shoot from standard eye level',
          'Use a wider aperture to blur the buildings',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'viewpoint',
    title: 'Viewpoint & Perspective',
    description: 'The fastest, cheapest upgrade you can make to your photography — right now.',
    category: 'composition',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedMinutes: 5,
    steps: [
      {
        type: 'info',
        content: 'Most people shoot from standing eye level — and honestly, it\'s the most boring angle available. Changing your viewpoint is the fastest, cheapest, most effective upgrade you can make to your photography. Get low. Get high. Step to the side. You will be amazed at what you find — and your photos are about to prove it.',
      },
      {
        type: 'info',
        content: 'Low angle: shooting from near ground level makes your subject look larger, more powerful, more dramatic. A person shot from below looks commanding. A landscape from ground level feels vast and immersive. Get those knees dirty — it is absolutely worth it!',
        tip: 'Even dropping to knee height instead of full standing makes a dramatic difference. Try it on your next shot before you post it.',
      },
      {
        type: 'quiz',
        content: 'You want to photograph a child running toward you in a way that feels joyful and full of energy. What viewpoint works best?',
        options: [
          'Shoot from above, looking down at them',
          'Shoot from your normal standing height',
          'Get down to their eye level or lower',
          'Back away and zoom in from a distance',
        ],
        correct: 2,
      },
      {
        type: 'info',
        content: 'High angle (bird\'s eye): shooting from directly above creates a totally different world. Perspective flattens, patterns emerge, and ordinary scenes look extraordinary. Overhead flat lays for food, drone landscape shots, looking down at city streets — these are all bird\'s eye magic.',
      },
      {
        type: 'when-to-use',
        content: 'Every time you raise your camera, ask: is this really the most interesting angle available? Let that question guide where you stand.',
        scenarios: [
          'Low angle for portraits — makes your subject look powerful and confident',
          'Ground level for pets and children — creates intimacy by entering their world',
          'Low angle for landscapes — exaggerates foreground and conveys scale',
          'Bird\'s eye for flat lays — food, maps, products, journals on a desk',
          'Eye level for environmental portraits and candid street photography',
          'High angle whenever pattern or shape from above tells a better story',
        ],
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a flat lay of a coffee cup, notebook, and flowers on a table. What\'s the ideal camera position?',
        options: [
          'Crouching at table level, shooting from the side',
          'Directly above (bird\'s eye), shooting straight down',
          'Standing eye level looking across the table',
          'From a 45-degree angle at the corner',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'diagonal-composition',
    title: 'Diagonal Lines & Energy',
    description: 'Add movement, drama, and electricity to your photos.',
    category: 'composition',
    difficulty: 'intermediate',
    xpReward: 150,
    estimatedMinutes: 6,
    steps: [
      {
        type: 'info',
        content: 'Horizontal lines feel calm. Vertical lines feel stable. But diagonal lines? They feel dynamic, energetic, full of movement. Diagonal composition is one of the most powerful tools for creating tension and excitement — it makes even still photos feel like they\'re in motion.',
      },
      {
        type: 'info',
        content: 'Triangular composition arranges your key elements into a triangle shape within the frame. This creates visual stability while guiding the eye around the image in a satisfying loop. Fashion photographers and portrait painters have used this for centuries — and now you will too!',
        tip: 'Try tilting your camera slightly — this is called a "Dutch angle." Even a 5-degree tilt can transform a static scene into something with real energy.',
      },
      {
        type: 'quiz',
        content: 'You\'re photographing a skateboarder mid-air. Which approach makes the shot feel most dynamic and alive?',
        options: [
          'Horizontal lines and a perfectly level horizon',
          'Strong diagonals — the skater\'s body, the ramp, the angle of the shot',
          'Perfect symmetry and centered framing',
          'Equal spacing of all elements in the frame',
        ],
        correct: 1,
      },
      {
        type: 'info',
        content: 'Look for natural diagonals all around you: staircases shooting up and to the right, streets receding at an angle, a person leaning forward, sunbeams cutting through fog, a mountain ridge cutting across your sky. The world is full of diagonals — you just need to see them now. And you will!',
      },
      {
        type: 'when-to-use',
        content: 'Reach for diagonals whenever you want to inject energy into a shot that might otherwise feel static or posed.',
        scenarios: [
          'Sports and action — use the diagonal of the athlete\'s body and movement',
          'Fashion photography — the model\'s posture and angle create natural diagonals',
          'Architecture shot from the corner — lines shoot dramatically into the distance',
          'Roads and paths cutting diagonally across the frame',
          'Dynamic street scenes — a diagonal line of rushing commuters or traffic',
          'Portraits where you want tension or drama rather than calm',
        ],
      },
      {
        type: 'quiz',
        content: 'In a portrait, the subject\'s shoulders are perfectly horizontal and the photo feels stiff. The simplest way to add diagonal energy is:',
        options: [
          'Ask them to tilt their head and turn one shoulder toward the camera',
          'Keep everything perfectly level and horizontal',
          'Back further away from the subject',
          'Switch to a wider lens',
        ],
        correct: 0,
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
