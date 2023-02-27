import * as CONSTANTS from "./types";

export const setProject = (projects) => {
    return {
        type: CONSTANTS.SET_PROJECT,
        payload: projects
    };
}
