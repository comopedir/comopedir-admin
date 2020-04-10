import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Context } from './context/ContextProvider';

import Header from "./components/Header"

import PrivateRoute from "./helpers/PrivateRoute";
import SignIn from "./pages/authStack/SignIn";
import SignOff from "./services/logout";
import Dashboard from "./pages/dashboardStack/Dashboard";
import Configurations from "./pages/dashboardStack/Configurations";

export default function Routes() {

  const context = useContext(Context);

  return (
    <Router>
      <div className="main">
        <Header />
        <Switch>
          <Route path="/login">
            <h2>Identificação</h2>
            <SignIn />
          </Route>
          <Route path="/logoff">
            <SignOff />
          </Route>
          <PrivateRoute path="/dashboard">
            <h2>Dashboard</h2>
            <h3>Estabelecimentos</h3>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/config/:username">
            <h2>Configurações</h2>
            <Configurations />
          </PrivateRoute>
          <Route exact path="/" render={() => (
            context.sellerId ? (
              <Redirect to="/dashboard"/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
        </Switch>
      </div>
    </Router>
  )
}