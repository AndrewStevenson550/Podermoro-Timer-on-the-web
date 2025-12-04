import React, { useState, useEffect, useRef } from 'react';

// Corrected constant: 25 minutes * 60 seconds * 1000 milliseconds
const INITIAL_TIME_MS = 25 * 60 * 1000;

// Helper function to format milliseconds into MM:SS
const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Use String.padStart to ensure "09" instead of "9"
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function Timer() {
  // Use the correct constant for initial state
  const [time, SetTime] = useState(INITIAL_TIME_MS);
  const [isRunning, setIsRunning] = useState(false);
  
  // useRef holds a mutable object that persists across renders. 
  // We store the setInterval ID here so we can clear it later.
  const intervalRef = useRef(null);

  // useEffect runs whenever isRunning changes. This is the timer's engine.
  useEffect(() => {
    if (isRunning) {
        // Start the countdown, updating time every 1000ms (1 second)
        intervalRef.current = setInterval(() => {
            // Use functional state update to ensure we always use the latest time value
            SetTime(prevTime => {
                const newTime = prevTime - 1000;

                // Stop condition: if time runs out
                if (newTime <= 0) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return 0;
                }
                return newTime;
            });
        }, 1000); // Interval runs every 1 second (1000ms)

        // Cleanup function: runs when the component unmounts or before the effect runs again
        return () => clearInterval(intervalRef.current);
    } 
    
    // If isRunning is false, ensure the interval is cleared too
    return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

  }, [isRunning]); // Dependency array: only re-run this effect when isRunning changes

  // Function to start the countdown
  function startTimer(){
    // If the timer is at 0, reset it before starting
    if (time === 0) SetTime(INITIAL_TIME_MS); 
    // Only start if it's not already running
    if (!isRunning) setIsRunning(true);
  }
  
  // Function to pause the countdown
  function stopTimer(){
    if (isRunning) setIsRunning(false);
  }

  // Function to reset the timer to 25:00
  function resetTimer() {
      stopTimer(); // Ensure it stops counting
      SetTime(INITIAL_TIME_MS);
  }

  return (
    <div className='bg-amber-100 border-black border rounded-lg pl-4 w-200 justify-center items-center ml-92'>
        {/* Display the formatted time MM:SS */}
        <h1 className=' text-center p-50'>{formatTime(time)}</h1>


        <div className="justify-center align-middle items-center">
          {/* Start/Pause Button */}
          <button 
            onClick={isRunning ? stopTimer : startTimer}
            className=' bg-green-500 cursor-pointer ml-89 mt-10 mb-0.5'
          >
            {isRunning ? 'Pause' : (time === 0 ? 'Restart' : 'Start')}
          </button>
          
          {/* Reset Button (Using original styling) */}
          <button 
            onClick={resetTimer}
            className=' bg-green-500 cursor-pointer ml-89 mt-10 mb-0.5'
          >
            Reset
          </button>
        </div>
    </div>
  )
}

export default Timer;