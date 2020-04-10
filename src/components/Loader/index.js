import React, { Fragment } from 'react';

const Loader = props => {
  const { loading, message } = props;

  if (loading) return <div>{message}</div>

  return <Fragment />
};

export default Loader;
