import useMetronome from '../../hooks/useMetronome';

const Metronome = () => {
  const [{ isPlaying, bpm, beat, beatsPerMeasure }, { start, stop, setBpm, setBeatsPerMeasure }] = useMetronome(120, 4);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Metronome</h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="text-5xl font-bold text-blue-600 mb-4">
          {bpm} <span className="text-xl text-gray-500">BPM</span>
        </div>
        
        <div className="flex space-x-2 mb-6">
          {Array.from({ length: beatsPerMeasure }).map((_, index) => (
            <div 
              key={index}
              className={`w-4 h-4 rounded-full ${index === beat ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        
        <div className="w-full max-w-xs mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempo: {bpm} BPM
          </label>
          <input 
            type="range" 
            min="40" 
            max="240" 
            value={bpm} 
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-full"
            disabled={isPlaying}
          />
        </div>
        
        <div className="w-full max-w-xs mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beats per measure: {beatsPerMeasure}
          </label>
          <input 
            type="range" 
            min="2" 
            max="8" 
            value={beatsPerMeasure} 
            onChange={(e) => setBeatsPerMeasure(parseInt(e.target.value))}
            className="w-full"
            disabled={isPlaying}
          />
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        {!isPlaying ? (
          <button 
            onClick={start}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            <span className="mr-2">▶</span> Start
          </button>
        ) : (
          <button 
            onClick={stop}
            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center"
          >
            <span className="mr-2">⏹</span> Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default Metronome;
