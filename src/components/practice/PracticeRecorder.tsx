import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface PracticeEvent {
  timestamp: number;
  type: 'chord_change' | 'chord_played' | 'tempo_change' | 'pause' | 'resume';
  data: {
    chordName?: string;
    bpm?: number;
    duration?: number;
    accuracy?: number;
  };
}

export interface PracticeSession {
  id: string;
  startTime: number;
  endTime?: number;
  totalDuration: number;
  events: PracticeEvent[];
  summary: {
    totalChords: number;
    uniqueChords: number;
    averageAccuracy: number;
    longestStreak: number;
    chordsPerMinute: number;
  };
}

interface PracticeRecorderProps {
  isActive: boolean;
  onSessionComplete?: (session: PracticeSession) => void;
  children: (recorder: {
    recordChordChange: (chordName: string) => void;
    recordChordPlayed: (chordName: string, accuracy?: number) => void;
    recordTempoChange: (bpm: number) => void;
    recordPause: () => void;
    recordResume: () => void;
    currentSession: PracticeSession | null;
    sessionDuration: number;
  }) => React.ReactNode;
}

const PracticeRecorder: React.FC<PracticeRecorderProps> = ({
  isActive,
  onSessionComplete,
  children,
}) => {
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const eventsRef = useRef<PracticeEvent[]>([]);

  const startSession = useCallback(() => {
    const session: PracticeSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startTime: Date.now(),
      totalDuration: 0,
      events: [],
      summary: {
        totalChords: 0,
        uniqueChords: 0,
        averageAccuracy: 0,
        longestStreak: 0,
        chordsPerMinute: 0,
      },
    };

    setCurrentSession(session);
    eventsRef.current = [];
    setSessionDuration(0);
  }, []);

  const endSession = useCallback(() => {
    if (!currentSession) return;

    const endTime = Date.now();
    const totalDuration = endTime - currentSession.startTime;
    
    // Calculate session summary
    const chordEvents = eventsRef.current.filter(e => e.type === 'chord_played');
    const uniqueChords = new Set(chordEvents.map(e => e.data.chordName)).size;
    const totalAccuracy = chordEvents.reduce((sum, e) => sum + (e.data.accuracy ?? 0), 0);
    const averageAccuracy = chordEvents.length > 0 ? totalAccuracy / chordEvents.length : 0;
    
    // Calculate longest streak (consecutive successful chord changes)
    let currentStreak = 0;
    let longestStreak = 0;
    chordEvents.forEach(event => {
      if ((event.data.accuracy ?? 0) > 0.7) { // Consider 70%+ as successful
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    const chordsPerMinute = chordEvents.length / (totalDuration / 60000);

    const completedSession: PracticeSession = {
      ...currentSession,
      endTime,
      totalDuration,
      events: [...eventsRef.current],
      summary: {
        totalChords: chordEvents.length,
        uniqueChords,
        averageAccuracy,
        longestStreak,
        chordsPerMinute,
      },
    };

    // Save to localStorage
    const savedSessions = JSON.parse(localStorage.getItem('practice_sessions') ?? '[]') as PracticeSession[];
    savedSessions.push(completedSession);
    localStorage.setItem('practice_sessions', JSON.stringify(savedSessions.slice(-50))); // Keep last 50 sessions

    setCurrentSession(null);
    setSessionDuration(0);
    eventsRef.current = [];

    onSessionComplete?.(completedSession);
  }, [currentSession, onSessionComplete]);

  const recordEvent = useCallback((event: PracticeEvent) => {
    if (!currentSession) return;
    eventsRef.current.push(event);
  }, [currentSession]);

  const recordChordChange = useCallback((chordName: string) => {
    recordEvent({
      timestamp: Date.now(),
      type: 'chord_change',
      data: { chordName },
    });
  }, [recordEvent]);

  const recordChordPlayed = useCallback((chordName: string, accuracy = 1.0) => {
    recordEvent({
      timestamp: Date.now(),
      type: 'chord_played',
      data: { chordName, accuracy },
    });
  }, [recordEvent]);

  const recordTempoChange = useCallback((bpm: number) => {
    recordEvent({
      timestamp: Date.now(),
      type: 'tempo_change',
      data: { bpm },
    });
  }, [recordEvent]);

  const recordPause = useCallback(() => {
    recordEvent({
      timestamp: Date.now(),
      type: 'pause',
      data: {},
    });
  }, [recordEvent]);

  const recordResume = useCallback(() => {
    recordEvent({
      timestamp: Date.now(),
      type: 'resume',
      data: {},
    });
  }, [recordEvent]);

  // Start/stop session based on isActive prop
  useEffect(() => {
    if (isActive && !currentSession) {
      startSession();
    } else if (!isActive && currentSession) {
      endSession();
    }
  }, [isActive, currentSession, startSession, endSession]);

  // Update session duration
  useEffect(() => {
    if (currentSession && isActive) {
      intervalRef.current = setInterval(() => {
        setSessionDuration(Date.now() - currentSession.startTime);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSession, isActive]);

  return (
    <>
      {children({
        recordChordChange,
        recordChordPlayed,
        recordTempoChange,
        recordPause,
        recordResume,
        currentSession,
        sessionDuration,
      })}
    </>
  );
};

export default PracticeRecorder;