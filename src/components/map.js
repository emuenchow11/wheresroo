import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

class SimpleMap extends Component {
  state = {
    center: {
      lat: 34.07,
      lng: -118.44
    },
    zoom: 15,
    marker:{
      lat: null,
      lng: null
    }
  };
  handleClick(e){
    this.setState({marker: {
      lat: e.lat,
      lng: e.lng
    }})
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '70%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBpP3C2g2VyDqeUuqQpHM3mIde8rFi0HYE' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals = {true}
          onClick={e => this.handleClick(e)}
  onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={this.state.marker.lat}
            lng={this.state.marker.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
