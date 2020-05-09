import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_CATEGORIES } from '../../../queries';
import CategoryList from '../../../components/CategoryList';

const Category = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <CategoryList data={data}/>
    </Fragment>
  );
};

export default Category;
