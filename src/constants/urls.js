export const AUTHENTICATION_URL = "/Authentication";
export const USER_URL = "/Users";

export const AUTHENTICATION_URLS = {
    REGISTRATION: AUTHENTICATION_URL + "/register",
    LOGIN: AUTHENTICATION_URL + "/login",
    LOGOUT: AUTHENTICATION_URL + "/logout",
    REFRESH_TOKEN: AUTHENTICATION_URL + "/refresh-token",
    CONFIRM_EMAIL: AUTHENTICATION_URL + "/confirm-email"
};

export const USERS_URLS = {
    PROFILE_INFO: USER_URL + "/user-info",
    EDIT: USER_URL + "/edit-info",
    FULL_NAME: USER_URL + "/user-full-name"
};
