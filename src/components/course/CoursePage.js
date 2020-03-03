import React from "react";

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
    alert(this.state.course.title);
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
        </label>
      </form>
    );
  }
}

export default CoursesPage;
