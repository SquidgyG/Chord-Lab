import React from 'react';

interface WelcomeTutorialProps {
  onFinish: () => void;
}

const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onFinish }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Tour</h2>
      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        <p>Welcome to Chord Lab! Here are a few tips to get you started:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Use the <strong className="text-blue-500">Chord Builder</strong> to create your own chord progressions.
          </li>
          <li>
            The <strong className="text-purple-500">Practice</strong> section is where you can work on your timing and chord changes.
          </li>
          <li>
            Explore the <strong className="text-emerald-500">Learning Pathway</strong> for a guided, step-by-step learning experience.
          </li>
          <li>
            Use the <strong className="text-gray-500">Theme Toggle</strong> in the header to switch between light and dark modes.
          </li>
        </ul>
        <p>Ready to get started?</p>
      </div>
      <button onClick={onFinish} className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Let's Go!
      </button>
    </div>
  );
};

export default WelcomeTutorial;
