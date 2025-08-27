# Add Student Help resources + Help button

**Summary**
- Adds `docs/Student-Help-Video-Basics.md` with curated beginner videos, tutorials, and original song references (tagged with Key / Capo / Progression).
- Adds `docs/HELP-LINKS.json` for programmatic use (e.g., hint panels, filters by progression).
- Adds `src/components/HelpButton.tsx` (opens the help doc in a new tab).

**Why**
Matches core app features (progression builder, practice mode, metronome) and advanced skills (chord wheel, roman numerals, ear training). Helps learners bridge theory and real songs quickly.

**How to wire the button**
1) Import `HelpButton` in your top-level layout/nav:
```tsx
import HelpButton from "./components/HelpButton";
```
2) Render in your top bar:
```tsx
<div className="flex items-center gap-2">
  <HelpButton />
</div>
```

**QA checklist**
- [ ] Button visible on main screen
- [ ] Opens in new tab
- [ ] Links work (no 404s)
- [ ] Markdown doc readable on mobile
- [ ] No console errors
- [ ] Optional: host a `/help` route and render the markdown inside the app
