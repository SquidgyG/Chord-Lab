export interface MusicTriviaQuestion {
  question: string;
  answers: string[];
  correctAnswer: number; // index in answers
}

const musicTriviaQuestions: MusicTriviaQuestion[] = [
  {
    question: 'Which instrument family does the clarinet belong to?',
    answers: ['Woodwind', 'Brass', 'Strings', 'Percussion'],
    correctAnswer: 0,
  },
  {
    question: 'Who is known as the King of Pop?',
    answers: ['Michael Jackson', 'Elvis Presley', 'Prince', 'Justin Bieber'],
    correctAnswer: 0,
  },
  {
    question: 'Which composer became deaf later in life?',
    answers: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
    correctAnswer: 1,
  },
  {
    question: 'What symbol raises a note by a half step?',
    answers: ['Sharp', 'Flat', 'Natural', 'Clef'],
    correctAnswer: 0,
  },
  {
    question: 'How many keys are on a standard full-size piano?',
    answers: ['88', '76', '61', '100'],
    correctAnswer: 0,
  },
  {
    question: 'Which rock band wrote "Bohemian Rhapsody"?',
    answers: ['Queen', 'The Beatles', 'Led Zeppelin', 'Pink Floyd'],
    correctAnswer: 0,
  },
  {
    question: 'What is the highest female voice type?',
    answers: ['Alto', 'Soprano', 'Mezzo-soprano', 'Contralto'],
    correctAnswer: 1,
  },
  {
    question: 'What tempo marking means "slowly"?',
    answers: ['Adagio', 'Allegro', 'Presto', 'Moderato'],
    correctAnswer: 0,
  },
  {
    question: 'Which instrument has 47 strings and seven pedals?',
    answers: ['Harp', 'Harpsichord', 'Piano', 'Lute'],
    correctAnswer: 0,
  },
  {
    question: 'Which note gets the beat in 3/4 time?',
    answers: ['Quarter note', 'Half note', 'Eighth note', 'Whole note'],
    correctAnswer: 0,
  },
  {
    question: 'Who composed "The Four Seasons"?',
    answers: ['Vivaldi', 'Handel', 'Tchaikovsky', 'Debussy'],
    correctAnswer: 0,
  },
  {
    question: 'What is the relative minor of C major?',
    answers: ['A minor', 'E minor', 'D minor', 'F minor'],
    correctAnswer: 0,
  },
  {
    question: 'What is the term for gradually getting louder?',
    answers: ['Crescendo', 'Diminuendo', 'Staccato', 'Legato'],
    correctAnswer: 0,
  },
  {
    question: 'Which jazz musician was nicknamed "Satchmo"?',
    answers: ['Louis Armstrong', 'Charlie Parker', 'Duke Ellington', 'Miles Davis'],
    correctAnswer: 0,
  },
  {
    question: 'Which scale consists of five notes per octave?',
    answers: ['Pentatonic', 'Chromatic', 'Whole tone', 'Dorian'],
    correctAnswer: 0,
  },
  {
    question: 'What is the Italian term for "very fast"?',
    answers: ['Presto', 'Largo', 'Andante', 'Vivace'],
    correctAnswer: 0,
  },
  {
    question: 'Which instrument is part of the brass family?',
    answers: ['Trumpet', 'Clarinet', 'Oboe', 'Violin'],
    correctAnswer: 0,
  },
  {
    question: 'Which song is the best-selling single of all time?',
    answers: ['White Christmas', 'Candle in the Wind', 'Shape of You', 'Thriller'],
    correctAnswer: 0,
  },
  {
    question: 'What is the standard tuning of a guitar from lowest to highest?',
    answers: ['EADGBE', 'GCFADG', 'DADGBE', 'EADFBE'],
    correctAnswer: 0,
  },
  {
    question: 'Which composer wrote the "Moonlight Sonata"?',
    answers: ['Beethoven', 'Mozart', 'Liszt', 'Schubert'],
    correctAnswer: 0,
  },
  {
    question: 'How many semitones are in an octave?',
    answers: ['12', '8', '10', '7'],
    correctAnswer: 0,
  },
  {
    question: 'What clef is used for violin music?',
    answers: ['Treble', 'Bass', 'Alto', 'Tenor'],
    correctAnswer: 0,
  },
  {
    question: 'Which scale degree is called the dominant?',
    answers: ['5th', '3rd', '1st', '7th'],
    correctAnswer: 0,
  },
  {
    question: 'Which pop star released the album "1989"?',
    answers: ['Taylor Swift', 'Madonna', 'Katy Perry', 'Lady Gaga'],
    correctAnswer: 0,
  },
  {
    question: 'What does "a cappella" mean?',
    answers: ['Singing without instruments', 'Singing softly', 'Singing loudly', 'Singing with vibrato'],
    correctAnswer: 0,
  },
];

export default musicTriviaQuestions;
