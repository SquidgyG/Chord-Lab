import QuickQuiz from './QuickQuiz';

// Wrapper component for a quick quiz that asks the user to distinguish
// between major and minor chords. It supplies the appropriate string literal
// types to the generic QuickQuiz component so that the options are strongly
// typed.
export default function MajorMinorQuickQuiz() {
  return <QuickQuiz<'Major' | 'Minor'> options={['Major', 'Minor']} />;
}

