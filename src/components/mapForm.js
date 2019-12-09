import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as config from '../../config.js';

import { addEntry } from '../api';
import S3FileUpload from 'aws-s3';
import { Form } from 'semantic-ui-react';
import Layout from './layout';


const configy = {
  bucketName: 'wheresroo-photo',
  dirName: 'map', /* optional */
  region: 'us-west-1',
  accessKeyId: config.key,
  secretAccessKey: config.secret,
}


const Marker = () => <img className="prints" src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/pawprint.png' alt="hi" />

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
    S3FileUpload.uploadFile(event.target.files[0], configy).then(resp => this.setState({ image: resp.location }))
  }

  handleSubmit(event) {
    console.log(this.state);
    addEntry(this.state);
    event.preventDefault();
    this.setState({
      location: {
        lat: null,
        lng: null
      },
      image: '',
      info: "",
      name: ""
    })
  }

  render() {
    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          <h2>Have You Spotted Roo?</h2>
          <Form.TextArea label="Tell us about it" value={this.state.info} onChange={this.handleInfo} placeholder="Roo came up and sniffed me...." />

          <Form.Field>
            <label>Where? Click on the map!</label>
          </Form.Field>
          <div style={{ height: '70vh', width: '100%', margin: 'auto', paddingBottom: '25px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: config.apiKey }}
              defaultCenter={config.center}
              defaultZoom={config.zoom}
              onClick={e => this.handleClick(e)}
            >
              <Marker
                lat={this.state.location.lat}
                lng={this.state.location.lng}
              />
            </GoogleMapReact>
          </div>
          <Form.Field>
            <label>Have a pic or video?</label>
            <input type="file" accept="video/*,image/*" onChange={this.fileChangedHandler} multiple />
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
      </Layout>
    );
  }
}
export default MapForm;
