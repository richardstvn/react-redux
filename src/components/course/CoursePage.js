import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  /**
   * Component mounted
   */
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length == 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed (" + error + ")");
      });
    }

    if (authors.length == 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed (" + error + ")");
      });
    }
  }

  /**
   * UI
   */
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList
          courses={this.props.courses}
          authors={this.props.authors}
        ></CourseList>
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.authors.length == 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id == course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
