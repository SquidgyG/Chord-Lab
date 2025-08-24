# Chord Lab

An interactive, single‑page web toolkit for teaching chord progressions and basic accompaniment on **piano** and **guitar**, plus printable A4 chord charts.

> **Audience**: beginners to early‑intermediate players (ages \~8+), classroom bands, and private students.
>
> **Goals**: (1) make it easy to *choose a key* and *pick a progression*; (2) instantly *see and hear* the chord on piano or guitar; (3) provide *metronome‑guided practice*; (4) offer *print‑ready charts* for offline work.
>
> **Design**: bright educational palette (consistent with the printables), high‑contrast UI, large touch targets, keyboard/mouse friendly, no sign‑in, works offline.

---

## Repository contents

This repo intentionally ships **standalone HTML files** (no build step, no dependencies). Open any file directly in a modern browser.

```
├── Enhanced Ultimate Chord App.html          # Earlier consolidated prototype
├── ChatGPT Version.html                      # Historic prototype
├── Claude Version.html                       # Historic prototype
├── Gemini Version.html                       # Historic prototype
├── piano_chord_charts_a4 (2).html            # Printable A4 piano triad chart
└── guitar_chord_charts_v14_20pct_bigger_OX.html  # Printable A4 guitar chart
```

### What each file is for

* **Enhanced Ultimate Chord App.html** – A consolidated prototype combining the best ideas from the historic versions (wheel selection, practice panel, audio + metronome). Use this first when demoing.
* **ChatGPT / Claude / Gemini Version.html** – Three historic prototypes kept for provenance and comparison. They have slightly different UI flows, instrument views, and data structures. Explore them to borrow patterns or verify behavior across implementations.
* **piano\_chord\_charts\_a4 (2).html** – High‑resolution, printer‑friendly A4 layout of piano triads with the shared color palette.
* **guitar\_chord\_charts\_v14\_20pct\_bigger\_OX.html** – Printer‑friendly A4 guitar chord sheet with enlarged grids and O/X indicators.

> These six files are the **authoritative, most up‑to‑date** artifacts. Older “v2/v3” experimental canvases are superseded by the files above.

---

## Quick start

1. **Open** `Enhanced Ultimate Chord App.html` in Chrome, Edge, or Safari.
2. **Pick a key** and drag chords from the color wheel into the *Selected progression* bin.
3. Click **Start practicing** → choose **Piano** or **Guitar**.
4. Use **Play chord** to hear the voicing/shape; switch **Play style** (block, arpeggio, down/up strum).
5. Turn on the **Metronome** and set **BPM** to practice changes.
6. For handouts, print the two **A4 chart** files directly from the browser (See *Printing* below).

---

## Features (current)

* **Key‑centric selection** via a **major/minor wheel** (diatonic chords highlighted per key).
* **Progression builder**: drag up to 6 chords, reorder by removing/adding.
* **Instrument views**:

  * **Piano**: large keyboard with colored note dots and optional finger numbers.
  * **Guitar**: vertical grid and a player‑mirrored horizontal view; shows O/X, finger numbers, and per‑string note names.
* **Sound** powered by **Web Audio API** (no samples):

  * Piano block or arpeggio; guitar down/up strum.
  * Click‑to‑start unlocks audio on first interaction (standard browser behavior).
* **Metronome** with stable scheduler and accent on beat 1.
* **No install, no internet required** once the files are on your machine.

> **Privacy**: No analytics, no external requests—everything runs locally in your browser.

---

## Printing the charts

* Open `piano_chord_charts_a4 (2).html` or `guitar_chord_charts_v14_20pct_bigger_OX.html`.
* Use the browser’s **Print** dialog.
* **Settings**: A4, Portrait, **Background graphics ON**, Scale 100% (or “Fit to page”), Margins *Default/None*. The pages include `@page { size: A4; }` so most browsers will format correctly.

---

## Tech overview

All app files are **vanilla HTML/CSS/JS** in a single page. Typical structure:

* **Palette & data maps** (shared color palette for keys; chord dictionaries for each instrument).
* **UI builders** (wheel SVG, piano/guitar canvases, progression bin).
* **Audio** (Web Audio oscillators + simple envelopes; metronome scheduler with lookahead).
* **State & wiring** (current key, instrument, chord; event handlers; render functions).

You’ll see key objects like:

* `PALETTE` – hex colors keyed by “C Major”, “A Minor”, etc.
* `KEY_DEGREES` – I, ii, iii, IV, V, vi mappings per major key.
* `PIANO.voicings` – note lists and fingerings for triads.
* `GUITAR.shapes` – string‑wise fret arrays and finger numbers (with O/X handling).

---

## Roadmap (suggested)

* **Interactive note‑by‑note playback**: click any **piano key** or **guitar string/fret** to hear the exact pitch.
* **Guided practice mode**: play each chord for *N* bars, with a countdown and auto‑advance through the selected progression.
* **Tempo ramp**: automatically increase BPM over repetitions (e.g., +5 BPM every 4 loops).
* **Skill cards**: micro‑lessons surfaced contextually (e.g., “Add the 7th”, “Common voice‑leading from V→I”).
* **Band view**: split‑screen counts for multiple learners (piano/guitar/bass parts in parallel).
* **Game mode (stretch)**: “Guitar‑Hero‑style” timing tracker for sections, with accuracy %, streaks, and variable tempo.
* **Expanded libraries**: more chords (7ths, sus2/4, add9), left‑hand piano voicings, alternate guitar shapes, capo support.
* **Mobile polish**: larger tap targets and scroll‑locking during practice.
* **Accessibility**: ARIA live regions for chord changes; optional high‑contrast mode.

---

## Contributing

This repo is intentionally simple. To contribute:

1. Fork the project and make changes directly in one of the HTML files.
2. Prefer small, focused commits (e.g., “Add D7 to GUITAR.shapes”).
3. If you add new chords/voicings, update both the data maps and any UI that references them.
4. Open a PR describing:

   * What you changed and why
   * How to test it (steps + expected behavior)
   * Any screenshots/GIFs if it’s UI‑visible

---

## FAQ

**Why separate historic prototypes?**  They explore different flows and rendering techniques. Keeping them helps us cherry‑pick ideas and verify behavior across implementations.

**Do I need a server?**  No. Open the files directly. If your browser blocks audio until user interaction, click any button (“Play chord”) once to enable sound.

**Will this run on tablets/phones?**  Yes, though printing is best from desktop.

---

## License

Choose a license (e.g., MIT) and add a `LICENSE` file. If unspecified, contributions are assumed unlicensed by default.

---

## Credits

Built from a series of prototypes refined across multiple assistants, consolidated here. Color palette and chart aesthetics are shared between the app and the A4 printables.

---

## Changelog (high level)

* **Latest**: This repository snapshot with six authoritative files (consolidated prototype + three historic versions + two printables).
* Earlier in‑progress canvases (**v2/v3**) are retained only as references outside this repo and are superseded by the files above.
