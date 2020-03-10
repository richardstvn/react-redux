import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length == 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed (" + error + ")");
      });
    }

    if (authors.length == 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed (" + error + ")");
      });
    }
  }, []);

  return (
    <>
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
      ></CourseForm>
    </>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
};

/* const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}; */

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
