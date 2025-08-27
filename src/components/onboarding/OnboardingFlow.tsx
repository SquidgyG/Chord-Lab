import React, { useState } from 'react'
import { useUserProfile } from '../../contexts/UserProfileContext'
import WelcomeTutorial from './WelcomeTutorial'

const OnboardingFlow: React.FC = () => {
  const { profile, setProfile } = useUserProfile()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [instrument, setInstrument] = useState<'guitar' | 'piano'>('guitar')
  const [confidence, setConfidence] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  const handleNext = () => {
    if (step === 2 && name.trim() === '') {
      alert('Please enter your name.')
      return
    }
    setStep(prev => prev + 1)
  }

  const handleFinish = () => {
    setProfile({
      name,
      instrument,
      confidenceLevel: confidence,
      onboardingComplete: true,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Welcome to Chord Lab!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Let's get you set up.</p>
            <button
              onClick={handleNext}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">What's your name?</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
            />
            <button
              onClick={handleNext}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">What's your instrument?</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setInstrument('guitar')}
                className={`w-full p-4 rounded-lg border-2 ${
                  instrument === 'guitar' ? 'border-blue-500' : ''
                }`}
              >
                Guitar
              </button>
              <button
                onClick={() => setInstrument('piano')}
                className={`w-full p-4 rounded-lg border-2 ${
                  instrument === 'piano' ? 'border-blue-500' : ''
                }`}
              >
                Piano
              </button>
            </div>
            <button
              onClick={handleNext}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">How confident are you?</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setConfidence('beginner')}
                className={`w-full p-3 rounded-lg border-2 ${
                  confidence === 'beginner' ? 'border-blue-500' : ''
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setConfidence('intermediate')}
                className={`w-full p-3 rounded-lg border-2 ${
                  confidence === 'intermediate' ? 'border-blue-500' : ''
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setConfidence('advanced')}
                className={`w-full p-3 rounded-lg border-2 ${
                  confidence === 'advanced' ? 'border-blue-500' : ''
                }`}
              >
                Advanced
              </button>
            </div>
            <button
              onClick={handleNext}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 5 && <WelcomeTutorial onFinish={handleFinish} />}
      </div>
    </div>
  )
}

export default OnboardingFlow
