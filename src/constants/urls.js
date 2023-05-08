export const AUTHENTICATION_URL = "/Authentication";
export const USER_URL = "/Users";
export const PROJECT_URL = "/Project";
export const DOCUMENT_URL = "/Document";
export const CONTENT_URL = "/Content";
export const HISTORY_URL = "/Content";

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

export const PROJECTS_URLS = {
    ADD_USER: PROJECT_URL + "/add-user",
    CREATE: PROJECT_URL + "/create",
    ALL_FOR_USER: PROJECT_URL + "/all-for-user"
};

export const DOCUMENT_URLS = {
    ADD: DOCUMENT_URL + "/add",
    DELETE: DOCUMENT_URL,
    ALL_FOR_USER: DOCUMENT_URL + "/all-for-user",
    DOWNLOAD: DOCUMENT_URL + "/download"
};

export const CONTENT_URLS = {
    TRANSLATE: CONTENT_URL + "/translate",
    WRITE: CONTENT_URL + "/write",
    GET_RANGE: CONTENT_URL + "/get-range",
    TRANSLATE_DOCUMENT: CONTENT_URL + "/translate-document"
};

export const HISTORY_URLS = {
    GET_RANGE: HISTORY_URL + "/get-range" 
};
