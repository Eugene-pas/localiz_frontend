import { SET_PROJECT } from "../actions/projects/types";

const intialState = {
    projects: [
        {
            id: 0,
            name: "",
            description: "",
            creationDate: "",
            finishDate: "",
            fromTranslate: "",
            toTranslate: ""
        }
    ]
}

const projectReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_PROJECT: {

            return { ...action.payload };
        }

        default: {
            return state;
        }
    }
}

export default projectReducer;
