import React from 'react';
import {
  connectSearchBox,
  Index,
  connectHits,
  Configure,
} from 'react-instantsearch-dom';

import { ReverseHighlight } from './ReverseHighlight';

import './PredictiveSearchBox.css';

export const PredictiveSearchBox = connectSearchBox((props) => {
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState(null);

  return (
    <div className="euip-searchBar">
      <div className="euip-searchBar-inner">
        <div className="ais-PredictiveSearchBox">
          {showSuggestion && suggestion && (
            <div className="ais-PredictiveBox">
              <span id="predictive-item">{suggestion}</span>
            </div>
          )}

          <input
            type="text"
            value={props.currentRefinement}
            onChange={(event) => {
              setSuggestion(null);
              props.refine(event.currentTarget.value);
            }}
            autoFocus
            placeholder={props.translations.placeholder}
            className="ais-PredictiveSearchBox-input"
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                event.preventDefault();
                props.refine(suggestion);
                return;
              }
            }}
          />
        </div>
        <span className="euip-searchBar-close" onClick={props.onClose}>
          ×
        </span>

        <Index indexName={props.suggestionsIndexName}>
          <Configure
            // @TODO: remove all refinements from parent index
            facets={[]}
            page={0}
            hitsPerPage={props.maxSuggestions}
          />
          <Suggestions
            query={props.currentRefinement}
            onSuggestion={(suggestion) => setSuggestion(suggestion)}
            onClick={(value) => props.refine(value)}
          />
        </Index>
      </div>
    </div>
  );
});

const Suggestions = connectHits((props) => {
  if (props.query === '' || props.hits.length === 0) {
    props.onSuggestion(null);
    return null;
  }

  React.useEffect(() => {
    const firstSuggestion = props.hits[0].query;

    if (
      firstSuggestion &&
      firstSuggestion.toLocaleLowerCase().startsWith(props.query.toLowerCase())
    ) {
      const suggestion =
        props.query + firstSuggestion.slice(props.query.length);
      props.onSuggestion(suggestion);
    }
  }, [props.hits]);

  return (
    <ol className="ais-SuggestionTagsContainer">
      {props.hits.map((hit) => {
        return (
          <li
            key={hit.objectID}
            className="ais-SuggestionTag"
            onClick={() => props.onClick(hit.query)}
          >
            <ReverseHighlight hit={hit} attribute="query" />
          </li>
        );
      })}
    </ol>
  );
});
