import {mocks} from "./instagram-reducer-mock";

const mockData = true;
const defaultState = mockData ? mocks : {};

const instagramData = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_ACCESS_TOKEN':
            return {
                access_token: action.payload.access_token
            };
        case 'LOGOUT':
            return {
                access_token: undefined
            };
        case 'UPDATE_LIST_OF_PHOTO':
            state.images = action.payload;
            return state;
        case 'UPDATE_PROFILE_DATA':
            state.profile = action.payload;
            return state;
        default:
            return state
    }
};

export default instagramData