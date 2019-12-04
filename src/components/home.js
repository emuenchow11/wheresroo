import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { isBrowser } from "react-device-detect";

class Home extends Component {
    render() {
        return (<div className="home">

            <img className="main_pic" src="https://i.ibb.co/T4b71vM/main.jpg" alt="main" border="0" />
            <p>We love Roo blurrrb We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo We love Roo<Link to='/submit'>SUBMIT</Link> We love Roo We love Roo<Link to="/map">MAP</Link> We love Roo We love Roo We love Roo We love Roo</p>

            <Button color='instagram' as='a' href="https://www.instagram.com/wheresroo/">
                <Icon name='instagram' /> Instagram
            </Button>
            <div className="flex" style={{ justifyContent: (isBrowser ? 'space-between' : 'center') }}>
                <img className="flex-items" src="https://i.ibb.co/gPZ23mf/small1.jpg" alt="small1" border="0"></img>
                <img className="flex-items" src="https://i.ibb.co/5TD9Fy8/small2.jpg" alt="small2" border="0"></img>
                <img className="flex-items" src="https://i.ibb.co/DbSbYkP/small3.jpg" alt="small3" border="0"></img>
            </div>

        </div>)
    };
}
export default Home;
