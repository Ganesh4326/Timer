import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react';
import './timerstyles.css'
import { FaClock } from "react-icons/fa";

const Timer = () => {
  const [animatedPercentage, setAnimatedPercentage] = useState(100);
  const [remainingSeconds, setRemainingSeconds] = useState(59);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimatedPercentage((prevPercentage) => prevPercentage - 1.78);
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
    if(remainingSeconds>=0 && remainingSeconds<=49 )
    setAnimatedPercentage((prevPercentage)=>prevPercentage+16.8)
    setRemainingSeconds((prevSeconds) => (prevSeconds < 50 ? prevSeconds + 10 : prevSeconds));
  };

  const handleButtonClickD = () => {
    if(remainingSeconds!=0 && remainingSeconds>=10){
    setAnimatedPercentage((prevPercentage)=>prevPercentage-16.8)
    setRemainingSeconds((prevSeconds) => (prevSeconds >=10 ? prevSeconds - 10 : prevSeconds));
    }
  };

  const handleButtonClickS = () => {
    setAnimatedPercentage(0);
    setRemainingSeconds(0);
  };

  return (
    <div>
    <h3 className='h3'>Routine starting in ...</h3>
    <h5 className='h5'>Subheading here</h5>
    <div style={{ width: '150px', height: '150px', marginLeft:'45%', marginTop:'100px' }}>
    
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

      
      </div>
      <div className='btnss'>
      <button className='sub-t1' onClick={handleButtonClick}>+ 10 sec</button>
      <button className='sub-t2' onClick={handleButtonClickD}>- 10 sec</button>
      <button className='sub-t3' onClick={handleButtonClickS}>skip</button>
      </div>
      <div className="c-main">
        <h5 className='ch5'>Step <h4 className='ch4'>2</h4>/3</h5>
        <div className='cleansing'>
          <img className='img-src' src='https://cdn2.iconfinder.com/data/icons/beauty-salon-makeup-and-cosmetics/64/86-128.png' alt='cosmetic'></img>
          <div>
            <h6 className='cl-h6'>Cleansing</h6>
            <div className='fa-c'><FaClock /><h5> 60 sec</h5></div>
          </div>
          <div className="htd"><h5>How to do?</h5></div>
        </div>
      </div>
    
    </div>
  );
};

export default Timer;
