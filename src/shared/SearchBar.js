import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import PredictiveSearchBox from 'instantsearch-predictive-search-box-react';

import config from './../config';

let SearchBar = ({ currentRefinement, refine, displayOverlay }) => (
    <div className="euip-searchBar">
        <div className="euip-searchBar-inner">
            {!config.querySuggestions &&
                <input type="text"
                    value={currentRefinement}
                    onChange={e => refine(e.currentTarget.value)}
                    className="euip-searchBar-input"
                    placeholder="Rechercher un produit, une marque…"
                    autoFocus />
            }

            {config.querySuggestions &&
                <PredictiveSearchBox
                    translations={{ placeholder: "Rechercher un produit, une marque…" }}
                    suggestionsIndex={config.suggestions.indexName}
                    appID={config.suggestions.appId}
                    apiKey={config.suggestions.searchApiKey}
                    maxSuggestions={config.suggestions.maxSuggestions}
                    autoFocus={true}/>
            }
        </div>
        <span className="euip-searchBar-close" onClick={() => displayOverlay(false)}>×</span>
    </div>
);

if (!config.querySuggestions) {
    SearchBar = connectSearchBox(SearchBar);
}

export default SearchBar;