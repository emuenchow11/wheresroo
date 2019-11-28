import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import pawprint from './pawprint.png';
import * as Constants from './constants.js';
import { Button } from 'semantic-ui-react';
import { isBrowser } from "react-device-detect";

const dummyData = [
  {
    lat: 34.071015364719536,
    lng: -118.44690065324306,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo1.png',
      info: "Roo’s plans to get into John Wooden Center were foiled by the quick-closing doors. She then bristled her tail at a toddler and decided to climb this tree instead. Love this account!",
      name: "@eliseumetsu"
    }
  },
  {
    lat: 34.07651523059991,
    lng: -118.44068228691816,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo2.png',
      info: "Roo has gone further than she’s ever gone before 😮 She made it all the way to parking structure 3 (north of the sculpture garden)!!",
      name: "@cynthmartini"
    }
  },
  {
    lat: 34.067109,
    lng: -118.449402,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo3.png',
      info: "Caught posing in front of Sig Pi #fratcat",
      name: "@elizabethmuenchow"
    }
  },
  {
    lat: 34.067104,
    lng: -118.449402,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo4.png',
      info: "Roo's pawents met while living in Canyon Point",
      name: "@elizabethmuenchow"
    }
  },
  {
    lat: 34.067109,
    lng: -118.449409,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo5.png',
      info: "Found outside Fir and featured on Free & For Sale",
      name: ""
    }
  },
  {
    lat: 34.067102,
    lng: -118.449402,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo6.png',
      info: 'Roo was found in a fire escape on Kelton. As someone commented "it just cant stay out of trouble"',
      name: ""
    }
  },
  {
    lat: 34.067109,
    lng: -118.44941,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo7.png',
      info: "Where's Roo? Gallivanting all around the hill😒 First she visited Hedrick hall and tried to catch a ride on the elevator. Then she snuck into a dorm room in Courtside to get some beauty sleep on a twin XL. ",
      name: ""
    }
  },
  {
    lat: 34.067109,
    lng: -118.44941,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo9.jpg',
      info: "When a cat approaches you with their tail straight up it means they are open and even happy to meet you. Roo is often spotted with her tail up 😸",
      name: ""
    }
  },
  {
    lat: 34.067109,
    lng: -118.44981,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo10.JPG',
      info: "we saw Roo strolling around the bottom of Landfair and Gayley. We stopped to say hello then left her to continue adventuring. Then saw her home 2 hours later 😝",
      name: "@wheresroo"
    }
  },
  {
    lat: 34.067179,
    lng: -118.44941,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo11.JPG',
      info: "Roo made it all the way to Saxon where see strolled into an open dorm like she owned the place",
      name: ""
    }
  },
  {
    lat: 34.067109,
    lng: -118.45241,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo12.jpg',
      info: "Anyone lose a cat named Roo? Seen at 515 Gayley Ave",
      name: ""
    }
  },
  {
    lat: 34.067509,
    lng: -118.44941,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo13.jpg',
      info: "",
      name: ""
    }
  },
  {
    lat: 34.067109,
    lng: -118.44041,
    pop: {
      pic: 'https://wheresroo-photo.s3-us-west-1.amazonaws.com/map/roo14.JPG',
      info: "We brought Roo along for grad photos!",
      name: "@wheresroo"
    }
  }

];

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};



class AnyReactComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { index: props.index };
    this.handleClick = this.handleClick.bind(this)

  }
  handleClick() {
    console.log(this.state.index);
    this.props.showPopUp(this.state.index);
  }
  render() {
    return <img className="prints" onClick={this.handleClick} src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/pawprint.png' alt="hi" />
  }
}


class PopUp extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = this.showPopUp.bind(this);
  }
  showPopUp() {
    this.setState({ pop: this.props.pop })
  }
  render() {
    var className = this.props.bPop ? "show " : "hidden ";
    var anotherClass = isBrowser ? "not" : "mobile";
    return (<div className={className + anotherClass}>
      <img alt="hi" className={(isBrowser ? "popimg" : "pop-mobile")} src={this.props.pop.pic}></img>
      <p>{this.props.pop.info}</p>
      <span className="bold">{this.props.pop.name}</span>
      <br></br>
      <br></br>
      <Button className="secondary basic" onClick={this.props.closePopUp}>Close</Button>

    </div>);
  }

}

class RooMap extends Component {
  state = {
    marker: {
      lat: null,
      lng: null
    },
    location: [],
    pop: {
      pic: "",
      info: "",
      name: ""
    },
    bPop: false
  };
  constructor(props) {
    super(props)
    this.showPopUp = this.showPopUp.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
  }

  showPopUp(index) {
    this.setState({ pop: dummyData[index].pop });
    this.setState({ bPop: true });
  }

  closePopUp() {
    this.setState({ bPop: false });
  }

  handleClick(e) {
    this.setState({
      marker: {
        lat: e.lat,
        lng: e.lng
      }
    })
  }

  render() {
    return (
      // Important! Always set the container height explicitly

      <div style={{ height: '70vh', width: '100%', margin: 'auto' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: Constants.apiKey }}
          defaultCenter={Constants.center}
          defaultZoom={Constants.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onClick={e => this.handleClick(e)}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >{
            dummyData.map((d, index) => {
              return <AnyReactComponent
                showPopUp={this.showPopUp}
                index={index}
                key={index}
                lat={d.lat}
                lng={d.lng}

              />
            })
          }

        </GoogleMapReact>
        <PopUp pop={this.state.pop} bPop={this.state.bPop} closePopUp={this.closePopUp} />
      </div>
    );
  }
}


export default RooMap;
