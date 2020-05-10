import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_LANGUAGE } from '../../../queries';
import LanguageEdit from '../../../components/LanguageEdit';

export default () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_LANGUAGE, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <div className="list blue">
        <LanguageEdit 
          className="widget col2 yellow" 
          title="Dados da Linguagem"
          data={data.category}
          refetch={refetch}
        />
      </div>
    </Fragment>
  );
};
