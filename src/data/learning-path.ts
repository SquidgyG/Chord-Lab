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
];
