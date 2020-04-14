import React from 'react';
import {
  connectSearchBox,
  Index,
  connectHits,
  Highlight,
  Configure,
} from 'react-instantsearch-dom';

import './PredictiveSearchBox.css';

export const PredictiveSearchBox = connectSearchBox((props) => {
  const [suggestion, setSuggestion] = React.useState(null);

  return (
    <div className="euip-searchBar">
      <div className="euip-searchBar-inner">
        <div className="ais-PredictiveSearchBox">
          {suggestion && (
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
          />
        </div>
        <span className="euip-searchBar-close" onClick={props.onClose}>
          ×
        </span>

        {props.currentRefinement && (
          <Index indexName={props.suggestionsIndexName}>
            <Configure hitsPerPage={props.maxSuggestions} />
            <Suggestions
              query={props.currentRefinement}
              onSuggestion={(suggestion) => setSuggestion(suggestion)}
              onClick={(value) => props.refine(value)}
            />
          </Index>
        )}
      </div>
    </div>
  );
});

const Suggestions = connectHits((props) => {
  if (props.hits.length === 0) {
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
  }, [props.query]);

  return (
    <ol className="ais-SuggestionTagsContainer">
      {props.hits.map((hit) => {
        return (
          <li
            key={hit.objectID}
            className="ais-SuggestionTag"
            onClick={() => props.onClick(hit.query)}
          >
            <Highlight hit={hit} attribute="query" />
          </li>
        );
      })}
    </ol>
  );
});
