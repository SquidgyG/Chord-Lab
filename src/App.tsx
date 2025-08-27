import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes, Navigate } from 'react-router-dom';

// --- Placeholder Contexts and Hooks ---
// In a real application, these would be in separate files.
// They are included here to make the App component runnable.

// Theme Context
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  // Add/remove 'dark' class from the root element when theme changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ClassroomMode Context
const ClassroomModeContext = createContext({
  classroomMode: false,
  toggleClassroomMode: () => {},
});
export const useClassroomMode = () => useContext(ClassroomModeContext);
const ClassroomModeProvider = ({ children }) => {
  const [classroomMode, setClassroomMode] = useState(false);
  const toggleClassroomMode = () => setClassroomMode(prev => !prev);
  return (
    <ClassroomModeContext.Provider value={{ classroomMode, toggleClassroomMode }}>
      {children}
    </ClassroomModeContext.Provider>
  );
};

// Progress Context
const ProgressContext = createContext({
  teacherUnlock: false,
  toggleTeacherUnlock: () => {},
});
export const useProgress = () => useContext(ProgressContext);
const ProgressProvider = ({ children }) => {
  const [teacherUnlock, setTeacherUnlock] = useState(false);
  const toggleTeacherUnlock = () => setTeacherUnlock(prev => !prev);
  return (
    <ProgressContext.Provider value={{ teacherUnlock, toggleTeacherUnlock }}>
      {children}
    </ProgressContext.Provider>
  );
};


// --- Placeholder Components ---
// In a real application, each of these would be in its own file.
const PlaceholderComponent = ({ name }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{name}</h1>
    <p className="text-gray-600 dark:text-gray-400">This is a placeholder component.</p>
  </div>
);

const Dashboard = () => <PlaceholderComponent name="Dashboard" />;
const ChordProgressionBuilder = () => <PlaceholderComponent name="Chord Progression Builder" />;
const PracticeMode = () => <PlaceholderComponent name="Practice Mode" />;
const Metronome = () => <PlaceholderComponent name="Metronome" />;
const LearningPathway = () => <PlaceholderComponent name="Learning Pathway" />;
const ChordWheel = () => <PlaceholderComponent name="Chord Wheel" />;
const ScrollingPractice = () => <PlaceholderComponent name="Scrolling Practice" />;
const ClassroomBoard = () => <PlaceholderComponent name="Classroom Board" />;
const DiagramQA = () => <PlaceholderComponent name="Diagram QA" />;


function AppContent() {
  // Initialize all state and context hooks
  const { classroomMode, toggleClassroomMode } = useClassroomMode();
  const { teacherUnlock, toggleTeacherUnlock } = useProgress();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Base styles for navigation links
  const linkBase = 'px-3 py-2 rounded-lg whitespace-nowrap';
  const linkActive = 'bg-blue-600 text-white';
  const linkIdle = 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800';

  // Merged navigation links from both branches
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
      <NavLink to="/practice/scrolling" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
        Scrolling
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
    </>
  );

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
            {/* Desktop navigation */}
            <nav className="hidden md:flex gap-2">{navLinks}</nav>
          </div>
          <div className="flex items-center gap-3">
            {/* Classroom Mode Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={classroomMode}
              onClick={toggleClassroomMode}
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                classroomMode
                  ? 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700'
                  : 'bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              title="Classroom Mode: larger text and higher contrast"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Classroom</span>
              <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${classroomMode ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`h-4 w-4 transform rounded-full bg-white shadow transition ${classroomMode ? 'translate-x-4' : 'translate-x-1'}`} />
              </span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${classroomMode ? 'bg-yellow-200 text-yellow-900 dark:bg-yellow-400 dark:text-yellow-900' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}>{classroomMode ? 'On' : 'Off'}</span>
            </button>

            {/* Teacher Unlock Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={teacherUnlock}
              onClick={toggleTeacherUnlock}
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                teacherUnlock
                  ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700'
                  : 'bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              title="Unlock all features for teacher demo/testing"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Teacher Unlock</span>
              <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${teacherUnlock ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`h-4 w-4 transform rounded-full bg-white shadow transition ${teacherUnlock ? 'translate-x-4' : 'translate-x-1'}`} />
              </span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${
                teacherUnlock
                  ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-400 dark:text-emerald-900'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${teacherUnlock ? 'bg-emerald-600' : 'bg-gray-500'}`} aria-hidden />
                {teacherUnlock ? 'On' : 'Off'}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-2 py-1 rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden px-2 py-1 rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-800 shadow-md absolute top-full left-0 right-0 z-10">
            <div className="flex flex-col gap-1 p-2">{navLinks}</div>
          </nav>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Merged Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<ChordProgressionBuilder />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/practice/scrolling" element={<ScrollingPractice />} />
          <Route path="/learn" element={<LearningPathway />} />
          <Route path="/classroom" element={<ClassroomBoard />} />
          <Route path="/wheel" element={<ChordWheel />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/qa/diagrams" element={<DiagramQA />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// This is the main export. It wraps the AppContent with necessary providers.
export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <ClassroomModeProvider>
          <ProgressProvider>
            <AppContent />
          </ProgressProvider>
        </ClassroomModeProvider>
      </ThemeProvider>
    </Router>
  );
}
