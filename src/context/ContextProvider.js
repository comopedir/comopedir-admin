import React, { Component, createContext } from 'react';

const Context = createContext();

class ContextProvider extends Component {
  state = {
    setLogoff: () => this.logoff(),
    
    token: localStorage.getItem('@comopedir:token'),
    setToken: token => this.setState({ token }),

    role: localStorage.getItem('@comopedir:role'),
    setRole: role => this.setState({ role }),
    
    personId: localStorage.getItem('@comopedir:personId'),
    setPersonId: personId => this.setState({ personId }),

    personName: localStorage.getItem('@comopedir:personName'),
    setPersonName: personName => this.setState({ personName }),

    accountId: localStorage.getItem('@comopedir:accountId'),
    setAccountId: accountId => this.setState({ accountId }),

    phoneNumber: localStorage.getItem('@comopedir:phoneNumber'),
    setPhoneNumber: phoneNumber => this.setState({ phoneNumber }),

    phoneAreaCode: localStorage.getItem('@comopedir:phoneAreaCode'),
    setPhoneAreaCode: phoneAreaCode => this.setState({ phoneAreaCode }),

    phoneCountryCode: localStorage.getItem('@comopedir:phoneCountryCode'),
    setPhoneCountryCode: phoneCountryCode => this.setState({ phoneCountryCode }),

    email: localStorage.getItem('@comopedir:email'),
    setEmail: email => this.setState({ email }),

    status: localStorage.getItem('@comopedir:status'),
    setStatus: status => this.setState({ status }),
  };

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.token !== prevState.token) {
      localStorage.setItem('@comopedir:token', this.state.token);
    }

    if (this.state.role !== prevState.role) {
      localStorage.setItem('@comopedir:role', this.state.role);
    }

    if (this.state.personId !== prevState.personId) {
      localStorage.setItem('@comopedir:personId', this.state.personId);
    }

    if (this.state.personName !== prevState.personName) {
      localStorage.setItem('@comopedir:personName', this.state.personName);
    }

    if (this.state.accountId !== prevState.accountId) {
      localStorage.setItem('@comopedir:accountId', this.state.accountId);
    }

    if (this.state.phoneNumber !== prevState.phoneNumber) {
      localStorage.setItem('@comopedir:phoneNumber', this.state.phoneNumber);
    }

    if (this.state.phoneAreaCode !== prevState.phoneAreaCode) {
      localStorage.setItem('@comopedir:phoneAreaCode', this.state.phoneAreaCode);
    }

    if (this.state.phoneCountryCode !== prevState.phoneCountryCode) {
      localStorage.setItem('@comopedir:phoneCountryCode', this.state.phoneCountryCode);
    }

    if (this.state.email !== prevState.email) {
      localStorage.setItem('@comopedir:email', this.state.email);
    }

    if (this.state.status !== prevState.status) {
      localStorage.setItem('@comopedir:status', this.state.status);
    }
  }

  logoff() {
    localStorage.removeItem('@comopedir:token');
    localStorage.removeItem('@comopedir:role');
    localStorage.removeItem('@comopedir:personId');
    localStorage.removeItem('@comopedir:personName');
    localStorage.removeItem('@comopedir:accountId');
    localStorage.removeItem('@comopedir:phoneNumber');
    localStorage.removeItem('@comopedir:phoneAreaCode');
    localStorage.removeItem('@comopedir:phoneCountryCode');
    localStorage.removeItem('@comopedir:email');
    localStorage.removeItem('@comopedir:status');
  }

  render() {
    const {
      setLogoff,
      token,
      setToken,
      role,
      setRole,
      personId,
      setPersonId,
      personName,
      setPersonName,
      accountId,
      setAccountId,
      phoneNumber,
      setPhoneNumber,
      phoneAreaCode,
      setPhoneAreaCode,
      phoneCountryCode,
      setPhoneCountryCode,
      email,
      setEmail,
      status,
      setStatus,
    } = this.state;

    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          setLogoff,
          token,
          setToken,
          role,
          setRole,
          personId,
          setPersonId,
          personName,
          setPersonName,
          accountId,
          setAccountId,
          phoneNumber,
          setPhoneNumber,
          phoneAreaCode,
          setPhoneAreaCode,
          phoneCountryCode,
          setPhoneCountryCode,
          email,
          setEmail,
          status,
          setStatus,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export { ContextProvider, Context };
export default Context.Consumer;
