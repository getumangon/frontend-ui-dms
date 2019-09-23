
export const action_LoadingIndicator = isLoading => ({
    type: "LOADING_INDICATOR",
    isLoading
})

export const action_UserLogin = loginUser => ({
    type: "USER_LOGIN",
    loginUser: loginUser
})

export const action_AccuireDeviceCount = accuireDeviceCount => ({
    type: "ACCUIRE_DEVICE_COUNT",
    accuireDeviceCount: accuireDeviceCount
})
