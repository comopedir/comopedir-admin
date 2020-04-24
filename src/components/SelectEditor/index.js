import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Loader from '../Loader';

const SelectEditor = ({
  id, 
  mutation, 
  input, 
  field,
  collection,
  legend,
  value,
  refetch,
}) => {

const SELECT_EDITOR_COLLECTION_QUERY = gql`
  query collectionItems {
    ${collection}(first: 9999) {
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

const [error, setError] = useState([]);
const { register, errors, handleSubmit } = useForm();

const SELECT_EDITOR_MUTATION = gql`
  mutation ($input: ${input}!) {
    ${mutation}(input: $input) {
      business {
        id
      }
    }
  } 
`;
  
  const [updateTextMutation, { loading }] = useMutation(
    SELECT_EDITOR_MUTATION
  );
  
  const [formValue, setFormValue] = useState("");

  const onSubmit = async data => {  
    try {
      setError('');

      await updateTextMutation({
        variables: {
          input: {
            business: id,
            field,
            value: formValue,
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

  const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(SELECT_EDITOR_COLLECTION_QUERY, {
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
          <label htmlFor={field}>{legend}:</label>
            <select
              name={field}
              ref={register({ required: false })}
              onChange={e => setFormValue(e.target.value)}
              defaultValue={value ? value.id : null}
            >
              <option value="">Selecione...</option>
              {
                edges.map(item => {
                  return (
                    <option
                      key={item.node.id}
                      value={item.node.id}
                    >{item.node.name} - ({item.node.slug})</option>
                  )
                })
              }

            </select>
          <input type="submit" value="Atualizar" />
        </div>
        <div className="errors">
          {errors[field] && <span>{`${legend} precisa ser preenchido.`}.</span>}
          {error && <span>{error}</span>}
        </div>
      </form>
    </>
  );
}

export default SelectEditor;