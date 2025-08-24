# Chord Lab — Product Goals & Design Brief

**One‑liner:** Chord Lab turns chord progressions into hands‑on practice for piano and guitar—guiding beginners to play cleanly, in time, and musically.

---

## Audience

* **Primary:** Beginners to early‑intermediate learners (ages 10+), self‑taught or in lessons, who know a few chords but struggle to switch cleanly and stay in time.
* **Secondary:** Music teachers who want a fast, visual, and interactive way to demonstrate chords/voicings and set targeted practice.

## Purpose

Help learners move from **knowing chord shapes** to **playing fluently in songs**. The app focuses on:

1. choosing a key and building a progression,
2. hearing and seeing the chord tones on an instrument,
3. practicing changes with rhythm, and
4. gradually adding melody and feel.

## Core Learning Objectives

1. **Key literacy:** Identify the I‑ii‑iii‑IV‑V‑vi chords in any major key.
2. **Shape confidence:** Play foundational voicings (piano RH 1‑3‑5; open guitar shapes) with correct fingering.
3. **Change accuracy:** Switch between 2–6 chords at a set tempo with minimal hesitation.
4. **Rhythm & timing:** Lock to a metronome; progress from block chords → arpeggios → strums.
5. **Chord‑tone awareness:** Find 1–2 safe melody notes per chord for simple top‑line creation.

## Current Build (Baseline)

* **Version:** v3 Key‑first (Wheel → Practice)
* **Features:** Key‑aware wheel (I ii iii IV V vi highlight), drag‑to‑select progression, piano & guitar diagrams, player‑mirrored guitar view, metronome, basic audio playback styles.

## North‑Star Experience

A **guided, interactive tutorial** where learners:

1. pick a key and learn the six diatonic chords,
2. build a short progression,
3. practice clean chord changes with tempo targets,
4. add a one‑finger melody using chord tones,
5. perform with a simple backing groove.

---

## Design System (Tokens & Style)

* **Palette (base UI):**

  * `--bg: #f5f7fb` (background), `--ink: #0f1014` (text), `--panel: #ffffff` (cards), `--muted: #c7c9d1` (lines), shadows and radius as in current CSS.
* **Key Accents:** Use the existing **per‑key palette** to color the diagram border, note dots, and chips (e.g., C Major `#cc39bc`, G Major `#714faa`, etc.). These accents are for **meaning**, not decoration.
* **Typography:**

  * **Headings:** Readex Pro (700/800), uppercase with slight letter‑spacing.
  * **Body/UI:** Inclusive Sans (400/600/700) for clarity and friendliness.
* **Components:** Pills for toggles, chips for selected chords, large buttons for instrument choice, dashed drop zone for the progression bin.
* **Motion:** Subtle (≤150ms) ease on hover/press; no distracting animations.
* **Accessibility:** Minimum 4.5:1 contrast for actionable text; color isn’t the only signal (use labels/roman numerals and shapes).

## Voice & Instruction Style

* **Direct, friendly, and actionable.**
* Micro‑coaching uses verbs and targets: *“Set 70 BPM. Play 4 bars. Aim for silent switches—no string buzz.”*
* Keep copy short; show goals and success criteria on screen.

---

## Product Pillars & Features

### 1) Key & Progression (Step 1)

* Key dropdown highlights diatonic chords on the wheel (I ii iii IV V vi legend).
* Drag chords into the **Selected progression** (2–6 chords).
* Chips display both **name and roman numeral** within the chosen key.

**Acceptance:**

* Wheel segments are draggable/clickable. Non‑diatonic chords dim. Chips removable. Start button enables at 2–6 chords.

### 2) Practice View (Step 2)

* **Instrument first‑run choice** → reveals relevant controls.
* **Piano:** note dots with optional finger numbers (RH 1‑3‑5). **Guitar:** open‑shape dots + mirrored layout option. Note names shown per string when fretted/open.
* **Play styles:** block/arp for piano; up/down strum for guitar.
* **Metronome:** steady scheduler with BPM 30–220.

**Acceptance:**

* Title shows `<Chord — Instrument>` and diagram border matches key color. Play button sounds chord in the chosen style. Metronome remains stable across tempo changes.

### 3) Interactive Notes (Required)

* **Piano:** Clicking a key plays its pitch; clicking a dot also plays/labels that note.
* **Guitar:** Clicking a string at a fret plays that note; clicking the dot plays the fingered note.

**Acceptance:**

* Per‑note playback has no audible clicks, respects a master gain limit, and doesn’t starve the metronome.

### 4) Guided Tutorial (Skill Path)

* **Unit A: Clean Changes**

  * A1: Two‑chord switch @ 60 BPM (4 bars, 4 reps)
  * A2: Three‑chord loop @ 70–90 BPM with target time
* **Unit B: Rhythm**

  * B1: Block → Arpeggio → Strum
* **Unit C: Melody from Chord Tones**

  * C1: Root & 3rd as safe notes; one‑finger line over the loop
* **Unit D: Performance**

  * D1: Add a basic drum groove; play 16 bars, no stops

**Acceptance:**

* Each unit has a visible goal, timer/reps, and pass criteria; unlocks the next unit on success.

### 5) Band View (Roadmap)

* Shared tempo & simple backing via web audio; learners join a session code to **practice the same progression** (local audio only to avoid latency issues). Visual count‑in keeps everyone in sync.

### 6) Arcade Mode (Roadmap)

* “**Chord Hero**” lanes show upcoming chord changes/strum arrows relative to the metronome. Sections repeat with incremental BPM bumps.

---

## Accessibility & Inclusivity

* Full keyboard navigation (Tab/Shift‑Tab; Enter/Space activate controls).
* ARIA for roles and live regions (e.g., chip bin announcements).
* **Color‑blind safety:** add patterns/labels to wheel segments; roman numerals displayed everywhere colors are used.
* Note‑name display toggle for **♯/♭ preference**; optional **do‑re‑mi** solfège mode.

## Performance & Quality Targets

* Time to first interaction sound: **< 2 seconds** after initial user gesture.
* Metronome jitter **< ±3ms** by using a look‑ahead scheduler.
* No layout shift during practice; diagrams render in **< 50ms** on selection.

## Data & Content Requirements

* **Voicings:** Root triads for all I‑vi chords in 12 keys (piano), plus at least one beginner‑friendly guitar shape each (with finger numbers).
* **Copy:** Micro‑coach strings for every skill step (A1–D1) with success criteria.
* **Audio:** Envelope per instrument (piano triangle, guitar sawtooth for now), master limiter, click accents on beat 1.

## Technical Notes

* Stack: vanilla HTML/CSS/JS + Web Audio API (no dependencies), PWA‑ready later.
* Persist progression + settings in `localStorage`.
* Input throttling on rapid clicks; voice recycling to avoid node leaks.

---

## Success Metrics

* **Practice throughput:** average continuous practice time per session (goal: 6–10 minutes).
* **Skill progression:** % of users completing A1 within first session; % advancing to B1 in week 1.
* **Accuracy:** reduced error rate on chord changes (self‑report or timed success streaks).
* **Teacher adoption:** number of shared progressions used in lessons.

---

## Milestones

* **M0 (Polish):** Fix any regressions; guarantee wheel → bin → practice flow; stabilize metronome.
* **M1 (Interactivity):** Per‑note click playback on piano/guitar + visual feedback; master gain; sustain envelope tweaks.
* **M2 (Tutorial v1):** Implement A‑B‑C units with timers, reps, pass criteria, and progress save.
* **M3 (Melody Assist):** Highlight safe chord tones for one‑finger melodies; optional backing drum groove.
* **M4 (Arcade prototype):** Simple lane view for chord‑change timing.
* **M5 (Band view prototype):** Shared click with on‑screen count‑in; join via code.

---

## Acceptance Checklist (Go/No‑Go)

* [ ] Wheel shows only diatonic chords at full opacity for the selected key; legend lists I ii iii IV V vi.
* [ ] Progression chips show roman numerals for the current key.
* [ ] Diagram border/background adopt the chord color; text remains readable.
* [ ] **Clicking keys/strings/frets plays the correct note** and never interrupts metronome stability.
* [ ] “Play chord” renders correct notes in the chosen style (block/arp/strum).
* [ ] Metronome remains phase‑accurate after 120s continuous use.
* [ ] Tutorial unit shows goal, reps, timer, pass criteria, and unlock logic.

> This brief should guide implementation and review. If you want, I can now convert these into GitHub issues / TODOs mapped to milestones M0–M5.
