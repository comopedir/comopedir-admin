import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import Loader from '../Loader';

const DeleteEditor = ({
  id, 
  mutation, 
  input, 
  legend,
}) => {

const [error, setError] = useState([]);
const { handleSubmit } = useForm();
let history = useHistory();

const EDITOR_DELETION_QUERY = gql`
  mutation ($input: ${input}!) {
    ${mutation}(input: $input) {
      business {
        id
      }
    }
  } 
`;
  
  const [editorDeleteMutation, { loading }] = useMutation(
    EDITOR_DELETION_QUERY
  );
  
  const onSubmit = async data => {  
    try {
      setError('');

      await editorDeleteMutation({
        variables: {
          input: {
            business: id,
          },
        },
      });

      setError('');

      alert('Deleção concluída com sucesso.')

      history.push(`/dashboard/${Math.random()}`);

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
          <input type="submit" value={legend} />
        </div>
        <div className="errors">
          {error && <span>{error}</span>}
        </div>
      </form>
    </>
  );
}

export default DeleteEditor;