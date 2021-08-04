import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSetAuthUser } from '../actions/authUser'
import { loginMapStateToProps } from './MapStateToProps'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            home: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(handleSetAuthUser(this.state.value))
        console.log(this.props.history)
        console.log(this.props.location)
        localStorage.setItem('authUser', this.state.value);
        this.props.history.goBack();
    }

    render() {
        const { users } = this.props
            return (
                <div className='login-container'>
                    <div className='login'>
                        <form className='login-form' onSubmit={this.handleSubmit}>
                            <label>
                                <span>Select a User to login:</span>
                                <select className='styled-select slate' value={this.state.value} onChange={this.handleChange}>
                                    <option value=''>Select a User</option>
                                    {Object.keys(users).map((user) => (
                                        <option key={users[user].id} value={users[user].id}>{users[user].name}</option>
                                    ))}
                                </select>
                            </label>
                            <input className='login-btn' disabled={this.state.value === ''} type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            )
        }
    }

export default withRouter(connect(loginMapStateToProps)(Login))