import React, { useState, useEffect, useMemo } from 'react';
import type { PracticeSession } from './PracticeRecorder';

interface PracticeAnalyticsProps {
  className?: string;
}

// Interface for analytics data (used implicitly in useMemo)
// interface AnalyticsData {
//   totalSessions: number;
//   totalPracticeTime: number;
//   averageSessionLength: number;
//   totalChords: number;
//   uniqueChords: number;
//   averageAccuracy: number;
//   improvementTrend: number;
//   favoriteChords: { chord: string; count: number }[];
//   weeklyProgress: { date: string; duration: number; chords: number }[];
// }

const PracticeAnalytics: React.FC<PracticeAnalyticsProps> = ({ className = '' }) => {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const loadSessions = () => {
      const saved = localStorage.getItem('practice_sessions');
      if (saved) {
        setSessions(JSON.parse(saved));
      }
    };

    loadSessions();
    
    // Listen for storage changes (new sessions)
    const handleStorageChange = () => loadSessions();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const analytics = useMemo(() => {
    const now = Date.now();
    const timeframes = {
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      all: Infinity,
    };

    const filteredSessions = sessions.filter(
      session => now - session.startTime <= timeframes[selectedTimeframe]
    );

    if (filteredSessions.length === 0) {
      return {
        totalSessions: 0,
        totalPracticeTime: 0,
        averageSessionLength: 0,
        totalChords: 0,
        uniqueChords: 0,
        averageAccuracy: 0,
        improvementTrend: 0,
        favoriteChords: [],
        weeklyProgress: [],
      };
    }

    const totalPracticeTime = filteredSessions.reduce((sum, s) => sum + s.totalDuration, 0);
    const totalChords = filteredSessions.reduce((sum, s) => sum + s.summary.totalChords, 0);
    const averageAccuracy = filteredSessions.reduce((sum, s) => sum + s.summary.averageAccuracy, 0) / filteredSessions.length;

    // Calculate improvement trend (comparing first half to second half of sessions)
    const midPoint = Math.floor(filteredSessions.length / 2);
    const firstHalf = filteredSessions.slice(0, midPoint);
    const secondHalf = filteredSessions.slice(midPoint);
    
    const firstHalfAccuracy = firstHalf.length > 0 
      ? firstHalf.reduce((sum, s) => sum + s.summary.averageAccuracy, 0) / firstHalf.length 
      : 0;
    const secondHalfAccuracy = secondHalf.length > 0 
      ? secondHalf.reduce((sum, s) => sum + s.summary.averageAccuracy, 0) / secondHalf.length 
      : 0;
    
    const improvementTrend = secondHalfAccuracy - firstHalfAccuracy;

    // Count chord usage
    const chordCounts: { [chord: string]: number } = {};
    filteredSessions.forEach(session => {
      session.events
        .filter(event => event.type === 'chord_played' && event.data.chordName)
        .forEach(event => {
          const chord = event.data.chordName!;
          chordCounts[chord] = (chordCounts[chord] || 0) + 1;
        });
    });

    const favoriteChords = Object.entries(chordCounts)
      .map(([chord, count]) => ({ chord, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Weekly progress (last 7 days)
    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now - (6 - i) * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      
      const daySessions = sessions.filter(s => s.startTime >= dayStart && s.startTime < dayEnd);
      const duration = daySessions.reduce((sum, s) => sum + s.totalDuration, 0);
      const chords = daySessions.reduce((sum, s) => sum + s.summary.totalChords, 0);
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        duration: Math.round(duration / 60000), // Convert to minutes
        chords,
      };
    });

    return {
      totalSessions: filteredSessions.length,
      totalPracticeTime,
      averageSessionLength: totalPracticeTime / filteredSessions.length,
      totalChords,
      uniqueChords: new Set(Object.keys(chordCounts)).size,
      averageAccuracy,
      improvementTrend,
      favoriteChords,
      weeklyProgress,
    };
  }, [sessions, selectedTimeframe]);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const formatPercentage = (value: number) => `${Math.round(value * 100)}%`;

  if (sessions.length === 0) {
    return (
      <div className={`practice-analytics ${className}`}>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No Practice Data Yet</h3>
            <p>Start practicing to see your analytics and progress!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`practice-analytics ${className}`}>
      {/* Header with timeframe selector */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Analytics</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          {(['week', 'month', 'all'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {timeframe === 'all' ? 'All Time' : `Past ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-blue-600">{analytics.totalSessions}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-green-600">{formatDuration(analytics.totalPracticeTime)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-purple-600">{analytics.totalChords}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chords Played</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-orange-600">{formatPercentage(analytics.averageAccuracy)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Progress</h3>
          <div className="space-y-3">
            {analytics.weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                  {day.date}
                </span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((day.duration / 60) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                  {day.duration}m
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Chords */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Most Practiced Chords</h3>
          <div className="space-y-3">
            {analytics.favoriteChords.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.chord}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((item.count / Math.max(...analytics.favoriteChords.map(c => c.count))) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvement indicator */}
      {analytics.improvementTrend !== 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Recent Improvement:</span>
            <span className={`font-semibold ${analytics.improvementTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.improvementTrend > 0 ? '↗' : '↘'} {formatPercentage(Math.abs(analytics.improvementTrend))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeAnalytics;