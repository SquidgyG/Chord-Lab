import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
