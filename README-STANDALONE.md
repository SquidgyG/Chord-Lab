# Chord Master - Standalone Version

This is a simplified standalone version of the Chord Master application that students can easily download and run in their browser without any setup.

## How to Use

1. **Download the file**: Right-click on the link below and select "Save Link As..." to download the HTML file to your computer:
   - [chord-master-simple.html](chord-master-simple.html)

2. **Open in browser**: Double-click the downloaded file to open it in your default web browser.

3. **Start learning**: The application is ready to use immediately with no installation required.

## Features

- **Chord Progression Builder**: Create chord progressions in any key
- **Practice Mode**: Practice chords with random chord generation
- **Learning Path**: Track your progress through beginner lessons
- **Metronome**: Practice with a built-in metronome

## System Requirements

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required after download
- No additional software installation needed

## Build Instructions (for teachers/developers)

If you want to generate the single-file version locally from source:

1. Install dependencies (one-time):
   ```bash
   npm install
   ```
2. Build the standalone HTML (outputs at project root as chord-lab-standalone.html):
   ```bash
   npm run build:standalone
   ```
3. Distribute `chord-lab-standalone.html` to students. They can double‑click it to open offline. External links (e.g., help pages, YouTube) will open in a browser if internet is available, but the core app works offline.

## Notes

- This is a simplified version of the full Chord Master application
- For the full feature set, please refer to the main React application
- All data is stored locally in your browser and will be lost if you clear your browser data

Enjoy learning chords with Chord Master!
