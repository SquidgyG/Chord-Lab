export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const achievements: Record<string, Achievement> = {
  FIRST_CHORD: {
    id: 'FIRST_CHORD',
    name: 'First Chord!',
    description: 'Learn your first chord.',
    icon: '🎵',
  },
  CHORD_NOVICE: {
    id: 'CHORD_NOVICE',
    name: 'Chord Novice',
    description: 'Learn 5 different chords.',
    icon: '🎸',
  },
  CHORD_APPRENTICE: {
    id: 'CHORD_APPRENTICE',
    name: 'Chord Apprentice',
    description: 'Learn 10 different chords.',
    icon: '🎹',
  },
  FIRST_LESSON: {
    id: 'FIRST_LESSON',
    name: 'First Lesson Complete',
    description: 'Complete your first lesson.',
    icon: '🎓',
  },
  SONG_BEGINNER: {
    id: 'SONG_BEGINNER',
    name: 'Song Beginner',
    description: 'Play along with a song for the first time.',
    icon: '🎶',
  },
};
