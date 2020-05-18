import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from '../../context/ContextProvider';

export default () => {

  const context = useContext(Context);

  return (
    <>
      <h1>
        <Link to="/">Como pedir</Link>
      </h1>
      {
        context.token ? (
          <ul>
            <li><Link to="/dashboard">Estabelecimentos</Link></li>
            <li><Link to="/import">Importação (Airtable)</Link></li>
            <li><Link to="/categories">Categorias</Link></li>
            <li><Link to="/paymentTypes">Tipos de pagamento</Link></li>
            <li><Link to="/languages">Linguagens</Link></li>
            <li><Link to="/logoff">Sair do sistema</Link></li>
          </ul>
        ) : (
          <Fragment />
        )
      }
    </>
  )
}