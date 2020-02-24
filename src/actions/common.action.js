import { commonConstants } from '../constants';

export const commonActions = {
    loadingEnabled,
    loadingDisabled
};

function loadingEnabled(message) {
    return { type: commonConstants.LOADING_ENABLED, message };
}

function loadingDisabled(message) {
    return { type: commonConstants.LOADING_DISABLED, message };
}
