import instance from "./configurations/configurations";
import { HISTORY_URLS } from "../constants/urls";

export default class translateHistoryService {
    static getHistoryRange(model) {
      return instance.get(HISTORY_URLS.GET_RANGE + 
          `?ContentId=${model.contentId}
          &PaginationFilter.PageNumber=${model.pageNumber}
          &PaginationFilter.PageSize=${model.pageSize}`);
    }
  }
