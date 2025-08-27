# React Chord App Integration Plan

## Distribution
- Primary target: React SPA hosted on GitHub Pages.
- Routing: `HashRouter` for compatibility with Pages base path.
- Offline single-file build is out of scope going forward.

## Integration Base Decision

- **Base**: `Ultimate Chord App.html` (rich progression builder, theory tools, song play-along, achievements UX).
- **Merge from `ChatGPT Version.html`**: metronome, Web Audio playback (`AudioContext` + `playChord()`), persistence via `localStorage`, and tabbed navigation model.
- **Merge from other versions (as needed)**: ear training, scale visualizer, melody guide, and UI polish from `Gemini Version.html`, `Canva.html`, and `Enhanced Ultimate Chord App.html`.
- **Navigation**: SPA uses `HashRouter` and is deployed to GitHub Pages.
- **Persistence**: `localStorage` for user profile, learned chords, best challenge time, progressions, and settings.

## Implemented to date

- Classroom Board: `src/components/classroom/ClassroomBoard.tsx`
  - Panel toggles (Chord Grid, Guitar, Piano), responsive layout, key selector + diatonic chips.
  - Integrates `useProgress()` Teacher Unlock (with "Show Both" control) and `useClassroomMode()` for projector-friendly UI.
  - Persists board UI state to `localStorage` (panels, key, chord).
- Chord Wheel: `src/components/ChordWheel.tsx`
  - Outer majors + inner relative minors, hover highlighting, drag-and-drop to builder drop zone.
- Chord Progression Builder: `src/components/chord-builder/ChordProgressionBuilder.tsx`
  - Key selection, quick templates (I–V–vi–IV, ii–V–I), DnD target, localStorage persistence.
  - Playback via Web Audio hook.
- Instrument Diagrams: `src/components/diagrams/{GuitarDiagram,PianoDiagram}.tsx` (baseline diagrams wired across app).
- Audio foundation: `src/hooks/useAudio.ts` (AudioContext init, ADSR, playNote/playChord, guitar string calc).
- Metronome: `src/components/practice-mode/Metronome.tsx` + `src/hooks/useMetronome.ts`.
- Practice Mode: `src/components/practice-mode/PracticeMode.tsx` (instrument diagrams, tempo control, current chord selection; uses shared theory utils).
- Shared theory helpers: `src/utils/theory.ts` (`MAJORS_ORDER`, `getDiatonicForKey`) consumed by Practice Mode and Classroom Board.
- Global toggles: Header switch-style UI for Classroom Mode and Teacher Unlock with persistence via contexts.
- Router: `HashRouter` (`src/main.tsx`) so SPA works when served statically (and aligns with Pages base path).
- Deployment: GitHub Pages workflow configured under `.github/workflows/deploy.yml`.

## Archive notes (HTML versions)

- Kept for historical reference only. React SPA is the sole distribution target now.

## React Port Task List (Checklist)

### Phase 1: Core
- [x] Scaffold React app with Tailwind and `HashRouter`.
- [x] Port `ChordWheel` + progression builder (click + DnD).
- [x] Instrument diagrams (baseline `GuitarDiagram` and `PianoDiagram`).
- [x] Implement Web Audio engine and `playChord()` with simple ADSR.
- [x] Classroom Board baseline with projector-friendly toggle and Teacher Unlock integration.

### Phase 2: Practice
- [x] Metronome with BPM, beats/measure, accents, visual tick.
- [ ] Practice flow with tempo control and basic stats. (tempo + flow present; basic stats pending)
- [ ] Persist session state via `localStorage`.

### Phase 3: Learning
- [ ] Onboarding + learning paths.
- [ ] `TheoryAnalysis` + `ScaleVisualizer`.
- [ ] Ear training v1 (interval/chord ID with scoring).

### Phase 4: Advanced
- [ ] Achievements and celebration UX.
- [ ] Song Library Play-Along with audio and tempo control.
- [ ] Challenge mode with best-time persistence.

### Phase 5: Deployment & QA
- [ ] Confirm GitHub Pages pipeline status on `main`.
- [ ] App smoke test on Pages URL across Chrome/Edge/Safari.
- [ ] Accessibility pass (keyboard nav, ARIA, contrast) and fix regressions.

## Core Features to Implement

### 1. Foundation Structure
- **Component Architecture**: Create a modular component structure based on Ultimate Chord App.html
- **State Management**: Use React hooks for state management (useState, useEffect, useContext)
- **Styling**: Implement Tailwind CSS for consistent styling
- **Routing**: For SPA, use React Router (prefer HashRouter so routes work without a server). The single-file build may use in-app tab state and hashes for navigation.
- **Build Target**: SPA hosted on GitHub Pages.

### 2. Essential Components

#### a. Chord Progression Builder
**Source**: All versions
**Features to Implement**:
- Roman numeral system for chord progression building
- Key selection dropdown
- Visual chord progression display with remove functionality
- Quick progression templates (I-V-vi-IV, ii-V-I, etc.)
- Save/load functionality for progressions

#### b. Instrument Diagrams
**Source**: All versions
**Features to Implement**:
- Piano keyboard component with note highlighting
- Guitar fretboard component with chord diagrams
- Instrument switching functionality
- Chord inversion options
- Chord quality options (triads, 7th chords, etc.)

#### c. Practice Mode
**Source**: All versions
**Features to Implement**:
- Metronome with tempo control
- Play/stop controls
- Chord timing visualization
- Visual feedback for chord changes
- Practice statistics tracking

#### d. Audio System
**Source**: All versions (especially Ultimate Chord App.html and ChatGPT Version.html)
**Features to Implement**:
- AudioContext API for sound synthesis
- Chord playback with different styles (block, arpeggio, strum)
- Note playback for individual notes
- Instrument-specific sound generation

### 3. Learning Features

#### a. Structured Learning Path
**Source**: Claude Version.html and Ultimate Chord App.html
**Features to Implement**:
- Skill levels (beginner, intermediate, advanced)
- Lesson structure with progressive difficulty
- Learning path visualization
- Skill meter for progress tracking

#### b. Onboarding System
**Source**: Enhanced Ultimate Chord App.html and Ultimate Chord App.html
**Features to Implement**:
- User profile setup (name, instrument preference)
- Confidence level selection (beginner/explorer)
- Welcome tutorial

#### c. Theory Analysis
**Source**: Canva.html and ChatGPT Version.html
**Features to Implement**:
- Chord tones display
- Scale notes visualization
- Harmonic function analysis
- Song suggestions based on progressions

### 4. Progress Tracking

#### a. Achievement System
**Source**: All versions
**Features to Implement**:
- Badge-based achievement system
- Achievement notifications
- Achievement display in profile

#### b. Statistics Tracking
**Source**: Canva.html and Ultimate Chord App.html
**Features to Implement**:
- Practice time tracking
- Chords played counter
- Streak tracking
- Challenge mode with timing

### 5. UI/UX Features

#### a. Navigation
**Source**: ChatGPT Version.html
**Features to Implement**:
- Tabbed navigation (Create, Practice, Songs, Learn, Theory)
- Dashboard view
- Responsive design

#### b. Visual Design
**Source**: Canva.html and Enhanced Ultimate Chord App.html
**Features to Implement**:
- Dark mode toggle
- Modern UI with gradients and shadows
- Visual feedback animations
- Clean, intuitive layout

#### c. Advanced Features
**Source**: Gemini Version.html and ChatGPT Version.html
**Features to Implement**:
- Chord wheel with drag-and-drop
- Ear training exercises
- Melody guide
- Scale visualizer

## Curriculum & Classroom Plan

### Why it exists
- Unify classroom teaching and app practice. Provide a clear progression, projector-friendly display, and drills aligned with the printable charts and methods already used.

### How to use it
- Teachers project diagrams and drills in Classroom Mode while students practice on devices or instruments.
- Learners follow the level roadmap, complete short drills, and use Play-Along songs to consolidate.

### Curriculum Levels & Songs
- Beginner
  - Skills: Open chords (C, G, D, Em, Am), steady strum to a click, piano white-key triads in root position.
  - Songs (examples): Riptide (C/G/Am/F), Stand By Me (I–vi–IV–V), Three Little Birds (A/D/E).
- Intermediate
  - Skills: Barre chord intro (F, Bm shapes), 7th chords, chord inversions (piano), I–vi–IV–V in multiple keys.
  - Songs: Wonderwall (Em/G/D/A/C), Let It Be (C/G/Am/F), Perfect (G/Em/C/D).
- Advanced
  - Skills: Secondary dominants, ii–V–I in major/minor, extended chords, comping patterns, transposition.
  - Songs: Autumn Leaves (jazz ii–V–I), Don’t Know Why (extended chords), Hallelujah (voice-leading focus).

### Chord Wheel Understanding
- Outcomes: Key centers, relative majors/minors, dominant motion, common progressions by rotation.
- Activities:
  - Drag I–V–vi–IV around wheel; app updates progression in the key under the pointer.
  - Identify relative minor by moving three steps clockwise (or via labeled toggle).
  - Quick quiz: “Drop the V of D minor” → expects A or A7 sector.

### Piano Key Recognition
- Drills: Flash a note name; learner taps the correct key. Timed rounds with streaks.
- Modes: Single note → octave-agnostic; Accidental focus (C#/Db); Interval jump (show start then target).
- Options: Show/hide note labels on keys; slow/medium/fast timings; left/right/both hand prompt.

### Keyboard Methods (Boom 4-3 / 3-4)
- Boom 4-3: LH plays root (Boom) on beat 1; RH plays 4-note then 3-note pattern over the bar.
- 3-4: Invert order (3 then 4). Used for accompaniment variety in ballads/pop.
- App support: Visual count overlay, guided metronome accents, example voicings, graded tempo.

### Classroom Mode (Projector)
- Toggle: Global setting (persisted) to enlarge fonts/icons, increase contrast, and hide nonessential controls.
- Diagram rules: Use printable theme colors; maximize chord name size; emphasize XO/dots and pressed keys.
- Layout rules: High-contrast background, 1.25–1.5x scaling, simplified panels; keyboard shortcuts for next/prev.
- Views affected: Create, Practice, Songs, Learn (hide forms; show big-now content and navigation).

## Implementation Priority

### Phase 1: Core Foundation (Week 1)
1. Set up React project with Tailwind CSS
2. Create basic component structure
3. Implement chord progression builder
4. Create instrument diagrams (piano and guitar)
5. Add audio system foundation

### Phase 2: Practice Features (Week 2)
1. Implement practice mode
2. Add metronome functionality
3. Create chord timing visualization
4. Add basic statistics tracking

### Phase 3: Learning System (Week 3)
1. Implement structured learning paths
2. Add onboarding system
3. Create lesson structure
4. Add theory analysis components

### Phase 4: Advanced Features (Week 4)
1. Implement achievement system
2. Add challenge mode
3. Create chord wheel
4. Add ear training exercises

### Phase 5: Polish & Optimization (Week 5)
1. Implement dark mode
2. Add responsive design
3. Optimize performance
4. Add final visual polish
5. Accessibility pass (keyboard nav, ARIA, contrast)
6. Cross-browser smoke test on GitHub Pages URL (Chrome/Edge/Safari)
7. Verify GitHub Pages deploy pipeline and document release checklist

## Technical Considerations

### State Management
- Use React Context API for global state
- Implement custom hooks for reusable logic
- Consider Redux Toolkit for complex state if needed

### Performance
- Optimize audio processing
- Implement lazy loading for components
- Use React.memo for performance optimization
- Optimize SVG rendering for diagrams

### Data Persistence
- Use localStorage for saving progressions and user data
- Implement data validation and error handling
- Consider IndexedDB for more complex data storage

### Hosting considerations
- Use `HashRouter` to avoid 404s on Pages refresh.
- Ensure asset paths respect repo base path for GitHub Pages.

### Accessibility
- Ensure keyboard navigation
- Add ARIA labels for interactive elements
- Implement proper focus management
- Ensure color contrast for readability

## File Structure

```
src/
├── components/
│   ├── chord-builder/
│   ├── diagrams/
│   ├── practice-mode/
│   ├── learning-path/
│   ├── theory-analysis/
│   ├── ui/
│   └── ...
├── hooks/
├── contexts/
├── utils/
├── data/
├── styles/
└── ...
```

## Dependencies to Install

```bash
npm install react-router-dom
npm install @heroicons/react
npm install react-icons
npm install use-sound
```

## Testing Strategy

1. Unit tests for utility functions
2. Component tests for UI elements
3. Integration tests for core workflows
4. Audio system testing
5. Cross-browser compatibility testing

## Deployment

1. Optimize build for production
2. Optional: add service worker/PWA if offline caching is desired for SPA
3. Optional: analytics
4. Deploy SPA to GitHub Pages (workflow in `.github/workflows/deploy.yml`)
