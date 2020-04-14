import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

export const QueryRulesBanner = connectStateResults(
  ({ searchResults, shouldDisplaySearchResults }) => {
    React.useEffect(() => {
      if (!searchResults || (searchResults && !searchResults.userData)) {
        return shouldDisplaySearchResults(true);
      }

      if (
        searchResults.userData.some((userData) => userData.hideSearchResults)
      ) {
        return shouldDisplaySearchResults(false);
      }

      return shouldDisplaySearchResults(true);
    }, [searchResults, shouldDisplaySearchResults]);

    return null;
  }
);
