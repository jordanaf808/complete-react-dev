import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>Hats</h1>
  </div>
);

function App() {
  return <div>
    <switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/hats' component={HatsPage} />
    </switch>
    </div>;
}

export default App;
