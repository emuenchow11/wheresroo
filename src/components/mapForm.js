import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as Constants from './constants.js'

import { Form } from 'semantic-ui-react';

const AnyReactComponent = () => <img className="prints" src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/pawprint.png' alt="hi" />

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

class MapForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: null,
        lng: null
      },
      image: null,
      info: "",
      name: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  handleClick(e) {

    this.setState({
      location: {
        lat: e.lat,
        lng: e.lng
      }
    })
  }

  handleInfo(event) {
    this.setState({ info: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  fileChangedHandler(event) {
    this.setState({ image: event.target.files[0] })
  }


  handleSubmit(event) {
    console.log(this.state);
    //event.preventDefault();
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Have You Spotted Roo?</h2>
        <Form.TextArea label="Tell us about it" value={this.state.info} onChange={this.handleInfo} placeholder="Roo came up and sniffed me...." />

        <Form.Field>
          <label>Where? Click on the map!</label>
        </Form.Field>
        <div style={{ height: '70vh', width: '100%', margin: 'auto', paddingBottom: '25px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: Constants.apiKey }}
            defaultCenter={Constants.center}
            defaultZoom={Constants.zoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onClick={e => this.handleClick(e)}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <AnyReactComponent
              lat={this.state.location.lat}
              lng={this.state.location.lng}
            />
          </GoogleMapReact>
        </div>
        <Form.Field>
          <label>Have a pic?</label>
          <input type="file" accept="image/*" onChange={this.fileChangedHandler} />
        </Form.Field>

        <br></br>
        <Form.Field>
          <label>From? (optional)</label>
          <p className="insta">Include Instagram @ to be tagged on insta</p>
          <Form.Input value={this.state.name} onChange={this.handleName} placeholder="@wheresroo" />
        </Form.Field>

        <br></br>
        <Form.Button>Submit</Form.Button>
        <br></br>
      </Form>
    );
  }
}
export default MapForm;
