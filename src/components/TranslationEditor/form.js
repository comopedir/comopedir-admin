import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Loader from '../Loader';

const getValueFromTranslations = (field, translations, language) => {
  const filteredTranslations = translations.filter(translation => translation.language.id === language)

  if (filteredTranslations.length > 0) {
    return filteredTranslations[0][field];
  }

  return '';
}

const TranslationForm = ({
  id, 
  mutation, 
  input,
  node,
  value,
  language,
  refetch,
}) => {

  const [error, setError] = useState([]);
  const { register, handleSubmit } = useForm();

  const CREATE_TRANSLATION_MUTATION_QUERY = gql`
    mutation ($input: ${input}!) {
      ${mutation}(input: $input) {
        translation {
          id
        }
      }
    } 
  `;

  const [createTranslationMutation, { loading }] = useMutation(
    CREATE_TRANSLATION_MUTATION_QUERY
  );

  const UPDATE_TRANSLATION_MUTATION_QUERY = gql`
    mutation ($input: UpdateTranslationInput!) {
      updateTranslation(input: $input) {
        translation {
          id
        }
      }
    } 
  `;

  const [updateTranslationMutation, { loading: loadingUpdate }] = useMutation(
    UPDATE_TRANSLATION_MUTATION_QUERY
  );
  
  const onSubmit = async data => {
    try {
      setError('');

      const createPayload = {
        name: data.name,
        description: data.description,
      };
      
      if (data.id) {
        createPayload.translation = data.id;

        await updateTranslationMutation({
          variables: {
            input: createPayload,
          },
        });        
      }
      else {
        createPayload[node] = id;
        createPayload.language = data.language;

        await createTranslationMutation({
          variables: {
            input: createPayload,
          },
        });
      }

      setError('');
      alert(data.id ? 'Tradução alterada com sucesso.' : 'Tradução criada com sucesso.');
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
      <Loader loading={loadingUpdate} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          name="id"
          value={getValueFromTranslations('id', value, language.node.id)}
          ref={register({ required: false })}
        />
        <input
          type="hidden"
          name="language"
          value={language.node.id}
          ref={register({ required: true })}
        />
        <h3>{language.node.name}</h3>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            ref={register({ required: true })}
            defaultValue={getValueFromTranslations('name', value, language.node.id)}
            size="60"
          />
        </div>
        <div>
          <label htmlFor="name">Descrição:</label>
          <textarea
            name="description"
            ref={register({ required: false })}
            defaultValue={getValueFromTranslations('description', value, language.node.id)}
            cols="60"
            rows="6"
          />
        </div>
        <div>
          <input type="submit" value="Atualizar" />
        </div>
        <div className="errors">
          {error && <span>{error}</span>}
        </div>
      </form>
    </>
  );
}

export default TranslationForm;