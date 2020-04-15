import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import Loader from '../Loader';

const Param = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const ParamMany = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>
      <ul>
          {value.map(
            item => <li key={item}>{item}</li>
          )}
        </ul>
    </td>
  </tr>
);

const ParamPictures = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>
      {value.map(
        item => (
          <div key={item.id}>
            <img
              src={item.thumbnails.large.url}
              width="200"
              alt="Imagem restaurante."
            />
          </div>
        )
      )}
    </td>
  </tr>
);

const AirtableBusinessWidget = ({
  airtableData,
  businessData,
  airtableRefetch,
  businessRefetch,
  className
}) => {

  const {
    airtableId,
    approved,
    categories,
    channels,
    city,
    email,
    instagram,
    name,
    phone,
    pictures,
    services,
    state,
    website,
    whatsapp,
  } = airtableData;

  const businessId = businessData ? businessData.id : null;

  const [ error, setError ] = useState([]);
  const { handleSubmit } = useForm();
  
  const IMPORT_AIRTABLE_BUSINESS_MUTATION = gql`
    mutation ($input: ImportAirtableBusinessInput!) {
      importAirtableBusiness(input: $input) {
        business {
          id
          slug
          name
        }
      }
    } 
  `;

  const [importAirtableBusinessMutation, { loading: mutationLoading }] = useMutation(
    IMPORT_AIRTABLE_BUSINESS_MUTATION
  );

  const onSubmit = async data => {  
    try {
      setError('');

      await importAirtableBusinessMutation({
        variables: {
          input: {
            airtableId,
            name,
            services,
            channels,
            categories,
            pictures,
            website,
            whatsapp,
            phone,
            state,
            city,
            instagram,
            email,
            approved,
          },
        },
      });

      setError('');

      alert('Importação concluída com sucesso.')

      airtableRefetch();
      businessRefetch();

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
      <Loader loading={mutationLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className={className}>
          <thead>
            <tr>
              <td>Parâmetro</td>
              <td>Valor</td>
            </tr>
          </thead>
          <tbody>
            <Param name="Nome do Estabelecimento" value={name} />
            <Param name="ID interno no Airtable:" value={airtableId} />
            <Param name="Aprovado?" value={approved} />
            <Param name="Local" value={`${city}/${state}`} />
            <Param name="E-mail" value={email} />
            <Param name="Instagram" value={instagram} />
            <Param name="Telefone para pedidos" value={phone} />
            <Param name="Whatsapp" value={whatsapp} />
            <Param name="Website" value={website} />
            <ParamMany name="Serviços" value={services} />
            <ParamMany name="Categorias" value={categories} />
            <ParamMany name="Canais" value={channels} />
            <ParamPictures name="Imagens" value={pictures} />
            <tr>
              <td colSpan="2">
                {
                  !businessId ? (
                    <input type="submit" value="Importar" />
                  ) : (
                    <Link to={`/config/${businessId}`}>Configurar estabelecimento</Link>
                  )
                }
              </td>
            </tr>
          </tbody>
        </table>
        <div className="errors">
          {error && <span>{error}</span>}
        </div>
      </form>
    </>
  );
}

export default AirtableBusinessWidget;