import React from 'react';

import TextViewer from '../TextViewer';
import TextEditor from '../TextEditor';
import SelectEditor from '../SelectEditor';
import AddressEditor from '../AddressEditor';

const BusinessWidget = ({title, data, className, refetch}) => {

  const {
    addresses,
    categories,
    channels,
    id,
    name,
    network,
    paymentTypes,
    pictures,
    services,
    slug,
    createdAt,
    updatedAt,
   } = data;
  
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

        <AddressEditor
          id={id}
          legend="Endereço"
          addresses={addresses}
          refetch={refetch}
        />

        <TextViewer
          legend="Criado em"
          value={createdAt}
        />

        <TextViewer
          legend="Alterado em"
          value={updatedAt}
        />

      </fieldset>
    </div>
  )
}

export default BusinessWidget;