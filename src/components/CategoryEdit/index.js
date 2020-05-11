import React from 'react';

import TextEditor from '../TextEditor';
import TranslationEditor from '../TranslationEditor';

const CategoryEdit = ({title, data, className, refetch}) => {

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
          mutation="updateCategory"
          input="UpdateCategoryInput"
          node="category"
          field="slug"
          legend="Slug da categoria (nome na URL)"
          value={slug}
          refetch={refetch}
        />

        <TextEditor
          id={id}
          mutation="updateCategory"
          input="UpdateCategoryInput"
          node="category"
          field="priority"
          legend="Prioridade"
          value={priority}
          refetch={refetch}
        />

        <TranslationEditor
          id={id}
          mutation="createCategoryTranslation"
          input="CreateCategoryTranslationInput"
          node="category"
          value={translations}
          refetch={refetch}
        />

      </fieldset>
    </div>
  )
}

export default CategoryEdit;