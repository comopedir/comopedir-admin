import React from 'react';

import TextEditor from '../TextEditor';

const CategoryEdit = ({title, data, className, refetch}) => {

  const {
    id,
    slug,
    priority,
    translations,
   } = data;

   console.log('id:', id);
   console.log('slug:', slug);
   console.log('priority:', priority);
   console.log('translations:', translations);

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

      </fieldset>
    </div>
  )
}

export default CategoryEdit;