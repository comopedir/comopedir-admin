import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_BUSINESSES } from '../../../queries';
import BusinessList from '../../../components/BusinessList';

const Dashboard = () => {

  const { loading, error, data } = useQuery(GET_BUSINESSES);

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <BusinessList data={data}/>
    </Fragment>
  );
};

export default Dashboard;
