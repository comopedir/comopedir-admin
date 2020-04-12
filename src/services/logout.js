import React, { useContext } from "react";
import {
  Redirect
} from "react-router-dom";
import { Context } from '../context/ContextProvider';

export default () => {
  
  const context = useContext(Context);

  context.setLogoff();
  
  return <Redirect to="/login"/>;
}
