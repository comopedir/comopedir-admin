import React from 'react';

import TextEditor from '../TextEditor';
import DeleteEditor from '../DeleteEditor';

const LanguageEdit = ({title, data, className, refetch}) => {

  const {
    id,
    isoCode,
    name
   } = data;

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

        <DeleteEditor
          id={id}
          node="language"
          collection="languages"
          mutation="deleteLanguage"
          input="DeleteLanguageInput"
          legend="Apagar linguagem"
        />

      </fieldset>
    </div>
  )
}

export default LanguageEdit;