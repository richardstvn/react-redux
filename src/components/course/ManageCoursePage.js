import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { saveCourse, loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length == 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed (" + error + ")");
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length == 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed (" + error + ")");
      });
    }
  }, [props.course]);

  /**
   * Capture form fields changes
   */
  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * Save form
   */
  const handleSave = event => {
    event.preventDefault();
    saveCourse(course).then(() => history.push("/courses"));
  };

  return (
    <>
      <CourseForm
        course={course}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
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
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const findCourseBySlug = (courses, slug) => {
  return courses.find(course => (course.slug === slug ? course : null));
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? findCourseBySlug(state.courses, ownProps.match.params.slug)
      : newCourse;
  return {
    course,
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
  loadAuthors,
  saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
