import React from 'react';

const TextViewer = ({
  legend,
  value,
}) => {

  return (
    <>
      <form>
        <div>
          <label>{legend}:</label>
          <span>{value}</span>
        </div>
      </form>
    </>
  );
}

export default TextViewer;