import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {handleSetAuthUser} from "../actions/authUser";
import {navMapStateToProps} from './MapStateToProps'


class Nav extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        this.props.dispatch(handleSetAuthUser(null))
        localStorage.removeItem('authUser');
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="center"> Would You Rather</h2>
                </div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink to='/' exact>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard'>
                                Leaderboard
                            </NavLink>
                        </li>
                        {this.props.loggedIn &&
                        <li>
                            <a style={{cursor:'pointer'}} onClick={this.logout}>
                                Logout
                            </a>
                        </li>
                        }
                        <li>
                            {this.props.loggedIn &&
                                <div className='welcome'>Welcome {this.props.authUser}</div>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}



export default connect(navMapStateToProps)(Nav)