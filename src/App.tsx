import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ChordProgressionBuilder from './components/chord-builder/ChordProgressionBuilder'
import PracticeMode from './components/practice-mode/PracticeMode'
import Metronome from './components/practice-mode/Metronome'
import LearningPathway from './components/learning-path/LearningPathway'
import { useClassroomMode } from './contexts/ClassroomModeContext'
import { useProgress } from './contexts/ProgressContext'
import ChordWheel from './components/ChordWheel'
import ClassroomBoard from './components/classroom/ClassroomBoard'

function App() {
  const { classroomMode, toggleClassroomMode } = useClassroomMode()
  const { teacherUnlock, toggleTeacherUnlock } = useProgress()

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
              <NavLink to="/classroom" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Classroom
              </NavLink>
              <NavLink to="/wheel" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Chord Wheel
              </NavLink>
              <NavLink to="/metronome" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                Metronome
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {/* Classroom Mode Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={classroomMode}
              onClick={toggleClassroomMode}
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${classroomMode ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              title="Classroom Mode: larger text and higher contrast"
            >
              <span className="text-sm font-medium text-gray-800">Classroom</span>
              <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${classroomMode ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                <span className={`h-4 w-4 transform rounded-full bg-white shadow transition ${classroomMode ? 'translate-x-4' : 'translate-x-1'}`} />
              </span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${classroomMode ? 'bg-yellow-200 text-yellow-900' : 'bg-gray-100 text-gray-700'}`}>{classroomMode ? 'On' : 'Off'}</span>
            </button>

            {/* Teacher Unlock Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={teacherUnlock}
              onClick={toggleTeacherUnlock}
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${teacherUnlock ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              title="Unlock all features for teacher demo/testing"
            >
              <span className="text-sm font-medium text-gray-800">Teacher Unlock</span>
              <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${teacherUnlock ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                <span className={`h-4 w-4 transform rounded-full bg-white shadow transition ${teacherUnlock ? 'translate-x-4' : 'translate-x-1'}`} />
              </span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${teacherUnlock ? 'bg-emerald-200 text-emerald-900' : 'bg-gray-100 text-gray-700'}`}>
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${teacherUnlock ? 'bg-emerald-600' : 'bg-gray-500'}`} aria-hidden />
                {teacherUnlock ? 'On' : 'Off'}
              </span>
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
          <Route path="/classroom" element={<ClassroomBoard />} />
          <Route path="/wheel" element={<ChordWheel />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
