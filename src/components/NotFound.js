import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {notFoundMapStateToProps} from './MapStateToProps'

class NotFound extends Component {
    render() {
        return (
            <div>
                <h3 className='center'> Page Not Found. Please  <NavLink to='/login' className='login-btn' exact> Login </NavLink></h3>
            </div>
        );
    }
}

export default connect(notFoundMapStateToProps)(NotFound)