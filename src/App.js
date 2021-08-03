import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import Home from './components/Home'
import AddQuestion from './components/AddQuestion'
import Leaderboard from './components/Leaderboard'
import Questions from './components/Questions'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound';



class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { loggedIn } = this.props;

        return (
            <Router>
                <Fragment>
                    <div className='container'>
                        <Nav></Nav>
                        <div>
                            <Switch>
                                <PrivateRoute path='/' exact component={Home} loggedIn={loggedIn} />
                                <PrivateRoute path='/leaderboard' exact component={Leaderboard} loggedIn={loggedIn} />
                                <PrivateRoute path='/add' exact component={AddQuestion} loggedIn={loggedIn} />
                                <PrivateRoute path='/questions/:id' exact component={Questions} loggedIn={loggedIn} />
                                <Route path='/login' exact component={Login} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({authUser}) {
    return {
        loggedIn: authUser !== null
    }
}

export default connect(mapStateToProps)(App)