import React from 'react';
import { QueryRuleContext } from 'react-instantsearch-dom';

import { getRulesContextFromSearchState } from './Tools';

class QueryRulesHandler extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      JSON.stringify(this.props.searchState) ===
      JSON.stringify(nextProps.searchState)
    ) {
      return false;
    }

    return true;
  }

  render() {
    const { searchState } = this.props;

    return (
      <QueryRuleContext
        trackedFilters={{ ...getRulesContextFromSearchState(searchState) }}
      />
    );
  }
}

export default QueryRulesHandler;
