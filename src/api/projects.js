import instance from "./configurations/configurations";
import { PROJECTS_URLS } from "../constants/urls";

export default class projectsService {
  static addUserToProject(model) {
    return instance.post(PROJECTS_URLS.ADD_USER, model);
  }

  static createProject(model) {
    return instance.post(PROJECTS_URLS.CREATE, model);
  }

  static getAllProjectsUser() {
    return instance.get(PROJECTS_URLS.ALL_FOR_USER);
  }
}
