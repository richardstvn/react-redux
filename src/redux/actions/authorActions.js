import * as actionTypes from "./actionTypes";
import * as authorApi from "../../api/authorApi.js";
import { beginApiCalls, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCalls());
    return authorApi
      .getAuthors()
      .then(authors => dispatch(loadAuthorsSuccess(authors)))
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}
