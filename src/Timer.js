import React, { useState, useEffect } from 'react';
import './timerstyles.css';
import { FaClock } from "react-icons/fa";

const Timer = () => {
  const [start, setStart] = useState(360);
  const [c, setC] = useState(60);
  const [inc, setInc] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart(prevStart => (prevStart > 0 ? prevStart - 6 : prevStart));
      setC(prevC => (prevC > 0 ? prevC - 1 : prevC));
    }, 1000);

    if (start <= 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start, c, inc]);

  const handleIncrease = () => {
    if (start > 0) {
      setStart(prevStart => (prevStart <= 300 ? prevStart + 60 : prevStart));
      setC(prevC => (prevC <= 50 ? prevC + 10 : prevC));
    }
  };

  const handleDecrease = () => {
    setStart(prevStart => (prevStart >= 60 ? prevStart - 60 : prevStart));
    setC(prevC => (prevC >= 10 ? prevC - 10 : prevC));
  };

  const handleSkip = () => {
    setStart(0);
    setC(0);
  };

  let progressStyle = {
    background: `conic-gradient(#880bea ${start}deg, #ededed 0deg)`,
  };

  let valueText = c <= 9 ? `00:0${c}` : c === 60 ? `01:00` : `00:${c}`;

  return (
    <div className='main-div'>
      <div className="container">
        <h3>Routine starting in ...</h3>
        <h5 className='h5'>Subheading here</h5>
        <div className="progress-circular" style={progressStyle}>
          <span className="value">{valueText}</span>
        </div>
      </div>
      <button className='sub-t1' onClick={handleIncrease}>+10sec</button>
      <button className='sub-t2' onClick={handleDecrease}>-10sec</button>
      <button className='sub-t3' onClick={handleSkip}>Skip</button>
      <div className="c-main">
        <h5 className='ch5'>Step <h3 className='ch4'>2</h3>/3</h5>
        <div className='cleansing'>
          <img className='img-src' src='https://cdn2.iconfinder.com/data/icons/beauty-salon-makeup-and-cosmetics/64/86-128.png' alt='cosmetic'></img>
          <div>
            <h4 className='cl-h6'>Cleansing</h4>
            <div className='fa-c'><FaClock /><h5> 60 sec</h5></div>
          </div>
          <div className="htd"><h5>How to do?</h5></div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
