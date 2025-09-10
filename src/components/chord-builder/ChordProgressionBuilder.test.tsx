import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChordProgressionBuilder from './ChordProgressionBuilder';
import { ChordBuilderProvider } from '../../contexts/ChordBuilderContext';

// We'll add tests here

describe('ChordProgressionBuilder', () => {
  it('should render the component', () => {
    render(
      <ChordBuilderProvider>
        <ChordProgressionBuilder />
      </ChordBuilderProvider>
    );
    expect(screen.getByText('Chord Progression Builder')).toBeInTheDocument();
  });
});
