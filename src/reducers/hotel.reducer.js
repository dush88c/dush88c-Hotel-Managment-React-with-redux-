import { hotelConstants } from '../constants';

export function hotels(state = {}, action) {
  switch (action.type) {
    case hotelConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case hotelConstants.GETALL_SUCCESS:
      return {
        allHotels: action.hotels.data
      };
    case hotelConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case hotelConstants.GETBYID_REQUEST:
      return {
        hotel:  action.hotel
      };
    case hotelConstants.GETBYID_SUCCESS:
      return {
        hotel: action.hotel.data
      };
    case hotelConstants.GETBYID_FAILURE:
      return {
        error: action.error
      };
    case hotelConstants.ADD_REQUEST:
      return {
        ...state,
        hotel: action.hotel
        };
    case hotelConstants.ADD_SUCCESS:
      return {
        ...state,
        hotel: action.hotel
      };
    case hotelConstants.ADD_FAILURE:
      return {
        ...state
      };
    case hotelConstants.UPDATE_REQUEST:
      return {
        ...state
      };
    case hotelConstants.UPDATE_SUCCESS:
      return {
        ...state
      };
    case hotelConstants.UPDATE_FAILURE:
      return {
        ...state
      };
    case hotelConstants.DELETE_FAILURE:
      return {
        ...state
      };
    default:
      return state
  }
}