import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';


const Layout = ({ children }) => {
    return (
        <Container>
            <Button.Group color='blue' attached='top' className="fluid">
                <Button as={Link} to="/">Home</Button>
                <Button as={Link} to="/map">Map</Button>
                <Button as={Link} to="/submit">Submit</Button>
            </Button.Group>
            <br />
            <br />
            {children}
        </Container>

    );
};

export default Layout;