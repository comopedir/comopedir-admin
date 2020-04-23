import React from 'react';

import TextEditor from "../TextEditor";

const BusinessWidget = ({title, data, className, refetch}) => {

  const {
    address,
    categories,
    channels,
    createdAt,
    id,
    name,
    network,
    paymentTypes,
    pictures,
    services,
    slug,
    updatedAt,
   } = data;

  return (
    <div className={className}>
      <fieldset>
        <legend>{title}</legend>

        <TextEditor
          id={id}
          mutation="updateBusiness"
          input="UpdateBusinessInput"
          field="slug"
          legend="Slug do restaurante (nome na URL)"
          value={slug}
          refetch={refetch}
        />

        <TextEditor
          id={id}
          mutation="updateBusiness"
          input="UpdateBusinessInput"
          field="name"
          legend="Nome do restaurante"
          value={name}
          refetch={refetch}
        />

      </fieldset>
    </div>
  )
}

export default BusinessWidget;