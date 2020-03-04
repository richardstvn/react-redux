import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as courseActions from "../../redux/actions/courseActions";

class CoursesPage extends React.Component {
  /**
   * Class fields
   */
  state = {
    course: {
      title: ""
    }
  };

  /**
   * Events
   */
  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    debugger;
    this.props.actions.createCourse(this.state.course);
  };

  /**
   * UI
   */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <label>
          Title:
          <input
            type="text"
            value={this.state.course.title}
            onChange={this.handleChange}
          ></input>
          <input type="submit" value="Save"></input>
          {this.props.courses.map(course => (
            <div key={course.title}>{course.title}</div>
          ))}
        </label>
      </form>
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
