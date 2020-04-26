import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_BUSINESS } from '../../../queries';
import BusinessWidget from '../../../components/BusinessWidget';

const Configuration = () => {

  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_BUSINESS, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <div className="list blue">
        <BusinessWidget 
          className="widget col2 yellow" 
          title="Dados do restaurante"
          data={data.business}
          refetch={refetch}
        />
      </div>
    </Fragment>
  );
};

export default Configuration;
