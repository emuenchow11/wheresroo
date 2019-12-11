import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as config from '../config.js';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import isImage from 'is-image';

import '../dist/App.css';

const Layout = dynamic(() => import('./layout'))

class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = { index: props.index };
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.showPopUp(this.state.index);
  }
  render() {
    return <img className="prints" onClick={this.handleClick} src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/pawprint.png' alt="hi" />
  }
}

const PopUp = props => {
  var className = props.bPop ? "show " : "hidden ";
  var anotherClass = props.isMobile ? "mobile" : "not";
  return (
    <div className={className + anotherClass}>
      {isImage(props.pop.image) ?
        <img alt="hi" className={(isBrowser ? "pop-img" : "pop-mobile")} src={props.pop.image}></img>
        :
        <video controls="controls" className={(isBrowser ? "pop-img" : "pop-mobile")} height="351" src={props.pop.image}></video>
      }
      <p>{props.pop.info}</p>
      <span className="bold">{props.pop.name}</span>
      <br></br>
      <br></br>
      <Button className="secondary basic" onClick={props.closePopUp}>Close</Button>
    </div>);
}

class RooMap extends Component {
  _mounted = false;
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      mount: false,
      pop: {
        pic: "",
        info: "",
        name: ""
      },
      bPop: false,
      entries: [{
        "_id": "5deadbf10767c4571ec89ca8",
        "lat": 34.07572043262978,
        "lng": -118.4405578994751
      }]
    };
    this.showPopUp = this.showPopUp.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({ isMobile: WURFL.is_mobile }, function () {
      console.log(this.state.isMobile);
    });
    axios.get('http://ec2-54-183-96-28.us-west-1.compute.amazonaws.com/entries')
      .then(resp => {
        if (this._mounted)
          this.setState({ entries: resp.data });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  showPopUp(index) {
    axios.get(`http://ec2-54-183-96-28.us-west-1.compute.amazonaws.com/entries/${index}`)
      .then(resp => {
        this.setState({
          pop: {
            image: resp.data.image,
            info: resp.data.info,
            name: resp.data.name
          }
        });
      })
      .catch(err => console.log(err));
    this.setState({ bPop: true });
  }

  closePopUp() {
    this.setState({ bPop: false });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Where's Roo</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
          />
          <script type='text/javascript' src='//wurfl.io/wurfl.js'></script>
        </Head>
        <Layout isMobile={this.state.isMobile}>
          <div style={{ height: '70vh', width: '100%', margin: 'auto' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: config.apiKey }}
              defaultCenter={config.center}
              defaultZoom={config.zoom}>
              {
                this.state.entries.map(d => {
                  return <Marker
                    showPopUp={this.showPopUp}
                    index={d._id}
                    key={d._id}
                    lat={d.lat}
                    lng={d.lng}
                  />
                })
              }
            </GoogleMapReact>
            <PopUp isMobile={this.state.isMobile} pop={this.state.pop} bPop={this.state.bPop} closePopUp={this.closePopUp} />
          </div>
        </Layout>
      </div>
    );
  }
}

export default RooMap;
