import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, commons } from '../helpers';
import { authActions } from '../actions';
import { PrivateRoute } from '../components';
import { Hotels, HotelManage } from '../components/HotelPage';
import { LoginPage } from '../components/LoginPage';
import Header from '../components/Shared/Header';
import { NotificationContainer } from 'react-notifications';
import Loader from 'react-loader-spinner'

import 'react-notifications/lib/notifications.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


import '../../style/app.scss';

var spinnerOuterDiv = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto'
}

var spinnerInnerDiv = {
    margin: "auto",
    maxHeight: "100%"
}

var hideSpinner = {
   display: 'none'
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Hotel Management Sample'
        };
    }

    onClickLogOut = () => {
        return this.props.logOut();
    }

    render() {
        const { user, common } = this.props;
        return (
            <div>
                {
                    user && <Header title={this.state.title} user={user} onLogOut={this.onClickLogOut} />
                }

                <div className="mt-5">
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={Hotels} />
                            <PrivateRoute exact path="/hotel/edit/:id" component={HotelManage} />
                            <PrivateRoute exact path="/hotel/add" component={HotelManage} />
                            <Route path="/login" component={LoginPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div >
                <NotificationContainer />
                <div style={this.props.common.isLoading ? spinnerOuterDiv : hideSpinner }>
                    <div style={spinnerInnerDiv} ><Loader visible={common.isLoading} type="Puff" color="#00BFFF" height={200} width={200}></Loader></div>
                </div>

            </div >
        );
    }
}

function mapState(state) {
    const { authentication, common } = state;
    const { user } = authentication;
    return { user, common };
}

const actionCreators = {
    logOut: authActions.logOut
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };