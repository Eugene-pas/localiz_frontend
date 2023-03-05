import { documentMessages } from "../constants/messages/documents";
import { errorMessage, successMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import documentsService from "../api/documents";

export function addDocumentToProject(model) {
    return documentsService
        .addDocumentToProject(model)
        .then(
            () => {
                successMessage(documentMessages.ADD_DOCUMENT_TO_PROJECT_SUCCESS)
                return true;
            },
            ({ response }) => {
                if (response.data !== null) {
                    if (response.data.split('').at(-1) !== "!")
                        errorMessage(
                            documentMessages.ADD_DOCUMENT_TO_PROJECT_FAILED,
                            response.data + '!'
                        );
                    else {
                        errorMessage(
                            documentMessages.ADD_DOCUMENT_TO_PROJECT_FAILED,
                            response.data
                        );
                    }
                }
                else
                    errorMessage(
                        documentMessages.ADD_DOCUMENT_TO_PROJECT_FAILED,
                        generalMessages.SOMETHING_WENT_WRONG
                    );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}

export function deleteDocument(model) {
    return documentsService
        .deleteDocument(model)
        .then(
            () => {
                successMessage(documentMessages.DELETE_DOCUMENT_SUCCESS)
                return true;
            },
            () => {
                errorMessage(
                    documentMessages.DELETE_DOCUMENT_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}

export function getAllDocumentsUser(modal) {
    return documentsService
        .getAllDocumentsUser(modal)
        .then(
            (res) => {
                return res.data;
            },
            () => {
                errorMessage(
                    documentMessages.GET_ALL_DOCUMENT_USER_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}

export function download(modal) {
    return documentsService
        .download(modal.documentId)
        .then(
            (res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', modal.documentName);
                document.body.appendChild(link);
                link.click(); 
            },
            () => {
                errorMessage(
                    documentMessages.DOWNLOAD_FAILED,
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
        .catch(
            (res) => {
                console.error(res);
                errorMessage(
                    generalMessages.SOMETHING_WENT_WRONG
                );
            }
        )
}
