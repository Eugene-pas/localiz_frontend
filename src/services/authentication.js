import authenticationService from "../api/authentication";
import {successMessage, errorMessage} from "./alerts";
import {authenticationMessages} from "../constants/messages/authentication";
import {setAccess, logout} from "../redux/actions/auth/index";
import {generalMessages} from "../constants/messages/general";
import tokenService from "../services/tokens";
import jwt from 'jwt-decode';
import { statusCode } from "../constants/statusCodes";
import { store } from "../redux/store";
import { userRoles } from '../constants/userRoles';
import { PROJECTS } from "../navigation/CONSTANTS"
import { setStore } from "../redux/setStore"

export function register(values, navigate) {
    const model = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password
    };
    authenticationService
        .register(model)
        .then(
            () => {
                successMessage(authenticationMessages.SUCCESSFUL_REGISTRATION);
                login(
                    {
                        email: values.email, 
                        password: values.password
                    }, 
                    navigate)
            },
            (err) => {
                err.response.status === statusCode.BAD_REQUEST
                    ? errorMessage(
                        authenticationMessages.REGISTRATION_FAILED,
                        authenticationMessages.REGISTRATION_FAILED_USER_ALREADY_EXIST
                    )
                    : errorMessage(
                        authenticationMessages.REGISTRATION_FAILED,
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(() => {
            errorMessage(
                authenticationMessages.REGISTRATION_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function login(values, navigate) {
    let model = {
        email: values.email,
        password: values.password
    };

    authenticationService
        .login(model)
        .then(
            async (response) => {
                store.dispatch(setAccess(response.data));
                
                let role = store.getState().authReducer.role;

                switch (role) {
                    case userRoles.USER:
                        setStore();                      
                        navigate(PROJECTS);
                        break;
                    default:
                        errorMessage(
                            authenticationMessages.LOGIN_FAILED,
                            generalMessages.SOMETHING_WENT_WRONG
                        );
                        break;
                }
            },
            (err) => {
                err.response.status === statusCode.BAD_REQUEST
                    ? errorMessage(
                        authenticationMessages.LOGIN_FAILED,
                        authenticationMessages.LOGIN_FAILED_USER_ALREADY_EXIST
                    )
                    : errorMessage(
                        authenticationMessages.LOGIN_FAILED,
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch((res) => {
            console.error(res);
            errorMessage(
                authenticationMessages.LOGIN_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function logoutUser() {
    let model = {
        refreshToken: tokenService.getLocalRefreshToken()
    };

    authenticationService
        .logout(model)
        .then(
            () => {
                store.dispatch(logout());
            },
            () => {
                errorMessage(
                    authenticationMessages.LOGOUT_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                authenticationMessages.LOGOUT_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export function checkIsUserRoleValid() {

    let accessToken = tokenService.getLocalAccessToken();

    if (accessToken !== null) {
        let decodedAccessToken = jwt(accessToken);
        if (decodedAccessToken.role !== store.getState().authReducer.role) {          
            store.dispatch(logout());
        }
    } else {
        store.dispatch(logout());
    }
}

export async function confirmEmailAsync(token) {

    return authenticationService
        .confirmEmail({token})
        .then(
            () => {
                successMessage(authenticationMessages.SUCCESSFUL_EMAIL_CONFIRMATION);
            },
            () => {
                errorMessage(
                    authenticationMessages.SEND_EMAIL_CONFIRMATION_FAILED,
                    authenticationMessages.EMAIL_ALREADY_CONFIRIMED
                );
            })
        .catch(() => {
            errorMessage(
                authenticationMessages.SEND_EMAIL_CONFIRMATION_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}
