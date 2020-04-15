import React, { Fragment, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import { AUTHENTICATE } from '../../../queries';
import { Context } from '../../../context/ContextProvider';
import Loader from '../../../components/Loader';

export default function SignIn() {

  const [error, setError] = useState([]);
  const context = useContext(Context);
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  
  const [authenticate, { loading }] = useMutation(
    AUTHENTICATE
  );
  
  const onSubmit = async data => {  

    const { email, password } = data;

    try {
      setError('');

      if (!email || !password) {
        setError('Email ou senha obrigatórios.');
        return;
      }

      const { data } = await authenticate({
        variables: {
          input: {
            email,
            password,
            role: 'admin',
          },
        },
      });

      const { token, role: accountRole } = data.auth;
      const { id: personId, name: personName } = data.auth.person;
      const {
        id: accountId,
        phoneNumber,
        phoneAreaCode,
        phoneCountryCode,
        email: accountEmail,
        status,
      } = data.auth.person.account;

      context.setToken(token);
      context.setRole(accountRole);
      context.setPersonId(personId);
      context.setPersonName(personName);
      context.setAccountId(accountId);
      context.setPhoneNumber(phoneNumber);
      context.setPhoneAreaCode(phoneAreaCode);
      context.setPhoneCountryCode(phoneCountryCode);
      context.setEmail(accountEmail);
      context.setStatus(status);

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
        <fieldset className="gray">
          <legend>Identificação</legend>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              autoComplete="email"
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