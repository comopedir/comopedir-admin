import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import AirtableBusinessList from '../../../components/AirtableBusinessList';

export const GET_AIRTABLE_BUSINESSES = gql`
  query allAirtableBusinesses {
    airtableBusinesses(first: 9999) {
      edges {
        node {
          id
          name
          airtableId
        }
      }
    }
  }
`;

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
