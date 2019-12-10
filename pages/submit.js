import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as config from '../config.js';

import S3FileUpload from 'react-s3';
import { Form, Message } from 'semantic-ui-react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import axios from 'axios'

import '../dist/App.css';


const Layout = dynamic(() => import('./layout'))

export const addEntry = ({ location, image, info, name }) => {
  return axios.post('http://ec2-54-183-96-28.us-west-1.compute.amazonaws.com/entries', { lat: location.lat, lng: location.lng, image, info, name, show: false })
    .then(resp => resp.data)
    .catch(err => console.log(err));

};
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
      success: false,
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
    this.setState({
      info: event.target.value,
      success: false
    });
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
      success: true,
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
      <div>
        <Head>
          <title>Where's Roo</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
          />
        </Head>
        <Layout>
          <Form success={this.state.success} onSubmit={this.handleSubmit}>
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
            <Message
              success
              header='Thank you!'
              content="Your entry should be added to the Roo Map soon"
            />
            <br></br>
          </Form>
        </Layout> </div>
    );
  }
}
export default MapForm;
