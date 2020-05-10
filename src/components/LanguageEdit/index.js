import React from 'react';

import TextEditor from '../TextEditor';

const LanguageEdit = ({title, data, className, refetch}) => {

  const {
    id,
    isoCode,
    name
   } = data;

   console.log('id:', id);
   console.log('isoCode:', isoCode);
   console.log('name:', name);

  return (
    <div className={className}>
      <fieldset>
        <legend>{title}</legend>

        <TextEditor
          id={id}
          mutation="updateLanguage"
          input="UpdateLanguageInput"
          node="language"
          field="isoCode"
          legend="Código ISO da linguagem:"
          value={isoCode}
          refetch={refetch}
        />

        <TextEditor
          id={id}
          mutation="updateLanguage"
          input="UpdateLanguageInput"
          node="language"
          field="name"
          legend="Nome da linguagem:"
          value={name}
          refetch={refetch}
        />

      </fieldset>
    </div>
  )
}

export default LanguageEdit;