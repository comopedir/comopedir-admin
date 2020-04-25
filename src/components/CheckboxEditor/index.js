import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Loader from '../Loader';

const CheckboxEditor = ({
  id, 
  mutation, 
  input, 
  field,
  collection,
  collectionAssociation,
  legend,
  value,
  refetch,
}) => {
  const CHECKBOX_EDITOR_COLLECTION_QUERY = gql`
    query collectionItems {
      ${collection}(first: 9999) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `;

  const [error, setError] = useState([]);
  const { register, handleSubmit } = useForm();

  const CHECKBOX_EDITOR_MUTATION = gql`
    mutation ($input: ${input}!) {
      ${mutation}(input: $input) {
        ${collectionAssociation} {
          id
        }
      }
    } 
  `;
    
  const [updateCheckboxMutation, { loading }] = useMutation(
    CHECKBOX_EDITOR_MUTATION
  );
  
  const onSubmit = async data => {  

    try {
      setError('');

      const updateData = {};
      updateData[collection] = data[collection];

      await updateCheckboxMutation({
        variables: {
          input: {
            business: id,
            ...updateData,
          },
        },
      });

      setError('');

      alert('Alteração concluída com sucesso.')

      refetch();

    } catch (err) {
      if (err.graphQLErrors?.length > 0) {
        setError(err.graphQLErrors[0].message);
      }
      else
      {
        console.log('Err:', err);
        setError('Erro desconhecido.');
      }
    }

  };

  const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(CHECKBOX_EDITOR_COLLECTION_QUERY, {
    variables: { id },
  });
  
  if (collectionLoading) return <div>Carregando</div>;
  if (collectionError) return <div>Algo deu errado.</div>;

  const { edges } = collectionData[collection];

  return (
    <>
      <Loader loading={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>{legend}</h3>
          {
            edges.map(item => {
              return (
                <Fragment key={item.node.id}>
                  <input
                    name={field}
                    ref={register({ required: false })}
                    type="checkbox"
                    id={item.node.slug}
                    defaultChecked={(() => {
                      const selected = value.filter(category => category.id === item.node.id);
                      return selected.length > 0;
                    })()}
                    value={item.node.id}
                  />
                  <label htmlFor={item.node.slug}>{item.node.slug}</label>
                </Fragment>
              )
            })
          }            
          <input type="submit" value="Atualizar" />
        </div>
        <div className="errors">
          {error && <span>{error}</span>}
        </div>
      </form>
    </>
  );
}

export default CheckboxEditor;