export interface Song {
  title: string;
  artist: string;
  key: string;
  progression: string[];
  bpm: number;
}

export const songs: Song[] = [
  {
    title: 'Let It Be',
    artist: 'The Beatles',
    key: 'C',
    progression: ['C', 'G', 'Am', 'F'],
    bpm: 72,
  },
  {
    title: 'Hallelujah',
    artist: 'Leonard Cohen',
    key: 'C',
    progression: ['C', 'Am', 'C', 'Am', 'F', 'C', 'G', 'G'],
    bpm: 56,
  },
  {
    title: 'No Woman No Cry',
    artist: 'Bob Marley',
    key: 'C',
    progression: ['C', 'G', 'Am', 'F'],
    bpm: 79,
  },
];

export default songs;
