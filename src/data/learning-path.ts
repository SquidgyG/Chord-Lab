export interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: 'knowledge' | 'skill' | 'evidence' | 'bonus';
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  learningIntentions: string[];
  lessons: Lesson[];
}

export const learningPath: Level[] = [
  {
    id: 1,
    title: 'Level 1 – Beginner',
    subtitle: 'Emerging',
    learningIntentions: [
      'Know parts of the instrument, finger numbers, and basic posture.',
      'Produce a clean sound.',
    ],
    lessons: [
      {
        id: '1-k1',
        title: 'Core Knowledge: Keyboard',
        description: 'Finger numbers 1–5 (thumb=1), white-key names A–G, middle C location.',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '1-k2',
        title: 'Core Knowledge: Guitar',
        description: 'String names E-A-D-G-B-E, left-hand finger 1–4, basic fretting & pick/strum.',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '1-s1',
        title: 'Skill: Posture and Technique',
        description: 'Set up posture, relaxed hands, even tone.',
        completed: false,
        type: 'skill',
      },
      {
        id: '1-s2',
        title: 'Skill: Basic Rhythm',
        description: 'Keep a 4-beat count and switch between simple shapes (no full chords yet).',
        completed: false,
        type: 'skill',
      },
      {
        id: '1-e1',
        title: 'Evidence to Level Up',
        description: 'Identify keys/strings & finger numbers on cue. Keep a steady 4-bar count at ♩=60 with clean single-note sound.',
        completed: false,
        type: 'evidence',
      },
      {
        id: '1-b1',
        title: 'Bonus 1.5 – First Patterns',
        description: 'Keyboard: Quarter-note “boom-chick”. Guitar: Beginner strum D D D D or “rest–D–D–D”.',
        completed: false,
        type: 'bonus',
      },
    ],
  },
  {
    id: 2,
    title: 'Level 2 – Explorer',
    subtitle: 'Developing',
    learningIntentions: [
      'Play your first chords (C and F).',
      'Change between chords smoothly and in time.',
    ],
    lessons: [
      {
        id: '2-k1',
        title: 'Core Knowledge: First Chords',
        description: 'Keyboard: C (C–E–G), F (F–A–C) in root position. Guitar: C and F (or mini-F).',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '2-s1',
        title: 'Skill: Chord Changes',
        description: 'Play 2-bar chord holds and 1-bar changes between C and F.',
        completed: false,
        type: 'skill',
      },
      {
        id: '2-e1',
        title: 'Evidence to Level Up',
        description: 'Switch C ⇄ F for 8 bars at ♩=70 with no extra noises and steady timing.',
        completed: false,
        type: 'evidence',
      },
      {
        id: '2-b1',
        title: 'Bonus 2.5 – Groove Builder',
        description: 'Keyboard: RH chord + LH single-note roots. Guitar: Strum D DU UD.',
        completed: false,
        type: 'bonus',
      },
    ],
  },
  {
    id: 3,
    title: 'Level 3 – Player',
    subtitle: 'Competent',
    learningIntentions: [
      'Play the C–G–Am–F progression cleanly and in time.',
      'Control dynamics to create musical interest.',
    ],
    lessons: [
      {
        id: '3-k1',
        title: 'Core Knowledge: The I–V–vi–IV Progression',
        description: 'Learn the C–G–Am–F progression, one of the most common in pop music.',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '3-s1',
        title: 'Skill: 4-Chord Loop',
        description: 'Play the 4-chord loop for 16 bars, keeping a steady tempo and clean transitions.',
        completed: false,
        type: 'skill',
      },
      {
        id: '3-s2',
        title: 'Skill: Dynamic Control',
        description: 'Practice playing the progression softer for a "verse" and louder for a "chorus".',
        completed: false,
        type: 'skill',
      },
      {
        id: '3-e1',
        title: 'Evidence to Level Up',
        description: 'Perform the loop at ♩=80–90 with consistent tone and count-in. Name each chord’s root while playing.',
        completed: false,
        type: 'evidence',
      },
      {
        id: '3-b1',
        title: 'Bonus 3.5 – Texture Patterns',
        description: 'Keyboard: RH broken-chord 1-5-3-5. Guitar: Down-up pattern D DU UDU.',
        completed: false,
        type: 'bonus',
      },
    ],
  },
  {
    id: 4,
    title: 'Level 4 – Performer',
    subtitle: 'Mastering',
    learningIntentions: [
      'Transpose the I–V–vi–IV progression to the key of G.',
      'Understand the relationship between chords and scales.',
    ],
    lessons: [
      {
        id: '4-k1',
        title: 'Core Knowledge: Transposition',
        description: 'Learn how to transpose the I–V–vi–IV progression from C major to G major (G–D–Em–C).',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '4-s1',
        title: 'Skill: Transposed Progression',
        description: 'Play the G–D–Em–C loop for 16 bars with clean changes.',
        completed: false,
        type: 'skill',
      },
      {
        id: '4-e1',
        title: 'Evidence to Level Up',
        description: 'Perform G–D–Em–C at ♩=90–100 for 16 bars. Explain why Em is vi in G.',
        completed: false,
        type: 'evidence',
      },
      {
        id: '4-b1',
        title: 'Bonus 4.5 – Feel & Flow',
        description: 'Keyboard: Use inversions for smoother voice-leading. Guitar: Add accents or mutes.',
        completed: false,
        type: 'bonus',
      },
    ],
  },
  {
    id: 5,
    title: 'Level 5 – Technician',
    subtitle: 'Advanced Technique',
    learningIntentions: [
      'Play progressions using inversions (piano) or barre chords (guitar).',
      'Use the metronome at higher tempos and make arranging choices.',
    ],
    lessons: [
      {
        id: '5-k1',
        title: 'Core Knowledge: Advanced Voicings',
        description: 'Keyboard: Learn 1st and 2nd inversions. Guitar: Learn E-shape and A-shape barre chords.',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '5-s1',
        title: 'Skill: Advanced Technique Practice',
        description: 'Play I–V–vi–IV in two keys using inversions or barre chords.',
        completed: false,
        type: 'skill',
      },
      {
        id: '5-e1',
        title: 'Evidence to Level Up',
        description: 'Demonstrate the progression in C and G with two different voicing/shape plans at ♩=96–110.',
        completed: false,
        type: 'evidence',
      },
      {
        id: '5-b1',
        title: 'Bonus 5.5 – Pattern Power-Ups',
        description: 'Keyboard: Syncopated comping or 1-3-5-8 patterns. Guitar: Fingerpicking or 16th-note grooves.',
        completed: false,
        type: 'bonus',
      },
    ],
  },
  {
    id: 6,
    title: 'Level 6 – Creator',
    subtitle: 'Advanced / HPGE',
    learningIntentions: [
      'Choose a progression and key, and figure out the chords.',
      'Arrange a short piece of music with intro, outro, and dynamics.',
    ],
    lessons: [
      {
        id: '6-k1',
        title: 'Creative Challenge',
        description: 'Pick a progression and a key, and build the chords on your instrument.',
        completed: false,
        type: 'knowledge',
      },
      {
        id: '6-s1',
        title: 'Skill: Arrangement',
        description: 'Add an intro/outro, dynamic arc, and texture switch to your chosen progression.',
        completed: false,
        type: 'skill',
      },
      {
        id: '6-e1',
        title: 'Evidence to Complete the Ladder',
        description: 'Explain your numeral analysis and show two voicing/shape approaches. Perform your arrangement twice.',
        completed: false,
        type: 'evidence',
      },
    ],
  },
];
