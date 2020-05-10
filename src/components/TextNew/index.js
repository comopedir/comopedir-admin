import React from 'react';

const TextNew = ({
  register,
  field,
  legend,
  value,
  multiline = false,
}) => {

  return (
    <>
      <div>
        <label htmlFor={field}>{legend}:</label>
        {
          multiline ? (
            <textarea
              name={field}
              ref={register({ required: true })}
              defaultValue={value}
              cols="60"
              rows="6"
            />
          ):(
            <input
              type="text"
              name={field}
              ref={register({ required: true })}
              defaultValue={value}
              size="60"
            />
          )
        }
      </div>
    </>
  );
}

export default TextNew;