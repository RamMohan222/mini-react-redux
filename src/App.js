import React from "react";
import "./App.css";

import Student from "./Components/Student";
import AddStudentForm from "./Components/AddStudentForm";
import { connect } from "./Context/Provider";

function App(props) {
  return (
    <div className="App">
      <p>College</p>
      <h3>Students</h3>
      <AddStudentForm />
      {props.students.map(student => (
        <Student
          name={student.name}
          dob={student.dob}
          course={student.course}
        />
      ))}
    </div>
  );
}

const mapState = ({ students, college }) => ({ students, college });

export default connect(
  mapState,
  null
)(App);
