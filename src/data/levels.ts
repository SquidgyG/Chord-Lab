// Why it exists: Central definition of the gamified learning ladder (L1–L6)
// How to use: Import `levels` to render the roadmap; use `LevelId` for progress state.

export type Evidence = { id: string; description: string };
export type DrillRef = { id: string; route: string; params?: Record<string, string | number> };

export type Level = {
  id: string;       // e.g., "L1"
  title: string;    // e.g., "Beginner (Emerging)"
  focus: string;    // high-level focus for the level
  learningIntentions: string[];
  coreKnowledge: string[];
  skills: string[];
  evidence: Evidence[];    // completion checks for levelling up
  bonuses?: string[];      // optional side goals / challenges
  drills?: DrillRef[];     // internal links to in-app lessons/challenges
  songs?: string[];        // song IDs from songs.ts
  unlocks?: string[];      // features/routes unlocked
};

export type LevelId = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';

export const levels: Level[] = [
  {
    id: 'L1',
    title: 'Beginner (Emerging)',
    focus: 'First steps, posture, counting, and first clean chord/note sounds',
    learningIntentions: [
      'Understand steady 4-beat counting with a metronome',
      'Name white keys and find Middle C (piano) / finger numbers (both)',
    ],
    coreKnowledge: [
      'Finger numbers (1–5) and hand position basics',
      'Middle C and white-key names (piano)',
    ],
    skills: [
      'Maintain a steady 4-beat count at slow tempo',
      'Produce clean sound on first chord/note without buzzing',
    ],
    evidence: [
      { id: 'L1-e1', description: '4 bars at ♩=60 with steady counting' },
      { id: 'L1-e2', description: 'One clean playable chord or note' },
    ],
    bonuses: [
      '1.5: Boom‑chick and rest drills (counting aloud)',
    ],
    drills: [
      { id: 'metronome-60', route: '/metronome', params: { bpm: 60 } },
    ],
    unlocks: ['practice-basics'],
  },
  {
    id: 'L2',
    title: 'Explorer',
    focus: 'First chords (C/F) and time feel at moderate tempo',
    learningIntentions: [
      'Switch between two chords with minimal gaps',
    ],
    coreKnowledge: [
      'Finger placement for C and F',
    ],
    skills: [
      'Play 8 bars at ♩=70 on C and F',
    ],
    evidence: [
      { id: 'L2-e1', description: '8 bars at ♩=70 with C↔F' },
    ],
    bonuses: ['2.5: Groove builder variations'],
    drills: [
      { id: 'practice-CF', route: '/practice', params: { key: 'C' } },
    ],
    unlocks: ['builder-templates'],
  },
  {
    id: 'L3',
    title: 'Player',
    focus: 'I–V–vi–IV loop and naming roots while playing',
    learningIntentions: ['Maintain loop, name roots aloud'],
    coreKnowledge: ['I–V–vi–IV in C: C–G–Am–F'],
    skills: ['Loop 16 bars at ♩=80–90'],
    evidence: [
      { id: 'L3-e1', description: '16 bars C–G–Am–F at ♩=80–90' },
    ],
    bonuses: ['Arpeggio/strum variations'],
    drills: [
      { id: 'challenge-60s-CGAmF', route: '/practice', params: { key: 'C' } },
    ],
    unlocks: ['challenge-mode-basic'],
  },
  {
    id: 'L4',
    title: 'Performer',
    focus: 'Transposition to G and relative minor understanding',
    learningIntentions: ['Transpose I–V–vi–IV to G: G–D–Em–C'],
    coreKnowledge: ['Em is vi in G'],
    skills: ['Sustain tempo ♩=90–100'],
    evidence: [
      { id: 'L4-e1', description: 'Explain Em as vi; perform G–D–Em–C' },
    ],
    drills: [
      { id: 'wheel-transpose', route: '/wheel' },
    ],
    unlocks: ['wheel-tutorial'],
  },
  {
    id: 'L5',
    title: 'Technician',
    focus: 'Inversions (piano) and barre/alt shapes (guitar) in two keys',
    learningIntentions: ['Plan two voicing routes'],
    coreKnowledge: ['Inversions up/down; shape economy'],
    skills: ['Demonstrate two inversion/shape plans'],
    evidence: [
      { id: 'L5-e1', description: 'Two inversion/shape routes across a progression' },
    ],
    bonuses: ['Syncopation / fingerpicking variants'],
    unlocks: ['advanced-voicings'],
  },
  {
    id: 'L6',
    title: 'Creator',
    focus: 'Compose/choose a progression, maintain tempo, present analysis',
    learningIntentions: ['Own-choice progression and performance'],
    coreKnowledge: ['Functional analysis and voicing choices'],
    skills: ['Sustain ♩=100–112; present rationale'],
    evidence: [
      { id: 'L6-e1', description: 'Perform twice and explain analysis/voicings' },
    ],
    unlocks: ['free-play', 'songs'],
  },
];

export default levels;
