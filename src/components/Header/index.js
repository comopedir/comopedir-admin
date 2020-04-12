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
          <Link to="/logoff">Sair do sistema</Link>
        ) : (
          <Fragment />
        )
      }
    </>
  )
}