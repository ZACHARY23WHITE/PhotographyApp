export interface LessonCongrats {
  headline: string;
  body: string;
  quote?: string;
  quoteAuthor?: string;
}

export const LESSON_CONGRATS: Record<string, LessonCongrats> = {
  // ── Composition ────────────────────────────────────────────────────────
  'rule-of-thirds': {
    headline: 'Hey — you got better today!',
    body: 'You just learned the one rule every photographer uses every single time they raise a camera. Turn that grid on and never look back. Imagine how your shots are about to change.',
    quote: 'The more I practice, the luckier I get.',
    quoteAuthor: 'Gary Player',
  },
  'leading-lines': {
    headline: 'Look at you go!',
    body: 'Roads, rivers, fences, staircases — they\'re all leading lines now. You see the world like a photographer. Every walk outside is a photoshoot waiting to happen.',
    quote: 'Photography is the story I fail to put into words.',
    quoteAuthor: 'Destin Sparks',
  },
  'framing': {
    headline: 'You are doing so good!',
    body: 'Natural framing is the technique people notice in a photo without knowing WHY it looks so professional. That\'s you now — creating that magic. Go find yourself an archway.',
    quote: 'To me, photography is an art of observation.',
    quoteAuthor: 'Elliott Erwitt',
  },
  'negative-space': {
    headline: 'Less is more — and you nailed it!',
    body: 'Empty space isn\'t wasted space — it\'s a superpower. Most people fight it. You now know how to wield it. Simpler is stronger. Your minimalist shots are going to be stunning.',
    quote: 'Simplicity is the ultimate sophistication.',
    quoteAuthor: 'Leonardo da Vinci',
  },
  'symmetry': {
    headline: 'You\'re absolutely crushing it!',
    body: 'Puddles. Bridges. Corridors. Still lakes. They\'re all waiting for you now with a totally new purpose. Next time it rains — grab your phone. You\'ve got this.',
    quote: 'We don\'t make mistakes, just happy little accidents.',
    quoteAuthor: 'Bob Ross',
  },
  'fill-the-frame': {
    headline: 'Get closer. Then even closer!',
    body: 'Most beginners stay way too far away. You just learned the move that separates timid snapshots from bold, powerful photographs. Go fill that frame!',
    quote: 'Which of my photographs is my favorite? The one I\'m going to take tomorrow.',
    quoteAuthor: 'Imogen Cunningham',
  },
  'golden-ratio': {
    headline: 'Renaissance-level thinking right here!',
    body: 'You just learned what Michelangelo, Leonardo, and the greatest artists in history obsessed over for centuries. That spiral is now in your creative toolkit. Use it!',
    quote: 'Geometry has two great treasures — one is the Pythagorean theorem, the other is the golden ratio.',
    quoteAuthor: 'Johannes Kepler',
  },
  'rule-of-odds': {
    headline: 'Three is the magic number — and you know it now!',
    body: 'You\'ll never walk past a group of objects the same way again. 3. 5. 7. Arrange them, count them, nail them. Small tweak, massive difference. You\'ve got such a good eye.',
    quote: 'Small daily improvements over time lead to stunning results.',
    quoteAuthor: 'Robin Sharma',
  },
  'depth-and-layers': {
    headline: 'You\'re building a real photographer\'s eye!',
    body: 'Foreground, midground, background. Your photos just got three dimensions. Go find something interesting to anchor in the front of your next landscape — you know exactly what to do.',
    quote: 'It always seems impossible until it\'s done.',
    quoteAuthor: 'Nelson Mandela',
  },
  'viewpoint': {
    headline: 'Get low. Get high. Get great shots!',
    body: 'The world looks completely different from 30cm off the ground — and now you know it. Every scene has a better angle than the one you see standing up. Go find it!',
    quote: 'You don\'t have to be great to start, but you have to start to be great.',
    quoteAuthor: 'Zig Ziglar',
  },
  'diagonal-composition': {
    headline: 'Electric work today — seriously!',
    body: 'Diagonals are pure energy. Tilt that frame, find those lines, and watch static scenes come alive. Your action shots and fashion portraits are going to crackle with life.',
    quote: 'Every artist was first an amateur.',
    quoteAuthor: 'Ralph Waldo Emerson',
  },

  // ── Color ───────────────────────────────────────────────────────────────
  'color-temperature': {
    headline: 'You speak the language of light now!',
    body: 'Kelvin. Warm. Cool. Golden. You now understand WHY golden hour looks so magical — and why fluorescent lighting makes everyone look terrible. That knowledge is yours forever.',
    quote: 'Light makes photography. Embrace light. Admire it. Love it. But above all, know light.',
    quoteAuthor: 'George Eastman',
  },
  'complementary-colors': {
    headline: 'Color contrast — unlocked!',
    body: 'Orange and blue. Red and green. You now know exactly why certain photos make your eyes pop — and you can create that effect intentionally. That\'s not luck, that\'s skill.',
    quote: 'Color is a power which directly influences the soul.',
    quoteAuthor: 'Wassily Kandinsky',
  },
  'color-harmony': {
    headline: 'You\'re thinking like a cinematographer!',
    body: 'Color harmony is what makes a photo feel like it was meant to look that way. You\'re building real visual intelligence. Imagine the edits you\'re going to make now!',
    quote: 'Every child is an artist. The problem is how to remain an artist once we grow up.',
    quoteAuthor: 'Pablo Picasso',
  },

  // ── Lighting ────────────────────────────────────────────────────────────
  'golden-hour': {
    headline: 'Set. Your. Alarms. Right now!',
    body: 'You just unlocked the most magical 60 minutes of every single day. Sunrise and sunset will never be the same. The golden light is out there waiting for you every morning.',
    quote: 'I love the light for it shows me the way, yet I endure the darkness for it shows me the stars.',
    quoteAuthor: 'Og Mandino',
  },
  'exposure-basics': {
    headline: 'The Exposure Triangle is officially yours!',
    body: 'ISO. Aperture. Shutter Speed. You cracked the holy trinity of photography. Manual mode doesn\'t seem so scary anymore, does it? You earned this one.',
    quote: 'Every expert was once a beginner.',
    quoteAuthor: 'Helen Hayes',
  },

  // ── Technique ───────────────────────────────────────────────────────────
  'depth-of-field': {
    headline: 'Bokeh unlocked — your portraits will never be the same!',
    body: 'That creamy, dreamy background blur is no longer a mystery. f/1.8, get close, find a face — and watch pure magic happen. The portraits you\'re going to take are going to blow people away.',
    quote: 'Your first 10,000 photographs are your worst.',
    quoteAuthor: 'Henri Cartier-Bresson',
  },
  'capturing-motion': {
    headline: 'Time itself is in your hands now!',
    body: 'Freeze it. Blur it. Silk it. You can tell completely different stories with the same scene just by turning one dial. Waterfalls, sports, light trails — all yours. Go shoot something moving!',
    quote: 'Photograph: a picture painted by the sun without instruction in art.',
    quoteAuthor: 'Ambrose Bierce',
  },
};

export function getCongratsForLesson(lessonId: string): LessonCongrats {
  return (
    LESSON_CONGRATS[lessonId] ?? {
      headline: 'Hey — you got better today!',
      body: 'Every lesson you finish is a step toward the photographer you\'re becoming. Keep going — you\'re doing incredibly well!',
      quote: 'The secret of getting ahead is getting started.',
      quoteAuthor: 'Mark Twain',
    }
  );
}
