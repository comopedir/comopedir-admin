import React from 'react';

import TextViewer from '../TextViewer';
import TextEditor from '../TextEditor';
import SelectEditor from '../SelectEditor';
import AddressEditor from '../AddressEditor';
import CheckboxEditor from '../CheckboxEditor';
import CheckboxWithValueEditor from '../CheckboxWithValueEditor';

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

        <CheckboxWithValueEditor
          id={id}
          mutation="associateChannels"
          input="AssociateChannelsInput"
          field="channel"
          collection="channels"
          collectionAssociation="businessChannel"
          legend="Canais"
          value={channels}
          refetch={refetch}
        />

        <CheckboxEditor
          id={id}
          mutation="associateCategories"
          input="AssociateCategoriesInput"
          field="categories"
          collection="categories"
          collectionAssociation="businessCategory"
          legend="Categorias"
          value={categories}
          refetch={refetch}
        />

        <CheckboxEditor
          id={id}
          mutation="associateServices"
          input="AssociateServicesInput"
          field="services"
          collection="services"
          collectionAssociation="businessService"
          legend="Serviços"
          value={services}
          refetch={refetch}
        />

        <CheckboxEditor
          id={id}
          mutation="associatePaymentTypes"
          input="AssociatePaymentTypesInput"
          field="paymentTypes"
          collection="paymentTypes"
          collectionAssociation="businessPaymentType"
          legend="Tipos de pagamento"
          value={paymentTypes}
          refetch={refetch}
        />

        <AddressEditor
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