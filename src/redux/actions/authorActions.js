import actionTypes from "./actionTypes";
import authorApi from "../../authorApi.js";

export function loadAuthorsSuccess(authors) {}

export function loadAuthors() {
  return function(dispatch) {
    return authorApi
      .getAuthors()
      .then(authors => dispatch(loadCoursesSuccess(authors)))
      .catch(error => {
        throw error;
      });
  };
}
