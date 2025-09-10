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
  value: vi.fn().mockImplementation((query: string) => ({
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
const mockAudioContext = {
  baseLatency: 0,
  outputLatency: 0,
  currentTime: 0,
  sampleRate: 44100,
  state: 'running',
  createOscillator: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
  })),
  createMediaStreamSource: vi.fn(),
  getOutputTimestamp: vi.fn(),
  audioWorklet: { addModule: vi.fn() },
  destination: {
    channelCount: 2,
    maxChannelCount: 2,
    channelCountMode: 'explicit',
    channelInterpretation: 'speakers',
    context: {} as AudioContext,
    numberOfInputs: 1,
    numberOfOutputs: 0,
    connect: vi.fn(),
    disconnect: vi.fn(),
  },
  resume: vi.fn(),
  suspend: vi.fn(),
  close: vi.fn(),
  createBuffer: vi.fn(),
  createBufferSource: vi.fn(),
  createMediaElementSource: vi.fn(),
  createMediaStreamDestination: vi.fn(),
  createScriptProcessor: vi.fn(),
  createAnalyser: vi.fn(),
  createBiquadFilter: vi.fn(),
  createChannelMerger: vi.fn(),
  createChannelSplitter: vi.fn(),
  createConstantSource: vi.fn(),
  createConvolver: vi.fn(),
  createDelay: vi.fn(),
  createDynamicsCompressor: vi.fn(),
  createGain: vi.fn(),
  createIIRFilter: vi.fn(),
  createPanner: vi.fn(),
  createPeriodicWave: vi.fn(),
  createStereoPanner: vi.fn(),
  createWaveShaper: vi.fn(),
  decodeAudioData: vi.fn(),
  listener: {
    positionX: { value: 0 } as AudioParam,
    positionY: { value: 0 } as AudioParam,
    positionZ: { value: 0 } as AudioParam,
  },
  onstatechange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
} as unknown as AudioContext;

global.AudioContext = vi.fn(() => mockAudioContext);
