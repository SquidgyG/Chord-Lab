import { Link } from 'react-router-dom';
import { useState } from 'react';

const Dashboard = () => {
  // Sample data for quick practice
  const quickChords = [
    { name: 'C', guitar: [{ string: 2, fret: 1 }, { string: 4, fret: 2 }, { string: 5, fret: 3 }], piano: ['C4', 'E4', 'G4'] },
    { name: 'G', guitar: [{ string: 1, fret: 3 }, { string: 5, fret: 2 }, { string: 6, fret: 3 }], piano: ['G3', 'B3', 'D4'] },
    { name: 'Am', guitar: [{ string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 2 }], piano: ['A3', 'C4', 'E4'] },
    { name: 'F', guitar: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 }], piano: ['F3', 'A3', 'C4'] }
  ];
  
  const getInitial = (key: string) =>
    typeof window !== 'undefined' && localStorage.getItem(key) === 'true';

  const [toolsOpen, setToolsOpen] = useState(() => getInitial('dashboard-tools-open'));
  const [quickOpen, setQuickOpen] = useState(() => getInitial('dashboard-quick-open'));
  const [wheelOpen, setWheelOpen] = useState(() => getInitial('dashboard-wheel-open'));
  const [statsOpen, setStatsOpen] = useState(() => getInitial('dashboard-stats-open'));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to Chord Lab
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Choose a section below to get started
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Link
              to="/practice"
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
              <span className="text-4xl mb-2">🎸</span>
              <span className="text-xl font-semibold">Practice</span>
            </Link>
            <Link
              to="/learn"
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <span className="text-4xl mb-2">📘</span>
              <span className="text-xl font-semibold">Learn</span>
            </Link>
          </div>

          <details
            open={toolsOpen}
            onToggle={(e) => {
              const isOpen = e.currentTarget.open;
              setToolsOpen(isOpen);
              if (typeof window !== 'undefined') {
                localStorage.setItem('dashboard-tools-open', String(isOpen));
              }
            }}
            className="mt-4"
          >
            <summary className="cursor-pointer text-gray-800 dark:text-gray-100">
              More Tools
            </summary>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                to="/create"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Chord Builder
              </Link>
              <Link
                to="/practice/scrolling"
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                Scrolling
              </Link>
              <Link
                to="/metronome"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
              >
                Metronome
              </Link>
            </div>
          </details>
        </div>

        {/* Quick Practice */}
        <details
          open={quickOpen}
          onToggle={(e) => {
            const isOpen = e.currentTarget.open;
            setQuickOpen(isOpen);
            if (typeof window !== 'undefined') {
              localStorage.setItem('dashboard-quick-open', String(isOpen));
            }
          }}
          className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 mb-6"
        >
          <summary className="cursor-pointer text-xl font-bold text-gray-800 dark:text-gray-100 open:mb-4">
            Quick Practice
          </summary>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {quickChords.map((chord, index) => (
              <Link
                key={index}
                to={`/practice?chord=${encodeURIComponent(chord.name)}`}
                className="p-4 bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <div className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                  {chord.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Click to practice
                </div>
              </Link>
            ))}
          </div>
        </details>

        {/* Chord Wheel Preview */}
        <details
          open={wheelOpen}
          onToggle={(e) => {
            const isOpen = e.currentTarget.open;
            setWheelOpen(isOpen);
            if (typeof window !== 'undefined') {
              localStorage.setItem('dashboard-wheel-open', String(isOpen));
            }
          }}
          className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 mb-6"
        >
          <summary className="cursor-pointer text-xl font-bold text-gray-800 dark:text-gray-100 open:mb-4">
            Chord Wheel
          </summary>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                See which chords fit in a key. Explore majors and their relative minors.
              </p>
            </div>
            <Link
              to="/wheel"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
            >
              Open Wheel
            </Link>
          </div>
          <div className="mt-4 flex justify-center">
            {/* simple static mini wheel */}
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <g transform="translate(100,100)">
                <circle r="80" fill="#fff" className="dark:fill-gray-700" stroke="#e5e7eb" strokeWidth="2" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = -Math.PI / 2 + (Math.PI * 2 / 12) * i;
                  const x = Math.cos(angle) * 80,
                    y = Math.sin(angle) * 80;
                  return (
                    <line
                      key={i}
                      x1={0}
                      y1={0}
                      x2={x}
                      y2={y}
                      stroke="#e5e7eb"
                      className="dark:stroke-gray-600"
                      strokeWidth={1.5}
                    />
                  );
                })}
                <circle r="55" fill="#f9fafb" className="dark:fill-gray-800" stroke="#e5e7eb" strokeWidth="1" />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#374151"
                  className="dark:fill-gray-300"
                  fontWeight={700}
                >
                  Chord Wheel
                </text>
              </g>
            </svg>
          </div>
        </details>

        {/* Stats */}
        <details
          open={statsOpen}
          onToggle={(e) => {
            const isOpen = e.currentTarget.open;
            setStatsOpen(isOpen);
            if (typeof window !== 'undefined') {
              localStorage.setItem('dashboard-stats-open', String(isOpen));
            }
          }}
          className="mb-6"
        >
          <summary className="cursor-pointer text-xl font-bold text-gray-800 dark:text-gray-100 open:mb-4">
            Stats
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-4">
                  <span className="text-2xl">🎸</span>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Chords Learned</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">24</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg mr-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Practice Time</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">12.5h</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Achievements</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">8</p>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Dashboard;
