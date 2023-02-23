import { SET_PROFILE } from "../actions/auth/types";

const intialState = {
    name: "",
    surname: "",
    email: ""
}

const profileReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_PROFILE: {

            return { ...action.payload };
        }

        default: {
            return state;
        }
    }
}

export default profileReducer;
