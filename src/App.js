import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
import React from 'react';

import Home from './Components/Home/Home';

function App() {
  return (
    <React.Fragment>
      <div className="App-text">
        <Home />
      </div>
    </React.Fragment>
  );
}

export default App;
