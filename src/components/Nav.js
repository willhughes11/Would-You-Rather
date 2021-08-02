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
                                HOME
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add'>
                                ADD QUESTION
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard'>
                                LEADERBOARD
                            </NavLink>
                        </li>
                        {this.props.loggedIn &&
                        <li>
                            <a style={{cursor:'pointer'}} onClick={this.logout}>
                                LOGOUT
                            </a>
                        </li>
                        }
                        <li>
                            {this.props.loggedIn &&
                                <div className='welcome'>WELCOME {this.props.authUser.toString().toUpperCase()}</div>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default connect(navMapStateToProps)(Nav)