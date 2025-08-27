import { useState } from 'react'
import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ChordProgressionBuilder from './components/chord-builder/ChordProgressionBuilder'
import PracticeMode from './components/practice-mode/PracticeMode'
import Metronome from './components/practice-mode/Metronome'
import LearningPathway from './components/learning-path/LearningPathway'
import { useClassroomMode } from './contexts/ClassroomModeContext'
import ChordWheel from './components/ChordWheel'
import { useTheme } from './contexts/ThemeContext'
import ScrollingPractice from './components/practice-mode/ScrollingPractice'

function App() {
  const { classroomMode, toggleClassroomMode } = useClassroomMode()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const linkBase = 'px-3 py-2 rounded-lg whitespace-nowrap'
  const linkActive = 'bg-blue-600 text-white'
  const linkIdle = 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'

  const navLinks = (
    <>
      <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
        Home
      </NavLink>
      <NavLink to="/create" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
        Chord Builder
      </NavLink>
      <NavLink to="/practice" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
        Practice
      </NavLink>
      <NavLink
        to="/practice/scrolling"
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
      >
        Scrolling
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
    </>
  )

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 ${
        classroomMode ? 'text-[110%] contrast-125' : ''
      }`}
    >
      <header className="bg-white dark:bg-gray-900/80 dark:border-b dark:border-gray-700 shadow-sm relative backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-xl text-gray-900 dark:text-gray-100">
              Chord Lab
            </span>
            <nav className="hidden md:flex gap-2">{navLinks}</nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleClassroomMode}
              className={`px-3 py-2 rounded-lg border ${
                classroomMode
                  ? 'bg-yellow-100 border-yellow-300 text-yellow-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              title="Classroom Mode: larger text and higher contrast"
            >
              {classroomMode ? 'Classroom: On' : 'Classroom: Off'}
            </button>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-2 py-1 rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                // sun icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                // moon icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden px-2 py-1 rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-800 shadow-md absolute top-full left-0 right-0 z-10">
            <div className="flex flex-col gap-1 p-2">{navLinks}</div>
          </nav>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<ChordProgressionBuilder />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/practice/scrolling" element={<ScrollingPractice />} />
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
