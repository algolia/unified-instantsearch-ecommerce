import React from 'react';

import PredictiveSearchBox from 'instantsearch-predictive-search-box-react';

class SearchBar extends React.Component {

    render() {
        return (
            <div className="euip-searchBar">
                <PredictiveSearchBox
                    translations={{ placeholder: "Search for anything" }}
                    suggestionsIndex="products-query-suggestions"
                    appID="testingKGR8YDKK66"
                    apiKey="184ad8b85ddf60550a7a38ec812606d0"
                    maxSuggestions={30}
                />
            </div>
        )
    }

}

export default SearchBar;