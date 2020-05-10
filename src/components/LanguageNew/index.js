import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import Loader from '../Loader';
import TextNew from '../TextNew';

const LanguageNew = ({title, className}) => {
  const [error, setError] = useState([]);
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const CREATE_LANGUAGE_QUERY = gql`
    mutation ($input: CreateLanguageInput!) {
      createLanguage(input: $input) {
        language {
          id
        }
      }
    } 
  `;

  const [createLanguageMutation, { loading }] = useMutation(
    CREATE_LANGUAGE_QUERY
  );

  const onSubmit = async data => {  
    try {
      setError('');

      await createLanguageMutation({
        variables: {
          input: {
            name: data.name,
            isoCode: data.isoCode,
          }
        },
      });

      setError('');
      alert('Linguagem incluída com sucesso.');
      history.push(`/languages/${Math.random()}`);

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
        <div className={className}>
          <fieldset>
            <legend>{title}</legend>

            <TextNew
              field="isoCode"
              legend="Código ISO da linguagem:"
              register={register}
            />

            <TextNew
              field="name"
              legend="Nome da linguagem:"
              register={register}
            />

          </fieldset>
        </div>
        <div>
          <input type="submit" value="Atualizar" />
        </div>
        <div className="errors">
          {error && <span>{error}</span>}
        </div>
      </form>
    </>
  )
}

export default LanguageNew;