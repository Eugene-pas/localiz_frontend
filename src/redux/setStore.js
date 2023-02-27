import {setProfile} from "./actions/auth/index";
import {setProject} from "./actions/projects/index";
import { getUserProfileInfo } from "../services/users";
import { getAllProjectsUser } from "../services/projects";
import { store } from "./store";


export const setStore = async () => {
    store.dispatch(setProfile(await getUserProfileInfo()));
    store.dispatch(
        setProject( 
            { 
                projects: await getAllProjectsUser()
            }));
};

export const setProjectData = async () => {
    store.dispatch(
        setProject( 
            { 
                projects: await getAllProjectsUser()
            }));
};
