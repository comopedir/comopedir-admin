import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_PAYMENT_TYPE } from '../../../queries';
import PaymentTypeEdit from '../../../components/PaymentTypeEdit';

export default () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_PAYMENT_TYPE, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <div className="list blue">
        <PaymentTypeEdit 
          className="widget col2 yellow" 
          title="Dados do tipo de pagamento"
          data={data.paymentType}
          refetch={refetch}
        />
      </div>
    </Fragment>
  );
};
