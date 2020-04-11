import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import BusinessWidget from '../../../components/BusinessWidget';

export const GET_BUSINESS = gql`
  query getBusiness($id: String) {
    business(id: $id) {
      id
      network {
        id
        slug
        name
      }
      slug
      name
      addresses {
        id
        latitude
        longitude
        current
        street
        streetNumber
        complement
        district
        city
        state
        zipCode
        country
        createdAt
        updatedAt
      }
      categories {
        id
        slug
        id
        translations {
          language {
            id
            isoCode
            name
          }
          name
          description
        }
      }
      channels {
        id
        channel {
          id
          name
        }
        value
      }
      services {
        id
        slug
        priority
        translations {
          id
          language {
            id
            isoCode
            name
          }
          name
          description
        }
      }
      paymentTypes {
        id
        slug
        priority
        translations {
          id
          language {
            id
            isoCode
            name
          }
          name
          description
        }
      }
      pictures {
        id
        type
        description
        originId
        raw {
          id
          url
          size
          width
          height
        }
        small {
          id
          url
          size
          width
          height
        }
        large {
          id
          url
          size
          width
          height
        }
      }
      createdAt
      updatedAt
    }
  }
`;

const Configurations = () => {

  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_BUSINESS, {
    variables: { id },
  });

  if (loading) return <div>Carregando</div>;
  if (error) return <div>Algo deu errado.</div>;
  
  return (
    <Fragment>
      <div className="widget_container">
        <BusinessWidget 
          className="widget col2 yellow" 
          title="Dados do restaurante"
          data={data.seller}
          refetch={refetch}
        />
      </div>
    </Fragment>
  );
};

export default Configurations;
