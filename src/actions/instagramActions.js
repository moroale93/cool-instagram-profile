export function upsertAccessToken(access_token) {
    return {
        type: 'UPDATE_ACCESS_TOKEN',
        payload: {access_token}
    }
}

export function logout() {
    return {
        type: 'LOGOUT',
        payload: {}
    }
}

function setProfileData(data) {
    return {
        type: 'UPDATE_PROFILE_DATA',
        payload: data
    }
}

function setProfileImages(data) {
    return {
        type: 'UPDATE_LIST_OF_PHOTO',
        payload: data
    }
}

function setAuthenticationError() {
    //TODO
    return {
        type: 'AUTHENTICATION_ERROR'
    }
}

function manageAccessTokenFromState(dispatch, state) {
    const at = state().access_token;
    console.log(state(), at);
    if (at) {
        return at;
    }
    dispatch(setAuthenticationError());
}

export function getProfileData() {
    return (dispatch, state) => {
        const at = manageAccessTokenFromState(dispatch, state);
        if (at && !state().profile) {
            return fetch("https://api.instagram.com/v1/users/self?access_token=" + at)
                .then(resp => resp.json()) //TODO gestire errori
                .then(json => {
                    dispatch(setProfileData(json.data));
                });
        }
        return null;
    }
}

export function getProfileImages() {
    return (dispatch, state) => {
        const at = manageAccessTokenFromState(dispatch, state);
        if (at && !state().images) {
            return fetch("https://api.instagram.com/v1/users/self/media/recent?count=100&access_token=" + at)
                .then(resp => resp.json()) //TODO gestire errori
                .then(json => {
                    dispatch(setProfileImages(json.data));
                });
        }
        return null;
    }
}