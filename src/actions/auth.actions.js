import { userConstants ,commonConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';
import { NotificationManager } from 'react-notifications';
import {commonActions} from '../actions';

export const authActions = {
    login,
    logOut
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        dispatch(commonActions.loadingEnabled());
        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(commonActions.loadingDisabled());
                    history.push('/hotels');
                },
                error => {
                    dispatch(failure(error.toString()));
                    NotificationManager.error(error.toString(),'Error message',  6000);
                    dispatch(commonActions.loadingDisabled());
                }

            );
    };

    function request(username) { return { type: userConstants.LOGIN_REQUEST, username } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logOut() {
    userService.logOut();
    return { type: userConstants.LOGOUT };
}
