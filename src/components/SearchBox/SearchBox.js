import React from 'react';

import config from '../../config';
import { BasicSearchBox } from './BasicSearchBox';
import { PredictiveSearchBox } from './PredictiveSearchBox';

export const SearchBox = (props) => {
  if (config.suggestions) {
    return (
      <PredictiveSearchBox
        {...props}
        translations={{ placeholder: 'Rechercher un produit, une marque…' }}
        suggestionsIndexName={config.suggestions.indexName}
        maxSuggestions={config.suggestions.maxSuggestions}
      />
    );
  }

  return <BasicSearchBox {...props} />;
};

// {config.suggestions && (
//   <PredictiveSearchBox
//     translations={{ placeholder: 'Rechercher un produit, une marque…' }}
//     suggestionsIndex={config.suggestions.indexName}
//     appID={config.suggestions.appId}
//     apiKey={config.suggestions.searchApiKey}
//     maxSuggestions={config.suggestions.maxSuggestions}
//     autoFocus={true}
//   />
// )}
