import React from 'react';

import TextViewer from '../TextViewer';
import TextEditor from '../TextEditor';
import SelectEditor from '../SelectEditor';
import AddressEditor from '../AddressEditor';
import CheckboxEditor from '../CheckboxEditor';
import CheckboxWithValueEditor from '../CheckboxWithValueEditor';
import PicturesEditor from '../PicturesEditor';
import DeleteEditor from '../DeleteEditor';

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
          node="business"
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
          node="business"
          field="slug"
          legend="Slug do restaurante (nome na URL)"
          value={slug}
          refetch={refetch}
        />

        <TextEditor
          id={id}
          mutation="updateBusiness"
          input="UpdateBusinessInput"
          node="business"
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

        <PicturesEditor
          id={id}
          mutation="updateBusiness"
          input="UpdateBusinessInput"
          field="pictures"
          legend="Imagens"
          value={pictures}
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

        <DeleteEditor
          id={id}
          mutation="deleteBusiness"
          input="DeleteBusinessInput"
          legend="Apagar restaurante"
        />

      </fieldset>
    </div>
  )
}

export default BusinessWidget;