import React from 'react';

const PicturesEditor = ({
  id, 
  mutation, 
  input, 
  field,
  legend,
  value,
  refetch,
}) => {
  return (
    <>
      <div>
        <label htmlFor={field}>{legend}:</label>
          {
            value.map(item => {
              return (
                <img key={item.id} src={item.small.url} width="200" alt="Imagem do restaurante" />
              )
            })
          }
      </div>
    </>
  );
}

export default PicturesEditor;