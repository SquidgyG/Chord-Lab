// Why it exists: Central song library list for practice/reference.
// How to use: Import `songs` to display a library. User will curate 10 items.

export type Song = {
  id: string
  title: string
  key: string // e.g., 'C', 'G', 'F#'
  tempo: number // BPM
  link: string // URL to reference/playback
}

export const songs: Song[] = [
  // User to curate: 10 items with title, key, tempo, link.
  // Example placeholder:
  // { id: 'ex-1', title: 'Example Tune', key: 'C', tempo: 92, link: 'https://example.com' },
]

export default songs
