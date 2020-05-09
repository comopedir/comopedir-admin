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
import Configuration from "./pages/dashboardStack/Configuration";
import AirtableConfiguration from "./pages/dashboardStack/AirtableConfiguration";
import Category from "./pages/dashboardStack/Category";


import Import from "./pages/dashboardStack/Import";

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
          <PrivateRoute path="/import/business/:airtableId">
            <h2>Airtable - Estabelecimento</h2>
            <AirtableConfiguration />
          </PrivateRoute>
          <PrivateRoute path="/import">
            <h2>Importação</h2>
            <h3>Estabelecimentos</h3>
            <Import />
          </PrivateRoute>
          <PrivateRoute path="/config/:id">
            <h2>Configurações</h2>
            <Configuration />
          </PrivateRoute>
          <PrivateRoute path="/categories">
            <h2>Categorias</h2>
            <Category />
          </PrivateRoute>
          <Route exact path="/" render={() => (
            context.token ? (
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