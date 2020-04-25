import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Loader from '../Loader';

const AddressEditor = ({
  addresses,
  refetch,
}) => {

  const [error, setError] = useState([]);
  const { register, handleSubmit } = useForm();

  const UPDATE_ADDRESS_MUTATION = gql`
    mutation ($input: UpdateAddressInput!) {
      updateAddress(input: $input) {
        address {
          id
        }
      }
    } 
  `;
    
    const [updateTextMutation, { loading }] = useMutation(
      UPDATE_ADDRESS_MUTATION
    );
    
    const onSubmit = async data => {  
      try {
        setError('');

        await updateTextMutation({
          variables: {
            input: {
              id: data.id,
              business: data.business,
              street: data.street,
              streetNumber: data.streetNumber,
              complement: data.complement,
              district: data.district,
              city: data.city,
              state: data.state,
              country: data.country,
              zipCode: data.zipCode,
              latitude: data.latitude ? parseFloat(data.latitude) : null,
              longitude: data.longitude ? parseFloat(data.longitude) : null,
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

    const currentAddresses = addresses.filter(address => address.current);

    if (!currentAddresses || currentAddresses.length === 0) {
      return (
        <div>
          Sem endereços ativos configurado para este restaurante.
        </div>
      );
    }

    const {
      id,
      business,
      street,
      streetNumber,
      complement,
      district,
      city,
      state,
      country,
      zipCode,
      latitude,
      longitude,
    } = currentAddresses[0];

    return (
      <>
        <Loader loading={loading} />
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
            type="hidden"
            name="id"
            value={id}
            ref={register({ required: true })}
          />
          <input
            type="hidden"
            name="business"
            value={business.id}
            ref={register({ required: true })}
          />
          <div>
            <label htmlFor="street">Rua:</label>
            <input
              type="text"
              name="street"
              ref={register({ required: false })}
              defaultValue={street}
              size="60"
            />
          </div>
          
          <div>
            <label htmlFor="streetNumber">Número:</label>
            <input
              type="text"
              name="streetNumber"
              ref={register({ required: false })}
              defaultValue={streetNumber}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="complement">Complemento:</label>
            <input
              type="text"
              name="complement"
              ref={register({ required: false })}
              defaultValue={complement}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="district">Bairro:</label>
            <input
              type="text"
              name="district"
              ref={register({ required: false })}
              defaultValue={district}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="city">Cidade:</label>
            <input
              type="text"
              name="city"
              ref={register({ required: false })}
              defaultValue={city}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="state">Estado:</label>
            <input
              type="text"
              name="state"
              ref={register({ required: false })}
              defaultValue={state}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="country">País:</label>
            <input
              type="text"
              name="country"
              ref={register({ required: false })}
              defaultValue={country}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="zipCode">Cep:</label>
            <input
              type="text"
              name="zipCode"
              ref={register({ required: false })}
              defaultValue={zipCode}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="text"
              name="latitude"
              ref={register({ required: false })}
              defaultValue={latitude}
              size="60"
            />
          </div>

          <div>
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="text"
              name="longitude"
              ref={register({ required: false })}
              defaultValue={longitude}
              size="60"
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

export default AddressEditor;