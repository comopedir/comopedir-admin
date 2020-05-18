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
import Categories from "./pages/dashboardStack/Category/list";
import Category from "./pages/dashboardStack/Category/edit";
import PaymentTypes from "./pages/dashboardStack/PaymentType/list";
import PaymentType from "./pages/dashboardStack/PaymentType/edit";
import Languages from "./pages/dashboardStack/Language/list";
import Language from "./pages/dashboardStack/Language/edit";
import LanguageNew from "./pages/dashboardStack/Language/new";

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
            <Categories />
          </PrivateRoute>
          <PrivateRoute path="/category/:id">
            <h2>Categoria</h2>
            <Category />
          </PrivateRoute>
          <PrivateRoute path="/paymentTypes">
            <h2>Tipos de pagamentos</h2>
            <PaymentTypes />
          </PrivateRoute>
          <PrivateRoute path="/paymentType/:id">
            <h2>Tipo de pagamento</h2>
            <PaymentType />
          </PrivateRoute>
          <PrivateRoute path="/languages">
            <h2>Linguagens</h2>
            <Languages />
          </PrivateRoute>
          <PrivateRoute path="/language/new">
            <h2>Linguagem - Criar</h2>
            <LanguageNew />
          </PrivateRoute>
          <PrivateRoute path="/language/:id">
            <h2>Linguagem</h2>
            <Language />
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