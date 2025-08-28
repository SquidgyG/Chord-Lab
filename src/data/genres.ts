import {
  ROCK_MP3,
  ROCK_OGG,
  ROCK_WAV,
  JAZZ_MP3,
  JAZZ_OGG,
  JAZZ_WAV,
  CLASSICAL_MP3,
  CLASSICAL_OGG,
  CLASSICAL_WAV,
} from './genreAudio';

export interface GenreClip {
  id: number;
  genre: string;
  sources: { src: string; type: string }[];
}

export const genreClips: GenreClip[] = [
  {
    id: 1,
    genre: 'Rock',
    sources: [
      { src: ROCK_MP3, type: 'audio/mpeg' },
      { src: ROCK_OGG, type: 'audio/ogg' },
      { src: ROCK_WAV, type: 'audio/wav' },
    ],
  },
  {
    id: 2,
    genre: 'Jazz',
    sources: [
      { src: JAZZ_MP3, type: 'audio/mpeg' },
      { src: JAZZ_OGG, type: 'audio/ogg' },
      { src: JAZZ_WAV, type: 'audio/wav' },
    ],
  },
  {
    id: 3,
    genre: 'Classical',
    sources: [
      { src: CLASSICAL_MP3, type: 'audio/mpeg' },
      { src: CLASSICAL_OGG, type: 'audio/ogg' },
      { src: CLASSICAL_WAV, type: 'audio/wav' },
    ],
  },
];

export default genreClips;
