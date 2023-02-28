import instance from "./configurations/configurations";
import { DOCUMENT_URLS } from "../constants/urls";

export default class documentsService {
  static addDocumentToProject(model) {
    return instance.post(DOCUMENT_URLS.ADD, model);
  }

  static deleteDocument(model) {
    return instance.delete(DOCUMENT_URLS.DELETE + "?documentId=" + model);
  }

  static getAllDocumentsUser(modal) {
    return instance.get(DOCUMENT_URLS.ALL_FOR_USER + "?projectId=" + modal);
  }
}
