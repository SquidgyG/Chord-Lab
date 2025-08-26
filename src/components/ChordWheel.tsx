import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getChordTheme } from '../utils/diagramTheme'

// Simple, responsive chord wheel with majors on outer ring and relative minors on inner ring
// Colors pulled from getChordTheme to ensure consistency with diagrams and archived palette

const MAJORS_ORDER = ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F']
const RELATIVE_MINORS = {
  C: 'Am',
  G: 'Em',
  D: 'Bm',
  A: 'F#m',
  E: 'C#m',
  B: 'G#m',
  'F#': 'D#m',
  Db: 'Bbm',
  Ab: 'Fm',
  Eb: 'Cm',
  Bb: 'Gm',
  F: 'Dm',
} as const

function polar(cx: number, cy: number, r: number, a: number) {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function ringSectorPath(r0: number, r1: number, a0: number, a1: number): string {
  const largeArc = a1 - a0 > Math.PI ? 1 : 0
  const [x0, y0] = polar(0, 0, r0, a0)
  const [x1, y1] = polar(0, 0, r1, a0)
  const [x2, y2] = polar(0, 0, r1, a1)
  const [x3, y3] = polar(0, 0, r0, a1)
  return [
    `M ${x1} ${y1}`,
    `A ${r1} ${r1} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${r0} ${r0} 0 ${largeArc} 0 ${x0} ${y0}`,
    'Z',
  ].join(' ')
}

export default function ChordWheel() {
  const size = 600
  const cx = size / 2
  const cy = size / 2
  const rOuter = 270
  const rMid = 200
  const rInner = 130

  const step = (Math.PI * 2) / 12

  const [selected, setSelected] = useState<string>('C')
  const [activeKey, setActiveKey] = useState<string>('C')
  const [hovered, setHovered] = useState<number | null>(null)
  const navigate = useNavigate()

  const items = useMemo(() => {
    return MAJORS_ORDER.map((maj, i) => {
      const a0 = -Math.PI / 2 + i * step
      const a1 = a0 + step
      const min = RELATIVE_MINORS[maj as keyof typeof RELATIVE_MINORS]
      return { maj, min, i, a0, a1 }
    })
  }, [step])

  const onSelect = (name: string) => setSelected(name)
  const majorKeys = MAJORS_ORDER

  // In a major key: I, IV, V majors; ii, iii, vi minors are commonly diatonic
  const diatonic = useMemo(() => {
    const idx = MAJORS_ORDER.indexOf(activeKey)
    if (idx === -1) return { majors: new Set<string>(), minors: new Set<string>() }
    const I = MAJORS_ORDER[idx]
    const V = MAJORS_ORDER[(idx + 1) % 12]
    const IV = MAJORS_ORDER[(idx + 12 - 1) % 12]
    const majors = new Set<string>([I, IV, V])
    const minors = new Set<string>([
      RELATIVE_MINORS[I as keyof typeof RELATIVE_MINORS],
      RELATIVE_MINORS[V as keyof typeof RELATIVE_MINORS],
      RELATIVE_MINORS[IV as keyof typeof RELATIVE_MINORS],
    ])
    return { majors, minors }
  }, [activeKey])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h2 className="text-xl font-bold text-gray-800">Chord Wheel</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Key</label>
          <select
            value={activeKey}
            onChange={(e) => setActiveKey(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-800"
          >
            {majorKeys.map((k) => (
              <option key={k} value={k}>{k} major</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[720px] h-auto">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Rings */}
            {items.map(({ maj, min, a0, a1, i }) => {
              const majColor = getChordTheme(maj).primary
              const minColor = getChordTheme(min).primary
              const outer = ringSectorPath(rMid, rOuter, a0, a1)
              const inner = ringSectorPath(rInner, rMid, a0, a1)
              const ac = (a0 + a1) / 2
              const [lxMaj, lyMaj] = polar(0, 0, (rMid + rOuter) / 2, ac)
              const [lxMin, lyMin] = polar(0, 0, (rInner + rMid) / 2, ac)
              const isDiaMaj = diatonic.majors.has(maj)
              const isDiaMin = diatonic.minors.has(min)
              const isHovered = hovered === i

              return (
                <g key={maj} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  {/* Major sector */}
                  <path
                    d={outer}
                    fill={majColor}
                    fillOpacity={isDiaMaj || isHovered ? 1 : 0.15}
                    stroke={isDiaMaj || isHovered ? '#111827' : '#111'}
                    strokeOpacity={isDiaMaj || isHovered ? 0.35 : 0.12}
                    strokeWidth={isDiaMaj || isHovered ? 2 : 1}
                    onClick={() => onSelect(maj)}
                    filter={isDiaMaj || isHovered ? 'url(#glow)' : undefined}
                    style={{ cursor: 'pointer', transition: 'all 120ms ease-out' }}
                  />
                  {/* Minor sector */}
                  <path
                    d={inner}
                    fill={minColor}
                    fillOpacity={isDiaMin || isHovered ? 1 : 0.15}
                    stroke={isDiaMin || isHovered ? '#111827' : '#111'}
                    strokeOpacity={isDiaMin || isHovered ? 0.35 : 0.12}
                    strokeWidth={isDiaMin || isHovered ? 2 : 1}
                    onClick={() => onSelect(min)}
                    filter={isDiaMin || isHovered ? 'url(#glow)' : undefined}
                    style={{ cursor: 'pointer', transition: 'all 120ms ease-out' }}
                  />

                  {/* Labels */}
                  <text
                    x={lxMaj}
                    y={lyMaj}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={18}
                    fontWeight={800}
                    fill="#0f172a"
                    opacity={isDiaMaj || isHovered ? 1 : 0.45}
                    style={{ pointerEvents: 'none' }}
                  >
                    {maj}
                  </text>
                  <text
                    x={lxMin}
                    y={lyMin}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={14}
                    fontWeight={800}
                    fill="#0f172a"
                    opacity={isDiaMin || isHovered ? 1 : 0.45}
                    style={{ pointerEvents: 'none' }}
                  >
                    {min}
                  </text>
                </g>
              )
            })}

            {/* Center readout */}
            <circle r={rInner - 18} fill="#ffffff" stroke="#e5e7eb" />
            <text textAnchor="middle" dominantBaseline="central" fontSize={24} fontWeight={800} fill="#111827">
              {selected}
            </text>
          </g>
        </svg>
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">In {activeKey} major</span>, highlighted sectors fit well: I, IV, V majors and ii, iii, vi minors.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate(`/practice?key=${encodeURIComponent(activeKey)}`)}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Practice in {activeKey}
          </button>
          <button
            onClick={() => navigate(`/practice?chord=${encodeURIComponent(selected)}`)}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
          >
            Practice {selected}
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Tip: Click a sector to select it. Outer ring = majors; inner ring = relative minors.
        </p>
      </div>
    </div>
  )
}
