import { withRouter } from 'react-router';
import React, { Component } from 'react';

class Header extends Component {
  
    render(){

        return(
            <h1>elcome to E-lerning portal</h1>
        )
    }
}

export default withRouter(Header);