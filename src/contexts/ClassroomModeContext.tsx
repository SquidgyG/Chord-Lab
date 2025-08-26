/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ClassroomModeContextValue = {
  classroomMode: boolean;
  setClassroomMode: (v: boolean) => void;
  toggleClassroomMode: () => void;
};

const ClassroomModeContext = createContext<ClassroomModeContextValue | undefined>(undefined);

export function ClassroomModeProvider({ children }: { children: React.ReactNode }) {
  const [classroomMode, setClassroomMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('classroomMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      // ignore localStorage read errors
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('classroomMode', JSON.stringify(classroomMode));
    } catch {
      // ignore localStorage write errors
      void 0;
    }
  }, [classroomMode]);

  const value = useMemo(
    () => ({
      classroomMode,
      setClassroomMode,
      toggleClassroomMode: () => setClassroomMode(v => !v),
    }),
    [classroomMode]
  );

  return (
    <ClassroomModeContext.Provider value={value}>
      {children}
    </ClassroomModeContext.Provider>
  );
}

export function useClassroomMode() {
  const ctx = useContext(ClassroomModeContext);
  if (!ctx) throw new Error('useClassroomMode must be used within ClassroomModeProvider');
  return ctx;
}
