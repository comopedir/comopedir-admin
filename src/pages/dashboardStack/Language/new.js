import React, { Fragment } from 'react';

import LanguageNew from '../../../components/LanguageNew';

export default () => {
  return (
    <Fragment>
      <div className="list blue">
        <LanguageNew 
          className="widget col2 yellow" 
          title="Nova linguagem"
        />
      </div>
    </Fragment>
  );
};
