import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('./layout'))

import '../dist/App.css';

import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { isBrowser } from "react-device-detect";


const Home = () => 
    (<div>
         <Head>
      <title>Where's Roo</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
      />
    </Head>
    <Layout>
        <div className="home">

            <img className="main-pic" src="https://wheresroo-photo.s3-us-west-1.amazonaws.com/main.jpg" alt="main" border="0" />
            <p><i>Boundaries? She knows none. Trees? Consider them climbed. From frat row to covel commons, no territory will be left uncharted. Welcome to Roo's adventures of Westwood</i></p>
            <p>Have you seen Roo? <Link href='/submit'><a>Submit your own sighting</a></Link> for the <Link href="/map"><a>Roo Map!</a></Link> Looking for a good read? Checkout the <a href='http://dailybruin.com/2019/09/18/pets-of-ucla-get-extra-love-on-social-media-create-community-for-animal-lovers/'>Daily Bruin article</a> featuring Roo!</p>
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
    </Layout></div>);


export default Home;