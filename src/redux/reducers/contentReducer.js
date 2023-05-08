import { SET_CONTENT } from "../actions/content/types";

const intialState = {
    documentId: 0,
    documentName: "",
    isUpdate: true
}

const contentReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_CONTENT: {

            return { ...action.payload };
        }

        default: {
            return state;
        }
    }
}

export default contentReducer;
