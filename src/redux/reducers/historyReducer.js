import { SET_HISTORY } from "../actions/history/types";

const intialState = {
    documentId: 0,
    documentName: "",
    isUpdate: true
}

const historyReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_HISTORY: {

            return { ...action.payload };
        }

        default: {
            return state;
        }
    }
}

export default historyReducer;
