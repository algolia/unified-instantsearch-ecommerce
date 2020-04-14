import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

class RawQueryRulesBanner extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { shouldDisplaySearchResults, searchResults } = this.props;

    if (!searchResults || (searchResults && !searchResults.userData)) {
      return shouldDisplaySearchResults(true);
    }

    if (searchResults.userData.some((userData) => userData.hideSearchResults)) {
      return shouldDisplaySearchResults(false);
    }

    return shouldDisplaySearchResults(true);
  }

  render() {
    return false;
  }
}

export const QueryRulesBanner = connectStateResults(RawQueryRulesBanner);
