import { useEffect, useMemo, useRef, useState } from 'react'
import GuitarDiagram from '../diagrams/GuitarDiagram'
import PianoDiagram from '../diagrams/PianoDiagram'
import { chordData, titleForArchivedCharts } from '../../data/basicChords'

// Hidden QA page to compare current React diagrams vs archived HTML charts
// Not linked from the main nav. Route: /qa/diagrams (HashRouter)

type Instrument = 'guitar' | 'piano'

const DiagramQA = () => {
  const [instrument, setInstrument] = useState<Instrument>('guitar')
  const [selectedName, setSelectedName] = useState<string>(chordData[0]?.name ?? 'C')

  const selectedChord = useMemo(() => chordData.find(c => c.name === selectedName)!, [selectedName])
  const targetTitle = useMemo(() => titleForArchivedCharts(selectedName), [selectedName])

  // Build iframe src using Vite base to work on GitHub Pages + dev
  const base = import.meta.env.BASE_URL || '/'
  const iframeSrc = instrument === 'guitar'
    ? `${base}archive/guitar_chord_charts_v14_20pct_bigger_OX.html`
    : `${base}archive/piano_chord_charts_a4_2.html`

  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Scroll the iframe to the chord section header matching targetTitle
  const scrollIframeToTitle = () => {
    const iframe = iframeRef.current
    if (!iframe) return
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (!doc) return
      const headers = Array.from(doc.querySelectorAll('h1.title')) as HTMLElement[]
      const match = headers.find(h => (h.textContent || '').trim().toLowerCase() === targetTitle.toLowerCase())
      if (match) {
        match.scrollIntoView({ block: 'center' })
        // Optional highlight flash for visibility
        const orig = match.style.backgroundColor
        match.style.backgroundColor = 'rgba(255, 235, 59, 0.35)'
        setTimeout(() => { match.style.backgroundColor = orig }, 600)
      }
    } catch (e) {
      // Cross-origin or other access issues; should not happen if served from public/
      // Intentionally no-op to keep QA page usable
    }
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const onLoad = () => {
      // Delay slightly to allow styles/layout to settle
      setTimeout(scrollIframeToTitle, 50)
    }

    iframe.addEventListener('load', onLoad)
    // If already loaded (navigating within same src), attempt scroll
    setTimeout(scrollIframeToTitle, 100)

    return () => iframe.removeEventListener('load', onLoad)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrument, targetTitle])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Diagrams QA</h2>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Instrument</label>
          <select
            value={instrument}
            onChange={e => setInstrument(e.target.value as Instrument)}
            className="border rounded px-2 py-1"
          >
            <option value="guitar">Guitar</option>
            <option value="piano">Piano</option>
          </select>

          <label className="text-sm text-gray-600">Chord</label>
          <select
            value={selectedName}
            onChange={e => setSelectedName(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {chordData.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={scrollIframeToTitle}
            className="ml-2 text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            title="Retry scroll inside the archived chart"
          >
            Re-scroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">React Diagram</h3>
          {instrument === 'guitar' ? (
            <GuitarDiagram
              chordName={selectedChord.name}
              positions={selectedChord.guitarPositions}
              fingers={selectedChord.guitarFingers}
            />
          ) : (
            <PianoDiagram
              chordName={selectedChord.name}
              notes={selectedChord.pianoNotes}
            />
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
            Archived Chart
            <span className="text-xs text-gray-500">{targetTitle}</span>
          </h3>
          <div className="rounded-xl overflow-hidden border">
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              title="Archived Chord Charts"
              className="w-full h-[80vh] bg-white"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Source: {instrument === 'guitar' ? 'guitar_chord_charts_v14_20pct_bigger_OX.html' : 'piano_chord_charts_a4_2.html'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DiagramQA
