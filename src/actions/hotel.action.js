import { hotelConstants } from '../constants';
import { hotelService } from '../services';
import { history } from '../helpers';
import { NotificationManager } from 'react-notifications';
import {commonActions} from '../actions';

export const hotelActions = {
    getAll,
    getById,
    addnew,
    update,
    delete: remove
};


function getAll() {
    return dispatch => {
        dispatch(request());
        dispatch(commonActions.loadingEnabled());

        hotelService.getAll()
            .then(
                hotels => {
                    dispatch(success(hotels));
                    dispatch(commonActions.loadingDisabled());
                },
                error => {
                    dispatch(failure(error.toString()));
                    NotificationManager.error('Error message', error.toString(), 3000);
                    dispatch(commonActions.loadingDisabled());
                }
            );
    };

    function request() { return { type: hotelConstants.GETALL_REQUEST } }
    function success(hotels) { return { type: hotelConstants.GETALL_SUCCESS, hotels } }
    function failure(error) { return { type: hotelConstants.GETALL_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request({}));
        dispatch(commonActions.loadingEnabled());

        hotelService.getById(id)
            .then(
                hotel => {
                    dispatch(success(hotel));
                     dispatch(commonActions.loadingDisabled());
                },
                error => {
                    dispatch(failure(error.toString()));
                    NotificationManager.error('Error message', error.toString(), 3000);
                    dispatch(commonActions.loadingDisabled());
                }

            );
    };

    function request(hotel) { return { type: hotelConstants.GETBYID_REQUEST, hotel } }
    function success(hotel) { return { type: hotelConstants.GETBYID_SUCCESS, hotel } }
    function failure(error) { return { type: hotelConstants.GETBYID_FAILURE, error } }
}

function addnew(hotel) {
    return dispatch => {
        dispatch(request(hotel));
        dispatch(commonActions.loadingEnabled());
        hotelService.addnew(hotel)
            .then(
                result => {
                    dispatch(success(hotel));
                    history.push('/hotels');
                    NotificationManager.success(`${result.message}`, 'Success');
                    dispatch(commonActions.loadingDisabled());

                },
                error => {
                    dispatch(failure(error.toString()));
                    NotificationManager.error('Error message', error.toString(), 3000);
                    dispatch(commonActions.loadingDisabled());
                }
            );
    };

    function request(hotel) { return { type: hotelConstants.ADD_REQUEST, hotel } }
    function success(hotel) { return { type: hotelConstants.ADD_SUCCESS, hotel } }
    function failure(error) { return { type: hotelConstants.ADD_FAILURE, error } }
}

function update(hotel) {
    return dispatch => {
        dispatch(request(hotel));
        dispatch(commonActions.loadingEnabled());

        hotelService.update(hotel)
            .then(
                result => {
                    dispatch(success(hotel));
                    NotificationManager.success(`${result.message}`, 'Success');
                    history.push('/hotels');
                    dispatch(commonActions.loadingDisabled());
                },
                error => {
                    dispatch(failure(error.toString()));
                    NotificationManager.error('Error message', error.toString(), 3000);
                    dispatch(commonActions.loadingDisabled());
                }
            );
    };

    function request(hotel) { return { type: hotelConstants.UPDATE_REQUEST, hotel } }
    function success(hotel) { return { type: hotelConstants.UPDATE_SUCCESS, hotel } }
    function failure(error) { return { type: hotelConstants.UPDATE_FAILURE, error } }
}

function remove(hotel) {
    return dispatch => {
        dispatch(request(hotel));
        dispatch(commonActions.loadingEnabled());

        hotelService.delete(hotel)
            .then(
                result => {
                    dispatch(success(result));
                    dispatch(getAll());
                    NotificationManager.success(`${result.message}`, 'Success');
                    dispatch(commonActions.loadingDisabled());
                },
                error => {
                    dispatch(failure(hotel.id, error.toString()));
                    NotificationManager.error('Error message', error.toString(), 3000);
                    dispatch(commonActions.loadingDisabled());
                }
            );
    };

    function request(hotel) { return { type: hotelConstants.DELETE_REQUEST, hotel } }
    function success(hotel) { return { type: hotelConstants.DELETE_SUCCESS, hotel } }
    function failure(hotel, error) { return { type: hotelConstants.DELETE_FAILURE, hotel, error } }
}