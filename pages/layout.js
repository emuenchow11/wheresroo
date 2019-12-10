import React from 'react';
import Link from 'next/link';
import { Container, Button } from 'semantic-ui-react';

const Layout = (props) => (
  <div className="App">
    <br></br>
    <h2 id="title"><img src='https://wheresroo-photo.s3-us-west-1.amazonaws.com/roo.png' alt="roo" id="roo"></img>Where's Roo?</h2>
    <div style={{ width: (props.isMobile ? 'auto' : '779px'), margin: 'auto' }} className="button-cont">
      <div className="canvas">
        <Container>
          <Button.Group color='blue' attached='top' className="fluid">
            <Link href='/'><Button>Home</Button></Link>
            <Link href='/map'><Button>Map</Button></Link>
            <Link href='/submit'><Button>Submit</Button></Link>
          </Button.Group>
          <br />
          <br />
          {props.children}
        </Container>
      </div>
    </div>
  </div>
);


export default Layout;