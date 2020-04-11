import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Loader from '../Loader';

const TextEditor = ({
  id, 
  mutation, 
  input, 
  field,
  legend,
  value,
  refetch,
  multiline = false,
}) => {

const [error, setError] = useState([]);
const { register, errors, handleSubmit } = useForm();

const TEXT_MUTATION_QUERY = gql`
  mutation ($input: ${input}!) {
    ${mutation}(input: $input) {
      seller {
        id
      }
    }
  } 
`;
  
  const [updateTextMutation, { loading }] = useMutation(
    TEXT_MUTATION_QUERY
  );
  
  const [formValue, setFormValue] = useState("");

  const onSubmit = async data => {  
    try {
      setError('');

      await updateTextMutation({
        variables: {
          input: {
            sellerId: id,
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

  return (
    <>
      <Loader loading={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={field}>{legend}:</label>
          {
            multiline ? (
              <textarea
                name={field}
                ref={register({ required: true })}
                defaultValue={value}
                onChange={e => setFormValue(e.target.value)}
                cols="60"
                rows="6"
              />
            ):(
              <input
                type="text"
                name={field}
                ref={register({ required: true })}
                defaultValue={value}
                onChange={e => setFormValue(e.target.value)}
                size="60"
              />
            )
          }
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

export default TextEditor;