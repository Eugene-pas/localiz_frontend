import { SET_DOCUMENT } from "../actions/documets/types";

const intialState = {
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

const documentReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_DOCUMENT: {

            return { ...action.payload };
        }

        default: {
            return state;
        }
    }
}

export default documentReducer;
