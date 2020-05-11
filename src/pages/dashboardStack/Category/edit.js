import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_CATEGORY } from '../../../queries';
import CategoryEdit from '../../../components/CategoryEdit';

export default () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_CATEGORY, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <div className="list blue">
        <CategoryEdit 
          className="widget col2 yellow" 
          title="Dados da Categoria"
          data={data.category}
          refetch={refetch}
        />
      </div>
    </Fragment>
  );
};
