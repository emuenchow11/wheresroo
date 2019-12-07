import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { isBrowser } from "react-device-detect";

import Layout from './layout'

class Home extends Component {
    render() {
        return (
            <Layout>
                <div className="home">

                    <img className="main-pic" src="https://wheresroo-photo.s3-us-west-1.amazonaws.com/main.jpg" alt="main" border="0" />
                    <p><i>Boundaries? She knows none. Trees? Consider them climbed. From frat row to covel commons, no territory will be left uncharted. Welcome to Roo's adventures of Westwood</i></p>
                    <p>Have you seen Roo? <Link to='/submit'>Submit your own sighting</Link> for the <Link to="/map">Roo Map!</Link> Looking for a good read? Checkout the <a>Daily Bruin article</a> featuring Roo!</p>
                    <br></br>
                    <Button color='instagram' as='a' href="https://www.instagram.com/wheresroo/">
                        <Icon name='instagram' /> Instagram
                    </Button>
                    <div className="flex" style={{ justifyContent: (isBrowser ? 'space-between' : 'center') }}>
                        <img className="flex-items" src="https://wheresroo-photo.s3-us-west-1.amazonaws.com/small1.jpg" alt="small1" border="0"></img>
                        <img className="flex-items" src="https://wheresroo-photo.s3-us-west-1.amazonaws.com/small2.JPG" alt="small2" border="0"></img>
                        <img className="flex-items" src="https://wheresroo-photo.s3-us-west-1.amazonaws.com/small3.JPG" alt="small3" border="0"></img>
                    </div>

                </div>
            </Layout>
        )
    }
}
export default Home;
