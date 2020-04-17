import React from 'react';
import {
  connectSearchBox,
  Index,
  connectHits,
  Configure,
} from 'react-instantsearch-dom';

import { ReverseHighlight } from '../ReverseHighlight';
import { SearchBox } from './SearchBox';

export const ConnectedPredictiveSearchBox = connectSearchBox((props) => {
  const [currentSuggestion, setCurrentSuggestion] = React.useState(null);

  return (
    <>
      <SearchBox
        {...props}
        completion={
          props.currentRefinement &&
          currentSuggestion &&
          currentSuggestion !== props.currentRefinement
            ? currentSuggestion
            : null
        }
        onChange={(event) => {
          setCurrentSuggestion(null);
          props.refine(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          // When the user hits the right arrow and is at the end of the
          // input query, we validate the completion.
          if (
            event.key === 'Tab' ||
            (event.key === 'ArrowRight' &&
              event.target.selectionStart === props.currentRefinement.length)
          ) {
            event.preventDefault();
            props.refine(currentSuggestion);
          }
        }}
        onSubmit={() => {}}
        onReset={() => {
          props.refine('');
        }}
      />

      <Index indexName={props.suggestionsIndex.indexName}>
        <Configure page={0} {...props.suggestionsIndex.searchParameters} />
        <Suggestions
          query={props.currentRefinement}
          onSuggestion={(suggestion) => setCurrentSuggestion(suggestion)}
          onClick={(value) => props.refine(value)}
        />
      </Index>
    </>
  );
});

const Suggestions = connectHits((props) => {
  React.useEffect(() => {
    if (props.hits.length === 0) {
      props.onSuggestion(null);
      return;
    }

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
    <div
      className={[
        'Unified-QuerySuggestions',
        props.hits.length === 0 && 'Unified-QuerySuggestions--empty',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="Unified-QuerySuggestions-label">Suggestions</span>

      {props.hits.length > 0 && (
        <ol className="Unified-QuerySuggestions-list">
          {props.hits.map((hit) => {
            return (
              <li key={hit.objectID} className="Unified-QuerySuggestions-item">
                <button
                  className="Unified-QuerySuggestions-button"
                  onClick={() => props.onClick(hit.query)}
                >
                  <ReverseHighlight hit={hit} attribute="query" />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
});
