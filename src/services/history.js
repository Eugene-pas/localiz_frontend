import { translateHistoryMessages } from "../constants/messages/history";
import { errorMessage } from "./alerts";
import { generalMessages } from "../constants/messages/general";
import translateHistoryService from "../api/history"; 

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
