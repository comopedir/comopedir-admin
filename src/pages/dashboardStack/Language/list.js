import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_LANGUAGES } from '../../../queries';
import LanguageList from '../../../components/LanguageList';

export default () => {
  const { loading, error, data } = useQuery(GET_LANGUAGES);

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <LanguageList data={data}/>
    </Fragment>
  );
};

