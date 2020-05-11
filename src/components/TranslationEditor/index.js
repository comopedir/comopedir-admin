import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import TranslationForm from './form';

const TranslationEditor = ({
  id, 
  mutation, 
  input,
  node,
  value,
  refetch,
}) => {

  const LANGUAGES_QUERY = gql`
    query collectionItems {
      languages(first: 9999) {
        edges {
          node {
            id
            isoCode
            name
          }
        }
      }
    }
  `;

  const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(LANGUAGES_QUERY, {
    variables: { id },
  });
  
  if (collectionLoading) return <div>Carregando</div>;
  if (collectionError) return <div>Algo deu errado.</div>;

  const { edges: languages } = collectionData.languages;

  return (
    <>
      {
        languages.map(language => (
          <TranslationForm
            key={language.node.id}
            id={id}
            mutation={mutation}
            input={input}
            node={node}
            value={value}
            language={language}
            refetch={refetch}
          />
        ))
      }
    </>
  );
}

export default TranslationEditor;