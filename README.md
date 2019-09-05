## Mini-React-Redux

To connect redux store we need to use `react-redux` package. For small scall to medium scall applications if we don't want to use all features from `react-redux` package. then we can implement our own redux Provide by using context api. The `react-redux` package also internally using the context api. With this Provider implementation we can achive basic functionalities whichever provided by `react-redux`. For new developers it will give basic idea how internally `react-redux` connecting the redux store to our App components.

```jsx
import React from "react";

const isFunction = fun => typeof fun === "function";
const emptyfun = () => {};

const Store = React.createContext({});

const connect = (
  mapStateCallback = emptyfun,
  mapDispatchCallback = emptyfun,
  mergePropsCallback = emptyfun
) => WrappedComponent => {
  return compProps => (
    <Store.Consumer>
      {ctxProps => {
        const stateProps = isFunction(mapStateCallback)
          ? mapStateCallback(ctxProps.state, compProps)
          : {};
        const actionProps = isFunction(mapDispatchCallback)
          ? mapDispatchCallback(ctxProps.dispatch, compProps)
          : {};
        const mergeProps = isFunction(mergePropsCallback)
          ? mergePropsCallback(ctxProps.state, ctxProps.dispatch, compProps)
          : {};
        return (
          <WrappedComponent
            {...compProps}
            {...stateProps}
            {...actionProps}
            {...mergeProps}
          />
        );
      }}
    </Store.Consumer>
  );
};

export default class Provider extends React.Component {
  constructor({ store }) {
    super({ store });
    this.state = { ...store.getState() };
  }

  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => this.updateState(store));
  }

  updateState = store => {
    this.setState(state => ({ ...state, ...store.getState() }));
  };

  render() {
    const { dispatch } = this.props.store;
    const { state } = this;
    return (
      <Store.Provider value={{ state, dispatch }}>
        {this.props.children}
      </Store.Provider>
    );
  }
}

// It will compose all HOC and return finall wrappedComponent
const compose = (...hocs) => WrappedComponent =>
  hocs.reduce((component, hoc) => hoc(component), WrappedComponent);

export { connect, compose, Provider };

```
### Example:

Creating store and passing store to Provider
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./Context/Provider";

const counterReducer = (count = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return count + 1;
    case 'DECREMENT':
      return count - 1;
    default:
      return count;
  }
};

const reducer = combineReducers({ counter: counterReducer });
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

```
connecting components with store with `connect`
```jsx
const mapState = ({ counter }) => ({ counter });
const mapActions = dispatch => {
  return {
    increment: ()=>dispatch({type:'INCREMENT'})
  };
};

export default connect(
  mapState,
  mapActions
)(App);
```



