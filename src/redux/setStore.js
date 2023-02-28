import { setProfile } from "./actions/auth/index";
import { setProject } from "./actions/projects/index";
import { setDocument } from "./actions/documets/index";
import { getUserProfileInfo } from "../services/users";
import { getAllProjectsUser } from "../services/projects";
import { getAllDocumentsUser } from "../services/document";
import { store } from "./store";

export const setStore = async () => {
    store.dispatch(setProfile(await getUserProfileInfo()));
    store.dispatch(
        setProject(
            {
                projects: await getAllProjectsUser()
            }));
    store.dispatch(setDocument());
};

export const setProjectData = async () => {
    store.dispatch(
        setProject(
            {
                projects: await getAllProjectsUser()
            }));
};

export const setDocumentData = async () => {
    const documentReducer = store.getState(state => state).documentReducer;

    if (documentReducer.projectId > 0 && documentReducer.projectId)
        documentReducer.documents = await getAllDocumentsUser(documentReducer.projectId)

    if (documentReducer.documents.length > 0)
        store.dispatch(setDocument(documentReducer));
    else{
        documentReducer.documents = null;
        store.dispatch(setDocument(documentReducer));
    }
        

};
