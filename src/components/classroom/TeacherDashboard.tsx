import React, { useEffect, useState } from 'react';
import usePracticeStatistics from '../../hooks/usePracticeStatistics';
import { useUserProfile } from '../../contexts/UserProfileContext';

interface StudentStats {
  name: string;
  totalPracticeTime: number;
  chordsPlayed: number;
  currentLevel: string;
}

const TeacherDashboard: React.FC = () => {
  const { totalPracticeTime, chordsPlayed } = usePracticeStatistics();
  const { profile } = useUserProfile();
  const [students, setStudents] = useState<StudentStats[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('studentPracticeStats');
    const data: Record<string, StudentStats> = stored ? JSON.parse(stored) : {};

    data[profile.name] = {
      name: profile.name,
      totalPracticeTime,
      chordsPlayed,
      currentLevel: profile.confidenceLevel,
    };

    localStorage.setItem('studentPracticeStats', JSON.stringify(data));
    setStudents(Object.values(data));
  }, [totalPracticeTime, chordsPlayed, profile]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const exportCSV = () => {
    const header = 'Name,Time Practiced (minutes),Chords Played,Current Level\n';
    const rows = students
      .map(s => `${s.name},${(s.totalPracticeTime / 60000).toFixed(2)},${s.chordsPlayed},${s.currentLevel}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'practice-stats.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Student Progress</h3>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left text-gray-700 dark:text-gray-200">
            <th className="pb-2">Student</th>
            <th className="pb-2">Time Practiced</th>
            <th className="pb-2">Chords Played</th>
            <th className="pb-2">Current Level</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.name} className="border-t border-gray-200 dark:border-gray-700">
              <td className="py-2 text-gray-900 dark:text-gray-100">{student.name}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">{formatTime(student.totalPracticeTime)}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">{student.chordsPlayed}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100 capitalize">{student.currentLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Export CSV
      </button>
    </div>
  );
};

export default TeacherDashboard;

