import { translateHistoryMessages } from "../constants/messages/translateHistory";
import { errorMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import translateHistoryService from "../api/translateHistory"; 

export function writeHistory(model) {
    return translateHistoryService
        .writeHistory(model)
        .then(
            () => {
                return true;
            },
            ({ response }) => {
                if (response.data !== null) {
                    if (response.data.split('').at(-1) !== "!")
                        errorMessage(
                            translateHistoryMessages.WRITE_HISTORY_FAILED,
                            response.data + '!'
                        );
                    else {
                        errorMessage(
                            translateHistoryMessages.WRITE_HISTORY_FAILED,
                            response.data
                        );
                    }
                }
                else
                    errorMessage(
                        translateHistoryMessages.WRITE_HISTORY_FAILED,
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
    return translateHistoryService
        .translate(model)
        .then(
            () => {
                return true;
            },
            () => {
                errorMessage(
                    translateHistoryMessages.TRANSLATE_FAILED,
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

export function getHistoryRange(modal) {
    return translateHistoryService
        .getHistoryRange(modal)
        .then(
            (res) => {
                return res.data;
            },
            () => {
                errorMessage(
                    translateHistoryMessages.TRANSLATE_FAILED,
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
    return translateHistoryService
        .translationDocument(model)
        .then(
            () => {
                return true;
            },
            () => {
                errorMessage(
                    translateHistoryMessages.TRANSLATE_FAILED,
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
