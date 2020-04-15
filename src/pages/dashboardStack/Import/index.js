import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_AIRTABLE_BUSINESSES } from '../../../queries';
import AirtableBusinessList from '../../../components/AirtableBusinessList';

const Dashboard = props => {

  const { loading, error, data } = useQuery(GET_AIRTABLE_BUSINESSES);

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <AirtableBusinessList data={data}/>
    </Fragment>
  );
};

export default Dashboard;
