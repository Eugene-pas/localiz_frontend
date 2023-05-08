import instance from "./configurations/configurations";
import { CONTENT_URLS } from "../constants/urls";

export default class translateContentService {
  static translate(model) {
    return instance.post(CONTENT_URLS.TRANSLATE, model);
  }

  static writeContent(model) {
    return instance.post(CONTENT_URLS.WRITE + `?documentId=${model}`);
  }

  static getContentRange(model) {
    return instance.get(CONTENT_URLS.GET_RANGE + 
        `?DocumentId=${model.documentId}
        &PaginationFilter.PageNumber=${model.pageNumber}
        &PaginationFilter.PageSize=${model.pageSize}`);
  }

  static translationDocument(model) {
    return instance.post(CONTENT_URLS.TRANSLATE_DOCUMENT, model);
  }
}
