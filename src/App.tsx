import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ChordProgressionBuilder from './components/chord-builder/ChordProgressionBuilder'
import PracticeMode from './components/practice-mode/PracticeMode'
import Metronome from './components/practice-mode/Metronome'
import LearningPathway from './components/learning-path/LearningPathway'
import { useClassroomMode } from './contexts/ClassroomModeContext'
import ChordWheel from './components/ChordWheel'

function App() {
  const { classroomMode, toggleClassroomMode } = useClassroomMode()

  const linkBase = 'px-3 py-2 rounded-lg whitespace-nowrap'
  const linkActive = 'bg-blue-600 text-white'
  const linkIdle = 'text-gray-700 hover:bg-gray-100'

  return (
    <div className={`min-h-screen ${classroomMode ? 'text-[110%] contrast-125' : ''}`}>
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-xl text-gray-900">Chord Lab</span>
            <nav className="flex gap-2 overflow-x-auto">
              <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Home
              </NavLink>
              <NavLink to="/create" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Chord Builder
              </NavLink>
              <NavLink to="/practice" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Practice
              </NavLink>
              <NavLink to="/learn" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Learn
              </NavLink>
              <NavLink to="/wheel" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Chord Wheel
              </NavLink>
              <NavLink to="/metronome" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Metronome
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleClassroomMode}
              className={`px-3 py-2 rounded-lg border ${classroomMode ? 'bg-yellow-100 border-yellow-300 text-yellow-900' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              title="Classroom Mode: larger text and higher contrast"
            >
              {classroomMode ? 'Classroom: On' : 'Classroom: Off'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<ChordProgressionBuilder />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/learn" element={<LearningPathway />} />
          <Route path="/wheel" element={<ChordWheel />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
