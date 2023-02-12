import * as CONSTANTS from "./types";

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
