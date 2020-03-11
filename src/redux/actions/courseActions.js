import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function addCourseSuccess(course) {
  return { type: types.ADD_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse =>
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(addCourseSuccess(savedCourse))
      )
      .catch(error => {
        throw error;
      });
  };
}
