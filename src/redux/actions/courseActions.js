import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCalls, apiCallError } from "./apiStatusActions";

export function addCourseSuccess(course) {
  return { type: types.ADD_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginApiCalls());
    return courseApi
      .getCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginApiCalls());
    return courseApi
      .saveCourse(course)
      .then(savedCourse =>
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(addCourseSuccess(savedCourse))
      )
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
