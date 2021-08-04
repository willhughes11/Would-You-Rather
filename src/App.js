import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Home from './components/Home';
import AddQuestion from './components/AddQuestion';
import Leaderboard from './components/Leaderboard';
import Questions from './components/Questions';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import NotFound from './components/NotFound';



class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        // const { loggedIn } = this.props;

        return (
            <Router>
                <Fragment>
                    <div className='container'>
                        <Nav></Nav>
                        <div>
                            <Switch>
                                <Route path='/login' exact component={Login} />
                                <PrivateRoute path='/' exact component={Home} />
                                <PrivateRoute path='/leaderboard' exact component={Leaderboard} />
                                <PrivateRoute path='/add' exact component={AddQuestion} />
                                <PrivateRoute path='/question/:id' exact component={Questions} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </Router>
        )
    }
}


const PrivateRoute = connect(mapStateToProps)(
  ({ component: Component, authUser, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect push to="/login" />
        )
      }
    />
  )
);

function mapStateToProps({authUser}) {
    return {
        authUser
    }
}

export default connect(mapStateToProps)(App)