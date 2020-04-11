import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import BusinessList from '../../../components/BusinessList';

export const GET_BUSINESSES = gql`
  query allSellers {
    businesses(first: 9999) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

const Dashboard = props => {

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
