import { useState, useEffect } from 'preact/hooks';
import Modal from './Modal';

const recommendedIntakeOptions = [
  { label: 'Sedentary Adult (2.7L for women)', value: 2700 },
  { label: 'Sedentary Adult (3.7L for men)', value: 3700 },
  { label: 'Active Adult (3.0L for women)', value: 3000 },
  { label: 'Active Adult (4.0L for men)', value: 4000 },
];

export default function WaterTracker() {
  const [intake, setIntake] = useState(() => {
    const savedIntake = localStorage.getItem('intake');
    return savedIntake ? JSON.parse(savedIntake) : 0;
  });
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem('goal');
    return savedGoal ? JSON.parse(savedGoal) : 3700;
  });
  const [previousGoal, setPreviousGoal] = useState(() => {
    const savedPreviousGoal = localStorage.getItem('previousGoal');
    return savedPreviousGoal ? JSON.parse(savedPreviousGoal) : null;
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showManageData, setShowManageData] = useState(false);
  const [viewMode, setViewMode] = useState('summary');

  useEffect(() => {
    localStorage.setItem('intake', JSON.stringify(intake));
  }, [intake]);

  useEffect(() => {
    localStorage.setItem('goal', JSON.stringify(goal));
    if (goal !== previousGoal && previousGoal !== null) {
      localStorage.setItem('previousGoal', JSON.stringify(goal));
    }
  }, [goal, previousGoal]);

  const handleAddWater = (amount) => {
    if (amount <= 0) {
      setError('Invalid amount of water.');
      return;
    }

    setIntake((prev) => {
      const newIntake = Math.min(prev + amount, goal);
      if (newIntake >= goal) {
        setModalMessage('Congratulations You have reached your goal 🥳');
        setShowModal(true);
      }
      return newIntake;
    });
  };

  const handleSetGoal = (event) => {
    const newGoal = parseInt(event.target.value, 10);
    if (isNaN(newGoal) || newGoal <= 0) {
      setError('Please select a valid target.');
      return;
    }
    setPreviousGoal(goal);
    setGoal(newGoal);
    setIntake((prev) => Math.min(prev, newGoal));
    setError('');
  };

  {/* const handleReset = () => {
    setIntake(0);
    setError('');
  }; */}

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setIntake(0);
    setGoal(3700);
    setPreviousGoal(null);
    setError('');
    setShowManageData(false);
  };

  const getPercentage = () => {
    return ((intake / goal) * 100).toFixed(2);
  };

  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-300 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Today's Water Intake</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="text-2xl font-bold mb-4 text-center">
        {intake} / {goal} ml
      </div>
      <div className="text-2xl font-medium mb-4 text-center">
        {getPercentage()}% of your goal
      </div>
      <div className="relative mb-4">
        <label htmlFor="goal-select" className="block text-gray-700 mb-2 font-medium">
          Select your recommended intake:
        </label>
        <select
          onChange={handleSetGoal}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 transition-colors"
          value={goal}
        >
          <option value="" disabled>Select your recommended intake</option>
          {recommendedIntakeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 relative">
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-400"
            style={{ width: `${getPercentage()}%` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-medium">
          {getPercentage()}%
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors" onClick={() => handleAddWater(100)}>
          🔼 100ml
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors" onClick={() => handleAddWater(250)}>
          🔼 250ml
        </button>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-colors" onClick={() => handleAddWater(500)}>
          🔼 500ml
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors" onClick={() => handleAddWater(1500)}>
          🔼 1500ml
        </button>
      </div>
      {/* Reset Button <button className="bg-red-600 text-white w-full py-2 rounded-lg mt-4 shadow-md hover:bg-red-700 transition-colors" onClick={handleReset}>
        ⏹ Reset
      </button> */}
      <button className="bg-gray-600 text-white w-full py-2 rounded-lg mt-4 shadow-md hover:bg-gray-700 transition-colors" onClick={() => setShowManageData(!showManageData)}>
        📂 Manage Data
      </button>
      {showManageData && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Manage Data</h3>
            <br />
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setViewMode(viewMode === 'summary' ? 'detailed' : 'summary')}
            >
              {viewMode === 'summary' ? 'Switch to Detailed View' : 'Switch to Summary View'}
            </button>
          </div>
          {viewMode === 'summary' ? (
            <div>
              <p className="mb-2">Intake: {localStorage.getItem('intake') || '0'} ml</p>
              <p className="mb-2">Goal: {localStorage.getItem('goal') || '0'} ml</p>
            </div>
          ) : (
            <div>
              <p className="mb-2"><strong>Intake:</strong> {localStorage.getItem('intake') || '0'} ml</p>
              <p className="mb-2"><strong>Goal:</strong> {localStorage.getItem('goal') || '0'} ml</p>
              <p className="mb-2"><strong>Previous Goal:</strong> {localStorage.getItem('previousGoal') || 'None'}</p>
            </div>
          )}
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2 shadow-md hover:bg-red-700 transition-colors" onClick={handleClearLocalStorage}>
            ⏹ Reset
          </button>
        </div>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} message={modalMessage} />
    </div>
  );
}
