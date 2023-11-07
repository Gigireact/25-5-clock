// App.js
import React from 'react';
import './App.scss';
import FiveClock from './FiveClock';
import Sound from './Sound';

const App = () => {
  return (
    <div className="App">
      <FiveClock />
      <Sound />
    </div>
  );
}

export default App;
