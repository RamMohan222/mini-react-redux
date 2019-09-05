import { combineReducers, applyMiddleware, createStore } from "redux";
import { ADD_STUDENT } from "../Actions";

const logger = store => next => action => {
  console.log("Before:", action.type, store.getState());
  next(action);
  console.log("After:", action.type, store.getState());
};

const initStudents = [{ name: "Ram", dob: "1990-01-01", course: "MCA" }];
const studentReducer = (students = initStudents, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return [...students, action.payload.student];
    default:
      return students;
  }
};

const collegeReducer = (college = {}, action) => {
  return college;
};

const reducer = combineReducers({
  students: studentReducer,
  college: collegeReducer
});

const store = createStore(reducer, {}, applyMiddleware(logger));
export default store;
