import React, { Component, createContext } from 'react';

const Context = createContext();

class ContextProvider extends Component {
  state = {
    businessId: localStorage.getItem('@comopedir:businessId'),
    setBusinessId: businessId => this.setState({ businessId }),
  };

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.businessId !== prevState.businessId) {
      localStorage.setItem('@comopedir:businessId', this.state.businessId);
    }
    
  }
  render() {
    const {
      businessId,
      setBusinessId,
    } = this.state;

    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          businessId,
          setBusinessId,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export { ContextProvider, Context };
export default Context.Consumer;
