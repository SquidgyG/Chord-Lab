# Enhanced Ultimate Chord App — Shareable HTML Guide

This guide explains how to open, share, and optionally make the single-file HTML app more offline-friendly. It complements the Vite project README.

## Why this exists
- A stable, self-contained-ish HTML file you can open directly or share with students/colleagues.
- Uses pinned CDN versions for reliability:
  - Tailwind Play CDN: https://cdn.tailwindcss.com/3.4.10
  - React 18.2.0 (UMD prod)
  - ReactDOM 18.2.0 (UMD prod)
  - Babel Standalone 7.25.9

## Files
- Enhanced Ultimate Chord App - shareable.html — open this in your browser.

## How to open locally
- Double-click the HTML file or drag it into a modern browser (Chrome, Edge, Safari, Firefox).
- If audio doesn’t play immediately, click anywhere or press a button first. Browsers block autoplay without user interaction.

## How to share (OneDrive / SharePoint)
- Upload the HTML file to a shared OneDrive/SharePoint folder.
- Share a view link with recipients.
- If OneDrive/SharePoint shows the HTML as text instead of rendering it, tell recipients to download and open it locally, or host it on a simple static site (e.g., GitHub Pages, Netlify, Vercel).

## Browser support notes
- The app relies on modern JavaScript, JSX (transpiled in the browser by Babel), and the Web Audio API.
- If something looks unstyled briefly, it’s Tailwind Play CDN compiling classes. It should resolve within a second.

## Offline caveats
- The HTML depends on internet access to fetch Tailwind, React, ReactDOM, and Babel from CDNs.
- For fully offline use, consider one of these:
  1) Replace CDNs with local copies:
     - Download the exact versions and host them locally (same folder or a local server) and update the <script> src URLs to local paths.
  2) Precompile JSX and Tailwind:
     - Move code into the Vite project, build once, and produce a dist folder. This removes the need for Babel in the browser and the Tailwind Play CDN. You’ll distribute the built assets.

## Known limitations
- Dynamic Tailwind classes: This app generates some Tailwind classes at runtime (e.g., gradient colors). The Play CDN config includes a safelist so those classes are available.
- Autoplay policy: Users must interact before sound is heard.

## Troubleshooting
- Blank or unstyled content:
  - Check network connectivity (CDN access).
  - Open DevTools → Console for errors.
- No sound:
  - Click or press any button to initialize audio.
  - Ensure system volume is on.

## Version locking
All external CDNs are pinned to specific versions for consistency. If you update versions, test in a browser and consider adding SRI only where supported and appropriate.
