import '@testing-library/jest-dom'
import { vi } from 'vitest';
import { configure } from '@testing-library/react';

// Configure test-id attribute
configure({ testIdAttribute: 'data-testid' });

// Create a root div for React tests
document.body.innerHTML = '<div id="root"></div>';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

// Mock Web Audio API
const MockAudioContext = vi.fn(() => ({
  // Required properties
  baseLatency: 0,
  outputLatency: 0,
  currentTime: 0,
  sampleRate: 44100,
  state: 'running',
  
  // Required methods
  createOscillator: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn()
  })),
  
  createGain: vi.fn(() => ({
    gain: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn()
  })),
  
  close: vi.fn(),
  suspend: vi.fn(),
  resume: vi.fn(),
  createMediaElementSource: vi.fn(),
  createMediaStreamDestination: vi.fn(),
  
  // Event target methods
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}));

window.AudioContext = MockAudioContext;
