import * as CONSTANTS from "./types";

export const setContent = (content) => {
    if (!content)
        return {
            type: CONSTANTS.SET_CONTENT,
            payload: {
                documentId: 0,
                documentName: "",
                isUpdate: true
            }
        };

    return {
        type: CONSTANTS.SET_CONTENT,
        payload: content
    };
}
