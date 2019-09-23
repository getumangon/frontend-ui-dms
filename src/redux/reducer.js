import { combineReducers } from 'redux';

const red_LoginUser = (state = { loginUser: {} }, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return Object.assign({}, state, {
                loginUser: action.loginUser
            })
        default:
            return state;
    }
}

const red_LoadingIndicator = (state = { isLoading: false }, action) => {
    switch (action.type) {
        case 'LOADING_INDICATOR':
            return Object.assign({}, state, {
                isLoading: action.isLoading
            })
        default:
            return state
    }
}

const red_AccuireDeviceCount = (state = { accuireDeviceCount: 0 }, action) => {
    switch (action.type) {
        case 'ACCUIRE_DEVICE_COUNT':
            return Object.assign({}, state, {
                accuireDeviceCount: action.accuireDeviceCount
            })
        default:
            return state
    }
}

export default combineReducers({
    red_LoadingIndicator: red_LoadingIndicator,
    red_LoginUser: red_LoginUser,
    red_AccuireDeviceCount: red_AccuireDeviceCount
})
