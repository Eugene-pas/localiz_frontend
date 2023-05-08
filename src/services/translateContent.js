import { translateContentMessages } from "../constants/messages/translateContent";
import { errorMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import translateContentService from "../api/translateContent"; 

export function writeContent(model) {
    return translateContentService
        .writeContent(model)
        .then(
            () => {
                return true;
            },
            ({ response }) => {
                if (response.data !== null) {
                    if (response.data.split('').at(-1) !== "!")
                        errorMessage(
                            translateContentMessages.WRITE_HISTORY_FAILED,
                            response.data + '!'
                        );
                    else {
                        errorMessage(
                            translateContentMessages.WRITE_HISTORY_FAILED,
                            response.data
                        );
                    }
                }
                else
                    errorMessage(
                        translateContentMessages.WRITE_HISTORY_FAILED,
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

export function translate(model) {
    return translateContentService
        .translate(model)
        .then(
            () => {
                return true;
            },
            () => {
                errorMessage(
                    translateContentMessages.TRANSLATE_FAILED,
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

export function getContentRange(modal) {
    return translateContentService
        .getContentRange(modal)
        .then(
            (res) => {
                return res.data;
            },
            () => {
                errorMessage(
                    translateContentMessages.TRANSLATE_FAILED,
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

export function translationDocument(model) {
    return translateContentService
        .translationDocument(model)
        .then(
            () => {
                return true;
            },
            () => {
                errorMessage(
                    translateContentMessages.TRANSLATE_FAILED,
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
