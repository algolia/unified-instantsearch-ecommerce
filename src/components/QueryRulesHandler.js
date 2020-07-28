import React from 'preact/compat';
import { QueryRuleContext } from 'react-instantsearch-dom';

const getRulesContextFromSearchState = ({ refinementList = {}, menu = {} }) => {
  const trackedWidgets = {
    refinementList,
    menu,
  };

  return Object.keys(trackedWidgets).reduce((ruleContexts, current) => {
    return {
      ...ruleContexts,
      ...Object.keys(trackedWidgets[current]).reduce(
        (acc, attribute) => ({
          ...acc,
          [attribute]: (value) => value,
        }),
        {}
      ),
    };
  }, {});
};

export const QueryRulesHandler = (props) => {
  const ruleContexts = getRulesContextFromSearchState(props.searchState);

  if (Object.keys(ruleContexts).length === 0) {
    return null;
  }

  return <QueryRuleContext trackedFilters={ruleContexts} />;
};
