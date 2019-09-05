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
