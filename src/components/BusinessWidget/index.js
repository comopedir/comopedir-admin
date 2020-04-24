import React from 'react';

import TextEditor from "../TextEditor";
import SelectEditor from "../SelectEditor";

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

  console.log('network:', network);
  
  return (
    <div className={className}>
      <fieldset>
        <legend>{title}</legend>

        <SelectEditor
          id={id}
          mutation="updateBusiness"
          input="UpdateBusinessInput"
          field="network"
          collection="networks"
          legend="Network"
          value={network}
          refetch={refetch}
        />

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