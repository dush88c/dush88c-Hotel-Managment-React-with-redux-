import { commonConstants } from '../constants';

const initialState = { isLoading: false };

export function common(state = initialState, action) {
    switch (action.type) {
        case commonConstants.LOADING_ENABLED:
            return {
                isLoading: true
            };
        case commonConstants.LOADING_DISABLED:
            return {
                isLoading: false
            };
        default:
            return state
    }
}