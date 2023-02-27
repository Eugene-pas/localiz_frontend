import { projectMessages } from "../constants/messages/projects";
import { errorMessage, successMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import projectsService from "../api/projects";

export function addUserToProject(model) {
    return projectsService
        .addUserToProject(model)
        .then(
            () => {
                successMessage(projectMessages.ADD_USER_TO_PROJECT_SUCCESS)
                return true;
            },
            ({ response }) => {
                if (response.data !== null) {
                    if (response.data.split('').at(-1) !== "!")
                        errorMessage(
                            projectMessages.ADD_USER_TO_PROJECT_FAILED,
                            response.data + '!'
                        );
                    else {
                        errorMessage(
                            projectMessages.ADD_USER_TO_PROJECT_FAILED,
                            response.data
                        );
                    }
                }
                else
                    errorMessage(
                        projectMessages.ADD_USER_TO_PROJECT_FAILED,
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}

export function createProject(model) {
    return projectsService
        .createProject(model)
        .then(
            () => {
                successMessage(projectMessages.CREATE_PROJECT_SUCCESS)
                return true;
            },
            () => {
                errorMessage(
                    projectMessages.CREATE_PROJECT_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}

export function getAllProjectsUser() {
    return projectsService
        .getAllProjectsUser()
        .then(
            (res) => {
                return res.data;
            },
            () => {
                errorMessage(
                    projectMessages.GET_ALL_PROJECTS_USER_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}
