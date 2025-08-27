import React, { createContext, useContext, useState, useEffect } from 'react';

type Instrument = 'guitar' | 'piano';
type ConfidenceLevel = 'beginner' | 'intermediate' | 'advanced';

interface UserProfile {
  name: string;
  instrument: Instrument;
  confidenceLevel: ConfidenceLevel;
  onboardingComplete: boolean;
}

interface UserProfileContextValue {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: 'Guest',
  instrument: 'guitar',
  confidenceLevel: 'beginner',
  onboardingComplete: false,
};

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const setProfile = (newProfileData: Partial<UserProfile>) => {
    setProfileState((prev) => ({ ...prev, ...newProfileData }));
  };

  const value = { profile, setProfile };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
