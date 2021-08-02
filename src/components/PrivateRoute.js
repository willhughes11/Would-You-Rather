import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { privateRouteMapStateToProps } from './MapStateToProps';

class PrivateRoute extends Component {
    render() {
        const { component: Component, authenticated, path, ...rest } = this.props

        if (authenticated) {
            return (
                <Route path={path} {...rest} render={props => (
                    <Component {...rest} {...props} />
                )} />
            )
        } else if (localStorage.getItem('authUser')) {
            localStorage.removeItem('authUser');
            return (
                <Route path={path} {...rest} render={props => (
                    <Redirect to={{ pathname: '/not-found', state: { from: props.location } }} />
                )} />
            )
        } else {
            localStorage.removeItem('authUser');
            return (
                <Route path={path} {...rest} render={props => (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )} />
            )
        }
    }
}

export default connect(privateRouteMapStateToProps)(PrivateRoute)