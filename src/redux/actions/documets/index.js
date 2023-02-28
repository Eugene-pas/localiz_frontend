import * as CONSTANTS from "./types";

export const setDocument = (documents) => {
    if (!documents)
        return {
            type: CONSTANTS.SET_DOCUMENT,
            payload: {
                projectId: 0,
                projectName: "",
                documents: [
                    {
                        id: 0,
                        data: "",
                        name: "",
                        creationDate: "",
                        description: ""
                    }
                ]
            }
        };

    return {
        type: CONSTANTS.SET_DOCUMENT,
        payload: documents
    };
}
