# Chord Lab

An interactive music learning application that teaches piano and guitar chords through progressive lessons, visual guides, and audio feedback. Built for students, teachers, and self-learners who want to master chord playing with proper technique.

**[Launch App](https://squidgyg.github.io/Chord-Lab/)** | **[Download Offline Version](https://github.com/SquidgyG/Chord-Lab/releases)**

![GitHub Pages](https://img.shields.io/github/deployments/SquidgyG/Chord-Lab/github-pages?label=deployment)
![License](https://img.shields.io/github/license/SquidgyG/Chord-Lab)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-646CFF)

## Features

### For Students
- **Interactive Instrument Visualization**: Click piano keys or see guitar chord diagrams with finger positions
- **Progressive Lesson System**: Start with proper posture and build up to complex chord progressions
- **Audio Feedback**: Hear each chord and individual notes as you learn
- **Mobile-Friendly**: Practice on any device - phone, tablet, or desktop
- **Offline Capable**: Works without internet connection once loaded
- **No Installation Required**: Runs directly in your web browser

### For Teachers
- **Structured Curriculum**: Lessons progress logically from basics to advanced techniques
- **Visual Learning Aids**: Clear finger numbering and chord diagrams
- **Practice Tracking**: Students can see their progress and completed lessons
- **Accessibility Features**: Keyboard navigation and screen reader support

## How to Use

1. **Choose Your Instrument**: Select piano or guitar from the main interface
2. **Start a Lesson**: Begin with "Piano Basics" or "Guitar Essentials" for structured learning
3. **Practice Individual Chords**: Use the chord library to explore specific chords
4. **Follow Visual Guides**: Finger numbers and chord diagrams show proper technique
5. **Listen and Play**: Click notes/strings to hear sounds and practice timing

### Supported Chords
The current official chord set focuses on commonly used shapes:

- **Major chords**: C, F, G, D, A, E, B
- **Minor chords**: Am, Em, Dm, Bm, F#m, C#m, G#m

Chord definitions live in `src/data/chords.ts` so future additions remain consistent.

- **Extensions coming soon**: 7th chords, suspended chords, and more

## Browser Compatibility

- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Audio Requirements**: Web Audio API support (available in all modern browsers)
- **Progressive Web App**: Can be installed on mobile devices for offline use

## Screenshots

<!-- Add these screenshots to your repository and link them -->
*Piano Interface*
![Piano chord visualization with finger numbers](screenshots/piano-interface.png)

*Guitar Chord Diagrams*
![Guitar chord diagrams with fret positions](screenshots/guitar-interface.png)

*Lesson System*
![Progressive lesson interface](screenshots/lessons.png)

*Mobile View*
![Responsive design on mobile devices](screenshots/mobile-view.png)

## Educational Approach

Chord Lab uses a progressive learning methodology:

1. **Proper Foundation**: Start with correct posture and hand positioning
2. **Visual Learning**: See exactly where fingers go with clear diagrams
3. **Audio Reinforcement**: Hear what chords should sound like
4. **Muscle Memory**: Practice chord transitions and progressions
5. **Real Application**: Learn chords used in actual songs

## Technical Details

### Architecture
- **Frontend**: React 18 with hooks and functional components
- **Build Tool**: Vite for fast development and optimized production builds
- **Audio**: Web Audio API for real-time sound generation
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: GitHub Pages for reliable hosting

### Distribution Targets
- **Hosted (Recommended)**: GitHub Pages static site - no installation needed for students
- **Offline**: Single-file HTML (`chord-lab-standalone.html`) that opens directly in browser

## Development Setup

### Prerequisites
- Node.js 20.19+ or 22.12+
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/SquidgyG/Chord-Lab.git
cd Chord-Lab

# Install dependencies
npm ci

# Start development server
npm run dev
# Open http://localhost:5173
```

### Build Commands
```bash
# Production build for GitHub Pages
npm run build

# Create standalone single-file version
npm run build:standalone
# Output: chord-lab-standalone.html
```

### Project Structure
```
src/                 # React application source code
offline/             # Sources for single-file build
scripts/             # Build utilities
  build-standalone.mjs  # Inlines CSS/JS into single HTML
archive/             # Legacy versions (reference only)
.github/workflows/   # GitHub Actions for deployment
```

## Deployment

### GitHub Pages (Automatic)
The app deploys automatically to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions (`.github/workflows/deploy.yml`).

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## Contributing

We welcome contributions! Here's how you can help:

### Adding New Chords
1. Update chord data in the relevant configuration file
2. Add finger positions for both piano and guitar
3. Include chord in appropriate lesson progressions
4. Test audio playback and visual display

### Adding New Lessons
1. Follow the existing lesson structure
2. Include proper technique tips and common mistakes
3. Ensure progressive difficulty increase
4. Add practice exercises and assessments

### Bug Reports
Please include:
- Browser and version
- Device type (desktop/mobile)
- Steps to reproduce
- Expected vs actual behavior

### Development Guidelines
- Use TypeScript for new components
- Follow existing code style and component patterns
- Test on multiple devices and browsers
- Ensure accessibility compliance

## Accessibility

Chord Lab is designed to be inclusive:
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Supports system high contrast modes
- **Reduced Motion**: Respects user's motion preferences
- **Touch Targets**: Appropriately sized for mobile interaction

## Troubleshooting

### Audio Issues
- **No sound**: Check browser audio permissions and system volume
- **Distorted audio**: Try refreshing the page to reset Web Audio context
- **Mobile audio**: Some mobile browsers require user interaction before audio plays

### Performance Issues
- **Slow loading**: Check internet connection; try the offline version
- **Laggy interactions**: Close other browser tabs and applications

### Browser Compatibility
- **Old browsers**: Upgrade to a modern browser version
- **iOS Safari**: Requires iOS 14+ for full functionality

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Web Audio API documentation and examples
- Music theory resources from various educational institutions
- Open source community for React and Vite tooling
- Beta testers and music educators who provided feedback

## Roadmap

### Planned Features
- [ ] 7th chords and chord extensions
- [ ] Chord progression generator
- [ ] MIDI keyboard support
- [ ] Recording and playback functionality
- [ ] Custom lesson creation tools
- [ ] Multi-language support

### Version History
- **v2.0**: React + Vite rewrite with improved performance
- **v1.0**: Initial release with basic chord visualization
- **Legacy**: HTML-only versions preserved in `archive/`

---

**Questions or feedback?** Open an issue or start a discussion in this repository.
