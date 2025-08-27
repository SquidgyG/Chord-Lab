export const MAJORS_ORDER = ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'] as const

export const RELATIVE_MINORS: Record<string, string> = {
  C: 'Am', G: 'Em', D: 'Bm', A: 'F#m', E: 'C#m', B: 'G#m', 'F#': 'D#m', Db: 'Bbm', Ab: 'Fm', Eb: 'Cm', Bb: 'Gm', F: 'Dm'
}

export function getDiatonicForKey(keyCenter: string) {
  const order = MAJORS_ORDER as readonly string[]
  const idx = order.indexOf(keyCenter)
  if (idx === -1) return { majors: [] as string[], minors: [] as string[] }
  const I = order[idx]
  const V = order[(idx + 1) % 12]
  const IV = order[(idx + 12 - 1) % 12]
  const majors = [I, IV, V]
  const minors = [RELATIVE_MINORS[I], RELATIVE_MINORS[V], RELATIVE_MINORS[IV]]
  return { majors, minors }
}
