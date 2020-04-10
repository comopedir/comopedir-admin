import React, { Fragment, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import { Context } from '../../../context/ContextProvider';
import Loader from '../../../components/Loader';

const AUTHENTICATE = gql`
  mutation($input: authInput!) {
    auth(input: $input) {
      token
      business {
        id
      }
    }
  }
`;

export default function SignIn() {

  const [error, setError] = useState([]);
  const context = useContext(Context);
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  
  const [authenticate, { loading }] = useMutation(
    AUTHENTICATE
  );
  
  const onSubmit = async data => {  

    const { username, password } = data;

    try {
      setError('');

      if (!username || !password) {
        setError('Usuário ou senha obrigatórios.');
        return;
      }

      const { data } = await authenticate({
        variables: {
          input: {
            username,
            password,
            role: 'admin',
          },
        },
      });

      context.setBusinessId(data.auth.business.id);

      localStorage.setItem('@comopedir:token', data.auth.token);

      setError('');

      history.push('/dashboard');

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
    <Fragment>
      <Loader loading={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Identificação</legend>
          <div>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              name="username"
              autoComplete="username"
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              ref={register({ required: true })}
            />
          </div>
          <div className="errors">
            {errors.username && <span>Digite o nome de usuário.</span>}
            {errors.password && <span>Digite a senha.</span>}
            {error && <span>{error}</span>}
          </div>
          <input type="submit" value="Enviar" />
        </fieldset>
      </form>
    </Fragment>
  )

}