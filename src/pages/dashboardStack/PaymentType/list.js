import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_PAYMENT_TYPES } from '../../../queries';
import PaymentTypeList from '../../../components/PaymentTypeList';

export default () => {
  const { loading, error, data } = useQuery(GET_PAYMENT_TYPES);

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <PaymentTypeList data={data}/>
    </Fragment>
  );
};

