import React, { useState, useEffect } from 'react';

const FiveClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const audioRef = React.createRef();

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsActive(false);
    setTimerLabel('Session');
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
  };

  const decrementBreak = () => {
    if (breakLength > 1 && !isActive) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60 && !isActive) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1 && !isActive) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60 && !isActive) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  useEffect(() => {
    let countdown;
    if (isActive) {
      countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            audioRef.current.play();
            if (isBreak) {
              setTimerLabel('Session');
              setTimeLeft(sessionLength * 60);
            } else {
              setTimerLabel('Break');
              setTimeLeft(breakLength * 60);
            }
            setIsBreak(!isBreak);
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isActive, isBreak, breakLength, sessionLength, audioRef]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fiveclock">
      <h1>25+5 Clock</h1>
      <div className="length-control">
        <div>
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={decrementBreak}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={incrementBreak}>+</button>
        </div>
        <div>
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={decrementSession}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={incrementSession}>+</button>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
        <audio id="beep" ref={audioRef} src="ping.mp3" />
        <button id="start_stop" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <p>A twenty-five + five clock</p>
        <p> Made with ❤ from Gift</p>
      </div>
    </div>
  );
};

export default FiveClock;
