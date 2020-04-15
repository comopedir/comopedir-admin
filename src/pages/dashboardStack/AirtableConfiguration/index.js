import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_AIRTABLE_BUSINESS, GET_BUSINESS_BY_AIRTABLE_ID } from '../../../queries';
import AirtableBusinessWidget from '../../../components/AirtableBusinessWidget';


const AirtableConfiguration = () => {

  const { airtableId } = useParams();
  
  const {
    loading: airtableLoading, 
    error: airtableError, 
    data: airtableData, 
    refetch: airtableRefetch
  } = useQuery(GET_AIRTABLE_BUSINESS, {
    variables: { airtableId },
  });

  const {
    loading: businessLoading, 
    error: businessError, 
    data: businessData, 
    refetch: businessRefetch 
  } = useQuery(GET_BUSINESS_BY_AIRTABLE_ID, {
    variables: { airtableId },
  });

  if (airtableLoading || businessLoading) return <div>Carregando</div>;
  if (airtableError || businessError) return <div>Algo deu errado.</div>;

  return (
    <Fragment>
      <div className="widget_container">
        <AirtableBusinessWidget 
          className="list blue" 
          airtableData={airtableData.airtableBusiness}
          businessData={businessData.business}
          airtableRefetch={airtableRefetch}
          businessRefetch={businessRefetch}
        />
      </div>
    </Fragment>
  );
};

export default AirtableConfiguration;
