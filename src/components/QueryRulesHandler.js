import React from 'react';
import { QueryRuleContext } from 'react-instantsearch-dom';

const getRulesContextFromSearchState = (searchState) => {
  const { refinementList = {} } = searchState;

  return Object.keys(refinementList).reduce((all, refinementName) => {
    all = { ...all, [refinementName]: (values) => values };
    return all;
  }, {});
};

export const QueryRulesHandler = React.memo(
  (props) => {
    const ruleContexts = getRulesContextFromSearchState(props.searchState);

    if (Object.keys(ruleContexts).length === 0) {
      return null;
    }

    return <QueryRuleContext trackedFilters={ruleContexts} />;
  },
  function areEqual(prevProps, nextProps) {
    if (
      JSON.stringify(prevProps.searchState) ===
      JSON.stringify(nextProps.searchState)
    ) {
      return false;
    }

    return true;
  }
);
