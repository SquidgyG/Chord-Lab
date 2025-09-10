# Chord Lab - GitHub Copilot Instructions

Chord Lab is a React-based interactive music learning application that teaches piano and guitar chords through progressive lessons, visual guides, and audio feedback. Built for students, teachers, and self-learners.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Quick Setup & Validation

### Prerequisites & Environment
- **CRITICAL**: Node.js version >=20.19 <23 (enforced via package.json engines field)
- Verify with: `node --version && npm --version`

### Bootstrap & Build Commands
```bash
# Install dependencies (35-40 seconds)
npm ci
# Note: If package-lock.json is missing, run `npm install` first

# Production build (7 seconds) 
npm run build

# Single-file standalone build (5 seconds)
npm run build:standalone

# Development server (<1 second startup)
npm run dev
# Access at: http://localhost:5173/Chord-Lab/

# Run tests (8 seconds - some failures expected)
npm test

# Lint code (7 seconds - existing issues present)
npm run lint
```

**TIMING EXPECTATIONS**: All builds complete under 30 seconds. NEVER set timeouts <60 seconds for any build command to avoid premature cancellation.

**VALIDATION CONFIRMED**: All commands and timing have been tested and validated as of this document creation.

## Development Workflow

### Essential Commands
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Dev Server**: `npm run dev` → http://localhost:5173/Chord-Lab/
- **Tests**: `npm test` (Vitest unit tests)
- **Lint**: `npm run lint` (ESLint - has pre-existing issues)
- **E2E Tests**: `npx playwright test` (requires `npx playwright install` first)

### Development Server Usage
- Start with: `npm run dev`
- Access at: http://localhost:5173/Chord-Lab/
- Hot reload enabled
- **NEVER CANCEL** the dev server during manual testing - it starts in <1 second

## Manual Validation Requirements

**CRITICAL**: After making ANY changes, you MUST manually validate functionality by running through these complete user scenarios:

### Scenario 1: New User Onboarding
1. Navigate to http://localhost:5173/Chord-Lab/
2. Complete onboarding flow:
   - Click "Get Started" in welcome modal
   - Enter name (e.g., "Test User")
   - Select instrument (Guitar or Piano)
   - Choose skill level (Beginner/Intermediate/Advanced)  
   - Complete quick tour
3. **VERIFY**: User reaches main dashboard with navigation working

### Scenario 2: Practice Mode Functionality
1. Click "Practice" from main navigation
2. **Test chord switching**: Click different chord buttons (C, G, D, etc.)
   - **VERIFY**: Chord name and diagram update correctly
   - **VERIFY**: Statistics increment (Chords Played count increases)
3. **Test metronome**: Click "Start Metronome" - verify button changes to "Stop Metronome"
   - **VERIFY**: Practice time starts incrementing (0:00 → 0:01 → etc.)
4. **Test statistics**: Verify practice time increments and chord counts update properly
5. **Test instrument switching**: Toggle between Guitar (🎸) and Piano (🎹)
   - **VERIFY**: Diagram changes from fretboard to keyboard layout
   - **VERIFY**: Strum button becomes enabled for piano mode
6. **VERIFY**: All interactions work and statistics track properly

### Scenario 3: Learning Pathway
1. Click "Learn" from main navigation
2. Browse different levels (1-6)
3. Test lesson completion by clicking "Mark as Complete" buttons
4. **VERIFY**: Progress tracking works and lessons display correctly

### Scenario 4: Classroom Mode
1. Toggle "Classroom: Off" button in header
2. **VERIFY**: Button changes to "Classroom: On" and remains functional

**VALIDATION RULE**: If any of these scenarios fail, investigate and fix before proceeding. Always take screenshots of UI changes to document impact.

## Project Structure & Key Files

```
src/                          # React application source code
├── components/              # UI components
│   ├── practice-mode/       # Practice interface & chord diagrams
│   ├── learning-path/       # Educational content & quizzes
│   ├── classroom/           # Teacher/classroom features
│   └── common/              # Shared components
├── hooks/                   # Custom React hooks (audio, stats, etc.)
├── utils/                   # Helper functions
├── data/                    # Chord definitions & educational content
└── types/                   # TypeScript type definitions

offline/                     # Single-file build sources
scripts/                     # Build utilities
tests/                       # Playwright E2E tests
.github/workflows/           # CI/CD pipelines
```

### Key Technologies
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API via soundfont-player
- **Routing**: React Router DOM

## CI/CD & Deployment

### GitHub Workflows
- **CI** (`.github/workflows/ci.yml`): Runs on non-main branches - lint + test
- **Deploy** (`.github/workflows/deploy.yml`): Auto-deploys to GitHub Pages on main branch
- **Playwright** (`.github/workflows/playwright.yml`): E2E tests on main/master branches

### Build Targets
1. **Standard Build**: `npm run build` → `dist/` folder (GitHub Pages deployment)
2. **Standalone Build**: `npm run build:standalone` → `chord-lab-standalone.html` (single-file version)

**DEPLOYMENT**: Application automatically deploys to GitHub Pages at https://squidgyg.github.io/Chord-Lab/ when changes merge to main.

## Audio System & External Dependencies

### Audio Functionality
- Uses Web Audio API for chord/note playback
- **External Dependency**: soundfont-player library loads instrument samples
- **Network Requests**: May fail in sandboxed environments (expected)
- **Testing Note**: Audio errors in tests are normal due to mocked Web Audio API

### Known External Dependencies
- Soundfont samples from external CDNs
- Some network requests may be blocked in development (expected behavior)

## Common Issues & Solutions

### Build Issues
- **Node Version**: Ensure Node.js >=20.19 <23
- **Dependencies**: Run `npm ci` not `npm install` for consistent installs
- **TypeScript Errors**: Run `npm run build` to catch compilation issues

### Test Issues  
- **Playwright Tests**: May fail if browsers not installed (`npx playwright install`)
- **Jest vs Vitest**: Some test files use `jest.fn()` - replace with `vi.fn()` from vitest
- **Audio Tests**: Network errors for audio loading are expected in test environment

### Lint Issues
- **Pre-existing Issues**: Repository has existing ESLint violations
- **Config**: Uses TypeScript ESLint with strict rules
- **Exclusions**: Many files excluded in eslint.config.js (see ignores array)

## Code Modification Guidelines

### Making Changes
- **Test First**: Always run existing tests before making changes
- **Build Validation**: Run `npm run build` after code changes
- **Manual Testing**: Complete all validation scenarios after changes
- **Lint Last**: Run `npm run lint` before committing (existing issues expected)

### Key Areas
- **Practice Mode**: `/src/components/practice-mode/` - chord display & interaction
- **Audio System**: `/src/hooks/useAudio.ts` - sound generation & playback
- **Learning Path**: `/src/components/learning-path/` - educational content
- **Data**: `/src/data/` - chord definitions and lesson content

### TypeScript Notes
- Strict type checking enabled
- Audio-related types may need `any` due to Web Audio API complexity
- Use existing patterns for component props and state management

## Performance & Optimization

### Build Performance
- **Development**: Vite hot reload ~500ms for most changes
- **Production**: Full build completes in ~7 seconds
- **Standalone**: Additional ~5 seconds for single-file build

### Runtime Performance
- **Audio Loading**: Initial load may take 2-3 seconds for sound fonts
- **Large Screens**: Responsive design handles multiple screen sizes
- **Chord Rendering**: Guitar/piano diagrams render efficiently with Canvas/SVG

## Emergency Procedures

### If Build Fails
1. Check Node.js version: `node --version`
2. Clear node_modules: `rm -rf node_modules package-lock.json && npm ci`
3. Check for TypeScript errors: `npx tsc --noEmit`

### If App Won't Start
1. Verify dev server: `npm run dev`
2. Check browser console for errors
3. Verify base URL configuration in vite.config.ts

### If Tests Fail
1. Check for new test dependencies needed
2. Verify test setup in `src/setupTests.ts`
3. Run tests individually: `npm test -- --run specific-test.ts`

**REMEMBER**: Always complete manual validation scenarios after any changes to ensure full application functionality.