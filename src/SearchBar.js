import React from 'react';

import { connectSearchBox } from 'react-instantsearch-dom';
// import PredictiveSearchBox from 'instantsearch-predictive-search-box-react';

const SearchBar = ({ currentRefinement, refine }) => (
    <div className="euip-searchBar">
        <div className="euip-searchBar-inner">
            <input type="text"
                   value={currentRefinement}
                   onChange={e => refine(e.currentTarget.value)}
                   className="euip-searchBar-input"
                   placeholder="Rechercher un produit, une marque, une catégorie…"
                   autoFocus
            />

            {/*<PredictiveSearchBox*/}
            {/*    translations={{ placeholder: "Search for anything" }}*/}
            {/*    suggestionsIndex="products-query-suggestions"*/}
            {/*    appID="testingKGR8YDKK66"*/}
            {/*    apiKey="184ad8b85ddf60550a7a38ec812606d0"*/}
            {/*    maxSuggestions={30}*/}
            {/*/>*/}
        </div>
    </div>
);

export default connectSearchBox(SearchBar);