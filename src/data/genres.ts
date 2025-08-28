import { bluesMp3, bluesOgg, bluesWav, rockMp3, rockOgg, rockWav } from './genreAudio';

export interface Genre {
  name: string;
  audio: string;
  sources: { src: string; type: string }[];
}

export const genres: Genre[] = [
  {
    name: 'Blues',
    audio: bluesMp3,
    sources: [
      { src: bluesMp3, type: 'audio/mpeg' },
      { src: bluesOgg, type: 'audio/ogg' },
      { src: bluesWav, type: 'audio/wav' },
    ],
  },
  {
    name: 'Rock',
    audio: rockMp3,
    sources: [
      { src: rockMp3, type: 'audio/mpeg' },
      { src: rockOgg, type: 'audio/ogg' },
      { src: rockWav, type: 'audio/wav' },
    ],
  },
];
