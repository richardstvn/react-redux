import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as courseActions from "../../redux/actions/courseActions";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  /**
   * Component mounted
   */
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Loading courses failed (" + error + ")");
    });
  }

  /**
   * UI
   */
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses}></CourseList>
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  debugger;
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  debugger;
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
