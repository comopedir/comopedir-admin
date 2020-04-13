import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import AirtableBusinessWidget from '../../../components/AirtableBusinessWidget';

export const GET_AIRTABLE_BUSINESS = gql`
  query getAirtableBusiness($airtableId: String) {
    airtableBusiness(airtableId: $airtableId) {
      id
      airtableId
      name
      services
      channels
      categories
      pictures
      website
      whatsapp
      phone
      state
      city
      instagram
      email
      approved
    }
  }
`;

const AirtableConfiguration = () => {

  const { airtableId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_AIRTABLE_BUSINESS, {
    variables: { airtableId },
  });

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <div className="widget_container">
        <AirtableBusinessWidget 
          className="list blue" 
          data={data.airtableBusiness}
          refetch={refetch}
        />
      </div>
    </Fragment>
  );
};

export default AirtableConfiguration;
