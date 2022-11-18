import * as CONSTANTS from "../../reducers/CONSTANTS";

export const logout = () => {
    return {
        type: CONSTANTS.LOGOUT
    };
}

export const setAccess = (token) => {
    return {
        type: CONSTANTS.SET_ACCESS,
        payload: token
    };
}
