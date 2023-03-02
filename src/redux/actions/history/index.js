import * as CONSTANTS from "./types";

export const setHistory = (history) => {
    if (!history)
        return {
            type: CONSTANTS.SET_HISTORY,
            payload: {
                documentId: 0,
                documentName: ""
            }
        };

    return {
        type: CONSTANTS.SET_HISTORY,
        payload: history
    };
}
