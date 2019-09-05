import React from "react";
import { connect } from "../Context/Provider";
import { addStudentAction } from "../Actions";

class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: { name: "", dob: "", course: "" }
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { student } = this.state;
    student[name] = value;
    this.setState({ student });
  };

  handleSubmit = () => {
    const { student } = this.state;
    this.props.addStudent(student);
  };
  
  render() {
    const { student } = this.state;
    return (
      <React.Fragment>
        <div>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          DOB:
          <input
            type="date"
            alt="yyyy-mm-dd"
            name="dob"
            value={student.dob}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Course:
          <input
            type="text"
            alt="MCA/MBA"
            name="course"
            value={student.course}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}

// to load preticuler actions
const mapActions = dispatch => {
  return {
    addStudent: student => dispatch(addStudentAction(student))
  };
};

export default connect(
  null,
  mapActions
)(AddStudentForm);
