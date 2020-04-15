import React from 'react';

import config from '../../config';
import { BasicSearchBox } from './BasicSearchBox';
import { PredictiveSearchBox } from './PredictiveSearchBox';

export const SearchBox = (props) => {
  if (config.suggestions) {
    return (
      <PredictiveSearchBox
        {...props}
        translations={{ placeholder: 'Search for a product, brand, color, …' }}
        suggestionsIndexName={config.suggestions.indexName}
        maxSuggestions={config.suggestions.maxSuggestions}
      />
    );
  }

  return <BasicSearchBox {...props} />;
};
