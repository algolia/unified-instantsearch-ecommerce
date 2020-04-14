import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import PredictiveSearchBox from 'instantsearch-predictive-search-box-react';

import config from '../config';

let SearchBar = (props) => (
  <div className="euip-searchBar">
    <div className="euip-searchBar-inner">
      {!config.suggestions && (
        <input
          type="text"
          value={props.currentRefinement}
          onChange={(event) => props.refine(event.currentTarget.value)}
          className="euip-searchBar-input"
          placeholder="Rechercher un produit, une marque…"
          autoFocus
        />
      )}

      {config.suggestions && (
        <PredictiveSearchBox
          translations={{ placeholder: 'Rechercher un produit, une marque…' }}
          suggestionsIndex={config.suggestions.indexName}
          appID={config.suggestions.appId}
          apiKey={config.suggestions.searchApiKey}
          maxSuggestions={config.suggestions.maxSuggestions}
          autoFocus={true}
        />
      )}
    </div>
    <span className="euip-searchBar-close" onClick={props.onClose}>
      ×
    </span>
  </div>
);

if (!config.suggestions) {
  SearchBar = connectSearchBox(SearchBar);
}

export { SearchBar };
