import { bindActionCreators } from "redux";

export const ADD_STUDENT = "ADD_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";

//Action Creators
export const addStudentAction = student => ({
  type: ADD_STUDENT,
  payload: { student }
});

export const deleteStudentAction = studentId => ({
  type: ADD_STUDENT,
  payload: { studentId }
});

// binding all action creators and convert to actions
export const _studentActions = dispatch => {
  return bindActionCreators(
    { addStudent: addStudentAction, deleteStudent: deleteStudentAction },
    dispatch
  );
};

// this is alternative for bindActionCreators to generate actions
export const studentActions = dispatch => {
  return {
    /** by using action creator */
    addStudent: student => dispatch(addStudentAction(student)),
    /** by defining action directly */
    deleteStudent: studentId =>
      dispatch({ type: DELETE_STUDENT, payload: { studentId } })
  };
};
