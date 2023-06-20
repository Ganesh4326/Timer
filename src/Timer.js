import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react';
import './timerstyles.css'

const Timer = () => {
  const [animatedPercentage, setAnimatedPercentage] = useState(100);
  const [remainingSeconds, setRemainingSeconds] = useState(59);
  const animationDuration = 60000; // 60 seconds

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimatedPercentage((prevPercentage) => prevPercentage - 1);
    }, 1000);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [animatedPercentage]);

  useEffect(() => {
    const timeTimeout = setTimeout(() => {
      if(remainingSeconds>=1)
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(timeTimeout);
    };
  }, [remainingSeconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleButtonClick = () => {
    if(remainingSeconds!=0 && remainingSeconds<=49)
    setAnimatedPercentage((prevPercentage)=>prevPercentage+18.2)
    setRemainingSeconds((prevSeconds) => (prevSeconds < 50 ? prevSeconds + 10 : prevSeconds));
  };

  const handleButtonClickD = () => {
    if(remainingSeconds!=0 && remainingSeconds>=10){
    setAnimatedPercentage((prevPercentage)=>prevPercentage-18.2)
    setRemainingSeconds((prevSeconds) => (prevSeconds >=10 ? prevSeconds - 10 : prevSeconds));
    }
  };

  const handleButtonClickS = () => {
    setAnimatedPercentage(0);
    setRemainingSeconds(0);
  };

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <CircularProgressbar
        value={animatedPercentage}
        text={formatTime(remainingSeconds)}
        styles={buildStyles({
          pathColor: '#800080', // Purple color
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
          pathTransitionDuration: 0, // Disable path transition
        })}
      />
      <button className='sub-t1' onClick={handleButtonClick}>+ 10 sec</button>
      <button className='sub-t2' onClick={handleButtonClickD}>- 10 sec</button>
      <button className='sub-t3' onClick={handleButtonClickS}>skip</button>
    </div>
  );
};

export default Timer;
