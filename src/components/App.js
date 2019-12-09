import React from 'react';
import RooMap from './rooMap.js';
import MapForm from "./mapForm.js";
import Home from './home.js';
import ContactBody from './rooMap2'

import '../../dist/App.css'

import { Button } from 'semantic-ui-react';
import { isBrowser } from "react-device-detect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App(mode = null) {
  return (
    <div className="App">
      <br></br>
      <h2 id="title"><img src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/roo.png' alt="roo" id="roo"></img>Where's Roo?</h2>
      <div style={{ width: (isBrowser ? '779px' : 'auto'), margin: 'auto' }} className="button-cont">
        <div className="canvas">
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/map" component={RooMap} />
                <Route exact path="/submit" component={MapForm} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
