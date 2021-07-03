import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home/Home';
import InsideRoom from './Components/InsideRoom/InsideRoom';

function App() {
  return (
    <React.Fragment>
      <div className="App-text">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/room/:id" component={InsideRoom} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
