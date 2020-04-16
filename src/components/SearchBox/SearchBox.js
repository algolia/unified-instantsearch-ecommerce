import React from 'react';

import config from '../../config';
import { BasicSearchBox } from './BasicSearchBox';
import { PredictiveSearchBox } from './PredictiveSearchBox';

export const SearchBox = (props) => {
  if (config.suggestionsIndex) {
    return (
      <PredictiveSearchBox
        {...props}
        translations={{ placeholder: 'Search for a product, brand, color, …' }}
        suggestionsIndex={config.suggestionsIndex}
      />
    );
  }

  return <BasicSearchBox {...props} />;
};
