import React from 'react';

import TextEditor from '../TextEditor';
import TranslationEditor from '../TranslationEditor';

const PaymentTypeEdit = ({title, data, className, refetch}) => {

  const {
    id,
    slug,
    priority,
    translations,
   } = data;

  return (
    <div className={className}>
      <fieldset>
        <legend>{title}</legend>

        <TextEditor
          id={id}
          mutation="updatePaymentType"
          input="UpdatePaymentTypeInput"
          node="paymentType"
          field="slug"
          legend="Slug do tipo de pagamento (nome na URL)"
          value={slug}
          refetch={refetch}
        />

        <TextEditor
          id={id}
          mutation="updatePaymentType"
          input="UpdatePaymentTypeInput"
          node="paymentType"
          field="priority"
          legend="Prioridade"
          value={priority}
          refetch={refetch}
        />

        <TranslationEditor
          id={id}
          mutation="createPaymentTypeTranslation"
          input="CreatePaymentTypeTranslationInput"
          node="paymentType"
          value={translations}
          refetch={refetch}
        />

      </fieldset>
    </div>
  )
}

export default PaymentTypeEdit;