import instance from "./configurations/configurations";
import { HISTORY_URLS } from "../constants/urls";

export default class translateHistoryService {
  static translate(model) {
    return instance.post(HISTORY_URLS.TRANSLATE, model);
  }

  static writeHistory(model) {
    return instance.post(HISTORY_URLS.WRITE + `?documentId=${model}`);
  }

  static getHistoryRange(model) {
    return instance.get(HISTORY_URLS.GET_RANGE + 
        `?DocumentId=${model.documentId}
        &PaginationFilter.PageNumber=${model.pageNumber}
        &PaginationFilter.PageSize=${model.pageSize}`);
  }
}
