import React from 'react';
//import './App.css';

import RooMap from './rooMap.js'
import MapForm from "./mapForm.js"
import Home from './home.js'
//import roo from './roo.png';

import { Button } from 'semantic-ui-react';
import { isBrowser } from "react-device-detect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <br></br>
      <h2 id="title"><img src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/roo.png' alt="roo" id="roo"></img>Where`s Roo?</h2>
      <div style={{ width: (isBrowser ? '779px' : 'auto'), margin: 'auto' }} className="button-cont">
        <div className="canvas">
          <Router>
            <div>
              <nav>
                <Button.Group color='blue' attached='top' className="fluid">
                  <Button as={Link} to="/">Home</Button>
                  <Button as={Link} to="/map">Map</Button>
                  <Button as={Link} to="/submit">Submit</Button>
                </Button.Group></nav>

              <br>
              </br>
              <br></br>
              <Switch>
                <Route path="/map">
                  <RooMap />
                </Route>
                <Route path="/submit">
                  <MapForm />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>

            </div>
          </Router>
        </div>
      </div>

    </div>
  );
}

export default App;
