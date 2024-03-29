import { userMessages } from "../constants/messages/users";
import { errorMessage, successMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import usersService from "../api/users";
import { checkIsUserRoleValid } from "./authentication";

export function getUserProfileInfo() {
    return usersService
        .getUserInfo()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    userMessages.GET_USER_INFO_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.GET_USER_INFO_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function editUserInfo(model) {

    // since the menu will be on all pages, the render menu calls this function,
    // and here we call the role check to prevent manual role change
    checkIsUserRoleValid();

    return await usersService
        .editUserInfo(model)
        .then(
            () => {
                successMessage(userMessages.EDIT_USER_PROFILE_SUCCESS);

                return true;
            },
            () => {
                errorMessage(
                    userMessages.EDIT_USER_PROFILE_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.EDIT_USER_PROFILE_FAILED,
                userMessages.EDIT_USER_PROFILE_INFO_FAILED_EMAIL_ALREADY_EXIST,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}

export async function getFullUserName() {
    return await usersService
        .getFullUserName()
        .then(
            (response) => {
                return response.data;
            },
            () => {
                errorMessage(
                    userMessages.GET_USER_FULL_NAME_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(() => {
            errorMessage(
                userMessages.GET_USER_FULL_NAME_FAILED,
                generalMessages.SOMETHING_WENT_WRONG
            );
        });
}
